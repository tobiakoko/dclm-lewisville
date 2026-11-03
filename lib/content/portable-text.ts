import type { Inline, Paragraph } from './inline'

/** The subset of Portable Text the `richText` schema allows: paragraphs with bold and italic */
export interface PortableBlock {
  _type: 'block'
  _key: string
  style?: 'normal'
  markDefs?: never[]
  children: { _type: 'span'; _key: string; text: string; marks?: string[] }[]
}

/** Our paragraphs → Portable Text, for the seed script. Line breaks stay as "\n" in the text. */
export function toPortableText(paragraphs: Paragraph[], keyPrefix = 'p'): PortableBlock[] {
  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `${keyPrefix}${index}`,
    style: 'normal',
    markDefs: [],
    children: paragraph.map((segment, spanIndex) => {
      const base = { _type: 'span' as const, _key: `${keyPrefix}${index}s${spanIndex}` }
      if (typeof segment === 'string') return { ...base, text: segment, marks: [] }
      if ('em' in segment) return { ...base, text: segment.em, marks: ['em'] }
      return { ...base, text: segment.strong, marks: ['strong'] }
    }),
  }))
}

interface LooseBlock {
  _type?: string
  children?: { text?: string; marks?: string[] | null }[] | null
}

/**
 * Portable Text from Sanity → our paragraphs, so the same components render CMS and seed
 * content. Adjacent spans with the same marks are merged; unknown block types are skipped.
 */
export function fromPortableText(blocks: LooseBlock[] | null | undefined): Paragraph[] {
  if (!blocks) return []
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => {
      const paragraph: Paragraph = []
      for (const span of block.children ?? []) {
        const text = span.text ?? ''
        if (!text) continue
        const marks = span.marks ?? []
        const segment: Inline = marks.includes('strong') ? { strong: text } : marks.includes('em') ? { em: text } : text
        const last = paragraph[paragraph.length - 1]
        if (typeof segment === 'string' && typeof last === 'string') paragraph[paragraph.length - 1] = last + segment
        else paragraph.push(segment)
      }
      return paragraph
    })
    .filter((paragraph) => paragraph.length > 0)
}
