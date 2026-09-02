# Case study source material

Technical facts gathered from a read-only survey of the owner's project directories on 2026-09-02.
This is the raw material the six case study pages are written from.

**This file is deliberately scrubbed.** No client or brand names, no ASINs, no Amazon Ads
identifiers, no colleague names, no literal shared-drive paths. The unredacted scrub list lives
outside the repository in the git-ignored build workspace, because a file enumerating every client
name is the one thing that must never reach a public repo.

**Every number below is sourced from the code, its docs, or its run logs.** Where a figure was not
documented, this file says so rather than estimating. Do not add an "hours saved" claim to any case
study unless the owner supplies and can defend it — four of these six projects have no documented
before/after baseline.

---

## 1. Campaign Launcher — Amazon campaign generation desktop app

Turns a spreadsheet of products and keywords into upload-ready Amazon Sponsored Products bulk files.

- Expands each product into **five parallel campaign types** — Auto, Broad, Phrase, Exact, and
  product-page targeting (itself split into self, competitor, and brand-reinforcement variants) —
  each exploded into the full row stack Amazon requires: campaign, bid adjustments, ad group,
  product ad, keyword/target rows, negatives.
- A search-term gap tab ingests a real Amazon search term report and mines converting terms the
  account is not yet bidding on, generating product and keyword rows with computed bids. The SOP
  documents one import producing **1,315 gap keywords** in a single pass.
- **8 hard validation rules + 6 export warnings**: budget floors, bid floors, date format, the
  120-character campaign-name limit, dangling product references.
- Deliberately **stateless** — no database, no save file. Session state in memory, with a template
  import/export round trip and a crash-recovery snapshot as the only persistence.
- Exports xlsx via ExcelJS or csv through a hand-written RFC 4180 encoder. The SKU column is forced
  to text format so Excel cannot render numeric SKUs in scientific notation — ported directly from
  the legacy tool's number-format directive.

**Migration story.** It is a faithful reimplementation of a legacy Excel/VBA workbook (~211,000
lines of extracted macro code). The generation engine is a direct port of the VBA's main
per-product loop and **preserves its exact processing order so parity tests can assert on row
order**. Known bugs in the legacy behaviour were reverse-engineered and intentionally retained where
they were load-bearing — Exact campaigns get no negatives at all, to avoid a known suppression bug,
and that asymmetry is documented in the flowchart rather than left as a mystery.

**Self-hosted licensing.** A fail-closed device allow-list, checked before any window or IPC exists,
built with dependency injection so the whole policy is testable with no Electron, no filesystem and
no real clock:

- An empty-but-readable allow-list means "matches nobody", not "check disabled" — an accidentally
  cleared sheet cannot unlock the team.
- A 14-day offline grace period backed by a local cache that is hostname-bound, so copying it to
  another machine grants nothing.
- A clock rolled backwards, or a corrupted timestamp, fails closed rather than manufacturing grace.
- The allow-list path is hard-coded and deliberately excluded from user preferences. The code
  comment explains why: if a user could repoint it, the lock would be theatre.
- A thrown error inside the gate is caught and treated as a block, never as allowed-by-default.

**Stack.** Electron 33.3, React 18.3, AG Grid 32.3, Zustand 5.0, ExcelJS 4.4 (write), SheetJS 0.18
(read), TypeScript 5.7, Vite 5.4. Vitest + Testing Library + jsdom.

**Scale.** **510 test cases across 65 test files.** 208 commits over 7.5 weeks. Distributed as an
unsigned portable Windows executable over a shared drive. Named test files target specific edge
cases: a prefix-skip rule, an off-Amazon column, seller-vs-vendor SKU handling, and the gate's three
states (allowed / blocked / dev).

---

## 2. Weekly bid optimisation system + scheduled autorun

The agency's proprietary weekly Amazon Sponsored Products and Sponsored Display bid-optimisation
process. One Excel/VBA workbook per client ad account ingests that week's bulk export and recomputes
bids, budgets and placement adjustments against the account's target ACOS.

> **Naming note.** Internally this system is known by a three-letter acronym. No file in any
> repository defines its expansion, so the public case study must not use it — it can only read as
> jargon or a guess. Describe the function.

**Four chained stages:**

