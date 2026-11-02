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

/** Development-only check that both fonts render every glyph (BUILD-PLAN 2.1) */
export default function NamesTestPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <Section title="Names test">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl">Source Serif 4</h2>
          <ul className="list-none space-y-3 font-serif text-2xl">
            {SAMPLES.map((sample) => (
              <li key={sample}>{sample}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-xl">Source Sans 3</h2>
          <ul className="list-none space-y-3 font-sans text-2xl">
            {SAMPLES.map((sample) => (
              <li key={sample}>{sample}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
