# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a hand-built static portfolio site with six case studies at individually linkable URLs, deployed to GitHub Pages, that wins automation and data-systems work on Upwork and OnlineJobs.ph.

**Architecture:** Static multi-page site — hand-written HTML and CSS, one small vanilla JS file, no framework, no build step, no backend, no runtime dependencies. Each case study is its own `.html` file under `work/` so it can be deep-linked as a single Upwork portfolio item. A single `assets/css/site.css` carries design tokens and every component; there is no per-page stylesheet. Deployed by pushing to a `<username>.github.io` repo.

**Tech Stack:** HTML5, CSS (custom properties, `clamp()` type scale, CSS grid), vanilla JS (IntersectionObserver only), git, GitHub Pages. Dev-time only via `npx`: `html-validate`, `linkinator`, `lighthouse`.

**Spec:** `docs/superpowers/specs/2026-08-03-portfolio-site-design.md`

## Global Constraints

- **No dependencies in the shipped site.** No frameworks, no CDN links, no webfonts, no build step. System font stacks only.
- **No client data, ever.** No client or employer-client names, no logos, no ASINs or real product identifiers, no real revenue/volume/inventory/headcount figures, no third-party vendor or warehouse partner names. Every visual is captured from a synthetic rebuild, never from a client file. Blurring a client artifact is explicitly forbidden — rebuild it.
- **The rebuild precedes the screenshot.** There is no stage at which a client file is captured, even temporarily.
- **No-JS baseline.** Every page fully readable and navigable with JavaScript disabled. JS adds scroll-reveal only. This has a second, harder half: content must also survive JS being *enabled* while `site.js` fails to load. The `data-reveal-ready` sentinel in the inline head script is what guarantees it — never ship one without the other.
- **`<!DOCTYPE html>` uppercase**, on every page. `html-validate`'s `doctype-style` rule requires it; lowercase fails the build check.
- **Copy shared chrome from the on-disk `_partials.html`, not from this plan's inline snippets.** Where they ever disagree, the file wins.
- **Responsive at 375px, 768px, 1440px.** No horizontal body scroll at any width.
- **Lighthouse performance ≥ 90 and accessibility ≥ 90** on every page.
- **No image over 300KB.** Strip EXIF from every image.
- **Every proof number must be defensible in a client call.** If the owner cannot substantiate a figure, it is cut, not estimated.
- **Outcome-framed headlines.** Case study titles state the result, not the artifact.
- **Positioning:** lead with automation / systems builder; broad services listed underneath, never in the headline.
- **Commit after every task.** Conventional commit prefixes (`feat:`, `chore:`, `docs:`, `fix:`).

---

## File Structure

| Path | Responsibility |
|------|----------------|
| `index.html` | Landing page: hero, proof strip, work grid, services, stack, about, contact |
| `work/campaign-launcher.html` | **Flagship** case study — Amazon campaign generation desktop app |
| `work/bid-optimisation-autorun.html` | Case study — scheduled VBA/PowerShell automation across 38 workbooks |
| `work/search-term-audit.html` | Case study — cannibalisation detection; the zip-reader engineering story |
| `work/campaign-pausing-tool.html` | Case study — weekly pausing pass, non-mutating by design |
| `work/catalog-alerting.html` | Case study — Cloud Run + BigQuery diff-and-notify service |
| `work/inventory-forecasting.html` | Case study — multi-location inventory and supply planning |
| `assets/css/site.css` | All styling: tokens, base, layout primitives, every component |
| `assets/js/site.js` | Scroll-reveal only. Nothing else. |
| `assets/img/` | Images from synthetic rebuilds, compressed, EXIF-stripped, plus `portrait.jpg` for the About section |
| `assets/Borabo-CV.pdf` | Updated CV, downloadable |
| `_partials.html` | Not shipped. Reference copy of header/footer markup to paste into new pages. |
| `.nojekyll` | Stops GitHub Pages running Jekyll over the site |
| `README.md` | Repo readme — doubles as a capability signal since the repo is public |

Because there is no templating engine, `_partials.html` is the single source of truth for shared chrome. When header or footer markup changes, it changes there first, then gets propagated to all seven pages in the same commit.

---

## Task 1: Repository scaffold

**Files:**
- Create: `.gitignore`, `.nojekyll`, `README.md`
- Create: `assets/css/site.css` (empty placeholder committed in Task 2), `assets/js/`, `assets/img/`, `work/`
- Commit: existing `docs/superpowers/specs/` and `docs/superpowers/plans/`

**Interfaces:**
- Consumes: nothing
- Produces: a git repository at `C:\Portfolio` with `main` as the default branch, and the directory layout every later task writes into.

- [ ] **Step 1: Initialize the repository**

```bash
cd /c/Portfolio
git init -b main
git config user.name "John Patrick Borabo"
git config user.email "jaypee@amsmanagement.agency"
```

- [ ] **Step 2: Create `.gitignore`**

The CV PDF sitting in the repo root is a working file, not a deliverable — the published copy lives at `assets/Borabo-CV.pdf`. Keep the root PDF out of git.

```gitignore
# OS
Thumbs.db
Desktop.ini
.DS_Store

# Editors
.vscode/
.idea/

# Working files, not deliverables
/*.pdf

# Tooling
node_modules/
*.log
```

- [ ] **Step 3: Create `.nojekyll`**

GitHub Pages runs Jekyll by default, which ignores files and directories beginning with an underscore. `_partials.html` is not shipped, but the flag also removes a build step we do not want. Create an empty file:

```bash
touch /c/Portfolio/.nojekyll
```

- [ ] **Step 4: Create the directory layout**

```bash
mkdir -p /c/Portfolio/work /c/Portfolio/assets/css /c/Portfolio/assets/js /c/Portfolio/assets/img
```

- [ ] **Step 5: Write `README.md`**

The repo is public, so a recruiter or client may read this before the site. It is a capability signal, and it must respect the confidentiality constraint.

```markdown
# jpborabo.github.io

Portfolio site for John Patrick Borabo — Automation & Data Systems Specialist.

Hand-written HTML and CSS. No framework, no build step, no dependencies, no
JavaScript beyond a scroll-reveal observer. Deployed via GitHub Pages.

## Structure

- `index.html` — landing page
- `work/*.html` — one page per case study
- `assets/css/site.css` — all styling; design tokens at the top
- `assets/js/site.js` — scroll reveal only
- `_partials.html` — reference markup for shared header/footer (not shipped)

## Local preview

```
python -m http.server 8000
```

Then open http://localhost:8000.

## A note on the case studies

Every figure, product name, and screenshot on this site comes from a synthetic
rebuild. No client data, client name, or vendor name appears anywhere in this
repository.
```

- [ ] **Step 6: Verify the layout exists and nothing unwanted is staged**

```bash
cd /c/Portfolio && git add -A && git status --short
```

Expected: `.gitignore`, `.nojekyll`, `README.md`, and the two `docs/superpowers/` markdown files staged. The root `John Patrick Borabo_CV v2.pdf` must **not** appear. If it does, `.gitignore` is wrong — fix it before committing.

- [ ] **Step 7: Commit**

```bash
cd /c/Portfolio
git commit -m "chore: scaffold portfolio site repo with design spec and plan"
```

---

## Task 2: Design system and shared page chrome

**Files:**
- Create: `assets/css/site.css`
- Create: `assets/js/site.js`
- Create: `_partials.html`
- Create: `preview.html` (temporary — deleted in Step 7)

**Interfaces:**
- Consumes: the directory layout from Task 1.
- Produces: the complete CSS contract every later page depends on. Class names later tasks must use exactly as written:
  - Layout: `.wrap`, `.wrap--narrow`, `.section`, `.section--tint`
  - Chrome: `.site-header`, `.site-nav`, `.site-footer`, `.skip-link`
  - Type: `.eyebrow`, `.h1`, `.h2`, `.h3`, `.lede`, `.prose`
  - Components: `.btn`, `.btn--primary`, `.btn--ghost`, `.proof`, `.proof__item`, `.proof__num`, `.proof__label`, `.work-grid`, `.work-card`, `.work-card__title`, `.work-card__meta`, `.tags`, `.tag`, `.svc-grid`, `.svc`, `.stack-group`, `.figure`, `.figure__cap`, `.cs-section`, `.result-list`, `.about-grid`, `.portrait`, `.reveal`
  - Also produces: an inline head script that sets `class="js"` on `<html>`, and `site.js` exposing no globals.

Design direction, decided and not up for reinterpretation during implementation: precise and technical, not "creative portfolio." Tight sans-serif headings, generous whitespace, monospace for every number, tag, and identifier. Deep teal accent — analytical rather than startup-purple. One accent colour only. No gradients, no glassmorphism, no drop shadows other than the single card hover lift.

- [ ] **Step 1: Write `assets/css/site.css`**

```css
/* ==========================================================================
   Design tokens
   ========================================================================== */
