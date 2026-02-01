import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import HeroSection from '@/components/sections/HeroSection'

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with DCLM Lewisville. Visit us, call us, or send us a message.',
}

interface Location {
  name: string
  subtitle?: string
  imageUrl: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  services: {
    label: string
    time: string
  }[]
}

const locations: Location[] = [
  {
    name: 'Lewisville',
    subtitle: 'Local Assembly',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3mIqX3DXLoFoD983nYzHMq9AogNzDwVOYopcIM8ePJuvohFtg_uJ_GmUy3OgOo40e89sHQDXj5hX5KSBanlXREIVHH77g15Togkx4z4D_kik1aIZMZGlXBfhrCqacnuFvFEOMsiKoy--eJGMhspNHxwZoxwLTyBPWhU8TSgib5NFkOLz2D_HlIj6x6Bk-SIAwwB_qa9l5uoNDGw1gXcb-_wOUvOELz2bx9DNrrwH9Ok38s201nmwGMpsICB3MbL1mz8B2nEiYRUQ',
    address: {
      street: '1368 W Main St',
      city: 'Lewisville',
      state: 'TX',
      zip: '75067',
    },
    services: [
      { label: 'Worship Service', time: 'Sunday: 9:30 AM - 12:30 PM' },
      { label: 'Bible Study', time: 'Tuesday: 7:00 PM - 9:00 PM' },
    ],
  },
  {
    name: 'Denton Campus',
    subtitle: 'Regional Headquarters',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtpfKcBrwjT0bl3DwVGZuB-YIAhZB7VhAiXMWgL7wTskRfJ0e1oaWR4utzyxPHqC5yXhFUmNPL4qQOiWyQoIctlfv9zRj4RDC5QNTIpok0T-oWhbPm5CsnlapDqysCTsHRNINRSUzBXL0vi6qf4w0nRq_F7NKMjV0fPsBisCL1UF5VBUBrIsLbIo6VE08CSsDDaWY5Q0gFT9RdDdaxbaQHp6NfE--JBNVskdNdxIERwAkL6Yij2oAUQq8m6K2T4x9CQ3rGYuZHsHw',
    address: {
      street: '4981 Barthold Rd',
      city: 'Denton',
      state: 'TX',
      zip: '76207',
    },
    services: [
      { label: 'Worship Service', time: 'Sunday: 9:30 AM - 12:30 PM' },
      { label: 'Revival Service', time: 'Thursday: 7:00 PM - 9:00 PM' },
    ],
  },
]

const PRAYER_BG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBhrd4yCsO0yOHKw0GqYQouNQKo0wa-ZyrPwiavzto38vxNzNjtB-KgO9sww5F_lrhLqs3buNM0Vcgvz9uRKSfhvBmWfcIg8ntxsJEJAAYIGdzUPOOJsJNqZoqD7eEC2HSnN4LphXJJgw8LaqsiK9oDp_i_Jg8RjDoVhltZlkK13Htrfi9zCKu2K506dqneInaqMpe8pbz2JkWN5VLKhQKtOV5Qagnyw9jga95Y1YFRgeYAL1tM-cosvL140DjYYJx_lgPesABm01s'

