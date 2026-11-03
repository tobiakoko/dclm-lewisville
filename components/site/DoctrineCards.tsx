import type { Doctrine } from '@/lib/content/doctrines'
import { Disclosure } from '@/components/ui/disclosure'

/**
 * The 22 Bible doctrines as numbered accordion buttons that open to the full verbatim text and
 * references (SITE-CONTENT.md §5, "What we believe"). Titles only on the button; no summaries.
 */
export default function DoctrineCards({ doctrines }: { doctrines: Doctrine[] }) {
  return (
    <ol className="grid list-none grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] items-start gap-3">
      {doctrines.map((doctrine, index) => (
        <li key={doctrine.id} id={`doctrine-${doctrine.id}`}>
          <Disclosure
            heading="h3"
            className="group rounded-box bg-white shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-navy-900)] data-[state=open]:shadow-[inset_0_0_0_1.5px_var(--color-navy-900)]"
            buttonClassName="min-h-16 items-center rounded-box px-5 py-4 font-bold leading-snug text-navy-900"
            iconClassName="mt-0 text-navy-900"
            panelClassName="space-y-3 pb-5 pl-[68px] pr-5 text-base"
            summary={
              <span className="flex items-center gap-4">
                <span aria-hidden="true" className="w-8 shrink-0 font-serif text-xl font-semibold text-emblem-sky-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {doctrine.title}
              </span>
            }
          >
            <p>{doctrine.body}</p>
            <p className="text-[0.9375rem] italic text-ink-muted">{doctrine.references}</p>
          </Disclosure>
        </li>
      ))}
    </ol>
  )
}
