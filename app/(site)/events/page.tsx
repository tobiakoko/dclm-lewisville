import Link from 'next/link'
import HeroSection from '@/components/sections/HeroSection'
import { SERVICE_TIMES, SITE_CONFIG, ZOOM_PLACEHOLDER, mapsUrl, formatAddress } from '@/lib/constants'
import { MODE_LABEL, formatServiceTime } from '@/lib/schedule'
import { EVENTS_EMPTY_STATE, formatEventStart, upcomingEvents, type ChurchEvent } from '@/lib/events'

export const metadata = {
  title: 'Events',
  description: `Weekly services and special events at ${SITE_CONFIG.name}.`,
}

// Special events will come from Sanity in Phase 3. Until then there are none to show,
// and past events must never appear as upcoming (SITE-CONTENT.md §9).
const SPECIAL_EVENTS: ChurchEvent[] = []

export default function EventsPage() {
  const upcoming = upcomingEvents(SPECIAL_EVENTS, new Date())

  return (
    <div className="bg-white">
      <HeroSection title="Events" subtitle={SITE_CONFIG.name} />

      <section className="py-20 px-6" aria-labelledby="weekly-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="weekly-heading" className="font-serif text-4xl text-(--church-navy) mb-2">
            Every week
          </h2>
          <p className="text-slate-700 mb-8">All times are Central Time.</p>
          <ul className="grid gap-6 md:grid-cols-2 list-none">
            {SERVICE_TIMES.map((service) => (
              <li key={service.id} className="rounded-2xl border border-slate-200 p-6 space-y-2">
                <h3 className="font-serif text-2xl font-bold text-(--church-navy)">{service.name}</h3>
                <p className="font-semibold tabular-nums">
                  {service.day}s, {formatServiceTime(service)}
                </p>
                <p className="text-sm font-semibold text-slate-700">{MODE_LABEL[service.mode]}</p>
                <p className="text-slate-700">{service.description}</p>
                {service.mode !== 'online' && (
                  <p className="text-slate-700">
                    <a href={mapsUrl(SITE_CONFIG.address)} className="underline underline-offset-4">
                      {formatAddress(SITE_CONFIG.address)}
                    </a>
                  </p>
                )}
                {service.mode !== 'in-person' && (
                  <p className="text-slate-700">
                    {service.joinUrl ? (
                      <a href={service.joinUrl} className="underline underline-offset-4">
                        Join online
                      </a>
                    ) : (
                      ZOOM_PLACEHOLDER
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50" aria-labelledby="special-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="special-heading" className="font-serif text-4xl text-(--church-navy) mb-8">
            Special events
          </h2>
          {upcoming.length === 0 ? (
            <p className="text-lg text-slate-700">{EVENTS_EMPTY_STATE}</p>
          ) : (
            <ul className="space-y-6 list-none">
              {upcoming.map((event) => (
                <li key={event.id} className="rounded-2xl bg-white border border-slate-200 p-6">
                  <h3 className="font-serif text-2xl font-bold text-(--church-navy)">{event.title}</h3>
                  <p>
                    <time dateTime={event.start}>{formatEventStart(event, SITE_CONFIG.timeZone)}</time>
                  </p>
                  <p>{event.location}</p>
                  <p className="text-sm font-semibold">{MODE_LABEL[event.mode]}</p>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-8">
            <Link href="/contact" className="underline underline-offset-4 font-semibold text-(--church-navy)">
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