1. **Prep** — a macro workbook scans a shared-drive tree of ~35 client account folders, finds each
   week's raw bulk export, cleans and splits columns per client-specific rules (carving B2B and
   top-of-search campaigns into separate outputs), and writes a standardised weekly prep file back
   into the client's week folder. Human-triggered, once a week.
2. **Bid engine** — ~40 per-client workbooks. Sheets separate the fixed-ACOS bid engine, adjustable
   placement logic, budget rules, and a client-tunable variables sheet holding target ACOS and
   budget increase/cutback thresholds, plus a cross-check QA view and a change log. Button-driven
   macros import the prep file, recompute, and can export an upload-ready bulk file.
3. **Autorun** — a PowerShell and Task Scheduler watcher driving Excel over COM, so the import step
   runs for every client workbook without a human opening each file. Polls every 15 minutes while
   the operator is signed in; detects new prep files by path, timestamp and size.
4. A parallel branch applies the same bid logic to a non-Amazon retail advertising platform's own
   bulk keyword export format.

**Scale.** **36 client accounts processed end to end in a single logged run** (35 full successes, 1
partial at 99.98% row completeness). The autorun fleet is **38 client workbooks — 38/38 patched, 36
seeded with live data, 0 failures**. A full hands-off run takes about 40 minutes; a measured partial
run covered 21 of 38 workbooks in about 19 minutes. **No manual baseline is documented** — before
autorun this was an open-workbook, click, wait, save loop repeated ~38 times weekly by hand, but no
recorded figure exists for how long that took.

**Rollout discipline — the strongest signal here, and evidenced rather than claimed:**

- A genuine **two-workbook pilot** covering both engine variants, reviewed and approved before any
  of the other ~36 files were modified.
- **Named, staged backups before every rollout milestone** — one pristine copy per stage, not one
  generic backup, so any single stage of a multi-stage migration can be independently rolled back.
- A rolling window of up to five timestamped copies per workbook on every actual autorun execution.
- Nothing is ever deleted; superseded files are renamed, not removed.

**Reliability engineering:**

- **Deliberate scope-limiting as a safety property.** The scheduled automation performs only the
  read/import half of the pipeline — never the change log, never the outbound upload to Amazon. The
  reasoning is written down: a bad run costs a re-run, never a bad upload.
- A persistent per-workbook idempotency ledger keyed by prep-file signature, so a file is never
  imported twice.
- A documented result-code vocabulary distinguishing success, no-file-this-week,
  skipped-because-locked, unpatched, and error/timeout.
- A dry-run mode plus a separate check command, so a second operator can verify what would happen
  before running for real.
- A hand-off package built so a colleague can run the weekly cycle in the owner's absence, with the
  workbook-modifying tools deliberately excluded from it.

**Three real defects, root-caused from hard evidence rather than guessed** — each converted into a
standing runbook rule:

- VBA declaration-order corruption crashing Excel with an access violation, diagnosed from Windows
  Application event-log crash records.
- An environment variable returning empty under COM-launched Excel, causing 900-second hangs.
- A compile probe that could pass a broken module because it tested a procedure above the fault.
  Caught by screenshotting the Excel process window handle to find a hidden break-mode dialog.

---

## 3. Weekly campaign pausing tool

A Windows desktop app that automates the weekly Sponsored Products pausing pass across the client
fleet. Sweeps every client's prep workbook for a chosen week off the shared drive, applies two pause
rules, shows an editable preview, and writes upload-ready files back — **never mutating the source
file**.

- **Rule 1**: on the clean-up tab, every row with a non-blank state becomes update/paused. Rows with
  a blank state are excluded, because Amazon's bulk uploader rejects a state value on bid-adjustment
  rows.
- **Rule 2**: on the manual-review tab, rows whose entity is exactly keyword or product targeting
  **and** whose sales are zero (blank counting as zero) get the same treatment.
- Filename discovery is regex-based, picking the newest file per account variant, rejecting Excel
  lock stubs and the tool's own prior output.
- Columns are resolved **by normalised header name rather than fixed letter**, and all 46 original
  columns are preserved on export even though only a few are modified.
- An IPC handler that opens a folder is path-validated to stay inside the prep root, so a
  compromised renderer cannot be tricked into opening arbitrary paths.

**Electron security done properly**: context isolation on, node integration off, sandbox on, all
filesystem and Excel work in the main process, crossing to the UI through a typed preload bridge.

**Scale.** Processes roughly **38 active client accounts weekly**, with per-account variant handling
producing separate export pairs. A full week scan takes up to a minute.

