import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SITE_CONFIG, SERVICE_TIMES } from '@/lib/constants'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or want to know more? We&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="font-heading text-2xl font-bold mb-6">
                Visit Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-blue-600 mr-4 mt-1 shrink-0" size={20} />
                  <div>
                    <div className="font-medium mb-1">Address</div>
                    <div className="text-gray-600">{SITE_CONFIG.address}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-blue-600 mr-4 mt-1 shrink-0" size={20} />
                  <div>
                    <div className="font-medium mb-1">Phone</div>
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-blue-600 mr-4 mt-1 shrink-0" size={20} />
                  <div>
                    <div className="font-medium mb-1">Email</div>
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

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="font-heading text-2xl font-bold mb-6">
                Service Times
              </h3>
              <div className="space-y-4">
                {SERVICE_TIMES.map((service) => (
                  <div key={service.name} className="flex items-start">
                    <Clock className="text-blue-600 mr-4 mt-1 shrink-0" size={20} />
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-600">
                        {service.day}s at {service.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="font-heading text-2xl font-bold mb-6">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
