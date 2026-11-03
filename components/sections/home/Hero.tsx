import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import type { ServiceTime, SiteConfig } from '@/lib/constants'
import { formatClock, mainService } from '@/lib/schedule'
import { OVERLAY_HERO_ID } from '@/lib/routes'
import { buttonVariants } from '@/components/ui/button'
import congregation from '@/app/assets/congregation.jpeg'

const MODE_PHRASE = { 'in-person': 'In person', online: 'Online', both: 'In person & online' } as const

/**
 * Full-bleed congregation photo behind the navy scrim, with the overlay header on top
 * (REDESIGN.md §3.1). Acceptance: on a 390px phone the header brand, the Sunday time in the pill
 * and "Plan your visit" are visible without scrolling. The bottom padding leaves room for the
 * info bar, which overlaps the hero.
 */
export default function Hero({
  config,
  schedule,
  hero,
}: {
  config: SiteConfig
  schedule: ServiceTime[]
  hero: { title: string; subtitle: string }
}) {
  const main = mainService(schedule)
  return (
    <section id={OVERLAY_HERO_ID} aria-labelledby="hero-heading" className="on-dark relative isolate overflow-hidden bg-navy-950">
      <Image
        src={congregation}
        alt="Members of the congregation together for a group photo"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[62%_30%]"
      />
      <div aria-hidden="true" className="hero-scrim absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-content px-5 pb-[136px] pt-[104px] sm:px-6 sm:pb-[176px] sm:pt-[184px] wide:px-10">
        <div className="max-w-[700px] wide:max-w-[min(700px,55%)]">
          {main && (
            <p className="tabular inline-flex min-h-10 items-center rounded-pill bg-white/10 px-4 text-[0.9375rem] font-semibold leading-tight text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.22)]">
              {main.day}s at {formatClock(main.start)} · {MODE_PHRASE[main.mode]}
            </p>
          )}
          <h1 id="hero-heading" className="type-display mt-6 text-white">
            {hero.title}
          </h1>
          <p className="type-lead mt-6 max-w-[38rem]">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/visit" className={buttonVariants()}>
              Plan your visit
            </Link>
            <a href={config.youtube.streams} className={buttonVariants({ variant: 'ghost' })}>
              <Play aria-hidden="true" fill="currentColor" strokeWidth={0} />
              Watch online
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
