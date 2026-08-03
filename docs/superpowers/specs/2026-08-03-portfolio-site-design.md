# Portfolio Site — Design Spec

**Date:** 2026-08-03
**Owner:** John Patrick Borabo
**Goal:** Win freelance work on Upwork and OnlineJobs.ph as an automation / data systems builder.

---

## 1. Problem

John Patrick Borabo is an Automation & Data Systems Specialist at AMS Management, operating as a
one-man data department: BigQuery warehouse, Looker Studio dashboards, an inventory forecasting
Google Sheet wired to BigQuery, VBA Excel templates, a standalone desktop application, and the
agency website. His current CV stops at "Brand/Data Support Specialist | Intelegencia" and
describes none of this, so his strongest work is invisible to clients.

Neither target platform can carry the work at full fidelity. Upwork allows images and PDFs per
portfolio item plus an outbound link; OnlineJobs.ph offers less. Neither lets a prospective client
click into a live dashboard or read a build narrative.

## 2. Solution

A hand-built static site whose real payload is **six case studies**, each at its own URL so it can
be linked as an individual Upwork portfolio item or pasted into a job-specific OnlineJobs.ph
application.

Positioning: lead with the high-rate identity ("I replace manual spreadsheet work with systems that
run themselves"), with a broad services list underneath so smaller dashboard, Excel, and cleanup
jobs still convert. Upwork proposals stay as broad as the owner wants; the site's job is to prevent
anchoring at data-entry rates.

## 3. Architecture

Static multi-page site. Hand-written HTML and CSS, minimal vanilla JS. No framework, no build step,
no backend, no dependencies.

```
C:\Portfolio\
  index.html                            landing page
  work/
    inventory-forecasting.html
    bigquery-warehouse.html
    looker-dashboards.html
    excel-vba-templates.html
    desktop-app.html
    bpo-reporting-automation.html
  assets/
    css/site.css                        single stylesheet, design tokens at top
    js/site.js                          mobile nav toggle + scroll reveal, nothing else
    img/                                scrubbed screenshots, compressed
    Borabo-CV.pdf                       updated CV
  docs/superpowers/specs/               this spec
```

**Multi-page over single-scroll:** one case study equals one URL equals one Upwork portfolio item
that deep-links to the full story rather than dropping the viewer at the top of a homepage.

**Hosting:** GitHub Pages, from a repo named `<username>.github.io` so the site serves at the domain
root rather than a subpath. Free, and a public repo of a hand-built site is itself evidence of
capability. A custom domain is deferred, not required for launch.

The GitHub account exists as of 2026-08-03. The username is a launch blocker for step 4 only, not
for steps 1–3: the account handle becomes the public portfolio URL that goes on the Upwork profile,
OnlineJobs.ph applications, and CV, so it must read as professional. The account is new and has no
dependencies, making a rename free.

**No-JS baseline:** every page must be fully readable and navigable with JavaScript disabled. JS
adds the mobile nav toggle and scroll-reveal only; the nav must be usable without it.

## 4. Landing page sections

| # | Section | Contents |
|---|---------|----------|
| 1 | Hero | Name, title, one-line value proposition, buttons (View Work / Hire on Upwork), location and timezone |
| 2 | Proof strip | 3–4 defensible numbers: years of experience, hours per month automated, tool count |
| 3 | Selected work | Six case study cards, thumbnail plus outcome-framed title. The load-bearing section. |
| 4 | Services | Pipeline & report automation; BigQuery / warehouse setup; Looker Studio & Power BI dashboards; Excel/VBA & Google Sheets tooling; data cleanup & migration; internal desktop tools |
| 5 | Stack | Grouped labels: BigQuery, SQL, Looker Studio, Power BI, Apps Script, VBA, MS Access, Power Query |
| 6 | About | Three sentences: BPO reporting analyst to one-man data department |
| 7 | Contact | Email, Upwork, OnlineJobs.ph, LinkedIn, CV download |

Proof-strip numbers must be backed by something the owner can defend in a client call. Any figure
he cannot substantiate is cut rather than estimated.

## 5. Case study template

Every case study page uses one identical skeleton, so the sixth is as fast to write as the second.

1. **Outcome headline** — the result, not the artifact. "Cut a 4-hour daily inventory report to 5
   minutes," not "Inventory Forecasting Sheet."
2. **Context** — anonymized descriptor only, e.g. "60-person marketing agency."
3. **The problem** — the manual process and what it cost in hours or error rate.
4. **What I built** — a small architecture diagram plus two or three screenshots taken from the
   synthetic rebuild (see section 6), never from a client file.
5. **Result** — time saved, errors eliminated, decisions now possible.
6. **Stack** — tag list.

### The six

| Page | Source | Angle |
|------|--------|-------|
| `inventory-forecasting.html` | AMS | Flagship — see below. |
| `bigquery-warehouse.html` | AMS | Scattered spreadsheets consolidated into one source of truth. |
| `looker-dashboards.html` | AMS | Reporting layer leadership actually opens. Candidate host for the live demo. |
| `excel-vba-templates.html` | AMS | Reusable templates that removed recurring manual assembly. |
| `desktop-app.html` | AMS | Standalone internal tool — widest capability signal. |
| `bpo-reporting-automation.html` | Alorica / Ubiquity | VBA Macros + MS Access replacing legacy Excel; Power BI operational reports. Carries the 8-year depth. |

### Flagship detail: inventory forecasting

Structure observed in the source file on 2026-08-03. This is not a spreadsheet; it is multi-echelon
inventory and supply planning implemented in Google Sheets over BigQuery.

- **Inventory aggregated across six-plus nodes** — in-house storage, two third-party warehouses,
  overseas factory stock, in-transit shipments, and Amazon AWD availability, reconciled to a single
  snapshot date
- **Reference layers** — lead times and minimum order quantities per SKU, held in dedicated tabs and
  consumed by a separate forecasting formula sheet
- **Two outputs** — a demand/inventory forecast and factory purchase-order recommendations
- **Domain modelling** — liquid vs non-liquid classification driving shipping constraints, product
  identifier as primary key, and a short-name normalization layer
- **Data layer** — BigQuery rather than manual entry, with a manual-report tab retained for reconciliation

Positioning consequence: this page is framed as supply chain planning, not spreadsheet work. Working
headline direction — "Multi-warehouse inventory forecasting and factory PO planning for an Amazon
brand, replacing manual stock counts across six locations." Freelance demand for this is strong and
most competing listings are substantially less sophisticated, so this page anchors the site's rate.

The rebuild uses invented SKUs in the same product category, fabricated quantities, and generic node
names ("3PL East," "Factory," "In Transit").

## 6. Confidentiality constraint

The owner is currently employed at AMS Management, and the source material is live client data. The
flagship source file (reviewed 2026-08-03) contains a named client brand, real Amazon ASINs, real
on-hand quantities, a current snapshot date, and named third-party warehouse partners.

**Rule: no client artifact is ever screenshotted, cropped, or blurred for publication.** Every visual
on the site is a rebuild — the same structure, layout, and formula logic reproduced against invented
SKUs and fabricated numbers. Blurring is rejected as insufficient; it leaves ASINs, brand names, and
partner names recoverable through crop edges, adjacent cells, and tab labels.

Published material therefore contains:

- No client or employer client names, no logos, no ASINs or other real product identifiers
- No real revenue, volume, inventory, or headcount figures
- No third-party vendor, warehouse, or logistics partner names
- Only visuals rebuilt from synthetic data, never the original files

The **live embedded Looker Studio dashboard** — a strong closer, because a prospect can click and
filter it — is built fresh on a public dataset. Nothing belonging to AMS is embedded. It sits on
`looker-dashboards.html` and is scheduled last; the site launches without it if needed.

The owner gives AMS leadership a heads-up that anonymized case studies are being published. This is
a courtesy step outside the build, not a blocker on writing code.

## 7. Testing and acceptance

- Renders correctly at 375px, 768px, and 1440px widths
- Fully readable and navigable with JavaScript disabled
- Every internal and external link resolves; no 404s
- Lighthouse: performance and accessibility both ≥ 90
- All images compressed; no single image over 300KB
- No client name, logo, ASIN, partner name, or real business figure anywhere in the repo, including
  image EXIF; every visual traceable to a synthetic rebuild rather than a client file
- Each case study page renders all six template sections, none empty or placeholder

## 8. Build order

1. Initialize the git repo; build `site.css` design tokens (type scale, color, spacing) and the
   case study page template. Verify the template with one real case study end to end.
2. Per project, in this order: rebuild the artifact against synthetic data, capture visuals from the
   rebuild, then write the case study copy collaboratively. The rebuild precedes the screenshot —
   there is no stage at which a client file is captured.
3. Landing page, assembled once the case studies exist and their real titles are known.
4. Confirm the GitHub username, create `<username>.github.io`, deploy, and run the section 7
   acceptance checks.
5. Supporting assets: CV updated to lead with the AMS role; Upwork profile headline and overview;
   OnlineJobs.ph blurb pointing at the site.

Step 5 is plausibly higher-leverage than the site itself, since the AMS role is absent from the
current CV entirely. It is in scope, not optional.

## 9. Out of scope

- Custom domain purchase and DNS
- Blog, CMS, or any content requiring ongoing publishing
- Contact form or any backend, database, or analytics
- Redesign of the AMS agency website
- Dark mode

## 10. Open items

Two questions were raised and not separately answered before approval; the spec assumes:

- **Six case studies**, not three. If the screenshot-gathering in step 2 proves slow, the site can
  launch with three and add the rest — the multi-page structure makes this additive.
- **The live demo dashboard is included**, built on a public dataset, sequenced last.

Either assumption can be reversed without redesign.

One item remains genuinely open:

- **GitHub username.** The account created 2026-08-03 uses a handle unsuitable for a client-facing
  portfolio URL. A rename is recommended before step 4. Steps 1–3 proceed regardless.
