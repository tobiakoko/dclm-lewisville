import type { ServiceTime } from '@/lib/constants'
import type { ChurchEvent } from '@/lib/events'
import { formatClock, formatServiceTime } from '@/lib/schedule'

// Calendar math on plain dates ("2026-11-03"), so a week is the same wherever the visitor is;
// "today" is worked out in the church's time zone (DESIGN-SYSTEM.md, WeekStrip).

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

export interface WeekItem {
  key: string
  name: string
  time: string
  /** The main service is drawn in navy */
  main?: boolean
  /** A one-off note from the schedule changes, e.g. a cancellation */
  note?: string
  cancelled?: boolean
}

export interface WeekDay {
  date: string
  weekday: (typeof WEEKDAYS)[number]
  items: WeekItem[]
}

/** "2026-11-03" for an instant, in the given time zone */
export function dateInZone(instant: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(instant)
}

function toUtc(date: string): Date {
  return new Date(`${date}T00:00:00Z`)
}

export function addDays(date: string, days: number): string {
  const next = toUtc(date)
  next.setUTCDate(next.getUTCDate() + days)
  return next.toISOString().slice(0, 10)
}

/** The Sunday that starts the week holding this date */
export function weekStart(date: string): string {
  return addDays(date, -toUtc(date).getUTCDay())
}

/** "Nov 3" */
export function shortDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' }).format(toUtc(date))
}

/** "November 1–7, 2026", or across months "November 29 – December 5, 2026" */
export function weekLabel(start: string): string {
  const end = addDays(start, 6)
  const format = (date: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...options }).format(toUtc(date))
  const sameMonth = start.slice(0, 7) === end.slice(0, 7)
  return sameMonth
    ? `${format(start, { month: 'long', day: 'numeric' })}–${format(end, { day: 'numeric' })}, ${format(end, { year: 'numeric' })}`
    : `${format(start, { month: 'long', day: 'numeric' })} – ${format(end, { month: 'long', day: 'numeric', year: 'numeric' })}`
}

/** Seven days from `start`, each with its weekly meetings, special events and schedule changes */
export function buildWeek(input: {
  start: string
  schedule: ServiceTime[]
  events: ChurchEvent[]
  exceptions: { date: string; meeting: string; cancelled: boolean; note: string }[]
  mainServiceId: string
  timeZone: string
}): WeekDay[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(input.start, index)
    const weekday = WEEKDAYS[toUtc(date).getUTCDay()]
    const weekly: (WeekItem & { sort: string })[] = input.schedule
      .filter((service) => service.day === weekday)
      .map((service) => {
        const change = input.exceptions.find((exception) => exception.date === date && exception.meeting === service.id)
        return {
          key: service.id,
          name: service.name,
          time: formatServiceTime(service),
          main: service.id === input.mainServiceId,
          note: change?.note,
          cancelled: change?.cancelled,
          sort: service.start,
        }
      })
    const special = input.events
      .filter((event) => dateInZone(new Date(event.start), input.timeZone) === date)
      .map((event) => {
        const clock = new Intl.DateTimeFormat('en-GB', { timeZone: input.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(event.start))
        return { key: event.id, name: event.title, time: formatClock(clock), sort: clock }
      })
    const items = [...weekly, ...special].sort((a, b) => a.sort.localeCompare(b.sort)).map(({ sort: _sort, ...item }) => item)
    return { date, weekday, items }
  })
}
