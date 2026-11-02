# Tests

Jest unit and integration tests (`npm test`). Playwright end-to-end and axe checks live in `e2e/` (`npm run test:e2e`).

```
__tests__/
├── api/           API route outcomes (contact)
├── components/    UI primitives and interactive components
├── content/       Verbatim and approved copy match docs/build/SITE-CONTENT.md
├── integration/   Forms wired to their API (fetch mocked)
├── lib/           Pure helpers (schedule, events, facts, structured data)
└── utils/
    └── test-utils.tsx   render() with the site's providers and userEvent
```

Rules (from CLAUDE.md):

- Every state of a form, API route or menu gets a unit test.
- Tests must assert. No `if (count > 0)` guards or conditional skips.
- Tests never hard-code church facts; import them from `lib/constants.ts` or `lib/content/`. Use obviously fictional data (`example.com` addresses) for form input.
