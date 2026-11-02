import { DOCTRINES, DOCTRINES_INTRO } from '@/lib/content/doctrines'
import { Disclosure } from '@/components/ui/disclosure'

/**
 * The 22 Bible doctrines as cards that expand to the full verbatim text
 * (SITE-CONTENT.md §5, "What we believe"). Titles only on the card; no summaries.
 */
export default function CoreBeliefs() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center mb-12 space-y-4 text-slate-700">
        <p className="font-bold text-(--church-navy)">{DOCTRINES_INTRO.heading}</p>
        <p className="italic text-sm">{DOCTRINES_INTRO.references}</p>
        <p className="italic font-serif text-lg leading-relaxed">{DOCTRINES_INTRO.quotation}</p>
        <p className="font-semibold">{DOCTRINES_INTRO.statement}</p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
        {DOCTRINES.map((doctrine) => (
          <li key={doctrine.id} id={`doctrine-${doctrine.id}`}>
            <Disclosure
              className="h-full bg-white rounded-2xl shadow-sm border border-slate-200"
              buttonClassName="p-6 rounded-2xl text-(--church-navy)"
              panelClassName="px-6 pb-6 space-y-4"
              summary={<h3 className="font-bold text-lg leading-tight">{doctrine.title}</h3>}
            >
              <p className="text-slate-700 leading-relaxed">{doctrine.body}</p>
              <p className="text-sm text-slate-600 italic">{doctrine.references}</p>
            </Disclosure>
          </li>
        ))}
      </ol>
    </>
  )
}
