import HeroSection from '@/components/sections/HeroSection'
import ContactForm from '@/components/ContactForm'
import { OTHER_LOCATIONS, SITE_CONFIG, formatAddress, mapsUrl, telHref } from '@/lib/constants'
import { MINISTRY_NAMES } from '@/lib/validations/contact'

export const metadata = {
  title: 'Contact and Prayer',
  description: `Phone, email, address and office hours for ${SITE_CONFIG.name}, and how to send a prayer request.`,
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>
}) {
  const { topic } = await searchParams
  // "Send us a message" links from Ministries pass ?topic=<ministry name>
  const ministry = typeof topic === 'string' && MINISTRY_NAMES.includes(topic) ? topic : undefined

  return (
    <div className="bg-white">
      <HeroSection title="Contact and Prayer" subtitle={SITE_CONFIG.name} />

      {/* --- Lewisville details first (SITE-CONTENT.md §8) --- */}
      <section className="py-20 px-6" aria-labelledby="details-heading">
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-slate-700">
          <h2 id="details-heading" className="font-serif text-3xl text-(--church-navy)">
            {SITE_CONFIG.name}
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-bold text-(--church-navy)">Phone</dt>
              <dd>
                <a href={telHref(SITE_CONFIG.phone)} className="underline underline-offset-4">
                  {SITE_CONFIG.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-bold text-(--church-navy)">Email</dt>
              <dd>
                <a href={`mailto:${SITE_CONFIG.email}`} className="underline underline-offset-4">
                  {SITE_CONFIG.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-bold text-(--church-navy)">Address</dt>
              <dd>
                <address className="not-italic">{formatAddress(SITE_CONFIG.address)}</address>
                <a href={mapsUrl(SITE_CONFIG.address)} className="underline underline-offset-4">
                  Get directions
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-bold text-(--church-navy)">Office hours</dt>
              <dd>{SITE_CONFIG.officeHours}</dd>
            </div>
          </dl>
          <div className="rounded-lg overflow-hidden border border-slate-200 h-80">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(formatAddress(SITE_CONFIG.address))}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${formatAddress(SITE_CONFIG.address)}`}
            />
          </div>
        </div>
      </section>

      {/* --- Contact form --- */}
      <section id="contact-form" className="bg-(--church-navy) py-20 px-6 text-white scroll-mt-24" aria-labelledby="contact-form-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="contact-form-heading" className="font-display text-4xl mb-8">
            Send us a message
          </h2>
          <ContactForm topic={ministry ? 'ministry' : 'contact'} ministry={ministry} />
        </div>
      </section>

      {/* --- Prayer --- */}
      <section id="prayer" className="py-20 px-6 bg-slate-50 scroll-mt-24" aria-labelledby="prayer-heading">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 id="prayer-heading" className="font-serif text-4xl text-(--church-navy)">
            Prayer requests
          </h2>
          <p className="text-lg text-slate-700">Prayer requests are read by our pastor.</p>
          <div className="bg-(--church-navy) text-white rounded-2xl p-6">
            <ContactForm topic="prayer" submitLabel="Send prayer request" />
          </div>
          <p className="text-lg text-slate-700">
            You can also use the{' '}
            <a href={SITE_CONFIG.dclm.prayerRequestHub} className="underline underline-offset-4 font-semibold text-(--church-navy)">
              DCLM Prayer Request Hub
            </a>
            .
          </p>
        </div>
      </section>

      {/* --- Our other locations --- */}
      <section className="py-20 px-6" aria-labelledby="locations-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="locations-heading" className="font-serif text-4xl text-(--church-navy) mb-8">
            Our other locations
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 list-none">
            {OTHER_LOCATIONS.map((location) => (
              <li key={location.name} className="rounded-2xl border border-slate-200 p-6 space-y-2 text-slate-700">
                <h3 className="font-serif text-xl font-bold text-(--church-navy)">{location.name}</h3>
                <address className="not-italic">{formatAddress(location.address)}</address>
                <p>{location.serviceTimes}</p>
                <a href={mapsUrl(location.address)} className="underline underline-offset-4">
                  Get directions<span className="sr-only"> to {location.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
