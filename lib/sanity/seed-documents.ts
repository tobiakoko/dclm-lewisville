// Every Sanity document the site starts with, built from lib/constants.ts and lib/content
// (BUILD-PLAN 3.3). Pure: scripts/seed-sanity.ts writes these; tests check them.
// Relative imports only, so the seed script can run outside Next.js.
import { SITE_CONFIG, SERVICE_TIMES, OTHER_LOCATIONS } from '../constants'
import { toPortableText } from '../content/portable-text'
import { DOCTRINES, DOCTRINES_INTRO } from '../content/doctrines'
import {
  BIBLE_VERSE,
  COPYRIGHT_POLICY,
  HOME_HERO,
  LEADERS,
  LEGAL_LAST_UPDATED,
  MINISTRIES,
  OUTREACH,
  OUR_STORY,
  PASTORS_WELCOME,
  PRIVACY_POLICY,
  VISIT_SECTIONS,
  VISIT_SERVICE_LINES,
  WAIVER_AND_RELEASE,
  WHAT_TO_EXPECT,
  WHO_WE_ARE,
} from '../content/site'
import { TESTIMONY, WAYS_TO_GIVE } from '../content/extra'

export interface SeedDocument {
  _id: string
  _type: string
  [field: string]: unknown
}

const slug = (current: string) => ({ _type: 'slug', current })
const keyed = <T extends object>(items: T[], prefix: string) => items.map((item, index) => ({ _key: `${prefix}${index}`, ...item }))

/** Leaders whose bios are VERBATIM blocks in SITE-CONTENT.md */
const VERBATIM_LEADERS = new Set(['aderemi', 'agbo'])

export function buildSeedDocuments(): SeedDocument[] {
  const siteSettings: SeedDocument = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: SITE_CONFIG.name,
    shortName: SITE_CONFIG.shortName,
    affiliation: SITE_CONFIG.affiliation,
    region: SITE_CONFIG.region,
    regionalOverseer: SITE_CONFIG.regionalOverseer,
    localPastor: SITE_CONFIG.localPastor,
    address: { _type: 'postalAddress', ...SITE_CONFIG.address },
    phone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    officeHours: SITE_CONFIG.officeHours,
    timeZone: SITE_CONFIG.timeZone,
    schedule: SERVICE_TIMES.map((service) => ({
      _key: service.id,
      _type: 'serviceTime',
      key: slug(service.id),
      name: service.name,
      day: service.day,
      start: service.start,
      ...(service.end ? { end: service.end } : {}),
      mode: service.mode,
      description: service.description,
      ...(service.joinUrl ? { joinUrl: service.joinUrl } : {}),
    })),
    scheduleExceptions: [],
    youtube: { ...SITE_CONFIG.youtube },
    socialMedia: Object.fromEntries(Object.entries(SITE_CONFIG.socialMedia).filter(([, url]) => url !== null)),
    dclm: { ...SITE_CONFIG.dclm },
    otherLocations: keyed(
      OTHER_LOCATIONS.map((location) => ({
        _type: 'otherLocation',
        name: location.name,
        address: { _type: 'postalAddress', ...location.address },
        serviceTimes: location.serviceTimes,
      })),
      'loc'
    ),
  }

  const homePage: SeedDocument = {
    _id: 'homePage',
    _type: 'homePage',
    heroTitle: HOME_HERO.title,
    heroSubtitle: HOME_HERO.subtitle,
    whatToExpect: keyed(
      WHAT_TO_EXPECT.map((item, index) => ({ _type: 'titledText', title: item.title, body: toPortableText([item.body], `e${index}p`) })),
      'expect'
    ),
    welcomeHeading: PASTORS_WELCOME.heading,
    welcome: toPortableText(PASTORS_WELCOME.paragraphs, 'w'),
    verse: { text: BIBLE_VERSE.text, reference: BIBLE_VERSE.reference },
  }

  const visitPage: SeedDocument = {
    _id: 'visitPage',
    _type: 'visitPage',
    serviceLines: toPortableText(VISIT_SERVICE_LINES, 'line'),
    sections: keyed(
      VISIT_SECTIONS.map((section, index) => ({ _type: 'titledText', title: section.title, body: toPortableText([section.body], `v${index}p`) })),
      'section'
    ),
  }

  const aboutPage: SeedDocument = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    whoWeAre: { _type: 'titledText', title: WHO_WE_ARE.title, body: toPortableText(WHO_WE_ARE.paragraphs, 'who') },
    story: keyed(
      OUR_STORY.map((part, index) => ({
        _type: 'storySection',
        title: part.title,
        body: toPortableText(part.paragraphs, `s${index}b`),
        list: part.list,
        closing: toPortableText(part.closing, `s${index}c`),
      })),
      'story'
    ),
    doctrinesIntro: { ...DOCTRINES_INTRO },
  }

  const givePage: SeedDocument = {
    _id: 'givePage',
    _type: 'givePage',
    ways: keyed(WAYS_TO_GIVE.map((way) => ({ _type: 'wayToGive', ...way })), 'way'),
  }

  const legalPages: SeedDocument = {
    _id: 'legalPages',
    _type: 'legalPages',
    lastUpdated: LEGAL_LAST_UPDATED,
    effectiveDate: PRIVACY_POLICY.effectiveDate,
    privacy: toPortableText(PRIVACY_POLICY.paragraphs, 'priv'),
    copyright: toPortableText(COPYRIGHT_POLICY, 'copy'),
    waiver: toPortableText(WAIVER_AND_RELEASE, 'waiv'),
  }

  const people: SeedDocument[] = LEADERS.map((leader, index) => ({
    _id: `person.${leader.id}`,
    _type: 'person',
    key: slug(leader.id),
    name: leader.name,
    title: leader.title,
    subtitle: leader.subtitle,
    shortBio: toPortableText([leader.shortBio], 'short'),
    fullBio: toPortableText(leader.fullBio, 'full'),
    verbatim: VERBATIM_LEADERS.has(leader.id),
    order: index,
  }))

  const ministries: SeedDocument[] = [
    ...MINISTRIES.map((ministry, index) => ({ type: 'ministry', ministry, index })),
    ...OUTREACH.map((ministry, index) => ({ type: 'outreachArea', ministry, index })),
  ].map(({ type, ministry, index }) => ({
    _id: `${type}.${ministry.slug}`,
    _type: type,
    name: ministry.name,
    slug: slug(ministry.slug),
    body: toPortableText(ministry.paragraphs, 'm'),
    order: index,
  }))

  const doctrines: SeedDocument[] = DOCTRINES.map((doctrine, index) => ({
    _id: `doctrine.${doctrine.id}`,
    _type: 'doctrine',
    title: doctrine.title,
    body: doctrine.body,
    references: doctrine.references,
    order: index + 1,
  }))

  const testimonial: SeedDocument = {
    _id: 'testimonial.bro-k',
    _type: 'testimonial',
    name: TESTIMONY.name,
    title: TESTIMONY.title,
    content: TESTIMONY.content,
    featured: true,
  }

  return [siteSettings, homePage, visitPage, aboutPage, givePage, legalPages, ...people, ...ministries, ...doctrines, testimonial]
}
