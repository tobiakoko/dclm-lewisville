// Typed views over the approved copy in approved.generated.ts and verbatim.generated.ts.
// Only structure is added here (labels, cards, ids); every word comes from SITE-CONTENT.md.
import * as approved from './approved.generated'
import * as verbatim from './verbatim.generated'
import { plainText, type Inline, type Paragraph } from './inline'

const DASH = ' – '

/** "Label – text" → { label, body }; null when the paragraph has no label */
function splitLabel(paragraph: Paragraph): { label: string; body: Paragraph } | null {
  const [first, ...rest] = paragraph
  if (typeof first !== 'string' || !first.includes(DASH)) return null
  const index = first.indexOf(DASH)
  const tail = first.slice(index + DASH.length)
  return { label: first.slice(0, index), body: tail ? [tail, ...rest] : rest }
}

/** First line of a paragraph and the remainder ("Title\nBody") */
function splitFirstLine(paragraph: Paragraph): { first: string; rest: Paragraph } {
  const [head, ...tail] = paragraph
  if (typeof head !== 'string' || !head.includes('\n')) {
    throw new Error(`Expected a line break in "${plainText(paragraph).slice(0, 40)}"`)
  }
  const index = head.indexOf('\n')
  return { first: head.slice(0, index), rest: [head.slice(index + 1), ...tail] }
}

function lines(paragraph: Paragraph): string[] {
  return plainText(paragraph).split('\n')
}

function expectValue<T>(value: T | null | undefined, what: string): T {
  if (value === null || value === undefined) throw new Error(`SITE-CONTENT.md structure changed: ${what}`)
  return value
}

// --- Home (§3) -------------------------------------------------------------

export interface TitledText {
  title: string
  body: Paragraph
}

const [heroParagraph, ...expectParagraphs] = approved.homeHero
const heroLines = lines(heroParagraph)

export const HOME_HERO = {
  title: heroLines[0],
  subtitle: heroLines[1],
}

export const WHAT_TO_EXPECT: TitledText[] = expectParagraphs.map((paragraph) => {
  const { first, rest } = splitFirstLine(paragraph)
  return { title: first, body: rest }
})

const verseText = plainText(expectValue(approved.bibleVerse[0], 'Bible verse'))
const verseMatch = expectValue(/^([\s\S]*”) \((.+)\)$/.exec(verseText), 'Bible verse reference')

export const BIBLE_VERSE = {
  heading: 'The Bible Verse We Live By',
  text: verseMatch[1],
  reference: verseMatch[2],
}

export const PASTORS_WELCOME = {
  heading: plainText(verbatim.pastorsWelcome[0]),
  paragraphs: verbatim.pastorsWelcome.slice(1),
}

// --- About (§5) ------------------------------------------------------------

export interface AboutSection {
  title: string
  paragraphs: Paragraph[]
  /** Short lines shown as a list (the aims under "Why We Exist", the vision points) */
  list: string[]
  closing: Paragraph[]
}

const whoWeAreFirst = expectValue(splitLabel(approved.whoWeAre[0]), 'Who we are label')
export const WHO_WE_ARE: { title: string; paragraphs: Paragraph[] } = {
  title: whoWeAreFirst.label,
  paragraphs: [whoWeAreFirst.body, ...approved.whoWeAre.slice(1)],
}

// "Why We Exist", "Our Message and Heritage", "Our Vision", "A Life That Thrives Now and Forever"
export const OUR_STORY: AboutSection[] = (() => {
  const sections: AboutSection[] = []
  for (const paragraph of approved.ourStory) {
    const labelled = splitLabel(paragraph)
    if (labelled) {
      sections.push({ title: labelled.label, paragraphs: [labelled.body], list: [], closing: [] })
      continue
    }
    const current = expectValue(sections.at(-1), 'Our story section order')
    const text = plainText(paragraph)
    // Short unpunctuated lines directly after an intro are list items
    if (!/[.:!?]$/.test(text) && current.closing.length === 0) current.list.push(text)
    else if (current.list.length > 0) current.closing.push(paragraph)
    else current.paragraphs.push(paragraph)
  }
  return sections
})()

