# Build plan: Lewisville website rebuild

Work through the phases in order. Each phase has its own branch and pull request and ends at a gate; don't start the next phase until the gate holds. Tick boxes as tasks merge. Words and facts come from `SITE-CONTENT.md`; visuals from `DESIGN-SYSTEM.md`.

Baseline (audit of 1 November 2026, commit `18c17f1`): Next 16.3.1, React 19.2.0, Sanity 4.22, 65 npm advisories (3 critical), test coverage 11.69%, CI testing Node 18 and 20.

## Phase 0: Orientation (first session; no app code changes)

- [x] 0.1 Read `CLAUDE.md` and all three files in `docs/build/`. Run `npm ci`, `npm run type-check`, `npm run lint`, `npm test`, `npm run build`. Record results, `npm audit` counts and `npm outdated` in `docs/build/BASELINE.md`.
- [x] 0.2 Build an import map: which files in `components/`, `hooks/` and `lib/` are reachable from `app/` routes and `sanity/`. Save the unreachable list to `docs/build/IMPORT-MAP.md`. About 50 files are expected to be dead, including most of `components/sections/` and `components/pro-blocks/`.
- [x] 0.3 Check the remote branches. `feature/cms-page-builder-architecture` is one commit ahead of `main` (a Sanity page-builder). The `claude/*` and `develop` branches are already merged. Summarize anything useful from the page-builder commit for Phase 3, but don't merge it.
- [ ] 0.4 Stop and report the baseline, the import map and any surprises to the owner.

## Phase 1: Foundation and trust fixes (branch `rebuild/phase-1-trust`)

Goal: nothing on the site is wrong, fake or dead. No visual redesign yet.

- [x] 1.0 **E2E baseline.** Run the Playwright suite before changing anything and record which tests fail or skip in `BASELINE.md`.
- [x] 1.1 **CI.** Test on Node 22.x and 24.x with `fail-fast: false`; drop 18 and 20. Steps: `npm ci`, type-check, lint, unit tests, build; Playwright on 22.x. Merge the two `overrides` keys in `package.json` into one. Move `prettier` to `devDependencies`, bump `@types/node` to 24, add `.nvmrc` (`24`) and `"engines": { "node": ">=22.12 <25" }`, and update `CLAUDE.md` to say Node 24 locally.
- [x] 1.1a **Audit fix.** Run `npm audit fix` (no `--force`) and record what remains in `BASELINE.md`, noting for each remaining Sanity high advisory whether it affects the running `/studio` route or only build tooling. Flag any that are reachable at runtime.
- [ ] 1.2 **Docs.** Move `docs/DESIGN.md`, `docs/IMPROVE-WEBSITE-PLAN.md`, `docs/WEBSITE.md`, `docs/METRICS.md` and `docs/EXPERIMENTS.md` to `docs/archive/`. Keep `docs/POSITIONING.md`. Rewrite the README: Next.js 16, Node 22+, commands, environment variables, link to `docs/build/`.
- [ ] 1.3 **Facts in one place.** Update `lib/constants.ts` to `SITE-CONTENT.md` sections 1–2: phone (469) 939-6994, URL `https://deeperlifelewisville.org`, email, office hours, YouTube links, Facebook/Instagram `null` (icons hidden), Zoom placeholder, other locations. Replace `SERVICE_TIMES` with a typed schedule:
  ```ts
  type ServiceMode = 'in-person' | 'online' | 'both'
  interface ServiceTime { id: string; name: string; day: 'Sunday' | 'Monday' | 'Tuesday' | 'Friday'; start: string; end: string | null; mode: ServiceMode; description: string; joinUrl: string | null }
  ```
  Sunday Worship 9:30–12:00 (in person and on YouTube), Sunday prayer 9:00, before the service, end time not given (online), Monday Prayer Meeting 19:00–20:00 (online), Tuesday Bible Study 19:00–21:00 (both), Friday Revival Hour 19:00–21:00 (both). Then grep for and remove every other hard-coded fact: `665-9972`, `dclmlewisville`, `123 Church Street`, `123-456-7890`, `Revival Service`, `@dclmlewisville`. Add a unit test that fails if any of those strings reappear in `app/`, `components/` or `lib/`.
