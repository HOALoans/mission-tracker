# Mission Hospital Recovery Tracker

Public dashboard tracking Mission Hospital (Asheville, NC — CMS CCN 340002) against long-range recovery goals after the 2019 HCA acquisition.

**Live site:** https://hoaloans.github.io/mission-tracker/

## Files

- `index.html` — Chart.js dashboard (served by GitHub Pages)
- `data.json` — canonical metric dataset and source citations
- `refresh.mjs` — pull current CMS HCAHPS + physician affiliation counts (`node refresh.mjs`)

## Refresh

```bash
node refresh.mjs
```

Merge printed values into `data.json` and the `DATA` block in `index.html`, then commit and push to update the live site.
