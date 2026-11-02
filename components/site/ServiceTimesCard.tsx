import type { ReactNode } from 'react'
import { ZOOM_PLACEHOLDER, type ServiceMode, type ServiceTime } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'
import { cn } from '@/lib/utils'

const BADGES: Record<ServiceMode, string[]> = {
  'in-person': ['In person'],
  online: ['Online'],
  both: ['In person', 'Online'],
}

export function ModeBadges({ mode, className }: { mode: ServiceMode; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2 list-none', className)} aria-label="How to attend">
      {BADGES[mode].map((label) => (
        <li key={label} className="rounded-full border border-navy-700 px-3 py-0.5 text-[0.9375rem] font-semibold text-navy-900">
          {label}
        </li>
      ))}
    </ul>
  )
}

/** Day, name, start–end, mode badges, join link or the Zoom placeholder, one-line description */
export function ServiceTimesCard({
  service,
  headingLevel = 3,
  details,
}: {
  service: ServiceTime
  headingLevel?: 2 | 3
  /** Longer approved description to show instead of the one-line one */
  details?: ReactNode
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-border-input/40 bg-white p-6">
      <p className="font-semibold text-ink-muted">{service.day}</p>
      <Heading className="text-xl">{service.name}</Heading>
      <p className="tabular text-2xl font-semibold text-navy-900">{formatServiceTime(service)}</p>
      <ModeBadges mode={service.mode} />
      {details ?? <p>{service.description}</p>}
      {service.mode !== 'in-person' && (
        <p className="mt-auto">
          {service.joinUrl ? (
            <a href={service.joinUrl} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
              Join online<span className="sr-only">: {service.name}</span>
            </a>
          ) : (
            <span className="text-ink-muted">{ZOOM_PLACEHOLDER}</span>
          )}
        </p>
      )}
    </article>
  )
}
