import { notFound, permanentRedirect } from 'next/navigation'
import { getMinistry } from '@/lib/data'

// Ministries are shown as cards on /ministries; there are no separate ministry pages
// (BUILD-PLAN 2.8). Old /ministries/<slug> links, including any shared outside the site,
// redirect permanently to the matching card. Unknown slugs are a real 404.
export default async function MinistryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ministry = await getMinistry(slug)
  if (!ministry) notFound()
  permanentRedirect(`/ministries#${ministry.slug}`)
}
