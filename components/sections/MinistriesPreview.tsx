'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Ministry } from '@/lib/types'
import { Sparkles, ArrowRight } from 'lucide-react'

interface MinistriesPreviewProps {
  ministries: Ministry[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function MinistriesPreview({ ministries }: MinistriesPreviewProps) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Get Involved</span>
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Ministries
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your place to serve, connect, and grow in community with others
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {ministries.map((ministry, index) => {
            const IconComponent = (Icons[ministry.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Users

            return (
              <motion.div
                key={ministry._id}
                variants={cardVariants}
              >
                <Link
                  href={`/ministries/${ministry.slug.current}`}
                  className="group relative bg-gradient-to-br from-white to-muted/30 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border-2 border-border hover:border-primary/50 block h-full"
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="h-full flex flex-col"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 12 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="w-20 h-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl"
                      >
                        <IconComponent className="text-white" size={36} />
                      </motion.div>

                      {/* Title */}
                      <h3 className="font-heading text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {ministry.name}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                        {ministry.description}
                      </p>

                      {/* Learn more link */}
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="h-12 bg-accent text-white hover:bg-accent-secondary transition-all duration-300 group"
            >
              <Link href="/ministries" className="flex items-center gap-2">
                View All Ministries
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}