:root {
  --ink:        #14181c;
  --ink-soft:   #4a545e;   /* 7.40:1 on --paper, 6.90:1 on --paper-tint */
  --ink-faint:  #656e77;   /* 4.97:1 on --paper, 4.64:1 on --paper-tint — both AA.
                              Do NOT lighten: this token is used at 12.5px and 14px
                              (.work-card__meta, .figure__cap, .stack-group h3), which
                              is below the large-text threshold, so 4.5:1 is the bar. */
  --paper:      #fbfaf8;
  --paper-tint: #f4f2ee;
  --line:       #e3e0da;
  --accent:     #0f5c5a;
  --accent-ink: #0a3f3e;
  --accent-bg:  #e7f0ef;

  --sans: ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --mono: ui-monospace, "Cascadia Mono", "Cascadia Code", Consolas, "Liberation Mono", monospace;

  /* Fluid type scale */
  --fs-hero: clamp(2.25rem, 1.4rem + 4.2vw, 4rem);
  --fs-h2:   clamp(1.5rem, 1.15rem + 1.6vw, 2.25rem);
  --fs-h3:   clamp(1.125rem, 1rem + 0.6vw, 1.375rem);
  --fs-lede: clamp(1.0625rem, 1rem + 0.5vw, 1.3125rem);
  --fs-body: 1rem;
  --fs-sm:   0.875rem;
  --fs-xs:   0.78125rem;

  --sp-1: 0.25rem;  --sp-2: 0.5rem;   --sp-3: 0.75rem;  --sp-4: 1rem;
  --sp-5: 1.5rem;   --sp-6: 2rem;     --sp-7: 3rem;     --sp-8: 4rem;
  --sp-9: 6rem;

  --wrap:  72rem;
  --measure: 38rem;
  --radius: 4px;
}

/* ==========================================================================
   Base
   ========================================================================== */
*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font: var(--fs-body)/1.65 var(--sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

img { max-width: 100%; height: auto; display: block; }

a { color: var(--accent); text-decoration-thickness: 1px; text-underline-offset: 2px; }
a:hover { color: var(--accent-ink); }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.skip-link {
  position: absolute; left: -9999px;
  background: var(--ink); color: var(--paper);
  padding: var(--sp-3) var(--sp-4); z-index: 100;
}
.skip-link:focus { left: var(--sp-4); top: var(--sp-4); }

/* ==========================================================================
   Layout
   ========================================================================== */
.wrap {
  width: 100%; max-width: var(--wrap);
  margin-inline: auto;
  padding-inline: var(--sp-5);
}
.wrap--narrow { max-width: 46rem; }

.section { padding-block: var(--sp-8); }
.section--tint {
  background: var(--paper-tint);
  border-block: 1px solid var(--line);
}

@media (min-width: 48rem) {
  .section { padding-block: var(--sp-9); }
}

/* ==========================================================================
   Typography
   ========================================================================== */
.eyebrow {
  font: 600 var(--fs-xs)/1.2 var(--mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 var(--sp-3);
}

.h1, .h2, .h3 {
  margin: 0 0 var(--sp-4);
  font-weight: 680;
  letter-spacing: -0.021em;
  line-height: 1.1;
  text-wrap: balance;
}
.h1 { font-size: var(--fs-hero); }
.h2 { font-size: var(--fs-h2); }
.h3 { font-size: var(--fs-h3); line-height: 1.25; letter-spacing: -0.012em; }

.lede {
  font-size: var(--fs-lede);
  line-height: 1.5;
  color: var(--ink-soft);
  max-width: 34rem;
  margin: 0 0 var(--sp-6);
  text-wrap: pretty;
}

.prose { max-width: var(--measure); }
.prose p { margin: 0 0 var(--sp-4); text-wrap: pretty; }
.prose > :last-child { margin-bottom: 0; }

/* ==========================================================================
   Buttons
   ========================================================================== */
.btn {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-5);
  border: 1px solid var(--ink);
  border-radius: var(--radius);
  font: 600 var(--fs-sm)/1 var(--sans);
  text-decoration: none;
  transition: background-color .15s ease, color .15s ease, border-color .15s ease;
}
.btn--primary { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.btn--primary:hover { background: var(--accent-ink); border-color: var(--accent-ink); color: var(--paper); }
.btn--ghost { background: transparent; color: var(--ink); }
.btn--ghost:hover { background: var(--ink); color: var(--paper); }

.btn-row { display: flex; flex-wrap: wrap; gap: var(--sp-3); }

/* ==========================================================================
   Header / footer
   ========================================================================== */
.site-header {
  border-bottom: 1px solid var(--line);
  background: var(--paper);
}
.site-header .wrap {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: var(--sp-3) var(--sp-5);
  padding-block: var(--sp-4);
}
.site-header__name {
  font: 680 var(--fs-sm)/1 var(--sans);
  letter-spacing: -0.01em;
  text-decoration: none; color: var(--ink);
  margin-right: auto;
}
.site-nav ul {
  display: flex; flex-wrap: wrap; gap: var(--sp-2) var(--sp-5);
  list-style: none; margin: 0; padding: 0;
}
.site-nav a {
  font: 500 var(--fs-sm)/1 var(--sans);
  color: var(--ink-soft); text-decoration: none;
}
.site-nav a:hover, .site-nav a[aria-current="page"] { color: var(--accent); }

.site-footer {
  border-top: 1px solid var(--line);
  padding-block: var(--sp-6);
  font-size: var(--fs-sm);
  color: var(--ink-faint);
}
.site-footer .wrap {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--sp-4);
}

/* ==========================================================================
   Proof strip
   ========================================================================== */
.proof {
  display: grid; gap: var(--sp-5);
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  list-style: none; margin: 0; padding: 0;
}
.proof__num {
  display: block;
  font: 600 clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem)/1 var(--mono);
  letter-spacing: -0.03em;
  color: var(--ink);
}
.proof__label {
  display: block; margin-top: var(--sp-2);
  font-size: var(--fs-sm); color: var(--ink-soft);
}

/* ==========================================================================
   Work grid
   ========================================================================== */
.work-grid {
  display: grid; gap: var(--sp-5);
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  list-style: none; margin: 0; padding: 0;
}
.work-card {
  display: flex; flex-direction: column;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none; color: inherit;
  transition: border-color .15s ease, transform .15s ease, box-shadow .15s ease;
}
.work-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px -12px rgb(20 24 28 / 0.35);
}
.work-card img {
  aspect-ratio: 16 / 10; object-fit: cover;
  border-bottom: 1px solid var(--line);
  background: var(--paper-tint);
}
.work-card__body { padding: var(--sp-5); display: flex; flex-direction: column; gap: var(--sp-3); flex: 1; }
.work-card__title { font: 680 var(--fs-h3)/1.25 var(--sans); letter-spacing: -0.012em; margin: 0; }
.work-card__meta { font: 500 var(--fs-xs)/1.4 var(--mono); color: var(--ink-faint); margin: 0; }
.work-card p { margin: 0; color: var(--ink-soft); font-size: var(--fs-sm); }

/* ==========================================================================
   Tags
   ========================================================================== */
.tags { display: flex; flex-wrap: wrap; gap: var(--sp-2); list-style: none; margin: 0; padding: 0; }
.tag {
  padding: var(--sp-1) var(--sp-3);
  background: var(--accent-bg); color: var(--accent-ink);
  border-radius: 999px;
  font: 500 var(--fs-xs)/1.5 var(--mono);
}

/* ==========================================================================
   Services / stack
   ========================================================================== */
.svc-grid {
  display: grid; gap: var(--sp-5) var(--sp-6);
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  list-style: none; margin: 0; padding: 0;
}
.svc { border-top: 2px solid var(--ink); padding-top: var(--sp-4); }
.svc h3 { font: 680 var(--fs-body)/1.3 var(--sans); margin: 0 0 var(--sp-2); }
.svc p { margin: 0; font-size: var(--fs-sm); color: var(--ink-soft); }

.stack-group { margin-bottom: var(--sp-5); }
.stack-group h3 {
  font: 600 var(--fs-xs)/1.2 var(--mono);
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-faint); margin: 0 0 var(--sp-3);
}

/* ==========================================================================
   Case study internals
   ========================================================================== */
.cs-section { margin-bottom: var(--sp-7); }
.cs-section > .h2 { margin-bottom: var(--sp-4); }

.figure { margin: var(--sp-6) 0; }
.figure img { border: 1px solid var(--line); border-radius: var(--radius); }
.figure__cap {
  margin-top: var(--sp-3);
  font-size: var(--fs-sm); color: var(--ink-faint);
  max-width: var(--measure);
}

.result-list { list-style: none; margin: 0; padding: 0; }
.result-list li {
  padding-left: var(--sp-5); position: relative;
  margin-bottom: var(--sp-3); max-width: var(--measure);
}
.result-list li::before {
  content: "→"; position: absolute; left: 0;
  color: var(--accent); font-family: var(--mono);
}

