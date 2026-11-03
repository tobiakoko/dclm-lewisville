# Redesign spec: layout and components (Phase 4)

**Goal:** give the live site a warmer, more polished look and layout without changing its content. The words, facts, page order, routes, CMS model and verbatim text stay as they are. This is a visual and structural refresh only.

**Source design:** the canvas “DLBC Lewisville Redesign”, using its home page, its shared header and footer, and **Direction A, “Warm Editorial”** (calm, photo-led, serif-forward) for every inner page. Direction B is not being built. Reference exports are in `docs/build/redesign-reference/`; read its `README.md` first.

Visual rules (tokens, type scale, components) are in `DESIGN-SYSTEM.md`, which has been updated for this phase. Where this file and `DESIGN-SYSTEM.md` disagree on a visual detail, `DESIGN-SYSTEM.md` wins. Where either disagrees with `SITE-CONTENT.md` on words, `SITE-CONTENT.md` wins.

**Coverage:** every page and shared UI state on the site gets the new design.

| Route or UI | Spec | Mock-up |
| --- | --- | --- |
| `/` Home | §3 | `Main.html` |
| Header (light, overlay), footer, mobile drawer | §2, §4 Shared overlays | `Header.html`, `Footer.html` |
| `/visit` | §4 | `A-Visit.html` |
| `/about` | §4 | `A-About.html` |
| `/ministries` | §4 | `A-Ministries.html` |
| `/sermons` | §4 | `A-Sermons.html` |
| `/sermons/[slug]` | §4 Sermon detail | Built from Direction A parts |
| `/events` | §4 | `A-Events.html` |
| `/contact` | §4 | `A-Contact.html` |
| `/give` | §4 | `A-Give.html` |
| `/privacy`, `/terms` | §4 Privacy and Terms | Built from Direction A parts |
| 404, error, global error | §4 Not found and errors | Built from Direction A parts |
| Consent banner, loading, empty, form alerts | §4 Shared overlays | Built from Direction A parts |
| `/ministries/[slug]` (redirect), `/studio`, `/dev/names` | §4 Routes with no UI | — |

## 1. What changes and what doesn't

| Changes | Stays the same |
| --- | --- |
| Section layouts, spacing, card styles, buttons (pill shape), the header and footer, the home hero (full-bleed photo), page headers (warm cream band), the type scale (larger serif headings), new small components (info bar, day tiles, bento tiles, editorial rows, segmented control, week strip) | All copy from Sanity and `SITE-CONTENT.md`; verbatim blocks; routes and redirects; the CMS schema (except the optional page-heading fields in §6); forms and their API; sermon data logic; SEO, JSON-LD, analytics consent; accessibility and performance requirements |

Current live layout (for comparison): a paper-colored home hero with text on the left and the congregation photo on the right; a navy phone-only Sunday bar; uniform `Section` bands with an H2 and a card grid; navy photo `PageHero` bands on inner pages; a square-cornered white sticky header with underlined links. The redesign keeps every section but restyles and regroups them as described below.

## 2. Shared pieces

### Header (`components/layout/Header.tsx`)

- **Brand:** the emblem at 46 px in a white circle, then “Deeper Life Bible Church” (Source Serif 4, 19 px, 600) over “Lewisville, Texas” (Source Sans 3, 14 px, 600, ink-muted). Take both from `siteSettings`, not literals.
- **Nav:** the same six links, styled as 44 px pills (16 px, 600, navy-900). Hover and current page use an emblem-sky-50 pill background; keep `aria-current="page"`.
- **Right side:** a “Watch online” link to the YouTube streams URL, then the red **Give** button (small). Show the pulsing red dot and the label “Watch live” only while the existing live check reports the stream is live; otherwise show “Watch online” with a play icon and no dot. Hide this link below 640 px.
- **Height:** 88 px desktop (min 72 px on phones). Below 1100 px the nav collapses into the existing Radix Dialog drawer, behind a 44 px menu button styled as an emblem-sky-50 rounded square. Keep all current drawer behavior.
- **Two tones:**
  - *Light* (every inner page): white background, 1 px `line` bottom border, sticky as today.
  - *Overlay* (home page only): transparent, sitting on the hero photo, with white text and translucent-white hover pills. It isn't sticky. When the hero scrolls out of view, show the light sticky header (an IntersectionObserver on the hero is enough; no animation library). With reduced motion, swap without a transition.

