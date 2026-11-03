import type { Metadata } from 'next'
import { PageHero } from '@/components/site/PageHero'
import { Section } from '@/components/site/Section'
import ContactForm from '@/components/ContactForm'
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

const linkClass = 'font-semibold text-emblem-sky-700 underline underline-offset-4'

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>
}) {
  const [{ topic }, { config, otherLocations }] = await Promise.all([searchParams, getSiteData()])
  // "Send us a message" links from Ministries pass ?topic=<ministry name>
  const ministry = typeof topic === 'string' && MINISTRY_NAMES.includes(topic) ? topic : undefined

  return (
    <>
      <PageHero title="Contact and Prayer" sentence="Call, email or send us a message. Prayer requests go to our pastor." />

      {/* Lewisville's details come first (SITE-CONTENT.md §8) */}
      <Section id="details" title={config.name}>
        <div className="grid gap-8 lg:grid-cols-2">
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-navy-900">Phone</dt>
              <dd>
                <a href={telHref(config.phone)} className={linkClass}>
                  {config.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-900">Email</dt>
              <dd>
                <a href={`mailto:${config.email}`} className={`${linkClass} break-all`}>
                  {config.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-900">Address</dt>
              <dd className="space-y-1">
                <address className="not-italic">{formatAddress(config.address)}</address>
                <a href={mapsUrl(config.address)} className={linkClass}>
                  Get directions
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-900">Office hours</dt>
              <dd className="max-w-prose">{config.officeHours}</dd>
            </div>
          </dl>
          <div className="h-80 overflow-hidden rounded-2xl border border-border-input/40">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(formatAddress(config.address))}&output=embed`}
              className="size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${formatAddress(config.address)}`}
            />
          </div>
        </div>
      </Section>

      <Section id="contact-form" tone="paper" title="Send us a message">
        <ContactForm phone={config.phone} email={config.email} topic={ministry ? 'ministry' : 'contact'} ministry={ministry} />
      </Section>

      <Section id="prayer" title="Prayer requests" intro={<p>Prayer requests are read by our pastor.</p>}>
        <ContactForm phone={config.phone} email={config.email} topic="prayer" submitLabel="Send prayer request" />
        <p className="mt-8">
          You can also use the{' '}
          <a href={config.dclm.prayerRequestHub} className={linkClass}>
            DCLM Prayer Request Hub
          </a>
          .
        </p>
      </Section>

      <Section id="other-locations" tone="paper" title="Our other locations">
        <ul className="grid list-none gap-6 md:grid-cols-2">
          {otherLocations.map((location) => (
            <li key={location.name} className="space-y-2 rounded-2xl border border-border-input/40 bg-white p-6">
              <h3>{location.name}</h3>
              <address className="not-italic">{formatAddress(location.address)}</address>
              <p className="text-ink-muted">{location.serviceTimes}</p>
              <a href={mapsUrl(location.address)} className={linkClass}>
                Get directions<span className="sr-only"> to {location.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
