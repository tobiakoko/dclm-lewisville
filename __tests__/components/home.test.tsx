import { render, screen, within } from '@/__tests__/utils/test-utils'
import { SITE_CONFIG, SERVICE_TIMES, ZOOM_PLACEHOLDER, mapsUrl } from '@/lib/constants'
import { MINISTRIES, OUTREACH, PASTORS_WELCOME } from '@/lib/content/site'
import { WELCOME_PULL_QUOTE } from '@/lib/content/interface'
import Hero from '@/components/sections/home/Hero'
import { InfoBar } from '@/components/sections/home/InfoBar'
import { QuickInfo } from '@/components/sections/home/QuickInfo'
import { PastorsWelcome } from '@/components/sections/home/PastorsWelcome'
import { LatestMessage } from '@/components/sections/home/LatestMessage'
import MinistriesPreview from '@/components/sections/home/MinistriesPreview'
import { DayTile, ScheduleRow } from '@/components/site/ServiceTimesCard'
import type { Video } from '@/lib/sermons'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => (alt ? <span role="img" aria-label={alt} /> : <span />),
}))

const byId = (id: string) => SERVICE_TIMES.find((service) => service.id === id)!

describe('Hero', () => {
  it('shows the Sunday pill from the schedule, the H1 and both actions', () => {
    render(<Hero config={SITE_CONFIG} schedule={SERVICE_TIMES} hero={{ title: 'God still changes lives.', subtitle: 'Come as you are.' }} />)
    expect(screen.getByText('Sundays at 9:30 AM · In person & online')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'God still changes lives.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Plan your visit' })).toHaveAttribute('href', '/visit')
    expect(screen.getByRole('link', { name: 'Watch online' })).toHaveAttribute('href', SITE_CONFIG.youtube.streams)
    expect(screen.getByRole('region', { name: 'God still changes lives.' })).toHaveAttribute('id', 'home-hero')
  })

  it('leaves the pill out when there is no main service', () => {
    render(<Hero config={SITE_CONFIG} schedule={[]} hero={{ title: 'Title', subtitle: 'Sub' }} />)
    expect(screen.queryByText(/Sundays at/)).not.toBeInTheDocument()
  })
})

