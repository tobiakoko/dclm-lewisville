import type { ReactNode } from 'react'
import { ZOOM_PLACEHOLDER, type ServiceMode, type ServiceTime } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'
import { cn } from '@/lib/utils'
import { Chip } from '@/components/ui/chip'

// Weekly meetings as rows and day tiles (DESIGN-SYSTEM.md: ScheduleRow / DayTile)

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
 * A weekly meeting as a row: day tile, name, one-line description (or longer approved details)
 * and join line, then the time and mode chips (under the text on phones). `highlight` sets it in
 * an emblem-sky-50 panel, for the main service.
 */
export function ScheduleRow({
  service,
  headingLevel = 3,
  details,
  highlight,
}: {
  service: ServiceTime
  headingLevel?: 3 | 4
  details?: ReactNode
  highlight?: boolean
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4'
  return (
    <div
      className={cn(
        'grid grid-cols-[64px_minmax(0,1fr)] items-start gap-x-5 gap-y-3 sm:grid-cols-[76px_minmax(0,1fr)_auto] sm:items-center',
        highlight ? 'rounded-panel bg-emblem-sky-50 p-6 sm:p-8' : 'py-6 shadow-[inset_0_1px_0_var(--color-line)] first:shadow-none'
      )}
    >
      <span aria-hidden="true">
        <DayTile day={service.day} />
      </span>
      <div className="min-w-0">
        <Heading className="type-h4">
          <span className="sr-only">{service.day}: </span>
          {service.name}
        </Heading>
        <div className="mt-1 text-base text-ink-muted">{details ?? <p>{service.description}</p>}</div>
        <JoinLine service={service} className="mt-1 text-base" />
      </div>
      <div className="col-start-2 flex flex-col gap-2 sm:col-start-3 sm:items-end">
        <p className="tabular whitespace-nowrap text-lg font-bold text-navy-900">{formatServiceTime(service)}</p>
        <ModeChips mode={service.mode} />
      </div>
    </div>
  )
}
