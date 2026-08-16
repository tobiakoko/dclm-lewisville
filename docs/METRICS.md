# Metrics

## Funnel
- Entry: Home (organic search, social, word of mouth)
- Visit path (ONE action): Home → [About / Ministries / Events] → Contact → form submission ("Plan a visit")
- Secondary paths: Sermons (watch online), Give (donate), Ministers (meet leadership)
- Blocked arteries: Home (competing CTAs), service-times info (conflicting), /give (dead buttons), sermons list (dead ends)
- Missing links: /new-here first-visit flow; events → contact routing works but UI inert
- Evidence: no analytics installed. Baselines below are assumptions to validate after Phase 6 / analytics install.

## Stage & One Metric That Matters
| Stage | One metric | Baseline | Target |
|---|---|---|---|
| Home | "Plan Your Visit" click-through | unknown (no analytics) | measurable after install |
| /contact | Form submissions (first-time visitor inquiries) | unknown | increase vs. baseline once measured |
| /give | Working donation click | 0 (buttons dead) | platform live |
| /sermons | Card → detail page clicks | 0 (cards unlinked) | cards linked |

## Baselines & Targets
| CWV metric | Baseline | Target | Miss response |
|---|---|---|---|
| LCP | 5.8s (live 2026-08-14, Lighthouse) | <2.5s | hero images through next/image (ICE 9.8) |
| FCP | 3.0s | <1.8s | same fix |
| INP/TBT | 20ms | <200ms | — |
| CLS | 0 | <0.1 | reserve image space (already done) |
| TTFB | 30ms | <800ms | — |
| Fonts | 87KB (2 files) | <100KB | — (passes) |