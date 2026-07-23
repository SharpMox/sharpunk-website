#!/usr/bin/env python3
"""Turn ~/Documents/SHARK ASSET into the game's sprite sheets in img/.

Needs Pillow + cwebp.  Run:  python3 tools/build-assets.py

Why this exists (none of it is visible in the binary output):

* The PNGs ship on an opaque white 1713x1240 canvas.  We flood-fill from the
  four corners so only *background-connected* white is cleared -- a global
  white key would eat the white cloud art.
* SHARKJUMP/SHARKDIVE were drawn travelling across the canvas (1187px and
  1027px of horizontal drift).  The game already computes position from
  physics, so each frame is cropped to its OWN bbox to strip that travel;
  the sheet supplies pose only.
* All four shark sheets share one cell size and are centre-anchored, so the
  shark's body stays registered on the physics `y` when the state changes.
* SHARKDEAD's tail frames barely move; near-duplicates are dropped and the
  last frame is held in CSS instead.
"""
import os, subprocess, sys
from PIL import Image, ImageSequence, ImageChops, ImageDraw, ImageStat

SRC = os.path.expanduser("~/Documents/SHARK ASSET")
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "img")
DPR = 2          # sheets are @2x; CSS sizes below are logical px
QUALITY = 80

# logical (CSS) height each asset renders at -- its LARGEST use in the game
CSS_H = {
    "boat": 120, "rock": 110, "rock2": 110,
    "cloud": 48, "cloud2": 48, "cloud3": 48,
    "island": 60, "coral": 48, "fish": 24, "fish2": 26, "bird": 24,
}
SHARK_BODY_CSS_H = 45    # a swimming shark is this tall; poses scale from it


def dealpha(im):
    """Clear the white background, including regions the art fully encloses.

    Corner fills handle the outside.  They cannot reach white that the drawing
    surrounds -- sky between the boat's mast and jib, water between the coral's
    branches -- so any leftover near-white pixel is used as another fill seed.
    Seeding (rather than a plain threshold) means the fill spreads into the
    antialiased fringe on its own, exactly like the outer background.

    Why the >235 seed test matters: the clouds are drawn in a very light blue
    that lands around 216-224, so a threshold of 215 or lower erases them
    completely (measured: 0 px caught at >235, ~37-62k at >215).  Nothing in
    any asset uses >235 white as actual art, so nothing here can seed inside
    a cloud.
    """
    im = im.convert("RGB")
    w, h = im.size
    BG = (255, 0, 255)
    probe = im.copy()
    for pt in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        ImageDraw.floodfill(probe, pt, BG, thresh=40)
    src, pp = im.load(), probe.load()
    for y in range(h):
        for x in range(w):
            if pp[x, y] == BG:
                continue
            r, g, b = src[x, y]
            if r > 235 and g > 235 and b > 235:
                ImageDraw.floodfill(probe, (x, y), BG, thresh=40)
    out = im.convert("RGBA")
    px = out.load()
    for y in range(h):
        for x in range(w):
            if pp[x, y] == BG:
                px[x, y] = (0, 0, 0, 0)
    return out


def fill_outline(frame, colour=(255, 255, 255)):
    """Fill transparent area the drawing encloses, leaving the outside clear.

    The birds are drawn as hollow outlines, so their bodies read as gaps.
    Run this on the FULL canvas, before cropping: a tight crop puts the
    outline on the edge, and an interior gap touching the edge would be
    mistaken for outside and left transparent.
    """
    w, h = frame.size
    a = frame.getchannel("A")
    work = a.point(lambda v: 255 if v < 128 else 0)   # 255 = transparent
    seeds = [(x, y) for x in range(w) for y in (0, h - 1)] + \
            [(x, y) for y in range(h) for x in (0, w - 1)]
    wp = work.load()
    for pt in seeds:
        if wp[pt] == 255:
            ImageDraw.floodfill(work, pt, 128)        # 128 = outside
    out = frame.copy()
    op = out.load()
    for y in range(h):
        for x in range(w):
            if wp[x, y] == 255:                        # transparent, not outside
                op[x, y] = (*colour, 255)
    return out


def frames(name):
    return [f.convert("RGBA") for f in ImageSequence.Iterator(Image.open(os.path.join(SRC, name)))]


def crop_each(fr):
    """Per-frame bbox crop -- this is what strips the baked-in travel."""
    return [f.crop(f.getchannel("A").getbbox()) for f in fr]


def drop_static(fr, thresh=8.0):
    """Keep frames that differ meaningfully from the previous kept one.

    SHARKDEAD's real motion scores rms ~16-17 between frames; once the shark
    has flipped it only wobbles at ~3.4.  8.0 sits cleanly between the two,
    so the 10 drawn frames reduce to the 4 that actually move.
    """
    keep = [fr[0]]
    for f in fr[1:]:
        a, b = f, keep[-1]
        if a.size != b.size:
            keep.append(f)
            continue
        if ImageStat.Stat(ImageChops.difference(a, b)).rms[0] > thresh:
            keep.append(f)
    return keep