describe('InfoBar', () => {
  it('shows worship time, address with directions, and the stream, all from siteSettings', () => {
    render(<InfoBar config={SITE_CONFIG} schedule={SERVICE_TIMES} />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('Sunday worship9:30 AM–12:00 PMPrayer online from 9:00 AM')
    expect(within(items[1]).getByText(SITE_CONFIG.address.street)).toBeInTheDocument()
    expect(within(items[1]).getByRole('link', { name: 'Directions' })).toHaveAttribute('href', mapsUrl(SITE_CONFIG.address))
    expect(within(items[2]).getByRole('link', { name: 'Open stream' })).toHaveAttribute('href', SITE_CONFIG.youtube.streams)
  })

  it('drops the worship cell, not the others, when the main service is missing', () => {
    render(<InfoBar config={SITE_CONFIG} schedule={[]} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.queryByText('Sunday worship')).not.toBeInTheDocument()
  })
})

describe('DayTile and ScheduleRow', () => {
  it('abbreviates the day', () => {
    render(<DayTile day="Tuesday" />)
    expect(screen.getByText('Tue')).toBeInTheDocument()
    expect(screen.getByText('Weekly')).toBeInTheDocument()
  })

  it('shows name, description, time, chips and the join link', () => {
    render(<ScheduleRow service={byId('tuesday-bible-study')} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Tuesday: Tuesday Bible Study' })).toBeInTheDocument()
    expect(screen.getByText('7:00–9:00 PM')).toBeInTheDocument()
    const chips = screen.getByRole('list', { name: 'How to attend' })
    expect(within(chips).getAllByRole('listitem').map((chip) => chip.textContent)).toEqual(['In person', 'Online'])
    expect(screen.getByRole('link', { name: /Join online/ })).toHaveAttribute('href', byId('tuesday-bible-study').joinUrl)
  })

  it('shows the placeholder, never a made-up link, when the join link is missing', () => {
    render(<ScheduleRow service={{ ...byId('monday-prayer'), joinUrl: null }} />)
    expect(screen.getByText(ZOOM_PLACEHOLDER)).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})

describe('QuickInfo', () => {
  it('features the main service with its prayer meeting and lists the rest of the week', () => {
    render(<QuickInfo config={SITE_CONFIG} schedule={SERVICE_TIMES} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Sunday Worship Service' })).toBeInTheDocument()
    expect(screen.getByText('Before the service')).toBeInTheDocument()
    const week = ['Monday Prayer Meeting', 'Tuesday Bible Study', 'Friday Revival Hour']
    for (const name of week) expect(screen.getByRole('heading', { level: 4, name: new RegExp(name) })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 4, name: /Sunday Prayer/ })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All events' })).toHaveAttribute('href', '/events')
  })
})

describe('PastorsWelcome', () => {
  it('shows the full verbatim welcome and the pull-quote as decoration', () => {
    render(<PastorsWelcome welcome={PASTORS_WELCOME} localPastor={SITE_CONFIG.localPastor} />)
    expect(screen.getByRole('region', { name: PASTORS_WELCOME.heading })).toBeInTheDocument()
    expect(screen.getByText(WELCOME_PULL_QUOTE)).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('link', { name: 'What we believe' })).toHaveAttribute('href', '/about#beliefs')
  })

  it('drops the pull-quote when the welcome no longer contains it', () => {
    render(<PastorsWelcome welcome={{ heading: 'Welcome', paragraphs: [['Other words.']] }} localPastor="Pastor" />)
    expect(screen.queryByText(WELCOME_PULL_QUOTE)).not.toBeInTheDocument()
  })
})

describe('LatestMessage', () => {
  const video = (id: string, title: string): Video => ({ id, title, published: '2026-10-25T15:00:00Z', source: 'lewisville' })

  it('shows the featured message and up to three other recent services', () => {
    const recent = [video('aaaaaaaaaaa', 'One'), video('bbbbbbbbbbb', 'Two'), video('ccccccccccc', 'Three'), video('ddddddddddd', 'Four'), video('eeeeeeeeeee', 'Five')]
    render(<LatestMessage featured={{ kind: 'latest', video: recent[0] }} recent={recent} config={SITE_CONFIG} schedule={SERVICE_TIMES} />)
    expect(screen.getByRole('heading', { level: 3, name: 'One' })).toBeInTheDocument()
    expect(screen.getByText('Next live: Sunday, 9:30 AM CT')).toBeInTheDocument()
    const list = screen.getByRole('heading', { name: 'Recent from Lewisville' }).nextElementSibling as HTMLElement
    expect(within(list).getAllByRole('link').map((link) => link.textContent)).toEqual([
      expect.stringContaining('Two'),
      expect.stringContaining('Three'),
      expect.stringContaining('Four'),
    ])
  })

  it('hides the recent list when the feed is empty', () => {
    render(<LatestMessage featured={{ kind: 'hq', video: { ...video('aaaaaaaaaaa', 'HQ'), source: 'hq' } }} recent={null} config={SITE_CONFIG} schedule={SERVICE_TIMES} />)
    expect(screen.getByText('From DCLM Headquarters, Lagos')).toBeInTheDocument()
    expect(screen.queryByText('Recent from Lewisville')).not.toBeInTheDocument()
  })

  it('says honestly when the videos could not be loaded', () => {
    render(<LatestMessage featured={{ kind: 'unavailable' }} recent={null} config={SITE_CONFIG} schedule={SERVICE_TIMES} />)
    expect(screen.getByRole('status')).toHaveTextContent('We couldn’t load the latest videos right now.')
  })
})

describe('MinistriesPreview bento', () => {
  it('links each ministry tile in bento order, with Young Adults as the photo-free tile', () => {
    render(<MinistriesPreview ministries={MINISTRIES} outreach={OUTREACH} />)
    const bento = screen.getAllByRole('list')[0]
    const tiles = within(bento).getAllByRole('link')
    expect(tiles.map((tile) => tile.getAttribute('href'))).toEqual([
      '/ministries#children',
      '/ministries#youth',
      '/ministries#women',
      '/ministries#young-adults',
      '/ministries#men',
      '/ministries#music',
    ])
    expect(tiles[3].querySelector('[role="img"]')).toBeNull()
  })

  it('links every outreach area from the panel', () => {
    render(<MinistriesPreview ministries={MINISTRIES} outreach={OUTREACH} />)
    for (const area of OUTREACH) {
      expect(screen.getByRole('link', { name: area.name })).toHaveAttribute('href', `/ministries#${area.slug}`)
    }
  })
})
