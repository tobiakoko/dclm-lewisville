import { groq } from 'next-sanity'

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
      location,
      image
    },
    "ministries": *[_type == "ministry"] | order(order asc)[0...6] {
      _id,
      name,
      slug,
      description,
      icon
    },
    "testimonials": *[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...3] {
      _id,
      content,
      author,
      photo,
      ministry
    },
    "team": *[_type == "person"] | order(order asc)[0...4] {
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