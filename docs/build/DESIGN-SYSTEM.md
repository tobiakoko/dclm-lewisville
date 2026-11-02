# Design system: Deeper Life Bible Church Lewisville

This replaces `docs/DESIGN.md`. In particular, drop the gold accent `#C5A059` (it fails contrast at 2.46:1) and the Inter + Playfair Display pairing.

The palette comes from the emblem used in the header and footer, `public/dclm_logo.png`. Note that `public/Logo.png` is the DCLM heart logo and is **not** the site logo. Three colors were sampled from the emblem: navy ring `#16365E`, red dome and tagline `#E92028`, sky gradient `#3EB6DF`. Every contrast figure below was calculated with the WCAG relative-luminance formula.

## Color tokens

Tailwind v4 already ships `red-*` and `sky-*` scales, so the emblem colors use their own names.

```css
/* app/globals.css */
@theme {
  --color-navy-950: #0F2542;  --color-navy-900: #16365E;  --color-navy-700: #3A4B77;
  --color-heaven-700: #A8161D; --color-heaven-600: #C81E26; --color-heaven-500: #E92028; --color-heaven-50: #FDEEEE;
  --color-emblem-sky-700: #0A6A8F; --color-emblem-sky-400: #3EB6DF; --color-emblem-sky-50: #EAF6FB;
  --color-paper: #FAF8F4;  --color-ink: #1C2430;  --color-ink-muted: #4B5565;
  --color-border-input: #7B8798;  --color-success: #176B3C;  --color-warning: #7A5200;
}
```

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| `navy-900` | `#16365E` | Headings, header text, secondary buttons | 12.19:1 on white; white on it 12.19:1 |
| `navy-950` | `#0F2542` | Footer, dark bands, photo overlays | White 15.40:1; emblem-sky-400 6.57:1 |
| `navy-700` | `#3A4B77` | Secondary headings, outline-button text | 8.56:1 on white |
| `heaven-600` | `#C81E26` | Primary button (Plan your visit, Give) | White text 5.72:1 |
| `heaven-700` | `#A8161D` | Primary hover/pressed; error text | White 7.51:1; on heaven-50 6.66:1 |
| `heaven-500` | `#E92028` | Large display accents, icons, thin rules, the tagline | 4.47:1 on white: large text (≥ 24 px, or ≥ 18.66 px bold) and graphics only |
| `emblem-sky-400` | `#3EB6DF` | Accents on navy: eyebrow labels, icons, focus ring on dark | 5.20:1 on navy-900; decoration only on white (2.34:1) |
| `emblem-sky-700` | `#0A6A8F` | Links and focus ring on light backgrounds | 6.05:1 on white |
| `emblem-sky-50` | `#EAF6FB` | Alternate section background | navy-900 text 11.07:1 |
| `heaven-50` | `#FDEEEE` | Notices and alerts | heaven-700 text 6.66:1 |
| `paper` | `#FAF8F4` | Page and card background | ink 14.73:1 |
| `ink` | `#1C2430` | Body text | 15.62:1 on white |
| `ink-muted` | `#4B5565` | Captions and metadata; never use anything lighter | 7.54:1 on white |
| `border-input` | `#7B8798` | Form field borders (WCAG 1.4.11) | 3.65:1 on white |
| `success` / `warning` | `#176B3C` / `#7A5200` | Form and alert states | 6.55:1 / 6.92:1 on white |

**Color rules**

- Red never sits on navy (heaven-600 on navy-900 is 2.13:1). On navy sections, use a white button with navy text, or an emblem-sky-400 outline.
- The exact logo red and logo sky are accents only. Never use them for body text, small labels or button backgrounds with white text.
- One red (primary) action per screen. Secondary actions use navy outline buttons.
- Text over photos sits on a navy-950 overlay of at least 70% opacity, or on a solid panel. Check 4.5:1 against the lightest part of the photo at every breakpoint.
- Focus ring: 2 px emblem-sky-700 with a 2 px offset on light backgrounds; emblem-sky-400 on navy.
- Use only these tokens. Remove the old `--accent`, `--primary`, `--secondary`, `--brand-navy`, `church_*` and the `btn-faith/hope/love/urgency` and `section-faith/hope/light` classes.
- No dark mode for launch. The token names leave room for one later.

## Typography

**Source Serif 4** for headings and **Source Sans 3** for body text and the interface. Both are open-licensed variable fonts. They echo dclm.org's Noto Serif and Source Sans Pro.

