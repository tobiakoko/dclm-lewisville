# Experiments

## Experiment Cards
### EXP-001 — Hero ONE CTA + single service-times truth
- Hypothesis: If the home hero leads with a single "Plan Your Visit" CTA and service times match everywhere, first-time visitors will trust the info and take the visit action because competing CTAs and conflicting times currently block it (Phase 1, blocked artery)
- Type: qualitative / manual check (low traffic, no analytics)
- Primary metric & threshold (pre-committed): "Plan Your Visit" click-through measurable once analytics installed; manual check: hero has exactly one primary CTA, all 4 service-time surfaces agree
- Guardrail metric: no other page CTA removed entirely
- Decision rule: persevere if clicks appear; iterate on copy if not; pivot to transitional CTA if neither

### EXP-002 — Hero images via next/image (LCP fix)
- Hypothesis: If hero slides route through next/image with priority on slide 1 and lazy loading on the rest, LCP drops below 2.5s because the 1.36MB raw JPEGs (78% of payload) currently block the largest paint
- Type: performance verification (Lighthouse)
- Primary metric & threshold (pre-committed): LCP < 2.5s on live Lighthouse (baseline 5.8s)
- Guardrail metric: CLS stays 0; visual quality unchanged
- Decision rule: persevere if LCP <2.5s; iterate on image sizes if 2.5-4s; revert if worse than baseline

### EXP-003 — Constraint-first: wire or remove inert controls
- Hypothesis: If every control that looks clickable either works or disappears, trust in the visit and give paths rises because false affordances currently make visitors doubt the whole site (Phase 8)
- Type: qualitative / manual check
- Primary metric & threshold (pre-committed): zero dead controls on home, contact, give, events, sermons (manual audit passes)
- Guardrail metric: no live flow removed
- Decision rule: persevere when audit passes; iterate on remaining controls

### EXP-004 — SB7 hero copy + concrete sub
- Hypothesis: If the hero names the fit-in problem and paints the concrete first visit ("walk in Sunday 9:30 AM… known by name"), visitors grasp the offer in 5 seconds because the current generic headline names no desire (Phases 5+7)
- Type: qualitative / 5-second test with real visitors when available
- Primary metric & threshold (pre-committed): 5-second test passes (visitor can restate offer) for 4/5 testers
- Guardrail metric: one-liner stays unchanged
- Decision rule: persevere on pass; iterate sub copy on fail

## Experiment Backlog
| Idea | ICE (impact/confidence/ease) | Status |
|---|---|---|
| Single service-times truth + hero ONE CTA ("Plan Your Visit") | I8 C9 E9 = 8.7 | prioritized |
| Wire /give to a real giving platform (or remove header CTA until live) | I8 C9 E7 = 8.0 | prioritized |
| Link sermon cards → /sermons/[slug]; hide dead controls | I6 C9 E8 = 7.7 | prioritized |
| Build "New Here?" first-visit flow (what to expect, parking, kids, no-pressure) | I7 C7 E6 = 6.7 | backlog |
| Trust proof above fold: Google reviews + pastor welcome | I7 C6 E6 = 6.3 | backlog |
| Fix /privacy and /terms 404s | I3 C9 E5 = 5.0 | backlog |
| Single service-times source of truth (Phase 2) | I8 C9 E9 = 8.7 | prioritized |
| Hero ONE CTA "Plan Your Visit" (Phase 2) | I8 C9 E9 = 8.7 | prioritized |
| Wire /give to platform or hide CTA (Phase 2) | I8 C9 E7 = 8.0 | prioritized |
| Wire or remove inert controls — events, sermons, Ask for Prayer, newsletter (Phase 2) | I7 C9 E8 = 8.0 | prioritized |
| Link sermon cards → detail (Phase 2) | I6 C9 E8 = 7.7 | prioritized |
| Breadcrumbs + active nav state (Phase 2) | I5 C9 E9 = 7.7 | prioritized |
| Fix "Contact Leaders"→/about, event "Learn More"→/contact (Phase 2) | I5 C9 E9 = 7.7 | prioritized |
| Label or remove icon-only sermon actions (Phase 2) | I4 C8 E9 = 7.0 | backlog |
| Cut half the words — welcome + testimony (Phase 2) | I5 C6 E7 = 6.0 | backlog |
| Token consolidation + dead code removal (Phase 3) | I5 C9 E9 = 7.7 | prioritized |
| Footer/link contrast fixes (Phase 3) | I5 C9 E9 = 7.7 | prioritized |
| One primary button style (Phase 3) | I6 C8 E8 = 7.3 | prioritized |
| Grayscale hierarchy pass on home sections (Phase 3) | I6 C8 E7 = 7.0 | prioritized |
| Measure caps on body copy + fix `prose max-w-none` (Phase 4) | I6 C9 E9 = 8.0 | prioritized |
| `next/font` self-hosting + weight reduction <100KB (Phase 4) | I5 C9 E8 = 7.3 | prioritized |
| Hero above-the-fold SB7 rewrite (Phase 5) | I7 C8 E8 = 7.7 | prioritized |
| Welcome letter empathy-first rewrite (Phase 5) | I6 C8 E8 = 7.3 | prioritized |
| 3-step first-visit plan copy (Phase 5) | I7 C7 E7 = 7.0 | prioritized |
| Hero images via next/image — priority slide 1, lazy rest (Phase 6) | I9 C10 E10 = 9.8 | prioritized |
| Concrete specifics pass — hero sub, stat, trimmed testimony (Phase 7) | I6 C8 E8 = 7.3 | prioritized |
| Welcome letter halved + empathy-first rewrite (Phase 7) | I5 C8 E8 = 7.0 | prioritized |
| Constraint-first pass — remove/hide inert controls until wired (Phase 8) | I8 C9 E9 = 8.7 | prioritized |
| Contact form error/success message rewrites (Phase 8) | I5 C9 E10 = 8.0 | prioritized |

Note: <100 visitors/week — experiments run as qualitative/manual checks (heuristic evaluation, observation) rather than powered A/B tests. Pre-committed metric per card required before promotion.