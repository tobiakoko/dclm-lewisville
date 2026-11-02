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
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import { SITE_CONFIG, SERVICE_TIMES, formatAddress, mapsUrl, telHref } from '@/lib/constants'
import { formatServiceTime } from '@/lib/schedule'
import { trackSocialMediaClick, trackNavigation, trackExternalLink } from '@/lib/analytics'

interface SocialLink {
  name: string
  icon: LucideIcon
  href: string | null
}

// Only links the church has provided are shown
const SOCIAL_LINKS = ([
  { name: 'Facebook', icon: Facebook, href: SITE_CONFIG.socialMedia.facebook },
  { name: 'Instagram', icon: Instagram, href: SITE_CONFIG.socialMedia.instagram },
  { name: 'YouTube', icon: Youtube, href: SITE_CONFIG.youtube.channel },
] satisfies SocialLink[]).filter((link): link is SocialLink & { href: string } => link.href !== null)

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
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
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
              {SERVICE_TIMES.map((service, idx) => (
                <li key={service.id} className="flex gap-4">
                  {idx === 0 ? (
                    <Clock className="w-5 h-5 text-(--church-red) shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-5 shrink-0" />
                  )}
                  <div className="space-y-1">
                    <span className="block font-medium text-white">{service.day}</span>
                    <p className="text-sm text-white/70">{formatServiceTime(service)} — {service.name}</p>
                  </div>
                </li>
              ))}
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
                    className="text-sm text-white/70 hover:text-(--church-red) hover:pl-1 transition-all duration-200 block"
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
                href={mapsUrl(SITE_CONFIG.address)}
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
                  <p className="text-sm text-white/70">{formatAddress(SITE_CONFIG.address)}</p>
                </div>
              </Link>

              <div className="space-y-3 pt-2">
                <Link
                  href={telHref(SITE_CONFIG.phone)}
                  className="flex items-center gap-4 text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={() => trackExternalLink('Phone', 'phone_click')}
                >
                  <Phone className="w-5 h-5 text-(--church-red) shrink-0" />
                  {SITE_CONFIG.phone}
                </Link>
                <Link
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-4 text-sm text-white/70 hover:text-white transition-colors"
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
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}