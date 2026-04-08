import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  const page = await queryPageBySlug({ slug: 'home' })

  if (!page) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Home page not found</h1>
          <p className="mt-2 text-zinc-600">
            Create a page with slug <code className="rounded bg-zinc-100 px-2 py-1 font-mono text-sm">home</code> in the{' '}
            <a href="/admin/collections/pages/create" className="text-[#2B7DE9] underline">admin panel</a>.
          </p>
        </div>
      </div>
    )
  }

  const { hero, layout } = page

  return (
    <article>
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({ slug: 'home' })

  if (page) {
    return generateMeta({ doc: page })
  }

  return {
    title: 'Consilium Risk Advisory Group | Expert Risk Management Services',
    description:
      'Professional risk advisory and management services for UK businesses. Enterprise risk management, regulatory compliance, operational resilience, and more.',
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
