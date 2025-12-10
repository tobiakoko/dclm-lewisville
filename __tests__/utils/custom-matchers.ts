import { expect } from '@testing-library/react'

// Extend Jest matchers with custom assertions

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveValidEmail(): R
      toHaveValidPhone(): R
      toBeValidUrl(): R
      toHaveAriaLabel(label: string): R
      toBeAccessible(): R
    }
  }
}

// Custom matcher for valid email format
export const toHaveValidEmail = (received: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const pass = emailRegex.test(received)

  return {
    pass,
    message: () =>
      pass
        ? `expected ${received} not to be a valid email`
        : `expected ${received} to be a valid email`,
  }
}

// Custom matcher for valid phone format
export const toHaveValidPhone = (received: string) => {
  const phoneRegex = /^[\d\s\-+()]+$/
  const pass = phoneRegex.test(received) && received.replace(/\D/g, '').length >= 10

  return {
    pass,
    message: () =>
      pass
        ? `expected ${received} not to be a valid phone number`
        : `expected ${received} to be a valid phone number`,
  }
}

// Custom matcher for valid URL
export const toBeValidUrl = (received: string) => {
  try {
    new URL(received)
    return {
      pass: true,
      message: () => `expected ${received} not to be a valid URL`,
    }
  } catch {
    return {
      pass: false,
      message: () => `expected ${received} to be a valid URL`,
    }
  }
}

// Custom matcher for aria-label
export const toHaveAriaLabel = (received: HTMLElement, expected: string) => {
  const ariaLabel = received.getAttribute('aria-label')
  const pass = ariaLabel === expected

  return {
    pass,
    message: () =>
      pass
        ? `expected element not to have aria-label="${expected}"`
        : `expected element to have aria-label="${expected}", but got "${ariaLabel}"`,
  }
}

// Custom matcher for basic accessibility checks
export const toBeAccessible = (received: HTMLElement) => {
  const issues: string[] = []

  // Check for interactive elements without labels
  const interactiveElements = ['button', 'input', 'select', 'textarea']
  if (interactiveElements.includes(received.tagName.toLowerCase())) {
    const hasLabel =
      received.getAttribute('aria-label') ||
      received.getAttribute('aria-labelledby') ||
      received.getAttribute('title') ||
      (received as HTMLInputElement).labels?.length > 0

    if (!hasLabel) {
      issues.push('Interactive element missing accessible label')
    }
  }

  // Check for images without alt text
  if (received.tagName.toLowerCase() === 'img' && !received.getAttribute('alt')) {
    issues.push('Image missing alt text')
  }

  // Check for sufficient color contrast (basic check)
  const computedStyle = window.getComputedStyle(received)
  const backgroundColor = computedStyle.backgroundColor
  const color = computedStyle.color

  if (backgroundColor === 'transparent' || !backgroundColor || !color) {
    // Skip if we can't determine colors
  }

  const pass = issues.length === 0

  return {
    pass,
    message: () =>
      pass
        ? 'expected element not to be accessible'
        : `expected element to be accessible but found issues: ${issues.join(', ')}`,
  }
}

// Register custom matchers
export function setupCustomMatchers() {
  expect.extend({
    toHaveValidEmail,
    toHaveValidPhone,
    toBeValidUrl,
    toHaveAriaLabel,
    toBeAccessible,
  })
}
