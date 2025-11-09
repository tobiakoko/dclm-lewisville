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

export default function GiveSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" aria-labelledby="give-heading">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full mb-6">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Give</span>
            </div>

            <h2 id="give-heading" className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Make an Impact
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Your generous giving helps us spread the Gospel, support our community,
              and advance God&apos;s kingdom locally and globally through GCK.
            </p>
          </motion.div>

          {/* Two Main CTAs */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {/* Church Giving Card */}
            <div className="bg-muted rounded-lg p-8 border border-border hover:elevation-2 transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">
                    Give to DCLM Lewisville
                  </h3>
                  <p className="text-sm text-foreground/60">
                    Support our local church ministries, operations, and community outreach programs.
                  </p>
                </div>
              </div>
              <Button asChild className="w-full h-12 bg-accent text-white hover:bg-accent-secondary">
                <Link href="/give">
                  Give to Church
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* GCK Giving Card */}
            <div className="bg-muted rounded-lg p-8 border border-border hover:elevation-2 transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">
                    Give to GCK
                  </h3>
                  <p className="text-sm text-foreground/60">
                    Support God&apos;s Children Kingdom (GCK) global mission and children&apos;s ministry worldwide.
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full h-12 border-primary hover:bg-primary/10">
                <Link href="https://gckhq.org/" target="_blank" rel="noopener noreferrer">
                  Give to GCK
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Ways to Give */}
          <motion.div variants={itemVariants} className="bg-muted/50 rounded-lg p-8 border border-border">
            <h3 className="font-heading text-xl font-bold mb-6 text-center text-foreground">
              Ways to Give
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 elevation-1">
                  <Smartphone className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Online</h4>
                <p className="text-sm text-foreground/60">Give securely online anytime</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 elevation-1">
                  <CreditCard className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">In Person</h4>
                <p className="text-sm text-foreground/60">Give during any service</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 elevation-1">
                  <Building2 className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Mail</h4>
                <p className="text-sm text-foreground/60">Mail checks to our church</p>
              </div>
            </div>
          </motion.div>

          {/* Scripture Quote */}
          <motion.div variants={itemVariants} className="text-center mt-10">
            <blockquote className="text-base md:text-lg font-medium italic text-foreground/80 mb-2">
              &quot;Each of you should give what you have decided in your heart to give,
              not reluctantly or under compulsion, for God loves a cheerful giver.&quot;
            </blockquote>
            <cite className="text-sm text-foreground/60">— 2 Corinthians 9:7</cite>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