**Testing — 90 test cases across 9 files**, genuinely behavioural:

- Business-rule tests assert exact row-level outcomes, non-mutation of input, and error messages
  that name the missing column.
- An integration round-trip builds a fixture tree seeded with decoys — a prior output file, an Excel
  lock stub — asserts the scanner ignores them, and round-trips a real xlsx through disk.
- **11 adversarial tests on the access-control logic** covering clock skew, a spoofed cache
  hostname, blank-versus-blank hostname comparison, and the distinction between an empty list and an
  unreadable one.
- Filter/sort tests cover numeric-versus-text column inference, including keeping 15-digit campaign
  IDs textual to avoid float-precision loss.

**Stack.** Electron 31.4, React 18.3, Zustand 4.5, TanStack Table 8.20 + Virtual 3.14 (a filtered,
sorted, virtualised 46-column preview), ExcelJS 4.4, TypeScript 5.5, Vitest 2.0.

**Suite signal.** The device allow-list is **shared across three tools** — this one, the search term
auditor, and Campaign Launcher. This is an internal product suite with common access control, not
three unrelated scripts. Each ships with a printable SOP and flowchart generated through an
HTML-to-PDF pipeline, written for non-technical operators.

---

## 4. Search term cannibalisation auditor

Finds cases where the same product and the same shopper search phrase are being bid on by two or
more of the advertiser's **own** keywords — so the advertiser competes against themselves instead of
against outside sellers.

- Groups rows by product identifier plus customer search term, separately per match type, and flags
  any group served by two or more distinct keyword texts.
- **Two output artifacts with different jobs**: an Excel report across three sheets for human
  review, and an upload-ready pause file that reproduces each selected keyword's real campaign row
  exactly as the platform has it, changing only operation, state and entity. Matched **by keyword ID
  and never by name**, because identical keyword and match-type pairs can legitimately exist in
  multiple ad groups.
- Rows on paused campaigns are dropped before detection and counted separately as excluded rather
  than skipped.
- **Cross-file variant grouping**: sibling child products are mapped to a shared parent via a CSV
  synced from BigQuery, so cannibalisation is caught even when competing variants' campaigns live in
  different export files. Candidates are pooled across the whole scan before grouping.

**The central-directory zip reader — the best engineering story in the set.** Amazon's bulk exports
are written by a streaming zip writer that defers each entry's size to a trailing data descriptor
rather than declaring it in the local header. A naive sequential reader must scan forward hunting for
that descriptor's signature — and if an entry's *compressed* bytes happen to contain the same byte
sequence, the read either truncates or **hangs forever**, because the error surfaces on the stream
rather than the async iterator, so it neither resolves nor rejects. The fix: read the archive's
**central directory**, the end-of-archive index carrying each entry's true offset and size, so
nothing is guessed and only the needed sheets are decompressed. Paired with a hand-rolled SAX parser
over the sheet XML to keep memory constant regardless of sheet size.

**Performance engineering:**

- One worker thread per file from a pool sized to CPU cores minus one, each file capped at five
  minutes so a single bad file cannot stall a scan.
- Documented benchmark: a **23.5MB file with 43,000 search-term rows plus a 147,000-row campaign
  sheet parses in about 16 seconds.**
- A deliberate second pass: only *after* detection narrows down which keyword IDs matter does it
  return to read just those rows out of a campaign sheet that can run to ~69,000 rows — rather than
  carrying tens of thousands of unusable rows through the app.
- Tolerant header aliasing resolves the platform's inconsistent header names, case- and
  whitespace-insensitively.

**Migration story.** The header-alias table is a port of a legacy VBA class module that used
hard-coded exact-match header comparison, fragile to the platform's casing variations. The detection
rule itself was *changed*, not ported: the legacy tool grouped by product plus keyword and never read
the customer search term column at all, so it could not perform this audit; it also summed metrics
across rows where the new implementation keeps every raw row as its own line. The port explicitly
guards against a known, numbered object-reuse defect in the legacy tool that produced
cross-contaminated output rows.

**Stack.** Electron 31.4, React 18.3, Zustand 4.5, TanStack Table + Virtual, ExcelJS 4.4 (write),
saxes 5.0 (streaming XML read), Piscina 4.7 (worker pool), TypeScript 5.5, Vitest 2.0.