- [ ] 1.4 **Routing and status codes.** Delete the duplicate `app/page.tsx` (keep `app/(site)/page.tsx`). Move or remove the root `app/loading.tsx` so not-found pages return HTTP 404. In `sermons/[slug]` and `ministries/[slug]`, `await params`, delete `PLACEHOLDER_SERMON` and any fallback data, and call `notFound()` for unknown slugs. Fix the ministry page crash (render `leader->bio` with PortableText, select `fullDescription`). Add e2e tests asserting a 404 status for a made-up sermon and ministry URL.
- [ ] 1.5 **Contact API.** Model outcomes as one union mapped to HTTP status: success 200, validation 400, forbidden origin 403, rate-limited 429, provider error 502, not configured 503. Read Resend's `{ data, error }`; never report success when email wasn't sent. On failure the form shows an error with the phone number. Recipient comes from a new env var `CONTACT_INBOX` (production: info@deeperlifelewisville.org; `lib/env.ts` must reject that address outside production so previews never email the church). Subject prefixes: `New visitor:`, `Prayer request:`, `Ministry: <name> –`, `Contact:`. One shared Zod schema; name rule `/^[\p{L}\p{M}\s.'-]+$/u`. Never log message bodies. Unit-test every outcome.
- [ ] 1.6 **Newsletter.** Not in scope for launch (no sender, broken confirm flow). Remove the form, `app/api/newsletter`, its tests and env vars. Add "Newsletter (optional, later)" to the Still-missing list.
- [ ] 1.7 **Events.** Remove the hard-coded January–April 2026 events. Render the weekly schedule from `SERVICE_TIMES` and the empty-state sentence from `SITE-CONTENT.md` §9. Unit-test that no past event renders as upcoming.
- [ ] 1.8 **Give.** Remove the FAQ and dead buttons, plus every claim about PCI compliance, statements or designated funds. Show the three ways to give, each with "Information will be provided shortly."
- [ ] 1.9 **Footer.** Remove links to routes that don't exist yet (`/privacy`, `/terms`, `/sitemap`) until Phase 2 creates them. Render social icons only for configured links.
- [ ] 1.10 **Metadata and JSON-LD.** Build structured data (`@type: Church`) from `SITE_CONFIG`: name, address, telephone, url, logo (`/dclm_logo.png`), `sameAs` (YouTube). Change the title template to `%s | Deeper Life Bible Church Lewisville` (it currently uses "DCLM Lewisville").
- [ ] 1.11 **Placeholder and misleading media.** Remove YouTube `dQw4w9WgXcQ`, "Pastor John Doe" and the hard-coded sermon list, `#` audio links, the stock hero and every `lh3.googleusercontent.com/aida-public` image. Use photos from `app/assets/` with truthful alt text. Until Phase 2, the Sermons page shows the "Next live" line and the YouTube channel link from `SITE-CONTENT.md` §7.
- [ ] 1.12 **Copied text.** Remove the duplicate welcome sections (`Welcome.tsx`, `PastorsWelcome.tsx` copy reused from DLBC New Jersey) and keep one Pastor's Welcome with the verbatim text from `SITE-CONTENT.md` §3. Remove the "6 Active Groups / Weekly Gatherings" banner and the personal Gmail address on Young Adults.
- [ ] 1.13 **Sanity client.** Use `perspective: 'published'`, a pinned API version, and no `'placeholder'` project ID fallback in production.
- [ ] 1.14 **Dead code.** Delete the unreachable files from `IMPORT-MAP.md` and dependencies used only by them (expected: `gsap`, `@gsap/react`, `react-h5-audio-player`, `sonner`, `next-themes`, possibly `styled-components` and some Radix packages). Confirm each with a search before removing. Keep `@radix-ui/react-accordion` and `@radix-ui/react-label` (Phase 2 needs them) and `styled-components` (Sanity peer). Delete `ui/badge.tsx` and `ui/card.tsx` with their tests. Remove `date-fns`.
- [ ] 1.14a **Lint.** Fix the remaining warnings and set `npm run lint` to `--max-warnings 0`.
- [ ] 1.15 **Dependencies.** Apply non-breaking updates (Next 16 latest minor, React 19 minor, Zod, Tailwind, Resend) and `npm audit fix` without `--force`. No Sanity major upgrade yet (Phase 3). Record remaining advisories.

