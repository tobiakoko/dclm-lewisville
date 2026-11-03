import { render, screen } from '@/__tests__/utils/test-utils'
import { SermonCard } from '@/components/site/SermonCard'
import { NextLiveCard } from '@/components/site/NextLiveCard'
import { SERVICE_TIMES, SITE_CONFIG } from '@/lib/constants'
import { videoUrl, type Video } from '@/lib/sermons'

jest.mock('next/image', () => ({ __esModule: true, default: () => <span /> }))

const video: Video = { id: 'abcdefghijk', title: 'Sunday Worship Service', published: '2026-10-25T15:00:00Z', source: 'lewisville' }

describe('SermonCard', () => {
  it('shows the title, the church and date, and a Watch link naming the video', () => {
    render(<SermonCard video={video} churchName={SITE_CONFIG.name} />)
    expect(screen.getByRole('heading', { level: 3, name: video.title })).toBeInTheDocument()
    expect(screen.getByText(`${SITE_CONFIG.name} ·`, { exact: false })).toHaveTextContent('October 25, 2026')
    expect(screen.getByRole('link', { name: new RegExp(`^Watch.*${video.title}`) })).toHaveAttribute('href', videoUrl(video.id))
  })

  it('labels a headquarters message as such, never as Lewisville', () => {
    render(<SermonCard video={{ ...video, source: 'hq' }} churchName={SITE_CONFIG.name} />)
    expect(screen.getByText(/DCLM Headquarters ·/)).toBeInTheDocument()
    expect(screen.queryByText(new RegExp(SITE_CONFIG.name))).not.toBeInTheDocument()
  })
})

describe('NextLiveCard', () => {
  it('shows the next stream from the schedule and links to it', () => {
    render(<NextLiveCard schedule={SERVICE_TIMES} streamsUrl={SITE_CONFIG.youtube.streams} />)
    expect(screen.getByText('Next live: Sunday, 9:30 AM CT')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Watch on YouTube' })).toHaveAttribute('href', SITE_CONFIG.youtube.streams)
  })
})
