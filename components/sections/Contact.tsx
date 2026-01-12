'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { SITE_CONFIG, SERVICE_TIMES } from '@/lib/constants'
import ContactForm from '@/components/ContactForm'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export default function Contact() {
  return (
    <section className="py-32 bg-muted/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/40 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
            We'd Love to Hear from You
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Have questions or want to know more? Send us a message and we'll get back to you soon.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Primary Focus: Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-sm p-10 md:p-12 border border-border"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info - Subtle, Secondary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-sm text-foreground/60 mb-6">Or reach us directly:</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <span className="inline-flex items-center gap-2 text-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
