import type { Metadata } from 'next'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import RichText from '@/components/RichText'

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
    title: `${page.title} | Consilium Risk Advisory`,
    description: page.meta?.description || '',
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const page = await queryServicePage(slug)
  if (!page) notFound()

  // Extract content from the first content block
  const contentBlock = page.layout?.find(
    (b: { blockType: string }) => b.blockType === 'content',
  ) as { columns?: { richText?: DefaultTypedEditorState }[] } | undefined
  const richTextData = contentBlock?.columns?.[0]?.richText

  // Extract CTA block
  const ctaBlock = page.layout?.find(
    (b: { blockType: string }) => b.blockType === 'finalCta',
  ) as { title?: string; description?: string; buttonLabel?: string; buttonHref?: string } | undefined

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Breadcrumb */}
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

        <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl">
          {page.title}
        </h1>

        {/* Rich text content (description + features list) */}
        {richTextData && (
          <div className="mt-8">
            <RichText
              className="prose prose-lg prose-zinc max-w-none prose-headings:text-[#1A1A2E] prose-a:text-[#2B7DE9]"
              data={richTextData}
              enableGutter={false}
            />
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#2B7DE9]/5 p-8 border border-[#2B7DE9]/20">
          <h3 className="text-xl font-bold text-[#1A1A2E]">
            {ctaBlock?.title || `Ready to discuss ${page.title.toLowerCase()}?`}
          </h3>
          <p className="mt-2 text-zinc-600">
            {ctaBlock?.description ||
              'Contact us for a no-obligation consultation with one of our senior advisors.'}
          </p>
          <div className="mt-6">
            <Link
              href={ctaBlock?.buttonHref || '/book-consultation'}
              className="inline-block rounded-lg bg-[#2B7DE9] px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              {ctaBlock?.buttonLabel || 'Book a Consultation'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const queryServicePage = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: { slug: { equals: `service-${slug}` } },
  })
  return result.docs?.[0] || null
})