/* Tables and wide blocks scroll inside themselves, never the page */
.scroll-x { overflow-x: auto; -webkit-overflow-scrolling: touch; }

/* ==========================================================================
   About, with portrait
   ========================================================================== */
.about-grid {
  display: grid; gap: var(--sp-5);
  grid-template-columns: 1fr;
  align-items: start;
}
.about-grid__body > :last-child { margin-bottom: 0; }
.portrait {
  width: 9rem; aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper-tint);
}

@media (min-width: 40rem) {
  .about-grid { grid-template-columns: 9rem minmax(0, 1fr); gap: var(--sp-6); }
}

/* ==========================================================================
   Scroll reveal — opt-in, and only when JS is present
   ========================================================================== */
.js .reveal { opacity: 0; transform: translateY(8px); }
.js .reveal.is-in {
  opacity: 1; transform: none;
  transition: opacity .5s ease, transform .5s ease;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .js .reveal { opacity: 1; transform: none; }
  .js .reveal.is-in { transition: none; }
  .work-card { transition: none; }
  .work-card:hover { transform: none; }
}
```

- [ ] **Step 2: Write `assets/js/site.js`**

Scroll reveal only. No globals, no nav logic — the nav is plain wrapping links that work without JS, which is why there is no toggle to break.

```js
/* Scroll reveal. The `js` class is set by an inline script in <head>, so elements
   are visible by default when JS is unavailable.

   The data-reveal-ready attribute below is a liveness signal, not decoration. The
   inline script starts a 2s timer that strips the `js` class unless this file has
   marked itself ready. Without it, a failed request for this script — a wrong
   ../assets/ depth on a work/ page being the likely cause — would leave every
   .reveal block hidden with nothing able to unhide it. Set it before any early
   return, so a page with no .reveal elements also counts as ready. */
(function () {
  "use strict";

  document.documentElement.setAttribute("data-reveal-ready", "");

  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add("is-in");
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  targets.forEach(function (el) { observer.observe(el); });
})();
```

- [ ] **Step 3: Write `_partials.html`**

This file is never linked or deployed. It is the copy source for shared chrome. Every page's `<head>`, header, and footer come from here verbatim, with only `<title>`, `<meta name="description">`, the `../` path depth, and `aria-current` changing.

```html
<!-- ============================================================
     HEAD — for pages in work/, change assets/ to ../assets/
     ============================================================ -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PAGE TITLE — John Patrick Borabo</title>
<meta name="description" content="ONE SENTENCE, UNDER 160 CHARS.">
<link rel="stylesheet" href="assets/css/site.css">
<script>(function(h){h.className+=" js";setTimeout(function(){if(!h.hasAttribute("data-reveal-ready")){h.className=h.className.replace(/\s*\bjs\b/,"");}},2000);})(document.documentElement);</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<!-- ============================================================
     HEADER — index.html version. In work/ pages, prefix hrefs
     with ../ and set aria-current="page" on Work.
     ============================================================ -->
<header class="site-header">
  <div class="wrap">
    <a class="site-header__name" href="index.html">John Patrick Borabo</a>
    <nav class="site-nav" aria-label="Main">
      <ul>
        <li><a href="index.html#work">Work</a></li>
        <li><a href="index.html#services">Services</a></li>
        <li><a href="index.html#stack">Stack</a></li>
        <li><a href="index.html#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main">
  <!-- page content -->
</main>

<!-- ============================================================
     FOOTER — in work/ pages, prefix hrefs with ../
     ============================================================ -->
<footer class="site-footer">
  <div class="wrap">
    <p>John Patrick Borabo — Automation &amp; Data Systems Specialist. Antipolo City, Philippines (UTC+8).</p>
    <p><a href="mailto:jaypee@amsmanagement.agency">jaypee@amsmanagement.agency</a></p>
  </div>
</footer>
<script src="assets/js/site.js"></script>
</body>
</html>
```

- [ ] **Step 4: Write `preview.html` to exercise every component**

Temporary harness so the design system can be verified before any real content exists. Paste the head/header/footer from `_partials.html`, and inside `<main>`:

```html
<section class="section">
  <div class="wrap">
    <p class="eyebrow">Automation &amp; Data Systems</p>
    <h1 class="h1">Component preview</h1>
    <p class="lede">Every component in site.css rendered once, so the design system can be checked before real content exists.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="#">Primary action</a>
      <a class="btn btn--ghost" href="#">Ghost action</a>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <ul class="proof">
      <li class="proof__item"><span class="proof__num">8+</span><span class="proof__label">Years in data and reporting</span></li>
      <li class="proof__item"><span class="proof__num">6</span><span class="proof__label">Inventory locations reconciled</span></li>
      <li class="proof__item"><span class="proof__num">4h→5m</span><span class="proof__label">Daily report runtime</span></li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="h2">Work grid</h2>
    <ul class="work-grid">
      <li><a class="work-card" href="#">
        <img src="assets/img/placeholder.png" alt="">
        <div class="work-card__body">
          <p class="work-card__meta">Amazon brand · Sheets + BigQuery</p>
          <h3 class="work-card__title">Cut a four-hour daily stock count to five minutes</h3>
          <p>Multi-warehouse inventory forecasting and factory PO planning.</p>
          <ul class="tags"><li class="tag">BigQuery</li><li class="tag">Apps Script</li></ul>
        </div>
      </a></li>
    </ul>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <h2 class="h2">Services</h2>
    <ul class="svc-grid">
      <li class="svc"><h3>Report &amp; pipeline automation</h3><p>Manual spreadsheet routines replaced with scheduled jobs.</p></li>
      <li class="svc"><h3>Dashboards &amp; BI</h3><p>Looker Studio and Power BI reporting leadership actually opens.</p></li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap wrap--narrow prose">
    <div class="cs-section">
      <h2 class="h2">Case study internals</h2>
      <p>Prose measure check. This paragraph should never exceed roughly 38rem in width regardless of viewport size.</p>
      <ul class="result-list">
        <li>Result item rendered with the arrow marker.</li>
        <li>Second result item.</li>
      </ul>
      <figure class="figure">
        <img src="assets/img/placeholder.png" alt="">
        <figcaption class="figure__cap">Figure caption. Rebuilt with synthetic data.</figcaption>
      </figure>
    </div>
    <div class="about-grid">
      <img class="portrait" src="assets/img/placeholder.png" alt="">
      <div class="about-grid__body">
        <p>Portrait sits beside the About copy. At 375px this must stack, with the portrait above the text and not stretched. At 640px and wider it becomes a fixed 9rem column.</p>
        <p>Second paragraph, to confirm the last-child margin reset works.</p>
      </div>
    </div>
    <div class="reveal"><p>This block is scroll-revealed when JS is on, and plainly visible when JS is off.</p></div>
  </div>
</section>
```

Generate the placeholder image so the preview has no broken references:

```bash
cd /c/Portfolio && python -c "
import zlib, struct
w, h = 1600, 1000
row = b'\x00' + b'\xf4\xf2\xee' * w
raw = row * h
def chunk(t, d):
    return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d))
png = (b'\x89PNG\r\n\x1a\n'
    + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
    + chunk(b'IDAT', zlib.compress(raw, 9))
    + chunk(b'IEND', b''))
open('assets/img/placeholder.png','wb').write(png)
print('wrote', len(png), 'bytes')
"
```

- [ ] **Step 5: Verify — validate the markup**

```bash
cd /c/Portfolio && npx --yes html-validate preview.html
```

Expected: no errors. Common real failures to fix rather than suppress: a heading level skipped, an `<img>` missing `alt`, a `<li>` that is not a direct child of `<ul>`.

- [ ] **Step 6: Verify — render at all three widths, JS on and off**

```bash
cd /c/Portfolio && python -m http.server 8000
```

Load `http://localhost:8000/preview.html` and confirm, at 375px, 768px, and 1440px:

- No horizontal scrollbar on `<body>` at any width
- The `.lede` and `.prose` text never runs wider than a comfortable measure on desktop
- `.proof` reflows to a single column at 375px without clipping the numbers
- `.work-grid` is one column at 375px, multi-column by 768px
- The header nav wraps below the name at 375px rather than overflowing
- `.about-grid` stacks at 375px with the portrait square and not distorted, and becomes a two-column layout at 768px
- Tab key reaches the skip link first, and it becomes visible on focus
- With JS disabled, the `.reveal` block is fully visible
- **Script-failure failsafe:** temporarily rename `assets/js/site.js`, reload with JS still enabled, wait 2 seconds, and confirm the `.reveal` block becomes visible. Then restore the filename. This simulates the real failure — a bad script path — and it is the check that proves the `data-reveal-ready` sentinel works. A passing no-JS check does not cover this case, because with JS off the inline script never runs at all.

Fix any failure in `site.css` before continuing. This stylesheet is the contract for seven pages; a defect here multiplies.

