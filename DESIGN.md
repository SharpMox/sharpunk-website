---
version: alpha
name: Sharpunk
description: Dark, locked-violet glass system for the Sharpunk web and games studio site (home, /web/, /games/). Derived from the live CSS, not a redesign.
colors:
  primary: "#9b7bff"
  primary-deep: "#6d4ad6"
  primary-light: "#c6b4ff"
  primary-pale: "#d9c9ff"
  on-primary: "#090615"
  background: "#090615"
  on-background: "#ece8fb"
  muted: "#9d95bd"
  surface: "#1a1725"
  surface-2: "#1e1b29"
  surface-chip: "#4c387f"
  surface-hud: "#342e5b"
  surface-solid: "#14102a"
  glass: "rgba(255, 255, 255, 0.055)"
  glass-2: "rgba(255, 255, 255, 0.085)"
  edge: "rgba(255, 255, 255, 0.11)"
  edge-2: "rgba(255, 255, 255, 0.19)"
  highlight: "rgba(255, 255, 255, 0.14)"
  shadow: "rgba(9, 6, 21, 0.55)"
  scrim: "rgba(9, 6, 21, 0.72)"
  aurora-1: "#5b2ea6"
  aurora-2: "#3a2a8f"
  aurora-3: "#7a3f9e"
  strip-top: "#16113a"
  strip-mid: "#1e1749"
  strip-bottom: "#14102a"
  feature-start: "#241a5e"
  feature-mid: "#3a2472"
  feature-end: "#1b1338"
  lime: "#a2d541"
  pink: "#f769ad"
  yellow: "#e0f369"
  ice: "#96e1ff"
  white: "#ffffff"
  ink: "#000000"
  hud-bg: "rgba(255, 255, 255, 0.1)"
  hud-edge: "rgba(255, 255, 255, 0.22)"
  water: "rgba(140, 110, 255, 0.22)"
  waterline: "rgba(214, 200, 255, 0.5)"
  deadart: "#4464a2"
typography:
  display-wordmark:
    fontFamily: Outfit
    fontSize: 135px
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: -0.045em
  display-score:
    fontFamily: Outfit
    fontSize: 7rem
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: -0.03em
    fontFeature: '"tnum"'
  headline-page:
    fontFamily: Outfit
    fontSize: 7rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.04em
  headline-feature:
    fontFamily: Outfit
    fontSize: 4.2rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.035em
  headline-card:
    fontFamily: Outfit
    fontSize: 2.15rem
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: -0.025em
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.65
  label-button:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.65
    letterSpacing: 0.12em
  label-brand:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.65
    letterSpacing: 0.18em
  label-nav:
    fontFamily: Outfit
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.65
  mono-meta:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 300
    lineHeight: 1.65
    letterSpacing: 0.1em
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 300
    lineHeight: 1.65
    letterSpacing: 0.16em
  mono-eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 300
    lineHeight: 1.65
    letterSpacing: 0.24em
  mono-hud:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: 700
    lineHeight: 19px
    letterSpacing: 0.06em
  mono-ribbon:
    fontFamily: JetBrains Mono
    fontSize: 8px
    fontWeight: 700
    lineHeight: 1.65
    letterSpacing: 0.1em
rounded:
  none: 0px
  focus: 4px
  panel: 24px
  pill: 999px
spacing:
  xs: 8px
  sm: 14px
  md: 26px
  lg: 48px
  xl: 72px
  shell-max: 1340px
  shell-gutter: 26px
  shell-gutter-mobile: 18px
  nav-height: 62px
  nav-offset: 16px
  strip-height: 300px
  water-height: 90px
