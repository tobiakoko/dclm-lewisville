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
  description?: string
  image?: SanityImage
  featured?: boolean
}