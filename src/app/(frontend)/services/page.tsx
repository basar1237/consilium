import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/components/JsonLd/schemas'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Services',
  description:
    "Consilium's full range of UK risk advisory services — ISO 31000, compliance, operational resilience, third-party risk, and governance consulting.",
  alternates: {
    canonical: '/services',
  },
}

const MIRRORED_BLOCK_TYPES = new Set(['quickServiceHub', 'enterpriseShowcase'])

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const home = await payload.find({
    collection: 'pages',
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: { slug: { equals: 'home' } },
  })

  const homeLayout = home.docs?.[0]?.layout ?? []
  const blocks = homeLayout.filter((b) => MIRRORED_BLOCK_TYPES.has(b.blockType))

  const siteUrl = getServerSideURL()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ])

  const serviceItems = blocks
    .filter((b) => b.blockType === 'quickServiceHub')
    .flatMap((b) => (b as { services?: { slug?: string; title?: string }[] }).services ?? [])

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Consilium Risk Advisory Services',
    itemListElement: serviceItems.map((service, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: service.title,
      url: `${siteUrl}/services/${service.slug}`,
    })),
  }

  return (
    <article>
      <JsonLd id="schema-breadcrumb" data={breadcrumbSchema} />
      <JsonLd id="schema-itemlist" data={itemListSchema} />

      <section className="pt-16 pb-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-zinc-600">
            Comprehensive risk advisory solutions tailored to your organisation
          </p>
        </div>
      </section>

      {blocks.length > 0 ? (
        <RenderBlocks blocks={blocks} />
      ) : (
        <p className="py-20 text-center text-zinc-500">
          No services available yet. Check back soon.
        </p>
      )}
    </article>
  )
}
