// New interface copy introduced by the Phase 4 redesign (REDESIGN.md §7, listed for the church in
// SITE-CONTENT.md §13). Facts inside it (times) are filled in from siteSettings by the caller.

export const FOOTER_CTA = {
  title: 'We’d love to meet you this Sunday.',
  /** e.g. "Worship with us at 9:30 AM — in person on West Main Street, or online." */
  line: (time: string) => `Worship with us at ${time} — in person on West Main Street, or online.`,
}

export const HOME = {
  /** The hero H1 (approved, from About) and its sentence; seeded into homePage.heroTitle and heroSubtitle */
  hero: {
    title: 'God still changes lives.',
    subtitle:
      'Deeper Life Bible Church Lewisville is a Bible-centered church family on West Main Street. Come as you are — we’d love to worship with you this Sunday.',
  },
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

export const VISIT = {
  eyebrow: 'Plan your visit',
  title: 'We’d love to meet you this Sunday.',
  lead: 'Here’s everything you need to know before you arrive — so you can walk in feeling at home.',
  facts: { when: 'When', where: 'Where', howLong: 'How long' },
  nav: {
    times: 'Service times',
    gettingHere: 'Getting here',
    sunday: 'Your Sunday',
    family: 'Kids & what to wear',
    letUsKnow: 'Let us know',
  },
  rows: {
    gettingHere: 'Getting here & parking',
    sunday: 'Your Sunday, step by step',
    family: 'For the whole family',
    first: 'Get to know us first',
  },
  /** Restates the approved "After your visit" text (REDESIGN.md §4, Visit 06) */
  checklist: ['An usher will welcome you and walk you through the next steps', 'A church card for first-time guests'],
}

export const ABOUT = {
  eyebrow: 'About us',
  title: 'A Bible-centered church family in Lewisville.',
  nav: {
    whoWeAre: 'Who we are',
    why: 'Why we exist',
    heritage: 'Heritage',
    vision: 'Vision',
    beliefs: 'What we believe',
    leadership: 'Leadership',
  },
  /** Section H2s, keyed by the approved section title, which becomes the eyebrow */
  headings: {
    'Who we are': 'Changed from the inside out',
    'Why We Exist': 'Grace that transforms, truth that clarifies',
    'Our Message and Heritage': 'Shaped by Scripture since 1973',
    'Our Vision': 'The church we’re committed to being',
    'A Life That Thrives Now and Forever': 'A life that thrives now and forever',
  } as Record<string, string>,
  /** The approved sentence from "Who we are" set as a pull-quote */
  pullQuote: 'At the heart of our calling is a simple conviction: God still changes lives.',
  /** Restated from approved bios (Pastor Kumuyi's short bio; Pastor Aderemi's verbatim bio) */
  figures: (region: string, overseer: string) => [
    { value: '1973', label: 'DCLM founded as a Bible study of 15 students at the University of Lagos' },
    { value: '14', label: `States in our ${region}, under ${overseer}` },
  ],
  leadershipTitle: 'The people who shepherd us',
}

export const MINISTRIES_PAGE = {
  eyebrow: 'Ministries & outreach',
  title: 'Find your place to grow and serve.',
  lead: 'Every ministry has a way to get in touch. Tell us where you’d like to start and we’ll help you take the next step.',
  outreachTitle: 'Serving beyond our walls',
  /** Restates the approved Young Adults text ("on fire for the things of God … no matter the cost") */
  youngAdultsLine: 'On fire for the things of God — no matter the cost.',
}

export const SERMONS = {
  eyebrow: 'Sermons',
  title: 'Hear the Word, wherever you are.',
  lead: 'Watch our services live on Sundays, or catch up on recent messages from Lewisville and DCLM Headquarters.',
}

export const EVENTS = {
  eyebrow: 'Events',
  title: 'This week at Deeper Life',
  lead: 'Our weekly meetings and any special events. All times are Central.',
}

export const CONTACT = {
  eyebrow: 'Contact',
  /** Approved by the owner, 2 November 2026 */
  title: 'We’re here for you.',
  lead: 'Call, email or send us a message. Prayer requests go straight to our pastor.',
}

export const GIVE = {
  eyebrow: 'Give',
  title: 'Give with a cheerful heart.',
  lead: 'Thank you for supporting the work of the Gospel through Deeper Life Bible Church Lewisville. Choose the way that’s easiest for you.',
  /** Approved by the owner, 2 November 2026 (KJV) */
  scripture: {
    text: '“Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.”',
    reference: '2 Corinthians 9:7 (KJV)',
  },
}
