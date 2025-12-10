# Integration Tests

Integration tests verify that multiple components and systems work together correctly.

## Structure

- Tests in this directory test complete user flows
- Include API mocking with MSW
- Test interactions between components
- Verify data flow through the application

## Running Integration Tests

```bash
# Run all integration tests
npm test -- __tests__/integration

# Run specific integration test
npm test -- contact-form.integration.test

# Run with coverage
npm run test:coverage -- __tests__/integration
```

## Writing Integration Tests

Integration tests should:
1. Test complete user workflows
2. Use MSW to mock API calls
3. Include both happy paths and error scenarios
4. Verify loading states and error handling
5. Test form validation and submission
6. Check navigation and routing

## Example

```typescript
import { render, screen, waitFor } from '@/__tests__/utils/test-utils'
import { server } from '@/__mocks__/server'
import { http, HttpResponse } from 'msw'

describe('Feature Integration', () => {
  it('should complete the user flow', async () => {
    // 1. Render component
    render(<MyComponent />)

    // 2. Simulate user interaction
    await user.click(screen.getByRole('button'))

    // 3. Wait for API call and response
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument()
    })
  })

  it('should handle errors', () => {
    // Override MSW handler for error scenario
    server.use(
      http.post('/api/endpoint', () => {
        return HttpResponse.json({ error: 'Failed' }, { status: 500 })
      })
    )

    // Test error handling...
  })
})
```

## Best Practices

1. **Test User Flows**: Focus on complete workflows users would perform
2. **Mock External Services**: Use MSW to mock all API calls
3. **Test Error States**: Include tests for errors and edge cases
4. **Keep Tests Independent**: Each test should be able to run in isolation
5. **Use Descriptive Names**: Test names should describe the scenario being tested
