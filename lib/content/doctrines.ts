import { bibleDoctrines } from './verbatim.generated'
import { plainText, type Paragraph } from './inline'

export interface Doctrine {
  id: string
  title: string
  body: string
  /** The scripture references exactly as supplied, including the parentheses */
  references: string
}

export interface DoctrinesIntro {
  heading: string
  references: string
  quotation: string
  statement: string
}

function isOnly(paragraph: Paragraph, mark: 'strong' | 'em'): boolean {
  return paragraph.length === 1 && typeof paragraph[0] !== 'string' && mark in paragraph[0]
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parse(paragraphs: Paragraph[]): { intro: DoctrinesIntro; doctrines: Doctrine[] } {
  const [heading, references, quotation, statement, ...rest] = paragraphs
  const intro: DoctrinesIntro = {
    heading: plainText(heading),
    references: plainText(references),
    quotation: plainText(quotation),
    statement: plainText(statement),
  }

  const doctrines: Doctrine[] = []
  for (let i = 0; i < rest.length; i += 3) {
    const [title, body, refs] = rest.slice(i, i + 3)
    if (!title || !body || !refs || !isOnly(title, 'strong') || !isOnly(refs, 'em')) {
      throw new Error(`Unexpected doctrine structure near paragraph ${i + 4} of the Bible doctrines block`)
    }
    doctrines.push({
      id: slugify(plainText(title)),
      title: plainText(title),
      body: plainText(body),
      references: plainText(refs),
    })
  }
  return { intro, doctrines }
}

const parsed = parse(bibleDoctrines)

/** VERBATIM (SITE-CONTENT.md §5, "What we believe"). Never edit these strings. */
export const DOCTRINES_INTRO: DoctrinesIntro = parsed.intro
export const DOCTRINES: Doctrine[] = parsed.doctrines
