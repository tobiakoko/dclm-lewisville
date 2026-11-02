# Deeper Life Bible Church Lewisville website

The public website for Deeper Life Bible Church Lewisville (1368 W Main St, Lewisville, TX 75067), a local congregation of Deeper Christian Life Ministry. Built with Next.js 16, React 19, Sanity and Tailwind CSS v4, hosted on Vercel.

The site is being rebuilt in phases. Start with [`docs/build/BUILD-PLAN.md`](docs/build/BUILD-PLAN.md); [`CLAUDE.md`](CLAUDE.md) has the working rules.

## Requirements

- Node.js 24 LTS (`.nvmrc`). Node 22.12 or later also works; CI tests both.
- npm (the repo uses `package-lock.json`)

## Getting started

```bash
nvm use                      # Node 24
npm ci
cp .env.example .env.local   # then fill in the values below
npm run dev
```

- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio (embedded in the Next.js app)

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Jest unit and integration tests (`__tests__/`) |
| `npm run test:e2e` | Playwright end-to-end and axe checks (`e2e/`); run `npm run playwright:install` once first |

Before every commit: `npm run type-check && npm run lint && npm test`. Before finishing a phase, also run `npm run build` and `npm run test:e2e`.

## Environment variables

Set them in `.env.local` locally and in the Vercel project settings for Preview and Production. Never commit `.env*` files. Real keys come from the site owner.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | `https://deeperlifelewisville.org` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Pinned API date; defaults to the one in `lib/env.ts` |
| `SANITY_API_TOKEN` | No | Read-only token (never a write token) |
| `SANITY_REVALIDATE_SECRET` | For the webhook | Shared secret for `/api/revalidate`, 16+ characters |
| `RESEND_API_KEY` | For forms | Without it, forms show an error and the church phone number |
| `CONTACT_INBOX` | For forms | Where form email goes. Production: `info@deeperlifelewisville.org`. Outside production it must be a different, test inbox |
| `CONTACT_FROM` | No | Sender address on a domain verified in Resend |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | No | Durable rate limiting; falls back to in-memory |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics, production only |

## Project layout

- `app/(site)/` pages; `app/api/` contact, health and revalidation routes; `app/studio/` Sanity Studio
- `components/layout/` header and footer; `components/sections/` page sections; `components/ui/` primitives
- `lib/constants.ts` branch facts, schedule and navigation (the single source for facts until Phase 3)
- `lib/sanity/` client, queries and image helper; `sanity/schemas/` content types
- `docs/build/` the build plan, approved site content and design system; `docs/archive/` superseded documents

## Deployment

Vercel builds every push. `main` is production; each phase lands through a pull request from its `rebuild/phase-*` branch.
