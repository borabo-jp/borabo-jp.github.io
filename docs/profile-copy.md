# Platform profile copy

**Rewritten 2026-09-03** against the finalized Amazon Ads tooling positioning and the live case
studies — supersedes the earlier draft, which sold the old generalist BI framing, referenced the
now-dropped inventory-forecasting case study, and predates having live profile URLs to review
against.

## One thing still outstanding

- `<PORTFOLIO_URL>` — will be `https://borabo-jp.github.io` once the site deploys (owner-blocked on
  `gh auth login` under the correct `borabo-jp` account). Don't paste the placeholder token into a
  live profile — wait until the site is up, then substitute the real address.

---

## OnlineJobs.ph — review of the live profile

Read directly from `https://www.onlinejobs.ph/jobseekers/info/1122576` on 2026-09-03.

**What's there now:**
- Title: "Reporting Analyst (6+ Years) | Excel VBA & Power BI | Amazon"
- Description leads with "Reporting Analyst | Amazon Reporting Specialist | Excel & Power BI
  Expert | Data Automation" — framed as Seller Central *reporting/analytics*, not Ads *tooling
  engineering*.
- Rate: $8.66/hour ($1,696/month), full-time.
- No mention of BigQuery, the three shipped desktop apps, Cloud Run, the bid-optimisation fleet,
  or the portfolio site — all of that came after this profile was last substantially edited.
- Two Key-Skill entries show **"Experience: Less than 6 months"** for Data Analytics and Microsoft
  Excel — this directly contradicts the "6+ Years" headline and undercuts credibility. This looks
  like a stale default on OnlineJobs.ph's per-skill duration field rather than a deliberate choice.

**Recommended changes, in priority order:**

1. **Fix the skill-duration mismatch first — it's actively hurting you.** A client who opens the
   Key Skills panel and sees "Excel: Less than 6 months" next to a "6+ Years" headline reads that
   as sloppy or dishonest, even though it's obviously just an unedited platform default. Update
   Data Analytics and Microsoft Excel (and any other skill tag) to reflect actual years.
2. **Rewrite the title and description around the tooling specialism** — see the ready-to-paste
   version below. The current framing ("Amazon Reporting Specialist") undersells what's now
   actually true: you build and ship production software (Electron desktop apps, a cloud service,
   scheduled automation), not just reports.
3. **Add the portfolio link** once the site is live — OnlineJobs.ph shows a "Website" field that
   currently reads "Sign Up with Pro Account to View" (unclear if that's a visibility setting on
   your end or a platform gate on the viewer's end — worth checking your profile edit page for a
   website/portfolio URL field and confirming it's actually filled in and visible).
4. **Reconsider the rate.** $8.66/hour is a general-VA/analyst rate. The specialist niche this site
   now documents — production Amazon Ads tooling with hundreds of shipped automated tests — commands
   more in the freelance market than commodity reporting work. This is your call and depends on
   what you're comfortable asking for, but it's worth deciding deliberately rather than leaving the
   old rate in place by default now that the positioning has moved.

**Ready-to-paste replacement title** (OnlineJobs.ph titles run long, unlike Upwork's 70-char cap):

```
Amazon Ads Automation Specialist | Desktop Apps, BigQuery & Reporting | 8+ Years
```

**Ready-to-paste replacement Profile Description:**

```
Amazon Ads Automation Specialist | Internal Tooling Engineer | 8+ Years in Data & Reporting

I build and operate the internal tooling stack for an Amazon advertising agency — three
production Windows desktop applications (750+ automated tests between them), a scheduled
bid-optimisation system running across a 38-account client fleet, and a cloud-based catalog
alerting service, all sitting on top of a BigQuery warehouse and Looker Studio reporting layer.

What I Can Do
• Build and maintain desktop applications (Electron, TypeScript) for workflows spreadsheets can't
  carry — campaign generation, keyword auditing, automated pausing
• Automate scheduled multi-account workflows with VBA and PowerShell — reliably, with staged
  rollouts and zero-failure runs across dozens of client accounts
• Build cloud services (Python, Google Cloud Run, BigQuery) for scheduled diffing and alerting
• Consolidate scattered exports into a BigQuery warehouse as a single source of truth
• Build Looker Studio and Power BI dashboards, and Excel/Google Sheets tooling with VBA and Apps
  Script, for teams that live in spreadsheets

Key Skills
• Amazon Ads tooling — campaign generation, bid optimisation, cannibalisation auditing, pause
  automation, catalog alerting
• Application development — Electron, TypeScript, React, Python
• Data automation — VBA Macros, Google Apps Script, PowerShell, SQL, MS Access, Power Query
• Data warehousing & cloud — BigQuery, Google Cloud Run, Cloud Scheduler
• Reporting & BI — Excel, Google Sheets, Power BI, Looker Studio

Why Hire Me
I ship systems that keep running — tested, documented, and built for the person who has to operate
them after I hand it off, not just for the demo.

Full case studies with architecture diagrams and real numbers: <PORTFOLIO_URL>
```

---

## Upwork — pending your profile text

Your Upwork profile page requires a logged-in Upwork account to view (`This freelancer's profile is
only available to Upwork customers`), so I can't read the current live version the way I did for
OnlineJobs.ph. Paste your current headline and overview here (or a screenshot) and I'll give you
the same before/after review. In the meantime, here's a rewritten version against the same
positioning as a starting point:

**Upwork headline (under 70 characters):**

```
Amazon Ads Automation Specialist — Desktop Apps, BigQuery, VBA
```

63 characters.

**Upwork overview** (first two lines are all that show before "more" — lead with the client's
problem, not your history):

```
Most Amazon agencies run their weekly campaign, bid, and pause cycle by hand across dozens of
accounts — until someone builds the tooling that removes that job.

I'm that person. I build and operate the internal tooling stack for an Amazon advertising agency:
three production desktop applications (750+ automated tests between them) for campaign generation,
keyword-cannibalisation auditing, and campaign pausing; a scheduled bid-optimisation system running
across a 38-account client fleet with zero failed runs; and a cloud service that diffs catalog and
inventory state and emails a change digest. All of it sits on a BigQuery warehouse and Looker
Studio reporting layer I also built and maintain.

What I do:
• Amazon Ads tooling — campaign generation, bid optimisation automation, cannibalisation auditing,
  pause automation, catalog alerting
• Application development — Electron, TypeScript, React, Python
• Report and pipeline automation — VBA, Google Apps Script, PowerShell, scheduled jobs
• Data warehousing — BigQuery, SQL, Power Query
• Dashboards — Looker Studio, Power BI, Google Sheets

Case studies with architecture diagrams and real, verifiable numbers: <PORTFOLIO_URL>

Based in the Philippines (UTC+8) with overlap into US business hours.
```

---

## Portfolio attachment note (not part of the pasted copy)

Attach each case study as a **separate** Upwork portfolio item, each one linking to its own case
study page URL rather than the site root, so a client browsing a specific skill lands directly on
the matching work instead of the homepage.
