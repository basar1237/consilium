import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const postsPath = `/posts/${doc.slug}`
      const blogPath = `/blog/${doc.slug}`

      payload.logger.info(`Revalidating post at paths: ${postsPath}, ${blogPath}, /blog`)

      revalidatePath(postsPath)
      revalidatePath(blogPath)
      revalidatePath('/blog')
      revalidateTag('posts-sitemap', 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPostsPath = `/posts/${previousDoc.slug}`
      const oldBlogPath = `/blog/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at paths: ${oldPostsPath}, ${oldBlogPath}, /blog`)

      revalidatePath(oldPostsPath)
      revalidatePath(oldBlogPath)
      revalidatePath('/blog')
      revalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/posts/${doc?.slug}`)
    revalidatePath(`/blog/${doc?.slug}`)
    revalidatePath('/blog')
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}