def encode(img, base):
    png = os.path.join(OUT, base + ".png")
    webp = os.path.join(OUT, base + ".webp")
    img.save(png)
    subprocess.run(["cwebp", "-q", str(QUALITY), "-alpha_q", "100", "-quiet", png, "-o", webp], check=True)
    os.remove(png)
    return os.path.getsize(webp)


def sheet(fr, cell_w, cell_h, scale):
    """Centre-anchor each frame in a fixed cell so poses stay registered."""
    cw, ch = round(cell_w * scale), round(cell_h * scale)
    cw += cw % 2  # even cells keep the CSS maths on whole pixels
    ch += ch % 2
    out = Image.new("RGBA", (cw * len(fr), ch), (0, 0, 0, 0))
    for i, f in enumerate(fr):
        t = f.resize((max(1, round(f.width * scale)), max(1, round(f.height * scale))), Image.LANCZOS)
        out.alpha_composite(t, (i * cw + (cw - t.width) // 2, (ch - t.height) // 2))
    return out, cw, ch


def main():
    if not os.path.isdir(SRC):
        sys.exit("missing source dir: " + SRC)
    os.makedirs(OUT, exist_ok=True)

    # ---- shark: one shared cell across all four states ----
    states = {}
    for name, key in [("SHARKSWIM.gif", "swim"), ("SHARKJUMP.gif", "jump"),
                      ("SHARKDIVE.gif", "dive"), ("SHARKDEAD.gif", "dead")]:
        raw = frames(name)
        # compare BEFORE cropping: on the shared canvas the rms scale is
        # comparable between frames, whereas cropping inflates it ~4x by
        # discarding transparent area and hides the static tail
        if key == "dead":
            raw = drop_static(raw)
        states[key] = crop_each(raw)

    body_h = max(f.height for f in states["swim"])      # swimming pose = reference
    scale = (SHARK_BODY_CSS_H * DPR) / body_h
    cell_w = max(f.width for fr in states.values() for f in fr)
    cell_h = max(f.height for fr in states.values() for f in fr)

    css, total = [], 0
    print(f"{'sheet':<10}{'frames':>7}{'cell(dev)':>12}{'sheet(dev)':>13}{'webp':>9}")
    shark_cell_css = None
    for key, fr in states.items():
        img, cw, ch = sheet(fr, cell_w, cell_h, scale)
        n = len(fr)
        size = encode(img, "shark" + key)
        total += size
        shark_cell_css = (cw // DPR, ch // DPR)
        css.append((f"shark{key}", n, cw // DPR, ch // DPR))
        print(f"{'shark'+key:<10}{n:>7}{f'{cw}x{ch}':>12}{f'{cw*n}x{ch}':>13}{size/1024:>8.1f}K")

    # ---- bird: hollow outlines, so fill the bodies before cropping ----
    fr = crop_each([fill_outline(f) for f in frames("BIRD.gif")])
    bw, bh = max(f.width for f in fr), max(f.height for f in fr)
    bscale = (CSS_H["bird"] * DPR) / bh
    img, cw, ch = sheet(fr, bw, bh, bscale)
    size = encode(img, "bird")
    total += size
    css.append(("bird", len(fr), cw // DPR, ch // DPR))
    print(f"{'bird':<10}{len(fr):>7}{f'{cw}x{ch}':>12}{f'{cw*len(fr)}x{ch}':>13}{size/1024:>8.1f}K")

    # ---- static PNGs ----
    for f in sorted(x for x in os.listdir(SRC) if x.lower().endswith(".png")):
        base = f[:-4].lower()
        a = dealpha(Image.open(os.path.join(SRC, f)))
        a = a.crop(a.getchannel("A").getbbox())
        h = CSS_H[base] * DPR
        w = round(a.width * h / a.height)
        a = a.resize((w, h), Image.LANCZOS)
        size = encode(a, base)
        total += size
        css.append((base, 1, w // DPR, h // DPR))
        print(f"{base:<10}{1:>7}{f'{w}x{h}':>12}{f'{w}x{h}':>13}{size/1024:>8.1f}K")

    print(f"\nTOTAL {total/1024:.1f}K")
    print("\n--- logical (CSS) px, for index.html ---")
    for name, n, w, h in css:
        print(f"{name:<10} frames={n:<3} cell={w}x{h}" + (f"  strip-shift={-w*n}px" if n > 1 else ""))
    if shark_cell_css:
        print(f"\nshark cell CSS = {shark_cell_css[0]}x{shark_cell_css[1]}"
              f"  -> place() half-height = {shark_cell_css[1]//2}")


if __name__ == "__main__":
    main()
