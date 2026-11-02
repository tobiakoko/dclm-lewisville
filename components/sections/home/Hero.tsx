import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { SITE_CONFIG, SERVICE_TIMES, formatAddress, mapsUrl } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'
import { HOME_HERO } from '@/lib/content/site'
import congregation from '@/app/assets/congregation.jpeg'

const sundayWorship = SERVICE_TIMES.find((service) => service.id === 'sunday-worship')

/** Home hero with the approved "Come as you are" copy (SITE-CONTENT.md §3) */
export default function Hero() {
  return (
    <section className="relative bg-(--church-navy) min-h-[560px] flex items-center" aria-labelledby="hero-heading">
      <Image
        src={congregation}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-(--church-navy)/80" aria-hidden="true" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl space-y-6 text-white">
          <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
          <h1 id="hero-heading" className="text-5xl sm:text-6xl font-display font-bold leading-[1.05]">
            {HOME_HERO.title}
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed">{HOME_HERO.subtitle}</p>

          <ul className="space-y-2 text-lg list-none">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 shrink-0" aria-hidden="true" />
              <a href={mapsUrl(SITE_CONFIG.address)} className="underline underline-offset-4">
                {formatAddress(SITE_CONFIG.address)}
              </a>
            </li>
            {sundayWorship && (
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 shrink-0" aria-hidden="true" />
                <span>
                  {sundayWorship.day}s, {formatServiceTime(sundayWorship)}
                </span>
              </li>
            )}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* TODO: point to /visit once Plan Your Visit exists (BUILD-PLAN 2.6) */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-(--church-red) text-white font-bold rounded-full"
            >
              Plan your visit
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={SITE_CONFIG.youtube.streams}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-(--church-navy) font-bold rounded-full"
            >
              Watch online
            </a>
          </div>
          <Link href="/about#beliefs" className="inline-block underline underline-offset-4 font-semibold">
            What we believe
          </Link>
        </div>
      </div>
    </section>
  )
}
