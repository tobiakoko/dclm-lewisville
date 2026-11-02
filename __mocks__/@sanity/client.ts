// Mock Sanity client for tests. It returns no content: a test that needs documents sets them
// explicitly, e.g. `(client.fetch as jest.Mock).mockResolvedValueOnce(doc)`. Never put sample
// church content here (CLAUDE.md rule 1).
export const createClient = jest.fn(() => ({
  fetch: jest.fn(() => Promise.resolve(null)),
  getDocument: jest.fn(() => Promise.resolve(undefined)),
  getDocuments: jest.fn(() => Promise.resolve([])),
  create: jest.fn((doc: unknown) => Promise.resolve({ ...(doc as object), _id: 'new-id' })),
  createOrReplace: jest.fn((doc: unknown) => Promise.resolve(doc)),
  patch: jest.fn(() => ({
    set: jest.fn().mockReturnThis(),
    commit: jest.fn(() => Promise.resolve({})),
  })),
  delete: jest.fn(() => Promise.resolve({})),
}))
