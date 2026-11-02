import { DOCTRINES, DOCTRINES_INTRO } from '@/lib/content/doctrines'
import { Disclosure } from '@/components/ui/disclosure'

/**
 * The 22 Bible doctrines as cards that expand to the full verbatim text
 * (SITE-CONTENT.md §5, "What we believe"). Titles only on the card; no summaries.
 */
export default function DoctrineCards() {
  return (
    <>
      <div className="mb-10 max-w-3xl space-y-3">
        <p className="font-semibold text-navy-900">{DOCTRINES_INTRO.heading}</p>
        <p className="text-[0.9375rem] italic text-ink-muted">{DOCTRINES_INTRO.references}</p>
        <blockquote className="scripture text-navy-900">
          <p>{DOCTRINES_INTRO.quotation}</p>
        </blockquote>
        <p className="font-semibold">{DOCTRINES_INTRO.statement}</p>
      </div>

      <ol className="grid list-none gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DOCTRINES.map((doctrine) => (
          <li key={doctrine.id} id={`doctrine-${doctrine.id}`}>
            <Disclosure
              className="h-full rounded-2xl border border-border-input/40 bg-white"
              buttonClassName="min-h-12 rounded-2xl p-5 text-navy-900"
              panelClassName="space-y-3 px-5 pb-5"
              summary={<h3 className="text-lg">{doctrine.title}</h3>}
            >
              <p>{doctrine.body}</p>
              <p className="text-[0.9375rem] italic text-ink-muted">{doctrine.references}</p>
            </Disclosure>
          </li>
        ))}
      </ol>
    </>
  )
}
