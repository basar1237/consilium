/**
 * Patch script: updates existing CMS pages to use new block types
 * - Contact page → contactSection block (with form)
 * - Book Consultation → consultationForm block (with form)
 * - About page → companyOverview block
 * - Header → Services link to /#services-hub
 *
 * Usage: node seed-patch.mjs
 */

const BASE = 'http://localhost:3000/api'

function text(t, format = 0) {
  return { type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 }
}

function paragraph(...children) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    children,
    direction: 'ltr',
    textFormat: 0,
    textStyle: '',
  }
}

function richText(...nodes) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: nodes,
      direction: 'ltr',
    },
  }
}

async function api(path, data, token, method = 'POST') {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `JWT ${token}`
  const res = await fetch(`${BASE}${path}`, { method, headers, body: JSON.stringify(data) })
  return res.json()
}

async function apiGet(path, token) {
  const headers = {}
  if (token) headers['Authorization'] = `JWT ${token}`
  const res = await fetch(`${BASE}${path}`, { headers })
  return res.json()
}

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Consilium - Patch: Update pages with new blocks')
  console.log('═══════════════════════════════════════════════════\n')

  // Login
  console.log('Logging in...')
  const login = await api('/users/login', {
    email: 'basaryldrm1237@gmail.com',
    password: '1139basaR.',
  })
  const token = login.token
  if (!token) {
    console.error('Login failed:', JSON.stringify(login))
    process.exit(1)
  }
  console.log('Logged in\n')

  // Find pages by slug
  async function findPage(slug) {
    const res = await apiGet(`/pages?where[slug][equals]=${slug}&limit=1`, token)
    return res.docs?.[0] || null
  }

  // 1. Patch CONTACT page
  console.log('1. Patching Contact page...')
  const contactPage = await findPage('contact')
  if (contactPage) {
    await api(`/pages/${contactPage.id}`, {
      layout: [
        {
          blockType: 'contactSection',
          title: 'Contact Us',
          subtitle: "We'd love to hear from you. Reach out to discuss your risk management needs.",
          formTitle: 'Send Us a Message',
          contactInfoTitle: 'Contact Information',
          contactDetails: [
            { label: 'Email', value: 'basaryldrm1237@gmail.com', href: 'mailto:basaryldrm1237@gmail.com' },
            { label: 'Address', value: 'London, United Kingdom' },
            { label: 'Working Hours', value: 'Monday – Friday, 9:00 AM – 5:30 PM GMT' },
          ],
          ctaTitle: 'Ready to Get Started?',
          ctaDescription: 'Book a free consultation to discuss how we can help your organisation manage risk effectively.',
          ctaButtonLabel: 'Book a Consultation',
          ctaButtonHref: '/book-consultation',
          email: 'basaryldrm1237@gmail.com',
        },
      ],
      _status: 'published',
    }, token, 'PATCH')
    console.log(`   Contact updated (${contactPage.id})`)
  } else {
    console.log('   Contact page not found - run seed-all.mjs first')
  }

  // 2. Patch BOOK CONSULTATION page
  console.log('2. Patching Book Consultation page...')
  const consultPage = await findPage('book-consultation')
  if (consultPage) {
    await api(`/pages/${consultPage.id}`, {
      layout: [
        {
          blockType: 'consultationForm',
          title: 'Book a free risk consultation',
          description: 'Tell us about your organisation and risk management priorities. We will review your request and get back to you to arrange a no-obligation conversation with a senior advisor.',
          email: 'basaryldrm1237@gmail.com',
        },
      ],
      _status: 'published',
    }, token, 'PATCH')
    console.log(`   Book Consultation updated (${consultPage.id})`)
  } else {
    console.log('   Book Consultation page not found - run seed-all.mjs first')
  }

  // 3. Patch ABOUT page
  console.log('3. Patching About page...')
  const aboutPage = await findPage('about')
  if (aboutPage) {
    await api(`/pages/${aboutPage.id}`, {
      layout: [
        {
          blockType: 'companyOverview',
          title: 'About Consilium Risk Advisory Group',
          body: richText(
            paragraph(text('Consilium Risk Advisory Group was founded by experienced risk professionals with a shared belief: that effective risk management should be practical, proportionate, and tailored to each organisation\'s unique circumstances. Based in the United Kingdom, we bring decades of combined expertise to help businesses navigate an increasingly complex risk landscape.')),
            paragraph(text('We serve organisations across a broad range of sectors, from financial services and energy to the public sector and beyond. Our team draws on real-world experience in enterprise risk management, regulatory compliance, operational resilience, and governance to deliver advisory services that make a measurable difference.')),
            paragraph(text('What sets Consilium apart is our commitment to a pragmatic approach. We don\'t deal in abstract frameworks or generic templates. We work closely with our clients to understand their specific challenges, build bespoke risk strategies, and embed lasting capability within their teams.')),
          ),
          stats: [
            { value: '20+', label: 'Years Experience' },
            { value: '100+', label: 'Clients Served' },
            { value: '6', label: 'Core Services' },
          ],
        },
        {
          blockType: 'teamGrid',
          title: 'Meet Our Team',
          subtitle: 'Our people are our greatest strength. Each member brings deep expertise and a genuine commitment to helping clients succeed.',
          members: [
            { name: 'James Harrington', role: 'Founder & CEO', bio: 'James founded Consilium with a vision to bring world-class risk advisory to organisations of all sizes. With over twenty years of experience spanning financial services, energy, and the public sector, he is a recognised thought leader in enterprise risk management.' },
            { name: 'Sarah Mitchell', role: 'Director of Risk Advisory', bio: 'Sarah leads Consilium\'s risk advisory practice, bringing deep expertise in regulatory compliance, operational resilience, and ISO 31000 implementation.' },
            { name: 'David Chen', role: 'Head of Compliance', bio: 'David oversees Consilium\'s compliance advisory services, helping clients navigate complex regulatory landscapes with confidence.' },
            { name: 'Emma Richardson', role: 'Senior Consultant', bio: 'Emma is a skilled risk and audit professional with particular expertise in cyber risk, internal audit, and third-party risk management.' },
          ],
        },
        {
          blockType: 'whyChooseUs',
          title: 'Our Mission & Values',
          description: 'Our mission is to empower organisations with the insight, frameworks, and confidence they need to manage risk effectively and make better decisions. We believe that sound risk management is not a barrier to growth — it is the foundation of it.',
          highlights: [
            { icon: 'shield', title: 'Integrity', description: 'We act with honesty and transparency in every engagement, building trust through ethical practice.' },
            { icon: 'award', title: 'Excellence', description: 'We hold ourselves to the highest professional standards, delivering rigorous analysis.' },
            { icon: 'user', title: 'Collaboration', description: 'We work as an extension of our clients\' teams, fostering open dialogue and shared ownership.' },
            { icon: 'target', title: 'Pragmatism', description: 'We focus on practical, proportionate solutions that deliver real, measurable results.' },
          ],
        },
        {
          blockType: 'finalCta',
          variant: 'gradient',
          title: 'Ready to Work With Us?',
          description: 'Get in touch to discuss how Consilium can help your organisation manage risk more effectively.',
          buttonLabel: 'Book a Consultation',
          buttonHref: '/book-consultation',
        },
      ],
      _status: 'published',
    }, token, 'PATCH')
    console.log(`   About updated (${aboutPage.id})`)
  } else {
    console.log('   About page not found - run seed-all.mjs first')
  }

  // 4. Update Header - fix Services link
  console.log('4. Updating Header (Services → /#services-hub)...')
  await api('/globals/header', {
    navItems: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/#services-hub' },
      { label: 'ISO 31000', href: '/iso-31000' },
      { label: 'About', href: '/about' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaButton: { label: 'Book Consultation', href: '/book-consultation' },
  }, token, 'PATCH')
  console.log('   Header updated\n')

  console.log('═══════════════════════════════════════════════════')
  console.log('  PATCH COMPLETE!')
  console.log('═══════════════════════════════════════════════════')
  console.log()
  console.log('  Updated pages:')
  console.log('    /contact     → contactSection block (with form)')
  console.log('    /book-consultation → consultationForm block (with form)')
  console.log('    /about       → companyOverview + teamGrid + whyChooseUs + finalCta')
  console.log('    Header       → Services link → /#services-hub')
}

main().catch(console.error)
