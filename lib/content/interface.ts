// New interface copy introduced by the Phase 4 redesign (REDESIGN.md §7, listed for the church in
// SITE-CONTENT.md §13). Facts inside it (times) are filled in from siteSettings by the caller.

export const FOOTER_CTA = {
  title: 'We’d love to meet you this Sunday.',
  /** e.g. "Worship with us at 9:30 AM — in person on West Main Street, or online." */
  line: (time: string) => `Worship with us at ${time} — in person on West Main Street, or online.`,
}

export const HOME = {
  infoBar: { worship: 'Sunday worship', findUs: 'Find us', cantMakeIt: 'Can’t make it?' },
  eyebrows: {
    meet: 'Weekly gatherings',
    welcome: 'A word from our pastor',
    expect: 'Your first visit',
    sermons: 'Sermons',
    testimony: 'Testimony',
    ministries: 'Get connected',
  },
  expectLead:
    'Visiting a church for the first time can feel like a big step. Here’s what a Sunday looks like, so you can walk in already feeling at home.',
  ministries: {
    title: 'Find your place to grow',
    lead: 'Every ministry has a way to get in touch. We’d love to help you take your next step.',
  },
  testimonyLink: 'Share your testimony',
  /** Restates the approved "about two and a half hours … singing, prayer, Bible study … and teaching" */
  serviceLength: { title: 'About 2½ hours', line: 'Singing, prayer, Bible study and teaching' },
}

/** The pull-quote the welcome may lift, exactly as written in the verbatim text (REDESIGN.md §3.4) */
export const WELCOME_PULL_QUOTE = 'At Deeper Life Bible Church Lewisville, you will never be “lost in the crowd.”'