| Role | Font and weight | Size, phone → desktop | Line height | Notes |
| --- | --- | --- | --- | --- |
| H1 | Source Serif 4, 600 | 36 → 52 px (fluid `clamp`) | 1.1 | Optical-size axis on; at most two lines on a phone |
| H2 | Source Serif 4, 600 | 28 → 36 px | 1.2 | Section titles |
| H3 | Source Sans 3, 600 | 20 → 24 px | 1.3 | |
| Body | Source Sans 3, 400 | 18 px | 1.6 | Lines of 60–75 characters (`max-w-prose`) |
| Small text | Source Sans 3, 400/600 | 15–16 px, never below 14 | 1.5 | Dates, captions, help text |
| Buttons, navigation | Source Sans 3, 600 | 16–17 px | 1.2 | Sentence case, normal letter-spacing. No tiny uppercase tracking labels |
| Service times | Source Sans 3, 600 | inherits | — | `font-variant-numeric: tabular-nums` |
| Scripture quotes | Source Serif 4 italic, 400 | 20–22 px | 1.5 | Reference in Source Sans 3, ink-muted |
| Form inputs | Source Sans 3, 400 | 16 px minimum | 1.4 | Smaller makes iOS zoom on focus |

**Loading.** Self-host the fonts so builds don't depend on reaching Google Fonts: install `@fontsource-variable/source-serif-4` and `@fontsource-variable/source-sans-3` (pre-approved dependencies) and load the latin and latin-ext woff2 files with `next/font/local`, `display: 'swap'`, exposed as `--font-serif` and `--font-sans`. Preload only the two main files. Keep a system fallback stack with Noto Sans.

**Names test.** Many congregants have Yoruba or Igbo names with dot-below letters and tone marks (for example "Adébáyọ̀", "Ọlátúndé"). Before finalizing, render a page of such names in both fonts and check every glyph appears.

## Layout

- 8 px spacing grid. Content up to 1200 px wide; text columns about 65 characters.
- Section backgrounds alternate white, `paper` and `emblem-sky-50`; navy-950 for the footer and at most one call-out band per page.
- Design at 375 px first. Tap targets at least 44 px. Phone numbers are `tel:` links; addresses link to maps.
- Header: the emblem plus the text "Deeper Life Bible Church · Lewisville". Solid white (or navy) background, never transparent over the hero. Navigation: Visit, About, Ministries, Sermons, Events, Contact, plus a red Give button.
- Under the home hero on phones: a short bar "Sunday 9:30 AM · Directions".

## Components

Keep a small, documented set in `components/ui` and `components/site`:

| Component | Notes |
| --- | --- |
| Button | Primary (heaven-600, white text), secondary (navy outline), text link. Visible focus ring. No other button styles |
| ServiceTimesCard | Day, name, start–end time, badges for "In person" / "Online", join link or `[Zoom link to come]` text, one-line plain description |
| PageHero | Title, one sentence, optional photo with navy-950 overlay ≥ 70% |
| Disclosure / Accordion | Radix Accordion or a button with `aria-expanded`. Used for doctrine cards and Read more bios |
| MinistryCard | Who it's for, what happens, how to join (always an action) |
| LeaderCard | Photo, name, title, short bio, "Read more" disclosure or dialog |
| SermonCard | Title, speaker, date, source badge "Lewisville" or "DCLM Headquarters" |
| EventCard | Date and time in Central Time, location or "Online", mode badge |
| Form fields | Visible labels, inline errors tied with `aria-describedby`, 16 px inputs, `border-input` borders |
| Alert, EmptyState, Skeleton | Honest wording, for example "No special events right now. Join us Sunday at 9:30 AM." |
| Footer | Address, phone, email, service times, social icons for configured links only, DCLM resources, Privacy, Terms |

## Motion, hover and images

- Honor `prefers-reduced-motion`. No autoplay carousels or videos. Transitions of 200 ms or less. Use CSS transitions; don't add animation libraries.
- Nothing appears on hover only. Tailwind 4 applies `hover:` only on devices that can hover, so pair every `group-hover` with `group-focus-within`, or just show the content.
- Photos: use the real photos in `app/assets/`. Never caption a photo as the church building unless it is. Never use stock or AI images as the church. Hero image under 200 KB via `next/image` with `sizes`; meaningful alt text; empty alt for decoration.
- YouTube: lazy "lite" facade (thumbnail + play button) that loads `youtube-nocookie.com` only on click.

## Accessibility checklist (WCAG 2.2 AA)

- Every control reachable and operable by keyboard, with a visible focus ring. Keep the skip link.
- One H1 per page; headings in order. Landmarks: header, nav, main, footer.
- Form fields labeled; errors announced (`aria-live="polite"`).
- Reflow at 320 px and 200% zoom without horizontal scrolling. Do not hide overflow globally (`overflow-x: hidden` on body masks problems; remove it).
- Contrast: only the token pairings above.
- Contact and Prayer links in the same place on every page (WCAG 3.2.6, Consistent Help).
- Mobile menu: Radix Dialog with focus trap, Esc to close, visible close button, closes on route change, removed from tab order when closed.
- axe checks in Playwright for every page, with zero serious or critical violations.

## Performance budget

At the 75th percentile, mobile and desktop: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Server Components by default; client components only where needed; no heavy animation libraries.
