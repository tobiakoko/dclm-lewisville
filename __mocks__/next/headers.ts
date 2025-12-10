// Mock Next.js headers for testing

export const headers = jest.fn(() => {
  return new Headers({
    'Content-Type': 'application/json',
    'User-Agent': 'test-agent',
  })
})

export const cookies = jest.fn(() => ({
  get: jest.fn((name: string) => ({ name, value: 'test-value' })),
  set: jest.fn(),
  delete: jest.fn(),
  has: jest.fn(() => true),
  getAll: jest.fn(() => []),
}))
