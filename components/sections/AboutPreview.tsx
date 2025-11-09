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
                Welcome to Deeper Life Bible Church Lewisville! Whether you&apos;re visiting us online
                or considering joining us in person, we are delighted that the Lord has led you here.
                As part of the global Deeper Christian Life Ministry founded by Pastor W.F. Kumuyi,
                we are committed to systematic Bible study, holy living, and fervent evangelism.
              </p>

              <p>
                Our mission is clear: to bring souls to Christ and build them up in the faith through
                sound biblical doctrine, passionate worship, and dedicated prayer. We believe in the
                authority of Scripture and the transforming power of God&apos;s Word when faithfully taught
                and applied to daily living.
              </p>

              <p>
                Here in Lewisville, we are more than just a congregation—we are a spiritual family united
                by our love for God&apos;s Word and our desire to see lives transformed by the Gospel.
                Whether you are seeking salvation, spiritual growth, or a church home where holiness
                and righteousness are cherished, you will find a welcoming community here.
              </p>

              <p className="font-medium text-foreground">
                We invite you to join us as we pursue deeper life in Christ together!
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-heading font-semibold text-foreground">Pastor, DCLM Lewisville</p>
              <p className="text-sm text-foreground/60 italic">&quot;Holiness unto the Lord&quot;</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button asChild size="lg" className="h-12 bg-accent text-white hover:bg-accent-secondary">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
