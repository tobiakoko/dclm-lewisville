import { Section } from '@/components/site/Section'

/** The page's one navy call-out band */
export function Testimonies({ testimony }: { testimony: { name: string; title: string; content: string } }) {
  return (
    <Section id="testimony" tone="navy" title="Testimony">
      <figure className="max-w-3xl space-y-6">
        <p className="font-semibold text-emblem-sky-400">{testimony.title}</p>
        <blockquote className="scripture not-italic text-white">
          <p>“{testimony.content}”</p>
        </blockquote>
        <figcaption className="font-semibold">— {testimony.name}</figcaption>
      </figure>
    </Section>
  )
}
