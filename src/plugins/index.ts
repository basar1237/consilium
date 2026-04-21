import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Consilium Risk Advisory Group`
    : 'Consilium Risk Advisory Group | UK Risk Management Experts'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

const s3Configured =
  Boolean(process.env.S3_BUCKET) &&
  Boolean(process.env.S3_ACCESS_KEY_ID) &&
  Boolean(process.env.S3_SECRET_ACCESS_KEY)

/** Supabase S3 API ACL header'ını desteklemez; erişim bucket policy + "Public bucket" ile */
const isSupabaseS3 = Boolean(process.env.S3_ENDPOINT?.includes('supabase.co'))

const s3Region =
  process.env.S3_REGION || (isSupabaseS3 ? 'eu-central-1' : 'eu-west-2')

const s3Plugin: Plugin[] = s3Configured
  ? [
      s3Storage({
        ...(!isSupabaseS3 ? { acl: 'public-read' as const } : {}),
        bucket: process.env.S3_BUCKET as string,
        collections: {
          media: true,
        },
        // Vercel sunucu gövdesi limiti (~4.5MB) için doğrudan tarayıcıdan S3'e yükleme
        clientUploads: true,
        config: {
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
          },
          region: s3Region,
          ...(process.env.S3_ENDPOINT
            ? {
                endpoint: process.env.S3_ENDPOINT,
                forcePathStyle: true,
                // AWS SDK ≥3.729 varsayılan CRC32; Supabase/R2/MinIO 400 döner — presigned URL'de de checksum query oluşmasın
                requestChecksumCalculation: 'WHEN_REQUIRED' as const,
                responseChecksumValidation: 'WHEN_REQUIRED' as const,
              }
            : {}),
        },
      }),
    ]
  : []

export const plugins: Plugin[] = [
  ...s3Plugin,
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
