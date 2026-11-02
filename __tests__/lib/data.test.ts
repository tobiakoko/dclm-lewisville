/**
 * @jest-environment node
 */
import { SITE_CONFIG, SERVICE_TIMES } from '@/lib/constants'
import { toPortableText } from '@/lib/content/portable-text'
import { PASTORS_WELCOME } from '@/lib/content/site'

jest.mock('server-only', () => ({}))
const sanityFetch = jest.fn()
jest.mock('@/lib/sanity/fetch', () => ({ sanityFetch: (...args: unknown[]) => sanityFetch(...args) }))

const env = process.env as Record<string, string | undefined>
const originalNodeEnv = env.NODE_ENV

async function load() {
  let data: typeof import('@/lib/data') | undefined
  jest.isolateModules(() => {
    data = jest.requireActual<typeof import('@/lib/data')>('@/lib/data')
  })
  return data!
}

afterEach(() => {
  sanityFetch.mockReset()
  env.NODE_ENV = originalNodeEnv
  delete env.SANITY_DEV_FALLBACK
})

describe('data layer', () => {
  it('maps Church details from Sanity onto the site’s config and schedule', async () => {
    sanityFetch.mockResolvedValue({
      ...SITE_CONFIG,
      name: 'Test Church',
      timeZone: 'America/Chicago',
      schedule: SERVICE_TIMES.map(({ id, ...rest }) => ({ id, ...rest })),
      scheduleExceptions: null,
      socialMedia: null,
      otherLocations: null,
    })
    const { getSiteData } = await load()
    const data = await getSiteData()
    expect(data.config.name).toBe('Test Church')
    expect(data.config.socialMedia).toEqual({ facebook: null, instagram: null })
    expect(data.schedule.map((s) => s.id)).toEqual(SERVICE_TIMES.map((s) => s.id))
    expect(sanityFetch).toHaveBeenCalledWith(expect.objectContaining({ tags: ['siteSettings'] }))
  })

  it('turns Portable Text back into the same paragraphs the components render', async () => {
    sanityFetch.mockResolvedValue({
      page: {
        heroTitle: 'Come as you are',
        heroSubtitle: 'Sentence',
        whatToExpect: [],
        welcomeHeading: PASTORS_WELCOME.heading,
        welcome: toPortableText(PASTORS_WELCOME.paragraphs),
        verse: { text: 'v', reference: 'r' },
      },
      testimony: null,
    })
    const { getHomeContent } = await load()
    const home = await getHomeContent()
    expect(home.welcome.paragraphs).toEqual(PASTORS_WELCOME.paragraphs)
    expect(home.testimony).toBeNull()
  })

  it('in production, a missing document is an error, never fallback content', async () => {
    env.NODE_ENV = 'production'
    sanityFetch.mockResolvedValue(null)
    const { getSiteData } = await load()
    await expect(getSiteData()).rejects.toThrow(/Sanity content missing: Church details/)
  })

  it('in production, a Sanity failure is an error', async () => {
    env.NODE_ENV = 'production'
    sanityFetch.mockRejectedValue(new Error('network down'))
    const { getSiteData } = await load()
    await expect(getSiteData()).rejects.toThrow('network down')
  })

  it('in development (or with SANITY_DEV_FALLBACK for test builds), falls back to the seed content', async () => {
    sanityFetch.mockResolvedValue(null)
    const { getSiteData } = await load()
    expect((await getSiteData()).config).toEqual(SITE_CONFIG)

    env.NODE_ENV = 'production'
    env.SANITY_DEV_FALLBACK = 'true'
    const again = await load()
    expect((await again.getSiteData()).schedule).toEqual(SERVICE_TIMES)
  })

  it('never returns a past event as upcoming, even if the query lets one through', async () => {
    sanityFetch.mockResolvedValue([
      { id: 'past', title: 'Past', start: '2026-01-24T14:00:00Z', end: '2026-01-24T16:00:00Z', location: 'x', mode: 'in-person', registrationUrl: null },
      { id: 'next', title: 'Next', start: '2026-12-06T15:30:00Z', end: null, location: 'x', mode: 'both', registrationUrl: null },
    ])
    const { getUpcomingEvents } = await load()
    const events = await getUpcomingEvents(new Date('2026-11-02T12:00:00Z'))
    expect(events.map((e) => e.id)).toEqual(['next'])
  })
})
