// Type definitions for mock data

export interface MockSermon {
  _id: string
  title: string
  slug: { current: string }
  date: string
  speaker: {
    name: string
    title: string
    photo: string | null
  }
  scripture: string
  thumbnail: string | null
  duration: string
  description: string
  tags: string[]
  audioUrl?: string
  videoUrl?: string
}

export interface MockEvent {
  _id: string
  title: string
  slug: { current: string }
  date: string
  endDate?: string
  location: string
  description: string
  image: string | null
  featured: boolean
  registrationUrl?: string
  capacity?: number
}

export interface MockMinistry {
  _id: string
  name: string
  slug: { current: string }
  description: string
  icon: string
  leader: {
    name: string
    photo: string | null
  }
  meetingTime: string
  meetingDay: string
  contactEmail?: string
}

export interface MockTeamMember {
  _id: string
  name: string
  title: string
  role: string
  shortBio: string
  photo: string | null
  email?: string
  phone?: string
}

export interface MockTestimonial {
  _id: string
  content: string
  author: string
  photo: string | null
  ministry?: string
  featured: boolean
  date?: string
}

export interface MockContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface MockNewsletterData {
  email: string
}

export interface MockDoctrine {
  _id: string
  title: string
  slug: { current: string }
  content: string
  order: number
  scripture?: string
}

export interface MockSiteSettings {
  _id: string
  title: string
  description: string
  keywords: string[]
  contactEmail: string
  contactPhone: string
  address: string
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
  }
}
