import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/site/Section'

export const metadata: Metadata = {
  title: 'Names test',
  robots: { index: false, follow: false },
}

// Typographic samples, not real people: the examples from DESIGN-SYSTEM.md plus every letter
// with a dot below or tone mark used in Yoruba and Igbo, precomposed and combining.
const SAMPLES = [
  'Adébáyọ̀',
  'Ọlátúndé',
  'Ẹ ẹ Ọ ọ Ṣ ṣ Ị ị Ụ ụ Ṅ ṅ',
  'á à ā é è ē í ì ó ò ú ù ń ǹ ḿ',
  'Ẹ́ ẹ̀ Ọ́ ọ̀ (combining acute and grave over dot-below letters)',
  'Chíọmá Nwọ́sụ̀',
  'Olúwaṣeun Ìyábọ̀dé',
]

// The type scale from DESIGN-SYSTEM.md, so the test covers the real sizes and weights
const STYLES = [
  ['Display (serif)', 'type-display'],
  ['H1 (serif)', 'type-h1'],
  ['H2 (serif)', 'type-h2'],
  ['H3 (serif)', 'type-h3'],
  ['Pull quote (serif italic)', 'type-quote'],
  ['Scripture (serif italic)', 'scripture'],
  ['H4 (sans 700)', 'type-h4'],
  ['H5 (sans 700)', 'type-h5'],
  ['Lead (sans)', 'type-lead'],
  ['Body (sans)', 'text-lg'],
  ['Eyebrow (sans 700, uppercase)', 'type-eyebrow'],
] as const

/** Development-only check that both fonts render every glyph at every size (BUILD-PLAN 2.1, 4.1) */
export default function NamesTestPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <Section title="Names test">
      <div className="space-y-12">
        {STYLES.map(([label, className]) => (
          <section key={className} aria-labelledby={`style-${className}`}>
            <h2 id={`style-${className}`} className="type-h5 mb-3">
              {label}
            </h2>
            <ul className={`list-none space-y-2 ${className}`}>
              {SAMPLES.map((sample) => (
                <li key={sample}>{sample}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  )
}
