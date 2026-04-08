import path from 'path'

import { APIError } from 'payload'

/**
 * S3 uyumlu depolarda (Supabase Storage S3 API vb.) object key olarak güvenli ASCII dosya adı.
 * @payloadcms/storage-s3 patch içindeki mantıkla senkron tutulmalı.
 */
export function toAsciiUploadFilename(sanitized: string): string {
  const rawExt = path.extname(sanitized) || ''
  const extPart = rawExt ? rawExt.toLowerCase().replace(/[^a-z0-9.]/g, '') : ''
  let base = path.basename(sanitized, rawExt)
  base = base
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'G')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'U')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C')
  base = base.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  base = base
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
  const out = `${base || 'file'}${extPart}`
  if (!out) {
    throw new APIError('Invalid filename', 400)
  }
  return out
}
