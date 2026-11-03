// Branch facts, weekly schedule and navigation: the single source for every fact on the site
// until Phase 3 moves them into the Sanity `siteSettings` singleton.
// Values come from docs/build/SITE-CONTENT.md §1, §2 and §8. Never invent one; use null or a
// placeholder from that file, and list it under "Still missing".

// Type definitions
export interface NavLink {
  name: string
  href: string
  highlight?: boolean
}

export interface PostalAddress {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface SiteConfig {
  name: string
  /** Header label (DESIGN-SYSTEM.md, Layout) */
  shortName: string
  description: string
  url: string
  affiliation: string
  region: string
  regionalOverseer: string
  localPastor: string
  address: PostalAddress
  phone: string
  email: string
  officeHours: string
  timeZone: string
  youtube: {
    /** Channel ID for the public RSS feed and live check */
    channelId: string
    channel: string
    streams: string
  }
  /** null until the church provides the link; the icon is hidden while null */
  socialMedia: {
    facebook: string | null
    instagram: string | null
  }
  dclm: {
    prayerRequestHub: string
    webcast: string
    followUs: string
    /** DCLM headquarters YouTube channel, as linked from dclm.org/followus */
    youtubeChannelId: string
  }
}

export type ServiceMode = 'in-person' | 'online' | 'both'
export type ServiceDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export interface ServiceTime {
  id: string
  name: string
  day: ServiceDay
  /** 24-hour "HH:MM", Central Time */
  start: string
  /** 24-hour "HH:MM", or null when the church hasn't given an end time */
  end: string | null
  mode: ServiceMode
  description: string
  joinUrl: string | null
}

export interface OtherLocation {
  name: string
  address: PostalAddress
  serviceTimes: string
}

/** Shown wherever a Zoom or online link is still missing (SITE-CONTENT.md §1) */
export const ZOOM_PLACEHOLDER = '[Zoom link to come]'
export const ONLINE_LINK_PLACEHOLDER = '[online link to come]'

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@DeeperLifeBibleChurchLewisvill'
const NAME = 'Deeper Life Bible Church Lewisville'
const AFFILIATION = 'Deeper Christian Life Ministry (DCLM)'
const ADDRESS: PostalAddress = {
  street: '1368 W Main St',
  city: 'Lewisville',
  state: 'TX',
  zip: '75067',
  country: 'US',
}

/** "1368 W Main St, Lewisville, TX 75067" */
export function formatAddress(address: PostalAddress): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}`
}

/** Google Maps search link for an address */
export function mapsUrl(address: PostalAddress): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress(address))}`
}

