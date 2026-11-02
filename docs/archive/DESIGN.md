# Design System

## Design Direction
_Reserved for Phase 3 (refactoring-ui) / optional top-design phase._

## Typography
- Typefaces: Inter (body/UI, weights 400/500/600/700), Playfair Display (headings, 400/600/700). Drop Poppins, Cinzel, Great Vibes (declared, unused).
- Scale: keep current modular scale (~1.25 ratio — base 16 → 20 → 24 → 30 → 36 → 48 → 60); fluid `clamp()` for display sizes
- Measure: cap body copy at 65-70ch (`max-w-prose`); fix `prose max-w-none` on /sermons/[slug] (currently uncapped)
- Line height: body 1.6-1.7 (keep); headings 1.05-1.25 (keep)
- Loading: `next/font` self-hosted with `display: swap`, latin subset, preload Inter; target <100KB total payload (14 files → ~7)

## Tokens
- Spacing scale: 8px grid confirmed (4/8/16/24/32/48/64; 96/128 via `space-unit-*`) — keep
- Radius: 8px (0.5rem) confirmed — keep
- Shadows: elevation 1-5 scale confirmed — keep
- Palette (consolidated, Phase 3):
  - Primary red: single `#C8102E` (remap `--primary` from #B91C1C; drop second red)
  - Navy: single `#0A1D37` (drop `--secondary` #0F172A and `--brand-navy` #0a192f)
  - Gold accent: `#C5A059` — navy backgrounds only (fails as text on white)
  - Grays: cool-tinted scale; replace mixed gray/slate/zinc/neutral usage with one family
  - Contrast fixes: footer `text-zinc-400` on navy → `text-white/70`; `text-yellow-500` on navy → gold or white
- Fonts: keep Inter (body) + Playfair Display (headings) only; remove unused Cinzel and Great Vibes declarations
- Cleanup: delete dead `btn-faith/hope/love/urgency` + `section-faith/hope/light` classes; remove duplicate `.hero-gradient` (second definition wins); fix `text-church_blue` (unmapped → use `text-(--church-navy)`)

## Components
| Component | Decision | Status |
|---|---|---|
| Button | One primary (red pill), one secondary (navy pill), one text link — remove 4+ competing treatments | now (owner: build agent) |
| Hero | Single CTA "Plan Your Visit"; secondary CTAs subordinate (Phase 2) | now (owner: build agent) |
| Section headings | Eyebrow + serif title; size scale differentiates levels; stop bold-on-everything | now (owner: build agent) |
| Footer links | `text-zinc-400` → `text-white/70` (AA) | now (owner: build agent) |
| Welcome section | Fix broken `text-church_blue` → `text-(--church-navy)` | now (owner: build agent) |

## UX Audit Findings
| Issue | Heuristic | Severity (0-4) | Fix | Status |
|---|---|---|---|---|
| Give page: all CTAs dead, no giving platform | H1 System status | 4 | Wire to platform or hide until live | now (owner: build agent) |
| 4 conflicting service-time sets (footer, QuickInfo, events, contact) | H4 Consistency | 4 | Single source of truth in constants; render everywhere | now (owner: build agent) |
| 5 competing hero CTAs | H8 Minimalist | 4 | ONE CTA: Plan Your Visit; subordinate others | now (owner: build agent) |
| Inert controls (events calendar/Register/Load More, sermons search/Watch Now/Load More, Ask for Prayer, newsletter form) | H1 System status | 3 | Wire or remove | now (owner: build agent) |
| Sermon cards on /sermons not linked to detail pages | H4 Consistency | 3 | Link cards to /sermons/[slug] | now (owner: build agent) |
| No search anywhere | H7 Efficiency | 3 | Accepted for small site; re-evaluate at scale | backlog |
| No "what to expect" help for first-timers | H10 Help | 3 | New-here flow (Phase 1 ICE 6.7) | backlog |
| "Contact Leaders" → /about; event "Learn More" → /contact (ambiguous) | H2 Real world | 2 | Fix hrefs; specific labels | now (owner: build agent) |
| Sermon card icon-only actions (headphones/file) | H6 Recognition | 2 | Label or remove | backlog |
| Wall-of-text welcome copy + unbroken testimony paragraph | H8 Minimalist | 2 | Cut half the words | backlog |
| not-found: "Go Home" and "Explore" both → / | H3 Control | 2 | Distinct destinations | backlog |
| Fallback team/ministry data missing emails → mailto disappears | H4 Consistency | 2 | Fill or remove | backlog |
| Contact form generic error | H9 Errors | 1 | Specific message + retry hint | backlog |
| False affordances — dead controls look clickable (give, events calendar, sermons, Ask for Prayer) | Norman gulf of execution | 4 | Wire or remove (constraint-first; overlaps Phase 2 sev-4/3) | now (owner: build agent) |
| Newsletter form silent failure | Gulf of evaluation | 3 | Remove until wired | now (owner: build agent) |
| Contact form error generic, no alternative path | Error recovery | 2 | "We couldn't send your message… or email info@deeperlifelewisville.org" | now (owner: build agent) |
| No rate-limit-aware message | Error recovery | 2 | "You've sent several messages recently…" | now (owner: build agent) |
| Contact success lacks "what next" | Feedback | 1 | "Message sent. We'll reply within 24 hours." | now (owner: build agent) |
| Destructive flows: none exist | — | 0 | Rule logged: future destructive actions get undo, never confirm dialogs | log |

## Microinteraction Inventory
| Interaction | Trigger/Rules/Feedback | Fix | Status |
|---|---|---|---|
| Contact form submit | Button → "Sending…" (disabled) → success message + reset / inline error | Keep 0.1s feedback; rewrite messages (Phase 8) | now (owner: build agent) |

## Microinteraction Inventory
_Reserved for Phase 8 (design-everyday-things).