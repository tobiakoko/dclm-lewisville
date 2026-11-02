// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// This setup file runs in the jsdom environment, which lacks the fetch API
// globals that msw relies on. The polyfills below must be applied in order
// (TextEncoder first, then undici), so require() is used instead of static
// imports (which would be hoisted and evaluate undici too early).
/* eslint-disable @typescript-eslint/no-require-imports */
if (typeof globalThis.Response === 'undefined') {
  const { TextEncoder, TextDecoder } = require('node:util')
  const { ReadableStream, WritableStream, TransformStream } = require('node:stream/web')
  Object.assign(globalThis, {
    TextEncoder,
    TextDecoder,
    ReadableStream,
    WritableStream,
    TransformStream,
  })
  // FormData is provided by jsdom (and accepts HTMLFormElement), so only
  // the fetch API globals are missing.
  const { fetch, Response, Request, Headers } = require('undici')
  Object.assign(globalThis, { fetch, Response, Request, Headers })
}

if (typeof globalThis.BroadcastChannel === 'undefined') {
  const { BroadcastChannel } = require('node:worker_threads')
  globalThis.BroadcastChannel = BroadcastChannel
}

// Mock environment variables
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project-id'
process.env.NEXT_PUBLIC_SANITY_DATASET = 'test'

// Only mock browser APIs when in jsdom environment
if (typeof window !== 'undefined') {
  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return []
    }
    unobserve() {}
  }

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Suppress console errors in tests (optional, remove if you want to see them)
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
