import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { ServiceTimesCard } from '@/components/site/ServiceTimesCard'
import { EventCard } from '@/components/site/EventCard'
import { EmptyState } from '@/components/site/Alert'
import { SERVICE_TIMES, SITE_CONFIG } from '@/lib/constants'
import { EVENTS_EMPTY_STATE, upcomingEvents, type ChurchEvent } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Events',
  description: `Weekly services and special events at ${SITE_CONFIG.name}. All times Central.`,
  alternates: { canonical: '/events' },
}

// Special events come from Sanity in Phase 3. Until then there are none to show,
// and past events must never appear as upcoming (SITE-CONTENT.md §9).
const SPECIAL_EVENTS: ChurchEvent[] = []

export default function EventsPage() {
  const upcoming = upcomingEvents(SPECIAL_EVENTS, new Date())

  return (
    <>
      <PageHero title="Events" sentence="Our weekly meetings and any special events. All times are Central Time." />

      <Section id="weekly" title="Every week">
        <ul className="grid list-none gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_TIMES.map((service) => (
            <li key={service.id}>
              <ServiceTimesCard service={service} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="special" tone="paper" title="Special events">
        {upcoming.length === 0 ? (
          <EmptyState>{EVENTS_EMPTY_STATE}</EmptyState>
        ) : (
          <ul className="grid list-none gap-6 md:grid-cols-2">
            {upcoming.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  )
}
