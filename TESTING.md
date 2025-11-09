# Testing Guide

This document provides comprehensive information about testing in the DCLM Lewisville project.

## Table of Contents

- [Overview](#overview)
- [Test Types](#test-types)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)

## Overview

This project uses a comprehensive testing strategy that includes:

- **Unit Tests**: Testing individual components and utilities in isolation
- **Integration Tests**: Testing API routes and service integrations
- **End-to-End (E2E) Tests**: Testing complete user flows and interactions

### Testing Stack

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing React components
- **Playwright**: End-to-end testing
- **MSW (Mock Service Worker)**: API mocking for tests

## Test Types

### Unit Tests

Unit tests are located in the `__tests__` directory and test individual components, functions, and utilities.

**What we test:**
- Utility functions (`lib/utils.ts`)
- UI components (`components/ui/*`)
- Custom hooks
- Business logic

**Example:**
```typescript
// __tests__/lib/utils.test.ts
import { formatDate } from '@/lib/utils'

describe('formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024')
  })
})
```

### Integration Tests

Integration tests verify that different parts of the application work together correctly.

**What we test:**
- API routes (`app/api/*`)
- Database interactions
- External service integrations
- Form submissions

**Example:**
```typescript
// __tests__/api/contact.test.ts
import { POST } from '@/app/api/contact/route'

describe('Contact API', () => {
  it('should send email successfully', async () => {
    const response = await POST(mockRequest)
    expect(response.status).toBe(200)
  })
})
```

### E2E Tests

End-to-end tests simulate real user interactions and verify complete user flows.

**What we test:**
- User navigation flows
- Form submissions
- Page interactions
- Cross-browser compatibility
- Mobile responsiveness

**Example:**
```typescript
// e2e/contact-form.spec.ts
test('should submit contact form', async ({ page }) => {
  await page.goto('/contact')
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.locator('.success-message')).toBeVisible()
})
```

## Getting Started

### Prerequisites

Install all dependencies including test dependencies:

```bash
npm install
```

### Install Playwright Browsers

For E2E tests, install Playwright browsers:

```bash
npm run playwright:install
```

## Running Tests

### Unit and Integration Tests

```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI mode (recommended for debugging)
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Debug E2E tests
npm run test:e2e:debug
```

### Run All Tests

```bash
# Run both unit/integration and E2E tests
npm run test:all
```

## Writing Tests

### Unit Test Best Practices

1. **Arrange-Act-Assert (AAA) Pattern**

```typescript
test('should calculate total correctly', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }]

  // Act
  const total = calculateTotal(items)

  // Assert
  expect(total).toBe(30)
})
```

2. **Test One Thing at a Time**

```typescript
// Good
test('should add item to cart', () => {
  const cart = new Cart()
  cart.addItem({ id: 1, name: 'Item' })
  expect(cart.items).toHaveLength(1)
})

test('should calculate cart total', () => {
  const cart = new Cart()
  cart.addItem({ id: 1, price: 10 })
  expect(cart.total).toBe(10)
})
```

3. **Use Descriptive Test Names**

```typescript
// Good
test('should return 400 when email is missing from contact form')

// Bad
test('contact form validation')
```

4. **Mock External Dependencies**

```typescript
jest.mock('resend')

test('should send email via Resend', async () => {
  const mockSend = jest.fn()
  Resend.mockImplementation(() => ({ emails: { send: mockSend } }))

  await sendContactEmail(data)
  expect(mockSend).toHaveBeenCalled()
})
```

### Component Testing Best Practices

1. **Test User Behavior, Not Implementation**

```typescript
// Good
test('should display error message when form is invalid', async () => {
  render(<ContactForm />)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(screen.getByText(/email is required/i)).toBeInTheDocument()
})

// Bad
test('should set error state to true', () => {
  const { result } = renderHook(() => useForm())
  expect(result.current.hasError).toBe(true)
})
```

2. **Use Testing Library Queries in Order of Priority**

```typescript
// 1. Accessible to everyone
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email')

// 2. Semantic queries
screen.getByPlaceholderText('Enter email')
screen.getByText('Submit')

// 3. Test IDs (last resort)
screen.getByTestId('submit-button')
```

3. **Test Accessibility**

```typescript
test('should be accessible', () => {
  render(<Button>Click me</Button>)

  const button = screen.getByRole('button')
  expect(button).toHaveAccessibleName('Click me')
  expect(button).not.toHaveAttribute('aria-disabled')
})
```

### E2E Test Best Practices

1. **Use Page Object Model for Complex Flows**

```typescript
class ContactPage {
  constructor(private page: Page) {}

  async fillForm(data: ContactFormData) {
    await this.page.fill('[name="name"]', data.name)
    await this.page.fill('[name="email"]', data.email)
    await this.page.fill('[name="message"]', data.message)
  }

  async submit() {
    await this.page.click('button[type="submit"]')
  }
}
```

2. **Wait for Actions to Complete**

```typescript
// Good
await page.click('button')
await page.waitForLoadState('networkidle')
await expect(page.locator('.success')).toBeVisible()

// Bad
await page.click('button')
await page.waitForTimeout(3000) // Arbitrary timeout
```

3. **Mock External APIs**

```typescript
test('should handle API error', async ({ page }) => {
  await page.route('**/api/contact', route => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Server error' })
    })
  })

  // Test error handling
})
```

## Test Coverage

### Coverage Goals

We aim for the following coverage thresholds:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Viewing Coverage Reports

After running tests with coverage:

```bash
npm run test:coverage
```

Open the coverage report:

```bash
open coverage/lcov-report/index.html
```

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Pull requests
- Pushes to main branch
- Before deployment

### Environment Variables for CI

Ensure these environment variables are set in your CI/CD pipeline:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=your-resend-key
```

### Pre-commit Hooks

Consider adding pre-commit hooks to run tests:

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:ci"
    }
  }
}
```

## Troubleshooting

### Common Issues

**Issue: Tests fail with "Cannot find module"**

Solution: Ensure Jest is configured correctly in `jest.config.js` and paths match your `tsconfig.json`.

**Issue: Playwright tests fail with browser not found**

Solution: Run `npm run playwright:install` to install browsers.

**Issue: Mock not working**

Solution: Ensure mocks are defined before imports:

```typescript
jest.mock('module-name')
import { functionToTest } from './module'
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain or improve code coverage
4. Update this documentation if adding new test patterns

## Questions?

For testing questions or issues, please:
- Check this documentation
- Review existing test examples
- Contact the development team
