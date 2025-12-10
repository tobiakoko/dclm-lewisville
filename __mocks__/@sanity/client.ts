import { mockSermons, mockEvents, mockMinistries, mockTeamMembers, mockTestimonials, mockDoctrines, mockSiteSettings } from '@/__tests__/utils/mock-data'

// Mock Sanity client for testing
export const createClient = jest.fn(() => ({
  fetch: jest.fn((query: string) => {
    // Parse query to determine what data to return
    if (query.includes('sermon')) {
      return Promise.resolve(mockSermons)
    }
    if (query.includes('event')) {
      return Promise.resolve(mockEvents)
    }
    if (query.includes('ministry') || query.includes('ministries')) {
      return Promise.resolve(mockMinistries)
    }
    if (query.includes('person') || query.includes('team')) {
      return Promise.resolve(mockTeamMembers)
    }
    if (query.includes('testimonial')) {
      return Promise.resolve(mockTestimonials)
    }
    if (query.includes('doctrine')) {
      return Promise.resolve(mockDoctrines)
    }
    if (query.includes('siteSettings')) {
      return Promise.resolve(mockSiteSettings)
    }
    return Promise.resolve([])
  }),

  getDocument: jest.fn((id: string) => {
    // Return mock data based on document ID
    const allDocs = [
      ...mockSermons,
      ...mockEvents,
      ...mockMinistries,
      ...mockTeamMembers,
      ...mockTestimonials,
      ...mockDoctrines,
      mockSiteSettings,
    ]
    return Promise.resolve(allDocs.find((doc) => doc._id === id))
  }),

  getDocuments: jest.fn((ids: string[]) => {
    const allDocs = [
      ...mockSermons,
      ...mockEvents,
      ...mockMinistries,
      ...mockTeamMembers,
      ...mockTestimonials,
      ...mockDoctrines,
      mockSiteSettings,
    ]
    return Promise.resolve(allDocs.filter((doc) => ids.includes(doc._id)))
  }),

  create: jest.fn((doc: unknown) => Promise.resolve({ ...doc, _id: 'new-id' })),

  createOrReplace: jest.fn((doc: unknown) => Promise.resolve(doc)),

  createIfNotExists: jest.fn((doc: unknown) => Promise.resolve(doc)),

  patch: jest.fn(() => ({
    set: jest.fn().mockReturnThis(),
    unset: jest.fn().mockReturnThis(),
    inc: jest.fn().mockReturnThis(),
    dec: jest.fn().mockReturnThis(),
    commit: jest.fn(() => Promise.resolve({ _id: 'patched-id' })),
  })),

  delete: jest.fn((id: string) => Promise.resolve({ documentId: id })),

  mutate: jest.fn((mutations: unknown) => Promise.resolve(mutations)),

  transaction: jest.fn(() => ({
    create: jest.fn().mockReturnThis(),
    createOrReplace: jest.fn().mockReturnThis(),
    createIfNotExists: jest.fn().mockReturnThis(),
    patch: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    commit: jest.fn(() => Promise.resolve([])),
  })),

  listen: jest.fn(() => ({
    subscribe: jest.fn(() => ({
      unsubscribe: jest.fn(),
    })),
  })),

  observable: {
    fetch: jest.fn(() => ({
      subscribe: jest.fn(() => ({
        unsubscribe: jest.fn(),
      })),
    })),
  },

  config: jest.fn().mockReturnThis(),

  withConfig: jest.fn().mockReturnThis(),
}))

// Export mock for next-sanity
export default {
  createClient,
}
