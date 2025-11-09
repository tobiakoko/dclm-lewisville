'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Church, Heart, BookOpen, Users, ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  badge: {
    icon: React.ReactNode
    text: string
  }
  cta: {
    text: string
    href: string
  }
  image: string
  gradient: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Growing in Faith, Living in Holiness',
    subtitle: 'Welcome Home',
    description: 'Join a Christ-centered community in Lewisville, TX dedicated to biblical teaching, fervent prayer, and holy living. Experience authentic worship and grow in your walk with God.',
    badge: {
      icon: <Church className="w-4 h-4" />,
      text: 'DCLM Lewisville'
    },
    cta: {
      text: 'Plan Your Visit',
      href: '/contact'
    },
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&h=1080&fit=crop&q=80',
    gradient: 'from-primary/95 via-primary/90 to-[#6B0F2A]/95'
  },
  {
    id: 2,
    title: 'Discover Your Purpose',
    subtitle: 'Serve & Grow',
    description: 'Find your place in our vibrant ministries. Whether you\'re passionate about youth, worship, or community outreach, there\'s a place for you to serve and make a difference.',
    badge: {
      icon: <Heart className="w-4 h-4" />,
      text: 'Get Involved'
    },
    cta: {
      text: 'Explore Ministries',
      href: '/ministries'
    },
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop&q=80',
    gradient: 'from-secondary/95 via-accent/90 to-primary/95'
  },
  {
    id: 3,
    title: 'Dive Deeper into God\'s Word',
    subtitle: 'Learn & Transform',
    description: 'Join us for in-depth Bible study and powerful messages that transform lives. Grow in understanding and application of God\'s Word through engaging teaching and fellowship.',
    badge: {
      icon: <BookOpen className="w-4 h-4" />,
      text: 'Biblical Teaching'
    },
    cta: {
      text: 'View Sermons',
      href: '/sermons'
    },
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&h=1080&fit=crop&q=80',
    gradient: 'from-accent/95 via-primary/90 to-secondary/95'
  },
  {
    id: 4,
    title: 'Build Lasting Connections',
    subtitle: 'Connect & Belong',
    description: 'Experience genuine Christian fellowship in a loving community. Build meaningful relationships, share life together, and support one another in faith.',
    badge: {
      icon: <Users className="w-4 h-4" />,
      text: 'Community'
    },
    cta: {
      text: 'Meet Our Team',
      href: '/ministers'
    },
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&h=1080&fit=crop&q=80',
    gradient: 'from-primary/95 via-secondary/90 to-accent/95'
  }
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function HeroCarousel() {
  const [[page, direction], setPage] = useState([0, 0])
  const [isPaused, setIsPaused] = useState(false)

  const slideIndex = ((page % slides.length) + slides.length) % slides.length
  const currentSlide = slides[slideIndex]

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }, [page])

  const goToSlide = useCallback((index: number) => {
    const newDirection = index > slideIndex ? 1 : -1
    setPage([index, newDirection])
  }, [slideIndex])

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      paginate(1)
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(interval)
  }, [paginate, isPaused])

  return (
    <section
      id="hero-carousel"
      className="relative overflow-hidden h-screen min-h-[600px]"
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${currentSlide.image}')` }}
          />

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient}`} />

          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDEzNGg4djg2aC04eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto flex max-w-4xl flex-1 flex-col items-center gap-6 text-center"
            >
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white">
                  {currentSlide.badge.icon}
                  <span>{currentSlide.badge.text}</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="text-lg md:text-xl font-medium text-white/80">
                  {currentSlide.subtitle}
                </div>
                <h1
                  id="hero-heading"
                  className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                >
                  {currentSlide.title}
                </h1>
                <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                  {currentSlide.description}
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-base px-8 py-6 h-auto group"
                  >
                    <Link href={currentSlide.cta.href} className="flex items-center gap-2">
                      {currentSlide.cta.text}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Service Times */}
              {slideIndex === 0 && (
                <motion.div
                  variants={itemVariants}
                  className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="font-medium">Sunday 10:00 AM</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/30" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="font-medium">Tuesday 6:30 PM</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/30" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="font-medium">Friday 6:30 PM</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-0" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="container h-full mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => paginate(-1)}
            className="pointer-events-auto group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous slide"
            aria-controls="hero-carousel"
          >
            <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="pointer-events-auto group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next slide"
            aria-controls="hero-carousel"
          >
            <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div
        className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2"
        role="group"
        aria-label="Carousel navigation"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center ${
              index === slideIndex
                ? 'bg-white/20 px-2'
                : 'bg-white/10 hover:bg-white/20'
            }`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-current={index === slideIndex}
          >
            <span className={`block rounded-full transition-all ${
              index === slideIndex
                ? 'bg-white w-8 h-2'
                : 'bg-white/60 w-2 h-2'
            }`} />
          </button>
        ))}
      </div>
    </section>
  )
}
