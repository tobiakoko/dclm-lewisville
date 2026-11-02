import { BIBLE_VERSE } from '@/lib/content/site'
import { Section } from '@/components/site/Section'

/** "The Bible Verse We Live By" (SITE-CONTENT.md §3); replaces "Verse of the Day" */
export function Verse() {
  return (
    <Section id="verse" tone="sky" title={BIBLE_VERSE.heading}>
      <figure className="max-w-3xl">
        <blockquote className="scripture text-navy-900">
          <p>{BIBLE_VERSE.text}</p>
        </blockquote>
        <figcaption className="mt-4 font-semibold text-ink-muted">{BIBLE_VERSE.reference}</figcaption>
      </figure>
    </Section>
  )
}