// --- Leadership (§5) -------------------------------------------------------

export interface Leader {
  id: 'kumuyi' | 'aderemi' | 'agbo'
  name: string
  title: string
  subtitle: string
  shortBio: Paragraph
  fullBio: Paragraph[]
}

const SHORT_BIO_PREFIX = /^Short bio for the leadership card \(.*?\): /

const kumuyiShort = expectValue(approved.kumuyiBio[1], 'Kumuyi short bio')
const kumuyiShortText = expectValue(typeof kumuyiShort[0] === 'string' ? kumuyiShort[0] : null, 'Kumuyi short bio text')

const aderemiHeader = lines(verbatim.aderemiBio[0])
const agboFirst = lines(verbatim.agboBio[0])

export const LEADERS: Leader[] = [
  {
    id: 'kumuyi',
    name: 'Pastor (Dr.) W.F. Kumuyi',
    title: 'General Superintendent',
    subtitle: plainText(approved.kumuyiBio[0]),
    shortBio: [kumuyiShortText.replace(SHORT_BIO_PREFIX, ''), ...kumuyiShort.slice(1)],
    fullBio: approved.kumuyiBio.slice(2),
  },
  {
    id: 'aderemi',
    name: aderemiHeader[0].split(DASH)[1],
    title: aderemiHeader[0].split(DASH)[0],
    subtitle: aderemiHeader[1],
    shortBio: verbatim.aderemiBio[1],
    fullBio: verbatim.aderemiBio.slice(1),
  },
  {
    id: 'agbo',
    name: agboFirst[0].split(DASH)[1],
    title: agboFirst[0].split(DASH)[0],
    subtitle: agboFirst[1],
    shortBio: [agboFirst.slice(2).join('\n')],
    fullBio: [[agboFirst.slice(2).join('\n')], ...verbatim.agboBio.slice(1)],
  },
]

// --- Ministries and Outreach (§6) -----------------------------------------

export interface Ministry {
  slug: string
  name: string
  paragraphs: Paragraph[]
}

const MINISTRY_SLUGS: Record<string, string> = {
  'Women’s Ministry': 'women',
  'Children’s Ministry': 'children',
  'Youth Ministry': 'youth',
  'Young Adults Ministry': 'young-adults',
  'Men’s Ministry': 'men',
  'Music Ministry': 'music',
  Evangelism: 'evangelism',
  Counseling: 'counseling',
  'Hospital Visitation': 'hospital-visitation',
  'Community Volunteerism': 'community-volunteerism',
  'Prison Ministry': 'prison-ministry',
}

// "(temporary text)" is a note to us, not part of the name
const cleanLabel = (label: string) => label.replace(/\s*\(temporary text\)$/, '')

const { MINISTRIES, OUTREACH } = (() => {
  const ministries: Ministry[] = []
  const outreach: Ministry[] = []
  let target = ministries
  // The first paragraph is the pastor's instruction to the developer
  for (const paragraph of approved.ministries.slice(1)) {
    const labelled = splitLabel(paragraph)
    if (labelled && labelled.label === 'Outreach') {
      target = outreach
      continue
    }
    if (labelled) {
      const name = cleanLabel(labelled.label)
      const slug = expectValue(MINISTRY_SLUGS[name], `slug for ${name}`)
      target.push({ slug, name, paragraphs: [labelled.body] })
    } else {
      expectValue(target.at(-1), 'ministry order').paragraphs.push(paragraph)
    }
  }
  return { MINISTRIES: ministries, OUTREACH: outreach }
})()

export { MINISTRIES, OUTREACH }

export function findMinistry(slug: string): Ministry | undefined {
  return MINISTRIES.find((ministry) => ministry.slug === slug)
}

export type { Inline, Paragraph }