- [ ] **Step 7: Delete the preview harness**

`preview.html` exists only for Step 5 and 6 and must not ship. Keep `placeholder.png` — later tasks use it as the stand-in until real figures exist.

```bash
cd /c/Portfolio && rm preview.html
```

- [ ] **Step 8: Commit**

```bash
cd /c/Portfolio
git add assets/css/site.css assets/js/site.js _partials.html assets/img/placeholder.png
git commit -m "feat: add design system, scroll-reveal script, and shared page chrome"
```

---

## REVISION 2026-09-02 — read before executing any task from here on

The owner disclosed seven project directories after Task 2. A read-only survey found a much larger
body of work than this plan was written against. Consequences for the tasks below:

1. **The case study lineup changed.** See the spec's revised section 5 and the file structure table
   above. Technical source material for every page: `docs/case-study-source-material.md`.
2. **The flagship moved** from inventory forecasting to Campaign Launcher — objectively the
   strongest work, its documentation is clean and directly quotable, and it needs nothing from the
   owner before its page can be written. It therefore becomes the template-proving page.
3. **Task 3 (the synthetic sheet rebuild) is deferred**, not cancelled. It belongs to the inventory
   forecasting page, which is now the last of the six. It remains blocked on the owner.
4. **Visuals invert: diagrams first, screenshots second.** Hand-authored SVG architecture and
   data-flow diagrams are better evidence for engineering work than UI captures, and they are safe
   by construction — they contain only what the author puts in them. Screenshots are an optional
   later addition, so no page is blocked waiting for one.
5. **A scrub list now exists** at `.superpowers/sdd/2026-08-03-portfolio-site/SCRUB-LIST.md`,
   deliberately outside version control. It is the authoritative input to the pre-publish sweep and
   it also names the handful of documentation files verified clean and safe to quote. Roughly 45
   real client names are in scope, several of them recognisable companies.
6. **Proof numbers are scale and test counts only.** 772 test cases across the three desktop apps,
   38 client accounts weekly — all countable from the repositories. Four of six projects have no
   documented before/after baseline, so no time-saved claim appears anywhere without the owner
   supplying one he can defend.

---

## Task 3: Inventory forecasting — synthetic rebuild (DEFERRED, still owner-blocked)

**Files:**
- Create: a new Google Sheet, owned by the owner's personal Google account, titled `Omni Inventory Forecasting — Portfolio Demo`
- Create: `assets/img/inventory-forecast-sheet.png`, `assets/img/inventory-forecast-po.png`, `assets/img/inventory-forecast-arch.svg`

**Interfaces:**
- Consumes: the structure documented in spec section 5, "Flagship detail: inventory forecasting."
- Produces: three image assets under `assets/img/`, referenced by name in Task 4.

This task creates no client-data exposure: nothing is copied from the client file. The structure is reproduced from the spec's written description, and every value is invented.

- [ ] **Step 1: Create the demo sheet in a personal account**

Not the AMS account. A portfolio asset the owner keeps after leaving the role must not live in company Drive.

Tabs, matching the real system's shape:

| Tab | Contents |
|-----|----------|
| `INVENTORY FORECASTING` | Main grid, one row per SKU |
| `FACTORY PO FORECASTING` | Recommended purchase orders |
| `FORECASTING FORMULA` | The calculation layer |
| `LEAD TIMES` | Days per supplier per SKU |
| `MOQS` | Minimum order quantity per SKU |
| `SHORT NAMES` | Display-name normalization |

- [ ] **Step 2: Populate `INVENTORY FORECASTING` with synthetic data**

Column headers, in order. Node names are generic — no real warehouse, 3PL, or vendor name appears:

```
Product Name | Short Name | Liquid / Non-Liquid | SKU | Comment |
In-House Storage | 3PL East | 3PL West | Factory Stock (Overseas) |
Inbound In-Transit | Available at Marketplace FC | Open POs |
Total Available | Weeks of Cover | Reorder Flag
```

Twenty-four invented rows in the pet-grooming category, so the domain still reads as real e-commerce. Use an invented SKU scheme — `DGS-1001`, `DGB-2014` — never an ASIN-shaped identifier, and never a real ASIN.

```
Dog Shampoo, Lavender          | Shampoo Lavender      | Liquid     | DGS-1001
Dog Shampoo, Ocean Breeze      | Shampoo Ocean         | Liquid     | DGS-1002
Slicker Brush, Large           | Slicker Large         | Non-Liquid | DGB-2011
Slicker Brush, Small           | Slicker Small         | Non-Liquid | DGB-2012
Detangling Spray, Leave-in     | Detangler Spray       | Liquid     | DGS-1015
Metal Grooming Comb            | Metal Comb            | Non-Liquid | DGB-2020
Grooming Scissors Kit, 4-Piece | Scissors Kit          | Non-Liquid | DGB-2033
Dematting Rake                 | Dematting Rake        | Non-Liquid | DGB-2041
Whitening Shampoo              | Shampoo Whitening     | Liquid     | DGS-1022
Oatmeal Conditioner            | Conditioner Oatmeal   | Liquid     | DGS-1030
Grooming Vacuum, Professional  | Grooming Vacuum       | Non-Liquid | DGB-2050
Nail Clipper Set               | Nail Clippers         | Non-Liquid | DGB-2055
```

Continue to twenty-four rows in the same pattern. Quantities: plausible three- and four-digit figures. Deliberately include two rows with a negative `Total Available` and three with `Weeks of Cover` under 4 — the screenshot needs to show the sheet catching problems, since that is the entire value proposition.

- [ ] **Step 3: Build the calculation layer**

Real formulas, because a client may zoom into the screenshot. In `INVENTORY FORECASTING`:

```
Total Available   = SUM(In-House : Available at Marketplace FC)
Weeks of Cover    = IFERROR(Total Available / Weekly Velocity, 0)
Reorder Flag      = IF(Weeks of Cover < Lead Time Weeks + Safety Weeks, "REORDER", "OK")
```

Lead times come from the `LEAD TIMES` tab by `VLOOKUP`/`XLOOKUP` on SKU, MOQs from `MOQS` the same way. In `FACTORY PO FORECASTING`:

```
Suggested Qty = MAX(MOQ, ROUNDUP((Target Weeks - Weeks of Cover) * Weekly Velocity, 0))
```

Apply conditional formatting: red fill on `REORDER`, amber on `Weeks of Cover` below 6.

- [ ] **Step 4: Capture two screenshots**

Full-window captures at a browser width of at least 1440px, showing the tab bar along the bottom — the tab bar is what communicates that this is a system rather than a single grid.

1. `inventory-forecast-sheet.png` — the `INVENTORY FORECASTING` tab, with the reorder flags visible
2. `inventory-forecast-po.png` — the `FACTORY PO FORECASTING` tab

Compress and strip metadata, then confirm both are under 300KB:

```bash
cd /c/Portfolio/assets/img && python -c "
from PIL import Image
import os
for f in ['inventory-forecast-sheet.png', 'inventory-forecast-po.png']:
    im = Image.open(f).convert('RGB')
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    out = f.replace('.png', '.jpg')
    im.save(out, 'JPEG', quality=82, optimize=True)
    os.remove(f)
    print(out, round(os.path.getsize(out) / 1024), 'KB')
"
```

If `PIL` is missing: `python -m pip install --user Pillow`. Saving through PIL as a fresh JPEG drops all original EXIF. Update the filenames used in Task 4 to `.jpg`.

- [ ] **Step 5: Draw the architecture diagram**

Hand-written SVG, no tool needed. Save as `assets/img/inventory-forecast-arch.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 260" role="img"
     aria-label="Data flow: seven inventory sources into BigQuery, then into a Google Sheets forecasting layer, producing an inventory forecast and factory purchase order recommendations.">
  <style>
    .box { fill: #f4f2ee; stroke: #14181c; stroke-width: 1.5; }
    .accent { fill: #e7f0ef; stroke: #0f5c5a; }
    .t { font: 500 12px ui-sans-serif, system-ui, sans-serif; fill: #14181c; }
    .tc { font: 600 13px ui-monospace, Consolas, monospace; fill: #0a3f3e; }
    .arrow { stroke: #4a545e; stroke-width: 1.5; fill: none; marker-end: url(#a); }
  </style>
  <defs>
    <marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#4a545e"/>
    </marker>
  </defs>
  <text class="tc" x="20" y="24">SOURCES</text>
  <rect class="box" x="20" y="36" width="150" height="26" rx="3"/><text class="t" x="30" y="54">In-house storage</text>
  <rect class="box" x="20" y="70" width="150" height="26" rx="3"/><text class="t" x="30" y="88">3PL East / West</text>
  <rect class="box" x="20" y="104" width="150" height="26" rx="3"/><text class="t" x="30" y="122">Factory stock</text>
  <rect class="box" x="20" y="138" width="150" height="26" rx="3"/><text class="t" x="30" y="156">Inbound in-transit</text>
  <rect class="box" x="20" y="172" width="150" height="26" rx="3"/><text class="t" x="30" y="190">Marketplace FC</text>
  <path class="arrow" d="M175,117 H255"/>
  <rect class="accent" x="260" y="80" width="150" height="74" rx="3"/>
  <text class="tc" x="275" y="112">BigQuery</text><text class="t" x="275" y="132">single source of truth</text>
  <path class="arrow" d="M415,117 H495"/>
  <rect class="accent" x="500" y="80" width="150" height="74" rx="3"/>
  <text class="tc" x="515" y="106">Sheets</text><text class="t" x="515" y="124">forecasting layer</text>
  <text class="t" x="515" y="142">lead times · MOQs</text>
  <path class="arrow" d="M655,105 H720"/><path class="arrow" d="M655,130 H720"/>
  <rect class="box" x="660" y="36" width="120" height="26" rx="3"/><text class="t" x="670" y="54">Inventory forecast</text>
  <rect class="box" x="660" y="172" width="120" height="26" rx="3"/><text class="t" x="670" y="190">Factory POs</text>
  <path class="arrow" d="M720,105 V70"/><path class="arrow" d="M720,130 V166"/>
</svg>
```

