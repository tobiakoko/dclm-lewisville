import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronRight, Calendar, MapPin } from 'lucide-react'
import { urlForImage } from '@/lib/sanity/image'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: any
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
}

export default function HeroSection({
  title = 'Welcome to Deeper Christian Life Ministry',
  subtitle = 'Lewisville, Texas',
  description = 'Join us for worship, fellowship, and biblical teaching as we grow together in Christ',
  backgroundImage,
  primaryButton = { text: 'Plan Your Visit', href: '/contact' },
  secondaryButton = { text: 'Watch Sermons', href: '/sermons' },
}: HeroSectionProps) {
  return (
    <section className="relative bg-primary text-white overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[750px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <>
            <div className="absolute inset-0 animate-image-zoom">
              <Image
                src={urlForImage(backgroundImage).url()}
                alt="Church background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-primary/90" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-primary" />
            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28 lg:py-36 flex items-center min-h-[600px] md:min-h-[700px] lg:min-h-[750px]">
        <div className="max-w-4xl w-full mx-auto lg:mx-0">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-accent animate-pulse" />
            <span className="text-sm font-semibold tracking-wider uppercase">Welcome Home</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] animate-fade-in-up animate-delay-100">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-white/95 animate-fade-in-up animate-delay-200">
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl lg:text-2xl mb-12 text-white/85 leading-relaxed max-w-3xl animate-fade-in-up animate-delay-300">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mb-16 animate-fade-in-up animate-delay-400">
            {primaryButton && (
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white h-16 px-10 text-lg font-bold transition-all duration-500 hover:shadow-2xl group"
              >
                <Link href={primaryButton.href} className="flex items-center gap-3">
                  {primaryButton.text}
                  <ChevronRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
            {secondaryButton && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary h-16 px-10 text-lg font-bold transition-all duration-500"
              >
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            )}
          </div>

          {/* Service Times Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t-2 border-white/20 animate-fade-in-up animate-delay-500">
            <div className="flex items-start gap-4 group">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40">
                <Calendar className="w-7 h-7" />
              </div>
              <div className="pt-1">
                <div className="font-bold text-lg mb-1.5">Sunday Service</div>
                <div className="text-base text-white/85">10:00 AM - 12:00 PM</div>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="pt-1">
                <div className="font-bold text-lg mb-1.5">Location</div>
                <div className="text-base text-white/85">Lewisville, TX</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-accent" />
    </section>
  )
}
