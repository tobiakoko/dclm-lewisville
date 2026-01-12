
import { Transition, Variant, Variants } from 'framer-motion'

// Sanity image reference type
export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  asset: SanityImageAsset
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface Sermon {
  _id: string
  title: string
  slug: {
    current: string
  }
  date: string
  speaker: {
    name: string
    title?: string
    photo?: SanityImage
  }
  scripture?: string[]
  thumbnail?: SanityImage
  duration?: number
  description?: string
  series?: {
    title: string
    slug: {
      current: string
    }
  }
  tags?: string[]
}

export interface Ministry {
  _id: string
  name: string
  slug: {
    current: string
  }
  description: string
  icon: string
  leader?: {
    name: string
    photo?: SanityImage
  }
  meetingTime?: string
  meetingDay?: string
}

export interface Person {
  _id: string
  name: string
  title: string
  role: string
  shortBio?: string
  photo?: SanityImage
  email?: string
}

export interface Testimonial {
  _id: string
  content: string
  author: string
  photo?: SanityImage
  ministry?: string
}

export interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  date: string
  endDate?: string
  location: string
  description?: unknown  // Portable Text content (blockContent)
  image?: SanityImage
  featured?: boolean
}


// Safe transition type that TypeScript won't complain about
export type SafeTransition = Transition & {
  duration?: number
  delay?: number
  ease?: string | number[]
  type?: 'spring' | 'tween' | 'inertia'
  stiffness?: number
  damping?: number
  mass?: number
  velocity?: number
  restSpeed?: number
  restDelta?: number
  staggerChildren?: number
  delayChildren?: number
  when?: 'beforeChildren' | 'afterChildren'
  repeat?: number
  repeatType?: 'loop' | 'reverse' | 'mirror'
  repeatDelay?: number
}

// Safe variant type
export type SafeVariant = Variant & {
  opacity?: number
  x?: number | string
  y?: number | string
  scale?: number
  rotate?: number
  transition?: SafeTransition
}

// Safe variants type
export type SafeVariants = {
  [key: string]: SafeVariant
}

// Common animation presets
export const fadeInVariants: SafeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' } as SafeTransition
  }
}

export const slideUpVariants: SafeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' } as SafeTransition
  }
}

export const staggerContainerVariants: SafeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    } as SafeTransition
  }
}

export const staggerItemVariants: SafeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' } as SafeTransition
  }
}

// Transition presets
export const springTransition: SafeTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 30
}

export const easeOutTransition: SafeTransition = {
  duration: 0.5,
  ease: 'easeOut'
}

export const staggerTransition: SafeTransition = {
  staggerChildren: 0.08,
  delayChildren: 0.1
}

// Home Section Types
export interface HeroSlide {
  title: string
  subtitle?: string
  description?: string
  image: any  // Sanity image reference
  ctaText?: string
  ctaLink?: string
}

export interface HeroCarouselSection {
  enabled?: boolean
  heroSlides?: HeroSlide[]
}

export interface WelcomeMessage {
  heading?: string
  content?: unknown  // Portable text content
  signature?: string
  tagline?: string
}

export interface PastorWelcomeSection {
  enabled?: boolean
  welcomeMessage?: WelcomeMessage
}

export interface GiveContent {
  heading?: string
  description?: string
  churchGivingTitle?: string
  churchGivingDescription?: string
  gckGivingTitle?: string
  gckGivingDescription?: string
  gckGivingUrl?: string
  scriptureVerse?: string
  scriptureReference?: string
}

export interface GiveSection {
  enabled?: boolean
  giveContent?: GiveContent
}

export interface CtaContent {
  heading?: string
  highlightedText?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export interface CtaSection {
  enabled?: boolean
  ctaContent?: CtaContent
}

export interface HomeSections {
  heroCarousel?: HeroCarouselSection | null
  pastorWelcome?: PastorWelcomeSection | null
  giveSection?: GiveSection | null
  ctaSection?: CtaSection | null
}

// Service Times
export interface ServiceTime {
  name: string
  day: string
  time: string
  description?: string
}

export interface SiteSettings {
  title?: string
  description?: string
  logo?: SanityImage
  address?: string
  phone?: string
  email?: string
  servicesTimes?: ServiceTime[]
  socialMedia?: any
  aboutContent?: any
  seo?: any
}