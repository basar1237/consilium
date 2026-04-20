import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import RichText from '@/components/RichText'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return posts.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await queryPostBySlug(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} | Consilium Perspectives`,
    description: post.meta?.description || '',
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await queryPostBySlug(slug)
  if (!post) notFound()

  const categoryNames =
    post.categories
      ?.map((cat) => (typeof cat === 'object' ? cat.title : ''))
      .filter(Boolean)
      .join(', ') || 'Insight'

  return (
    <article className="py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Link
          href="/perspectives"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#2B7DE9] hover:text-blue-700 transition-colors mb-8"
        >
          ← Back to Perspectives
        </Link>

        <span className="inline-block rounded-full bg-[#2B7DE9]/10 px-3 py-1 text-xs font-medium text-[#2B7DE9]">
          {categoryNames}
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
          <span>
            By{' '}
            {post.authorName ||
              post.populatedAuthors?.map((a) => a.name).join(', ') ||
              'Consilium Team'}
          </span>
          {post.publishedAt && (
            <>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </>
          )}
        </div>

        <div className="mt-10">
          <RichText className="max-w-none" data={post.content} enableGutter={false} />
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-8">
          <Link
            href="/perspectives"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#2B7DE9] hover:text-blue-700 transition-colors"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </article>
  )
}

const queryPostBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: {
      slug: { equals: slug },
    },
  })
  return result.docs?.[0] || null
})
