# Test Fixtures

This directory contains test fixtures for various scenarios in the application.

## Structure

- **api-responses/**: Mock API response data
- **forms/**: Form submission test data
- **sanity/**: Sanity CMS data fixtures
- **users/**: User-related test data

## Usage

Import fixtures in your tests:

```typescript
import { successfulContactSubmission } from '@/__tests__/fixtures/forms'
import { featuredSermons } from '@/__tests__/fixtures/sanity/sermons'
```

## Adding New Fixtures

When adding new fixtures:
1. Create a subdirectory if needed
2. Export typed data structures
3. Document the fixture purpose
4. Keep fixtures realistic but minimal
