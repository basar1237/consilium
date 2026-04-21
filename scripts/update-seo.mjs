// SAFE UPDATE SCRIPT — updates ONLY meta.title and meta.description on specific pages.
// Uses Payload Local API. Does NOT touch:
//   - title, slug, hero, layout, content
//   - meta.image
//   - any other field
//   - any other page/post
//
// Preserves existing values by reading the current meta object first and merging.

import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config.ts'

const SEO_UPDATES = [
  {
    slug: 'services',
    metaTitle: 'Risk Advisory Services | Consilium Risk Advisory Group',
    metaDescription:
      'Explore our full range of risk advisory services — enterprise risk, operational resilience, compliance, cyber risk, and more. Tailored for UK organisations.',
  },
  {
    slug: 'service-horizon-scanning-scenario-testing',
    metaTitle: 'Horizon Scanning & Scenario Testing | Consilium Risk Advisory',
    metaDescription:
      'Anticipate emerging risks and stress-test your strategy with expert horizon scanning and scenario analysis services for UK organisations.',
  },
  {
    slug: 'service-risk-information-management-system',
    metaTitle: 'Risk Information Management Systems | Consilium Risk Advisory',
    metaDescription:
      'Design and implement risk registers and information management systems that give your board clear, actionable risk insight.',
  },
  {
    slug: 'service-capability-culture',
    metaTitle: 'Risk Capability & Culture | Consilium Risk Advisory',
    metaDescription:
      'Embed risk-aware capability and culture across your organisation. Practical advisory services to strengthen people, skills, and behaviours.',
  },
  {
    slug: 'service-monitoring-reporting',
    metaTitle: 'Risk Monitoring & Reporting | Consilium Risk Advisory',
    metaDescription:
      'Transparent, decision-ready risk monitoring and reporting for boards, executives, and regulators. Tailored frameworks for UK organisations.',
  },
  {
    slug: 'service-controls-assurance',
    metaTitle: 'Controls & Assurance | Consilium Risk Advisory',
    metaDescription:
      'Evaluate and strengthen the controls that manage your most significant risks, with independent assurance that builds confidence.',
  },
  {
    slug: 'service-core-risk-process',
    metaTitle: 'Core ERM Process | Consilium Risk Advisory',
    metaDescription:
      'Design and embed a practical, end-to-end enterprise risk management process aligned with ISO 31000 and tailored to your organisation.',
  },
  {
    slug: 'service-risk-appetite',
    metaTitle: 'Risk Appetite Frameworks | Consilium Risk Advisory',
    metaDescription:
      'Define, articulate, and operationalise risk appetite so your organisation takes the right risks — with board-level clarity and control.',
  },
  {
    slug: 'service-third-party-risk-management',
    metaTitle: 'Third-Party Risk Management | Consilium Risk Advisory',
    metaDescription:
      'Identify, assess, and monitor supplier and vendor risk with a proportionate, regulator-ready third-party risk management framework.',
  },
  {
    slug: 'service-training-culture',
    metaTitle: 'Risk Training & Culture | Consilium Risk Advisory',
    metaDescription:
      'Bespoke risk management training and culture change programmes that build lasting capability across your teams, boards, and committees.',
  },
  {
    slug: 'service-project-risk-management',
    metaTitle: 'Project Risk Management | Consilium Risk Advisory',
    metaDescription:
      'Deliver major projects and transformations with confidence through structured, pragmatic project risk management advisory services.',
  },
]

const DRY_RUN = process.env.DRY_RUN === '1' || process.argv.includes('--dry')

const payload = await getPayload({ config: configPromise })

let updatedCount = 0
let skippedCount = 0
const errors = []

console.log(DRY_RUN ? '🔎 DRY RUN — no writes will occur\n' : '🚀 EXECUTING — updates will be written\n')

for (const update of SEO_UPDATES) {
  try {
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: update.slug } },
      depth: 0,
      limit: 1,
      pagination: false,
      overrideAccess: true,
    })
    const page = res.docs?.[0]
    if (!page) {
      console.log(`❌ NOT FOUND: ${update.slug}`)
      skippedCount++
      continue
    }

    const currentMeta = page.meta || {}
    const newMeta = {
      ...currentMeta,
      title: update.metaTitle,
      description: update.metaDescription,
    }

    console.log(`📝 ${update.slug} (id ${page.id})`)
    console.log(`   BEFORE title: ${currentMeta.title || '(empty)'}`)
    console.log(`   AFTER  title: ${newMeta.title}`)
    console.log(`   BEFORE desc:  ${currentMeta.description || '(empty)'}`)
    console.log(`   AFTER  desc:  ${newMeta.description}`)

    if (!DRY_RUN) {
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: { meta: newMeta },
        depth: 0,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      console.log('   ✅ UPDATED\n')
    } else {
      console.log('   (dry run — not written)\n')
    }
    updatedCount++
  } catch (err) {
    console.error(`❌ ERROR on ${update.slug}:`, err.message)
    errors.push({ slug: update.slug, error: err.message })
  }
}

console.log('\n========== SUMMARY ==========')
console.log(`${DRY_RUN ? 'Would update' : 'Updated'}: ${updatedCount}`)
console.log(`Skipped: ${skippedCount}`)
console.log(`Errors: ${errors.length}`)
if (errors.length) console.log(JSON.stringify(errors, null, 2))

process.exit(errors.length ? 1 : 0)
