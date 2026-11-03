import 'server-only'
import { cache } from 'react'
import {
  ABOUT_PAGE_QUERY,
  GIVE_PAGE_QUERY,
  HOME_PAGE_QUERY,
  LEGAL_PAGES_QUERY,
  MINISTRIES_QUERY,
  SERMON_QUERY,
  SITE_SETTINGS_QUERY,
  UPCOMING_EVENTS_QUERY,
  VISIT_PAGE_QUERY,
} from '@/lib/sanity/queries'
import { sanityFetch } from '@/lib/sanity/fetch'
import { fromPortableText } from '@/lib/content/portable-text'
import { plainText, type Paragraph } from '@/lib/content/inline'
import {
  OTHER_LOCATIONS,
  SERVICE_TIMES,
  SITE_CONFIG,
  type OtherLocation,
  type ServiceTime,
  type SiteConfig,
} from '@/lib/constants'
import * as content from '@/lib/content/site'
import { DOCTRINES, DOCTRINES_INTRO, type Doctrine, type DoctrinesIntro } from '@/lib/content/doctrines'
import { TESTIMONY, WAYS_TO_GIVE } from '@/lib/content/extra'
import { ABOUT, GIVE, HOME, VISIT } from '@/lib/content/interface'
import { upcomingEvents, type ChurchEvent } from '@/lib/events'

/**
 * Sanity is the source in production. lib/constants.ts and lib/content are seed data and a
 * development fallback only: production renders an error, never fallback content, if Sanity
 * fails or a document is missing (BUILD-PLAN 3.4, CLAUDE.md rule 5).
 * SANITY_DEV_FALLBACK=true lets CI and local e2e builds use the seed content against an empty
 * dataset; lib/env.ts refuses it on a Vercel production deployment.
 */
export function fallback<T>(what: string, value: () => T): T {
  if (process.env.NODE_ENV === 'production' && process.env.SANITY_DEV_FALLBACK !== 'true') {
    throw new Error(`Sanity content missing: ${what}. Publish it in the Studio (or run the seed).`)
  }
  return value()
}

export interface Photo {
  url: string
  alt: string
  width: number
  height: number
  lqip?: string
}

type RawPhoto = { alt: string; asset: { url: string | null; metadata: { lqip: string | null; dimensions: { width: number; height: number } | null } | null } | null } | null

function toPhoto(raw: RawPhoto): Photo | undefined {
  const dims = raw?.asset?.metadata?.dimensions
  if (!raw?.asset?.url || !dims) return undefined
  return { url: raw.asset.url, alt: raw.alt, width: dims.width, height: dims.height, lqip: raw.asset.metadata?.lqip ?? undefined }
}

// --- Church details --------------------------------------------------------

export interface ScheduleException {
  date: string
  meeting: string
  cancelled: boolean
  note: string
}

export interface SiteData {
  config: SiteConfig
  schedule: ServiceTime[]
  exceptions: ScheduleException[]
  otherLocations: OtherLocation[]
}

export const getSiteData = cache(async (): Promise<SiteData> => {
  const settings = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] })
  if (!settings) {
    return fallback('Church details (siteSettings)', () => ({
      config: SITE_CONFIG,
      schedule: SERVICE_TIMES,
      exceptions: [],
      otherLocations: OTHER_LOCATIONS,
    }))
  }

  const config: SiteConfig = {
    name: settings.name,
    shortName: settings.shortName,
    description: `${settings.name} is a local congregation of ${settings.affiliation}.`,
    url: SITE_CONFIG.url, // deployment setting (NEXT_PUBLIC_SITE_URL), not content
    affiliation: settings.affiliation,
    region: settings.region,
    regionalOverseer: settings.regionalOverseer,
    localPastor: settings.localPastor,
    address: settings.address,
    phone: settings.phone,
    email: settings.email,
    officeHours: settings.officeHours,
    timeZone: settings.timeZone ?? SITE_CONFIG.timeZone,
    youtube: settings.youtube,
    socialMedia: { facebook: settings.socialMedia?.facebook ?? null, instagram: settings.socialMedia?.instagram ?? null },
    dclm: settings.dclm,
  }
  const schedule: ServiceTime[] = settings.schedule.map((service) => ({ ...service, end: service.end ?? null, joinUrl: service.joinUrl ?? null }))
  const sunday = schedule.find((service) => service.day === 'Sunday' && service.mode !== 'online')
  if (sunday) config.description += ` ${sunday.name} ${sunday.start.replace(/^0/, '')} at ${settings.address.street}, ${settings.address.city}.`

  return {
    config,
    schedule,
    exceptions: (settings.scheduleExceptions ?? []).map((exception) => ({ ...exception, cancelled: exception.cancelled ?? false })),
    otherLocations: (settings.otherLocations ?? []).map((location) => ({ ...location })),
  }
})

