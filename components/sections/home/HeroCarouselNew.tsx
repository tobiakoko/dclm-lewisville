'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { HERO_SLIDES, SERVICE_TIMES } from '@/lib/constants'
import { urlFor } from '@/lib/sanity/client'
import type { ServiceTime } from '@/lib/types'

interface HeroCarouselProps {
  data?: {
    heroSlides?: Array<{
      title: string
      subtitle?: string
      description?: string
      image: any
      ctaText?: string
      ctaLink?: string
    }>
  } | null
  serviceTimes?: ServiceTime[]
}

export default function HeroCarousel({ data, serviceTimes }: HeroCarouselProps) {
  // Use Sanity data if available, otherwise fall back to constants
  const slides = data?.heroSlides && data.heroSlides.length > 0
    ? data.heroSlides.map((slide, index) => ({
        id: index + 1,
        title: slide.title,
        subtitle: slide.subtitle || '',
        description: slide.description || '',
        cta: {
          text: slide.ctaText || 'Learn More',
          href: slide.ctaLink || '/about'
        },
        image: slide.image ? urlFor(slide.image).url() : ''
      }))
    : HERO_SLIDES

  const times = serviceTimes && serviceTimes.length > 0 ? serviceTimes : SERVICE_TIMES
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  )

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <section className="relative bg-gray-900 h-screen min-h-[640px]" aria-label="Hero carousel">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              
              {/* Background Image with Zoom Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center animate-[fade-in_1s_ease-out]"
                style={{ backgroundImage: `url('${slide.image}')` }}
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
                    
                    {index === 0 && (
                      <Link 
                        href="/about"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-white/20 transition-all duration-300"
                      >
                        New Here?
                      </Link>
                    )}
                  </div>

                  {/* Service Times (Only on first slide) */}
                  {index === 0 && times && times.length > 0 && (
                    <div className="pt-8 border-t border-white/10 mt-8 hidden sm:block">
                      <p className="text-xs text-white/50 uppercase tracking-widest mb-3 font-bold">Service Times</p>
                      <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {times.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-white font-medium">
                            <Clock className="w-4 h-4 text-[var(--church-red)]" />
                            <span><span className="opacity-70">{service.day}:</span> {service.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  selectedIndex === index
                    ? 'w-12 bg-[var(--church-red)]'
                    : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={selectedIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}