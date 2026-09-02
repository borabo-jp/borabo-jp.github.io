# borabo-jp.github.io

Portfolio site for John Patrick Borabo — Amazon Ads Automation & Data Systems Specialist.

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

Every case study describes the owner's own shipped tooling, scrubbed of client and vendor
identifiers before publication. Figures are real, sourced from test suites, commit history, and
run logs — never estimated. Diagrams are hand-authored SVGs, not screenshots of client data. No
client data, client name, or vendor name appears anywhere in this repository.
