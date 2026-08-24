/* ============================================================
   SHARPUNK - the background lattice
   Short vector marks on a lattice, drawn behind the page content.

   Two behaviours out of one file, chosen by the canvas's own markup:

   - data-centre="<selector>": the marks circle that element. The home page
     aims it at the logo, so the lattice spirals around the mark. That canvas
     lives inside its section and does not scroll.

   - no data-centre: the marks follow a noise field instead, which is what
     gives swirls and ribbons somewhere with nothing to orbit. That canvas is
     fixed to the viewport, but the field is sampled in document coordinates
     and the lattice is offset by the scroll position, so the pattern belongs
     to the page and scrolls with it while the canvas itself never grows past
     a single screen. A canvas as tall as a long page would cost tens of
     megabytes of backing store for pixels nobody is looking at.

   Procedural throughout: no assets, one canvas per page, one rAF loop.
   ============================================================ */
(function () {
  const cv = document.querySelector('canvas.field');
  if (!cv || !cv.getContext) return;
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const art = cv.dataset.centre ? document.querySelector(cv.dataset.centre) : null;
  const drifts = !art;

  const VIOLET = '155,123,255';   /* --violet */
  const LIME   = '162,215,65';    /* the logo's green, as the glitch uses */
  const GAP    = 46;              /* lattice spacing: the whole density knob */
  const SWAY   = .38;             /* spiral: radians it winds and unwinds by */
  const ARMS   = 3;               /* spiral: arms coming off the mark */
  const TIGHT  = 3.0;             /* spiral: how fast those arms curl inward */
  const REACH  = 140;             /* px: how far the pointer is felt */
  const PUSH   = .7;              /* how hard marks lean away from it */
  const WOBBLE = .05;             /* idle pivot, radians per unit of noise */
  const LINE_F = 2.0;             /* how many green streaks cross the drift field */
  const LINE_W = .955;             /* threshold for green: lower makes the lines thicker */
  const FPS    = 30;

  let w = 0, h = 0, cx = 0, cy = 0, raf = 0, t = 0, last = 0;
  /* pointer, eased toward the real cursor. ptW is its weight, so leaving the
     canvas fades the deflection out instead of snapping it off.
     cX/cY are the raw viewport coordinates straight off the event. Turning
     them into canvas coordinates needs getBoundingClientRect, which is a
     layout read, and pointermove can fire faster than once a frame on a high
     polling-rate mouse. So the handler only stores numbers and the conversion
     happens once per rendered frame instead of once per event. Re-reading it
     every frame rather than caching also keeps the deflection correct while
     the page scrolls under a stationary cursor. */
  let ptX = 0, ptY = 0, toX = 0, toY = 0, ptW = 0, toW = 0;
  let cX = 0, cY = 0, hasPtr = false;

  /* Three sines per axis: smooth and large-scale, with no lookup table and no
     noise library. The third octave is what stops it reading as a plain grid
     of sine waves. Coordinates are normalised, so the constants are "radians
     across the screen" and the field keeps its character on a phone as well as
     a laptop; in raw pixels the frequency that suits 1440px flattens to a
     single direction at 390px. */
  const fx = (x, y, k) => Math.sin(x / w * 11 + k) + Math.sin(y / h * 13 - k * .7) + Math.sin((x / w + y / h) * 7 + k * .5);
  const fy = (x, y, k) => Math.cos(x / w * 9 - k * .6) + Math.cos(y / h * 12 + k * .8) + Math.cos((x / w - y / h) * 10 - k * .4);

  function size() {
    const r = cv.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    w = r.width; h = r.height;
    /* These are dim, soft strokes; full retina buys nothing here. */
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    if (art) {
      /* Measure the container, not a rotating child: a rotating element's
         bounding box breathes as it turns, which would drag the centre of the
         spiral around with it. */
      const a = art.getBoundingClientRect();
      cx = a.left - r.left + a.width / 2;
      cy = a.top - r.top + a.height / 2;
    }
    return true;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1.2;
    const wind = Math.sin(t) * SWAY;
    const LEN = GAP * .42, R2 = REACH * REACH;
    const oy = drifts ? scrollY : 0;
    /* Start the rows on a document-aligned multiple of GAP, so the lattice
       slides with the content instead of crawling against it. */
    const y0 = drifts ? -(oy % GAP) : GAP / 2;

    for (let y = y0; y < h + GAP; y += GAP) {
      const dy = y + oy;                       /* document space */
      for (let x = GAP / 2; x < w; x += GAP) {
        let bx, by, k, line;

        if (art) {
          const ax = x - cx, ay = y - cy;
          const r = Math.sqrt(ax * ax + ay * ay) || 1;
          bx = -ay / r; by = ax / r;           /* tangent: rings before the wind tilts them */
          /* Squared, so the lit part of each arm is narrow and the gaps stay
             dark. A plain sine leaves the lattice evenly lit and the spiral
             never reads as a shape. */
          const arm = Math.sin(ARMS * Math.atan2(ay, ax) - TIGHT * Math.log(r) + t * 1.2) * .5 + .5;
          /* fade outward, so the spiral is clearly centred on the mark and the
             half of the screen the wordmark sits on stays quiet */
          const fall = 1 - .55 * Math.min(1, r / (Math.max(w, h) * .8));
          k = (.06 + .46 * arm * arm) * fall;
          line = arm;                     /* green runs along the arms themselves */
        } else {
          const s = fx(x, dy, t);
          const a0 = Math.atan2(fy(x, dy, t), s);
          bx = Math.cos(a0); by = Math.sin(a0);
          /* Ribbons: the same scalar folded through a sine and squared, so
             brightness gathers into flowing bands instead of lighting every
             mark equally. This is what stands in for the arms on a page with
             nothing to orbit. */
          const band = Math.sin(s * 1.15 + t * .8) * .5 + .5;
          k = .07 + .42 * band * band;
          /* a second, faster phase off the same scalar, so the green streaks
             cross the ribbons rather than sitting on top of them */
          line = Math.sin(s * LINE_F + t * .8) * .5 + .5;
        }

        /* The idle pivot rides on the noise rather than on the mark's index,
           so neighbours drift together and the lattice breathes instead of
           each mark twitching on its own. */
        const a = (art ? wind : 0) + fx(x, dy, t * 4) * WOBBLE;
        const ca = Math.cos(a), sa = Math.sin(a);
        let vx = bx * ca - by * sa, vy = bx * sa + by * ca;

        /* Pointer: marks lean away from the cursor on a gaussian falloff, so
           the edge of the influence is soft rather than a visible circle. */
        let infl = 0;
        const px = x - ptX, py = y - ptY, pd2 = px * px + py * py;
        if (ptW > .002 && pd2 < R2 * 9) {
          infl = Math.exp(-pd2 / R2) * ptW;
          const pd = Math.sqrt(pd2) || 1;
          vx += px / pd * infl * PUSH;
          vy += py / pd * infl * PUSH;
          const m = Math.sqrt(vx * vx + vy * vy) || 1;
          vx /= m; vy /= m;
        }

        /* Green takes a thin slice of a smooth phase, so the accents land in
           continuous runs and read as lines threading through the lattice.
           Selecting them with a hash instead scatters them one mark at a time,
           which reads as speckle rather than as anything drawn. Because the
           phase is a function of position, the same marks stay green as the
           page scrolls instead of flickering between neighbours. */
        const lime = line > LINE_W;
        /* grow, but only slightly: past the lattice spacing, disturbed marks
           cross their neighbours and it turns to mush */
        const L = LEN * (1 + infl * .3);
        const ex = vx * L, ey = vy * L;
        /* lift the green a little, or the line disappears into the violet at
           the dim end of the ribbon it is crossing */
        ctx.strokeStyle = `rgba(${lime ? LIME : VIOLET},${Math.min(.85, k * (1 + infl * .9) * (lime ? 1.35 : 1))})`;
        ctx.beginPath(); ctx.moveTo(x - ex, y - ey); ctx.lineTo(x + ex, y + ey); ctx.stroke();
      }
    }
  }

  const STEP = 1000 / FPS;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (now - last < STEP) return;
    last = now;
    t += .0016;                  /* a full wind-and-unwind takes about two minutes */
    if (hasPtr) {
      const r = cv.getBoundingClientRect();
      const x = cX - r.left, y = cY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) toW = 0;
      else {
        if (toW === 0) { ptX = x; ptY = y; }   /* no swoop in from the corner */
        toX = x; toY = y; toW = 1;
      }
    }
    /* ease toward the cursor rather than tracking it exactly, so the field lags
       slightly and the deflection feels like it has weight */
    ptX += (toX - ptX) * .16; ptY += (toY - ptY) * .16;
    ptW += (toW - ptW) * .07;
    draw();
  }

  const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  const stop  = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

  function boot() {
    if (!size()) return;
    if (reduce) { cv.style.opacity = ''; draw(); return; }   /* texture, no motion */

    /* Fade in rather than appearing between one frame and the next. Clearing
       the inline value hands opacity back to the stylesheet, so the target
       stays a CSS concern and this does not need to know it. */
    draw();
    requestAnimationFrame(() => {
      cv.style.transition = 'opacity 1.1s ease';
      cv.style.opacity = '';
    });

    /* A canvas pinned inside one section should only burn frames while that
       section is on screen. A fixed one is always on screen, so it just runs;
       rAF already stops on a hidden tab. */
    if (drifts) start();
    else new IntersectionObserver(e => e[0].isIntersecting ? start() : stop(),
      { threshold: 0 }).observe(cv.parentElement);
  }

  /* defer is enough to keep this out of parsing, but a deferred script still
     runs before DOMContentLoaded, and the first size() + draw() would land in
     front of the page's own first paint. Waiting for an idle moment puts the
     content on screen first and the decoration second. The timeout keeps it
     from being starved on a busy page, and the fallback covers browsers with
     no requestIdleCallback. */
  cv.style.opacity = '0';
  if (typeof requestIdleCallback === 'function') requestIdleCallback(boot, { timeout: 1500 });
  else addEventListener('load', () => setTimeout(boot, 150), { once: true });

  /* Listen on the document: the canvas is pointer-events: none so the page
     stays clickable, and moves over the content bubble up here anyway. Falling
     outside the canvas is what releases the deflection, which covers both the
     fixed canvas and the one that only spans the first screen. */
  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;    /* no hover to speak of */
    cX = e.clientX; cY = e.clientY; hasPtr = true;
  }, { passive: true });

  let rz = 0;
  addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => { if (size() && reduce) draw(); }, 200);
  });
})();