- [ ] **Step 6: Verify no client data survived**

```bash
cd /c/Portfolio && python -c "
import pathlib
banned = ['WLD', 'Omni Forecasting', 'Cirro', 'Aire-master', 'Airemaster', 'AWD', 'SWI']
hits = []
for p in pathlib.Path('.').rglob('*'):
    if p.is_file() and p.suffix.lower() in {'.html', '.svg', '.css', '.js', '.md'} and '.git' not in p.parts:
        t = p.read_text(encoding='utf-8', errors='ignore')
        for b in banned:
            if b.lower() in t.lower():
                hits.append((str(p), b))
print('CLEAN' if not hits else hits)
"
```

Expected: `CLEAN`. Note this scans text only — the screenshots must be checked by eye. Open both images and confirm no real brand name, real SKU, or partner name is legible anywhere, including in the tab bar and any frozen header.

- [ ] **Step 7: Commit**

```bash
cd /c/Portfolio
git add assets/img/
git commit -m "feat: add synthetic rebuild assets for inventory forecasting case study"
```

---

## Task 4: Flagship case study page

**Files:**
- Create: `work/inventory-forecasting.html`

**Interfaces:**
- Consumes: `_partials.html` chrome and every class from Task 2; the three image assets from Task 3.
- Produces: the canonical case study page. Tasks 5–9 copy this file's structure exactly. It also fixes the six-section order that every other case study follows.

Note the `../` path depth on `assets/`, and `aria-current="page"` on the Work nav item — both differ from `index.html`.

- [ ] **Step 1: Write the page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Multi-warehouse inventory forecasting — John Patrick Borabo</title>
<meta name="description" content="Replaced manual stock counts across six locations with a BigQuery-backed forecasting system that flags reorders and drafts factory purchase orders.">
<link rel="stylesheet" href="../assets/css/site.css">
<script>(function(h){h.className+=" js";setTimeout(function(){if(!h.hasAttribute("data-reveal-ready")){h.className=h.className.replace(/\s*\bjs\b/,"");}},2000);})(document.documentElement);</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="wrap">
    <a class="site-header__name" href="../index.html">John Patrick Borabo</a>
    <nav class="site-nav" aria-label="Main">
      <ul>
        <li><a href="../index.html#work" aria-current="page">Work</a></li>
        <li><a href="../index.html#services">Services</a></li>
        <li><a href="../index.html#stack">Stack</a></li>
        <li><a href="../index.html#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main">
  <article>
    <header class="section">
      <div class="wrap wrap--narrow">
        <p class="eyebrow">Case study — Supply chain planning</p>
        <h1 class="h1">Multi-warehouse inventory forecasting and factory PO planning</h1>
        <p class="lede">Stock sat in six places and nobody could say what was actually available. I consolidated every location into one BigQuery source of truth and built a forecasting layer that flags reorders and drafts factory purchase orders.</p>
        <ul class="tags">
          <li class="tag">BigQuery</li>
          <li class="tag">Google Sheets</li>
          <li class="tag">Apps Script</li>
          <li class="tag">SQL</li>
          <li class="tag">Forecasting</li>
        </ul>
      </div>
    </header>

    <div class="section section--tint">
      <div class="wrap wrap--narrow">
        <ul class="proof">
          <li class="proof__item"><span class="proof__num">6</span><span class="proof__label">Inventory locations reconciled to one number</span></li>
          <li class="proof__item"><span class="proof__num">24</span><span class="proof__label">SKUs tracked with per-supplier lead times</span></li>
          <li class="proof__item"><span class="proof__num">2</span><span class="proof__label">Outputs: stock forecast and draft factory POs</span></li>
        </ul>
      </div>
    </div>

    <div class="section">
      <div class="wrap wrap--narrow prose">

        <section class="cs-section reveal">
          <h2 class="h2">Context</h2>
          <p>A direct-to-consumer brand selling pet grooming products through an online marketplace, importing from an overseas factory and holding stock across in-house storage, two third-party warehouses, and the marketplace's own fulfilment centres.</p>
        </section>

        <section class="cs-section reveal">
          <h2 class="h2">The problem</h2>
          <p>Working out how much of a single product existed meant opening five separate systems and adding the numbers by hand. In-transit shipments were tracked in a different sheet again, so anything on a boat was effectively invisible.</p>
          <p>The consequences were routine rather than dramatic. Reorders got placed late because nobody noticed cover had dropped below the factory lead time, and then got placed twice because two people were both working from stale counts. Purchase order quantities were guessed rather than derived, so minimum order quantities were either missed or badly overshot.</p>
        </section>

        <section class="cs-section reveal">
          <h2 class="h2">What I built</h2>
          <p>Every inventory source feeds BigQuery, which holds one row per SKU per location per snapshot date. A Google Sheets layer sits on top of that warehouse — the operations team already lived in spreadsheets, and moving them into a new tool would have meant nobody used it.</p>
          <figure class="figure">
            <img src="../assets/img/inventory-forecast-arch.svg" alt="Seven inventory sources feed into BigQuery, which feeds a Google Sheets forecasting layer holding lead times and minimum order quantities. That layer produces two outputs: an inventory forecast and factory purchase order recommendations.">
            <figcaption class="figure__cap">Sources reconcile in BigQuery; the forecasting logic and its reference tables stay in Sheets where the operations team works.</figcaption>
          </figure>
          <p>The sheet separates data from logic. Lead times and minimum order quantities live in their own reference tabs, keyed by SKU, so a supplier change is a single edit rather than a hunt through formulas. A dedicated formula tab computes total available, weeks of cover, and the reorder decision. Liquid and non-liquid products are classified separately because shipping restrictions differ, which changes what can be consolidated into a single container.</p>
          <figure class="figure">
            <img src="../assets/img/inventory-forecast-sheet.jpg" alt="The inventory forecasting tab: one row per SKU with columns for each storage location, total available, weeks of cover, and a reorder flag. Several rows are flagged red for reorder.">
            <figcaption class="figure__cap">The forecasting tab. Reorder flags fire when weeks of cover falls below lead time plus a safety buffer. Rebuilt with synthetic data for this case study.</figcaption>
          </figure>
          <p>The second output turns the diagnosis into an action. Rather than reporting that stock is low, the purchase order tab proposes a quantity — target cover minus current cover, multiplied by velocity, then rounded up to the supplier's minimum order quantity.</p>
          <figure class="figure">
            <img src="../assets/img/inventory-forecast-po.jpg" alt="The factory purchase order tab, listing suggested order quantities per SKU with the minimum order quantity applied.">
            <figcaption class="figure__cap">Draft factory purchase orders, with minimum order quantities enforced. Rebuilt with synthetic data for this case study.</figcaption>
          </figure>
        </section>

        <section class="cs-section reveal">
          <h2 class="h2">Result</h2>
          <ul class="result-list">
            <li>Available stock is one number, current as of the last snapshot, rather than a manual reconciliation across five systems.</li>
            <li>Reorder decisions are triggered by weeks of cover against actual supplier lead time, so they surface before a stockout rather than after.</li>
            <li>Purchase order quantities are derived from velocity and minimum order quantities instead of estimated.</li>
            <li>In-transit stock is visible, which removed the double-ordering that came from treating shipped inventory as missing.</li>
          </ul>
        </section>

        <section class="cs-section reveal">
          <h2 class="h2">Stack</h2>
          <ul class="tags">
            <li class="tag">BigQuery</li>
            <li class="tag">SQL</li>
            <li class="tag">Google Sheets</li>
            <li class="tag">Apps Script</li>
            <li class="tag">Conditional formatting</li>
            <li class="tag">XLOOKUP</li>
          </ul>
          <p class="figure__cap">Every figure and product name on this page comes from a rebuild of the system against invented data. No client information appears anywhere on this site.</p>
        </section>

        <p><a class="btn btn--ghost" href="../index.html#work">← All work</a></p>
      </div>
    </div>
  </article>
