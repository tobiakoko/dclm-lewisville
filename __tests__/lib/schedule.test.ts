import { MODE_LABEL, formatClock, formatTimeRange, formatServiceTime, mainService, serviceStart } from '@/lib/schedule'
import { SERVICE_TIMES } from '@/lib/constants'

describe('schedule formatting', () => {
  it.each([
    ['09:00', '9:00 AM'],
    ['12:00', '12:00 PM'],
    ['00:30', '12:30 AM'],
    ['19:00', '7:00 PM'],
  ])('formats %s as %s', (input, expected) => {
    expect(formatClock(input)).toBe(expected)
  })

  it('writes a shared AM/PM once and a mixed range in full', () => {
    expect(formatTimeRange('19:00', '21:00')).toBe('7:00–9:00 PM')
    expect(formatTimeRange('09:30', '12:00')).toBe('9:30 AM–12:00 PM')
  })

  it('shows only the start when the church has not given an end time', () => {
    expect(formatServiceTime({ start: '09:00', end: null })).toBe('9:00 AM')
  })

  it('rejects malformed times instead of guessing', () => {
    expect(() => formatClock('7pm')).toThrow(/HH:MM/)
    expect(() => formatClock('25:00')).toThrow()
  })

  it('labels every mode', () => {
    expect(MODE_LABEL).toEqual({ 'in-person': 'In person', online: 'Online', both: 'In person and online' })
  })
})

describe('main service', () => {
  it('finds Sunday worship by its key and formats its start', () => {
    const main = mainService(SERVICE_TIMES)
    expect(main?.id).toBe('sunday-worship')
    expect(serviceStart(main!)).toBe('Sunday 9:30 AM')
  })

  it('is null when the schedule has no main service', () => {
    expect(mainService(SERVICE_TIMES.filter((service) => service.id !== 'sunday-worship'))).toBeNull()
  })
})
