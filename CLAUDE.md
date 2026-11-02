# CLAUDE.md: Deeper Life Bible Church Lewisville website

You are building the public website for **Deeper Life Bible Church Lewisville** (1368 W Main St, Lewisville, TX 75067), a local congregation of Deeper Christian Life Ministry (DCLM). The repository already contains a Next.js + Sanity site that is being rebuilt in phases. Read this file at the start of every session, then the document that covers the area you are about to touch.

## Read these first

| File | Use it for |
| --- | --- |
| `docs/build/BUILD-PLAN.md` | What to build, in what order, and when each phase is done. **Start here.** |
| `docs/build/SITE-CONTENT.md` | Every word and fact on the site. Source of truth for copy. |
| `docs/build/DESIGN-SYSTEM.md` | Colors, fonts, components, accessibility and performance rules. |
| `docs/POSITIONING.md` | Voice and the visitor we are writing for. Still valid. |

Superseded, so don't follow them where they conflict: `docs/DESIGN.md` (gold accent, Inter and Playfair), `docs/IMPROVE-WEBSITE-PLAN.md`, `docs/WEBSITE.md`, `docs/METRICS.md`, `docs/EXPERIMENTS.md`, and the README's references to Next.js 14 and Node 18. Phase 1 moves them to `docs/archive/`.

When documents disagree: `SITE-CONTENT.md` wins for words and facts, `DESIGN-SYSTEM.md` for visuals, `BUILD-PLAN.md` for scope and order. If it's still unclear, ask.

## Who the site is for

First-time visitors, mostly on phones, deciding whether to come on Sunday. Within about 30 seconds they must find who we are, where we are, when we meet, what we believe, what to expect, how to watch or listen, and how to get in touch (DCLM Global Tech Training). The three main actions everywhere: **Plan your visit**, **Learn about us**, **Watch online**. Members come second: times, events, giving.

The same codebase should later serve other Deeper Life branches, so branch facts are data, never code.

## Rules you must not break

