'use client'

import { useState, useSyncExternalStore } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ServiceTime } from '@/lib/constants'
import type { ChurchEvent } from '@/lib/events'
import { addDays, buildWeek, dateInZone, shortDate, weekLabel, weekStart } from '@/lib/week'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Today's date only needs reading, not watching, while the page is open
const subscribeNever = () => () => {}

/**
 * Seven days of meetings and special events (REDESIGN.md §4, Events). Today is marked; Previous
 * and Next move a week. The page is cached, so the browser re-reads today's date in the church's
 * time zone after it loads. Below 960px the days stack as a list.
 */
export function WeekStrip({
  today: renderedToday,
  schedule,
  events,
  exceptions,
  mainServiceId,
  timeZone,
}: {
  /** Today in the church's time zone when the page was rendered, "2026-11-03" */
  today: string
  schedule: ServiceTime[]
  events: ChurchEvent[]
  exceptions: { date: string; meeting: string; cancelled: boolean; note: string }[]
  mainServiceId: string
  timeZone: string
}) {
  // Cached pages can be hours old: hydrate with the rendered date, then use the browser's clock
  const today = useSyncExternalStore(
    subscribeNever,
    () => dateInZone(new Date(), timeZone),
    () => renderedToday
  )
  const [offset, setOffset] = useState(0)

  const start = addDays(weekStart(today), offset * 7)
  const days = buildWeek({ start, schedule, events, exceptions, mainServiceId, timeZone })
  const label = weekLabel(start)

  return (
    <section aria-labelledby="week-heading" className="mt-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="week-heading" className="type-h4" aria-live="polite">
          {offset === 0 ? 'This week' : 'Week of'} · <span className="tabular">{label}</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setOffset((value) => value - 1)} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
            <ChevronLeft aria-hidden="true" />
            Previous week
          </button>
          <button type="button" onClick={() => setOffset((value) => value + 1)} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
            Next week
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <ol className="grid list-none overflow-hidden rounded-card bg-white shadow-[inset_0_0_0_1px_var(--color-line)] wide:grid-cols-7">
        {days.map((day) => {
          const isToday = day.date === today
          return (
            <li
              key={day.date}
              aria-current={isToday ? 'date' : undefined}
              className="flex flex-col shadow-[inset_0_1px_0_var(--color-line)] first:shadow-none wide:min-h-[260px] wide:shadow-[inset_1px_0_0_var(--color-line)] wide:first:shadow-none"
            >
              <p className={cn('flex items-baseline justify-between gap-2 px-4 py-3 wide:flex-col wide:gap-0.5', isToday && 'bg-emblem-sky-50')}>
                <span className="font-bold text-navy-900">
                  {day.weekday.slice(0, 3)} <span className="tabular font-semibold text-ink-muted">{shortDate(day.date)}</span>
                </span>
                {isToday && <span className="text-sm font-bold uppercase tracking-[0.08em] text-emblem-sky-700">Today</span>}
              </p>
              <div className="flex flex-1 flex-col gap-2.5 px-3.5 pb-4 pt-1">
                {day.items.length === 0 ? (
                  <p className="text-[0.9375rem] text-ink-muted">No meetings</p>
                ) : (
                  <ul className="flex list-none flex-col gap-2.5">
                    {day.items.map((item) => (
                      <li
                        key={item.key}
                        className={cn('flex flex-col gap-1 rounded-field p-3 text-[0.9375rem]', item.main ? 'on-dark bg-navy-900' : 'bg-emblem-sky-50 text-navy-900')}
                      >
                        <span className={cn('font-bold leading-snug', item.cancelled && 'line-through')}>{item.name}</span>
                        <span className="tabular">{item.time}</span>
                        {item.note && <span className="font-semibold">{item.note}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