components:
  glass-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-background}"
    rounded: "{rounded.panel}"
  nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-background}"
    rounded: "{rounded.pill}"
    height: 62px
    padding: 0 12px 0 18px
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.pill}"
    padding: 8px 14px
  nav-link-active:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-background}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-button}"
    rounded: "{rounded.pill}"
    padding: 16px 30px
  button-primary-gradient-end:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-background}"
    typography: "{typography.label-button}"
    rounded: "{rounded.pill}"
    padding: 16px 30px
  button-ghost-hover:
    backgroundColor: "{colors.glass-2}"
  link-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-background}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
  link-pill-hover:
    backgroundColor: "{colors.glass-2}"
  link-pill-solid:
    backgroundColor: "{colors.on-background}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.pill}"
    padding: 12px 22px
  fact-chip:
    backgroundColor: "{colors.surface-chip}"
    textColor: "{colors.on-background}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.pill}"
    padding: 9px 16px
  feature-band:
    backgroundColor: "{colors.feature-mid}"
    textColor: "{colors.on-background}"
    padding: 68px 0 72px
  site-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-background}"
    rounded: "{rounded.panel}"
    padding: 56px 30px 34px 64px
  site-card-host:
    textColor: "{colors.primary}"
    typography: "{typography.mono-meta}"
  ribbon-wip:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.mono-ribbon}"
    width: 210px
    padding: 6px 0
  footer-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.pill}"
    padding: 22px 26px
  readout-label:
    textColor: "{colors.muted}"
    typography: "{typography.mono-eyebrow}"
  readout-number:
    textColor: "{colors.on-background}"
    typography: "{typography.display-score}"
  hud-pill:
    backgroundColor: "{colors.surface-hud}"
    textColor: "{colors.on-background}"
    typography: "{typography.mono-hud}"
    rounded: "{rounded.pill}"
    padding: 5px 12px
  game-dialog:
    backgroundColor: "{colors.strip-mid}"
    textColor: "{colors.on-background}"
    typography: "{typography.mono-hud}"
    rounded: "{rounded.panel}"
    width: 380px
    padding: 16px 26px 22px
  game-dialog-deadart:
    backgroundColor: "{colors.deadart}"
    textColor: "{colors.on-background}"
    size: 92px
---

# Sharpunk

## Overview

Sharpunk is a two-person web and games studio, and the site is its calling card: a home page with a playable shark runner, a `/web/` page of live client sites, and a `/games/` page featuring NO-KINGS. The mood is **night-sky arcade**: a near-black violet field, slow aurora blobs, a procedural lattice of short strokes, and frosted-glass panels floating over it. It should feel crafted and a little mischievous (glitching wordmark, a shark that will not stop swimming), never corporate.

Three commitments hold everywhere:

- **Dark, locked.** There is no light mode; the brand is dark.
- **Violet is the brand, not a default.** `#9b7bff` comes from the brand itself. The only other hues are the logo's lime, pink and yellow, used as sparks.
- **Motion is ambient and always optional.** Everything that moves (aurora drift, lattice, glitch, metal rim, logo orbit) is slow or rare, and each has a `prefers-reduced-motion` exit.

The self-declared dials in every page header are DESIGN_VARIANCE 8, MOTION_INTENSITY 7, VISUAL_DENSITY 3: varied layouts, lively motion, sparse content.

## Colors

The palette is one violet scale on an ink-violet ground, plus translucent white for glass.

