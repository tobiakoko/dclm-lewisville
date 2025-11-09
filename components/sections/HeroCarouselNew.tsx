'use client'

import { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Church, Heart, BookOpen, Users } from 'lucide-react'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  cta: {
    text: string
    href: string
  }
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Growing in Faith, Living in Holiness',
    subtitle: 'Welcome Home',
    description: 'Join a Christ-centered community in Lewisville, TX dedicated to biblical teaching, fervent prayer, and holy living.',
    cta: {
      text: 'Plan Your Visit',
      href: '/contact'
    },
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&h=1080&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Discover Your Purpose',
    subtitle: 'Serve & Grow',
    description: 'Find your place in our vibrant ministries. Make a difference through service and grow in your faith.',
    cta: {
      text: 'Explore Ministries',
      href: '/ministries'
    },
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Dive Deeper into God\'s Word',
    subtitle: 'Learn & Transform',
    description: 'Join us for in-depth Bible study and powerful messages that transform lives.',
    cta: {
      text: 'View Sermons',
      href: '/sermons'
    },
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&h=1080&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Build Lasting Connections',
    subtitle: 'Connect & Belong',
    description: 'Experience genuine Christian fellowship in a loving community.',
    cta: {
      text: 'Meet Our Team',
      href: '/ministers'
    },
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&h=1080&fit=crop&q=80'
  }
]

export default function HeroCarousel() {
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

  const [selectedIndex, setSelectedIndex] = useCallback(() => {
    if (!emblaApi) return [0, () => {}]

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return [emblaApi.selectedScrollSnap(), onSelect]
  }, [emblaApi])

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
      style={{ minHeight: 'clamp(500px, 70vh, 800px)' }}
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

              {/* Content */}
              <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl space-y-6">
                  <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                    <span className="text-sm font-medium text-white">{slide.subtitle}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold leading-tight text-white">
                    {slide.title}
                  </h1>

                  <p className="text-lg text-white/90 max-w-xl">
                    {slide.description}
                  </p>

                  <div className="flex gap-3 pt-2">
                    <Button
                      asChild
                      variant="accent"
                      size="lg"
                      className="shadow-lg"
                    >
                      <Link href={slide.cta.href}>
                        {slide.cta.text}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>

                    {index === 0 && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                      >
                        <Link href="/about">
                          Learn More
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Service Times - Only on first slide */}
                  {index === 0 && (
                    <div className="flex flex-wrap gap-4 pt-4 text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>Sunday 10:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>Tuesday 6:30 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>Friday 6:30 PM</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-1 rounded-full transition-all ${
                    currentIndex === index
                      ? 'w-8 bg-white'
                      : 'w-1 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index}
                />
              ))}
            </div>

            <div className="hidden sm:flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
