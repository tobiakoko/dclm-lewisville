# Improve Website Plan

## Context
- Date started: 2026-08-14
- Site: Deeper Life Bible Church Lewisville — https://dclm-lewisville.vercel.app/
- Stack: Next.js 14, Sanity CMS, Tailwind CSS, deployed on Vercel
- Intake answers:
  1. ONE action: **Visit a service in person** (homepage/contact should drive first-time visits)
  2. Conversion problem: "Just feels off" — no analytics, no hard evidence
  3. Visitor input: informal feedback only (no surveys/reviews/recordings)
  4. Traffic: very low (<100 visitors/week) → A/B testing cannot reach significance; lean on qualitative + heuristic evidence
  5. Top complaint: no clear complaints voiced
  6. Brand docs: none (no POSITIONING.md, style guide, or brand assets beyond logo)
  7. Assets: live URL available for inspection; local codebase fully accessible
- Consequences for the journey: low traffic means EXPERIMENTS.md entries are designed as qualitative/manual checks or long-horizon observations rather than powered A/B tests. Phase 1 (GATE) runs on code + heuristic evidence, with assumptions flagged for future validation when analytics exist.

## Phase Status
| Phase | Skill | Status | Artifact | Date |
|---|---|---|---|---|
| 1 | cro-methodology | done | METRICS.md, WEBSITE.md, EXPERIMENTS.md | 2026-08-14 |
| 2 | ux-heuristics | done | DESIGN.md, EXPERIMENTS.md | 2026-08-14 |
| 3 | refactoring-ui | done | DESIGN.md, EXPERIMENTS.md | 2026-08-14 |
| 4 | web-typography | done | DESIGN.md, EXPERIMENTS.md | 2026-08-14 |
| 5 | storybrand-messaging | done | POSITIONING.md, EXPERIMENTS.md | 2026-08-14 |
| 6 | high-perf-browser | done | METRICS.md, WEBSITE.md, EXPERIMENTS.md | 2026-08-14 |
| 7 | made-to-stick | done | POSITIONING.md, EXPERIMENTS.md | 2026-08-14 |
| 8 | design-everyday-things | done | DESIGN.md, EXPERIMENTS.md | 2026-08-14 |

Statuses: pending · in-progress · awaiting-evidence · done · deferred: <reason> · skipped: <reason>

## Key Decisions
| Date | Phase | Decision | Rationale |
|---|---|---|---|
| 2026-08-14 | Intake | ONE action = visit a service in person | Every CTA that competes with "come on Sunday" is a candidate to cut or subordinate |
| 2026-08-14 | Intake | No analytics, very low traffic → qualitative + heuristic evidence | A/B tests can't reach significance; diagnosis leans on heuristic + code review |
| 2026-08-14 | 1 | Home hero cut to ONE CTA: "Plan Your Visit" | 5 competing CTAs = no single action (Quick Diagnostic row 1 fail) |
| 2026-08-14 | 1 | Attack visit path AND giving path in parallel | Both are severity-4 blocked arteries; giving is the header CTA |
| 2026-08-14 | 1 | Accept qualitative + heuristic evidence for this journey | <100 visitors/week; no analytics installed |
| 2026-08-14 | 2 | UX score 2/10 (core tasks blocked). Fix all sev-4 + sev-3 now (owner: build agent) | User approved shipping severity-ordered fixes; fixes run by severity, not ease |
| 2026-08-14 | 2 | Trunk Test: search accepted as missing (small site) | Re-evaluate at scale; breadcrumbs added instead |
| 2026-08-14 | 3 | Consolidate tokens: one red, one navy, gold accent, tinted grays | Current system has near-duplicate reds/navys, 4 gray families, dead tokens |
| 2026-08-14 | 3 | Grayscale hierarchy + palette consolidation in the same pass | User chose to run both together (color-last rule relaxed by decision) |
| 2026-08-14 | 4 | Keep Inter + Playfair pairing; slim weights; <100KB via next/font | Pairing matches skill's recommended serif+sans; payload currently 3 families/14 weights |
| 2026-08-14 | 5 | One-liner: "…a church home where they're known by name — not lost in the crowd." | Passes cocktail-party test; reuses site's existing language |
| 2026-08-14 | 5 | Internal problem to name: fit-in anxiety ("I'm not sure I'd fit in") | SB7: most brands miss the internal problem; this drives the visit decision |
| 2026-08-14 | 6 | Baselines from live Lighthouse: LCP 5.8s, CLS 0, TTFB 30ms, fonts 87KB | Real data collected 2026-08-14; only LCP/FCP fail |
| 2026-08-14 | 6 | Ship hero image fix only (next/image, priority slide 1) | The single real lever; unused-JS trim logged to backlog |
| 2026-08-14 | 7 | Commander's Intent: "Grow in faith" (user choice); visit = action, known-by-name = hook | User overrode recommendation; reconciled in copy |
| 2026-08-14 | 7 | Use drafted concrete rewrites (hero sub, stat, trimmed testimony, halved welcome) | SUCCESs sum 35-42/60 per message |
| 2026-08-14 | 8 | Constraint-first: remove/hide inert controls until wired | Norman: constraints beat error messages |
| 2026-08-14 | 8 | Undo rule logged for future; no destructive flows exist today | Future destructive actions get undo, never confirm dialogs |

