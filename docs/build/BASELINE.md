# Baseline (Phase 0)

Recorded on 2 November 2026 at commit `39d3b09` (`main`; the app code is unchanged since the audit commit `18c17f1`). Local machine: Node 25.3.0, npm 11.7.0.

## Checks

| Command | Result |
| --- | --- |
| `npm ci` | OK. 1,743 packages audited |
| `npm run type-check` | Pass, 0 errors |
| `npm run lint` | Pass, 0 errors and 56 warnings (44 `no-unused-vars`, 8 `no-img-element`, 2 `no-location-assign-relative-destination`, 1 `exhaustive-deps`, 1 `no-anonymous-default-export`) |
| `npm test` | 9 suites, 109 tests, all pass. Coverage: statements 11.69%, branches 9.01%, functions 7.49%, lines 12.14% |
| `npm run build` | Pass (Next.js 16.3.1, Turbopack). Every page route is dynamic (`ƒ`) except `robots.txt`, `sitemap.xml` and `/ministries/[slug]` (SSG) |
| `npm run test:e2e` | Run at the start of Phase 1 (see "E2E baseline" below): 135 of 135 pass, 0 skipped |

Build warnings:

- Next.js infers the wrong workspace root because a stray `package-lock.json` (and `package.json`) exists in the home directory, `/Users/tobi/`. Either remove those files or set `turbopack.root` in `next.config.ts`.
- `--localstorage-file was provided without a valid path` from the build workers. This is Node 25 noise, and it should go away on Node 22 or 24.

## Spot checks on `next start`

| URL | Status | Expected after Phase 1 |
| --- | --- | --- |
| `/` | 200 | 200 |
| `/no-such-page` | 404 | 404 |
| `/sermons/made-up-sermon` | **200** (placeholder sermon) | 404 |
| `/ministries/made-up-ministry` | **500** | 404 |

On this build, a generic unknown URL already returns 404. The 200 status only shows up on `sermons/[slug]`, so 1.4 still applies.

The home page HTML contains `dclmlewisville.org` 8 times, `123 Church Street` twice, `123-456-7890` twice and `665-9972` once. The correct phone number, `939-6994`, appears 0 times.

## E2E baseline (start of Phase 1, 1.0)

Run on 2 November 2026 at commit `637b54a`, before any app changes: 27 tests × 5 browser projects (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari) = 135 runs. **All 135 pass, none fail, and Playwright reports 0 skipped**, in 80 s.

That green result overstates coverage. Sixteen `if (count > 0)` or `if (isVisible)` guards skip assertions silently, so these tests pass without checking anything:

- `newsletter.spec.ts`: all 4 tests. The site has no newsletter form, so every body is skipped. They will be deleted with the newsletter in 1.6.
- `sermons.spec.ts`: 6 of the tests (list, open detail, search, details, media player, related). No sermon links render, so the assertions never run.
- `homepage.spec.ts`: the mobile-menu helper and "should be responsive on mobile" open the menu only if a button is found.
- `contact-form.spec.ts`: "fill and submit" fills the phone field only if present.

No test checks status codes, axe results, facts or a 404. Phase 1 replaces the guards with assertions.

## npm audit

65 vulnerabilities: 3 critical, 12 high, 49 moderate, 1 low.

| Severity | Package | Direct? | Fix |
| --- | --- | --- | --- |
| critical | `next` | direct | `npm audit fix` (16.4.3) |
| critical | `dompurify` | direct | `npm audit fix`. Live code doesn't import it; only `isomorphic-dompurify` needs it |
| critical | `handlebars` | transitive | `npm audit fix` |
| high | `brace-expansion`, `js-yaml`, `markdown-it`, `sharp`, `source-map-js`, `undici`, `vite` | transitive | `npm audit fix` |
| high | `sanity`, `@sanity/cli`, `@sanity/codegen`, `adm-zip`, `zod` (nested) | mixed | Only via Sanity 6 (major), so Phase 3 |

## npm outdated (wanted within range → latest)

Within the current ranges (Phase 1.15 candidates): `next` 16.3.1 → 16.4.3, `eslint-config-next` → 16.4.3, `tailwindcss` and `@tailwindcss/postcss` 4.1.16 → 4.3.3, `zod` 4.1.12 → 4.6.7, `resend` 6.20.0 → 6.37.0, `react-hook-form` → 7.91.0, `@hookform/resolvers` → 5.9.2, the Radix packages, `@upstash/*`, `jest` 30.5.2, `@playwright/test` 1.64.1, `@axe-core/playwright` 4.14.0, `dompurify` 3.4.17, `tailwind-merge` 3.7.0, `@types/react*` 19.3.0.