/** "tel:+14699396994" from a US number written as "(469) 939-6994" */
export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`
}

// Site Configuration
export const SITE_CONFIG: SiteConfig = {
  name: NAME,
  shortName: 'Deeper Life Bible Church · Lewisville',
  description: `${NAME} is a local congregation of ${AFFILIATION}. Sunday Worship Service 9:30 AM at ${formatAddress(ADDRESS)}.`,
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://deeperlifelewisville.org',
  affiliation: AFFILIATION,
  region: 'Southwest Region',
  regionalOverseer: 'Pastor Thompson Aderemi',
  localPastor: 'Pastor Joseph Agbo',
  address: ADDRESS,
  phone: '(469) 939-6994',
  email: 'info@deeperlifelewisville.org',
  officeHours:
    'Our church is run by volunteers, so the best time to reach us is during service hours: Sunday 9:30 AM–12:00 PM, and Tuesday and Friday 7:00–9:00 PM. At other times, send us a message or email and we’ll get back to you.',
  timeZone: 'America/Chicago',
  youtube: {
    // Confirmed from the channel page's canonical URL on 2 November 2026
    channelId: 'UC1yfxOgjHhTWe49OK61Q30w',
    channel: YOUTUBE_CHANNEL,
    streams: `${YOUTUBE_CHANNEL}/streams`,
  },
  // TODO(content): Facebook and Instagram links (official accounts exist; links to come)
  socialMedia: {
    facebook: null,
    instagram: null,
  },
  dclm: {
    prayerRequestHub: 'https://dclm.org/?p=89',
    webcast: 'https://webcast.dclm.org/',
    followUs: 'https://dclm.org/followus/',
    // youtube.com/dclmhq ("Deeper Christian Life Ministry"), confirmed 2 November 2026
    youtubeChannelId: 'UC4zsqN5YdXfxkkdVvwNA3JA',
  },
}

// Weekly schedule (SITE-CONTENT.md §2 and §4)
// TODO(content): Zoom links for Sunday prayer, Monday, Tuesday and Friday
export const SERVICE_TIMES: ServiceTime[] = [
  {
    id: 'sunday-prayer',
    name: 'Sunday Prayer',
    day: 'Sunday',
    start: '09:00',
    end: null,
    mode: 'online',
    description: 'Before the service, we pray together online, and you’re welcome to join us.',
    joinUrl: null,
  },
  {
    id: 'sunday-worship',
    name: 'Sunday Worship Service',
    day: 'Sunday',
    start: '09:30',
    end: '12:00',
    mode: 'both',
    description: 'Our main service, an awesome and refreshing time in God’s presence.',
    joinUrl: `${YOUTUBE_CHANNEL}/streams`,
  },
  {
    id: 'monday-prayer',
    name: 'Monday Prayer Meeting',
    day: 'Monday',
    start: '19:00',
    end: '20:00',
    mode: 'online',
    description: 'An hour of prayer together.',
    joinUrl: null,
  },
  {
    id: 'tuesday-bible-study',
    name: 'Tuesday Bible Study',
    day: 'Tuesday',
    start: '19:00',
    end: '21:00',
    mode: 'both',
    description: 'A midweek Bible teaching service with systematic, expository study of God’s Word.',
    joinUrl: null,
  },
  {
    id: 'friday-revival-hour',
    name: 'Friday Revival Hour',
    day: 'Friday',
    start: '19:00',
    end: '21:00',
    mode: 'both',
    description: 'A midweek service of prayer, spiritual revival, and evangelism training.',
    joinUrl: null,
  },
]

// Other Deeper Life locations in Dallas–Fort Worth (SITE-CONTENT.md §8)
// TODO(content): Denton and Dallas service times; other DFW locations
export const OTHER_LOCATIONS: OtherLocation[] = [
  {
    name: 'Deeper Life Bible Church Denton',
    address: { street: '4981 Barthold Rd', city: 'Denton', state: 'TX', zip: '76207', country: 'US' },
    serviceTimes: '[Service times to be confirmed]',
  },
  {
    name: 'Deeper Life Bible Church Dallas',
    address: { street: '202 Beckleymeade Ave', city: 'Dallas', state: 'TX', zip: '75232', country: 'US' },
    serviceTimes: '[Service times to be confirmed]',
  },
]

// Main navigation (DESIGN-SYSTEM.md, Layout). "Give" is the header's one primary action.
export const NAV_LINKS: NavLink[] = [
  { name: 'Visit', href: '/visit' },
  { name: 'About', href: '/about' },
  { name: 'Ministries', href: '/ministries' },
  { name: 'Sermons', href: '/sermons' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
]

export const GIVE_LINK: NavLink = { name: 'Give', href: '/give', highlight: true }

// DCLM resources, listed in the footer
export const DCLM_RESOURCES: NavLink[] = [
  { name: 'DCLM Blog', href: 'https://blog.dclm.org/' },
  { name: 'DCLM Radio', href: 'https://radio.dclm.org/' },
  { name: 'DCLM Tracts', href: 'https://dclm.org/tracts/' },
  { name: 'Daily Manna', href: 'https://dailymanna.app/category/daily-manna/' },
  { name: 'Higher Everyday', href: 'https://dailymanna.app/category/higher-everyday/' },
  { name: 'Sincere Milk', href: 'https://dailymanna.app/category/sincere-milk/' },
]
