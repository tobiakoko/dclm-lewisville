/**
 * @jest-environment node
 */
import { SITE_CONFIG } from '@/lib/constants'

const isLiveNow = jest.fn()
jest.mock('@/lib/sermons-data', () => ({ isLiveNow: (...args: unknown[]) => isLiveNow(...args) }))
jest.mock('@/lib/data', () => ({ getSiteData: async () => ({ config: SITE_CONFIG, schedule: [] }) }))

async function get() {
  const { GET } = await import('@/app/api/live/route')
  return GET()
}

beforeEach(() => isLiveNow.mockReset())

describe('GET /api/live', () => {
  it.each([true, false])('reports live: %s for the church channel, cached for a minute', async (live) => {
    isLiveNow.mockResolvedValue(live)
    const response = await get()
    expect(isLiveNow).toHaveBeenCalledWith(SITE_CONFIG.youtube.channelId)
    expect(await response.json()).toEqual({ live })
    expect(response.headers.get('cache-control')).toBe('public, s-maxage=60')
  })
})