export default function ContactPage() {
  const siteAddressQuery = encodeURIComponent(
    `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}`
  )

  return (
    <main>
      <HeroSection title="Contact Us" subtitle="Get in touch" />

      {/* Locations */}
      <section className="py-24 px-4" aria-labelledby="locations-heading">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <p className="font-display italic text-(--church-red) text-2xl mb-2">
              We would love to see you!
            </p>
            <h2
              id="locations-heading"
              className="font-display text-4xl text-(--church-navy) uppercase tracking-tight"
            >
              See Our Locations
            </h2>
          </header>

          <ul className="grid md:grid-cols-2 gap-12 list-none">
            {locations.map((location) => (
              <li key={location.name}>
                <article className="bg-white rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-1 transition duration-300">
                  <Image
                    src={location.imageUrl}
                    alt={`${location.name} church building`}
                    width={600}
                    height={256}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-8">
                    <h3 className="font-display text-2xl text-(--church-red) mb-6">
                      {location.name}
                      {location.subtitle && ` (${location.subtitle})`}
                    </h3>

                    <dl className="space-y-6">
                      <div className="flex items-start gap-4">
                        <MapPin
                          className="text-(--church-red) shrink-0 mt-1"
                          size={20}
                          aria-hidden="true"
                        />
                        <div>
                          <dt className="text-sm font-bold uppercase text-slate-500">
                            Address
                          </dt>
                          <dd className="text-slate-600">
                            <address className="not-italic">
                              {location.address.street}
                              <br />
                              {location.address.city}, {location.address.state}{' '}
                              {location.address.zip}
                            </address>
                          </dd>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {location.services.map((service) => (
                          <div key={service.label}>
                            <dt className="text-sm font-bold uppercase text-slate-500">
                              {service.label}
                            </dt>
                            <dd className="text-slate-600 text-sm italic">
                              <time>{service.time}</time>
                            </dd>
                          </div>
                        ))}
                      </div>
                    </dl>

                    <footer className="pt-6 mt-6 border-t border-slate-100">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--church-red) font-bold hover:underline inline-flex items-center gap-1"
                      >
                        Get Directions
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    </footer>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="bg-(--brand-navy) py-24 px-4 text-white"
        aria-labelledby="contact-form-heading"
      >
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h2
              id="contact-form-heading"
              className="font-display text-4xl mb-4"
            >
              Send us a message
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Have a question or want to learn more about our ministries? Drop
              us a line and we&apos;ll get back to you shortly.
            </p>
          </header>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="full-name"
                className="text-xs uppercase font-bold tracking-wider text-slate-400"
              >
                Full Name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                placeholder="Your Name"
                required
                className="w-full bg-white text-(--brand-navy) px-4 py-3 border-none focus:ring-2 focus:ring-yellow-500 transition rounded"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs uppercase font-bold tracking-wider text-slate-400"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
                className="w-full bg-white text-(--church-navy) px-4 py-3 border-none focus:ring-2 focus:ring-yellow-500 transition rounded"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label
                htmlFor="subject"
                className="text-xs uppercase font-bold tracking-wider text-slate-400"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full bg-white text-(--church-navy) px-4 py-3 border-none focus:ring-2 focus:ring-yellow-500 transition rounded"
              >
                <option value="general">General Inquiry</option>
                <option value="new-member">New Member Question</option>
                <option value="prayer">Prayer Request</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label
                htmlFor="message"
                className="text-xs uppercase font-bold tracking-wider text-slate-400"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                rows={6}
                required
                className="w-full bg-white text-(--church-navy) px-4 py-3 border-none focus:ring-2 focus:ring-yellow-500 transition rounded"
              />
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <button
                type="submit"
                className="bg-(--church-red) hover:bg-red-800 text-white font-bold py-4 px-12 uppercase tracking-widest transition rounded shadow-lg w-full md:w-auto"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Prayer Section */}
      <section
        className="relative py-32 px-4 overflow-hidden"
        aria-labelledby="prayer-heading"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={PRAYER_BG_IMAGE}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <header>
            <p className="font-display italic text-yellow-500 text-3xl mb-4">
              Let Us Pray For You
            </p>
            <h2
              id="prayer-heading"
              className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-8 leading-tight italic"
            >
              God still answers prayers
            </h2>
          </header>

          <div className="h-1 w-24 bg-(--church-red) mx-auto mb-8" aria-hidden="true" />

          <blockquote className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto italic">
            <p>
              &quot;There are times when life is overwhelming, and all we have
              are questions. In those moments, hope can feel far away. The great
              thing about prayer is that it&apos;s a lifeline that connects us
              directly to the Divine and it shifts our perspective toward the
              One who stands ready to listen.&quot;
            </p>
          </blockquote>

          <button
            type="button"
            className="bg-(--church-red) hover:bg-red-800 text-white px-10 py-4 uppercase font-bold tracking-widest transition rounded shadow-xl"
          >
            Ask for Prayer
          </button>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-gray-50" aria-label="Church location map">
        <div className="container">
          <div
            className="rounded-lg overflow-hidden shadow-lg"
            style={{ height: '450px' }}
          >
            <iframe
              src={`https://www.google.com/maps?q=${siteAddressQuery}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church Location Map"
            />
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">
            Can&apos;t find us? Call us at{' '}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-(--church-red) hover:underline"
            >
              {SITE_CONFIG.phone}
            </a>{' '}
            and we&apos;ll help you!
          </p>
        </div>
      </section>
    </main>
  )
}
