import { render, screen, userEvent, within } from '@/__tests__/utils/test-utils'
import { WeekStrip } from '@/components/site/WeekStrip'
import { SERVICE_TIMES } from '@/lib/constants'

const props = {
  today: '2026-11-03',
  schedule: SERVICE_TIMES,
  events: [],
  exceptions: [],
  mainServiceId: 'sunday-worship',
  timeZone: 'America/Chicago',
}

beforeEach(() => {
  jest.useFakeTimers({ now: new Date('2026-11-03T18:00:00Z'), advanceTimers: true })
})
afterEach(() => jest.useRealTimers())

describe('WeekStrip', () => {
  it('shows the seven days of this week with today marked', () => {
    render(<WeekStrip {...props} />)
    expect(screen.getByRole('heading', { name: 'This week · November 1–7, 2026' })).toBeInTheDocument()
    const days = within(screen.getAllByRole('list')[0]).getAllByRole('listitem').filter((item) => item.parentElement === screen.getAllByRole('list')[0])
    expect(days).toHaveLength(7)
    const today = days.find((day) => day.getAttribute('aria-current') === 'date')!
    expect(today).toHaveTextContent('Tue Nov 3Today')
    expect(today).toHaveTextContent('Tuesday Bible Study7:00–9:00 PM')
  })

  it('says "No meetings" on empty days and draws the main service in navy', () => {
    render(<WeekStrip {...props} />)
    expect(screen.getAllByText('No meetings')).toHaveLength(3) // Wednesday, Thursday, Saturday
    expect(screen.getByText('Sunday Worship Service').closest('li')).toHaveClass('bg-navy-900')
  })

  it('moves a week at a time with the buttons', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<WeekStrip {...props} />)
    await user.click(screen.getByRole('button', { name: 'Next week' }))
    expect(screen.getByRole('heading', { name: 'Week of · November 8–14, 2026' })).toBeInTheDocument()
    expect(screen.queryByText('Today')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Previous week' }))
    await user.click(screen.getByRole('button', { name: 'Previous week' }))
    expect(screen.getByRole('heading', { name: 'Week of · October 25–31, 2026' })).toBeInTheDocument()
  })
})
