import { defineQuery } from 'next-sanity'

// Every query the site runs. `npm run typegen` turns these into result types in
// sanity/types.generated.ts.

const IMAGE = /* groq */ `{ alt, asset->{ url, metadata { lqip, dimensions { width, height } } } }`

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  name, shortName, affiliation, region, regionalOverseer, localPastor,
  address, phone, email, officeHours, timeZone,
  schedule[]{ "id": key.current, name, day, start, end, mode, description, joinUrl },
  scheduleExceptions[]{ date, meeting, cancelled, note },
  youtube, socialMedia, dclm,
  otherLocations[]{ name, address, serviceTimes }
}`)

export const HOME_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "homePage" && _id == "homePage"][0]{ heroTitle, heroSubtitle, whatToExpect[]{ title, body }, welcomeHeading, welcome, verse },
  "testimony": *[_type == "testimonial" && featured == true] | order(_updatedAt desc)[0]{ name, title, content }
}`)

export const VISIT_PAGE_QUERY = defineQuery(`*[_type == "visitPage" && _id == "visitPage"][0]{ heroEyebrow, heroTitle, heroLead, serviceLines, sections[]{ title, body } }`)

export const ABOUT_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "aboutPage" && _id == "aboutPage"][0]{ heroEyebrow, heroTitle, heroLead, whoWeAre{ title, body }, story[]{ title, body, list, closing }, doctrinesIntro },
  "doctrines": *[_type == "doctrine"] | order(order asc){ "id": _id, title, body, references },
  "leaders": *[_type == "person"] | order(order asc){ "id": key.current, name, title, subtitle, shortBio, fullBio, photo ${IMAGE} }
}`)

export const MINISTRIES_QUERY = defineQuery(`{
  "ministries": *[_type == "ministry"] | order(order asc){ "slug": slug.current, name, body, audience, meetingInfo, contactEmail, photo ${IMAGE} },
  "outreach": *[_type == "outreachArea"] | order(order asc){ "slug": slug.current, name, body, audience, meetingInfo, contactEmail, photo ${IMAGE} }
}`)

export const UPCOMING_EVENTS_QUERY = defineQuery(`*[_type == "event" && coalesce(end, start) >= $now] | order(start asc){
  "id": _id, title, start, end, location, mode, registrationUrl
}`)

export const GIVE_PAGE_QUERY = defineQuery(`*[_type == "givePage" && _id == "givePage"][0]{ heroEyebrow, heroTitle, heroLead, ways[]{ title, detail } }`)

export const LEGAL_PAGES_QUERY = defineQuery(`*[_type == "legalPages" && _id == "legalPages"][0]{ lastUpdated, effectiveDate, privacy, copyright, waiver }`)

export const SERMON_QUERY = defineQuery(`*[_type == "sermon" && slug.current == $slug][0]{
  title, speaker, date, youtubeId, source, description
}`)

export const SERMON_SLUGS_QUERY = defineQuery(`*[_type == "sermon" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`)

/** Sanity document types that feed each cache tag; the webhook revalidates by type */
export const TAGS = {
  siteSettings: 'siteSettings',
  homePage: 'homePage',
  visitPage: 'visitPage',
  aboutPage: 'aboutPage',
  givePage: 'givePage',
  legalPages: 'legalPages',
  person: 'person',
  ministry: 'ministry',
  outreachArea: 'outreachArea',
  doctrine: 'doctrine',
  event: 'event',
  sermon: 'sermon',
  testimonial: 'testimonial',
} as const

export type SanityTag = (typeof TAGS)[keyof typeof TAGS]
