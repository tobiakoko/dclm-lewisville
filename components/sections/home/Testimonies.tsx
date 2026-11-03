import { HOME } from '@/lib/content/interface'
import { Section } from '@/components/site/Section'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Eyebrow } from '@/components/ui/eyebrow'

/** A published testimony in its own words (REDESIGN.md §3.7); title only when the document has one */
export function Testimonies({ testimony }: { testimony: { name: string; title: string; content: string } }) {
  return (
    <Section id="testimony" titleId="testimony-heading">
      <div className="grid gap-10 wide:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] wide:gap-16">
        <div>
          <Eyebrow className="mb-4">{HOME.eyebrows.testimony}</Eyebrow>
          <h2 id="testimony-heading" className="type-h3 text-[1.875rem]">
            {testimony.title || HOME.eyebrows.testimony}
          </h2>
          <ArrowLink href="/contact?topic=testimony" className="mt-6">
            {HOME.testimonyLink}
          </ArrowLink>
        </div>
        <figure>
          <svg aria-hidden="true" viewBox="0 0 48 36" className="h-9 w-12 text-emblem-sky-100" fill="currentColor">
            <path d="M0 36V21C0 9 6 1.5 18 0l2 5c-6 1.5-9 5.5-9.5 11H20v20H0Zm28 0V21C28 9 34 1.5 46 0l2 5c-6 1.5-9 5.5-9.5 11H48v20H28Z" />
          </svg>
          <blockquote className="mt-5 font-serif text-[clamp(1.5rem,2.4vw,1.9375rem)] leading-snug text-navy-900">
            <p className="whitespace-pre-line">{testimony.content}</p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3">
            <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-full bg-emblem-sky-50 font-bold text-navy-900">
              {testimony.name.trim().charAt(0)}
            </span>
            <span className="font-bold text-navy-900">{testimony.name}</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
