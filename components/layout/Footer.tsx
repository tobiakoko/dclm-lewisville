import Link from 'next/link'
import { Facebook, Instagram, Youtube, Heart, Mail, Phone, MapPin } from 'lucide-react'
import { SITE_CONFIG, SERVICE_TIMES, NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="font-heading text-white text-xl font-bold">
                  {SITE_CONFIG.shortName}
                </h3>
                <p className="text-xs text-gray-400">Deeper Christian Life Ministry</p>
              </div>
            </div>
            <p className="text-sm mb-6 leading-relaxed text-gray-400">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-3">
              <a
                href={SITE_CONFIG.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-primary hover:to-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook size={18} className="group-hover:text-white transition-colors" />
              </a>
              <a
                href={SITE_CONFIG.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-primary hover:to-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram size={18} className="group-hover:text-white transition-colors" />
              </a>
              <a
                href={SITE_CONFIG.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-primary hover:to-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="YouTube"
              >
                <Youtube size={18} className="group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Quick Links
              <span className="h-0.5 w-8 bg-gradient-to-r from-primary to-secondary" />
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.filter((link) => !link.highlight).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Service Times
              <span className="h-0.5 w-8 bg-gradient-to-r from-primary to-secondary" />
            </h3>
            <ul className="space-y-4">
              {SERVICE_TIMES.map((service) => (
                <li key={service.name} className="text-sm">
                  <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                    <strong className="text-white block mb-1">{service.name}</strong>
                    <p className="text-gray-400 text-xs">
                      {service.day}s at {service.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Contact Us
              <span className="h-0.5 w-8 bg-gradient-to-r from-primary to-secondary" />
            </h3>
            <address className="text-sm not-italic space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin size={18} className="text-primary" />
                </div>
                <p className="text-gray-400 leading-relaxed pt-2">{SITE_CONFIG.address}</p>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone size={18} className="text-primary" />
                </div>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-gray-400 hover:text-white transition-colors break-all"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
              <span className="text-gray-400">for the Kingdom</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}