## Next Actions
- [x] Confirm phase plan with user (owner: user, due: intake session) — done 2026-08-14
- [x] Phase 1: map funnel, set ONE action per page, build O/CO table, ICE-ranked backlog (owner: build agent, due: on approval) — done 2026-08-14
- [x] Phase 2: run ux-heuristics on visit path + give path (owner: build agent, due: next phase) — done 2026-08-14
- [x] Phase 3: refactoring-ui — grayscale hierarchy, spacing scale, ONE primary CTA, tokens (owner: build agent, due: next phase) — done 2026-08-14
- [x] Phase 4: web-typography — body size, measure, line height, scale, font loading (owner: build agent, due: next phase) — done 2026-08-14
- [x] Phase 5: storybrand-messaging — above-the-fold rewrites, one-liner, BrandScript (owner: build agent, due: next phase) — done 2026-08-14
- [x] Phase 6: high-perf-browser — CWV baselines, LCP/CLS/INP fixes (owner: build agent, due: next phase) — done 2026-08-14
- [x] Phase 7: made-to-stick — SUCCESs scoring, Commander's Intent, concrete rewrites (owner: build agent, due: next phase) — done 2026-08-14
- [x] Phase 8: design-everyday-things — signifiers, constraints, feedback on conversion flows (owner: build agent, due: next phase) — done 2026-08-14
- [x] Exit checklist: every phase done/skipped; artifacts carry fixes with owner+priority; high-ICE changes designed as tests; ONE action unambiguous (owner: build agent, due: on phase close) — done 2026-08-14, EXP-001..004 promoted to Experiment Cards
- [ ] Implementation: ship the "now (owner: build agent)" fixes in code — hero ONE CTA + times truth, hero images via next/image, constraint-first controls pass, token consolidation, copy rewrites (owner: build agent, due: next session) — **SHIPPED 2026-08-14** (see Implementation Log below)

## Implementation Log (2026-08-14)
- **Service times single source of truth**: `lib/constants.ts` `SERVICE_TIMES` now canonical (4 entries incl. Sunday 9:40 AM Search The Scriptures). Footer, QuickInfo, events page, contact page (Lewisville campus) all render from it. Denton campus keeps its own hours (Sunday 9:30, Thursday 7:00 PM) — flag for real-hours confirmation.
- **Hero**: `HERO_SLIDES` reduced to ONE slide with SB7 copy ("Find a church family that knows your name" / concrete 9:30 AM sub). `HeroCarouselNew.tsx` rewritten as a static server component — `next/image` fill + priority (EXP-002), ONE CTA "Plan Your Visit" → /contact + transitional "New here? Read what we believe" → /about (EXP-001, EXP-004). Carousel/embla/indicators removed.
- **Constraint-first (Phase 8)**: events page — removed dead month calendar widget, view toggle, Load More, newsletter form (replaced with honest "Come Visit Us" CTA + directions); non-featured event buttons relabeled "Contact Us to Register". Sermons page — removed search form/filters, grid-list toggle, play overlays, Watch Now/Notes/Load More; cards link to /sermons/[slug]. Contact page — "Ask for Prayer" now scrolls to the working contact form. Give page: intentionally left as-is (user decision, no platform URL).
- **Contact form feedback**: success "Message sent. We'll reply within 24 hours."; error message offers info@deeperlifelewisville.org; 429 → "You've sent several messages recently…" (new rate-limited state).
- **Href/label fixes**: ministries "Contact Leaders" → /contact; not-found "Explore" → "Visit Us" → /contact; event "Learn More" → "Contact Us to Register".
- **Tokens (Phase 3)**: `--primary` remapped to `var(--church-red)`; `--secondary` remapped to `var(--church-navy)`; deleted `--brand-navy`, `--church-blue`, Cinzel/Great Vibes (`--font-cinzel`, `--font-script`), dead `.btn-*`/`.section-*`/`.hero-gradient` classes; `--font-heading` now Inter. Welcome.tsx: broken `text-church_blue` ×4 → `text-(--church-navy)`, `bg-church_bg` → `bg-(--church-bg)`.
- **Fonts (Phase 4)**: Google Fonts `<link>` replaced with `next/font/google` — Inter 400/500/600/700 + Playfair Display 400/600/700, latin, swap, self-hosted (Poppins dropped).
- **Typography measure**: sermons/[slug] transcript `prose max-w-none` → `max-w-3xl`.
- **Copy (Phase 7)**: welcome letter halved (3 paragraphs, empathy-first, authority line kept); testimony trimmed to ~70 words.
- **Verify**: `npm run lint` 0 errors, `npm run type-check` clean, `npm run build` all 16 routes OK.
- **DCLM HQ video embed**: /sermons gains "Latest from DCLM HQ" section — live uploads playlist embed of @DCLMHQ (channel UC4zsqN5YdXfxkkdVvwNA3JA, `youtube.com/embed/videoseries?list=UU4zsqN5YdXfxkkdVvwNA3JA`) so the newest message always appears; lazy-loaded, titled, with "Subscribe on YouTube" link. Verified: lint/type-check/build clean.
