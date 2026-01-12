'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

interface ServiceTime {
  name: string
  day: string
  time: string
  description?: string
}

interface ServiceScheduleProps {
  times: ServiceTime[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function ServiceSchedule({ times }: ServiceScheduleProps) {
  return (
    <section className="py-32 bg-white relative" aria-labelledby="services-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 id="services-heading" className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Join Us for Worship
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Experience heartfelt worship, powerful teaching, and genuine fellowship.
            All are welcome!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {times.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              className="bg-white rounded-lg p-8 elevation-2 hover:elevation-3 transition-shadow"
            >
              {/* Service Name */}
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
                {service.name}
              </h3>

              {/* Time Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-foreground/60 font-medium uppercase tracking-wide mb-0.5">Day</p>
                    <p className="font-semibold text-foreground">{service.day}s</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-foreground/60 font-medium uppercase tracking-wide mb-0.5">Time</p>
                    <p className="font-semibold text-foreground">{service.time}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/70 leading-relaxed mb-6 text-center">
                {service.description}
              </p>

              {/* Location */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-center gap-2 text-xs text-foreground/60">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="font-medium">In-Person & Online</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
