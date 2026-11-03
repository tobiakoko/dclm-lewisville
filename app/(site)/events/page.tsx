import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { ScheduleRow } from '@/components/site/Schedule'
import { EventCard } from '@/components/site/EventCard'
import { WeekStrip } from '@/components/site/WeekStrip'
import { EmptyState } from '@/components/site/Alert'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/surface'
import { EVENTS_EMPTY_STATE } from '@/lib/events'
import { EVENTS } from '@/lib/content/interface'
import { MAIN_SERVICE_ID } from '@/lib/schedule'
import { dateInZone } from '@/lib/week'
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

// TODO(owner): "Add to Google Calendar" and .ics buttons wait for the owner's yes (BUILD-PLAN 4.11)
export default async function EventsPage() {
  const now = new Date()
  const [{ config, schedule, exceptions }, upcoming] = await Promise.all([getSiteData(), getUpcomingEvents(now)])

  return (
    <>
      <PageHero eyebrow={EVENTS.eyebrow} title={EVENTS.title} lead={EVENTS.lead}>
        <WeekStrip
          today={dateInZone(now, config.timeZone)}
          schedule={schedule}
          events={upcoming}
          exceptions={exceptions}
          mainServiceId={MAIN_SERVICE_ID}
          timeZone={config.timeZone}
        />
      </PageHero>

      <Section id="special" title="Special events">
        {upcoming.length === 0 ? (
          <EmptyState
            title={EVENTS_EMPTY_STATE}
            action={
              <Link href="/visit" className={buttonVariants()}>
                Plan your visit
              </Link>
            }
          />
        ) : (
          <ul className="flex list-none flex-col gap-4">
            {upcoming.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="weekly" tone="paper" title="Every week" intro={<p>All times are Central Time.</p>}>
        <Card className="px-6 pb-2 pt-2 sm:px-8">
          {schedule.map((service) => (
            <ScheduleRow key={service.id} service={service} />
          ))}
        </Card>
      </Section>
    </>
  )
}
