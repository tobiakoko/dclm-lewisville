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
  description: 'Part of the global Deeper Christian Life Ministry, committed to biblical teaching, holy living, and fervent evangelism in Lewisville, Texas.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dclmlewisville.org',
  address: {
    street: '1500 W Main Street',
    city: 'Lewisville',
    state: 'TX',
    zip: '75067',
    country: 'USA',
  },
  phone: '(972) 123-4567',
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
    description: 'Worship, biblical teaching, and fellowship',
  },
  {
    name: 'Bible Study',
    day: 'Tuesday',
    time: '7:00 PM',
    description: 'Systematic study of God\'s Word and doctrine',
  },
  {
    name: 'Revival Service',
    day: 'Friday',
    time: '7:00 PM',
    description: 'Prayer, evangelism, and spiritual renewal',
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

// Example data for Services Grid components
// Copy this to test any of the three versions

export const servicesData = [
  {
    name: "Sunday Worship",
    day: "Sunday",
    time: "9:00 AM & 11:00 AM",
    description:
      "Join us for spirit-filled worship, powerful preaching, and fellowship with believers.",
    featured: true, // For Premium version
    location: "Main Sanctuary", // For Compact version
    attendees: "200+ members", // For Modern version
  },
  {
    name: "Bible Study",
    day: "Wednesday",
    time: "7:00 PM",
    description:
      "Deep dive into God's Word with interactive discussions and practical applications for daily living.",
    location: "Fellowship Hall",
    attendees: "80+ members",
  },
  {
    name: "Prayer Meeting",
    day: "Friday",
    time: "6:00 PM",
    description:
      "Corporate prayer time for breakthrough, healing, and miracles. Come and experience God's power.",
    location: "Prayer Room",
    attendees: "50+ members",
  },
];

// Alternative data - Youth Services
export const youthServicesData = [
  {
    name: "Youth Sunday",
    day: "Sunday",
    time: "11:00 AM",
    description:
      "Dynamic worship and relevant teaching designed specifically for young people ages 13-25.",
    featured: true,
    location: "Youth Center",
    attendees: "100+ youth",
  },
  {
    name: "Teen Connect",
    day: "Thursday",
    time: "6:30 PM",
    description:
      "Mid-week gathering for teens with games, worship, and life application studies.",
    location: "Youth Center",
    attendees: "60+ teens",
  },
];

// Alternative data - Special Services
export const specialServicesData = [
  {
    name: "Early Morning Prayer",
    day: "Daily",
    time: "5:30 AM",
    description:
      "Start your day with prayer and communion with God. Open to all members seeking breakthrough.",
    location: "Prayer Chapel",
  },
  {
    name: "Women's Fellowship",
    day: "Saturday",
    time: "10:00 AM",
    description:
      "Join sisters in Christ for worship, teaching, and fellowship. Building godly relationships.",
    featured: false,
    location: "Conference Room",
    attendees: "40+ women",
  },
  {
    name: "Men's Breakfast",
    day: "Saturday",
    time: "8:00 AM",
    description:
      "Monthly gathering for men with breakfast, powerful teaching, and accountability.",
    location: "Fellowship Hall",
    attendees: "50+ men",
  },
];

// Alternative data - Online Services
export const onlineServicesData = [
  {
    name: "Online Worship",
    day: "Sunday",
    time: "9:00 AM",
    description:
      "Join us online via YouTube Live for the full worship experience from anywhere in the world.",
    featured: true,
    location: "YouTube Live",
    attendees: "500+ viewers",
  },
  {
    name: "Virtual Bible Study",
    day: "Tuesday",
    time: "8:00 PM",
    description:
      "Interactive online Bible study via Zoom. Perfect for those unable to attend in person.",
    location: "Zoom",
    attendees: "120+ participants",
  },
];

// Example usage in a component:
/*
import ServicesGrid from "@/components/ServicesGrid";
import { servicesData } from "@/data/servicesData";

export default function ServicesPage() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-4xl font-heading font-bold text-center mb-4">
          Join Us for Worship
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We have services throughout the week to help you grow in your faith
          and connect with our church family.
        </p>
        <ServicesGrid times={servicesData} />
      </div>
    </section>
  );
}
*/

// TypeScript type export for reference
export type ServiceTime = {
  name: string;
  day: string;
  time: string;
  description: string;
  featured?: boolean;
  location?: string;
  attendees?: string;
};

// Type exports for use in components
// export type { NavLink, QuickLink, MinistryCategory, ServiceTime, SiteConfig }