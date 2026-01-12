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
  // Limit to 4 ministries for reduced visual density
  const displayedMinistries = ministries.slice(0, 4)

  return (
    <section className="py-24 bg-muted/20 relative">
      {/* Simplified decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/40 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Ministries
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Find your place to serve, connect, and grow in community with others
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-5xl mx-auto"
        >
          {displayedMinistries.map((ministry, index) => {
            const IconComponent = (Icons[ministry.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Users

            return (
              <motion.div
                key={ministry._id}
                variants={cardVariants}
              >
                <Link
                  href={`/ministries/${ministry.slug.current}`}
                  className="group relative bg-white rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 border border-border block h-full"
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="h-full flex flex-col"
                  >

                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      {/* Icon */}
                      <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-5">
                        <IconComponent className="text-white" size={28} />
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
                        {ministry.name}
                      </h3>

                      {/* Description */}
                      <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3 mb-4">
                        {ministry.description}
                      </p>

                      {/* Learn more link */}
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center mt-4">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group"
          >
            <Link href="/ministries" className="flex items-center gap-2">
              View All Ministries
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}