import { Section } from '@/components/site/Section'

/** "The Bible Verse We Live By" (SITE-CONTENT.md §3): centered, narrow, the heading styled as an eyebrow */
export function Verse({ verse }: { verse: { heading: string; text: string; reference: string } }) {
  return (
    <Section id="verse" tone="sky" size="md" narrow titleId="verse-heading">
      <figure className="text-center">
        <h2 id="verse-heading" className="type-eyebrow">
          {verse.heading}
        </h2>
        <blockquote className="scripture mt-6 text-navy-900">
          <p>{verse.text}</p>
        </blockquote>
        <figcaption className="mt-5 font-bold text-navy-900">{verse.reference}</figcaption>
      </figure>
    </Section>
  )
}
