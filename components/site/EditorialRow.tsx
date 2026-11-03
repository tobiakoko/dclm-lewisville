import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from '@/components/ui/eyebrow'

/**
 * The editorial pattern (REDESIGN.md §4): a label column with a serif number or an eyebrow and
 * the H2, then the content (4/8, stacking below 960px). A 1px line divides rows.
 */
export function EditorialRow({
  id,
  number,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string
  /** Shown as 01, 02 … in serif */
  number?: number
  eyebrow?: ReactNode
  title: ReactNode
  children: ReactNode
  className?: string
}) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        'grid scroll-mt-24 gap-6 py-14 shadow-[inset_0_1px_0_var(--color-line)] first:shadow-none wide:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] wide:gap-16 wide:py-[72px]',
        className
      )}
    >
      <div className="flex flex-col gap-3 self-start">
        {number !== undefined && (
          <p aria-hidden="true" className="font-serif text-[2.5rem] font-semibold leading-none text-emblem-sky-700">
            {String(number).padStart(2, '0')}
          </p>
        )}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={headingId}>{title}</h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
