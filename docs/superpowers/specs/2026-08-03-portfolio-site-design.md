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
| 6 | About | Three sentences: BPO reporting analyst to one-man data department, with a small square portrait beside the copy (approved 2026-08-03 — freelance clients are hiring a person, so a face earns trust; deliberately not a hero image) |
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

### The six — REVISED 2026-09-02

The original lineup was drawn up before the owner disclosed his project directories. A read-only
survey of seven repositories found a far larger and more specific body of work than the CV or the
initial conversation implied. Full technical detail: `docs/case-study-source-material.md`.

| Page | Angle |
|------|-------|
| `campaign-launcher.html` | **Flagship.** Desktop app generating Amazon campaign structures. 510 tests, a legacy VBA port preserving row-order parity, and a self-hosted fail-closed licensing system. |
| `bid-optimisation-autorun.html` | Scheduled VBA/PowerShell automation across 38 client workbooks. Pilot → staged backups → idempotent scheduled runs. The scale and operational-discipline story. |
| `search-term-audit.html` | Cannibalisation detection. Carries the best pure-engineering story: a central-directory zip reader written to defeat a silent infinite hang in standard xlsx readers. |
| `campaign-pausing-tool.html` | Weekly pausing pass across ~38 accounts. Non-mutating by design; 11 adversarial tests on the access-control logic. |
| `catalog-alerting.html` | Cloud Run + BigQuery diff-and-notify service. Establishes range beyond Excel and the desktop. Honestly scoped as a single-account pilot. |
| `inventory-forecasting.html` | Multi-location inventory and supply planning in Sheets over BigQuery. Establishes range beyond advertising. |

**Deliberately excluded, with reasons:**

- **The browser-automation bulk exporter.** It automates the Amazon Advertising console through a
  logged-in browser session, which is plausibly contrary to Amazon's terms and which an agency
  client may read as a liability rather than a skill. Separately, its core orchestration is an
  agent-driven skill rather than authored code — the owner's real contribution is the reliability
  layer around it, which makes for a thinner story than any of the six above.
- **BigQuery warehouse** and **Looker Studio dashboards** as standalone pages. They are
  infrastructure that several of the six run on, not deliverables a client buys on their own. They
  appear as architecture context inside the pages that use them.
- **BPO reporting automation** (Alorica / Ubiquity). Dropped to the About section and the CV. Six
  pages of current, verifiable work beats five plus one from a decade ago.

**The flagship moved.** Inventory forecasting was the original flagship; Campaign Launcher now is.
Three reasons: it is objectively the strongest work in the set, its documentation is clean and
directly quotable, and — unlike the forecasting sheet — it needs nothing from the owner before its
page can be written. It therefore also becomes the page that proves out the shared template.

### Positioning consequence

The site's framing sharpens from "automation and data systems builder" to something more specific
and more valuable: **the sole engineer behind an Amazon advertising agency's internal tooling
stack**, serving roughly 38 client accounts weekly. Three desktop applications sharing common
access control, a scheduled automation fleet, a cloud alerting service, and the warehouse and
spreadsheet layer beneath them.

This matters commercially. "Data analyst who automates reports" competes against thousands of
profiles at commodity rates. "Builds and operates Amazon PPC tooling for agencies" is a specialist
niche with far fewer credible practitioners, a well-funded repeat-business client base, and
materially higher rates. The broad services list stays, so smaller dashboard and spreadsheet jobs
still convert — but it stops being the headline.

The profile copy written in `docs/profile-copy.md` predates this finding and sells the generalist
framing. It requires a rewrite against this positioning.

### Proof numbers — verifiable only

**772 test cases** across the three desktop apps (510 + 172 + 90), plus 29 in the alerting service.
**38 client accounts** processed weekly. Every such figure is countable from the repositories.

Four of the six projects have **no documented before/after baseline**. The site's proof strip
therefore draws on scale and test counts, which can be verified, and not on time-saved claims,
which cannot. No "hours saved" figure appears anywhere on the site unless the owner supplies one he
can defend in a client call.

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

### Scale of the exposure — revised 2026-09-02

The project survey found client data far beyond the single forecasting sheet this section was
originally written for. Roughly **45 distinct real client and brand names**, real ASINs in the
thousands, real Amazon Ads entity and campaign identifiers, colleague names, machine hostnames, and
a GCP project id are spread across the seven repositories. Several are recognisable companies.

The authoritative list lives at `.superpowers/sdd/2026-08-03-portfolio-site/SCRUB-LIST.md`, which
is **deliberately outside version control**: a file enumerating every client name is the single
worst thing that could reach a public repository. It carries the regex patterns, the substring and
word-boundary name lists, the specific files that must never enter the repo, and the short list of
documentation that was verified clean and is therefore safe to quote.

Two findings there are the owner's to act on and are unrelated to the portfolio: an account
password recorded as having been pasted into a chat transcript, which needs rotating, and a
plaintext Excel sheet-protection password appearing in six files including committed markdown.

### Visuals: diagrams first, screenshots second

For these six pages the original screenshot-driven approach is inverted. Hand-authored SVG
architecture and data-flow diagrams are both **better evidence for engineering work** than UI
captures and **safe by construction** — they contain only what the author puts in them, so no
scrub step can fail.

Screenshots become an optional later addition rather than a prerequisite, with two consequences
worth recording:

- Campaign Launcher's SOP contains **twelve real screen captures**, confirmed by their own captions.
  None may be used. Any UI capture for that page must be rebuilt against synthetic input.
- The search term auditor's test fixtures are **synthetically generated by a committed script**.
  Screenshots for that page can be regenerated from those fixtures rather than rebuilt — the only
  one of the six where this is true.

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

**Resolved 2026-08-03:**

- **GitHub username** — renamed to `borabo-jp`. The site will serve at `https://borabo-jp.github.io`.
- **Portrait** — approved for the About section; see section 4.
- **README accuracy** — the README's structure section names files that do not exist until later
  tasks. Ruled acceptable: the repo is not pushed public until build step 4, and the README is
  accurate by the time the landing page lands, so no external reader sees the interim state.

Nothing remains open.
