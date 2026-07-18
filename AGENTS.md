# Mission Hospital Recovery Tracker

Dashboard tracking Mission Hospital (Asheville, NC — CMS CCN **340002**, HCA-owned since 2019) against long-range recovery goals. Built in Cowork; migrated here for further development.

## Project files

- `index.html` — working dashboard (Chart.js via CDN, single file). All chart data lives in the `const DATA = {...}` block near the bottom; append new snapshots there, never overwrite history.
- `data.json` — canonical dataset: all metrics, historical values, goals, source citations, and the exact CMS API URLs.
- `refresh.mjs` — Node script that pulls fresh CMS data (HCAHPS + physician-affiliation count) and prints values to merge into `data.json` / `index.html`.

## The 7 metrics being tracked

| Metric | Reportable? | Source | Cadence |
|---|---|---|---|
| IJ / EMTALA violations | Yes | CMS Form 2567 inspections (news + CMS QCOR) | As they occur |
| Patient satisfaction | Yes | CMS HCAHPS API (dataset `dgck-syfz`) | Quarterly |
| Good vs bad experiences | Proxy only | HCAHPS rated 9–10 vs ≤6 | Quarterly |
| Nurse counts | Proxy | Cost-report staff-to-bed ratio (9.1 in 2018 → 4.7 in 2023) | Annual, ~1yr lag |
| % travelers | Proxy | Cost report Worksheet S-3 contract-labor hours; news estimates (~40% in 2024) | Annual |
| Residency fill | Yes | NRMP Match results (MAHEC/Mission GME) | Each March |
| Physician retention | Proxy | CMS facility-affiliation count (baseline 1,621, Jul 2026) | Quarterly |

## Long-range goals (charted as goal lines)

0 IJs by 2028, sustained · HCAHPS 4★ by 2028 (pre-sale), 3★ interim · rated-9-10 ≥ 80% by 2028 / rated-≤6 ≤ 10% by 2028 · staff-to-bed 9 by 2028 (pre-sale) · travelers < 10% by 2028 · affiliated clinicians ≥ 1,621 · 100% Match fill.

## Key history

- Stars: 4★ pre-sale (2018) → 2★ 2019 → 1★ 2022–2024 → 2★ latest (surveys Jul 2024–Jun 2025)
- IJs: 2021, Dec 2023/Feb 2024 (+EMTALA, 18 harmed/4 deaths), Oct 2025, Jan 2026 (removed Mar 4, 2026)
- Not currently under IJ

## Refreshing data

Run `node refresh.mjs` — hits the two CMS APIs and prints current values. For cost-report years, download HCRIS Form 2552-10 files (provider 340002, Worksheet S-3) from cms.gov. NRMP fill data each March. IJ status: search recent Asheville Watchdog / Carolina Public Press / NC Health News coverage.

## Caveats

- Pre-2025 star ratings and staffing ratios compiled from published analyses (Asheville Watchdog, Wake Forest report) of CMS archives, not re-verified against raw archive files.
- Traveler % is a union estimate, not audited.
- National HCAHPS averages in comparisons are approximate.
