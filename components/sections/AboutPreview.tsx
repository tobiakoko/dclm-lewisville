'use client'

import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutPreview() {
  return (
    <section
      className="py-20 bg-muted/30 relative"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 bg-muted rounded-full mb-6">
              <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Welcome</span>
            </div>

            <h2
              id="about-heading"
              className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight"
            >
              A Message from Our Pastor
            </h2>
          </div>

          {/* Pastor's Welcome Message Card */}
          <div className="bg-white rounded-lg p-8 md:p-10 elevation-2 mb-8">
            <Quote className="w-12 h-12 text-accent mb-6" />

            <div className="space-y-5 text-foreground/80 leading-relaxed">
              <p className="text-lg">
                Grace and peace to you in the name of our Lord Jesus Christ!
              </p>

              <p>
                Whether you&apos;re visiting us online or considering joining us in person,
                we are thrilled that you&apos;re here. At DCLM Lewisville, we are a family committed
                to growing deeper in our relationship with God through biblical teaching, passionate
                worship, and genuine fellowship.
              </p>

              <p>
                Our mission is simple yet powerful: to bring people to Christ and build them up in
                the faith. We believe that every person who walks through our doors—or joins us
                online—has been divinely appointed for such a time as this.
              </p>

              <p>
                We invite you to explore who we are, what we believe, and the vibrant ministries
                that make up our church community. Whether you&apos;re seeking a church home, looking
                to grow spiritually, or simply curious about faith, you are welcome here.
              </p>

              <p className="font-medium text-foreground">
                We look forward to worshiping with you!
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-heading font-semibold text-foreground">Pastor, DCLM Lewisville</p>
              <p className="text-sm text-foreground/60 italic">&quot;Holiness unto the Lord&quot;</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button asChild size="lg" className="h-12 bg-accent text-white hover:bg-accent-secondary transition-all duration-300 group">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
