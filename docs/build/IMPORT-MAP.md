# Import map (Phase 0)

Built on 2 November 2026 from commit `39d3b09`. The walk starts at every file in `app/` and `sanity/` plus `proxy.ts`, `sanity.config.ts`, `sanity.cli.ts` and `next.config.ts` (51 entry points). It follows static imports, dynamic imports and `@/` aliases with the TypeScript module resolver.

Result: 36 files in `components/`, `hooks/` and `lib/` are reachable, and **45 are not**. Phase 1.14 deletes the unreachable files after confirming each with a search.

## Unreachable (delete in 1.14)

`components/` root:

- `components/MediaGallery.tsx`
- `components/SermonCard.tsx`
- `components/SermonPlayer.tsx`
- `components/VideoBackground.tsx`
- `components/calendar-01.tsx`
- `components/image-gallery.tsx`
- `components/lazy-image.tsx`

`components/pro-blocks/` (the whole folder):

- `components/pro-blocks/landing-page/bento-grids/bento-grid-1.tsx`
- `components/pro-blocks/landing-page/tagline.tsx`

`components/sections/`:

- `AboutPreview.tsx`, `CTA.tsx`, `CallToAction.tsx`, `Contact.tsx`, `CtaSection.tsx`, `FAQ.tsx`, `FeaturedSermon.tsx`, `Features.tsx`, `GiveSection.tsx`, `Hero.tsx`, `HeroCarousel.tsx`, `PageHero.tsx`, `SermonList.tsx`, `ServiceGrid.tsx`, `ServiceSchedule.tsx`, `Services.tsx`, `SundayService.tsx`, `Testimonials.tsx`, `Timeline.tsx`, `UpcomingEvents.tsx`, `WhatWeBelieve.tsx`

`components/ui/`:

- `accordion.tsx`, `aspect-ratio.tsx`, `avatar.tsx`, `contact-section.tsx`, `input-group.tsx`, `label.tsx`, `loading-skeleton.tsx`, `profile-switcher.tsx`, `sonner.tsx`, `stagger-button.tsx`, `theme-switch.tsx`, `widget.tsx`
- `badge.tsx` and `card.tsx`: only tests use these (`__tests__/components/ui/badge.test.tsx` and `card.test.tsx`). Delete them with their tests, or keep them if Phase 2.2 reuses them.

`hooks/`:

- `hooks/use-gsap-scroll.ts`

Before deleting, note that Phase 2 needs an accordion (doctrine cards, Read more) and a label (form fields). Rebuilding `ui/accordion.tsx` and `ui/label.tsx` to the design system in 2.2 is simpler than keeping the current ones.

`types/jest-dom.d.ts` also has no importers, but it is an ambient type file for the tests. **Keep it.**

## Reachable

Phase 1 edits these, so check each one before touching it:

- Layout: `components/layout/Header.tsx`, `components/layout/Footer.tsx`
- Root components: `components/ContactForm.tsx`, `components/GoogleAnalytics.tsx`
- `components/sections/`: `HeroSection.tsx`, `Team.tsx`, `Welcome.tsx`, `about/CoreBeliefs.tsx`, `home/HeroCarouselNew.tsx`, `home/IconSection.tsx`, `home/MinistriesPreview.tsx`, `home/PastorsWelcome.tsx`, `home/QuickInfo.tsx`, `home/Testimonies.tsx`, `home/Values.tsx`, `home/Verse.tsx`
- `components/ui/`: `button.tsx`, `empty.tsx`, `input.tsx`, `modal.tsx`, `share-button.tsx`, `textarea.tsx`
- `hooks/use-scroll.ts`
- `lib/`: `analytics.ts`, `constants.ts`, `env.ts`, `logger.ts`, `rate-limit.ts`, `sanitize.ts`, `types.ts`, `utils.ts`, `sanity/client.ts`, `sanity/image.ts`, `sanity/queries.ts`, `validations/contact.ts`, `validations/newsletter.ts` (removed in 1.6)

`Welcome.tsx` and `home/PastorsWelcome.tsx` are both live. They are the duplicate welcome sections that 1.12 merges into one.

## Dependencies

Live code (anything reachable above, plus `app/`, `sanity/` and the root config files) never imports these:

| Package | Imported by | Action in 1.14 |
| --- | --- | --- |
| `gsap`, `@gsap/react` | Dead `hooks/use-gsap-scroll.ts` only | Remove |
| `react-h5-audio-player` | Dead `SermonPlayer.tsx` | Remove |
| `sonner` | Dead `ui/sonner.tsx` | Remove |
| `next-themes` | Dead `ui/sonner.tsx` and `ui/theme-switch.tsx` | Remove |
| `@radix-ui/react-accordion`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-label` | Dead `ui/*` files | Remove aspect-ratio and avatar. Keep accordion and label only if 2.2 builds on them |
| `embla-carousel-react`, `embla-carousel-autoplay` | Nothing | Remove |
| `date-fns` | Nothing | Remove (bring it back if Events needs it) |
| `dompurify`, `@types/dompurify` | Nothing directly; `isomorphic-dompurify` brings its own copy | Remove the direct entries (this also clears the critical advisory on the direct copy) |
| `prettier` | Tooling | Move to `devDependencies` |
| `styled-components` | Not imported, but it is a peer dependency of Sanity Studio | **Keep** |
| `react-dom` | Not imported, but it is a peer dependency of Next and React | **Keep** |