### Footer (`components/layout/Footer.tsx`)

On a navy-950 background, in three tiers:

1. **CTA band:** a serif line at 28–38 px (white) and one sentence (white 76%), plus **Plan your visit** (primary) and **Watch online** (ghost). The copy is in §7. A bottom border in white at 12%.
2. **Four columns** (stacking to two below 960 px and one below 640 px):
   - brand, address, `tel:` phone, `mailto:` email, social icons for configured links only
   - **When we meet:** a `<dl>` of day and time from the schedule, plus “All times Central”
   - **Get in touch:** Plan your visit, Contact us, Prayer requests, Give
   - **DCLM resources:** the existing links with their real URLs
3. **Bottom bar:** “© {year} {church name}” plus Privacy Policy, Terms of Use, and Sitemap (only if `/sitemap` exists as a page; otherwise drop it).

Column headings are 14 px bold uppercase white. Links are white at 78%, turning white with an underline on hover, with a 32 px minimum height (44 px tap height on phones).

### Page header for inner pages (`components/site/PageHero.tsx` → add a `warm` variant and make it the default)

A paper (cream) band with 72 px top and 88 px bottom padding, then a two-column grid (6/6, stacking below 960 px):

- **Left:** eyebrow (page name), H1 (40–64 px serif), lead paragraph (20 px, ink-muted), and an optional row of actions or quick facts.
- **Right:** a real photo (radius 24, aspect 4:3) or a card (for example the Sermons “next live” card or the Give scripture card).

The navy photo `PageHero` is no longer used on inner pages; remove it, or keep it only if something else still imports it.

### Section bands (`components/site/Section.tsx`)

- Padding 104 px top and bottom on desktop, 72 px on phones. Add a `size="md"` option (80/56 px) for short bands such as the verse and other locations.
- Content width stays 1200 px; side gutter 40 px desktop, 24 px tablet, 20 px phone.
- Section header: eyebrow, then H2, then optional lead, with an optional right-aligned link (“All events”, “All sermons”) on the same row on desktop.
- Tones: `white`, `paper`, `sky`, `navy`. Per page: at most one navy content band, plus the home hero and footer.

## 3. Home page (`app/(site)/page.tsx`)

The order is unchanged except that the phone-only Sunday bar is replaced by the info bar. See `redesign-reference/Main.html`.

1. **Hero** (`sections/home/Hero.tsx`): a full-bleed congregation photo behind the navy scrim gradient from `DESIGN-SYSTEM.md`, with the overlay header inside it. Contents, left-aligned, max width 700 px:
   - a pill “Sundays at 9:30 AM · In person & online”, built from the schedule, with no live dot unless the stream is live
   - the display H1 (`homePage.hero.title`)
   - the subtitle (`homePage.hero.subtitle`)
   - **Plan your visit** (primary) and **Watch online** (ghost)

   Padding is 96 px top and 176 px bottom, so the info bar can overlap it. The design's alternative “photo collage” hero is **not** used.

   Phone acceptance still applies: at 390 px the church name and city (header brand), Sunday time (pill) and **Plan your visit** show without scrolling. Reduce padding on phones as needed to make that hold.
