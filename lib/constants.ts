// Type definitions
export interface NavLink {
  name: string
  href: string
  highlight?: boolean
}

export interface QuickLink {
  name: string
  href: string
}

export interface MinistryCategory {
  name: string
  href: string
}

export interface ServiceTime {
  name: string
  day: string
  time: string
  description: string
}

export interface SiteConfig {
  name: string
  shortName: string
  description: string
  url: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  phone: string
  email: string
  socialMedia: {
    facebook: string
    instagram: string
    youtube: string
  }
}

// Site Configuration
export const SITE_CONFIG: SiteConfig = {
  name: 'Deeper Life Bible Church Lewisville',
  shortName: 'DCLM Lewisville',
  description: 'A Christ-centered church in Lewisville, TX, dedicated to biblical teaching and spiritual growth.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dclmlewisville.org',
  address: {
    street: '123 Church Street',
    city: 'Lewisville',
    state: 'TX',
    zip: '75067',
    country: 'USA',
  },
  phone: '(123) 456-7890',
  email: 'info@dclmlewisville.org',
  socialMedia: {
    facebook: 'https://facebook.com/dclmlewisville',
    instagram: 'https://instagram.com/dclmlewisville',
    youtube: 'https://youtube.com/@dclmlewisville',
  },
}

// Service Times
export const SERVICE_TIMES: ServiceTime[] = [
  {
    name: 'Sunday Service',
    day: 'Sunday',
    time: '9:30 AM',
    description: 'Main worship service',
  },
  {
    name: 'Bible Study',
    day: 'Tuesday',
    time: '7:00 PM',
    description: 'Systematic and expository study of the Word',
  },
  {
    name: 'Revival Service',
    day: 'Friday',
    time: '7:00 PM',
    description: 'Revival, Prayer, and Evangelism Training',
  },
]

// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Ministries', href: '/ministries' },
  { name: 'Ministers', href: '/ministers' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
  // Highlighted CTAs - handled separately in the header
  { name: 'Give', href: '/give', highlight: true },
  { name: 'Plan a Visit', href: '/visit', highlight: true },
]

// Quick Links for Footer
export const QUICK_LINKS: QuickLink[] = [
  { name: 'New Here?', href: '/new-here' },
  { name: 'Beliefs', href: '/beliefs' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Serve', href: '/serve' },
  { name: 'Small Groups', href: '/groups' },
  { name: 'Prayer Request', href: '/prayer' },
]

// Ministry Categories
export const MINISTRY_CATEGORIES: MinistryCategory[] = [
  { name: "Children's Ministry", href: '/ministries/children' },
  { name: 'Youth Ministry', href: '/ministries/youth' },
  { name: 'Young Adults', href: '/ministries/young-adults' },
  { name: "Women's Ministry", href: '/ministries/women' },
  { name: "Men's Ministry", href: '/ministries/men' },
  { name: 'Seniors Ministry', href: '/ministries/seniors' },
  { name: 'Music & Worship', href: '/ministries/worship' },
  { name: 'Outreach & Missions', href: '/ministries/outreach' },
]

// Type exports for use in components
// export type { NavLink, QuickLink, MinistryCategory, ServiceTime, SiteConfig }