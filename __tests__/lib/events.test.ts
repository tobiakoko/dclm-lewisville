import { EVENTS_EMPTY_STATE, formatEventStart, upcomingEvents, type ChurchEvent } from '@/lib/events'

const NOW = new Date('2026-11-02T12:00:00-06:00')

function event(id: string, start: string, end?: string): ChurchEvent {
  return { id, title: id, start, end, location: 'Somewhere', mode: 'in-person' }
}

describe('upcomingEvents', () => {
  it('never returns a past event as upcoming', () => {
    const events = [
      event('jan', '2026-01-24T14:00:00-06:00', '2026-01-24T16:00:00-06:00'),
      event('feb', '2026-02-12T18:00:00-06:00'),
      event('mar', '2026-03-05T19:00:00-06:00', '2026-03-05T21:00:00-06:00'),
      event('apr', '2026-04-10T09:00:00-05:00', '2026-04-10T14:00:00-05:00'),
    ]
    expect(upcomingEvents(events, NOW)).toEqual([])
  })

  it('keeps future and in-progress events, soonest first', () => {
    const events = [
      event('later', '2026-12-06T09:30:00-06:00'),
      event('ongoing', '2026-11-02T09:00:00-06:00', '2026-11-02T15:00:00-06:00'),
      event('ended-today', '2026-11-02T08:00:00-06:00', '2026-11-02T10:00:00-06:00'),
    ]
    expect(upcomingEvents(events, NOW).map((e) => e.id)).toEqual(['ongoing', 'later'])
  })

  it('drops events with unreadable dates', () => {
    expect(upcomingEvents([event('bad', 'next Sunday')], NOW)).toEqual([])
  })

  it('formats dates in Central Time', () => {
    expect(formatEventStart({ start: '2026-12-06T15:30:00Z' }, 'America/Chicago')).toBe('Sunday, December 6, 2026, 9:30 AM')
  })

  it('uses the approved empty-state sentence', () => {
    expect(EVENTS_EMPTY_STATE).toBe('No special events right now. Join us Sunday at 9:30 AM.')
  })
})
