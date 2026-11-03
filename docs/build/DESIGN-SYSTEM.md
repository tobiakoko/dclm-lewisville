# Design system: Deeper Life Bible Church Lewisville

*Revised 2 November 2026 for the Phase 4 redesign (`REDESIGN.md`, Direction A “Warm Editorial”). The changes from the first version are marked **(new)** or **(changed)**.*

The palette comes from the emblem in the header and footer, `public/dclm_logo.png`. `public/Logo.png` is the DCLM heart logo and is **not** the site logo. The three sampled colors are navy ring `#16365E`, red dome and tagline `#E92028`, and sky gradient `#3EB6DF`. Every contrast figure below was calculated with the WCAG relative-luminance formula.

## Color tokens

Tailwind v4 ships its own `red-*` and `sky-*` scales, so the emblem colors use their own names.

```css
/* app/globals.css */
@theme {
  --color-navy-950: #0F2542;  --color-navy-900: #16365E;  --color-navy-800: #183255;  --color-navy-700: #3A4B77;
  --color-heaven-700: #A8161D; --color-heaven-600: #C81E26; --color-heaven-500: #E92028; --color-heaven-50: #FDEEEE;
  --color-emblem-sky-700: #0A6A8F; --color-emblem-sky-400: #3EB6DF; --color-emblem-sky-200: #9ADAF0;
  --color-emblem-sky-100: #D3EAF4; --color-emblem-sky-50: #EAF6FB;
  --color-paper: #FAF8F4;  --color-paper-2: #F2EEE6;
  --color-ink: #1C2430;  --color-ink-muted: #4B5565;
  --color-line: #DDE2E8;  --color-line-warm: #E7E2D8;  --color-line-strong: #C3CCD8;
  --color-border-input: #7B8798;  --color-success: #176B3C;  --color-warning: #7A5200;
  --color-live: #FF5A5F;
}
```

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| `navy-950` | `#0F2542` | Hero and page-header scrims, footer, dark bands | White 15.40:1; emblem-sky-200 10.02:1; emblem-sky-400 6.57:1 |
| `navy-900` | `#16365E` | Headings, brand, featured dark cards, Sunday chip | 12.19:1 on white |
| `navy-800` **(new)** | `#183255` | Dark tile without a photo (Young Adults bento tile) | White 12.91:1 |
| `navy-700` | `#3A4B77` | Secondary headings | 8.56:1 on white |
| `heaven-600` | `#C81E26` | Primary button (Plan your visit, Give) | White text 5.72:1 |
| `heaven-700` | `#A8161D` | Primary hover/pressed; error text; crisis-notice text | White 7.51:1; on heaven-50 6.66:1 |
| `heaven-500` | `#E92028` | Large display accents and graphics only | 4.47:1 on white |
| `emblem-sky-700` | `#0A6A8F` | Links, eyebrows and focus ring on light | 6.05:1 on white; 5.70:1 on paper; 5.49:1 on emblem-sky-50 |
| `emblem-sky-400` | `#3EB6DF` | Accents on navy: eyebrows, icons, chips, focus ring on dark | 6.57:1 on navy-950; decoration only on white |
| `emblem-sky-200` **(new)** | `#9ADAF0` | Links on navy | 10.02:1 on navy-950; 7.93:1 on navy-900 |
| `emblem-sky-100` **(new)** | `#D3EAF4` | Decorative quote marks, soft fills | navy-900 text 9.77:1 |
| `emblem-sky-50` | `#EAF6FB` | Section band, icon tiles, chips, nav hover/current pill | navy-900 text 11.07:1 |
| `paper` | `#FAF8F4` | Warm page-header band, alternate sections, day tiles | ink 14.73:1; ink-muted 7.11:1 |
| `paper-2` **(new)** | `#F2EEE6` | “In person” chip, warm fills | navy-900 10.53:1 |
| `ink` | `#1C2430` | Body text | 15.62:1 on white |
| `ink-muted` | `#4B5565` | Secondary text, leads, captions (the mock-up's `#55606E` maps here) | 7.54:1 on white; 6.85:1 on emblem-sky-50 |
| `line` **(new)** | `#DDE2E8` | Dividers, card outlines, week-strip grid (decorative only) | 1.30:1, never the only boundary of a control |
| `line-warm` **(new)** | `#E7E2D8` | Dividers on paper | Decorative only |
| `line-strong` **(new)** | `#C3CCD8` | Secondary-button border | Decorative; the button's text identifies it |
| `border-input` | `#7B8798` | Form-field borders, checkbox and radio outlines | 3.65:1 on white (WCAG 1.4.11) |
| `live` **(new)** | `#FF5A5F` | The pulsing “live” dot, only while the stream is live, always next to the word “Live” | Decorative |
| `success` / `warning` | `#176B3C` / `#7A5200` | Form and alert states | 6.55:1 / 6.92:1 on white |

Text on navy uses white at fixed opacities: 100% for headings, 86% for leads, 76–80% for body and footer links, and 60% at the lowest (6.40:1 on navy-950). Nothing below 60%.

### Color rules

- **(changed) Red buttons may sit on navy and on photo scrims.** A text button is identified by its label (WCAG 1.4.11 doesn't require a boundary against the background), and white on heaven-600 is 5.72:1. Red *text* never sits on navy. One red (primary) action per view still applies.
- Logo red (`heaven-500`) and logo sky (`emblem-sky-400`) are accents. They're never used for body text on white or as a background behind white text.
- **Photo scrims.** Use a left-to-right navy-950 gradient: 95% at 0%, 86% at 34%, 50% at 66%, 32% at 100%. Add a bottom gradient from 90% at 0% to 0% at 42%. Text sits only in the left 55% of the hero, and is checked at 4.5:1 against the lightest part of the photo at every breakpoint. On phones, raise the scrim to at least 86% everywhere text sits.
- Focus ring: 3 px emblem-sky-700 with a 3 px offset on light surfaces; emblem-sky-400 on navy and over photos.
- Only these tokens. No raw hex in components.
- No dark mode for launch.

## Typography

**Source Sans 3** for body text and the interface, **Source Serif 4** for display and headings. Both are self-hosted via `@fontsource-variable` (already installed).

| Role | Font | Size, phone → desktop | Line height | Notes |
| --- | --- | --- | --- | --- |
| Display **(new)** | Serif 600 | `clamp(46px, 6.4vw, 84px)` | 1.0 | Home hero H1 only; letter-spacing −0.02em |
| H1 **(changed)** | Serif 600 | `clamp(40px, 5vw, 64px)` | 1.04 | Page headers; −0.015em |
| H2 **(changed)** | Serif 600 | `clamp(32px, 3.6vw, 46px)` | 1.1 | Section titles; −0.01em |
| H3 **(changed)** | Serif 600 | 26px | 1.2 | Card and person titles, featured items. Ministry row titles use H3 at 36px |
| H4 **(new)** | Sans 700 | 19px | 1.3 | List items, schedule names, outreach rows |
| H5 **(new)** | Sans 700 | 17px | 1.35 | Small card titles, captions |
| Lead **(new)** | Sans 400 | 18 → 20px | 1.55 | ink-muted; one per section header |
| Body | Sans 400 | 18px | 1.6 | `max-w-prose` (about 62–65 characters) |
| Small | Sans 400/600 | 15–16px | 1.55 | Metadata |
| Eyebrow **(new)** | Sans 700, uppercase | 14px | 1.2 | letter-spacing 0.12em; emblem-sky-700 on light, emblem-sky-400 on dark. At most one per section header, never the only label for meaning |
| Time / numbers | Sans 700 | 18–20px (28 in the featured card) | 1.2 | `tabular-nums`, `white-space: nowrap` |
| Pull quote **(new)** | Serif italic 500 | `clamp(24px, 2.6vw, 32px)` | 1.35 | navy-900 |
| Scripture block | Serif italic 400 | `clamp(22px, 2.4vw, 30px)` | 1.48 | Reference in Sans 700 |
| Buttons, nav | Sans 700 (buttons), 600 (nav) | 16px (15px small) | 1 | Sentence case |
| Form inputs | Sans 400 | 17px (minimum 16) | 1.4 | |

**Minimum text size is 14px everywhere** (the mock-up's 11–13px labels become 14px). The names test page stays.

## Layout and spacing

- Container: 1200px wide; narrow container 880px (verse, legal text). Gutter 40px desktop, 24px tablet, 20px at 640px and below.
- Section padding: `sec` 104px (72px on phones), `sec-md` 80px (56px), `sec-sm` 56px.
- Breakpoints, matching the design: **1100px** (nav collapses to the drawer), **960px** (two-column and editorial grids stack; footer and bento drop to two columns; the info bar stacks), **640px** (single column; gutters 20px; the header's watch link and button text are hidden). Mobile-first Tailwind classes should reproduce these (`max-[1100px]`, `md`/`lg` as appropriate).
- Grids: section headers use a flex row with the title on the left and the link on the right, wrapping. Two-up layouts use 5/7, 6/6 or 4/8 column splits with 48–80px gaps.
- Band order: alternate white, paper and emblem-sky-50; at most one navy content band per page, plus the home hero and footer.
- Tap targets at least 44px. Phone numbers are `tel:` links, addresses link to maps.

## Shape and depth (new)

| Token | Value | Used by |
| --- | --- | --- |
| Radius: pill | 999px | Buttons, chips, nav pills, pill links, segmented control |
| Radius: field | 12px | Inputs, small tiles, menu button |
| Radius: card | 20px | Cards, photos, info bar, week strip |
| Radius: panel | 24px | Panels, featured dark card, portrait and hero photos |
| Radius: tile | 16–22px | Icon tiles 16px; bento tiles 22px; day tiles 18px |
| `shadow-sm` | `0 1px 2px rgb(15 37 66 / .06), 0 1px 3px rgb(15 37 66 / .08)` | Icon tiles on white, pill links, active segment |
| `shadow-md` | `0 2px 4px -1px rgb(15 37 66 / .06), 0 10px 24px -6px rgb(15 37 66 / .12)` | Cards, info bar, date cards |
| `shadow-lg` | `0 30px 60px -16px rgb(15 37 66 / .32), 0 8px 18px -8px rgb(15 37 66 / .18)` | Video play button |

Define these in `@theme` (`--radius-*`, `--shadow-*`) and use the utilities; no one-off values.

## Components

Keep the set small, in `components/ui` (primitives) and `components/site` (church-specific). Exact sizes are in `redesign-reference/styles.css`.

| Component | Spec |
| --- | --- |
| **Button (changed)** | Pill, min-height 52px (small 44px), padding 0 26px, Sans 700 16px, 10px gap for icons. Variants: `primary` (heaven-600, white text, soft red shadow; hover heaven-700), `secondary` (white background, navy-900 text, 1.5px line-strong border; hover border navy-900), `ghost` (on navy or photos: white 6% fill, white text, 1.5px white-50% border; hover 14% fill and white border), `light` (white with navy text, for navy bands; hover emblem-sky-50), `link` (text link). No other button styles |
| **ArrowLink (new)** | Inline-flex, min-height 44px, Sans 700, emblem-sky-700 (emblem-sky-200 on dark), trailing arrow icon, underline on hover |
| **Chip (new)** | 28px pill, Sans 700 14px. Default emblem-sky-50 with navy text; `warm` paper-2 (“In person”); `dark` white 12% with white text; `red` heaven-50 with heaven-700 text. Mode badges: In person = warm, Online = default |
| **IconTile (new)** | 52px square, radius 16, emblem-sky-50 with navy icon. `warm`: white with shadow-sm. `dark`: white 10% with emblem-sky-400 icon. Icons are 1.75px stroke line icons (lucide), `aria-hidden` |
| **Eyebrow (new)** | Per the typography table, rendered as a `<span>` or `<p>` above the heading (not a heading itself) |
| **Header (changed)** | Light and overlay tones; brand, pill nav, watch link, Give (`REDESIGN.md` §2) |
| **Footer (changed)** | CTA band, four columns, bottom bar (`REDESIGN.md` §2) |
| **PageHero (changed)** | `warm` variant (paper band, 6/6 text and media). The navy photo variant is retired |
| **Section (changed)** | Tones `white`, `paper`, `sky`, `navy`; sizes `default`, `md`, `sm`; optional eyebrow, lead and right-side action |
| **EditorialRow (new)** | 4/8 grid: label column (serif number or eyebrow, plus H2) and content. 1px `line` top divider (none on the first row), 72px vertical padding (56px stacked) |
| **InfoBar (new)** | White card, radius 20, shadow-md, three cells with 1px dividers, each with an icon tile, eyebrow, 20px bold value and a small line. Overlaps the hero by 96px. Stacks below 960px |
| **ScheduleRow / DayTile (new)** | Grid `76px 1fr auto`, 24px row padding, 1px top divider. Day tile is 76px (64px on phones), radius 18, paper background, serif 24px day abbreviation, 14px uppercase “Weekly”. On phones the time and chips move under the text |
| **ServiceTimesCard (changed)** | Featured variant = `card-dark` (navy-900, radius 24, padding 40) for Sunday; standard variant = ScheduleRow |
| **Card / CardLine / CardDark / Panel (new)** | `card`: white, radius 20, shadow-md. `card-line`: white with a 1px `line` inset outline. `card-dark`: navy-900, white text, radius 24. `panel`: paper or emblem-sky-50, radius 24 |
| **BentoTile (new)** | One link per tile: photo `object-cover`, bottom scrim (navy-950 from 0% at 30% to 90% at 100%), serif 26px title, 15px white-86% subtitle, 44px round arrow (white 16%). Photo zoom 1.04 only with `prefers-reduced-motion: no-preference`. Visible focus ring on the tile |
| **MinistryRow (new)** | Two-column alternating photo and text; photo first on phones; eyebrow (audience), title, summary, ArrowLink |
| **Accordion / DoctrineCards (changed)** | Button min-height 64px, padding 16px 20px, radius 14, 1px `line` inset outline (1.5px navy when hovered or open), Sans 700 16px navy, a serif emblem-sky-700 number (01–22) and a rotating chevron. The panel is indented to the title. Keep the Radix or `aria-expanded` behavior |
| **LeaderCard (changed)** | Portrait 4:5 radius 24, role eyebrow, serif H3 name, short bio, “Read full bio” disclosure or dialog |
| **SegmentedControl (new)** | Emblem-sky-50 pill track with 4px padding; options 44px tall, Sans 700 15px; the selected option is white with shadow-sm. Semantics: a radio group (arrow keys move the selection) |
| **WeekStrip (new)** | 7 columns in a white radius-20 box with 1px `line` dividers. Day header shows the weekday and date; today has an emblem-sky-50 header and the word “Today”. Events are emblem-sky-50 rounded blocks (Sunday Worship navy-900 with white text). Previous and Next week buttons. Becomes a vertical list below 960px |
| **DateCard (new)** | Grid `96px 1fr auto`, white, radius 22, shadow-md. Navy-900 96px date box with the month in emblem-sky-400 (14px uppercase) and the day in serif 38px |
| **LiteYouTube (changed)** | Radius 18, 16:9, white 84px round play button with shadow-lg, an accessible name naming the video. `MiniSermonRow`: 128×72 thumbnail (radius 10), title and date, one link |
| **Form fields (changed)** | Label Sans 700 15px navy above the field; input 52px tall, radius 12, **1.5px `border-input`** border (hover navy-700), Sans 17px. Optional fields say “(optional)” in the label; errors are shown inline and announced. Two-column `form-grid` on desktop |
| **Alert** | Info and crisis variants. Crisis = heaven-50 background, heaven-700 text, circle-info icon, radius 14 |
| **PullQuote / ScriptureBlock (new)** | Per the typography table. The quote-mark SVG is decorative |
| **EmptyState** | A paper panel with an H3 message, a muted line and one action |

## Motion, hover and images

- Honor `prefers-reduced-motion`. No autoplay carousels or video. Transitions of 200ms or less, except the guarded 500ms bento photo zoom. CSS only; no animation libraries.
- Nothing appears on hover only. Pair hover styles with `focus-visible` styles.
- Real photos from `app/assets/` or Sanity only, with truthful alt text and empty alt for decoration. The hero image is under 200KB, `priority`, `sizes="100vw"`; the others use `sizes` that match their grid.
- The live dot pulses only while live, and only without reduced motion; otherwise it's a static dot.

## Accessibility checklist (WCAG 2.2 AA)

- Every control reachable and operable by keyboard, with a visible focus ring on light, dark and photo surfaces. Keep the skip link, and make sure it works over the overlay header.
- One H1 per page; headings in order. Eyebrows aren't headings.
- Form fields labeled, errors announced. Segmented control and week-strip navigation have proper roles and names.
- Reflow at 320px and 200% zoom without horizontal page scrolling (only the in-page pill nav may scroll inside its own box).
- Contrast only from the token pairings above, including text over photos at every breakpoint.
- Contact and Prayer links appear in the same place on every page (header drawer and footer).
- Mobile menu: Radix Dialog with focus trap, Esc to close, visible close button, closes on route change.
- axe in Playwright for every page, both header tones, and with the drawer open: zero serious or critical violations.

## Performance budget

At the 75th percentile, mobile and desktop: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. The info-bar overlap and the overlay header must not shift layout; reserve the hero's height. Server Components by default; client components only for the header tone switch, drawer, accordions, segmented control and week strip.