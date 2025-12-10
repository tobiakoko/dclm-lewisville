# Testing Documentation

Comprehensive testing suite for the DCLM Lewisville website.

## Table of Contents

- [Overview](#overview)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Mocking](#mocking)
- [Best Practices](#best-practices)

## Overview

This project uses:
- **Jest** as the test runner
- **React Testing Library** for component testing
- **MSW (Mock Service Worker)** for API mocking
- **@testing-library/user-event** for user interaction simulation

## Test Structure

```
__tests__/
├── api/                    # API route tests
│   ├── contact.test.ts
│   └── newsletter.test.ts
├── components/             # Component tests
│   └── ui/                # UI component tests
│       ├── button.test.tsx
│       ├── input.test.tsx
│       ├── textarea.test.tsx
│       ├── badge.test.tsx
│       └── card.test.tsx
├── integration/            # Integration tests
│   ├── contact-form.integration.test.tsx
│   └── README.md
├── lib/                    # Utility function tests
│   └── utils.test.ts
├── fixtures/               # Test data fixtures
│   ├── api-responses.ts
│   ├── forms.ts
│   └── README.md
└── utils/                  # Test utilities
    ├── test-utils.tsx      # Custom render functions
    ├── test-helpers.ts     # Helper functions
    ├── mock-data.ts        # Mock data
    ├── types.ts            # TypeScript types
    └── custom-matchers.ts  # Custom Jest matchers

__mocks__/
├── handlers.ts             # MSW request handlers
├── server.ts               # MSW server setup
├── browser.ts              # MSW browser setup
├── @sanity/
│   └── client.ts          # Sanity client mock
├── next-sanity.ts          # next-sanity mock
└── next/
    ├── image.tsx          # Next.js Image mock
    ├── link.tsx           # Next.js Link mock
    └── headers.ts         # Next.js headers mock
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci

# Run specific test file
npm test button.test

# Run tests matching a pattern
npm test -- --testNamePattern="should render"

# Run integration tests only
npm test -- __tests__/integration

# Run component tests only
npm test -- __tests__/components
```

## Writing Tests

### Component Tests

```typescript
import { render, screen } from '@/__tests__/utils/test-utils'
import { MyComponent } from '@/components/MyComponent'
import userEvent from '@testing-library/user-event'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<MyComponent onClick={handleClick} />)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalled()
  })
})
```

### API Route Tests

```typescript
/**
 * @jest-environment node
 */
import { POST } from '@/app/api/myroute/route'
import { NextRequest } from 'next/server'

describe('API Route', () => {
  it('should handle POST requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/myroute', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ success: true })
  })
})
```

### Integration Tests

```typescript
import { render, screen, waitFor } from '@/__tests__/utils/test-utils'
import { server } from '@/__mocks__/server'
import { http, HttpResponse } from 'msw'

describe('Feature Integration', () => {
  it('should complete user workflow', async () => {
    const user = userEvent.setup()
    render(<MyFeature />)

    // User interaction
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Wait for API response
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument()
    })
  })

  it('should handle errors', async () => {
    // Mock error response
    server.use(
      http.post('/api/endpoint', () => {
        return HttpResponse.json({ error: 'Failed' }, { status: 500 })
      })
    )

    // Test error handling...
  })
})
```

## Mocking

### API Mocking with MSW

MSW is configured globally for all tests. Handlers are defined in `__mocks__/handlers.ts`:

```typescript
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/contact', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ message: 'Success' })
  }),
]
```

Override handlers in specific tests:

```typescript
import { server } from '@/__mocks__/server'
import { http, HttpResponse } from 'msw'

test('error scenario', () => {
  server.use(
    http.post('/api/contact', () => {
      return HttpResponse.json({ error: 'Failed' }, { status: 500 })
    })
  )
  // Test code...
})
```

### Sanity Client Mocking

The Sanity client is mocked in `__mocks__/@sanity/client.ts` and returns mock data:

```typescript
import { createClient } from '@sanity/client'

// Automatically mocked - returns mock data based on query
const client = createClient({ /* config */ })
const sermons = await client.fetch('*[_type == "sermon"]')
```

### Next.js Mocking

Next.js components and utilities are mocked:

```typescript
// Image component
import Image from 'next/image'

// Link component
import Link from 'next/link'

// Navigation hooks (automatically mocked in jest.setup.js)
import { useRouter, usePathname } from 'next/navigation'
```

## Test Utilities

### Custom Render

Use `render` from test-utils for automatic provider wrapping:

```typescript
import { render } from '@/__tests__/utils/test-utils'

render(<MyComponent />) // Includes ThemeProvider and other providers
```

### Test Helpers

Common testing utilities:

```typescript
import {
  delay,
  createMockFile,
  mockLocalStorage,
  waitForCondition
} from '@/__tests__/utils/test-helpers'

// Wait for a condition
await waitForCondition(() => someValue === true)

// Create mock file for upload testing
const file = createMockFile('test.pdf', 'content', 'application/pdf')

// Mock localStorage
const { getItem, setItem } = mockLocalStorage()
```

### Mock Data

Typed mock data for testing:

```typescript
import {
  mockSermon,
  mockEvent,
  mockContactFormData
} from '@/__tests__/utils/mock-data'
```

### Custom Matchers

Extended Jest matchers:

```typescript
import { setupCustomMatchers } from '@/__tests__/utils/custom-matchers'

setupCustomMatchers()

expect('test@example.com').toHaveValidEmail()
expect('555-0123').toHaveValidPhone()
expect('https://example.com').toBeValidUrl()
expect(element).toBeAccessible()
```

## Best Practices

### 1. Test Behavior, Not Implementation

❌ Bad:
```typescript
expect(component.state.count).toBe(1)
```

✅ Good:
```typescript
expect(screen.getByText('Count: 1')).toBeInTheDocument()
```

### 2. Use Semantic Queries

Priority order:
1. `getByRole` - Most accessible
2. `getByLabelText` - Form elements
3. `getByPlaceholderText` - Inputs
4. `getByText` - Non-interactive elements
5. `getByTestId` - Last resort

```typescript
// Best
screen.getByRole('button', { name: /submit/i })

// Good
screen.getByLabelText('Email')

// Last resort
screen.getByTestId('submit-button')
```

### 3. Simulate Real User Interactions

❌ Bad:
```typescript
fireEvent.click(button)
```

✅ Good:
```typescript
const user = userEvent.setup()
await user.click(button)
```

### 4. Test Accessibility

```typescript
it('should be accessible', () => {
  render(<MyComponent />)

  // Check for labels
  expect(screen.getByLabelText('Email')).toBeInTheDocument()

  // Check for ARIA attributes
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('aria-label', 'Submit form')

  // Use custom matcher
  expect(button).toBeAccessible()
})
```

### 5. Use Async Utilities

```typescript
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})

// Find by (built-in async query)
const element = await screen.findByText('Loaded')

// Wait for element to be removed
await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
```

### 6. Keep Tests Independent

```typescript
describe('MyComponent', () => {
  beforeEach(() => {
    // Reset state before each test
    jest.clearAllMocks()
  })

  afterEach(() => {
    // Cleanup after each test
    cleanup()
  })
})
```

### 7. Test Error States

```typescript
it('should display error message', async () => {
  server.use(
    http.post('/api/contact', () => {
      return HttpResponse.json({ error: 'Failed' }, { status: 500 })
    })
  )

  render(<ContactForm />)
  await user.click(screen.getByRole('button', { name: /submit/i }))

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})
```

### 8. Use Descriptive Test Names

❌ Bad:
```typescript
it('works', () => { /* ... */ })
```

✅ Good:
```typescript
it('should display validation error when email is invalid', () => { /* ... */ })
```

## Coverage Thresholds

Current coverage requirements (configured in jest.config.js):
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

View coverage report:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## Continuous Integration

Tests run automatically in CI with:
```bash
npm run test:ci
```

This command:
- Runs all tests once (no watch mode)
- Generates coverage report
- Uses limited workers for CI environments
- Fails if coverage thresholds are not met

## Troubleshooting

### Tests Timing Out

Increase timeout:
```typescript
it('slow test', async () => {
  // Test code...
}, 10000) // 10 second timeout
```

### Act Warnings

Wrap state updates in `await waitFor`:
```typescript
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument()
})
```

### Module Not Found

Check path aliases in `jest.config.js`:
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [MSW Documentation](https://mswjs.io/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
