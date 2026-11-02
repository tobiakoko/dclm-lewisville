// Shared by scripts/generate-verbatim.mjs and __tests__/content/verbatim.test.ts (CommonJS so Jest can load it).

const NOTE = /^> \*\*VERBATIM\.\*\*/

/** VERBATIM block label → export name in lib/content/verbatim.generated.ts */
const VERBATIM_KEYS = {
  "Pastor's Welcome": 'pastorsWelcome',
  'Bible doctrines': 'bibleDoctrines',
  'Pastor Thompson Aderemi bio': 'aderemiBio',
  'Pastor Joseph Agbo bio': 'agboBio',
}

/** Export name in lib/content/approved.generated.ts → SITE-CONTENT.md heading */
const APPROVED_SECTIONS = {
  homeHero: '### Hero and “What visitors should expect”',
  visit: '## 4. Plan Your Visit (`/visit`)',
  bibleVerse: '### The Bible Verse We Live By',
  whoWeAre: '### Who we are',
  ourStory: '### Our story, mission and vision',
  kumuyiBio: '#### General Superintendent: Pastor (Dr.) W.F. Kumuyi',
  ministries: '## 6. Ministries (`/ministries`) and Outreach',
  legal: '## 11. Footer, Privacy Policy and Terms of Use',
}

/**
 * Returns { label: paragraphs[] } for every `<!-- VERBATIM START: label -->` block.
 * Paragraphs are separated by blank lines; a Markdown hard break ("  " at line end)
 * becomes "\n". The "> **VERBATIM.**" instruction line is dropped.
 */
function extractVerbatimBlocks(markdown) {
  const blocks = {}
  const re = /<!-- VERBATIM START: (.+?) -->\n([\s\S]*?)<!-- VERBATIM END: \1 -->/g
  for (const [, label, body] of markdown.matchAll(re)) {
    blocks[label] = body
      .split(/\n\s*\n/)
      .map((p) => p.replace(/ {2}\n/g, '\n').replace(/\s+$/, '').replace(/^\s+/, ''))
      .filter((p) => p && !NOTE.test(p))
  }
  return blocks
}

/**
 * Returns the approved-copy paragraphs under a heading (e.g. "### Who we are"), up to the
 * next heading of the same or higher level. Developer notes ("*Dev note...") are dropped.
 */
function extractSection(markdown, heading) {
  const lines = markdown.split('\n')
  const start = lines.findIndex((line) => line === heading)
  if (start === -1) throw new Error(`Heading not found in SITE-CONTENT.md: ${heading}`)
  const level = heading.match(/^#+/)[0].length
  let end = lines.findIndex((line, i) => i > start && /^#+ /.test(line) && line.match(/^#+/)[0].length <= level)
  if (end === -1) end = lines.length
  return lines
    .slice(start + 1, end)
    .join('\n')
    .split(/\n\s*\n/)
    .map((p) => p.replace(/ {2}\n/g, '\n').trim())
    .filter((p) => p && !p.startsWith('*Dev note') && !p.startsWith('#'))
}

/** Splits **strong** and *em* Markdown spans into inline segments. */
function toInline(paragraph) {
  const segments = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/gs
  let last = 0
  for (const m of paragraph.matchAll(re)) {
    if (m.index > last) segments.push(paragraph.slice(last, m.index))
    segments.push(m[1] !== undefined ? { strong: m[1] } : { em: m[2] })
    last = m.index + m[0].length
  }
  if (last < paragraph.length) segments.push(paragraph.slice(last))
  return segments
}

/** Markdown paragraph with emphasis markers removed. */
function plainParagraph(paragraph) {
  return paragraph.replace(/\*\*(.+?)\*\*/gs, '$1').replace(/\*(.+?)\*/gs, '$1')
}

module.exports = { VERBATIM_KEYS, APPROVED_SECTIONS, extractVerbatimBlocks, extractSection, toInline, plainParagraph }
