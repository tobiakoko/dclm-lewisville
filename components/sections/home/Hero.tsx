import Image from 'next/image'
import Link from 'next/link'
import { formatAddress, mapsUrl, type ServiceTime, type SiteConfig } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'
import { buttonVariants } from '@/components/ui/button'
import congregation from '@/app/assets/congregation.jpeg'

/**
 * Name, city, Sunday time, address and the three main actions. Text sits on paper (not over
 * the photo) so the red primary button never touches navy and contrast never depends on the image.
 * Acceptance (BUILD-PLAN 2.5): on a 390px phone the name, city, Sunday time and "Plan your visit"
 * are visible without scrolling.
 */
export default function Hero({
  config: SITE_CONFIG,
  schedule,
  hero,
}: {
  config: SiteConfig
  schedule: ServiceTime[]
  hero: { title: string; subtitle: string }
}) {
  const sundayWorship = schedule.find((service) => service.day === 'Sunday' && service.mode !== 'online')
  const [church] = SITE_CONFIG.shortName.split(' · ')
  return (
    <section aria-labelledby="hero-heading" className="bg-paper">
      <div className="mx-auto grid max-w-content items-center gap-8 px-4 py-8 sm:px-6 md:py-14 lg:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          <h1 id="hero-heading">
            {church}
            <span className="mt-1 block text-[0.6em] leading-tight">
              {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}
            </span>
          </h1>
          {sundayWorship && (
            <p className="tabular text-xl font-semibold text-navy-900">
              {sundayWorship.day}s, {formatServiceTime(sundayWorship)}
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {/* The page's one red action */}
            <Link href="/visit" className={buttonVariants()}>
              Plan your visit
            </Link>
            <a href={SITE_CONFIG.youtube.streams} className={buttonVariants({ variant: 'secondary' })}>
              Watch online
            </a>
          </div>
          <p>
            <a href={mapsUrl(SITE_CONFIG.address)} className="text-emblem-sky-700 underline underline-offset-4">
              {formatAddress(SITE_CONFIG.address)}
            </a>
          </p>
          <p className="max-w-prose">
            <strong className="font-serif text-xl text-navy-900">{hero.title}.</strong> {hero.subtitle}
          </p>
          <p>
            <Link href="/about#beliefs" className="font-semibold text-emblem-sky-700 underline underline-offset-4">
              What we believe
            </Link>
          </p>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
          <Image
            src={congregation}
            alt="Members of the congregation together for a group photo"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