**Gate 1:** CI green on Node 22 and 24. A made-up sermon or ministry URL returns 404. A contact test message arrives in the test inbox; with email unconfigured the form shows an error and the phone number. No past event shows as upcoming. No `#` links, placeholder media or invented content anywhere. Footer, Contact page and JSON-LD show the same name, address, phone and email.

## Phase 2: Design system and pages (branch `rebuild/phase-2-pages`)

- [ ] 2.1 **Tokens and fonts** per `DESIGN-SYSTEM.md`. Remove old color tokens and classes, and the global `overflow-x: hidden`. Add a dev-only names test page (excluded from the sitemap and robots).
- [ ] 2.2 **Core components** from the design-system table, each with a unit test and keyboard behavior.
- [ ] 2.3 **Header and navigation.** Emblem plus "Deeper Life Bible Church · Lewisville"; Visit, About, Ministries, Sermons, Events, Contact and a Give button. Mobile drawer with Radix Dialog. Move the DCLM Resources links (Blog, Radio, Tracts, Daily Manna, etc.) to the footer.
- [ ] 2.4 **Footer** per the design system, with Privacy and Terms links once 2.13 exists.
- [ ] 2.5 **Home** (`SITE-CONTENT.md` §3), in this order: (1) hero with church name, "Lewisville, TX", "Sundays 9:30 AM", address, primary button Plan your visit, secondary Watch online, link What we believe; (2) service-times strip, visible on phones; (3) What to expect, four short cards; (4) Pastor's Welcome (verbatim); (5) latest message (same logic as 2.9); (6) testimony (Bro K); (7) The Bible Verse We Live By (Jude 1:3); (8) ministries preview. Acceptance: on a 390 px phone the name, city, Sunday time and Plan your visit show without scrolling.
- [ ] 2.6 **Plan Your Visit** `/visit` (§4): service times with modes and join links, parking and arrival, what happens, what to wear, kids and families, watch first, after your visit, a map with a directions link, and the "Let us know you're coming" form (name, email, optional phone, planned date, number of adults and children, message) sending `New visitor: [name], [date]`. Leave out "When you arrive" and "Accessibility". Add "Plan your visit" as the primary action across the site.
- [ ] 2.7 **About** `/about` (§5): Who we are; mission and vision (four parts); What we believe as doctrine cards that expand to the full verbatim text; Leadership with three cards and Read more. Redirect `/ministers` to `/about#leadership` (308).
- [ ] 2.8 **Ministries** `/ministries` (§6): one card per ministry with a "Send us a message" action (`/contact?topic=<ministry>`); an Outreach section with its five areas, including the 911/988 line on Counseling. Keep `/ministries/[slug]` only for ministries with enough content; otherwise redirect to the anchor on `/ministries`.
- [ ] 2.9 **Sermons** `/sermons` (§7): top slot with three states (live now; latest Lewisville service; latest DCLM HQ message, labeled). Get the latest Lewisville uploads from the channel's public RSS feed (`https://www.youtube.com/feeds/videos.xml?channel_id=…`, revalidated every 30 minutes) and detect live with the channel's `live_stream` embed. Ask the owner for the channel ID if you can't confirm it. Don't add API keys without asking. Use the lite YouTube facade.
- [ ] 2.10 **Contact and Prayer** `/contact` (§8): phone, email, address with map, office hours shown first; contact form; a prayer form (subject `Prayer request:`) with a line saying requests go to the pastor, plus a link to the DCLM Prayer Request Hub; "Our other locations" (Denton, Dallas). Contact and Prayer links appear in the same place on every page.
- [ ] 2.11 **Events** `/events` (§9): weekly services with mode badges and Central Time; special events section with the honest empty state.
- [ ] 2.12 **Give** `/give` (§10): three ways to give with the placeholder text; nothing else.
- [ ] 2.13 **Privacy and Terms** pages (§11) with a "Last updated" date; add them to the footer, `sitemap.ts` and `robots.ts`, all using `SITE_CONFIG.url`.
- [ ] 2.14 **SEO.** A unique title and description per page (pattern "Plan Your Visit | Deeper Life Bible Church Lewisville"); an Open Graph image (1200×630, a real photo plus the emblem); JSON-LD on every page from one helper.
- [ ] 2.15 **CSP** in `proxy.ts`: allow only what's needed for YouTube (nocookie) frames, the Google Maps embed and analytics. Remove `images.unsplash.com` and `lh3.googleusercontent.com` once unused.
- [ ] 2.16 **Analytics.** Keep Vercel Analytics. Load Google Analytics only in production with a valid ID; ask the owner whether to keep GA and whether a consent banner is wanted.

