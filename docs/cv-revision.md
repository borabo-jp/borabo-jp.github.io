# CV rewrite — full replacement text

**This has been generated as an actual PDF, not just copy-paste text.** `docs/cv.html` is the
laid-out source (matches your original template's two-column label/content style — name, title,
contact line, then SUMMARY / WORK EXPERIENCE / EDUCATION / KEY SKILLS as left-margin labels) and
`assets/Borabo-CV.pdf` is the rendered output, replacing the old placeholder copy. The prose below
is kept as the readable, reviewable record of exactly what's in it — edit here first if you want to
change wording, then regenerate the PDF from `docs/cv.html` (instructions in a comment at the top
of that file) or just ask for it to be regenerated.

The site deployed 2026-09-03 to `https://borabo-jp.github.io/` — the contact line now includes it.

The AMS start date is confirmed (Feb 2026 — owner-supplied 2026-09-03) and reflected below, with
the Intelegencia entry's end date set to the month immediately before it (Jan 2026), per the
earlier decision that AMS superseded Intelegencia rather than running alongside it.

Everything below matches what's in the generated PDF.

---

## Header

```
JOHN PATRICK BORABO
Automation & Data Systems Specialist | AI-Assisted Automation
jaypeeborabo81@gmail.com | 09666973287 | Antipolo City, Philippines | borabo-jp.github.io
```

Note: shortened "Cupang, Antipolo City" to "Antipolo City" in the header — city-level location is
enough for a CV header and this document is headed for a public portfolio site; the phone number
stays since that's a standard, expected CV field. Worth deciding for yourself whether you're
comfortable with the phone number specifically being in a public git repository's history once the
site deploys — that's the same tradeoff as any public CV upload, but a repo is indexed and archived
differently than a PDF you email directly to a client. If you'd rather not, drop the phone number
from this document and keep it only in the version you send directly to clients.

---

## Summary

```
Automation and data-systems engineer with 8+ years in data and reporting. I currently build and
operate the internal tooling stack for a digital agency — three production desktop applications
with over 750 automated tests between them, a scheduled bid-optimisation system running across a
38-account client fleet, and a cloud-based catalog alerting service — on top of the BigQuery
warehouse and reporting layer underneath, using AI-assisted development (Claude) to build and ship
faster. I ship systems that keep running, not one-off reports.
```

---

## Work experience

**New lead entry — replaces the current top entry.** Per your earlier decision, AMS Management
supersedes the Intelegencia role rather than running alongside it, so only AMS is marked "Present."

```
Automation & Data Systems Specialist | AMS Management          Feb 2026 – Present

• Built and maintain three internal Windows desktop applications (Electron, TypeScript, React)
  covering Amazon Sponsored Products campaign generation, search-term cannibalisation auditing,
  and weekly campaign pausing — over 750 automated tests across the three, sharing one common
  device-based access-control system.
• Automated the agency's weekly Amazon Ads bid-optimisation cycle — VBA and PowerShell-driven
  scheduling across a 38-workbook client fleet, with staged rollout, timestamped backups, and
  zero failures logged across the automated fleet.
• Built a Cloud Run and BigQuery service that diffs daily catalog and inventory state against a
  rolling history and emails a grouped change digest, piloted on a live seller account.
• Own the BigQuery warehouse and Looker Studio / Google Sheets reporting layer the rest of the
  tooling stack runs on, plus the agency's public-facing website — using AI coding tools (Claude)
  as a standard part of the development workflow.
```

**Intelegencia entry — end date filled in** (Jan 2026, the month before the Feb 2026 AMS start):

```
Brand/Data Support Specialist | Intelegencia          Mar 2025 – Jan 2026

• Automated reports via Google Apps Script and macros; managed data extraction from Amazon
  Seller/Vendor Central for dashboards.
• Researched product trends and maintained data integrity in spreadsheets to support brand
  strategy presentations.
```

**Everything below this point is unchanged from the current CV** — Alorica, the three Ubiquity
roles, the three TechMahindra roles, and Education. Kept as-is because they're already accurate and
this rewrite only needed to touch the framing, the lead entry, and the skills section:

