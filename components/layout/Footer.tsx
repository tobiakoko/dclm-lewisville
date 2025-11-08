'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Youtube, Church, Mail, Phone, MapPin } from 'lucide-react'
import { SITE_CONFIG, SERVICE_TIMES, NAV_LINKS } from '@/lib/constants'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-[#6B0F2A] text-gray-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container relative z-10 py-16"
      >
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section with Logo */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-white/20">
                <Church className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading text-white text-xl font-bold">
                  DCLM
                </h3>
                <p className="text-xs text-gray-300">Lewisville, Texas</p>
              </div>
            </div>
            <p className="text-sm mb-6 leading-relaxed text-gray-200">
              Deeper Christian Life Ministry - A Christ-centered church dedicated to biblical teaching,
              holy living, and reaching souls for the Kingdom of God.
            </p>
            <div className="flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={SITE_CONFIG.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 border border-white/20"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={SITE_CONFIG.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 border border-white/20"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={SITE_CONFIG.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-secondary backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 border border-white/20"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Quick Links
              <span className="h-0.5 w-8 bg-gradient-to-r from-secondary to-accent" />
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.filter((link) => !link.highlight).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-200 hover:text-secondary transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-secondary to-accent group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Times */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Service Times
              <span className="h-0.5 w-8 bg-gradient-to-r from-secondary to-accent" />
            </h3>
            <ul className="space-y-4">
              {SERVICE_TIMES.map((service) => (
                <li key={service.name} className="text-sm">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-colors border border-white/10">
                    <strong className="text-white block mb-1">{service.name}</strong>
                    <p className="text-gray-200 text-xs">
                      {service.day}s at {service.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Contact Us
              <span className="h-0.5 w-8 bg-gradient-to-r from-secondary to-accent" />
            </h3>
            <address className="text-sm not-italic space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors border border-white/20">
                  <MapPin size={18} className="text-secondary" />
                </div>
                <p className="text-gray-200 leading-relaxed pt-2">{SITE_CONFIG.address}</p>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors border border-white/20">
                  <Phone size={18} className="text-secondary" />
                </div>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-gray-200 hover:text-secondary transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors border border-white/20">
                  <Mail size={18} className="text-secondary" />
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-gray-200 hover:text-secondary transition-colors break-all"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </address>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-200">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-200">Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Church className="w-4 h-4 text-secondary" />
              </motion.div>
              <span className="text-gray-200">for the Kingdom</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
