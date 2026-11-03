# Redesign reference files

These are exports of the approved design canvas, “DLBC Lewisville Redesign” (Direction A plus the home page and shared header and footer). They are **reference only**. Don't import them, copy their markup wholesale, or serve them. Rebuild each page with the existing React components and Tailwind tokens, following `../REDESIGN.md` and `../DESIGN-SYSTEM.md`.

| File | What it shows |
| --- | --- |
| `styles.css` | The design's shared stylesheet: exact sizes, radii, shadows, spacing and breakpoints. Translate values into Tailwind tokens and utilities; don't import the file |
| `Header.html`, `Footer.html` | Shared header (light and overlay tones) and footer |
| `Main.html` | Home page |
| `A-Visit.html`, `A-About.html`, `A-Ministries.html`, `A-Sermons.html`, `A-Events.html`, `A-Contact.html`, `A-Give.html` | Inner pages, Direction A (“Warm Editorial”) |

How to read them:

- The files use the canvas's own format (`<x-dc>`, `<sc-for>`, `<sc-if>`, `{{…}}` holes, `<dc-import>` for the shared header and footer). Read them for layout, hierarchy and spacing, not as code.
- `src="/_blob/…"` images are canvas uploads. Use the matching photo from `app/assets/` (or Sanity) by subject: congregation group photo (`congregation.jpeg`), musician at the piano (`MusicMinistry.jpeg`), child reading at the pulpit (`Children_Ministry.jpeg`), Women's Ministry (`women_ministry.jpeg`), young people standing in prayer (`YouthMinistry.jpeg` or `CongregationPrayer.jpeg`), Men's Ministry (`men_ministry.jpeg`), the three leader portraits, and the emblem (`public/dclm_logo.png`). Sermon thumbnails come from the YouTube RSS feed.
- Text in these files is a mock-up. Words on the site still come from Sanity and `SITE-CONTENT.md`. `REDESIGN.md` lists the few pieces of new interface copy the design introduces and which may be used.
- Known mistakes in the mock-up (shortened Pastor's Welcome, `href="#"` links, an always-on live dot, faint input borders, and more) are listed in `REDESIGN.md` under "Don't copy these from the mock-up".
