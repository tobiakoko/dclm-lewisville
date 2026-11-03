// New interface copy introduced by the Phase 4 redesign (REDESIGN.md §7, listed for the church in
// SITE-CONTENT.md §13). Facts inside it (times) are filled in from siteSettings by the caller.

export const FOOTER_CTA = {
  title: 'We’d love to meet you this Sunday.',
  /** e.g. "Worship with us at 9:30 AM — in person on West Main Street, or online." */
  line: (time: string) => `Worship with us at ${time} — in person on West Main Street, or online.`,
}
