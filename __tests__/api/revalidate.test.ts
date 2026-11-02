/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { tagForType } from '@/lib/sanity/revalidate'
import { TAGS } from '@/lib/sanity/queries'

const revalidateTag = jest.fn()
jest.mock('next/cache', () => ({ revalidateTag: (...args: unknown[]) => revalidateTag(...args) }))

const parseBody = jest.fn()
jest.mock('next-sanity/webhook', () => ({ parseBody: (...args: unknown[]) => parseBody(...args) }))

const env = process.env as Record<string, string | undefined>

function post(url = 'https://site.example/api/revalidate') {
  return new NextRequest(url, { method: 'POST', body: JSON.stringify({ _type: 'event' }) })
}

async function route() {
  return import('@/app/api/revalidate/route')
}

beforeEach(() => {
  revalidateTag.mockReset()
  parseBody.mockReset()
  env.SANITY_REVALIDATE_SECRET = 'a-long-test-secret-value'
})

describe('tagForType', () => {
  it('maps every document type the site reads to its tag', () => {
    for (const type of Object.keys(TAGS)) expect(tagForType(type)).toBe(type)
  })

  it.each([undefined, null, 42, 'page', 'homeSections', 'constructor', 'toString'])('ignores %p', (type) => {
    expect(tagForType(type)).toBeNull()
  })
})

describe('POST /api/revalidate', () => {
  it('refreshes the tag of the published type when the signature is valid', async () => {
    parseBody.mockResolvedValue({ isValidSignature: true, body: { _type: 'siteSettings' } })
    const { POST } = await route()
    const response = await POST(post())
    expect(response.status).toBe(200)
    expect(revalidateTag).toHaveBeenCalledWith('siteSettings', { expire: 0 })
    expect(parseBody).toHaveBeenCalledWith(expect.anything(), 'a-long-test-secret-value', true)
  })

  it('rejects a bad signature, even with the secret in the query string', async () => {
    parseBody.mockResolvedValue({ isValidSignature: false, body: { _type: 'event' } })
    const { POST } = await route()
    const response = await POST(post('https://site.example/api/revalidate?secret=a-long-test-secret-value'))
    expect(response.status).toBe(401)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('rejects types the site does not read', async () => {
    parseBody.mockResolvedValue({ isValidSignature: true, body: { _type: 'homeSections' } })
    const { POST } = await route()
    expect((await POST(post())).status).toBe(400)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('reports a malformed body', async () => {
    parseBody.mockRejectedValue(new SyntaxError('bad json'))
    const { POST } = await route()
    expect((await POST(post())).status).toBe(400)
  })

  it('answers 503 when the secret is not configured', async () => {
    delete env.SANITY_REVALIDATE_SECRET
    const { POST } = await route()
    expect((await POST(post())).status).toBe(503)
    expect(parseBody).not.toHaveBeenCalled()
  })
})
