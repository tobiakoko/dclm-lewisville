import { SITE_CONFIG } from '@/lib/constants'
import { formatEventStart, type ChurchEvent } from '@/lib/events'
import { ModeChips } from '@/components/site/Schedule'
import { ArrowLink } from '@/components/ui/arrow-link'

function dateBox(start: string) {
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', { timeZone: SITE_CONFIG.timeZone, ...options }).format(new Date(start))
  return { month: format({ month: 'short' }), day: format({ day: 'numeric' }) }
}

/** A special event as a date card: navy date box, name, time in Central Time, place, mode, registration */
export function EventCard({ event }: { event: ChurchEvent }) {
  const { month, day } = dateBox(event.start)
  return (
    <article className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-x-5 gap-y-4 rounded-tile-lg bg-white p-[18px] shadow-md sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:gap-x-7 sm:py-[22px] sm:pl-[22px] sm:pr-7">
      <p aria-hidden="true" className="flex size-[72px] flex-col items-center justify-center rounded-tile-md bg-navy-900 text-white sm:size-24">
        <span className="text-sm font-bold uppercase leading-none tracking-[0.12em] text-emblem-sky-400">{month}</span>
        <span className="mt-1.5 font-serif text-[1.75rem] font-semibold leading-none sm:text-[2.375rem]">{day}</span>
      </p>
      <div className="min-w-0">
        <h3 className="type-h4">{event.title}</h3>
        <p className="tabular mt-1 font-semibold text-navy-900">
          <time dateTime={event.start}>{formatEventStart(event, SITE_CONFIG.timeZone)}</time> CT
        </p>
        <p className="text-ink-muted">{event.mode === 'online' ? 'Online' : event.location}</p>
        <ModeChips mode={event.mode} className="mt-2" />
      </div>
      {event.registrationUrl && (
        <div className="col-span-2 sm:col-span-1">
          <ArrowLink href={event.registrationUrl}>
            Register<span className="sr-only"> for {event.title}</span>
          </ArrowLink>
        </div>
      )}
    </article>
  )
}
