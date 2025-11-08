import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import PageRenderer from '@/components/PageRenderer'

// Query for dynamic pages
const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    sections[] {
      _type,
      _key,
      ...,
      "backgroundImage": backgroundImage.asset,
      "image": image.asset
    },
    seo
  }
`

export async function generateStaticParams() {
  const pages = await client.fetch(
    groq`*[_type == "page"] { "slug": slug.current }`
  )

  return pages.map((page: { slug: string }) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await client.fetch(pageQuery, { slug: params.slug })

  if (!page) {
    return {}
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription,
      images: page.seo?.openGraphImage ? [page.seo.openGraphImage] : [],
    },
  }
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await client.fetch(pageQuery, { slug: params.slug })

  if (!page) {
    notFound()
  }

  return <PageRenderer sections={page.sections || []} />
}
