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
