# 1845 Nixie Showcase — audit log

Reference viewport used for visual QA: **1536×1024**.

## Decision 01 — native recreation, no screenshot background

**Decision:** rebuild the hero with real HTML/CSS/SVG elements. The approved reference is used only for visual comparison.

**Audit:** production HTML/CSS/JS contains no `hero-reference|, `reference-image` image layer, remote image, or full-screen screenshot layer. Five separate `.tube` elements are present; the colon is a dedicated `.tube-colon`.

## Decision 02 — hero geometry

**Target anchors from the reference:** logo around x64; Nixie installation around x205–1280 / y140–580; headline around x77 / y682; main CTA around y848.

**Measured native layout at 1536×1024:**
- logo: x64.5 / y25;
- Nixie rig: x208.1 / y144.9 / width 1072.1 / bottom 579.1;
- headline: x77.6 / y682.0;
- primary CTA: x77.6 / y847.7;
- intro: x592.4 / y696.3;
- social rail: x1429.6 / y547.8.

**Result:** key geometry is within a small visual delta of the reference while remaining responsive.

## Decision 03 — Nixie material language

**Decision:** build each tube from glass, neck, inner rim, honeycomb mesh, electrodes, SVG cathode, reflections, metal socket and pins.

**Audit changes after screenshot review:**
- reduced overly tall necks;
- replaced chevron-like grid with an actual hex/honeycomb SVG pattern;
- increased glass edge reflection and inner rim depth;
- added orange floor reflections under each tube;
- increased hot cathode core and bloom without turning the scene into generic neon.

## Decision 04 — orbit composition

**Decision:** keep the orbit as native CSS/vector UI rather than a bitmap.

**Audit:** first pass spread the four items too widely and too low. Final marker centers at 1536×1024 are approximately x951 / 1074 / 1196 / 1319 and y707, closely matching the reference rhythm while the orbit ellipses remain wider than the content grid.

## Decision 05 — random Nixie flicker

**Decision:** every lamp, including `:`, runs an independent randomized timer with normal, dim and flare states.

**Runtime audit:** over an ~9 s sample all five tubes independently reached all three states (`normal`, `is-dim`, `is-flare`). Timers are not synchronized.

## Decision 06 — motion accessibility

**Decision:** respect `prefers-reduced-motion`.

**Audit:** with reduced motion emulated for 2.5 s, the number of tubes carrying `is-dim` or `is-flare` remained **0**. Pointer tilt is also disabled.

## Decision 07 — responsive behavior

**Audited viewports:** 1536×1024, 1280×800, 768×1024, 390×844.

**Results:**
- no horizontal overflow at any audited width;
- exactly five tubes remain present;
- desktop hero remains 1 viewport tall where appropriate;
- mobile reflows to a vertical presentation rather than shrinking the desktop layout;
- hamburger opens the navigation, updates `aria-expanded`, closes on link selection and Escape.

## Decision 08 — technical QA

- `node --check script.js`: pass;
- static QA: pass;
- browser page errors: none in all audited viewports;
- local runtime assets only;
- no production dependency on the original reference image.
