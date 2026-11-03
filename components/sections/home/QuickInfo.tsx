import Link from 'next/link'
import { MonitorPlay, Users } from 'lucide-react'
import type { ServiceTime, SiteConfig } from '@/lib/constants'
import { formatClock, formatServiceTime, mainService } from '@/lib/schedule'
import { HOME } from '@/lib/content/interface'
import { JoinLine, ScheduleRow } from '@/components/site/ServiceTimesCard'
import { Section } from '@/components/site/Section'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Chip } from '@/components/ui/chip'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardDark } from '@/components/ui/surface'

/** The main service as the featured navy card, with the prayer meeting before it */
function FeaturedService({ service, before, streamsUrl }: { service: ServiceTime; before?: ServiceTime; streamsUrl: string }) {
  return (
    <CardDark className="flex h-full flex-col p-7 sm:p-10">
      <div className="flex flex-wrap gap-2">
        <Chip tone="dark">{service.day}</Chip>
        <Chip className="bg-emblem-sky-400 text-navy-950">Main service</Chip>
      </div>
      <h3 className="mt-6 text-[clamp(2rem,3vw,2.375rem)] leading-tight">{service.name}</h3>
      <p className="tabular mt-3 text-[1.75rem] font-bold leading-tight text-white">{formatServiceTime(service)}</p>
      <ul className="mt-4 flex list-none flex-wrap gap-x-5 gap-y-2 text-base" aria-label="How to attend">
        {service.mode !== 'online' && (
          <li className="inline-flex items-center gap-2">
            <Users aria-hidden="true" className="size-5 text-emblem-sky-400" />
            In person
          </li>
        )}
        {service.mode !== 'in-person' && (
          <li className="inline-flex items-center gap-2">
            <MonitorPlay aria-hidden="true" className="size-5 text-emblem-sky-400" />
            Online
          </li>
        )}
      </ul>
      <p className="mt-5">{service.description}</p>
      {before && (
        <div className="mt-6 border-t border-white/14 pt-6 text-base">
          <p>
            <span className="font-bold text-white">Before the service</span> · {before.name} ·{' '}
            <span className="tabular whitespace-nowrap">{formatClock(before.start)}</span> · Online
          </p>
          <JoinLine service={before} className="mt-1" />
        </div>
      )}
      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        <Link href="/visit" className={buttonVariants()}>
          Plan your visit
        </Link>
        <a href={streamsUrl} className={buttonVariants({ variant: 'ghost' })}>
          Watch live
        </a>
      </div>
    </CardDark>
  )
}

/** "When we meet": the Sunday service featured, the rest of the week as rows (REDESIGN.md §3.3) */
export function QuickInfo({ config, schedule }: { config: SiteConfig; schedule: ServiceTime[] }) {
  const main = mainService(schedule)
  const before = main ? schedule.find((service) => service.day === main.day && service.id !== main.id && service.start < main.start) : undefined
  const week = schedule.filter((service) => service !== main && service !== before)
  return (
    <Section
      id="times"
      eyebrow={HOME.eyebrows.meet}
      title="When we meet"
      action={<p className="text-base text-ink-muted">All times are Central Time.</p>}
    >
      <div className="grid gap-6 wide:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {main && <FeaturedService service={main} before={before} streamsUrl={config.youtube.streams} />}
        <Card className="px-6 pb-2 pt-7 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <h3>Through the week</h3>
            <ArrowLink href="/events">All events</ArrowLink>
          </div>
          {week.map((service) => (
            <ScheduleRow key={service.id} service={service} headingLevel={4} />
          ))}
        </Card>
      </div>
    </Section>
  )
}
