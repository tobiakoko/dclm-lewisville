import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import { ContactSection } from '@/components/ContactSection'
import { ArrowLink } from '@/components/ui/arrow-link'
import { Eyebrow } from '@/components/ui/eyebrow'
import { IconTile } from '@/components/ui/icon-tile'
import { Card, Panel } from '@/components/ui/surface'
import { CONTACT } from '@/lib/content/interface'
import { formatAddress, mapsUrl, telHref } from '@/lib/constants'
import { getSiteData } from '@/lib/data'
import { MINISTRY_NAMES } from '@/lib/validations/contact'

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData()
  return {
    title: 'Contact and Prayer',
    description: `Phone, email, address and office hours for ${config.name}, and how to send a prayer request.`,
    alternates: { canonical: '/contact' },
  }
}

const linkClass = 'font-bold text-navy-900 no-underline hover:underline hover:underline-offset-4'

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>
}) {
  const [{ topic }, { config, otherLocations }] = await Promise.all([searchParams, getSiteData()])
  // ?topic=prayer opens the prayer form; Ministries' "Send us a message" links pass the ministry name
  const ministry = typeof topic === 'string' && MINISTRY_NAMES.includes(topic) ? topic : undefined
  const map = (
    <div className="aspect-[4/3] overflow-hidden rounded-panel bg-paper-2 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(formatAddress(config.address))}&output=embed`}
        className="size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${formatAddress(config.address)}`}
      />
    </div>
  )

  return (
    <>
      {/* Lewisville's details come first (SITE-CONTENT.md §8) */}
      <PageHero eyebrow={CONTACT.eyebrow} title={CONTACT.title} lead={CONTACT.lead} media={map}>
        <h2 className="sr-only">{config.name}</h2>
        <ul className="flex list-none flex-col gap-5">
          <li className="flex items-center gap-4">
            <IconTile tone="warm">
              <Phone />
            </IconTile>
            <a href={telHref(config.phone)} className={`tabular ${linkClass}`}>
              {config.phone}
            </a>
          </li>
          <li className="flex items-center gap-4">
            <IconTile tone="warm">
              <Mail />
            </IconTile>
            <a href={`mailto:${config.email}`} className={`${linkClass} break-all`}>
              {config.email}
            </a>
          </li>
          <li className="flex items-start gap-4">
            <IconTile tone="warm">
              <MapPin />
            </IconTile>
            <div>
              <address className="font-bold not-italic text-navy-900">{formatAddress(config.address)}</address>
              <ArrowLink href={mapsUrl(config.address)}>Get directions</ArrowLink>
            </div>
          </li>
        </ul>
      </PageHero>

      <Section id="contact-form" titleId="contact-form-heading">
        <div id="prayer" className="grid scroll-mt-24 items-start gap-12 wide:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] wide:gap-16">
          <div>
            <Eyebrow className="mb-4">{CONTACT.eyebrow}</Eyebrow>
            <h2 id="contact-form-heading">Send us a message</h2>
            <Panel className="mt-8 p-7">
              <h3 className="type-h4">Office hours</h3>
              <p className="mt-2 text-ink-muted">{config.officeHours}</p>
            </Panel>
          </div>
          <Card className="p-6 sm:p-10">
            <ContactSection
              phone={config.phone}
              email={config.email}
              initialTopic={topic === 'prayer' ? 'prayer' : 'contact'}
              ministry={ministry}
              prayerHubUrl={config.dclm.prayerRequestHub}
            />
          </Card>
        </div>
      </Section>

      <Section id="other-locations" tone="paper" size="md" title="Our other locations">
        <ul className="grid list-none gap-5 sm:grid-cols-2">
          {otherLocations.map((location) => (
            <li key={location.name}>
              <Card className="flex h-full flex-col gap-2 p-7">
                <h3 className="type-h4">{location.name}</h3>
                <address className="not-italic">{formatAddress(location.address)}</address>
                <p className="text-ink-muted">{location.serviceTimes}</p>
                <ArrowLink href={mapsUrl(location.address)} className="mt-auto">
                  Get directions<span className="sr-only"> to {location.name}</span>
                </ArrowLink>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
