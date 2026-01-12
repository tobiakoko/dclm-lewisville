'use client'

import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PortableText } from '@portabletext/react'

interface WelcomeMessage {
  heading?: string
  content?: unknown
  signature?: string
  tagline?: string
}

interface AboutPreviewProps {
  data?: {
    welcomeMessage?: WelcomeMessage
  }
}

// Default fallback content
const defaultContent = {
  heading: 'A Message from Our Pastor',
  paragraphs: [
    'Grace and peace to you in the name of our Lord Jesus Christ!',
    "Whether you're visiting us online or considering joining us in person, we are thrilled that you're here. At DCLM Lewisville, we are a family committed to growing deeper in our relationship with God through biblical teaching, passionate worship, and genuine fellowship.",
    'Our mission is simple yet powerful: to bring people to Christ and build them up in the faith. We believe that every person who walks through our doors—or joins us online—has been divinely appointed for such a time as this.',
    "We invite you to explore who we are, what we believe, and the vibrant ministries that make up our church community. Whether you're seeking a church home, looking to grow spiritually, or simply curious about faith, you are welcome here.",
    'We look forward to worshiping with you!',
  ],
  signature: 'Pastor, DCLM Lewisville',
  tagline: '"Holiness unto the Lord"',
}

export default function AboutPreview({ data }: AboutPreviewProps) {
  const welcomeMessage = data?.welcomeMessage
  const hasContent = welcomeMessage && (welcomeMessage.heading || welcomeMessage.content)

  const heading = welcomeMessage?.heading || defaultContent.heading
  const signature = welcomeMessage?.signature || defaultContent.signature
  const tagline = welcomeMessage?.tagline || defaultContent.tagline

  return (
    <section
      className="py-32 bg-muted/20 relative"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              id="about-heading"
              className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground"
            >
              {heading}
            </h2>
          </div>

          {/* Pastor's Welcome Message Card */}
          <div className="bg-white rounded-xl p-10 md:p-12 border border-border mb-12 shadow-sm">
            <Quote className="w-12 h-12 text-accent mb-6" />

            <div className="space-y-5 text-foreground/80 leading-relaxed">
              {hasContent && welcomeMessage?.content ? (
                // Use PortableText if content from Sanity is available
                <div className="prose prose-sm max-w-none">
                  <PortableText value={welcomeMessage.content as any} />
                </div>
              ) : (
                // Fallback to hardcoded content
                <>
                  {defaultContent.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={index === 0 ? 'text-lg' : index === defaultContent.paragraphs.length - 1 ? 'font-medium text-foreground' : ''}
                    >
                      {paragraph}
                    </p>
                  ))}
                </>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-heading font-semibold text-foreground">{signature}</p>
              <p className="text-sm text-foreground/60 italic">{tagline}</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 group">
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
