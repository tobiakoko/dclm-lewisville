import { SITE_CONFIG } from '@/lib/constants'

export function LastUpdated({ date }: { date: string }) {
  const formatted = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: SITE_CONFIG.timeZone }).format(
    new Date(`${date}T12:00:00Z`)
  )
  return (
    <p className="text-ink-muted">
      Last updated: <time dateTime={date}>{formatted}</time>
    </p>
  )
}
