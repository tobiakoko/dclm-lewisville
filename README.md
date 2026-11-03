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
| `npm run typegen` | Regenerate `sanity/types.generated.ts` after a schema or query change |
| `npm run seed -- --dataset <name>` | Seed a Sanity dataset with the church's content (needs `SANITY_WRITE_TOKEN`; `--dry-run` to preview) |

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
| `SANITY_REVALIDATE_SECRET` | For the webhook | Secret the Sanity webhook signs with; `/api/revalidate` verifies the signature |
| `SANITY_WRITE_TOKEN` | Seeding only | Editor token for `npm run seed`, set in your shell for that command; never in Vercel or the repo |
| `SANITY_DEV_FALLBACK` | CI and e2e only | `true` builds from the seed content when the dataset is empty; refused on Vercel Production |
| `RESEND_API_KEY` | For forms | Without it, forms show an error and the church phone number |
| `CONTACT_INBOX` | For forms | Where form email goes. Production: `info@deeperlifelewisville.org`. Outside production it must be a different, test inbox |
| `CONTACT_FROM` | For forms | Sender address on a domain verified in Resend |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | No | Durable rate limiting; falls back to in-memory |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics, production only |

## Project layout

- `app/(site)/` pages; `app/api/` contact, health and revalidation routes; `app/studio/` Sanity Studio
- `components/layout/` header and footer; `components/sections/` page sections; `components/ui/` primitives
- Content lives in Sanity (Studio at `/studio`); `lib/data.ts` reads it with cache tags, and `/api/revalidate` refreshes pages on publish
- `lib/constants.ts` and `lib/content/` are the seed data and the development fallback; production shows an error, never fallback content
- `lib/sanity/` client, queries and seed documents; `sanity/schemas/` content types; `sanity/types.generated.ts` from TypeGen
- `docs/build/` the build plan, approved site content and design system; `docs/RUNBOOK.md` and `docs/TRAINING.md` for staff; `docs/archive/` superseded documents

## Deployment

Vercel builds every push. `main` is production; each phase lands through a pull request from its `rebuild/phase-*` branch.
