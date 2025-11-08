import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SITE_CONFIG, SERVICE_TIMES } from '@/lib/constants'
import ContactForm from '@/components/ContactForm'
import PageHero from '@/components/sections/PageHero'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with DCLM Lewisville. Visit us, call us, or send us a message.',
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you! Reach out with any questions or to plan your visit."
        variant="simple"
      />

      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-6">Visit Us</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mr-4">
                      <MapPin className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Address</h3>
                      <p className="text-gray-600">
                        {SITE_CONFIG.address.street}<br />
                        {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-1 inline-block"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mr-4">
                      <Phone className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Phone</h3>
                      <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mr-4">
                      <Mail className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Times */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-heading text-2xl font-bold mb-4">Service Times</h3>
                <div className="space-y-4">
                  {SERVICE_TIMES.map((service) => (
                    <div key={service.name} className="flex items-start">
                      <Clock className="text-blue-600 mr-3 mt-1 shrink-0" size={20} />
                      <div>
                        <div className="font-bold">{service.name}</div>
                        <div className="text-sm text-gray-600">
                          {service.day}s at {service.time}
                        </div>
                        <div className="text-sm text-gray-500">{service.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-heading text-xl font-bold mb-4">What to Expect</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Casual dress is welcome - come as you are</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Services typically last 1.5-2 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Children&apos;s ministry available during services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Free parking available on site</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Friendly greeters to help you find your way</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
                <h2 className="font-heading text-3xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '450px' }}>
            <iframe
              src={`https://maps.google.com/?q=${encodeURIComponent(
                    `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}`
              )}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church Location"
            />
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">
            Can&apos;t find us? Call us at {SITE_CONFIG.phone} and we&apos;ll help you!
          </p>
        </div>
      </section>
    </div>
  )
}