</main>

<footer class="site-footer">
  <div class="wrap">
    <p>John Patrick Borabo — Automation &amp; Data Systems Specialist. Antipolo City, Philippines (UTC+8).</p>
    <p><a href="mailto:jaypee@amsmanagement.agency">jaypee@amsmanagement.agency</a></p>
  </div>
</footer>
<script src="../assets/js/site.js"></script>
</body>
</html>
```

- [ ] **Step 2: Review the copy with the owner before validating**

Every claim in the Result section must be true and defensible in a client call. Read the four result items aloud to the owner and cut or reword any he would not confidently defend. The three proof numbers get the same treatment. This is a gate, not a suggestion — an unsupportable claim discovered by a client is worse than no claim.

- [ ] **Step 3: Verify — validate the markup**

```bash
cd /c/Portfolio && npx --yes html-validate work/inventory-forecasting.html
```

Expected: no errors.

- [ ] **Step 4: Verify — render and check**

Serve with `python -m http.server 8000` and open `http://localhost:8000/work/inventory-forecasting.html`. Confirm:

- All four images load — a broken `../assets/` path is the most likely defect in this task
- No horizontal body scroll at 375px; the wide screenshots scale down rather than overflowing
- Prose stays at a readable measure on a 1440px display
- Reveal sections animate in on scroll with JS on, and are visible with JS off
- The SVG diagram is legible at 375px width; if it is not, the caption must carry the same information in words

- [ ] **Step 5: Commit**

```bash
cd /c/Portfolio
git add work/inventory-forecasting.html
git commit -m "feat: add inventory forecasting case study page"
```

---

## Tasks 5–9: Remaining case studies

Each of these five tasks follows Task 4 exactly: copy `work/inventory-forecasting.html`, replace `<title>`, `<meta name="description">`, and the content of the six sections, keep every class name and the `../` path depth unchanged.

**Per-task steps, identical in shape for all five:**

- [ ] **Step 1: Gather the source material from the owner**

Ask these five questions and write the answers down before touching HTML. Do not begin drafting from assumptions — a case study built on a guess reads as generic, which is the specific failure mode that makes portfolios worthless.

1. What was the manual process before, and roughly how long did it take, how often?
2. What did you build — tools, structure, where the data came from and went?
3. What broke or got missed under the old process?
4. What can someone do now that they could not do before?
5. What is the single most impressive technical detail, the one another data person would notice?

- [ ] **Step 2: Build the synthetic rebuild and capture visuals**

Same rule as Task 3: rebuild, then capture. Never capture a client artifact. Compress with the PIL snippet from Task 3, Step 4, and confirm each image is under 300KB.

- [ ] **Step 3: Write the page**

Copy Task 4's file, swap the content, keep the structure. Outcome-framed `<h1>`. Anonymized context — sector and rough size only. Every image gets a real `alt` description of what it shows, and every rebuilt figure keeps the "Rebuilt with synthetic data" caption.

- [ ] **Step 4: Owner reviews the result claims**

Same gate as Task 4, Step 2.

- [ ] **Step 5: Verify**

```bash
cd /c/Portfolio && npx --yes html-validate work/<page>.html
```

Then render at 375px and 1440px, confirm images load and no horizontal scroll.

- [ ] **Step 6: Commit**

```bash
cd /c/Portfolio && git add work/<page>.html assets/img/ && git commit -m "feat: add <name> case study page"
```

### Task 5: `work/bigquery-warehouse.html`

**Angle:** scattered spreadsheets consolidated into one BigQuery source of truth. The infrastructure story behind the flagship — build it second so the flagship can link to it.
**Working headline direction:** the outcome is trust in the numbers, not the warehouse itself.
**Visual:** a schema or table-list diagram, generic table names only, plus a query result against synthetic data.

### Task 6: `work/looker-dashboards.html`

**Angle:** the reporting layer leadership actually opens.
**Visual:** rebuilt dashboard on synthetic data.
**Additional deliverable, unique to this page — the live demo:** build a fresh Looker Studio dashboard on a public dataset (BigQuery public datasets are the obvious source), set link sharing to public, and embed it:

```html
<div class="figure">
  <iframe title="Live Looker Studio dashboard demo"
          src="LOOKER_STUDIO_EMBED_URL"
          width="100%" height="600" style="border:1px solid var(--line);border-radius:4px"
          loading="lazy" allowfullscreen></iframe>
  <p class="figure__cap">Live dashboard, built on a public dataset. Click and filter it.</p>
</div>
```

Two constraints: the dashboard must be built on a public dataset and must not touch any client data, and the `iframe` must be `loading="lazy"` so it does not drag the page's Lighthouse performance below 90. If it does anyway, put the embed behind a static screenshot the visitor clicks to load. This is the last item to build; the site launches without it if it slips.

### Task 7: `work/excel-vba-templates.html`

**Angle:** reusable templates that removed recurring manual assembly.
**Visual:** the template with synthetic data, plus a short readable excerpt of the VBA — a code excerpt is strong evidence here, so include one in a `<pre class="scroll-x"><code>` block. Confirm the excerpt contains no client-specific sheet names, paths, or server names.

### Task 8: `work/desktop-app.html`

**Angle:** a standalone internal tool — the widest capability signal on the site, since it shows work beyond spreadsheets.
**Step 1 addition:** ask what language and framework, how it was distributed, and who used it. The answer determines the framing, and it is not recorded in the spec.
**Visual:** the app's own UI, running against synthetic data.

### Task 9: `work/bpo-reporting-automation.html`

**Angle:** VBA Macros and MS Access replacing legacy Excel, plus Power BI operational reporting, across Alorica and Ubiquity. This page carries the eight years of depth that the AMS pages cannot.
**Constraint:** aggregate the roles rather than naming per-employer specifics tied to a client. Employer names are on the CV and are fine; their clients are not.
**Visual:** a rebuilt Power BI-style operational dashboard on synthetic call-centre metrics.

---

## Task 10: Landing page

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: `_partials.html` chrome, every Task 2 class, all six case study pages and their thumbnail images and final titles.
- Produces: the site entry point. Section ids `#work`, `#services`, `#stack`, `#contact` are the anchor targets already referenced by the nav on all seven pages, so they must match exactly.

Built after the case studies deliberately — the work cards quote their real titles, and inventing those titles before the pages exist guarantees a mismatch.

- [ ] **Step 1: Write the page**

Head, header, and footer copied from `_partials.html` — note `assets/` with no `../` prefix on this page. Inside `<main id="main">`:

