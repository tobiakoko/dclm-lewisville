import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, type LucideIcon } from 'lucide-react'
import { DCLM_RESOURCES, formatAddress, mapsUrl, telHref, type SiteConfig } from '@/lib/constants'
import { getSiteData } from '@/lib/data'
import { formatServiceTime } from '@/lib/schedule'
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

const linkClass = 'underline-offset-4 hover:underline'

/** Address, phone, email, service times, social, DCLM resources, Privacy, Terms (DESIGN-SYSTEM.md) */
export default async function Footer() {
  const { config, schedule } = await getSiteData()
  const SOCIAL_LINKS = socialLinks(config)
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark bg-navy-950 text-white">
      <h2 className="sr-only">Site information</h2>
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image src="/dclm_logo.png" alt="" width={56} height={50} className="h-12 w-auto" />
            <span className="font-serif text-lg font-semibold leading-tight">{config.name}</span>
          </Link>
          <address className="space-y-2 not-italic">
            <a href={mapsUrl(config.address)} className={`block ${linkClass}`}>
              {formatAddress(config.address)}
            </a>
            <a href={telHref(config.phone)} className={`block ${linkClass}`}>
              {config.phone}
            </a>
            <a href={`mailto:${config.email}`} className={`block break-all ${linkClass}`}>
              {config.email}
            </a>
          </address>
          {SOCIAL_LINKS.length > 0 && (
            <ul className="flex list-none gap-3" aria-label="Follow us">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-emblem-sky-400"
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
          <h3 className="mb-4 text-lg">When we meet</h3>
          <ul className="space-y-3 list-none">
            {schedule.map((service) => (
              <li key={service.id}>
                <span className="block font-semibold">{service.name}</span>
                <span className="tabular">
                  {service.day}, {formatServiceTime(service)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg">Get in touch</h3>
          <ul className="space-y-2 list-none">
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
          <h3 className="mb-4 text-lg">DCLM resources</h3>
          <ul className="space-y-2 list-none">
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

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-6 text-[0.9375rem] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {year} {config.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none">
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
            <li>
              <a href="/sitemap.xml" className={linkClass}>
                Sitemap
              </a>
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
