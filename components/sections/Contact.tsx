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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6"
          >
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Contact Us</span>
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to know more? We&apos;d love to hear from you!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="font-heading text-2xl font-bold">Visit Us</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-sm text-muted-foreground">Address</div>
                      <div className="text-foreground">
                        {SITE_CONFIG.address.street}<br />
                        {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-sm text-muted-foreground">Phone</div>
                      <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-sm text-muted-foreground">Email</div>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-foreground hover:text-primary transition-colors font-medium break-all"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-border hover:border-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="text-white" size={24} />
                </div>
                <h3 className="font-heading text-2xl font-bold">Service Times</h3>
              </div>
              <div className="space-y-3">
                {SERVICE_TIMES.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted/50 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="text-secondary" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">{service.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {service.day}s at {service.time}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg p-8 border-2 border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="text-white" size={24} />
              </div>
              <h3 className="font-heading text-2xl font-bold">Send Us a Message</h3>
            </div>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
