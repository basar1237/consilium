// READ-ONLY SCRIPT — audits Pages and Posts SEO fields.
// Does NOT write anything. Safe to run anytime.

import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config.ts'

const payload = await getPayload({ config: configPromise })

function truncate(str, n = 80) {
  if (!str) return '(empty)'
  const s = String(str).replace(/\s+/g, ' ').trim()
  return s.length > n ? s.slice(0, n) + '…' : s
}

console.log('\n========== PAGES ==========')
const pages = await payload.find({
  collection: 'pages',
  limit: 500,
  depth: 0,
  pagination: false,
  overrideAccess: true,
})

pages.docs.forEach((p) => {
  const hasTitle = Boolean(p.meta?.title)
  const hasDesc = Boolean(p.meta?.description)
  const hasImage = Boolean(p.meta?.image)
  const flag = hasTitle && hasDesc ? '✅' : '⚠️ '
  console.log(`${flag} [${p.id}] slug="${p.slug}" | title="${truncate(p.title, 40)}"`)
  console.log(`     meta.title:       ${hasTitle ? '✅ ' + truncate(p.meta.title) : '❌ EMPTY'}`)
  console.log(`     meta.description: ${hasDesc ? '✅ ' + truncate(p.meta.description) : '❌ EMPTY'}`)
  console.log(`     meta.image:       ${hasImage ? '✅' : '❌ EMPTY'}`)
})

console.log('\n========== POSTS ==========')
const posts = await payload.find({
  collection: 'posts',
  limit: 500,
  depth: 0,
  pagination: false,
  overrideAccess: true,
})

posts.docs.forEach((p) => {
  const hasTitle = Boolean(p.meta?.title)
  const hasDesc = Boolean(p.meta?.description)
  const hasImage = Boolean(p.meta?.image)
  const flag = hasTitle && hasDesc ? '✅' : '⚠️ '
  console.log(`${flag} [${p.id}] slug="${p.slug}" | title="${truncate(p.title, 40)}"`)
  console.log(`     meta.title:       ${hasTitle ? '✅ ' + truncate(p.meta.title) : '❌ EMPTY'}`)
  console.log(`     meta.description: ${hasDesc ? '✅ ' + truncate(p.meta.description) : '❌ EMPTY'}`)
  console.log(`     meta.image:       ${hasImage ? '✅' : '❌ EMPTY'}`)
})

console.log(`\nTotals: ${pages.totalDocs} pages, ${posts.totalDocs} posts`)
process.exit(0)
