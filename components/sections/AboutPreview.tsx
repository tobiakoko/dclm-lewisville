'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Book, Heart, Users, ArrowRight, Church } from 'lucide-react'
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

export default function AboutPreview() {
  return (
    <section
      className="py-20 bg-muted relative"
      aria-labelledby="about-heading"
    >

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="inline-block px-3 py-1 bg-white rounded-full mb-6">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">About Us</span>
            </div>

            <h2
              id="about-heading"
              className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-foreground"
            >
              Welcome to DCLM Lewisville
            </h2>

            <p className="text-base text-foreground/80 mb-4 leading-relaxed">
              We are a Christ-centered church in Lewisville, Texas, dedicated to biblical teaching,
              passionate worship, and spiritual growth. Part of the global Deeper Christian Life Ministry
              founded in 1973.
            </p>

            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Our church is committed to being a beacon of light in the Lewisville community, providing
              a welcoming environment where individuals and families can grow spiritually.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="default">
                <Link href="/about">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="default">
                <Link href="/contact">Plan Your Visit</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <Book className="w-5 h-5" />,
                title: 'Biblical Teaching',
                description: 'Systematic study of God\'s Word'
              },
              {
                icon: <Heart className="w-5 h-5" />,
                title: 'Holy Living',
                description: 'Life consecrated to God'
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: 'Community',
                description: 'Connect and belong'
              },
              {
                icon: <Church className="w-5 h-5" />,
                title: 'Global Mission',
                description: 'Reaching 70+ countries'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-5 border border-border hover:border-foreground/20 transition-colors"
              >
                <div className="w-10 h-10 bg-primary rounded flex items-center justify-center mb-3 text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-sm font-semibold mb-1 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Preview */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                <Heart className="w-4 h-4 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Our Mission</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To bring people to Christ and build them up in the faith through biblical teaching,
              passionate worship, fervent prayer, and dedicated service.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Book className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Our Vision</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To be a Christ-centered church that transforms lives through God&apos;s Word, equipping
              believers to live holy lives and fulfill the Great Commission.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