**Testing — ~172 test cases across 24 files**, including a dedicated test for the streaming-zip data
descriptor quirk. Fixtures are **synthetically generated** by a committed generator script, including
one shaped specifically to trigger that zip edge case — so the test suite never depends on real
client data. This also means screenshots for this case study can be regenerated from existing
synthetic fixtures rather than rebuilt from scratch.

---

## 5. Catalog change alerting service

A scheduled diff-and-notify pipeline. A Cloud Scheduler job hits a Cloud Run HTTP endpoint on a
cron; the service compares today's catalog state in BigQuery against a rolling history snapshot and
emails a grouped digest of what actually changed.

- Source data lands in BigQuery via a third-party Amazon Selling Partner API report-ingestion tool.
- **Five independent diff rules**: account health, unfulfillable inventory, stranded inventory, buy
  box status, and blocked-versus-active listings.
- Output is one grouped HTML and plain-text digest per subscribed recipient, enriched with product
  name and image, sent over SMTP.
- Diff rules are **pure functions** — data in, list of changes out, no I/O — which is what makes the
  suite fast and meaningful.

**Reliability design:**

- **Per-category failure isolation.** One BigQuery timeout cannot take down the other four
  categories or block their emails.
- **Self-healing idempotency.** A guard treats a window as complete only when *all five* categories
  have logged a fresh success, so a partial failure is automatically retried by the next invocation
  with no dead-letter queue needed. Plus a dry-run mode.
- A **recursive leaf-diff walker** unwraps the platform's single-element-array field envelopes and
  strips known-noisy subfields, collapsing a deeply nested, semi-structured account health report
  into one human-readable line per real change instead of a wall of raw output.

**Real-world data quirks documented in the code** — the detail that proves the work is real: one
source table's product-identifier column arrives always null, so the identifier is joined in from a
different report; batch-scoped deduplication and upsert-versus-overwrite table behaviour are
likewise documented in docstrings rather than discovered twice.

**Stack.** Python. BigQuery client 3.x, pandas 2.x, db-dtypes; stdlib smtplib and zoneinfo. Cloud
Run + Cloud Scheduler with OIDC-authenticated invocation; secrets from Secret Manager, injected at
deploy rather than baked in. **Dependencies are lower-bound only, not pinned** — worth noting as a
known weakness if the case study discusses reproducibility.

**Testing — 29 pytest tests**, behavioural: each builds small synthetic dataframes and asserts exact
change and digest objects. No BigQuery or SMTP calls; the suite runs in under two seconds.

**Honest scope.** This is a **pilot on a single seller account with three recipients**. The case
study must say so, not imply fleet-wide deployment. The documented cadence is inconsistent between
the README and the handoff notes — verify against the live scheduler before stating it.
**No manual baseline is documented**; do not invent an hours-saved figure.

---

## 6. Multi-location inventory forecasting

Covered in the design spec's flagship section. Multi-echelon inventory and supply planning in Google
Sheets over BigQuery: stock reconciled across six-plus node types against a single snapshot date,
lead-time and minimum-order-quantity reference tables feeding a forecasting layer, producing both a
stock forecast and factory purchase-order recommendations. Awaiting the owner's synthetic rebuild
before its visuals can be produced.

---

## Cross-cutting observations for the site's framing

1. **This is one platform, not six unrelated projects.** The owner is the sole engineer behind an
   Amazon advertising agency's entire internal tooling stack, serving ~38 client accounts weekly:
   three desktop applications sharing common access control, a scheduled VBA/PowerShell automation
   fleet, a cloud alerting service, and the spreadsheet-and-warehouse layer underneath.
2. **Three tools, one allow-list.** Worth stating explicitly — it is the difference between "wrote
   some scripts" and "built and operates an internal product suite."
3. **The recurring pattern is legacy VBA to tested TypeScript.** Two of the three desktop apps are
   ports of macro workbooks, one preserving legacy behaviour exactly for parity, the other
   deliberately correcting a rule the legacy tool got wrong. That is a specific, valuable, and
   demonstrable skill.
4. **The credible headline metric is 772 test cases** across the three desktop apps (510 + 172 +
   90), plus 29 in the alerting service. Every figure is countable from the repositories.
5. **Four of six projects have no documented before/after baseline.** The site's proof numbers must
   come from scale and test counts, which are verifiable, rather than time-saved claims, which are
   not.
