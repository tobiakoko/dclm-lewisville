import { Radio } from 'lucide-react'
import type { ServiceTime } from '@/lib/constants'
import { nextLiveText } from '@/lib/schedule'
import { buttonVariants } from '@/components/ui/button'
import { IconTile } from '@/components/ui/icon-tile'
import { Card } from '@/components/ui/surface'

/** "Next live: Sunday, 9:30 AM CT" with a link to the stream; shown whether or not YouTube can be read */
export function NextLiveCard({ schedule, streamsUrl }: { schedule: ServiceTime[]; streamsUrl: string }) {
  const text = nextLiveText(schedule)
  return (
    <Card className="flex flex-wrap items-center gap-4 p-5">
      <IconTile>
        <Radio />
      </IconTile>
      {text && <p className="tabular min-w-0 flex-1 font-bold text-navy-900">{text}</p>}
      <a href={streamsUrl} className={buttonVariants({ size: 'sm' })}>
        Watch on YouTube
      </a>
    </Card>
  )
}
