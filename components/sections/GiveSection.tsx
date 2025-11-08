'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, DollarSign, Users, Building, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function GiveSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg4djg2aC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-semibold">Give</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Support God&apos;s Work
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Your generous giving helps us spread the Gospel, support our community,
              and advance God&apos;s kingdom here in Lewisville and around the world.
            </p>
          </motion.div>

          {/* Impact Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Ministry Programs',
                description: 'Supporting various ministries that reach all ages and backgrounds'
              },
              {
                icon: <Building className="w-8 h-8" />,
                title: 'Facility & Operations',
                description: 'Maintaining a welcoming space for worship and community'
              },
              {
                icon: <Heart className="w-8 h-8" fill="currentColor" />,
                title: 'Missions & Outreach',
                description: 'Reaching our community and supporting global missions'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-heading text-xl font-bold mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-sm text-white/80 text-center leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scripture Quote */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-12"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
              </motion.div>
              <blockquote className="text-xl md:text-2xl font-medium italic mb-4">
                &quot;Each of you should give what you have decided in your heart to give,
                not reluctantly or under compulsion, for God loves a cheerful giver.&quot;
              </blockquote>
              <cite className="text-white/80 text-sm">— 2 Corinthians 9:7 (NIV)</cite>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 h-auto group"
              >
                <Link href="/give" className="flex items-center gap-2">
                  <Heart className="w-5 h-5" fill="currentColor" />
                  Give Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                <Link href="/give">Learn About Giving</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-white/70 mt-8"
          >
            We are a 501(c)(3) non-profit organization. All donations are tax-deductible.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
