import { Section } from '@/components/site/Section'

/** "The Bible Verse We Live By" (SITE-CONTENT.md §3); replaces "Verse of the Day" */
export function Verse({ verse }: { verse: { heading: string; text: string; reference: string } }) {
  return (
    <Section id="verse" tone="sky" title={verse.heading}>
      <figure className="max-w-3xl">
        <blockquote className="scripture text-navy-900">
          <p>{verse.text}</p>
        </blockquote>
        <figcaption className="mt-4 font-semibold text-ink-muted">{verse.reference}</figcaption>
      </figure>
    </Section>
  )
}
