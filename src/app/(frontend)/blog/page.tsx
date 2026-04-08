import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Blog & Insights | Consilium Risk Advisory Group',
  description:
    'Expert insights on risk management, compliance, operational resilience, and more from the Consilium team.',
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 50,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl">
            Insights &amp; Articles
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Expert perspectives on risk management, compliance, and governance
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.docs.map((post) => {
            const categoryNames =
              post.categories
                ?.map((cat) => (typeof cat === 'object' ? cat.title : ''))
                .filter(Boolean)
                .join(', ') || 'Insight'

            return (
              <article
                key={post.id}
                className="flex flex-col rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-block self-start rounded-full bg-[#2B7DE9]/10 px-3 py-1 text-xs font-medium text-[#2B7DE9]">
                    {categoryNames}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold text-[#1A1A2E] line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#2B7DE9] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.meta?.description && (
                    <p className="mt-2 flex-1 text-zinc-600 text-sm leading-relaxed line-clamp-3">
                      {post.meta.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm text-zinc-500">
                    <span>
                      {post.populatedAuthors?.map((a) => a.name).join(', ') || 'Consilium Team'}
                    </span>
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#2B7DE9] hover:text-blue-700 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {posts.docs.length === 0 && (
          <p className="mt-14 text-center text-zinc-500">
            No articles published yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  )
}
