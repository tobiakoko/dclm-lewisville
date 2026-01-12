'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, CreditCard, Building2, Smartphone, ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

interface GiveSectionProps {
  data?: {
    giveContent?: {
      heading?: string
      description?: string
      churchGivingTitle?: string
      churchGivingDescription?: string
      gckGivingTitle?: string
      gckGivingDescription?: string
      gckGivingUrl?: string
      scriptureVerse?: string
      scriptureReference?: string
    }
  } | null
}

export default function GiveSection({ data }: GiveSectionProps) {
  const content = data?.giveContent || {
    heading: 'Make an Impact',
    description: "Your generous giving helps us spread the Gospel, support our community, and advance God's kingdom locally and globally through GCK.",
    churchGivingTitle: 'Give to DCLM Lewisville',
    churchGivingDescription: 'Support our local church ministries, operations, and community outreach programs.',
    gckGivingTitle: 'Give to GCK',
    gckGivingDescription: "Support God's Children Kingdom (GCK) global mission and children's ministry worldwide.",
    gckGivingUrl: 'https://gckhq.org/',
    scriptureVerse: '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."',
    scriptureReference: '— 2 Corinthians 9:7'
  }
  return (
    <section className="py-32 bg-white relative overflow-hidden" aria-labelledby="give-heading">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 id="give-heading" className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {content.heading}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-8">
              {content.description}
            </p>

            {/* Scripture Quote - moved up for context */}
            <blockquote className="text-base font-medium italic text-foreground/60 mt-8 mb-2">
              {content.scriptureVerse}
            </blockquote>
            <cite className="text-sm text-foreground/50">{content.scriptureReference}</cite>
          </motion.div>

          {/* Primary CTA - Church Giving (ONE FOCUS) */}
          <motion.div
            variants={itemVariants}
            className="max-w-xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-12 border border-border text-center shadow-sm">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 elevation-3">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              <h3 className="font-heading text-3xl font-bold mb-4 text-foreground">
                {content.churchGivingTitle}
              </h3>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                {content.churchGivingDescription}
              </p>
              <Button asChild size="lg" className="w-full h-14 bg-accent text-white hover:bg-accent-secondary text-lg font-semibold">
                <Link href="/give">
                  Give Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              {/* Secondary option - subtle */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <p className="text-sm text-foreground/60 mb-3">Also supporting global missions through GCK?</p>
                <Link
                  href={content.gckGivingUrl || 'https://gckhq.org/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  Give to GCK
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
