import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import { SITE_CONFIG, SERVICE_TIMES, NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-heading text-white text-lg font-bold mb-4">
              {SITE_CONFIG.shortName}
            </h3>
            <p className="text-sm mb-4">{SITE_CONFIG.description}</p>
            <div className="flex space-x-4">
              <a
                href={SITE_CONFIG.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SITE_CONFIG.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SITE_CONFIG.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.filter((link) => !link.highlight).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-white font-semibold mb-4">Service Times</h3>
            <ul className="space-y-2">
              {SERVICE_TIMES.map((service) => (
                <li key={service.name} className="text-sm">
                  <strong className="text-white">{service.name}</strong>
                  <br />
                  {service.day}s at {service.time}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <address className="text-sm not-italic space-y-2">
              <p>{SITE_CONFIG.address}</p>
              <p>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}