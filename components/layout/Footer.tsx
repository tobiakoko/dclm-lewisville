import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Play, Youtube, type LucideIcon } from 'lucide-react'
import { DCLM_RESOURCES, formatAddress, mapsUrl, telHref, type ServiceTime, type SiteConfig } from '@/lib/constants'
import { getSiteData } from '@/lib/data'
import { formatClock, formatServiceTime, mainService } from '@/lib/schedule'
import { cityAndState } from '@/lib/address'
import { FOOTER_CTA } from '@/lib/content/interface'
import { buttonVariants } from '@/components/ui/button'
import { gaMeasurementId } from '@/lib/consent'
import { CookieSettingsButton } from '@/components/consent/ConsentBanner'

interface SocialLink {
  name: string
  icon: LucideIcon
  href: string | null
}

// Only links the church has provided are shown
function socialLinks(config: SiteConfig) {
  return ([
    { name: 'Facebook', icon: Facebook, href: config.socialMedia.facebook },
    { name: 'Instagram', icon: Instagram, href: config.socialMedia.instagram },
    { name: 'YouTube', icon: Youtube, href: config.youtube.channel },
  ] satisfies SocialLink[]).filter((link): link is SocialLink & { href: string } => link.href !== null)
}

const linkClass =
  'inline-flex min-h-11 items-center text-white/78 no-underline hover:text-white hover:underline hover:underline-offset-4 sm:min-h-8'
const headingClass = 'mb-5 font-sans text-sm font-bold uppercase leading-none tracking-[0.12em] text-white'

/** "Sunday Worship Service" → "Worship Service": the day is already in the row */
function shortName(name: string, day: string) {
  return name.startsWith(`${day} `) ? name.slice(day.length + 1) : name
}

/** Meetings grouped by day, in schedule order */
function byDay(schedule: ServiceTime[]) {
  const days = new Map<string, ServiceTime[]>()
  for (const service of schedule) days.set(service.day, [...(days.get(service.day) ?? []), service])
  return [...days.entries()]
}

/** CTA band, four columns, bottom bar (REDESIGN.md §2) */
export default async function Footer() {
  const { config, schedule } = await getSiteData()
  const SOCIAL_LINKS = socialLinks(config)
  const main = mainService(schedule)
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark bg-navy-950 text-[0.9375rem] leading-relaxed text-white/76">
      <h2 className="sr-only">Site information</h2>
      <div className="mx-auto w-full max-w-content px-5 sm:px-6 wide:px-10">
        <div className="flex flex-wrap items-center justify-between gap-8 border-b border-white/12 py-14">
          <div className="max-w-[620px] space-y-2.5">
            <p className="font-serif text-[clamp(1.75rem,3vw,2.375rem)] font-semibold leading-tight text-white">{FOOTER_CTA.title}</p>
            {main && <p className="text-base">{FOOTER_CTA.line(formatClock(main.start))}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/visit" className={buttonVariants()}>
              Plan your visit
            </Link>
            <a href={config.youtube.streams} className={buttonVariants({ variant: 'ghost' })}>
              <Play aria-hidden="true" fill="currentColor" strokeWidth={0} />
              Watch online
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 wide:grid-cols-[1.35fr_1.3fr_0.9fr_0.9fr] wide:pb-14 wide:pt-16">
          <div className="space-y-5">
            <Link href="/" className="flex min-h-11 items-center gap-3 text-white no-underline">
              <Image src="/dclm_logo.png" alt="" width={46} height={46} className="size-[46px] shrink-0 rounded-full bg-white object-contain" />
              <span className="leading-tight">
                <span className="block font-serif text-[1.1875rem] font-semibold">{config.shortName.split(' · ')[0]}</span>
                <span className="block text-sm font-semibold text-white/70">{cityAndState(config.address)}</span>
              </span>
              <span className="sr-only">, home page</span>
            </Link>
            <address className="flex flex-col not-italic">
              <a href={mapsUrl(config.address)} className={linkClass}>
                {formatAddress(config.address)}
              </a>
              <a href={telHref(config.phone)} className={linkClass}>
                {config.phone}
              </a>
              <a href={`mailto:${config.email}`} className={`${linkClass} break-all`}>
                {config.email}
              </a>
            </address>
            {SOCIAL_LINKS.length > 0 && (
              <ul className="flex list-none gap-3" aria-label="Follow us">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/18"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon aria-hidden="true" className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className={headingClass}>When we meet</h3>
            <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-3">
              {byDay(schedule).map(([day, services]) => (
                <div key={day} className="contents">
                  <dt className="font-bold text-white">{day}</dt>
                  <dd className="tabular">
                    {services.map((service) => `${shortName(service.name, day)} ${formatServiceTime(service)}`).join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3.5 text-sm text-white/60">All times Central</p>
          </div>

          <div>
            <h3 className={headingClass}>Get in touch</h3>
            <ul className="flex list-none flex-col">
              <li>
                <Link href="/visit" className={linkClass}>
                  Plan your visit
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/contact#prayer" className={linkClass}>
                  Prayer requests
                </Link>
              </li>
              <li>
                <Link href="/give" className={linkClass}>
                  Give
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>DCLM resources</h3>
            <ul className="flex list-none flex-col">
              {DCLM_RESOURCES.map((resource) => (
                <li key={resource.href}>
                  <a href={resource.href} className={linkClass}>
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/12 py-6 text-sm">
          <p>
            © {year} {config.name}
          </p>
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-1">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms of Use
              </Link>
            </li>
            {gaMeasurementId() && (
              <li>
                <CookieSettingsButton />
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  )
}
