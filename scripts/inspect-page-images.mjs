// READ-ONLY — inspect each problematic page to see what images are available.
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config.ts'

const payload = await getPayload({ config: configPromise })

const SLUGS = [
  'services',
  'service-horizon-scanning-scenario-testing',
  'service-risk-information-management-system',
  'service-capability-culture',
  'service-monitoring-reporting',
  'service-controls-assurance',
  'service-core-risk-process',
  'service-risk-appetite',
  'service-third-party-risk-management',
  'service-training-culture',
  'service-project-risk-management',
]

for (const slug of SLUGS) {
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
    pagination: false,
    overrideAccess: true,
  })
  const p = res.docs?.[0]
  if (!p) {
    console.log(`❌ ${slug} — NOT FOUND`)
    continue
  }
  console.log(`\n=== ${slug} (id ${p.id}) — "${p.title}" ===`)
  console.log('  hero.type:', p.hero?.type)
  console.log('  hero.media:', typeof p.hero?.media === 'object' ? `id=${p.hero?.media?.id} url=${p.hero?.media?.url}` : p.hero?.media || 'none')
  console.log('  layout blocks:', (p.layout || []).map((b) => b.blockType).join(', ') || 'none')
  // Look for images in layout blocks
  const layout = p.layout || []
  layout.forEach((block, i) => {
    for (const [k, v] of Object.entries(block)) {
      if (v && typeof v === 'object' && 'mimeType' in v && String(v.mimeType).startsWith('image')) {
        console.log(`  layout[${i}].${k}: id=${v.id} url=${v.url}`)
      }
    }
  })
}

process.exit(0)
