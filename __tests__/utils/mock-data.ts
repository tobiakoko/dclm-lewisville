// Mock data for testing

export const mockSermon = {
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
}

export const mockEvent = {
  _id: 'event-1',
  title: 'Test Event',
  slug: { current: 'test-event' },
  date: '2024-12-25',
  endDate: '2024-12-26',
  location: 'Main Sanctuary',
  description: 'A test event description',
  image: null,
  featured: true,
}

export const mockMinistry = {
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
}

export const mockTeamMember = {
  _id: 'person-1',
  name: 'John Doe',
  title: 'Senior Pastor',
  role: 'Leadership',
  shortBio: 'A dedicated servant of God',
  photo: null,
  email: 'john@example.com',
}

export const mockTestimonial = {
  _id: 'testimonial-1',
  content: 'This church has changed my life!',
  author: 'Jane Smith',
  photo: null,
  ministry: 'Youth Ministry',
  featured: true,
}

export const mockContactFormData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '123-456-7890',
  message: 'This is a test message',
}

export const mockNewsletterData = {
  email: 'subscriber@example.com',
}
