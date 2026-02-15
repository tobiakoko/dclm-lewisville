'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { trackSocialMediaClick, trackNavigation, trackExternalLink } from '@/lib/analytics'

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

const QUICK_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Ministries', href: '/ministries' },
  { name: 'Upcoming Events', href: '/events' },
  { name: 'Give Online', href: '/give' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-(--church-navy) text-white border-t border-white/5" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* --- BRAND SECTION (Spans 4 columns) --- */}
          <div className="lg:col-span-4 space-y-6">
            <Link 
              href="/" 
              className="block relative h-36 w-48 mb-6"
              onClick={() => trackNavigation('/', 'footer_logo')}
            >
              <Image
                src="/dclm_logo.png"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description || "Leading people into a growing relationship with Jesus Christ by creating environments where people are encouraged and equipped."}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-(--church-red) transition-all duration-300"
                  aria-label={`Follow us on ${social.name}`}
                  onClick={() => trackSocialMediaClick(social.name, 'footer')}
                >
                  <social.icon size={18} className="text-zinc-300 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* --- SERVICE TIMES (Spans 3 columns) --- */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white/90">
              Service Times
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <Clock className="w-5 h-5 text-(--church-red) shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block font-medium text-white">Sunday Worship</span>
                  <p className="text-sm text-zinc-400">9:30 AM — Worship Service</p>
                  <p className="text-sm text-zinc-400">9:40 AM — Search The Scriptures</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-5 shrink-0" /> {/* Spacer alignment */}
                <div className="space-y-1">
                  <span className="block font-medium text-white">Tuesday</span>
                  <p className="text-sm text-zinc-400">7:00 PM — Bible Study</p>
                </div>
              </li>
            </ul>
          </div>

          {/* --- LINKS (Spans 2 columns) --- */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white/90">
              Explore
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-(--church-red) hover:pl-1 transition-all duration-200 block"
                    onClick={() => trackNavigation(link.href, `footer_${link.name}`)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- CONTACT (Spans 3 columns) --- */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white/90">
              Visit Us
            </h3>
            <div className="space-y-4">
              {/* Map Card */}
              <Link
                href={`https://maps.google.com/?q=${encodeURIComponent(`${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 items-start p-3 -ml-3 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => trackExternalLink('Google Maps', 'address_click')}
              >
                <MapPin className="w-5 h-5 text-(--church-red) shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-white group-hover:text-(--church-red) transition-colors flex items-center gap-2">
                    Get Directions <ExternalLink className="w-3 h-3 opacity-50" />
                  </p>
                  <p className="text-sm text-zinc-400">
                    {SITE_CONFIG.address.street}<br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                  </p>
                </div>
              </Link>

              <div className="space-y-3 pt-2">
                <Link
                  href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-4 text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={() => trackExternalLink('Phone', 'phone_click')}
                >
                  <Phone className="w-5 h-5 text-(--church-red) shrink-0" />
                  {SITE_CONFIG.phone}
                </Link>
                <Link
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-4 text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={() => trackExternalLink('Email', 'email_click')}
                >
                  <Mail className="w-5 h-5 text-(--church-red) shrink-0" />
                  {SITE_CONFIG.email}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              href="/privacy" 
              className="hover:text-white transition-colors"
              onClick={() => trackNavigation('/privacy', 'Privacy Policy')}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-white transition-colors"
              onClick={() => trackNavigation('/terms', 'Terms of Service')}
            >
              Terms of Use
            </Link>
            <Link 
              href="/sitemap" 
              className="hover:text-white transition-colors"
              onClick={() => trackNavigation('/sitemap', 'Sitemap')}
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}