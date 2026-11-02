/**
 * BUILD-PLAN 3.3: the seeded doctrine and bio text equals the verbatim source exactly.
 */
import { readFileSync } from 'fs'
import path from 'path'
import { buildSeedDocuments, type SeedDocument } from '@/lib/sanity/seed-documents'
import { fromPortableText, toPortableText, type PortableBlock } from '@/lib/content/portable-text'
import { plainText } from '@/lib/content/inline'
import * as verbatim from '@/lib/content/verbatim.generated'
import { SITE_CONFIG, SERVICE_TIMES } from '@/lib/constants'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const source = require('../../scripts/verbatim-source.cjs')
const markdown = readFileSync(path.join(process.cwd(), 'docs/build/SITE-CONTENT.md'), 'utf8')
const blocks: Record<string, string[]> = source.extractVerbatimBlocks(markdown)
const sourcePlain = (label: string): string[] => blocks[label].map(source.plainParagraph)

const docs = buildSeedDocuments()
const byId = (id: string) => docs.find((doc) => doc._id === id) as SeedDocument
const text = (field: unknown) => fromPortableText(field as PortableBlock[]).map(plainText)

describe('seed documents', () => {
  it('have unique ids and a type each', () => {
    expect(new Set(docs.map((d) => d._id)).size).toBe(docs.length)
    for (const doc of docs) expect(doc._type).toBeTruthy()
  })

  it('use ids without dots, which Sanity would hide from public reads', () => {
    for (const doc of docs) expect(doc._id).not.toContain('.')
  })

  it('round-trip our paragraphs through Portable Text without change', () => {
    for (const paragraphs of [verbatim.pastorsWelcome, verbatim.bibleDoctrines, verbatim.aderemiBio, verbatim.agboBio]) {
      expect(fromPortableText(toPortableText(paragraphs))).toEqual(paragraphs)
    }
  })

  it('carry the 22 doctrines word for word', () => {
    const doctrines = docs.filter((d) => d._type === 'doctrine').sort((a, b) => (a.order as number) - (b.order as number))
    expect(doctrines).toHaveLength(22)
    const seeded = doctrines.flatMap((d) => [d.title, d.body, d.references])
    // The source block is: heading, references, quotation, statement, then title/body/refs × 22
    expect(seeded).toEqual(sourcePlain('Bible doctrines').slice(4))
  })

  it('carry the Pastor’s Welcome word for word', () => {
    const home = byId('homePage')
    expect([home.welcomeHeading, ...text(home.welcome)]).toEqual(sourcePlain("Pastor's Welcome"))
  })

  it('carry the Aderemi and Agbo bios word for word and mark them verbatim', () => {
    const aderemi = byId('person-aderemi')
    const agbo = byId('person-agbo')
    expect(aderemi.verbatim).toBe(true)
    expect(agbo.verbatim).toBe(true)
    // The header lines become name, title and subtitle; the paragraphs are the full bio
    expect(text(aderemi.fullBio)).toEqual(sourcePlain('Pastor Thompson Aderemi bio').slice(1))
    const [agboFirst, ...agboRest] = sourcePlain('Pastor Joseph Agbo bio')
    expect(text(agbo.fullBio)).toEqual([agboFirst.split('\n').slice(2).join('\n'), ...agboRest])
    expect(byId('person-kumuyi').verbatim).toBe(false)
  })

  it('carry the branch facts and schedule from lib/constants.ts', () => {
    const settings = byId('siteSettings')
    expect(settings).toMatchObject({ name: SITE_CONFIG.name, phone: SITE_CONFIG.phone, email: SITE_CONFIG.email })
    expect((settings.schedule as { name: string }[]).map((s) => s.name)).toEqual(SERVICE_TIMES.map((s) => s.name))
    expect(settings.socialMedia).toEqual({})
  })
})
