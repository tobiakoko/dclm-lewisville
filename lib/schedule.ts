import type { ServiceMode, ServiceTime } from '@/lib/constants'

export const MODE_LABEL: Record<ServiceMode, string> = {
  'in-person': 'In person',
  online: 'Online',
  both: 'In person and online',
}

function parseClock(value: string): { hour: number; minute: number } {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value)
  if (!match) throw new Error(`Invalid time "${value}"; expected 24-hour HH:MM`)
  return { hour: Number(match[1]), minute: Number(match[2]) }
}

function meridiem(hour: number): 'AM' | 'PM' {
  return hour < 12 ? 'AM' : 'PM'
}

function clock(hour: number, minute: number): string {
  const h = hour % 12 === 0 ? 12 : hour % 12
  return `${h}:${String(minute).padStart(2, '0')}`
}

/** "19:00" → "7:00 PM" */
export function formatClock(value: string): string {
  const { hour, minute } = parseClock(value)
  return `${clock(hour, minute)} ${meridiem(hour)}`
}

/**
 * "9:30 AM–12:00 PM", "7:00–9:00 PM" (shared AM/PM written once), or "9:00 AM" when the
 * church hasn't given an end time.
 */
export function formatTimeRange(start: string, end: string | null): string {
  if (!end) return formatClock(start)
  const s = parseClock(start)
  const e = parseClock(end)
  if (meridiem(s.hour) === meridiem(e.hour)) {
    return `${clock(s.hour, s.minute)}–${clock(e.hour, e.minute)} ${meridiem(e.hour)}`
  }
  return `${formatClock(start)}–${formatClock(end)}`
}

export function formatServiceTime(service: Pick<ServiceTime, 'start' | 'end'>): string {
  return formatTimeRange(service.start, service.end)
}

/** Key of the main weekly service in siteSettings (RUNBOOK: "Don't change the Key") */
export const MAIN_SERVICE_ID = 'sunday-worship'

/** The main service, whose time the hero, info bar, header drawer and footer show */
export function mainService(schedule: ServiceTime[]): ServiceTime | null {
  return schedule.find((service) => service.id === MAIN_SERVICE_ID) ?? null
}

/** "Sunday 9:30 AM", the start only */
export function serviceStart(service: Pick<ServiceTime, 'day' | 'start'>): string {
  return `${service.day} ${formatClock(service.start)}`
}

/** "Next live: Sunday, 9:30 AM CT", from the main service; null without one */
export function nextLiveText(schedule: ServiceTime[]): string | null {
  const main = mainService(schedule)
  return main ? `Next live: ${main.day}, ${formatClock(main.start)} CT` : null
}
