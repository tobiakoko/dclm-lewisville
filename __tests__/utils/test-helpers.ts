import { waitFor } from '@testing-library/react'

/**
 * Waits for a specific condition to be true
 */
export async function waitForCondition(
  condition: () => boolean,
  timeout = 3000,
  interval = 50
): Promise<void> {
  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    const checkCondition = () => {
      if (condition()) {
        resolve()
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Condition timeout'))
      } else {
        setTimeout(checkCondition, interval)
      }
    }
    checkCondition()
  })
}

/**
 * Creates a mock file for file upload testing
 */
export function createMockFile(
  name = 'test.txt',
  content = 'test content',
  type = 'text/plain'
): File {
  const blob = new Blob([content], { type })
  return new File([blob], name, { type })
}

/**
 * Creates a mock image file for image upload testing
 */
export function createMockImage(
  name = 'test.png',
  width = 100,
  height = 100
): File {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.toBlob((blob) => {
    return new File([blob!], name, { type: 'image/png' })
  })
  return new File([], name, { type: 'image/png' })
}

/**
 * Simulates a delay for async testing
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Creates a mock IntersectionObserver entry
 */
export function createMockIntersectionObserverEntry(
  target: Element,
  isIntersecting = true
): IntersectionObserverEntry {
  return {
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: target.getBoundingClientRect(),
    intersectionRect: target.getBoundingClientRect(),
    rootBounds: null,
    time: Date.now(),
  }
}

/**
 * Mocks window.scrollTo for testing
 */
export function mockScrollTo(): jest.Mock {
  const scrollToMock = jest.fn()
  global.scrollTo = scrollToMock
  return scrollToMock
}

/**
 * Mocks window.matchMedia for responsive testing
 */
export function mockMatchMedia(matches = false): jest.Mock {
  const matchMediaMock = jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
  })

  return matchMediaMock
}

/**
 * Creates a mock fetch response
 */
export function createMockFetchResponse<T>(
  data: T,
  status = 200,
  statusText = 'OK'
): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    headers: new Headers(),
    json: async () => data,
    text: async () => JSON.stringify(data),
    blob: async () => new Blob([JSON.stringify(data)]),
    arrayBuffer: async () => new ArrayBuffer(0),
    formData: async () => new FormData(),
  } as Response
}

/**
 * Waits for async state updates to complete
 */
export async function flushPromises(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve))
}

/**
 * Creates a spy on console methods for testing logging
 */
export function spyOnConsole(method: 'log' | 'warn' | 'error' = 'error'): jest.SpyInstance {
  return jest.spyOn(console, method).mockImplementation(() => {})
}

/**
 * Restores all console spies
 */
export function restoreConsole(): void {
  jest.restoreAllMocks()
}

/**
 * Creates a mock local storage for testing
 */
export function mockLocalStorage(): {
  getItem: jest.Mock
  setItem: jest.Mock
  removeItem: jest.Mock
  clear: jest.Mock
} {
  const store: Record<string, string> = {}

  const getItem = jest.fn((key: string) => store[key] || null)
  const setItem = jest.fn((key: string, value: string) => {
    store[key] = value
  })
  const removeItem = jest.fn((key: string) => {
    delete store[key]
  })
  const clear = jest.fn(() => {
    Object.keys(store).forEach((key) => delete store[key])
  })

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem,
      setItem,
      removeItem,
      clear,
      length: 0,
      key: jest.fn(),
    },
    writable: true,
  })

  return { getItem, setItem, removeItem, clear }
}

/**
 * Gets the computed style of an element
 */
export function getComputedStyles(element: HTMLElement): CSSStyleDeclaration {
  return window.getComputedStyle(element)
}

/**
 * Checks if an element has a specific CSS class with optional partial match
 */
export function hasClass(element: HTMLElement, className: string, partial = false): boolean {
  if (partial) {
    return Array.from(element.classList).some((cls) => cls.includes(className))
  }
  return element.classList.contains(className)
}

/**
 * Triggers a custom event on an element
 */
export function triggerEvent(
  element: HTMLElement,
  eventName: string,
  detail?: unknown
): void {
  const event = new CustomEvent(eventName, { detail, bubbles: true, cancelable: true })
  element.dispatchEvent(event)
}

/**
 * Waits for an element to be removed from the DOM
 */
export async function waitForElementToBeRemoved(
  selector: string,
  timeout = 3000
): Promise<void> {
  await waitFor(
    () => {
      expect(document.querySelector(selector)).not.toBeInTheDocument()
    },
    { timeout }
  )
}
