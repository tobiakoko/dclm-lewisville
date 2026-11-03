import type { ReactNode } from 'react'
import { ZOOM_PLACEHOLDER, type ServiceMode, type ServiceTime } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'
import { cn } from '@/lib/utils'
import { Chip } from '@/components/ui/chip'

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

// --- Phase 4 schedule parts (DESIGN-SYSTEM.md: ScheduleRow / DayTile, ServiceTimesCard) ---------

const MODE_CHIPS: Record<ServiceMode, { label: string; tone: 'warm' | 'default' }[]> = {
  'in-person': [{ label: 'In person', tone: 'warm' }],
  online: [{ label: 'Online', tone: 'default' }],
  both: [
    { label: 'In person', tone: 'warm' },
    { label: 'Online', tone: 'default' },
  ],
}

/** In person = warm chip, Online = default chip */
export function ModeChips({ mode, className }: { mode: ServiceMode; className?: string }) {
  return (
    <ul className={cn('flex list-none flex-wrap gap-1.5', className)} aria-label="How to attend">
      {MODE_CHIPS[mode].map((chip) => (
        <Chip key={chip.label} as="li" tone={chip.tone}>
          {chip.label}
        </Chip>
      ))}
    </ul>
  )
}

/** The join link, or "[Zoom link to come]" when the church hasn't given one; nothing for in-person meetings */
export function JoinLine({ service, className }: { service: ServiceTime; className?: string }) {
  if (service.mode === 'in-person') return null
  return (
    <p className={className}>
      {service.joinUrl ? (
        <a href={service.joinUrl} className="font-semibold text-emblem-sky-700 underline decoration-[1.5px] underline-offset-4 hover:text-navy-900 in-[.on-dark]:text-emblem-sky-200">
          Join online<span className="sr-only">: {service.name}</span>
        </a>
      ) : (
        <span className="text-ink-muted in-[.on-dark]:text-white/76">{ZOOM_PLACEHOLDER}</span>
      )}
    </p>
  )
}

/** 76px paper tile (64px on phones): serif day abbreviation over "Weekly" */
export function DayTile({ day }: { day: string }) {
  return (
    <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-tile-md bg-paper text-navy-900 sm:size-[76px]">
      <span className="font-serif text-2xl font-semibold leading-none">{day.slice(0, 3)}</span>
      <span className="mt-1.5 text-sm font-bold uppercase leading-none tracking-[0.08em] text-ink-muted">Weekly</span>
    </span>
  )
}

/**
 * A weekly meeting as a row: day tile, name, one-line description and join line, then the time
 * and mode chips (under the text on phones).
 */
export function ScheduleRow({ service, headingLevel = 3 }: { service: ServiceTime; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4'
  return (
    <div className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-x-5 gap-y-3 py-6 shadow-[inset_0_1px_0_var(--color-line)] sm:grid-cols-[76px_minmax(0,1fr)_auto] sm:items-center">
      <span aria-hidden="true">
        <DayTile day={service.day} />
      </span>
      <div className="min-w-0">
        <Heading className="type-h4">
          <span className="sr-only">{service.day}: </span>
          {service.name}
        </Heading>
        <p className="mt-1 text-base text-ink-muted">{service.description}</p>
        <JoinLine service={service} className="mt-1 text-base" />
      </div>
      <div className="col-start-2 flex flex-col gap-2 sm:col-start-3 sm:items-end">
        <p className="tabular whitespace-nowrap text-lg font-bold text-navy-900">{formatServiceTime(service)}</p>
        <ModeChips mode={service.mode} />
      </div>
    </div>
  )
}