**Gate 2:** every page passes axe with zero serious or critical violations; a keyboard-only walk-through works on every page; no horizontal scroll at 320 px; Core Web Vitals within budget on a mid-range phone profile; e2e tests cover each page and its main action; all copy matches `SITE-CONTENT.md`.

## Phase 3: CMS wiring and handover (branch `rebuild/phase-3-cms`)

- [ ] 3.0 **Ask the owner** to choose the rendering mode: (a) keep the per-request CSP nonce, so every page stays dynamic; or (b, recommended) a hash-based or simpler CSP with cached pages refreshed by `revalidateTag` from the Sanity webhook.
- [ ] 3.1 **Upgrade** Sanity 4 → 6 and next-sanity → 13 (needs Node 22.12+; target Node 24) in one PR behind green tests. Add Sanity TypeGen and use generated types for every query.
- [ ] 3.2 **Content model.** Singletons: `siteSettings` (all branch facts, weekly schedule with mode and join link, schedule exceptions, social links, office hours, other locations), `homePage`, `visitPage`, `aboutPage`, `givePage`, `legalPages`. Documents: `person` (name, title, short bio, full bio, photo, order), `ministry` (name, slug, audience, summary, how to join, optional contact and meeting info), `outreachArea`, `doctrine` (title, body, references, order), `event` (start and end date-time, location, mode, optional registration link), `sermon` (title, speaker, date, YouTube ID, source `lewisville` | `hq`), `testimonial` (name, content, source URL). Hide Studio screens nothing reads. Never let schema changes drop existing data.
- [ ] 3.3 **Seed script** `scripts/seed-sanity.ts`: loads `lib/constants.ts` and the content data, runs with a write token supplied at run time (never committed), and is idempotent. Add a test that the seeded doctrine and bio text equals the verbatim source exactly.
- [ ] 3.4 **Wire every page** to Sanity. After this, `lib/constants.ts` is seed data and development fallback only; production renders an error, not fallback content, if Sanity fails.
- [ ] 3.5 **Revalidation webhook:** a map from schema type to tags and paths; secret in a header only; tests.
- [ ] 3.6 **Handover:** `docs/RUNBOOK.md` (change a service time, add an event, post a sermon, update giving details, add a testimony), a 30-minute staff training outline, and the README. Account transfer is an owner task: church GitHub organization, Vercel team, Sanity project, registrar, each with two administrators and 2FA.

**Gate 3:** a staff member changes a service time in the Studio and sees it on Home, Visit, Contact, Events, the footer and the JSON-LD.

## Launch checklist (owner and developer)

- [ ] Leadership has approved `SITE-CONTENT.md`, and the Still-missing items are filled or deliberately hidden
- [ ] Privacy Policy and Terms reviewed by someone with legal knowledge; effective date set
- [ ] All gates above hold on the production build
- [ ] Five people new to the site each find the next service, the address, parking, children's arrangements and a sermon in about 30 seconds
- [ ] The old Wix site on deeperlifelewisville.org is archived before DNS changes; the Google Workspace MX records are kept; `NEXT_PUBLIC_SITE_URL` is set
- [ ] Google Business Profile shows the same name, address, phone (469) 939-6994 and website
- [ ] Hosting plan suits church use (Vercel Hobby is personal and non-commercial; Pro is per seat)
