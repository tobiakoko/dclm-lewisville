import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    address,
    phone,
    email,
    servicesTimes[] {
      name,
      day,
      time,
      description
    },
    socialMedia,
    aboutContent,
    seo
  }
`

// Homepage Sections
export const homeSectionsQuery = groq`
  {
    "heroCarousel": *[_type == "homeSection" && sectionId == "heroCarousel"][0] {
      enabled,
      heroSlides[] {
        title,
        subtitle,
        description,
        image,
        ctaText,
        ctaLink
      }
    },
    "pastorWelcome": *[_type == "homeSection" && sectionId == "pastorWelcome"][0] {
      enabled,
      welcomeMessage {
        heading,
        content,
        signature,
        tagline
      }
    },
    "giveSection": *[_type == "homeSection" && sectionId == "giveSection"][0] {
      enabled,
      giveContent {
        heading,
        description,
        churchGivingTitle,
        churchGivingDescription,
        gckGivingTitle,
        gckGivingDescription,
        gckGivingUrl,
        scriptureVerse,
        scriptureReference
      }
    },
    "ctaSection": *[_type == "homeSection" && sectionId == "ctaSection"][0] {
      enabled,
      ctaContent {
        heading,
        highlightedText,
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink
      }
    }
  }
`

// Homepage data
export const homePageQuery = groq`
  {
    "featuredSermons": *[_type == "sermon"] | order(date desc)[0...3] {
      _id,
      title,
      slug,
      date,
      speaker->{name, title, photo},
      scripture,
      thumbnail,
      duration
    },
    "upcomingEvents": *[_type == "event" && date >= now()] | order(date asc)[0...3] {
      _id,
      title,
      slug,
      date,
      endDate,
      location,
      description,
      image,
      featured
    },
    "ministries": *[_type == "ministry" && active == true] | order(order asc)[0...6] {
      _id,
      name,
      slug,
      description,
      icon
    },
    "team": *[_type == "person" && active == true] | order(order asc) {
      _id,
      name,
      title,
      role,
      shortBio,
      photo,
      email
    },
    "testimonials": *[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...3] {
      _id,
      content,
      author,
      photo,
      ministry
    }
  }
`

// Bible Doctrines
export const doctrinesQuery = groq`
  *[_type == "doctrine"] | order(order asc) {
    _id,
    title,
    order,
    content,
    scripture,
    category,
    featured
  }
`

// All sermons
export const sermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    speaker->{name, title, photo},
    scripture,
    series->{title, slug},
    thumbnail,
    description,
    duration,
    tags
  }
`

// Single sermon
export const sermonQuery = groq`
  *[_type == "sermon" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    speaker->{
      name,
      title,
      bio,
      photo,
      email
    },
    scripture,
    series->{
      title,
      slug,
      description
    },
    audioFile,
    videoUrl,
    thumbnail,
    transcript,
    description,
    tags,
    duration,
    "relatedSermons": *[_type == "sermon" && slug.current != $slug && (
      series._ref == ^.series._ref ||
      count((tags[])[@ in ^.tags[]]) > 0
    )] | order(date desc)[0...3] {
      _id,
      title,
      slug,
      date,
      thumbnail,
      speaker->{name}
    }
  }
`

// All ministries
export const ministriesQuery = groq`
  *[_type == "ministry"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    leader->{name, photo},
    meetingTime,
    meetingDay
  }
`

// Single ministry
export const ministryQuery = groq`
  *[_type == "ministry" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    mission,
    description,
    leader->{
      name,
      title,
      bio,
      photo,
      email,
      phone
    },
    meetingTime,
    meetingDay,
    location,
    contactEmail,
    images,
    activities[] {
      title,
      description,
      icon
    },
    "testimonials": *[_type == "testimonial" && references(^._id)] {
      _id,
      content,
      author,
      photo,
      date
    },
    milestones[] {
      date,
      title,
      description
    }
  }
`

// Team members
export const teamQuery = groq`
  *[_type == "person"] | order(order asc) {
    _id,
    name,
    title,
    role,
    bio,
    photo,
    email,
    phone,
    socialMedia
  }
`

// Events
export const eventsQuery = groq`
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    slug,
    date,
    endDate,
    location,
    description,
    image,
    registrationLink,
    ministry->{name, slug},
    featured
  }
`