```html
<section class="section">
  <div class="wrap">
    <p class="eyebrow">Automation &amp; Data Systems Specialist</p>
    <h1 class="h1">I replace manual spreadsheet work with systems that run themselves.</h1>
    <p class="lede">Eight years in data and reporting, now building the full stack for a growing agency — warehouse, pipelines, dashboards, and the internal tools on top. Based in the Philippines, working UTC+8 with overlap into US hours.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="#work">See the work</a>
      <a class="btn btn--ghost" href="#contact">Get in touch</a>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <ul class="proof">
      <!-- Three or four numbers, each defensible in a client call. -->
    </ul>
  </div>
</section>

<section class="section" id="work">
  <div class="wrap">
    <h2 class="h2">Selected work</h2>
    <ul class="work-grid">
      <!-- Six .work-card entries. Flagship first. Each links to its work/ page,
           quotes that page's real h1 as the card title, and carries a thumbnail. -->
    </ul>
  </div>
</section>

<section class="section section--tint" id="services">
  <div class="wrap">
    <h2 class="h2">What I do</h2>
    <ul class="svc-grid">
      <li class="svc"><h3>Report &amp; pipeline automation</h3><p>Recurring manual spreadsheet routines replaced with jobs that run on a schedule and tell you when they break.</p></li>
      <li class="svc"><h3>Data warehousing</h3><p>Scattered exports and sheets consolidated into BigQuery as one source of truth.</p></li>
      <li class="svc"><h3>Dashboards &amp; BI</h3><p>Looker Studio and Power BI reporting built from what stakeholders actually need to decide.</p></li>
      <li class="svc"><h3>Excel &amp; Google Sheets tooling</h3><p>VBA and Apps Script templates that turn a recurring assembly job into a button.</p></li>
      <li class="svc"><h3>Data cleanup &amp; migration</h3><p>Messy, duplicated, inconsistent data made usable — and kept that way.</p></li>
      <li class="svc"><h3>Internal tools</h3><p>Small standalone applications for the workflows a spreadsheet cannot carry.</p></li>
    </ul>
  </div>
</section>

<section class="section" id="stack">
  <div class="wrap">
    <h2 class="h2">Stack</h2>
    <div class="stack-group">
      <h3>Warehousing &amp; query</h3>
      <ul class="tags"><li class="tag">BigQuery</li><li class="tag">SQL</li><li class="tag">MS Access</li><li class="tag">Power Query</li></ul>
    </div>
    <div class="stack-group">
      <h3>Automation</h3>
      <ul class="tags"><li class="tag">Google Apps Script</li><li class="tag">VBA</li><li class="tag">Excel Macros</li></ul>
    </div>
    <div class="stack-group">
      <h3>Reporting &amp; BI</h3>
      <ul class="tags"><li class="tag">Looker Studio</li><li class="tag">Power BI</li><li class="tag">Excel</li><li class="tag">Google Sheets</li></ul>
    </div>
  </div>
</section>

<section class="section section--tint" id="about">
  <div class="wrap wrap--narrow">
    <h2 class="h2">About</h2>
    <div class="about-grid">
      <img class="portrait" src="assets/img/portrait.jpg" alt="John Patrick Borabo" width="288" height="288">
      <div class="about-grid__body prose">
        <p>I spent eight years in BPO reporting and analytics, and most of it came down to the same pattern: someone was rebuilding the same report by hand every day, and it did not need to be a person's job.</p>
        <p>I now run data and automation for a management agency as a one-person function — the warehouse, the pipelines into it, the dashboards on top, and the internal tools that use them. The through-line is that I ship systems people keep using, not reports that get opened once.</p>
        <p><a href="assets/Borabo-CV.pdf">Download CV (PDF)</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="contact">
  <div class="wrap wrap--narrow">
    <h2 class="h2">Get in touch</h2>
    <p class="lede">Available for automation and data projects, whether that is a one-off build or ongoing work.</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="mailto:jaypee@amsmanagement.agency">Email me</a>
      <a class="btn btn--ghost" href="UPWORK_PROFILE_URL">Upwork profile</a>
      <a class="btn btn--ghost" href="ONLINEJOBS_PROFILE_URL">OnlineJobs.ph</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Fill in the three placeholder values**

`UPWORK_PROFILE_URL`, `ONLINEJOBS_PROFILE_URL`, and the `.proof` list are the only unresolved items. Get the two URLs from the owner. If a profile does not exist yet, remove that button — a dead link costs more credibility than a missing one is worth.

For the proof strip, propose three numbers to the owner and keep only what he confirms. Starting candidates: `8+ years in data & reporting`, `6 inventory locations reconciled`, `4h → 5m daily report runtime`. Any number he cannot defend gets cut, not softened.

- [ ] **Step 3a: Generate the portrait**

The owner approved a portrait in the About section on 2026-08-03. Source is `Image of Me.jpeg` in the repo root — a working file, git-ignored by design, so it is read but never committed. Output is a 288px square (2× the 9rem CSS box), centre-cropped, EXIF stripped by the re-save:

```bash
cd /c/Portfolio && python -c "
from PIL import Image
import os
im = Image.open('Image of Me.jpeg').convert('RGB')
s = min(im.width, im.height)
im = im.crop(((im.width - s) // 2, (im.height - s) // 2, (im.width + s) // 2, (im.height + s) // 2))
im.resize((288, 288), Image.LANCZOS).save('assets/img/portrait.jpg', 'JPEG', quality=85, optimize=True)
print('portrait.jpg', round(os.path.getsize('assets/img/portrait.jpg') / 1024), 'KB')
"
```

Open the result and check the centre crop did not cut off the top of the head — a naive centre crop on a portrait-orientation photo often does. If it did, adjust the vertical crop offset upward rather than accepting it.

- [ ] **Step 3: Generate the six thumbnails**

Reuse each case study's primary image, resized to a 16:10 crop at 800px wide:

```bash
cd /c/Portfolio/assets/img && python -c "
from PIL import Image
import os
pairs = [('inventory-forecast-sheet.jpg', 'thumb-inventory-forecasting.jpg')]
# add one pair per case study once its primary image exists
for src, dst in pairs:
    im = Image.open(src).convert('RGB')
    tw, th = 800, 500
    sr, tr = im.width / im.height, tw / th
    if sr > tr:
        w = round(im.height * tr); im = im.crop(((im.width - w) // 2, 0, (im.width + w) // 2, im.height))
    else:
        h = round(im.width / tr); im = im.crop((0, 0, im.width, h))
    im.resize((tw, th), Image.LANCZOS).save(dst, 'JPEG', quality=80, optimize=True)
    print(dst, round(os.path.getsize(dst) / 1024), 'KB')
"
```

- [ ] **Step 4: Verify**

```bash
cd /c/Portfolio && npx --yes html-validate index.html
```

Then render and confirm: every nav anchor scrolls to its section, all six cards link to a page that exists and loads, the CV link resolves, no horizontal scroll at 375px, and the hero headline does not break awkwardly on a narrow screen.

- [ ] **Step 5: Commit**

```bash
cd /c/Portfolio
git add index.html assets/img/
git commit -m "feat: add landing page"
```

---

## Task 11: Confidentiality sweep and acceptance checks

**Files:**
- Modify: whichever files fail a check
- Create: `assets/Borabo-CV.pdf` (the updated CV from Task 13 replaces it later; a copy of the current CV is placed here now so the link is not dead)

**Interfaces:**
- Consumes: the complete site — all seven pages.
- Produces: a site that satisfies every constraint in spec section 7. This task gates deployment.

Run before the first deploy, and again after any later content change. Once the site is public, a leak cannot be recalled — it is in git history, in caches, and possibly indexed.

- [ ] **Step 1: Text sweep for client identifiers**

```bash
cd /c/Portfolio && python -c "
import pathlib, re
banned = ['WLD', 'Omni Forecasting', 'Cirro', 'Aire-master', 'Airemaster', 'SWI Inventory']
asin = re.compile(r'\bB0[0-9A-Z]{8}\b')
hits = []
for p in pathlib.Path('.').rglob('*'):
    if not p.is_file() or '.git' in p.parts: continue
    if p.suffix.lower() not in {'.html','.css','.js','.svg','.md','.txt'}: continue
    t = p.read_text(encoding='utf-8', errors='ignore')
    for b in banned:
        if b.lower() in t.lower(): hits.append((str(p), b))
    for m in asin.findall(t): hits.append((str(p), 'ASIN-shaped: ' + m))
print('CLEAN' if not hits else hits)
"
```

Expected: `CLEAN`. Any hit is a blocker.

- [ ] **Step 2: Image sweep by eye, plus metadata check**

Open every file in `assets/img/` and confirm no legible real brand name, real SKU or ASIN, partner or warehouse name, or real figure — checking tab bars, frozen headers, browser title bars, and window chrome, which are where leaks survive. Then confirm no EXIF:

```bash
cd /c/Portfolio && python -c "
from PIL import Image
import pathlib
for p in sorted(pathlib.Path('assets/img').iterdir()):
    if p.suffix.lower() not in {'.jpg','.jpeg','.png'}: continue
    ex = Image.open(p).getexif()
    print(p.name, 'EXIF:', dict(ex) if ex else 'none', round(p.stat().st_size/1024), 'KB')
"
```

Expected: `EXIF: none` and under 300KB for every file. Re-save anything that fails through the PIL snippet in Task 3, Step 4.

- [ ] **Step 3: Validate all pages**

```bash
cd /c/Portfolio && npx --yes html-validate index.html work/*.html
```

Expected: no errors on any page.

- [ ] **Step 4: Link check**

Place the CV so the link resolves, then crawl:

```bash
cd /c/Portfolio && cp "John Patrick Borabo_CV v2.pdf" assets/Borabo-CV.pdf
cd /c/Portfolio && python -m http.server 8000 &
npx --yes linkinator http://localhost:8000 --recurse --silent
```

Expected: zero broken links. External links to Upwork or OnlineJobs.ph may report as skipped, which is fine — open those two by hand and confirm they load.

- [ ] **Step 5: Lighthouse on the landing page and the flagship**

```bash
cd /c/Portfolio && npx --yes lighthouse http://localhost:8000/index.html --only-categories=performance,accessibility --chrome-flags="--headless" --output=json --output-path=./lh-index.json --quiet
cd /c/Portfolio && npx --yes lighthouse http://localhost:8000/work/inventory-forecasting.html --only-categories=performance,accessibility --chrome-flags="--headless" --output=json --output-path=./lh-flagship.json --quiet
python -c "
import json
for f in ['lh-index.json','lh-flagship.json']:
    d = json.load(open(f))
    for k in ['performance','accessibility']:
        print(f, k, round(d['categories'][k]['score']*100))
"
```

Expected: every score 90 or above. Below 90 on performance is almost certainly an oversized image — recheck Step 2's sizes. Below 90 on accessibility is almost certainly contrast or a missing `alt`; read the specific audit rather than guessing.

- [ ] **Step 6: Responsive and no-JS pass over all seven pages**

At 375px, 768px, and 1440px, for each page: no horizontal body scroll, no clipped text, images scale rather than overflow. Then disable JavaScript and reload each page: all content must be visible and every link usable.

- [ ] **Step 7: Clean up and commit**

```bash
cd /c/Portfolio && rm -f lh-index.json lh-flagship.json
git add -A && git commit -m "chore: pass confidentiality sweep and acceptance checks"
```

---

## Task 12: Deploy to GitHub Pages

**Files:**
- Modify: `README.md` if the username differs from `jpborabo`

**Interfaces:**
- Consumes: the verified site from Task 11.
- Produces: a live site at `https://<username>.github.io`.

**Resolved 2026-08-03:** the owner renamed the account to **`borabo-jp`**. The repo is therefore `borabo-jp.github.io` and the live URL `https://borabo-jp.github.io`. Step 1 still confirms the handle against the API rather than trusting this note, because a mismatch produces a repo that serves at a subpath instead of the domain root and the failure is silent.

`README.md` currently says `jpborabo.github.io` in its heading — a deliberate placeholder from Task 1. Step 6 corrects it.

- [ ] **Step 1: Confirm the username and authenticate**

```bash
gh auth status || gh auth login
gh api user --jq .login
```

Record the exact login. Every path below uses it.

- [ ] **Step 2: Create the repository**

The repo name must be exactly `<login>.github.io` so the site serves at the domain root instead of a subpath.

```bash
cd /c/Portfolio
gh repo create "$(gh api user --jq .login).github.io" --public --source=. --remote=origin --description "Portfolio — Automation & Data Systems Specialist"
```

- [ ] **Step 3: Push**

```bash
cd /c/Portfolio && git push -u origin main
```

- [ ] **Step 4: Enable Pages**

```bash
cd /c/Portfolio && gh api -X POST "repos/$(gh api user --jq .login)/$(gh api user --jq .login).github.io/pages" -f "source[branch]=main" -f "source[path]=/" 2>/dev/null || echo "Already enabled, or enable via Settings > Pages"
```

- [ ] **Step 5: Verify the live site**

Wait for the first build, then check the deployed site rather than trusting the local pass — path case sensitivity differs between Windows and the Pages server, which is the classic first-deploy failure. A local `Assets/img/foo.jpg` reference that worked on Windows will 404 in production.

```bash
sleep 90
L=$(gh api user --jq .login); curl -sI "https://$L.github.io" | head -1
npx --yes linkinator "https://$L.github.io" --recurse --silent
```

Expected: `HTTP/2 200` and zero broken links. Then open the live URL and confirm every image loads and all six case studies are reachable.

- [ ] **Step 6: Fix the README URL if the username changed and commit**

```bash
cd /c/Portfolio && git add -A && git commit -m "docs: correct repo URL in readme" && git push
```

---

## Task 13: CV and platform profile copy

**Files:**
- Create: `assets/Borabo-CV.pdf` (replacing the placeholder copy from Task 11)
- Create: `docs/profile-copy.md` (working file for the owner; not part of the site)

**Interfaces:**
- Consumes: the live site URL from Task 12, and the case study headlines from Tasks 4–9.
- Produces: an updated CV in the repo and platform copy the owner pastes into Upwork and OnlineJobs.ph.

This task is where the site starts earning. Plausibly higher-leverage than the site itself: the current CV ends at "Brand/Data Support Specialist | Intelegencia" and does not mention the AMS role at all, which means the strongest work on the entire portfolio is absent from the document most clients read first.

- [ ] **Step 1: Add the AMS role to the CV as the lead entry**

Insert above the Intelegencia entry, in the existing CV's format and styling:

```
Automation and Data Systems Specialist | AMS Management        [start date] – Present
• Built and own the company's data stack end to end: BigQuery warehouse,
  automated pipelines, Looker Studio reporting, and internal tools.
• Delivered multi-warehouse inventory forecasting and factory PO planning
  in Google Sheets over BigQuery, reconciling stock across six locations.
• Developed VBA templates and a standalone desktop application for
  workflows outside spreadsheet reach.
```

Get the exact start date from the owner. Also update the summary line: "Reporting and Data Analyst" now understates the role — it should read as an automation and data systems builder with eight years of reporting behind it.

- [ ] **Step 2: Add the portfolio URL to the CV header**

Next to the email, so it is visible without scrolling.

- [ ] **Step 3: Export and place the PDF**

```bash
cd /c/Portfolio && ls -la assets/Borabo-CV.pdf
```

Confirm it is the updated version, not the Task 11 placeholder. Open it and check the AMS entry is present and the portfolio URL is clickable.

- [ ] **Step 4: Write `docs/profile-copy.md`**

Three blocks the owner pastes directly, no editing required.

**Upwork headline**, under 70 characters, leading with the high-rate identity:

```
Data Automation & BI — BigQuery, Looker Studio, Apps Script, VBA
```

**Upwork overview**, opening with the client's problem rather than the owner's history, since the first two lines are all that show before "more":

```
Most reporting problems are not analysis problems. Someone is rebuilding
the same spreadsheet by hand every morning, and the numbers still disagree.

I build the system that removes that job. Over eight years in data and
reporting — and now running data and automation single-handed for a
management agency — I have consolidated scattered exports into BigQuery,
automated daily reporting with Apps Script and VBA, built Looker Studio
and Power BI dashboards leadership actually opens, and delivered
multi-warehouse inventory forecasting with automated factory PO planning
for an e-commerce brand.

What I do:
• Report and pipeline automation — Google Apps Script, VBA, scheduled jobs
• Data warehousing — BigQuery, SQL, Power Query
• Dashboards — Looker Studio, Power BI, Google Sheets
• Excel and Sheets tooling, data cleanup, and internal tools

Case studies with architecture and screenshots: <PORTFOLIO_URL>

Based in the Philippines (UTC+8) with overlap into US business hours.
```

**OnlineJobs.ph blurb**, shorter, since the audience skims:

```
Automation & Data Systems Specialist — 8 years in data and reporting.
I replace manual spreadsheet work with systems that run themselves:
BigQuery warehouses, automated reporting via Apps Script and VBA, Looker
Studio and Power BI dashboards, and inventory forecasting tools.

Portfolio with full case studies: <PORTFOLIO_URL>
```

Substitute the real URL from Task 12 in both. Add a note for the owner: attach each case study as a separate Upwork portfolio item, linking to its own page rather than the site root, so a client browsing a specific skill lands on the matching work.

- [ ] **Step 5: Commit**

```bash
cd /c/Portfolio
git add assets/Borabo-CV.pdf docs/profile-copy.md
git commit -m "feat: update CV with AMS role and add platform profile copy"
git push
```

---

## Self-Review

**Spec coverage.** Section 3 architecture → Tasks 1, 2, 12. Section 4 landing sections → Task 10. Section 5 case study template → Task 4, reused by Tasks 5–9; flagship detail → Tasks 3 and 4. Section 6 confidentiality → the global constraints, Task 3 Step 6, and Task 11 Steps 1–2. Section 7 acceptance → Task 11. Section 8 build order → Tasks 1–13 in order. Section 9 out-of-scope items appear in no task, as intended. Section 10 username → Task 12's blocking note.

**Known deferrals, deliberate not accidental.** The `.proof` numbers and the two profile URLs in Task 10 are owner-supplied values with an explicit resolution step (Task 10, Step 2) and a stated fallback for each; they are inputs, not unwritten work. Tasks 5–9 carry structure, angle, visual requirement, and gathering questions but not final copy, because that copy does not exist until the owner answers Step 1 — inventing it would produce exactly the generic case study the plan warns against. Every code step contains real code.

**Type and name consistency.** Class names in Tasks 4, 5–9, and 10 are checked against the Task 2 interface list: `.wrap`, `.wrap--narrow`, `.section`, `.section--tint`, `.eyebrow`, `.h1`, `.h2`, `.h3`, `.lede`, `.prose`, `.btn`, `.btn--primary`, `.btn--ghost`, `.btn-row`, `.proof`, `.proof__item`, `.proof__num`, `.proof__label`, `.work-grid`, `.work-card`, `.work-card__body`, `.work-card__title`, `.work-card__meta`, `.tags`, `.tag`, `.svc-grid`, `.svc`, `.stack-group`, `.figure`, `.figure__cap`, `.cs-section`, `.result-list`, `.scroll-x`, `.reveal`, `.is-in`, `.site-header`, `.site-header__name`, `.site-nav`, `.site-footer`, `.skip-link`. All are defined in Task 2 and used consistently. The reveal class pair is `.reveal` / `.is-in` in both `site.css` and `site.js`. Image filenames switch from `.png` to `.jpg` at Task 3 Step 4, and Task 4 references the `.jpg` names — consistent. Nav anchor ids `#work`, `#services`, `#stack`, `#contact` appear in `_partials.html` and are all defined in Task 10.
