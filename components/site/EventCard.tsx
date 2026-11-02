import { SITE_CONFIG } from '@/lib/constants'
import { formatEventStart, type ChurchEvent } from '@/lib/events'
import { ModeBadges } from '@/components/site/ServiceTimesCard'

/** Date and time in Central Time, location or "Online", mode badge */
export function EventCard({ event }: { event: ChurchEvent }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-border-input/40 bg-white p-6">
      <h3 className="text-xl">{event.title}</h3>
      <p className="tabular font-semibold text-navy-900">
        <time dateTime={event.start}>{formatEventStart(event, SITE_CONFIG.timeZone)}</time> CT
      </p>
      <p>{event.mode === 'online' ? 'Online' : event.location}</p>
      <ModeBadges mode={event.mode} />
      {event.registrationUrl && (
        <p className="mt-auto">
          <a href={event.registrationUrl} className="font-semibold text-emblem-sky-700 underline underline-offset-4">
            Register<span className="sr-only"> for {event.title}</span>
          </a>
        </p>
      )}
    </article>
  )
}
