import { addDays, buildWeek, dateInZone, shortDate, weekLabel, weekStart } from '@/lib/week'
import { SERVICE_TIMES } from '@/lib/constants'

const TZ = 'America/Chicago'

describe('week dates', () => {
  it('reads today in the church’s time zone, not UTC', () => {
    // 03:00 UTC on 3 November is still 2 November in Lewisville
    expect(dateInZone(new Date('2026-11-03T03:00:00Z'), TZ)).toBe('2026-11-02')
  })

  it('starts weeks on Sunday and crosses months', () => {
    expect(weekStart('2026-11-04')).toBe('2026-11-01')
    expect(weekStart('2026-11-01')).toBe('2026-11-01')
    expect(addDays('2026-11-29', 7)).toBe('2026-12-06')
    expect(shortDate('2026-11-03')).toBe('Nov 3')
  })

  it('labels a week', () => {
    expect(weekLabel('2026-11-01')).toBe('November 1–7, 2026')
    expect(weekLabel('2026-11-29')).toBe('November 29 – December 5, 2026')
  })
})

describe('buildWeek', () => {
  const week = buildWeek({
    start: '2026-11-01',
    schedule: SERVICE_TIMES,
    events: [{ id: 'harvest', title: 'Harvest Service', start: '2026-11-07T15:00:00Z', location: 'At the church', mode: 'both' }],
    exceptions: [{ date: '2026-11-06', meeting: 'friday-revival-hour', cancelled: true, note: 'No meeting this week' }],
    mainServiceId: 'sunday-worship',
    timeZone: TZ,
  })

  it('places each weekly meeting on its day, in time order, with the main service marked', () => {
    expect(week.map((day) => day.weekday)).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    expect(week[0].items.map((item) => [item.name, item.main])).toEqual([
      ['Sunday Prayer', false],
      ['Sunday Worship Service', true],
    ])
    expect(week[3].items).toEqual([])
  })

  it('adds special events on their Central date and schedule changes on the meeting', () => {
    expect(week[6].items).toEqual([{ key: 'harvest', name: 'Harvest Service', time: '9:00 AM' }])
    expect(week[5].items[0]).toMatchObject({ name: 'Friday Revival Hour', cancelled: true, note: 'No meeting this week' })
  })
})
