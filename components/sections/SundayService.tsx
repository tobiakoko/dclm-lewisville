'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ServiceTime {
  name: string
  time: string
}

interface SundayServiceProps {
  serviceTimes?: ServiceTime[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function SundayService({ serviceTimes }: SundayServiceProps) {
  // Default service time if not provided
  const defaultService: ServiceTime = { name: 'Sunday Service', time: '10:00 AM' }

  // Get the first Sunday service or use default
  const service = serviceTimes && serviceTimes.length > 0
    ? serviceTimes[0]
    : defaultService

  // Address from constants
  const address = {
    street: '1901 Justin Rd',
    city: 'Lewisville',
    state: 'TX',
    zip: '75077'
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.city}, ${address.state} ${address.zip}`
  )}`

  return (
    <section className="py-32 bg-muted/20 relative">
      {/* Simplified decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Heading - Simplified */}
          <motion.h2
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Sunday Service
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/70 mb-16 leading-relaxed max-w-2xl mx-auto"
          >
            We'd love to see you this Sunday! Join us for worship, teaching, and fellowship.
          </motion.p>

          {/* Service Time - Simplified */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-10 mb-10 max-w-4xl mx-auto border border-border"
          >
            <div className="text-center">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                {service.name}
              </h3>
              <p className="text-4xl font-bold text-primary mb-1">
                {service.time}
              </p>
              <p className="text-sm text-foreground/60">Every Sunday</p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="bg-muted/30 rounded-xl p-8 mb-8 border border-border"
          >
            <div className="flex items-start justify-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div className="text-center">
                <h3 className="font-semibold text-lg text-foreground mb-2">Location</h3>
                <p className="text-foreground/80 leading-relaxed">
                  {address.street}<br />
                  {address.city}, {address.state} {address.zip}
                </p>
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary hover:bg-primary/10"
            >
              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Get Directions
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <p className="text-sm text-foreground/60 mb-4">
              First time visiting? We'd love to know you're coming!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Link href="/contact">
                Plan Your Visit
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
