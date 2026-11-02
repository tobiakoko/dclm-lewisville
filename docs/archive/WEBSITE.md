# Website

## Sitemap
- / — Home
- /about — Story, beliefs, leadership
- /ministries — Ministry directory (subpages: women, children, youth, young-adults, men, music)
- /events — Events calendar + newsletter
- /sermons — Sermon library (detail pages exist but are unreachable from list)
- /give — Giving options + FAQ
- /contact — Locations, contact form, prayer requests
- /ministers — Leadership team
- Missing / broken: /new-here (referenced, doesn't exist), /privacy (404), /terms (404)

## Page Briefs
### / (home)
- Purpose & primary conversion action: **Plan a visit** — ONE action = first-time visitor inquiries via /contact
- Message (from POSITIONING.md): not yet defined (Phase 5)
- CTA (direct + transitional): Direct "Plan Your Visit" → /contact; transitional "New Here?" → /about
- Copy blocks: hero carousel (5 slides — to be cut to ONE CTA), service times, core values, pastor welcome, ministries preview, testimonies, verse

## Conversion Elements
| Objection (Big 5) | Counter | Placement | Status |
|---|---|---|---|
| Trust — "Is this a real church?" | Pastor bio + photo, church history, Google reviews | Hero/first fold | backlog |
| Price — "Will I be hit up for money?" | "No pressure to give" welcome line; working /give | /give + first-visit flow | backlog |
| Fit — "Will my family fit in?" | Children/youth ministries, "never lost in the crowd" copy | /ministries, welcome copy | present (buried) |
| Timing — "When can I come?" | Single consistent service-times block, directions | Footer + every page | broken (4 conflicting sets) |
| Effort — "What happens when I arrive?" | What-to-expect: parking, nursery, first visit | /new-here flow (missing) | backlog |

## Audit Findings
| Issue | Severity (0-4) | Fix | Status |
|---|---|---|---|
| Conflicting service times across 4 surfaces (footer, QuickInfo, events, contact) | 4 | Single source of truth; consistent display everywhere | backlog |
| 5 competing hero CTAs (carousel) | 4 | Hero leads with ONE CTA: Plan Your Visit | backlog |
| /give buttons dead; no giving platform link anywhere | 4 | Wire to giving platform or remove header CTA | backlog |
| Sermon list cards not linked to /sermons/[slug]; Watch Now/Notes/search inert | 3 | Link cards; wire controls or hide | backlog |
| Events page: calendar, Register Now, Load More, newsletter form inert | 3 | Wire Register Now → /contact; remove dead controls | backlog |
| "Ask for Prayer" dead button on /contact | 3 | Wire to contact form (prayer subject) | backlog |
| No trust proof above the fold | 3 | Google reviews + pastor welcome | backlog |
| Sermon detail placeholder: rickroll video, audio href="#", "Related sermons" placeholder box | 3 | Replace with real Sanity content or hide | backlog |
| Footer /privacy and /terms are 404s | 2 | Create pages or remove links | backlog |
| Ministries "Contact Leaders" links to /about | 2 | Fix href to /contact | backlog |
| Conflicting/absent contact emails in fallback team & ministry data | 2 | Fill from Sanity or remove mailto | backlog |
| Hero images bypass next/image — raw 1920px Unsplash JPEGs, all 4 slides upfront, 1.36MB (78% of payload); LCP 5.8s | 4 | next/image (avif/webp, w≤1600), priority + eager on slide 1, lazy others | now (owner: build agent) |

## Lead Capture
Scorecard/quiz funnel design: none exists. Candidate (deferred): "What kind of church are you looking for?" quiz → personalized first-visit plan. Needs Phase 1 evidence/analytics before building.