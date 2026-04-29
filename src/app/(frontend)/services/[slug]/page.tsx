import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema, getServiceSchema } from '@/components/JsonLd/schemas'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
    where: { slug: { contains: 'service-' } },
  })
  return pages.docs.map(({ slug }) => ({ slug: slug.replace('service-', '') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await queryServicePage(slug)
  if (!page) return { title: 'Not Found' }
  return {
    title: page.title,
    description: page.meta?.description || '',
    alternates: {
      canonical: `/services/${slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const page = await queryServicePage(slug)
  if (!page) notFound()

  const serviceImage =
    typeof page.meta?.image === 'object' && page.meta?.image?.url
      ? page.meta.image.url
      : undefined

  const serviceSchema = getServiceSchema({
    name: page.title,
    description: page.meta?.description || undefined,
    slug,
    image: serviceImage,
  })

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/#services-hub' },
    { name: page.title, url: `/services/${slug}` },
  ])

  return (
    <article>
      <JsonLd id="schema-service" data={serviceSchema} />
      <JsonLd id="schema-breadcrumb" data={breadcrumbSchema} />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 pt-20 pb-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-[#2B7DE9] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#services-hub" className="hover:text-[#2B7DE9] transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-[#1A1A2E] font-medium">{page.title}</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl text-left">
          {page.title}
        </h1>
      </div>

      {/* Render all layout blocks (content, insightTabs, finalCta, etc.) */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <RenderBlocks blocks={page.layout} />
      </div>
    </article>
  )
}

const queryServicePage = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: { slug: { equals: `service-${slug}` } },
  })
  return result.docs?.[0] || null
})
