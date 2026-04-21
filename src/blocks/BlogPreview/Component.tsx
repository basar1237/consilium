import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { BlogPreviewBlock } from '@/payload-types'

function extractText(nodes: any[]): string {
  let text = ''
  for (const node of nodes) {
    if (node.text) text += node.text + ' '
    if (node.children) text += extractText(node.children)
  }
  return text
}

function getReadingTime(content: any): number {
  if (!content?.root?.children) return 1
  const text = extractText(content.root.children)
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export const BlogPreviewBlockComponent: React.FC<BlogPreviewBlock> = async ({
  title,
  postCount,
  viewAllLabel,
}) => {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: postCount || 3,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })

  return (
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">{title}</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.docs.map((post) => {
            const readTime = getReadingTime(post.content)
            const date = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : null

            return (
              <article
                key={post.id}
                className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-[#1A1A2E] line-clamp-2">
                    <Link
                      href={`/perspectives/${post.slug}`}
                      className="transition-colors hover:text-[#2B7DE9]"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  {post.meta?.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                      {post.meta.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                    <Link
                      href={`/perspectives/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#2B7DE9] transition-colors hover:text-blue-700"
                    >
                      Read More →
                    </Link>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      {readTime} min read
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {viewAllLabel && (
          <div className="mt-12 text-center">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 font-semibold text-[#2B7DE9] transition-colors hover:text-blue-700"
            >
              {viewAllLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
