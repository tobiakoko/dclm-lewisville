'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Sparkles, Users, BookOpen, Flame } from 'lucide-react'
import Image from 'next/image'

interface ServiceTime {
  name: string
  day: string
  time: string
  description: string
}

interface ServiceScheduleProps {
  times: ServiceTime[]
}

const serviceImages = {
  'Sunday Service': 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop',
  'Bible Study': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  'Revival Service': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop'
}

const serviceIcons = {
  'Sunday Service': Users,
  'Bible Study': BookOpen,
  'Revival Service': Flame
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export default function ServiceSchedule({ times }: ServiceScheduleProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-muted/20 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-3 mb-6 border border-primary/20"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Weekly Services</span>
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Join Us for Worship
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experience heartfelt worship, powerful teaching, and genuine fellowship.
            All are welcome to join us - come as you are!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {times.map((service, index) => {
            const ServiceIcon = serviceIcons[service.name as keyof typeof serviceIcons] || Clock
            const imageUrl = serviceImages[service.name as keyof typeof serviceImages]

            return (
              <motion.div
                key={service.name}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border"
              >
                {/* Service Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30">
                      <ServiceIcon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Service name on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Time details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3 group-hover:bg-primary/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <Calendar size={20} className="text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Day</p>
                        <p className="font-bold text-foreground">{service.day}s</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3 group-hover:bg-secondary/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                        <Clock size={20} className="text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Time</p>
                        <p className="font-bold text-foreground">{service.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Location indicator */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={14} className="text-primary" />
                      <span className="font-medium">In-Person & Online</span>
                    </div>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4 text-lg">
            Can&apos;t make it in person? Join us online!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold group"
          >
            <span>Watch Live Services</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