1. **Never invent church facts.** No made-up times, names, phone numbers, addresses, statistics, quotes, testimonies, sermons, events, photos or links. If something is missing, use the placeholder given in `SITE-CONTENT.md` or hide the element, add a `TODO(content):` comment, and make sure it's in the "Still missing" list. Never ship lorem ipsum, "John Doe", sample YouTube IDs, `#` links, or stock or AI images presented as the church.
2. **Verbatim content stays verbatim.** Text between `<!-- VERBATIM START -->` and `<!-- VERBATIM END -->` (the 22 doctrines, the Pastor's Welcome, and the bios of Pastor Thompson Aderemi and Pastor Joseph Agbo) is published exactly as written. Don't correct spelling (British spellings are intentional), punctuation or scripture references, even if they look wrong. Don't summarize them in your own words.
3. **One source for every fact.** Name, address, phone, email, URL, schedule, links and other locations live in `lib/constants.ts` (Phases 1–2), then in the Sanity `siteSettings` singleton (Phase 3). No component, metadata, JSON-LD, email template or test may hard-code a fact.
4. **Domain and email.** The domain is `deeperlifelewisville.org`; replace every `dclmlewisville.org`. All form email goes to `info@deeperlifelewisville.org` in production, and never to that inbox from development or preview.
5. **Honest states.** A form that fails says so and shows the phone number. Unknown URLs return a real 404. An empty list shows an honest empty state. A CMS error is an error, never fallback or placeholder content.
6. **Accessibility is required: WCAG 2.2 AA.** Keyboard access everywhere, visible focus, nothing on hover only, `prefers-reduced-motion` respected, no autoplaying carousels or video, contrast only from the design tokens.
7. **Privacy.** Never publish members' personal emails or phone numbers. Never log form message bodies or prayer requests. No secrets in the repo; `.env*` files stay untracked.
8. **The church's words are the church's.** If a task needs doctrinal, pastoral or legal wording that isn't in `SITE-CONTENT.md`, stop and ask. Don't write it.
9. **Ask before** adding a dependency (pre-approved: `@fontsource-variable/source-serif-4`, `@fontsource-variable/source-sans-3`), making a schema change that could drop data, removing a public route that may have outside links, or anything involving DNS, hosting, accounts or API keys.

## Stack

- Next.js 16 App Router with React 19; Server Components by default, `'use client'` only for interactivity. TypeScript 5.9 strict; stay on 5.9.
- Tailwind CSS v4 with tokens in `app/globals.css` (`@theme`); Radix primitives and shadcn-style components in `components/ui`.
- Sanity 4 (Studio at `/studio`, schemas in `sanity/schemas`, queries in `lib/sanity/queries.ts`); upgrade to Sanity 6 only in Phase 3.
- Resend (email), Upstash Redis (rate limiting, optional), Zod 4 (validation), `@t3-oss/env-nextjs` (`lib/env.ts`).
- Jest and Testing Library (`__tests__/`), Playwright with `@axe-core/playwright` (`e2e/`).
- Hosting: Vercel. Node 22 locally; target Node 24 LTS in CI and on Vercel.

Next.js 16 reminders: `params` and `searchParams` are Promises, so always `await` them. Request handling lives in `proxy.ts` (the former middleware), which also sets the CSP. Use `next/image`, `next/font` and `next/link`.

## Commands

```bash
npm run dev           # site on http://localhost:3000, Studio on /studio
npm run type-check    # tsc --noEmit
npm run lint
npm test              # Jest unit and integration tests
npm run test:e2e      # Playwright (run npm run playwright:install once)
npm run build
```

Before every commit: `npm run type-check && npm run lint && npm test`. Before finishing a phase, also run `npm run build` and `npm run test:e2e`.

Environment: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL=https://deeperlifelewisville.org`. Real keys come from the owner; never fabricate them. If a key is missing, build the feature so it fails honestly (rule 5) and say what's needed.

## Repo map

- `app/(site)/…` pages; `app/api/contact`, `app/api/newsletter` (to be removed in Phase 1), `app/api/revalidate`; `app/studio` (Sanity Studio)
- `components/layout/` Header and Footer; `components/sections/` page sections, many of them unused; `components/ui/` primitives
- `lib/constants.ts` branch facts and navigation; `lib/sanity/`; `lib/validations/`; `lib/env.ts`
- `sanity/schemas/` content types
- `app/assets/` real congregation and ministry photos, plus portraits of the three leaders
- `public/dclm_logo.png` is the emblem the site uses (and the palette source). `public/Logo.png` is the DCLM heart logo; don't use it as the site logo.

## Known problems to fix, not build on

Found in the 1 November 2026 audit of commit `18c17f1`; `BUILD-PLAN.md` schedules each fix.

- `sermons/[slug]` reads `params.slug` without `await`, and a placeholder sermon (YouTube `dQw4w9WgXcQ`) makes every sermon URL return 200.
- The root `app/loading.tsx` and `await headers()` for the CSP nonce in `app/layout.tsx` make every route dynamic, and 404 pages return 200. `app/page.tsx` duplicates `app/(site)/page.tsx`.
- The contact API returns 200 when Resend is unconfigured and ignores Resend errors. The name rule rejects names like "Adébáyọ̀".
- The newsletter confirm link points to a route that doesn't exist, and no form calls the API.
- The header's Resources menu can't be opened by keyboard; the mobile drawer covers its own close button and stays in the tab order.
- Studio screens for Site Settings, Events, Doctrines and others are never read by the site; the Sanity client has no `perspective` and falls back to a `'placeholder'` project ID.
- The revalidation webhook matches the wrong type name and accepts its secret in the query string.
- Facts are wrong or inconsistent: phone (469) 665-9972 (correct: (469) 939-6994), domain `dclmlewisville.org`, JSON-LD "123 Church Street" and "+1-123-456-7890", page titles using "DCLM Lewisville" instead of the full church name.
- Content that shouldn't be live: four past events shown as upcoming, dead Give buttons and promises, copied DLBC New Jersey welcome text, "Pastor John Doe" sermons, stock and design-tool images, "6 Active Groups" claims, a personal Gmail address.
- The gold accent `#C5A059` fails contrast; `overflow-x: hidden` on the body hides reflow problems.
- About 50 unreachable files and several dependencies used only by them.
- CI tests Node 18 and 20 (Next 16 needs newer); `package.json` has two `overrides` keys; e2e tests skip their assertions with `if (count > 0)`.

## How to work

- Follow `BUILD-PLAN.md` phase by phase. Use one branch per phase (`rebuild/phase-1-trust`, `rebuild/phase-2-pages`, `rebuild/phase-3-cms`), small commits with conventional messages (`fix:`, `feat:`, `refactor:`, `test:`, `docs:`), and one pull request per phase. Never push to `main`.
- Before editing a component, check that something actually imports it. Many files in `components/sections/` are dead.
- Define TypeScript types first for any new data, then build the component.
- Write tests with each change: a unit test for every state of a form, API route or menu; an e2e test with an axe check for every page you touch. Tests must assert; no conditional skips.
- Check every page you change at 375 px and 1280 px wide.
- When a task is done, tick it in `BUILD-PLAN.md`. If you discover missing information, add it to "Still missing" in `SITE-CONTENT.md` and keep going with the placeholder or hidden element.
- Stop and ask the owner at the checkpoints marked in the plan (0.4, 2.16, 3.0) and whenever rules 8 or 9 apply.

## Definition of done (every task)

- Type-check, lint, unit tests and build pass; new behavior has a test.
- Copy matches `SITE-CONTENT.md`; facts come only from the single source; nothing is invented or placeholder-only without a `TODO(content):`.
- Keyboard operable, focus visible, labeled controls, design-token colors only, no horizontal scroll at 320 px.
- Works at 375 px and on desktop.