`react` and `react-dom` are pinned at 19.2.0, and 19.3.1 is available. Changing the pin is a deliberate minor bump.

Majors (not in Phase 1): `sanity` and `@sanity/vision` 6.21.0, `next-sanity` 13.4.0, `@sanity/client` 8, `@sanity/image-url` 2 (all in Phase 3), `typescript` 7 (stay on 5.9), `eslint` 10, `@vercel/analytics` 2, `@vercel/speed-insights` 2, `lucide-react` 1, `framer-motion` 14, `msw` 3, `isomorphic-dompurify` 3, `@testing-library/jest-dom` 7, `@hookform/resolvers` 7, `@types/node` 26.

## package.json issues

- It has two `overrides` keys (`uuid` near line 68 and `adm-zip` near line 94). JSON keeps only the last one, so the `uuid` override is silently ignored. Phase 1.1 fixes this.
- `prettier` is in `dependencies`; it belongs in `devDependencies`.
- `@types/node` is on 20.x, but the target is Node 22 or 24.

## Remote branches (0.3)

Merged into `main`, so safe to delete: `develop`, all `claude/*` branches except the one below, and `vercel/react-flight-rce-vulnerability-0ql4g5`.

Not merged:

- **`claude/update-homepage-layout-011CUxkKUF1rh9P6xKvFxPGY`** (1 commit ahead, 78 behind). Commit `390e4bc` invents facts: the address "1500 W Main Street", a 972-area-code phone number, rewritten pastor's welcome text, and the name "Revival Service". **Never merge it.** We recommend deleting the branch.
- **`feature/cms-page-builder-architecture`** (1 commit ahead, 103 behind, from 8 November 2025, 53 files and +5,100 lines). It adds a Sanity `page` document with a `sections` array of seven object types (hero, featuresList, benefitsSection, aboutSection, ctaSection, ctaFormSection, faqSection), a `PageRenderer` that maps section `_type` to a component, a `/pages/[slug]` route, `ModernNavigation` and `Navigation` built on Radix NavigationMenu and Sheet, and `components/design-system/*` with a blue `#338fe0` and red `#c42d2d` palette. Don't merge it.

  For Phase 3, two things are worth reusing as ideas, not code:
  - The `_type` → component switch is a clean way to render a typed array of blocks, which would help if `homePage` or `aboutPage` ever need reorderable sections.
  - `urlForImage(source).auto('format').fit('max')` is a reasonable default for the image helper.

  The rest conflicts with the plan:
  - A free-form page builder runs against 3.2's fixed singletons and typed documents, which keep the verbatim text and facts out of editors' layout choices.
  - Its palette, fonts and animation helpers contradict `DESIGN-SYSTEM.md`.
  - It is 103 commits behind on Next 16.0.0.

## After `npm audit fix` (Phase 1, 1.1a)

Running `npm audit fix` (no `--force`) on 2 November 2026 took the count from 65 to **47: 0 critical, 4 high, 42 moderate, 1 low**. It also moved `next` to 16.4.3 and `zod` to 4.6.7, both within their existing ranges.

The four remaining high advisories all come from Sanity tooling. Only the Sanity 6 upgrade (Phase 3) fixes them:

| Package | Comes in via | Runs where |
| --- | --- | --- |
| `@sanity/cli` | `@sanity/codegen`, `@sanity/runtime-cli` | CLI only (`sanity dev`, `deploy`, `typegen`) |
| `@sanity/codegen` | its own nested `zod` 3.25.76 (GHSA-mrhx-c7xc-m3w5, memory exhaustion on oversized input) | TypeGen CLI only |
| `zod` (nested) | `@sanity/codegen` | TypeGen CLI only. The app's own `zod` is 4.6.7 and not affected |
| `sanity` | `@sanity/cli`, `@sanity/import`, `archiver`, `rimraf` | Dataset import/export and CLI only |

**Runtime check.** After `npm run build`, none of `@sanity/cli`, `@sanity/codegen`, `@sanity/runtime-cli`, `@sanity/import`, `archiver` or `rimraf` appears in `.next/server` or `.next/static`. As a control, the same search does find `node_modules/sanity/` in 19 files. So none of the four advisories reaches the running `/studio` route or any site page; they affect developer and CI tooling only. **Nothing is flagged at runtime.**

CI now runs `npm audit --audit-level=critical`, because `--audit-level=high` would fail on these four until Phase 3. Raise it back to `high` after the Sanity 6 upgrade.
