'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
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
    {
      loop: true,
      duration: 25
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const currentIndex = emblaApi ? emblaApi.selectedScrollSnap() : 0

  return (
    <section
      className="relative overflow-hidden bg-primary text-primary-foreground"
      style={{ height: 'calc(100vh - 3.5rem)' }}
      aria-label="Hero carousel"
    >
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

              {/* Content */}
              <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-3xl space-y-8">
                  {slide.subtitle && (
                    <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="text-sm font-semibold text-white tracking-wide">{slide.subtitle}</span>
                    </div>
                  )}

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-white tracking-tight">
                    {slide.title}
                  </h1>

                  {slide.description && (
                    <p className="text-xl text-white/90 max-w-2xl leading-relaxed font-light">
                      {slide.description}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      asChild
                      variant="accent"
                      size="lg"
                      className="elevation-3 text-base h-12 transition-all duration-300 group"
                    >
                      <Link href={slide.cta.href}>
                        {slide.cta.text}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>

                    {index === 0 && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/40 text-base h-12 transition-all duration-300 group"
                      >
                        <Link href="/about">
                          Learn More
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Service Times - Only on first slide */}
                  {index === 0 && times && times.length > 0 && (
                    <div className="flex flex-wrap gap-6 pt-6 text-sm text-white/75 font-medium">
                      {times.map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                          <span>{service.day} {service.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-2.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-10 bg-white elevation-1'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index}
                />
              ))}
            </div>

            <div className="hidden sm:flex gap-3">
              <button
                onClick={scrollPrev}
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-200 flex items-center justify-center text-white elevation-2"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-200 flex items-center justify-center text-white elevation-2"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}