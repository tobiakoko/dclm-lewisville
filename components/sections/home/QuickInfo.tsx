import { SERVICE_TIMES, SITE_CONFIG, mapsUrl } from '@/lib/constants'
import { formatClock } from '@/lib/schedule'
import { ServiceTimesCard } from '@/components/site/ServiceTimesCard'
import { Section } from '@/components/site/Section'

const sundayWorship = SERVICE_TIMES.find((service) => service.id === 'sunday-worship')

/** Phone-only bar under the hero: "Sunday 9:30 AM · Directions" (DESIGN-SYSTEM.md, Layout) */
export function SundayBar() {
  if (!sundayWorship) return null
  return (
    <div className="on-dark bg-navy-900 text-white md:hidden">
      <p className="tabular mx-auto flex max-w-content items-center justify-center gap-2 px-4 py-2 font-semibold">
        {sundayWorship.day} {formatClock(sundayWorship.start)}
        <span aria-hidden="true">·</span>
        <a href={mapsUrl(SITE_CONFIG.address)} className="inline-flex min-h-11 items-center underline underline-offset-4">
          Directions
        </a>
      </p>
    </div>
  )
}

/** Weekly schedule strip; visible on phones (SITE-CONTENT.md §2) */
export function QuickInfo() {
  return (
    <Section id="times" title="When we meet" intro={<p>All times are Central Time.</p>}>
      <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_TIMES.map((service) => (
          <li key={service.id}>
            <ServiceTimesCard service={service} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