- **Violet (`primary`, #9b7bff):** links in the footer, the site-card host line, focus rings, text selection, the wordmark's ghost copy, the lattice strokes, and the start of the primary button gradient.
- **Deep Violet (`primary-deep`, #6d4ad6):** the far end of the primary button and ribbon gradients. Never a text colour.
- **Lavender (`primary-light`, `--violet-light`, #c6b4ff) and Pale Lavender (`primary-pale`, #d9c9ff):** hover state of the wordmark ghost, the game's labels and prompt key, the /games/ eyebrow, and the end of the italic headline gradient.
- **Night (`background`, `--bg`, #090615):** page ground, the colour the veil vignette fades to, and the ink for text on violet, on the light solid button and in the selection. `--bg-rgb` holds the same colour as channels; every shadow and the dialog scrim is `rgb(var(--bg-rgb) / a)`, so there is one shadow ink.
- **Mist (`on-background`, #ece8fb):** all primary text. **Dusk (`muted`, #9d95bd):** secondary text, nav links at rest, mono labels.
- **Glass (`glass`, `glass-2`, `edge`, `edge-2`, `highlight`):** white at 5.5% / 8.5% fills and 11% / 19% borders, plus a 14% inset top highlight. Because glass is translucent, component tokens use its composited colour over Night: `surface` (#1a1725, the glass gradient's midpoint), `surface-2` (#1e1b29, `glass-2`), `surface-chip` (#4c387f, a fact chip over the feature band) and `surface-hud` (#342e5b, a HUD pill over the strip). These exist for contrast checking; the CSS itself uses the rgba values. `surface-solid` (`--solid`, #14102a) is the one opaque dark surface: it replaces glass under `prefers-reduced-transparency`, sits behind web-card screenshots, and ends the strip gradient.
- **Aurora (`aurora-1..3`):** three blurred radial blobs, purple to indigo to plum, at 55% opacity.
- **Strip sky (`strip-top`, `strip-mid`, `strip-bottom`):** the game strip gradient. Screen two fades into `strip-top` so there is no seam.
- **Feature band (`feature-start/mid/end`):** the /games/ page's one saturated surface. Text on it uses the ordinary tokens: Mist for body and chips, Lavender for the eyebrow; chips are `glass-2` with an `edge-2` border.
- **Sparks (`lime`, `pink`, `yellow`, `ice`):** lime (`--lime`, #a2d541, the exact green in logo.svg; field.js repeats it as channels) is the chromatic-glitch copy and the green streaks in the lattice; pink, violet, ice and white make up the travelling "liquid metal" rim on ghost buttons. Yellow and pink are the logo's stars.
- **Game (`hud-bg`, `hud-edge`, `water`, `waterline`, `deadart`):** the shark strip's own palette, scoped as custom properties on `#game`. HUD text is Mist; radii and font come from the root `--r-pill`, `--r-panel` and `--mono`.

## Typography

Two self-hosted variable fonts, both preloaded: **Outfit** (100 to 900) for everything with a voice, and **JetBrains Mono** (100 to 800) for metadata, labels and the game UI.

- **Body** is Outfit Light (300) at 16px with a generous 1.65 line height. Light body text against heavy display type is the core contrast of the system.
- **Display** is Outfit 700 for the home wordmark and the score readout, tracked tight (-0.045em, -0.03em) and set nearly solid (0.92, 0.9). The wordmark is sized in `vw` so each line fills its column (9.4vw in two columns, 16.2vw single-column, capped at 135px); line two is 0.808 of line one so both render to the same measure.
- **Page and section headlines** drop to Outfit 500 and fluid `clamp()` sizes: page titles `clamp(3rem, 9vw, 7rem)`, the feature title `clamp(2.4rem, 6vw, 4.2rem)`, card titles `clamp(1.5rem, 2.6vw, 2.15rem)`. The italic `<em>` in page titles carries a violet-to-pale gradient clipped to text.
- **Labels** are uppercase and tracked wide: buttons 14px / 700 / 0.12em, the brand wordmark 14px / 700 / 0.18em.
- **Mono** is always small and uppercase with wide tracking. Labels use two trackings only: 0.16em for inline labels (credits, footer, chips) and 0.24em for eyebrows (the score labels, the /games/ kind line). Metadata (the copyable email, site-card hosts) is 12px at 0.1em. The game HUD is the exception: 15px bold at 0.06em, for legibility on a moving scene. Score figures use tabular numerals so they never reflow.

## Layout

A single centred **shell** (max 1340px, 26px side gutters, 18px under 640px) holds every page's content. The nav floats 16px from the top as a glass pill the width of the shell.

- **Home** is two full-viewport screens with mandatory scroll snap; one wheel gesture pages one screen. Screen one is a two-column hero (1.12fr / 0.88fr, 48px gap) of wordmark + CTAs beside the orbiting logo. Screen two stacks credits, a giant score readout and the 300px game strip. The nav is `position: fixed` here so it never offsets the snap points.
- **/web/** is a page header followed by a sticky card stack: each card pins at `96px + i * 20px`, 26px apart, with a 380px tail so the deck can finish assembling.
- **/games/** is a page header followed by a full-bleed saturated feature band (260px portrait + text, 54px gap).
- Spacing is ad hoc rather than a strict scale; the recurring steps are 8, 14, 26, 48 and 72px. Hero and section padding clears the 62px nav (92px top on screen one, 114px on screen two, 74px on page heads).
- Breakpoints: 960px collapses the home hero, 900px collapses the /web/ cards and the /games/ feature, 720px shrinks the game HUD, 700px tightens page heads (to 48 / 36px), 640px the shell, 560px the nav (links drop to 12px).

## Elevation & Depth

Depth comes from **layers of light**, not from a surface-colour ladder:

1. Night ground, then the aurora blobs (blur 90px), then a radial **veil** vignette that darkens the edges back to Night.
2. The procedural **lattice** canvas at 60% opacity: violet strokes brightening in spiral arms or noise ribbons, with lime streaks threading through. It leans away from the pointer.
3. **Glass** panels: 150deg gradient of `glass-2` to `glass`, 1px `edge` border, `backdrop-filter: blur(22px) saturate(150%)`, an inset 1px top highlight, and one deep drop shadow `0 24px 60px rgba(6,4,16,.55)`.

Pill-shaped glass (nav, footer bar) keeps the drop shadow but drops the top highlight, which otherwise reads as a doubled top border. The primary button glows with a violet shadow `0 14px 34px rgba(109,74,214,.34)`. Hover light is additive: a 340px violet spotlight follows the cursor on web cards; ghost buttons carry a rotating conic "liquid metal" rim with a violet bloom.

## Shapes

The radius rule is written into the code: **interactive controls are full pills (999px), panels are 24px.** Nav, nav links, buttons, link pills, fact chips, the footer bar and the game HUD are pills; glass cards, the Larry portrait and the game dialog are 24px panels. Circles (50%) are reserved for the aurora blobs, the logo well and the death-screen art disc. The only small radius is the 4px corner on the email button's focus ring.

Borders follow the same split: glass and site chrome use a 1px edge; the game UI (HUD pills, dialog, waterline, death-art disc) uses 2px, which holds up over the moving strip. The metal rim is a 1.5px masked ring. The "Under construction" ribbon is the one sharp, rotated element, cropped by its card's overflow.

## Components

- **Nav pill:** glass, 62px tall, brand mark (30px logo + tracked wordmark) left, text links right. Links are Dusk at rest and gain Mist text on a `glass-2` fill on hover, focus or `aria-current`.
- **Primary button (Play):** violet gradient (140deg, violet to deep violet), Ink text, inset white highlight and violet glow. Magnetic: it leans toward the pointer. It sits out the metal rim because it already leads on colour.
- **Ghost button (Web, Games):** glass fill, `edge-2` border, Mist text, travelling metal rim; the second one runs its sweep 2.2s out of phase. Both buttons press to `scale(.98)`.
- **Link pill (`.go`, Visit / Read the Codex):** the same on both pages: 12px / 22px glass pill (`glass`, `glass-2` on hover), `edge-2` border, metal rim, violet focus ring, and a trailing arrow that slides 4px on hover while the pill lifts 2px. The solid variant (`.go-solid`) is Mist-filled with Night text and no rim.
- **Site card:** sticky glass panel, text column left, a bleeding screenshot right that scales to 1.03 on hover, a cursor spotlight, and a violet corner ribbon.
- **Feature band:** full-bleed saturated gradient with a portrait card, mono eyebrow, headline, fact chips and a link-pill row.
- **Readout:** mono eyebrow over a giant tabular numeral that shares the wordmark's glitch.
- **Glitch:** a violet copy sits behind the text offset up-left; on a 9s `steps(1)` loop it tears in slices, then splits into violet and lime copies, then rests. Hard jumps, never slides.
- **Email copy button:** a button that looks like text, turning violet on hover and on "Copied".
- **Game HUD and dialog:** mono pills with 2px `hud-edge` borders and an 8px backdrop blur; the dialog is a 24px panel of the same material over a 72% scrim.
- **Footer bar:** glass pill with the brand mark left and the copyable email right, mono uppercase.

Motion uses one signature easing, `cubic-bezier(.16, 1, .3, 1)` (fast out, long settle), at 0.2 to 0.9s, including colour and background transitions.

## Implementation

Tokens, fonts, the aurora, glass, nav, page head, footer, email button, link pill and metal rim live once in `/site.css`, linked from all three pages before their inline `<style>`, which holds only page layout. The link carries `?v=N`; bump it whenever site.css changes, since .htaccess lets browsers keep CSS for an hour.

## Do's and Don'ts

- Do keep the theme dark; there is no light variant to fall back to.
- Do reference the custom properties (`--violet`, `--glass`, `--edge-2`, `--r-pill`) instead of repeating their literals, including inside gradients. For alpha variants use the channel tokens: `rgb(var(--violet-rgb) / .5)`, `rgb(var(--bg-rgb) / .55)`.
- Do make every interactive control a full pill and every panel 24px; do not invent intermediate radii.
- Do use Outfit 300 for body and reserve 700 for the wordmark, readout and button labels. Write weights as numbers, never `bold`.
- Do set mono text small, uppercase and tracked wide, and use tabular numerals for anything that counts.
- Do give every animation a `prefers-reduced-motion` exit, and every glass surface a `prefers-reduced-transparency` solid fallback.
- Do use `cubic-bezier(.16,1,.3,1)` for UI transitions and `steps(1)` for glitch effects.
- Don't set text on Deep Violet: Ink on #6d4ad6 is only 3.4:1.
- Don't add hues beyond the logo's lime, pink and yellow, and don't use them as surfaces; they are sparks.
- Don't put the top highlight on pill-shaped glass.
- Don't repaint large, frequently changing text on top of `backdrop-filter`; the score readout is deliberately not glass.
- Don't set text below 11px; the 8px ribbon is the one existing exception and should not spread.