// --- Pages -----------------------------------------------------------------

/** Inner-page header text; Studio fields are optional and fall back to the approved defaults */
export interface PageHeader {
  eyebrow: string
  title: string
  /** Undefined when neither the Studio nor the defaults give one (the page then builds its own) */
  lead?: string
}

type RawHeader = { heroEyebrow?: string | null; heroTitle?: string | null; heroLead?: string | null } | null

function pageHeader(page: RawHeader, defaults: PageHeader): PageHeader {
  return {
    eyebrow: page?.heroEyebrow || defaults.eyebrow,
    title: page?.heroTitle || defaults.title,
    lead: page?.heroLead || defaults.lead,
  }
}

export interface HomeContent {
  hero: { title: string; subtitle: string }
  whatToExpect: content.TitledText[]
  welcome: { heading: string; paragraphs: Paragraph[] }
  verse: { heading: string; text: string; reference: string }
  testimony: { name: string; title: string; content: string } | null
}

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const data = await sanityFetch({ query: HOME_PAGE_QUERY, tags: ['homePage', 'testimonial'] })
  if (!data.page) {
    return fallback('Home page', () => ({
      hero: HOME.hero,
      whatToExpect: content.WHAT_TO_EXPECT,
      welcome: content.PASTORS_WELCOME,
      verse: content.BIBLE_VERSE,
      testimony: TESTIMONY,
    }))
  }
  const { page } = data
  return {
    hero: { title: page.heroTitle, subtitle: page.heroSubtitle },
    whatToExpect: page.whatToExpect.map((item) => ({ title: item.title, body: fromPortableText(item.body)[0] ?? [] })),
    welcome: { heading: page.welcomeHeading, paragraphs: fromPortableText(page.welcome) },
    verse: { heading: content.BIBLE_VERSE.heading, text: page.verse?.text ?? '', reference: page.verse?.reference ?? '' },
    testimony: data.testimony,
  }
})

export interface VisitContent {
  header: PageHeader
  serviceLines: Paragraph[]
  sections: content.TitledText[]
}

export const getVisitContent = cache(async (): Promise<VisitContent> => {
  const page = await sanityFetch({ query: VISIT_PAGE_QUERY, tags: ['visitPage'] })
  if (!page) {
    return fallback('Plan Your Visit page', () => ({
      header: pageHeader(null, VISIT),
      serviceLines: content.VISIT_SERVICE_LINES,
      sections: content.VISIT_SECTIONS,
    }))
  }
  return {
    header: pageHeader(page, VISIT),
    serviceLines: fromPortableText(page.serviceLines),
    sections: page.sections.map((section) => ({ title: section.title, body: fromPortableText(section.body)[0] ?? [] })),
  }
})

export type LeaderWithPhoto = Omit<content.Leader, 'id'> & { id: string; photo?: Photo }

export interface AboutContent {
  header: PageHeader
  whoWeAre: { title: string; paragraphs: Paragraph[] }
  story: content.AboutSection[]
  doctrinesIntro: DoctrinesIntro
  doctrines: Doctrine[]
  leaders: LeaderWithPhoto[]
}

export const getAboutContent = cache(async (): Promise<AboutContent> => {
  const data = await sanityFetch({ query: ABOUT_PAGE_QUERY, tags: ['aboutPage', 'doctrine', 'person'] })
  if (!data.page || data.doctrines.length === 0 || data.leaders.length === 0) {
    return fallback('About page, doctrines or leaders', () => ({
      header: pageHeader(null, ABOUT),
      whoWeAre: content.WHO_WE_ARE,
      story: content.OUR_STORY,
      doctrinesIntro: DOCTRINES_INTRO,
      doctrines: DOCTRINES,
      leaders: content.LEADERS,
    }))
  }
  return {
    header: pageHeader(data.page, ABOUT),
    whoWeAre: { title: data.page.whoWeAre.title, paragraphs: fromPortableText(data.page.whoWeAre.body) },
    story: data.page.story.map((part) => ({
      title: part.title,
      paragraphs: fromPortableText(part.body),
      list: part.list ?? [],
      closing: fromPortableText(part.closing),
    })),
    doctrinesIntro: data.page.doctrinesIntro ?? DOCTRINES_INTRO,
    doctrines: data.doctrines,
    leaders: data.leaders.map((leader) => ({
      id: leader.id,
      name: leader.name,
      title: leader.title,
      subtitle: leader.subtitle,
      shortBio: fromPortableText(leader.shortBio)[0] ?? [],
      fullBio: fromPortableText(leader.fullBio),
      photo: toPhoto(leader.photo),
    })),
  }
})

