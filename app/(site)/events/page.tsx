import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { ServiceTimesCard } from '@/components/site/ServiceTimesCard'
import { EventCard } from '@/components/site/EventCard'
import { EmptyState } from '@/components/site/Alert'
import { EVENTS_EMPTY_STATE } from '@/lib/events'
import { getSiteData, getUpcomingEvents } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Events',
    description: `Weekly services and special events at ${config.name}. All times Central.`,
    alternates: { canonical: '/events' },
  }
}

// Special events come from Sanity; past events never appear as upcoming (SITE-CONTENT.md §9).
// Cached pages refresh when an event is published, and at least hourly so a finished event drops off.
export const revalidate = 3600

export default async function EventsPage() {
  const [{ schedule }, upcoming] = await Promise.all([getSiteData(), getUpcomingEvents(new Date())])

  return (
    <>
      <PageHero title="Events" sentence="Our weekly meetings and any special events. All times are Central Time." />

      <Section id="weekly" title="Every week">
        <ul className="grid list-none gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schedule.map((service) => (
            <li key={service.id}>
              <ServiceTimesCard service={service} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="special" tone="paper" title="Special events">
        {upcoming.length === 0 ? (
          <EmptyState title={EVENTS_EMPTY_STATE} />
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
