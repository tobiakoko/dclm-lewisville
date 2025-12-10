import type {
  MockSermon,
  MockEvent,
  MockMinistry,
  MockTeamMember,
  MockTestimonial,
  MockContactFormData,
  MockNewsletterData,
  MockDoctrine,
  MockSiteSettings,
} from './types'

// Mock data for testing

export const mockSermon: MockSermon = {
  _id: 'sermon-1',
  title: 'Test Sermon',
  slug: { current: 'test-sermon' },
  date: '2024-01-15',
  speaker: {
    name: 'John Doe',
    title: 'Pastor',
    photo: null,
  },
  scripture: 'John 3:16',
  thumbnail: null,
  duration: '45:00',
  description: 'A test sermon description',
  tags: ['faith', 'grace'],
  audioUrl: 'https://example.com/sermon.mp3',
}

export const mockSermons: MockSermon[] = [
  mockSermon,
  {
    _id: 'sermon-2',
    title: 'The Power of Prayer',
    slug: { current: 'power-of-prayer' },
    date: '2024-02-20',
    speaker: {
      name: 'Jane Smith',
      title: 'Associate Pastor',
      photo: null,
    },
    scripture: 'Matthew 6:9-13',
    thumbnail: null,
    duration: '38:00',
    description: 'Understanding the importance of prayer',
    tags: ['prayer', 'spiritual growth'],
  },
]

export const mockEvent: MockEvent = {
  _id: 'event-1',
  title: 'Test Event',
  slug: { current: 'test-event' },
  date: '2024-12-25',
  endDate: '2024-12-26',
  location: 'Main Sanctuary',
  description: 'A test event description',
  image: null,
  featured: true,
  registrationUrl: 'https://example.com/register',
}

export const mockEvents: MockEvent[] = [
  mockEvent,
  {
    _id: 'event-2',
    title: 'Youth Conference',
    slug: { current: 'youth-conference' },
    date: '2024-03-15',
    endDate: '2024-03-17',
    location: 'Youth Hall',
    description: 'Annual youth conference',
    image: null,
    featured: false,
  },
]

export const mockMinistry: MockMinistry = {
  _id: 'ministry-1',
  name: 'Test Ministry',
  slug: { current: 'test-ministry' },
  description: 'A test ministry description',
  icon: 'users',
  leader: {
    name: 'Jane Smith',
    photo: null,
  },
  meetingTime: '10:00 AM',
  meetingDay: 'Sunday',
  contactEmail: 'ministry@example.com',
}

export const mockMinistries: MockMinistry[] = [
  mockMinistry,
  {
    _id: 'ministry-2',
    name: 'Youth Ministry',
    slug: { current: 'youth-ministry' },
    description: 'Empowering young people',
    icon: 'star',
    leader: {
      name: 'Bob Johnson',
      photo: null,
    },
    meetingTime: '6:00 PM',
    meetingDay: 'Friday',
  },
]

export const mockTeamMember: MockTeamMember = {
  _id: 'person-1',
  name: 'John Doe',
  title: 'Senior Pastor',
  role: 'Leadership',
  shortBio: 'A dedicated servant of God',
  photo: null,
  email: 'john@example.com',
  phone: '555-0100',
}

export const mockTeamMembers: MockTeamMember[] = [
  mockTeamMember,
  {
    _id: 'person-2',
    name: 'Jane Smith',
    title: 'Worship Leader',
    role: 'Worship',
    shortBio: 'Passionate about worship',
    photo: null,
  },
]

export const mockTestimonial: MockTestimonial = {
  _id: 'testimonial-1',
  content: 'This church has changed my life!',
  author: 'Jane Smith',
  photo: null,
  ministry: 'Youth Ministry',
  featured: true,
  date: '2024-01-10',
}

export const mockTestimonials: MockTestimonial[] = [
  mockTestimonial,
  {
    _id: 'testimonial-2',
    content: 'Amazing community of believers',
    author: 'Mike Brown',
    photo: null,
    featured: false,
  },
]

export const mockContactFormData: MockContactFormData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '123-456-7890',
  message: 'This is a test message',
}

export const mockNewsletterData: MockNewsletterData = {
  email: 'subscriber@example.com',
}

export const mockDoctrine: MockDoctrine = {
  _id: 'doctrine-1',
  title: 'The Trinity',
  slug: { current: 'the-trinity' },
  content: 'We believe in one God, eternally existing in three persons...',
  order: 1,
  scripture: 'Matthew 28:19',
}

export const mockDoctrines: MockDoctrine[] = [
  mockDoctrine,
  {
    _id: 'doctrine-2',
    title: 'Salvation',
    slug: { current: 'salvation' },
    content: 'We believe that salvation is a gift of God...',
    order: 2,
  },
]

export const mockSiteSettings: MockSiteSettings = {
  _id: 'site-settings',
  title: 'DCLM Lewisville',
  description: 'Deeper Christian Life Ministry Lewisville',
  keywords: ['church', 'ministry', 'faith', 'christian'],
  contactEmail: 'info@dclmlewisville.org',
  contactPhone: '555-0123',
  address: '123 Main St, Lewisville, TX 75067',
  socialMedia: {
    facebook: 'https://facebook.com/dclmlewisville',
    instagram: 'https://instagram.com/dclmlewisville',
    youtube: 'https://youtube.com/@dclmlewisville',
  },
}