export type MinistryWithDetails = content.Ministry & {
  audience?: string
  meetingInfo?: string
  contactEmail?: string
  photo?: Photo
}

type RawMinistry = {
  slug: string
  name: string
  body: unknown
  audience: string | null
  meetingInfo: string | null
  contactEmail: string | null
  photo?: RawPhoto
}

function toMinistry(raw: RawMinistry): MinistryWithDetails {
  return {
    slug: raw.slug,
    name: raw.name,
    paragraphs: fromPortableText(raw.body as Parameters<typeof fromPortableText>[0]),
    audience: raw.audience ?? undefined,
    meetingInfo: raw.meetingInfo ?? undefined,
    contactEmail: raw.contactEmail ?? undefined,
    photo: raw.photo ? toPhoto(raw.photo) : undefined,
  }
}

export const getMinistries = cache(async (): Promise<{ ministries: MinistryWithDetails[]; outreach: MinistryWithDetails[] }> => {
  const data = await sanityFetch({ query: MINISTRIES_QUERY, tags: ['ministry', 'outreachArea'] })
  if (data.ministries.length === 0) {
    return fallback('Ministries', () => ({ ministries: content.MINISTRIES, outreach: content.OUTREACH }))
  }
  return { ministries: data.ministries.map(toMinistry), outreach: data.outreach.map(toMinistry) }
})

export async function getMinistry(slug: string): Promise<MinistryWithDetails | null> {
  const { ministries, outreach } = await getMinistries()
  return [...ministries, ...outreach].find((ministry) => ministry.slug === slug) ?? null
}

export interface GiveContent {
  header: PageHeader
  ways: { title: string; detail: string }[]
}

export const getGiveContent = cache(async (): Promise<GiveContent> => {
  const page = await sanityFetch({ query: GIVE_PAGE_QUERY, tags: ['givePage'] })
  if (!page) return fallback('Give page', () => ({ header: pageHeader(null, GIVE), ways: [...WAYS_TO_GIVE] }))
  return { header: pageHeader(page, GIVE), ways: page.ways }
})

export interface LegalContent {
  lastUpdated: string
  effectiveDate: string
  privacy: Paragraph[]
  copyright: Paragraph[]
  waiver: Paragraph[]
}

export const getLegalContent = cache(async (): Promise<LegalContent> => {
  const page = await sanityFetch({ query: LEGAL_PAGES_QUERY, tags: ['legalPages'] })
  if (!page) {
    return fallback('Privacy and Terms', () => ({
      lastUpdated: content.LEGAL_LAST_UPDATED,
      effectiveDate: content.PRIVACY_POLICY.effectiveDate,
      privacy: content.PRIVACY_POLICY.paragraphs,
      copyright: content.COPYRIGHT_POLICY,
      waiver: content.WAIVER_AND_RELEASE,
    }))
  }
  return {
    lastUpdated: page.lastUpdated,
    effectiveDate: page.effectiveDate,
    // The "Contact." line is rendered from Church details, so drop it if an editor adds one
    privacy: fromPortableText(page.privacy).filter((paragraph) => !plainText(paragraph).startsWith('Contact.')),
    copyright: fromPortableText(page.copyright),
    waiver: fromPortableText(page.waiver),
  }
})

export async function getUpcomingEvents(now: Date): Promise<ChurchEvent[]> {
  const events = await sanityFetch({ query: UPCOMING_EVENTS_QUERY, params: { now: now.toISOString() }, tags: ['event'] })
  // The query already filters; this keeps the "never past" rule in one tested function too
  return upcomingEvents(
    events.map((event) => ({ ...event, end: event.end ?? undefined, registrationUrl: event.registrationUrl ?? undefined })),
    now
  )
}

export async function getSermon(slug: string) {
  return sanityFetch({ query: SERMON_QUERY, params: { slug }, tags: ['sermon'] })
}
