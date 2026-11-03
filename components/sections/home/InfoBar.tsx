import type { ReactNode } from 'react'
import { Clock, MapPin, Youtube } from 'lucide-react'
import { mapsUrl, type ServiceTime, type SiteConfig } from '@/lib/constants'
import { formatClock, formatServiceTime, mainService } from '@/lib/schedule'
import { HOME } from '@/lib/content/interface'
import { IconTile } from '@/components/ui/icon-tile'
import { Card } from '@/components/ui/surface'

function Cell({ icon, label, value, children }: { icon: ReactNode; label: string; value: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-[18px] px-6 py-6 shadow-[inset_0_1px_0_var(--color-line)] first:shadow-none sm:px-8 sm:py-7 wide:shadow-[inset_1px_0_0_var(--color-line)] wide:first:shadow-none">
      <IconTile>{icon}</IconTile>
      <div className="min-w-0">
        <p className="type-eyebrow text-ink-muted">{label}</p>
        <p className="tabular mt-2 text-xl font-bold leading-tight text-navy-900">{value}</p>
        <div className="mt-1 text-[0.9375rem] text-ink-muted">{children}</div>
      </div>
    </li>
  )
}

const linkClass = 'font-semibold text-emblem-sky-700 underline decoration-[1.5px] underline-offset-4 hover:text-navy-900'

/**
 * Sunday worship, where to find us, and how to watch, in a white card that overlaps the hero
 * (REDESIGN.md §3.2). Replaces the phone-only Sunday bar. Everything comes from siteSettings.
 */
export function InfoBar({ config, schedule }: { config: SiteConfig; schedule: ServiceTime[] }) {
  const main = mainService(schedule)
  const prayer = main && schedule.find((service) => service.day === main.day && service.mode === 'online' && service.start < main.start)
  return (
    <div className="relative z-10 mx-auto -mt-24 w-full max-w-content px-5 sm:px-6 wide:px-10">
      <Card>
        <ul className="grid list-none wide:grid-cols-3">
          {main && (
            <Cell icon={<Clock />} label={HOME.infoBar.worship} value={formatServiceTime(main)}>
              {prayer && <p>Prayer online from {formatClock(prayer.start)}</p>}
            </Cell>
          )}
          <Cell icon={<MapPin />} label={HOME.infoBar.findUs} value={config.address.street}>
            <p>
              {config.address.city}, {config.address.state} {config.address.zip} ·{' '}
              <a href={mapsUrl(config.address)} className={linkClass}>
                Directions
              </a>
            </p>
          </Cell>
          <Cell icon={<Youtube />} label={HOME.infoBar.cantMakeIt} value="Watch live on YouTube">
            <p>
              {main && (
                <>
                  {main.day}s, {formatClock(main.start)} CT ·{' '}
                </>
              )}
              <a href={config.youtube.streams} className={linkClass}>
                Open stream
              </a>
            </p>
          </Cell>
        </ul>
      </Card>
    </div>
  )
}
