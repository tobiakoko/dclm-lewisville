/**
 * The church's words reach the site only through lib/content/*.generated.ts, which
 * scripts/generate-verbatim.mjs builds from docs/build/SITE-CONTENT.md. These tests fail if
 * anyone edits the generated files or the source without regenerating (CLAUDE.md rules 1-2).
 */
import { readFileSync } from 'fs'
import path from 'path'
import * as verbatim from '@/lib/content/verbatim.generated'
import * as approved from '@/lib/content/approved.generated'
import { plainText, type Paragraph } from '@/lib/content/inline'
import { DOCTRINES, DOCTRINES_INTRO } from '@/lib/content/doctrines'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const source = require('../../scripts/verbatim-source.cjs')

const markdown = readFileSync(path.join(process.cwd(), 'docs/build/SITE-CONTENT.md'), 'utf8')

const asPlain = (paragraphs: Paragraph[]) => paragraphs.map(plainText)
const sourcePlain = (paragraphs: string[]): string[] => paragraphs.map(source.plainParagraph)

describe('verbatim content', () => {
  const blocks: Record<string, string[]> = source.extractVerbatimBlocks(markdown)

  it('has every VERBATIM block from SITE-CONTENT.md', () => {
    expect(Object.keys(blocks).sort()).toEqual(Object.keys(source.VERBATIM_KEYS).sort())
  })

  it.each(Object.entries(source.VERBATIM_KEYS as Record<string, string>))(
    '"%s" matches SITE-CONTENT.md word for word',
    (label, key) => {
      const generated = (verbatim as Record<string, Paragraph[]>)[key]
      expect(asPlain(generated)).toEqual(sourcePlain(blocks[label]))
      expect(generated).toEqual(blocks[label].map(source.toInline))
    }
  )
})

describe('approved content', () => {
  it.each(Object.entries(source.APPROVED_SECTIONS as Record<string, string>))(
    '%s matches its section in SITE-CONTENT.md',
    (key, heading) => {
      const generated = (approved as Record<string, Paragraph[]>)[key]
      expect(generated).toEqual(source.extractSection(markdown, heading).map(source.toInline))
    }
  )
})

describe('doctrines', () => {
  it('parses all 22 doctrines with title, text and references', () => {
    expect(DOCTRINES).toHaveLength(22)
    for (const doctrine of DOCTRINES) {
      expect(doctrine.title).not.toHaveLength(0)
      expect(doctrine.body.length).toBeGreaterThan(40)
      expect(doctrine.references).toMatch(/^\([\s\S]*\)$/)
    }
    expect(DOCTRINES[0].title).toBe('The Holy Bible')
    expect(DOCTRINES[21].title).toBe('Hell')
  })

  it('keeps British spellings and the supplied references untouched', () => {
    const godhead = DOCTRINES.find((d) => d.title === 'The Godhead')
    expect(godhead?.body).toContain('recognisable')
    const healing = DOCTRINES.find((d) => d.title === 'Redemption, Healing and Health')
    expect(healing?.references).toContain('Mark 16;15-18')
    expect(DOCTRINES_INTRO.statement).toBe('God’s infallible WORD teaches and we believe:')
  })

  it('gives every doctrine a unique id', () => {
    expect(new Set(DOCTRINES.map((d) => d.id)).size).toBe(22)
  })
})
