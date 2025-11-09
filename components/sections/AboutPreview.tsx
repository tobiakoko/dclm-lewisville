'use client'

import Link from 'next/link'
import { Book, Heart, Users, ArrowRight, Church } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutPreview() {
  return (
    <section
      className="py-24 bg-background relative"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 bg-muted rounded-full mb-6">
                <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">About Us</span>
              </div>

              <h2
                id="about-heading"
                className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight leading-[1.1]"
              >
                Welcome to DCLM Lewisville
              </h2>

              <p className="text-lg text-foreground/70 mb-5 leading-relaxed">
                We are a Christ-centered church in Lewisville, Texas, dedicated to biblical teaching,
                passionate worship, and spiritual growth. Part of the global Deeper Christian Life Ministry
                founded in 1973.
              </p>

              <p className="text-base text-foreground/60 leading-relaxed">
                Our church is committed to being a beacon of light in the Lewisville community, providing
                a welcoming environment where individuals and families can grow spiritually.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="elevation-2">
                <Link href="/about">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Plan Your Visit</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <Book className="w-6 h-6" />,
                title: 'Biblical Teaching',
                description: 'Systematic study of God\'s Word'
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: 'Holy Living',
                description: 'Life consecrated to God'
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Community',
                description: 'Connect and belong'
              },
              {
                icon: <Church className="w-6 h-6" />,
                title: 'Global Mission',
                description: 'Reaching 70+ countries'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="card-elevated group cursor-default p-6 hover:elevation-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4 text-primary-foreground group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-sm font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Preview */}
        <div className="grid md:grid-cols-2 gap-6 mt-20">
          <div className="card-elevated p-8 group hover:elevation-3 cursor-default">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-base text-foreground/70 leading-relaxed">
              To bring people to Christ and build them up in the faith through biblical teaching,
              passionate worship, fervent prayer, and dedicated service.
            </p>
          </div>

          <div className="card-elevated p-8 group hover:elevation-3 cursor-default">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Book className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-base text-foreground/70 leading-relaxed">
              To be a Christ-centered church that transforms lives through God&apos;s Word, equipping
              believers to live holy lives and fulfill the Great Commission.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
