import { createClient } from './@sanity/client'

// Re-export the mock Sanity client
export { createClient }

// Mock groq template literal function
export const groq = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] || '')
  }, '')
}

// Mock sanityFetch for next-sanity integration
export const sanityFetch = jest.fn(async ({ query, params }: { query: string; params?: Record<string, unknown> }) => {
  const client = createClient()
  return client.fetch(query, params)
})