2. **Info bar** (new, replaces `SundayBar`): a white card (radius 20, `shadow-md`) overlapping the hero by 96 px, with three cells separated by 1 px dividers:
   - *Sunday worship*: time, plus “Prayer online from 9:00 AM”
   - *Find us*: street, plus city, ZIP and a Directions link
   - *Can't make it?*: “Watch live on YouTube”, plus “Sundays, 9:30 AM CT” and an Open stream link

   Each cell has an icon tile, an eyebrow, a 20 px bold value and a small muted line. The cells stack on phones. Everything comes from `siteSettings` and the schedule.
3. **When we meet** (`QuickInfo`): section header with eyebrow “Weekly gatherings”, H2, and “All times are Central Time” on the right. Then a 5/7 grid:
   - **Left, featured Sunday card** (`card-dark`, navy-900, radius 24, padding 40): chips “Sunday” and “Main service”; serif name (38 px); time (28 px bold); In person and Online icons; the description; a divider; “Before the service · Sunday Prayer · 9:00 AM · Online” with its join link, or the “[Zoom link to come]” text when there's no URL; then **Plan your visit** and **Watch live**.
   - **Right, “Through the week” card:** a `sched-row` list for Monday, Tuesday and Friday, each with a day tile (76 px paper tile, serif 24 px day plus “Weekly”), name, one-line description, join link or placeholder, time, and mode chips. An “All events” link sits in the card header.
4. **Pastor's Welcome** (`PastorsWelcome`): a white band (**its own `<section>`**; the mock-up nests it inside “When we meet”, which is a bug) with a 5/7 grid:
   - **Left:** the pastor portrait (aspect 4:5, radius 24) with a floating white caption card (name, “Local Pastor”).
   - **Right:** eyebrow “A word from our pastor”, the H2 heading, and **the full verbatim Pastor's Welcome**, then **Meet our leadership** (secondary) and **What we believe** (arrow link).

   You may set one sentence from the welcome, “At Deeper Life Bible Church Lewisville, you will never be “lost in the crowd.”” (exactly as written, quotation marks included), as a serif italic pull-quote above the text, as long as the full paragraph also appears unchanged below. The mock-up's shortened, reworded welcome must not be used.
5. **What to expect** (`WhatToExpect`): a paper band with a 5/7 grid:
   - **Left:** eyebrow “Your first visit”, H2, the lead (§7), and a photo (4:3) with a floating card “About 2½ hours · Singing, prayer, Bible study and teaching”, built from the approved service-length copy.
   - **Right:** a 2×2 grid of the four `whatToExpect` items (icon tile on white with a soft shadow, H4, text), then **Plan your visit** and **More about your first visit** (secondary).