```
Reporting Analyst | Alorica                                    Apr 2024 – Feb 2025
• Built VBA Macros and MS Access solutions to replace legacy Excel sheets, enhancing reporting
  efficiency.
• Delivered customized Power BI operational reports based on stakeholder requirements and metric
  analysis.

MIS Reporting Analyst | Ubiquity                                Jul 2023 – Apr 2024
• Automated reporting workflows and replaced manual Excel processes by developing custom VBA
  Macros and MS Access databases.
• Generated and analyzed daily operational metric reports using Power BI, collaborating with
  stakeholders to define requirements and deliver customized solutions.

Business Insights Analyst | Ubiquity                            Jun 2022 – Feb 2023
• Translated analytical findings into actionable business insights and data visualizations for
  client presentations.
• Ensured report accuracy and drove process improvements while communicating recommendations
  directly to stakeholders.

Operational Risk Analyst | Ubiquity                             Jan 2022 – Jun 2022
• Investigated and resolved payment claims, specifically handling Regulations E & Z disputes and
  VISA/STAR chargebacks.
• Validated disputes with merchants and utilized available resources to make decisions on case
  approvals or denials within required timeframes.

MIS Reporting Analyst | TechMahindra                            Apr 2019 – Oct 2021
• Developed automated reports using Excel Macros and maintained dashboards to track call center
  performance.
• Managed real-time inbound call traffic across multiple locations and conducted ad-hoc analysis
  to enable business decisions.

Escalation Specialist | TechMahindra                            Oct 2018 – Apr 2019
• Investigated and resolved complex customer complaints while documenting guidelines for process
  improvement.
• Trained new agents on call handling efficiency and provided support during high-volume periods.

Customer Service Associate | TechMahindra                       Mar 2017 – Oct 2018
• Resolved technical and account-related inquiries for Globe Telecom services, ensuring accurate
  documentation of all interactions.
```

---

## Education

Unchanged — still correctly shows the degree as not completed. Do not edit this to imply
otherwise:

```
Bachelor of Science in Information Technology                   Jun 2013 – Oct 2016
IETI Marikina
4th Year College Undergraduate
```

---

## Key skills

**Replaces the current Key Skills block.** Reorganized to lead with what's now the strongest,
most differentiated evidence — the shipped Amazon Ads tooling suite — while keeping the broader
BI/reporting skillset that still covers everything else:

```
Amazon Ads Tooling: Campaign generation & bulk file automation, bid optimisation automation,
search-term cannibalisation auditing, campaign pause automation, catalog change alerting.

Application Development: Electron, TypeScript, React, Python, automated testing (750+ tests
shipped across three production desktop apps).

Data Automation: VBA Macros, Google Apps Script, PowerShell, SQL, MS Access, Power Query.

Data Warehousing & Cloud: BigQuery, Google Cloud Run, Cloud Scheduler.

Reporting & BI: Excel, Google Sheets, Power BI, Looker Studio.

AI-Assisted Automation: Claude and AI coding agents used as a standard part of building, testing,
and shipping the tooling above.

Process & Reliability: Staged rollouts, access-control design, idempotent scheduled automation,
documentation and SOPs for non-technical operators.
```

---

## What changed from the previous CV, at a glance

1. Title and summary rewritten around the Amazon Ads tooling specialism — the strongest,
   most differentiated evidence now that five case studies are shipped and reviewed.
2. AMS Management added as the current role, replacing (not overlapping) Intelegencia, with
   bullets grounded in the five actually-shipped, tested projects — no inventory-forecasting
   claim, since that case study was dropped rather than built (no Google Sheet demo exists).
3. Key Skills reorganized to lead with the Amazon Ads tooling stack, keeping the full BI/reporting
   skillset underneath so smaller, more general jobs still read as covered.
4. Portrait/photo, Alorica, Ubiquity, TechMahindra, and Education entries are untouched.
5. AMS start date confirmed as Feb 2026; Intelegencia now shows a real end date (Jan 2026) instead
   of "Present," resolving the two-current-roles inconsistency the earlier patch-note version had
   flagged but left open.
