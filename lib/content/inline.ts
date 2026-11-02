/** A run of text, optionally emphasised, as written in SITE-CONTENT.md */
export type Inline = string | { em: string } | { strong: string }
export type Paragraph = Inline[]

export function inlineText(segment: Inline): string {
  if (typeof segment === 'string') return segment
  return 'em' in segment ? segment.em : segment.strong
}

/** The paragraph's words without emphasis; "\n" marks a line break */
export function plainText(paragraph: Paragraph): string {
  return paragraph.map(inlineText).join('')
}
