import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { HERO_SLIDES, SERVICE_TIMES } from '@/lib/constants'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage, ServiceTime } from '@/lib/types'

interface HeroCarouselProps {
  data?: {
    heroSlides?: Array<{
      title: string
      subtitle?: string
      description?: string
      image: SanityImage | string
      ctaText?: string
      ctaLink?: string
    }>
  } | null
  serviceTimes?: ServiceTime[]
}

export default function HeroCarousel({ data, serviceTimes }: HeroCarouselProps) {
  const slide = data?.heroSlides && data.heroSlides.length > 0
    ? {
        title: data.heroSlides[0].title,
        subtitle: data.heroSlides[0].subtitle || '',
        description: data.heroSlides[0].description || '',
        cta: {
          text: data.heroSlides[0].ctaText || 'Plan Your Visit',
          href: data.heroSlides[0].ctaLink || '/contact'
        },
        image: data.heroSlides[0].image ? urlFor(data.heroSlides[0].image).url() : ''
      }
    : HERO_SLIDES[0]

  const times = serviceTimes && serviceTimes.length > 0 ? serviceTimes : SERVICE_TIMES

  return (
    <section
      className="relative bg-gray-900 h-screen min-h-[640px]"
      aria-label="Welcome to Deeper Life Bible Church Lewisville"
    >
      {/* Background Image */}
      <Image
        src={slide.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover animate-[fade-in_1s_ease-out]"
      />

      {/* Modern Gradient Overlay: Clearer at bottom for controls */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pt-20">
        <div className="max-w-3xl space-y-6 animate-[slide-up-fade_1s_ease-out]">
          {/* Subtitle Badge */}
          {slide.subtitle && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--church-red)]/90 text-white text-xs font-bold tracking-[0.2em] uppercase shadow-lg backdrop-blur-sm">
              {slide.subtitle}
            </span>
          )}

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.05] drop-shadow-md">
            {slide.title}
          </h1>

          {slide.description && (
            <p className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed font-light drop-shadow-sm">
              {slide.description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href={slide.cta.href}
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--church-navy)] text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[var(--church-red)] hover:text-white transition-all duration-300 shadow-lg"
            >
              {slide.cta.text}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-white/20 transition-all duration-300"
            >
              New Here? Read What We Believe
            </Link>
          </div>

          {/* Service Times */}
          {times && times.length > 0 && (
            <div className="pt-8 border-t border-white/10 mt-8 hidden sm:block">
              <p className="text-xs text-white/50 uppercase tracking-widest mb-3 font-bold">
                Service Times
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {times.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-white font-medium"
                  >
                    <Clock className="w-4 h-4 text-[var(--church-red)]" />
                    <span>
                      <span className="opacity-70">{service.day}:</span> {service.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}