'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: SITE_CONFIG.socialMedia.facebook
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: SITE_CONFIG.socialMedia.instagram
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: SITE_CONFIG.socialMedia.youtube
  },
]

const FOOTER_LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Ministries', href: '/ministries' },
  { name: 'Events', href: '/events' },
  { name: 'Give', href: '/give' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="relative h-14 w-auto">
              <Image
                src="/Logo.png"
                alt={SITE_CONFIG.name}
                width={160}
                height={56}
                className="h-full w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-white/70 hover:text-accent transition-colors group"
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    {SITE_CONFIG.address.street}<br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-white/60">
              © {new Date().getFullYear()} {SITE_CONFIG.shortName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/60 hover:text-accent transition-colors text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-accent transition-colors text-sm">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}