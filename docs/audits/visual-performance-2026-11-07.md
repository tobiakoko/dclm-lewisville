# Production website captures and Lighthouse audit (2026-11-07)

These scripts intentionally measure and screenshot the **deployed** \`https://dclm-lewisville.vercel.app/\` site. They do not reconstruct pages from source and do not change production.

## Run

From **Actions → Visual and performance audit → Run workflow** on branch \`audit/visual-performance-2026-11-07\`, or push to the audit branch after updating the scripts. Download the workflow's \`production-visual-performance-audit\` artifact when it completes.

## What is captured

- Authentic browser screenshots of Home, Visit, Events, Sermons and Ministries at 1440×900 desktop and 390×844 mobile.
- 2× device-pixel-resolution viewport images, plus long full-page images.
- Page URL, title, HTTP response, dimensions, capture time and success/errors in \`site-captures/capture-metadata.json\`.
- Lighthouse mobile and desktop reports for each route: JSON and HTML with performance, accessibility, best practices and SEO category scores and loading diagnostics; a concise \`lighthouse/summary.json\`.

**Interpretation:** Lighthouse reports are **lab** diagnostics; they are not real-user Core Web Vitals. Real-user data must be sourced separately from CrUX/PageSpeed Insights field data or an installed real-user metrics tool such as Vercel Speed Insights. Lighthouse reports LCP and CLS simulations, and TBT as a responsiveness proxy; it does **not** measure real-user INP.

## Production-worthy visual publishing workflow

1. Capture at the source's exact viewport and commit state. Prefer consistent browser, OS, locale, reduced motion, light theme and consent state.
2. Verify the visual: fonts, responsive breakpoints, images, no browser error, no skeleton/loading placeholder, no clipped text and authentic site content.
3. Produce original 2× pixel-density PNG images. Keep those originals untouched as evidence.
4. Crop selected sections for marketing. Place the originals in a restrained neutral browser/device frame, with balanced whitespace, modest shadows and a consistent background. Never paste invented UI over the capture.
5. Export PNG for precise UI detail, WebP or AVIF for web delivery; keep sharp readable text. Use consistent image ratios (e.g., 16:10 desktop, 9:16 mobile), grid alignment and safe-area margins.
6. For portfolio case studies, show the home hero, Visit information, Events listing and Sermons player, each on desktop and mobile, plus one paired side-by-side comparison.
7. Re-capture after important deployments, then compare pixels before replacing published imagery.

## GitDiagram

GitDiagram creates an **architecture diagram**, not a screenshot. Open:
https://gitdiagram.com/tobiakoko/dclm-lewisville
Review the generated diagram against source code; don't treat an inferred box as proven integration.

## Core Web Vitals thresholds (75th percentile of actual visits)

- LCP: good ≤2.5 s; needs improvement >2.5–4.0 s; poor >4.0 s.
- INP: good ≤200 ms; needs improvement >200–500 ms; poor >500 ms.
- CLS: good ≤0.1; needs improvement >0.1–0.25; poor >0.25.

Reference: https://web.dev/articles/vitals

## Important limitations

- CI hosts/network and Lighthouse CPU throttling differ from users' devices; repeat multiple runs and report median and variation.
- Field metrics require sufficient traffic; lack of CrUX data is **not** a passing performance score.
- Screenshots are production-state captures, not Sanity seed / Playwright-test screenshots.