6. **Latest message** (`FeaturedMessage` in a navy band, the page's one navy band):
   - **Header:** eyebrow “Sermons”, H2, then on the right a pill “Next live: Sunday, 9:30 AM CT” (from the schedule) and an “All sermons” link.
   - **Body, 7/5 grid:** on the left, the lite-YouTube facade (radius 18, 84 px white play button). On the right, the source chip (“From DCLM Headquarters, Lagos” or “Lewisville”), serif title, date line, a **Watch message** (light) button, a divider, “Recent from Lewisville”, and up to three mini rows (128×72 thumbnail, title, date) **from the RSS data**. Hide the list when there's no data.
7. **Testimony** (`Testimonies`): a white band with a 4/8 grid.
   - **Left:** eyebrow “Testimony”, an optional title and summary (only if the testimonial document has them; don't hard-code the mock-up's), and a “Share your testimony” arrow link to `/contact?topic=testimony`.
   - **Right:** a decorative quote mark (`aria-hidden`), the testimony in serif at 24–31 px navy, and a caption with an initial avatar and the name.
8. **Verse** (`Verse`): an emblem-sky-50 band at `size="md"`, centered with a narrow width (880 px). An H2-styled eyebrow (“The Bible verse we live by”, from content), the verse in serif italic at 22–30 px, and the reference in bold.
9. **Ministries** (`MinistriesPreview`): section header with eyebrow “Get connected”, H2, lead, and an “All ministries & outreach” (secondary) button. Then a **bento grid**: 4 columns, 280 px rows and 16 px gap (2 columns and 240 px rows below 960 px; 1 column below 640 px).
   - Tile order: Children (2 columns), Youth, Women, Young Adults (a navy-800 tile with an icon and no photo), Men, Music (2 columns).
   - Each tile is one link: photo, bottom gradient scrim, serif title (26 px), subtitle from the ministry's audience or summary field, and a 44 px circular arrow.
   - Below the grid, an emblem-sky-50 panel: “Outreach · Serving our neighbors beyond Sunday” with a pill link for each of the five outreach areas.
10. **Footer.**

## 4. Inner pages (Direction A)

Every inner page uses the light header, the warm page header (§2) and the footer. Each section below names its band tone.

### Plan Your Visit (`/visit`), see `A-Visit.html`

- **Page header:**
  - *Left:* eyebrow “Plan your visit”, H1, lead, then three quick facts in a row (When: “Sundays, 9:30 AM”; Where: the street; How long: “About 2½ hours”). Then **Let us know you're coming** (primary, an anchor to the form) and **Get directions** (secondary).
  - *Right:* a photo.
- **In-page nav:** a row of pill links (Service times, Getting here, Your Sunday, Kids & what to wear, Let us know). On phones it scrolls horizontally inside its own box.
- **Editorial rows** (`ed` pattern: 4/8 grid, label column with a large serif number 01–05 and the H2, content on the right, 1 px top divider, 72 px vertical padding, stacking below 960 px):
  - **01 Service times:** Sunday Worship as a highlighted emblem-sky-50 panel (with its Psalm 138:2 line from content), then a row for Sunday Prayer, Monday, Tuesday and Friday: day tile, name, description, mode chips, join link or placeholder, and time.
  - **02 Getting here & parking:** the address block, the parking text, a Get directions link, and the existing map embed (radius 20).
  - **03 Your Sunday, step by step:** a vertical timeline (time and label in bold, text muted) built only from approved facts: 9:00 prayer online, 9:30 worship begins, 9:40–10:05 Search The Scriptures, teaching until 12:00 PM, and after the service (church card and ushers).
  - **04 For the whole family:** two columns, Kids & families and What to wear.
  - **05 Get to know us first:** two `card-line` cards, “Watch a service first” and “Meet the pastor”, linking to YouTube or Sermons and to the welcome or leadership.
- **06 Let us know you're coming:** a paper band with a 5/7 grid.
  - *Left:* H2, lead, and a short check list. Use only “An usher will welcome you and walk you through the next steps” and “A church card for first-time guests”; drop the mock-up's line about help settling kids, because it isn't an approved fact.
  - *Right:* the existing form in a white card. Fields use a two-column grid on desktop, with “(optional)” in the label and the note “Fields without ‘optional’ are required.”

### About (`/about`), see `A-About.html`

- **Page header:**
  - *Left:* eyebrow “About us”, H1, the lead (the approved affiliation sentence), then **Plan your visit** and **What we believe**.
  - *Right:* a photo.
- **In-page nav pills:** Who we are, Why we exist, Heritage, Vision, What we believe, Leadership.
- **Editorial rows**, with the label on the left and the H2 on the right:
  - **Who we are:** a pull-quote of the approved sentence “At the heart of our calling is a simple conviction: God still changes lives.”, then the Who we are paragraphs as they are.
  - **Why we exist:** the intro line, then the four aims as large H4 lines with check icons.
  - **Our message and heritage:** the three paragraphs, plus an aside panel (paper, radius 24) with two figures, both already in approved content: “1973 · DCLM founded as a Bible study of 15 students at the University of Lagos” and “14 · States in our Southwest Region, under Pastor Thompson Aderemi”.
  - **Our vision:** the four commitments as `card-line` rows with check icon tiles, then the closing paragraph.
  - **Our goal:** “A Life That Thrives Now and Forever” paragraphs.
- **Bible doctrines:** an emblem-sky-50 band.
  - *Header, 5/7:* the eyebrow, H2, “Abridged edition · Acts 2:42; 1 Timothy 4:16; Titus 1:9”, and on the right the 1 Timothy 4:16 quote taken **verbatim from the doctrine introduction**.
  - *Below:* `DoctrineCards` as an auto-fill grid (minimum column 320 px) of accordion buttons numbered 01–22. Expanded, each shows the full verbatim text and references. Keep the current disclosure behavior and tests.
- **Leadership:** a white band with three columns (stacking): portrait (4:5, radius 24), role eyebrow, name (serif H3), short bio, and “Read full bio” (the existing disclosure or dialog). Keep the current order from `SITE-CONTENT.md`.

### Ministries (`/ministries`), see `A-Ministries.html`

- **Page header:**
  - *Left:* eyebrow “Ministries & outreach”, H1, lead, then anchor pills for each ministry and Outreach.
  - *Right:* a photo.
- **Ministries:** a white band. Each ministry is an `alt` row: a two-column grid with the photo (3:2, radius 20) and text alternating sides, and the photo first on phones. Each row has an eyebrow (audience, such as “Infants – 6th grade · Sundays” or “Grades 7–12”), an H3 at H2 size (36 px), the summary, and the existing “Send us a message” arrow link to `/contact?topic=…`. Young Adults uses a navy `card-dark` panel instead of a photo, with a serif line taken from its approved text (“On fire for the things of God — no matter the cost.” is acceptable because it restates that text). Keep each `id` anchor.
- **Outreach:** a paper band with a 4/8 grid.
  - *Left:* eyebrow, H2, lead.
  - *Right:* a divided list, one row per area: icon tile (white, soft shadow), H4, text, and an action link.
  - Counseling keeps the crisis notice as a heaven-50 alert with a circled-“i” icon and the 911/988 text exactly as in content.

### Sermons (`/sermons`), see `A-Sermons.html`

- **Page header:**
  - *Left:* eyebrow, H1, lead, then a white card row: “Next live stream · Sunday, 9:30 AM CT” with **Watch on YouTube**.
  - *Right:* the featured message as a figure: the video facade plus a caption with the source label, title and date.
- **Recent services from Lewisville:** a white band with a card grid (3 columns, 2, then 1). Each card: thumbnail with a date tile, title, “Deeper Life Bible Church Lewisville · date”, and a Watch action. Data comes only from the RSS feed and the existing three-state logic; show the honest empty state when there's nothing.
- **From DCLM Headquarters, Lagos:** an emblem-sky-50 `size="md"` band with links to webcast.dclm.org and dclm.org/followus.

### Events (`/events`), see `A-Events.html`

- **Page header:** eyebrow, H1, lead, then a **week strip**: a 7-day grid in a white rounded box with 1 px dividers.
  - Each day shows its name and date; today is marked “Today” with an emblem-sky-50 day header.
  - Event chips are emblem-sky-50, and the Sunday Worship chip is navy-900.
  - Empty days say “No meetings”.
  - The strip becomes a vertical list below 960 px.
  - **Previous week** and **Next week** buttons move by seven days; the week is computed in Central Time from the schedule plus any events.
- **Coming up:** a white band. Special events appear as `datecard` rows: a navy date box (month in emblem-sky-400, day in serif), name, time, location and description, and a Details link. When there are none, show the paper empty-state panel with the existing honest sentence and **Plan your visit**. **Don't** render the mock-up's “How a special event will appear” sample card.
- The **“Add to Google Calendar” and “.ics” buttons** in the mock-up are a new feature. Ask the owner before building them, and leave them out until approved.

### Contact and Prayer (`/contact`), see `A-Contact.html`

- **Page header:**
  - *Left:* eyebrow, H1, lead, then three contact rows with icon tiles: phone (`tel:`), email (`mailto:`), address plus Get directions.
  - *Right:* a photo or the map.
- **Form:** a white band with a 5/7 grid.
  - *Left:* eyebrow, H2, and the paper **Office hours** panel (the approved text).
  - *Right:* the form card, which starts with a **segmented control**: “General message | Prayer request”.
    - Build it as a radio group (`role="radiogroup"` with two radio buttons, or two real `<input type="radio">` styled as segments), not as two plain buttons.
    - It sets the existing topic and subject prefix, and changes the message label and the submit label.
    - With Prayer request selected, show the line “Prayer requests are read by our pastor.” plus the DCLM Prayer Request Hub link.
    - `?topic=` on the URL preselects it.
- **Our other locations:** a paper `size="md"` band of cards: name, address, “[Service times to be confirmed]” as given, and a Get directions link.

### Give (`/give`), see `A-Give.html`

- **Page header:**
  - *Left:* eyebrow, H1, lead, then **See ways to give** (anchor) and **Questions about giving?** (to `/contact?topic=giving`).
  - *Right:* a navy `card-dark` figure with a scripture (§7: needs the church's approval; if not approved, use a photo instead).
- **Three simple ways:** a white band with a divided list: icon tile, H3, text and an action per method.
  - Show the details from `givePage` when they exist.
  - Until then, show the approved placeholder “Information will be provided shortly.” and **no** action button.
  - When real details exist, a **Copy details** button may copy the Zelle or address text, with a polite live-region confirmation.

### Sermon detail (`/sermons/[slug]`)

There's no mock-up for this page, so build it from Direction A pieces:

- **Page header:** the warm variant. Eyebrow “Sermon” plus the source chip (“Lewisville” or “From DCLM Headquarters, Lagos”), the title as H1, and a meta line (speaker and date) in place of the lead. Leave the right column empty and let the text span the full width.
- **Body:** a white band in an 8/4 grid.
  - *Left:* the LiteYouTube facade (radius 18, 84 px play button), then the description at `max-w-prose`.
  - *Right:* a `card-line` aside with Share (the existing ShareButton restyled as a secondary button), “Watch on YouTube”, “All sermons” (ArrowLink), and a “Next live: Sunday, 9:30 AM CT” line from the schedule.
- **More messages:** an emblem-sky-50 `size="md"` band with up to three other recent messages as MiniSermonRow or sermon cards, from the same data as `/sermons`. Hide it if there are none.
- Unknown slugs keep returning a real 404.

### Privacy (`/privacy`) and Terms (`/terms`)

- **Page header:** the warm variant with eyebrow “Legal”, the H1, and a lead built from the “Last updated” date. No photo; the text spans the full width.
- **Body:** a white band using the narrow 880 px container. Use a two-column layout on desktop: a sticky “On this page” list of section links on the left (4 columns) and the text at `max-w-prose` on the right (8 columns), stacking on phones. Headings follow the H2/H3 scale; body is 18 px; links are emblem-sky-700.
- The text itself is unchanged.

### Not found (`app/not-found.tsx`), error (`app/error.tsx`) and global error (`app/global-error.tsx`)

- Render inside the normal header and footer wherever the layout allows it. `global-error.tsx` renders without the layout, so give it a minimal brand bar: the emblem plus the name, on white.
- Body: a paper band with a white `card` (radius 24, padding 48 px, maximum width 640 px, centered). Inside: an icon tile, the H1 (H1 scale), the existing help text with the `tel:` phone link, and the existing actions, restyled as pill buttons. For not-found that's **Home page** (secondary) and Contact (ArrowLink), plus a row of pill links to Visit, Sermons and Events. For error it's **Try again** (primary) and **Home page** (secondary). Keep the error reference line at 14 px ink-muted.
- Keep the existing words and status codes.

### Shared overlays and states

- **Mobile drawer:**
  - full height, white, maximum width 384 px, sliding from the right (no slide with reduced motion)
  - top row with the brand and a 44 px close button styled as an emblem-sky-50 rounded square
  - nav links as 52 px rows with a 1 px `line` divider, the current page in an emblem-sky-50 pill
  - then **Give** (primary, full width) and **Watch online** (secondary, full width)
  - a footer block in the drawer with the Sunday time, address (map link) and `tel:` phone

  Keep the Radix Dialog behavior and tests.
- **Consent banner:**
  - a white card (radius 20, shadow-lg) floating 16 px above the bottom edge, inside the content width (full width minus 16 px gutters on phones)
  - H2 at H4 size, the text and Privacy link, and the two choices as equal-weight secondary pill buttons (neither is red, so declining is as easy as accepting)
  - the page-padding reservation stays
- **Loading and empty states:** skeletons use the `paper` color, at the same radius as the card they replace. Empty states use the EmptyState panel from `DESIGN-SYSTEM.md`.
- **Form success and error:** the Alert component (success and error variants) inside the form card, with the error variant including the phone number as now.

### Routes with no UI to redesign

- `/ministries/[slug]` permanently redirects to `/ministries#slug`; no change.
- `/studio` is Sanity Studio; leave it alone.
- `/dev/names` is the dev-only font test page. Switch it to the new type scale so it tests the real styles, and keep it out of the sitemap and robots.

## 5. Don't copy these from the mock-up

1. **The shortened Pastor's Welcome.** Render the full verbatim text (§3.4).
2. **Mock-up copy in general.** Lines that restate approved content are fine; new claims are not (for example “Help getting your kids settled in Children's Church”). New interface copy is limited to the list in §7.
3. **`href="#"` links** (Zoom, Read full bio, legal links, DCLM resources all pointing to dclm.org). Use real URLs or routes, the “[Zoom link to come]” text, or hide the element.
4. **The always-on live dot.** Show it only while the stream is actually live.
5. **Hard-coded sermon titles and dates.** These come from the RSS feed.
6. **The faint `#C3CCD8` input border.** Form fields keep `border-input` (`#7B8798`, 3.65:1) for WCAG 1.4.11. The light gray is allowed only on secondary buttons and decorative outlines.
7. **Off-token colors** (`#55606E`, `#A9171E`, `#FBE9EA`, `#7A1015`). Map them to `ink-muted`, `heaven-700`, `heaven-50` and `heaven-700`.
8. **Text under 14 px** (the mock-up's 11–13 px labels). The minimum is 14 px. Eyebrows are 14 px bold uppercase; see `DESIGN-SYSTEM.md`.
9. **Nested sections.** The Pastor's Welcome sits inside “When we meet” in the mock-up; build it as a sibling section.
10. **The photo-collage hero and the Events sample card,** which were design alternatives.
11. **Motion without a guard.** The bento image zoom (scale 1.04 over 500 ms) runs only under `prefers-reduced-motion: no-preference`. Everything else stays at 200 ms or less.

## 6. Data and CMS

- No schema changes are needed for the layout itself.
- Inner-page headers need an eyebrow, H1 and lead. If a page singleton (`visitPage`, `aboutPage`, `givePage` and so on) doesn't have fields for them, add optional fields `heroEyebrow`, `heroTitle` and `heroLead` and seed them with the values in §7. This is additive, so no data is lost; it's covered by rule 9's “ask” only if a field would be removed or renamed. Pages without a singleton (Sermons, Events, Contact, Ministries) can take these strings from `lib/content/` until a singleton exists; add them to the seed.
- Ministry tile subtitles and eyebrows come from the ministry's `audience` field. If it's empty, show the title alone.
- Testimony title and summary: render them only if the testimonial document has them (add optional `title` and `summary` fields if you want to support them).

## 7. New interface copy introduced by the design

Short headings and leads that frame approved content. Use them as written, seed them into the CMS where §6 says, and list them in `SITE-CONTENT.md` under a new section “§13 Interface copy (redesign)” so the church can review them. Anything marked **Needs approval** must wait for a yes (add it to “Still missing” and use the fallback until then).

| Where | Copy | Status / fallback |
| --- | --- | --- |
| Home hero H1 | God still changes lives. | Approved (from About) |
| Home hero subtitle | Deeper Life Bible Church Lewisville is a Bible-centered church family on West Main Street. Come as you are — we'd love to worship with you this Sunday. | Use; church to review |
| Home info bar labels | Sunday worship · Find us · Can't make it? | Use |
| Home section eyebrows | Weekly gatherings · A word from our pastor · Your first visit · Sermons · Testimony · Get connected | Use |
| What to expect lead | Visiting a church for the first time can feel like a big step. Here's what a Sunday looks like, so you can walk in already feeling at home. | Use; church to review |
| Ministries preview | H2 “Find your place to grow”; lead “Every ministry has a way to get in touch. We'd love to help you take your next step.” | Use; church to review |
| Footer CTA | “We'd love to meet you this Sunday.” / “Worship with us at 9:30 AM — in person on West Main Street, or online.” (time from the schedule) | Use; church to review |
| Visit header | H1 “We'd love to meet you this Sunday.”; lead “Here's everything you need to know before you arrive — so you can walk in feeling at home.” | Use; church to review |
| About header | H1 “A Bible-centered church family in Lewisville.”; lead = the approved affiliation sentence | Use |
| About section H2s | Changed from the inside out · Grace that transforms, truth that clarifies · Shaped by Scripture since 1973 · The church we're committed to being · A life that thrives now and forever · The people who shepherd us | Use; church to review |
| Ministries header | H1 “Find your place to grow and serve.”; lead “Every ministry has a way to get in touch. Tell us where you'd like to start and we'll help you take the next step.”; Outreach H2 “Serving beyond our walls” | Use; church to review |
| Sermons header | H1 “Hear the Word, wherever you are.”; lead “Watch our services live on Sundays, or catch up on recent messages from Lewisville and DCLM Headquarters.” | Use; church to review |
| Events header | H1 “This week at Deeper Life”; lead “Our weekly meetings and any special events. All times are Central.” | Use |
| Contact header | H1 “We're here for you.”; lead “Call, email or send us a message. Prayer requests go straight to our pastor.” | Approved by the owner, 2 November 2026 |
| Give header | H1 “Give with a cheerful heart.”; lead “Thank you for supporting the work of the Gospel through Deeper Life Bible Church Lewisville. Choose the way that's easiest for you.” | Use; church to review |
| Give scripture card | “Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.” 2 Corinthians 9:7 (KJV) | Approved by the owner, 2 November 2026 |
| Testimony link | Share your testimony | Use |

## 8. Acceptance (Gate 4)

- Every route in the Coverage table is done. Every page matches its reference layout (or, for pages without a mock-up, its §4 spec) at 1440 px, and stacks cleanly at 960, 640, 390 and 320 px with no horizontal scroll.
- Copy is identical to before, apart from the §7 items. A diff of rendered text (for example a Playwright test that collects `main` text per page before and after) shows only §7 changes. Verbatim blocks pass the existing exact-match tests.
- axe reports zero serious or critical violations on every page, in both header tones and with the drawer open.
- Keyboard: overlay and light headers, drawer, in-page nav, accordions, segmented control, week strip buttons and every card link work, with a visible focus ring on light and dark surfaces.
- No `#` links. No live dot unless live. No placeholder rendered except the approved ones.
- Home at 390 px: brand (name and city), Sunday time and **Plan your visit** are visible without scrolling.
- Core Web Vitals within budget: the hero image is under 200 KB via `next/image` with `priority` and `sizes="100vw"`, and the overlap layout causes no CLS.
- Unit tests for the new components (InfoBar, DayTile/ScheduleRow, BentoTile, SegmentedControl, WeekStrip, the header tone switch), and updated e2e tests for each page.