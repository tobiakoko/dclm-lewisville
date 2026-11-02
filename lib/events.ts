import type { ServiceMode } from '@/lib/constants'

export interface ChurchEvent {
  id: string
  title: string
  /** ISO 8601 with offset, e.g. "2026-12-06T09:30:00-06:00" */
  start: string
  /** ISO 8601 with offset; when absent the event is treated as over once it starts */
  end?: string
  location: string
  mode: ServiceMode
  registrationUrl?: string
}

/** SITE-CONTENT.md §9 */
export const EVENTS_EMPTY_STATE = 'No special events right now. Join us Sunday at 9:30 AM.'

/** Events that have not finished yet, soonest first. Past events are never "upcoming". */
export function upcomingEvents(events: ChurchEvent[], now: Date): ChurchEvent[] {
  return events
    .filter((event) => {
      const finishes = new Date(event.end ?? event.start).getTime()
      return Number.isFinite(finishes) && finishes >= now.getTime()
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

/** "Sunday, December 6, 2026, 9:30 AM CST" in the church's time zone */
export function formatEventStart(event: Pick<ChurchEvent, 'start'>, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    dateStyle: 'full',
    timeStyle: 'short',
  })
    .format(new Date(event.start))
    .replace(' at ', ', ')
}
