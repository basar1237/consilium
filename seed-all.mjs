/**
 * Comprehensive seed script for Consilium Risk Advisory Group
 * Creates: admin user, categories, blog posts, all pages, header, footer
 *
 * Usage: node seed-all.mjs
 * Requires: Payload CMS running at http://localhost:3000
 */

const BASE = 'http://localhost:3000/api'

// ── Lexical Rich Text Helpers ──────────────────────────────────────────────

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

function heading(tag, ...children) {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    version: 1,
    children,
    direction: 'ltr',
  }
}

function listItem(...children) {
  return {
    type: 'listitem',
    format: '',
    indent: 0,
    version: 1,
    children,
    direction: 'ltr',
    value: 1,
  }
}

function bulletList(...items) {
  return {
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    format: '',
    indent: 0,
    version: 1,
    children: items,
    direction: 'ltr',
    start: 1,
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

// ── API Helpers ────────────────────────────────────────────────────────────

async function api(path, data, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `JWT ${token}`
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  return res.json()
}

async function apiPatch(path, data, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `JWT ${token}`
  const res = await fetch(`${BASE}${path}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  })
  return res.json()
}

async function apiGet(path, token) {
  const headers = {}
  if (token) headers['Authorization'] = `JWT ${token}`
  const res = await fetch(`${BASE}${path}`, { headers })
  return res.json()
}

/** Contact + Book Consultation sayfalarında ortak Payload formu (Form Submissions) */
function sharedContactFormPayload() {
  return {
    title: 'Contact & Consultation',
    confirmationType: 'message',
    submitButtonLabel: 'Submit',
    confirmationMessage: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Thank you — your message has been submitted successfully.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    emails: [
      {
        emailFrom: '"Consilium" <info@consiliumriskadvisorygroup.co.uk>',
        emailTo: 'info@consiliumriskadvisorygroup.co.uk',
        subject: 'New form submission',
        message: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'A new submission was received from the website contact/consultation form.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    ],
    fields: [
      {
        name: 'full-name',
        blockName: 'full-name',
        blockType: 'text',
        label: 'Full Name',
        required: true,
        width: 100,
      },
      {
        name: 'email',
        blockName: 'email',
        blockType: 'email',
        label: 'Email',
        required: true,
        width: 100,
      },
      {
        name: 'organisation',
        blockName: 'organisation',
        blockType: 'text',
        label: 'Organisation',
        required: true,
        width: 100,
      },
      {
        name: 'country',
        blockName: 'country',
        blockType: 'country',
        label: 'Country',
        required: true,
        width: 100,
      },
      {
        name: 'phone',
        blockName: 'phone',
        blockType: 'number',
        label: 'Phone',
        required: false,
        width: 100,
      },
      {
        name: 'message',
        blockName: 'message',
        blockType: 'textarea',
        label: 'Message',
        required: true,
        width: 100,
      },
    ],
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Consilium Risk Advisory - Full CMS Seed')
  console.log('═══════════════════════════════════════════════════\n')

  // 1. Create admin user
  console.log('1. Creating admin user...')
  await api('/users/first-register', {
    email: 'info@consiliumriskadvisorygroup.co.uk',
    password: '1139basaR.',
  })

  // 2. Login
  console.log('2. Logging in...')
  const login = await api('/users/login', {
    email: 'info@consiliumriskadvisorygroup.co.uk',
    password: '1139basaR.',
  })
  const token = login.token
  if (!token) {
    console.error('Login failed:', JSON.stringify(login))
    process.exit(1)
  }
  console.log('   Logged in successfully\n')

  // Get user ID for post authors
  const me = await apiGet('/users/me', token)
  const userId = me.user?.id

  // 3. Create categories
  console.log('3. Creating categories...')
  const categories = {}
  for (const cat of ['Risk Management', 'Cyber Security', 'Compliance']) {
    const result = await api('/categories', { title: cat }, token)
    categories[cat] = result.doc?.id
    console.log(`   Category: ${cat} → ${result.doc?.id || 'exists'}`)
  }
  console.log()

  // 4. Create blog posts
  console.log('4. Creating blog posts...')
  const blogPosts = [
    {
      title: 'The Future of Enterprise Risk Management in 2026',
      slug: 'future-of-enterprise-risk-management-2026',
      category: 'Risk Management',
      publishedAt: '2026-03-15T09:00:00.000Z',
      description:
        'As organisations face an increasingly volatile risk landscape, the role of enterprise risk management is evolving rapidly.',
      content: richText(
        paragraph(
          text(
            'The discipline of enterprise risk management has undergone a remarkable transformation over the past decade, and 2026 marks a pivotal moment in its evolution. Organisations across the United Kingdom and beyond are grappling with a risk landscape that is more interconnected, more volatile, and more complex than at any point in living memory.',
          ),
        ),
        paragraph(
          text(
            'One of the most significant trends we observe is the integration of risk management into strategic decision-making at the highest levels of the organisation. Boards and executive committees are increasingly recognising that effective risk management is not merely a compliance obligation but a source of competitive advantage.',
          ),
        ),
        paragraph(
          text(
            'Technology is playing an increasingly central role in this transformation. Advanced analytics, artificial intelligence, and real-time data are enabling risk functions to move from periodic, backward-looking assessments to continuous, forward-looking monitoring.',
          ),
        ),
        paragraph(
          text(
            'However, technology alone is not sufficient. The most effective risk functions combine sophisticated tools with strong risk culture, clear governance, and deep expertise. As we look ahead, the organisations that will thrive are those that invest in building risk capabilities that are genuinely embedded in the fabric of their operations.',
          ),
        ),
        paragraph(
          text(
            'At Consilium, we work with clients across sectors to build risk management frameworks that are fit for the future — frameworks that are proportionate, pragmatic, and aligned with strategic objectives.',
          ),
        ),
      ),
    },
    {
      title: 'ISO 31000: A Practical Guide for UK Businesses',
      slug: 'iso-31000-practical-guide-uk-businesses',
      category: 'Risk Management',
      publishedAt: '2026-02-28T09:00:00.000Z',
      description:
        'ISO 31000 provides a globally recognised framework for risk management, but how should UK businesses apply it in practice?',
      content: richText(
        paragraph(
          text(
            'ISO 31000 is the international standard for risk management, providing principles, a framework, and a process that can be applied by any organisation regardless of size, sector, or complexity.',
          ),
        ),
        paragraph(
          text(
            "For UK businesses, the practical application of ISO 31000 begins with understanding the organisation's internal and external context. This means considering the regulatory environment, stakeholder expectations, industry dynamics, and the organisation's own strategic objectives and risk appetite.",
          ),
        ),
        heading('h2', text('The Risk Assessment Process')),
        paragraph(
          text(
            'The risk assessment process — comprising risk identification, risk analysis, and risk evaluation — forms the heart of the standard. Effective risk identification requires input from across the organisation, drawing on the knowledge and experience of people at every level.',
          ),
        ),
        heading('h2', text('Risk Treatment Options')),
        paragraph(
          text(
            'Risk treatment options include avoiding the risk, accepting the risk, modifying the likelihood or consequences, sharing the risk, or retaining the risk by informed decision. The choice of treatment should be proportionate and informed by a clear understanding of costs, benefits, and feasibility.',
          ),
        ),
        paragraph(
          text(
            'Communication, monitoring, and review are essential to ensuring that the risk management framework remains effective over time.',
          ),
        ),
      ),
    },
    {
      title: 'Building Operational Resilience: Lessons from Recent Disruptions',
      slug: 'building-operational-resilience-lessons-recent-disruptions',
      category: 'Risk Management',
      publishedAt: '2026-02-10T09:00:00.000Z',
      description:
        'Recent global disruptions have highlighted the importance of operational resilience for UK organisations.',
      content: richText(
        paragraph(
          text(
            'The past several years have provided a series of stark reminders about the importance of operational resilience. From the global pandemic and its cascading effects on supply chains and workforces, to significant technology outages and geopolitical events, organisations have faced unprecedented levels of disruption.',
          ),
        ),
        heading('h2', text('Key Lessons')),
        paragraph(
          text(
            'One of the most important lessons from recent disruptions is the critical role of third-party dependencies. Many organisations discovered that their resilience was only as strong as that of their key suppliers and service providers.',
          ),
        ),
        paragraph(
          text(
            'Another key lesson concerns the importance of scenario testing and exercising. Organisations that had invested in regular, realistic exercises were significantly better prepared to respond when actual disruption occurred.',
          ),
        ),
        paragraph(
          text(
            'Communication also emerged as a critical factor. Organisations that had clear, pre-established communication protocols were able to manage stakeholder expectations more effectively during periods of disruption.',
          ),
        ),
        paragraph(
          text(
            'Looking ahead, the organisations that build the strongest resilience capabilities will be those that treat operational resilience as a continuous discipline, not a one-off compliance exercise.',
          ),
        ),
      ),
    },
    {
      title: 'Cyber Risk: What Every Board Director Needs to Know',
      slug: 'cyber-risk-what-every-board-director-needs-to-know',
      category: 'Cyber Security',
      publishedAt: '2026-01-22T09:00:00.000Z',
      description:
        'Cyber risk is a board-level concern, yet many directors lack the technical background to engage effectively.',
      content: richText(
        paragraph(
          text(
            "Cyber risk has firmly established itself as one of the most significant threats facing organisations of all sizes and across all sectors. For board directors, the challenge is clear: they are ultimately accountable for the organisation's risk management, including cyber risk.",
          ),
        ),
        heading('h2', text('Key Principles for Board Directors')),
        paragraph(
          text(
            'First, directors should understand that cyber risk is a business risk, not merely a technology risk. A significant cyber incident can result in financial losses, regulatory penalties, reputational damage, and operational disruption.',
          ),
        ),
        paragraph(
          text(
            'Second, boards should ensure that the organisation has a clear understanding of its most critical digital assets and the threats they face.',
          ),
        ),
        paragraph(
          text(
            'Third, governance arrangements should be clear and effective. This includes defining roles and responsibilities for cyber risk management and establishing reporting lines to the board.',
          ),
        ),
        paragraph(
          text(
            'Fourth, incident response planning is essential. Boards should ensure that a tested incident response plan is in place.',
          ),
        ),
        paragraph(
          text(
            'Finally, boards should foster a culture of cyber awareness throughout the organisation. Human error remains one of the most common causes of cyber incidents.',
          ),
        ),
      ),
    },
    {
      title: 'Navigating Regulatory Change: A Strategic Approach',
      slug: 'navigating-regulatory-change-strategic-approach',
      category: 'Compliance',
      publishedAt: '2026-01-08T09:00:00.000Z',
      description:
        'Regulatory change is a constant for UK businesses. We outline a strategic, risk-based approach to managing change effectively.',
      content: richText(
        paragraph(
          text(
            'For organisations operating in regulated sectors in the United Kingdom, the pace and volume of regulatory change shows no sign of abating.',
          ),
        ),
        heading('h2', text('Building a Strategic Approach')),
        paragraph(
          text(
            'The first step in developing a strategic approach to regulatory change is establishing a robust horizon-scanning capability. This means systematically monitoring regulatory developments across all relevant jurisdictions and regulators.',
          ),
        ),
        paragraph(
          text(
            'Once potential changes have been identified, they should be assessed against a consistent set of criteria to determine their significance and urgency.',
          ),
        ),
        heading('h2', text('Implementation and Training')),
        paragraph(
          text(
            'Implementation planning should begin early and involve all relevant stakeholders. Regulatory change often has implications that extend well beyond the compliance function.',
          ),
        ),
        paragraph(
          text(
            'Training and communication are essential components of any change programme. Staff need to understand not only what is changing but why, and what it means for their day-to-day activities.',
          ),
        ),
        paragraph(
          text(
            'Finally, organisations should build feedback loops into their change management process. Post-implementation reviews help to identify lessons learned and refine the process for future use.',
          ),
        ),
      ),
    },
    {
      title: 'The Role of Internal Audit in Modern Risk Governance',
      slug: 'role-of-internal-audit-modern-risk-governance',
      category: 'Risk Management',
      publishedAt: '2025-12-18T09:00:00.000Z',
      description:
        'Internal audit is evolving from a traditional assurance function to a strategic partner in risk governance.',
      content: richText(
        paragraph(
          text(
            'The role of internal audit within organisations has evolved significantly in recent years, moving beyond its traditional focus on financial controls and compliance to become a strategic partner in risk governance.',
          ),
        ),
        heading('h2', text('Drivers of Change')),
        paragraph(
          text(
            'This shift is being driven by several factors. First, the risk landscape has become significantly more complex. Second, regulators are placing greater emphasis on the role of internal audit. Third, stakeholder expectations are rising.',
          ),
        ),
        heading('h2', text('Risk-Based Approach')),
        paragraph(
          text(
            "To meet these expectations, internal audit functions need to adopt a genuinely risk-based approach to planning and execution. This means moving beyond cyclical audit plans to dynamic plans that are responsive to changes in the organisation's risk profile.",
          ),
        ),
        paragraph(
          text(
            'Technology is playing an increasingly important role in enhancing the efficiency and effectiveness of internal audit. Data analytics, continuous monitoring tools, and automation are enabling audit teams to cover more ground and provide richer insights.',
          ),
        ),
        paragraph(
          text(
            'At Consilium, we support organisations in building internal audit capabilities that are fit for purpose, whether through fully outsourced engagements, co-sourced arrangements, or targeted advisory projects.',
          ),
        ),
      ),
    },
  ]

  for (const post of blogPosts) {
    const catId = categories[post.category]
    const result = await api(
      '/posts',
      {
        title: post.title,
        slug: post.slug,
        _status: 'published',
        publishedAt: post.publishedAt,
        content: post.content,
        categories: catId ? [catId] : [],
        authors: userId ? [userId] : [],
        meta: {
          title: post.title,
          description: post.description,
        },
      },
      token,
    )
    console.log(`   Post: ${post.title.substring(0, 50)}... → ${result.doc?.id || 'error'}`)
  }
  console.log()

  // 5. Create HOME page
  console.log('5. Creating Home page...')
  const homePage = await api(
    '/pages',
    {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'consiliumHero',
          title: 'Navigating Risk, Delivering Confidence',
          subtitle:
            'Expert risk advisory and management services for UK businesses. We help organisations identify, assess, and manage risk to protect value and drive sustainable growth.',
          primaryCta: { label: 'Book a Free Consultation', href: '/contact' },
          secondaryCta: { label: 'Explore Our Services', href: '#services-hub' },
        },
        {
          blockType: 'sectionNav',
          sections: [
            { anchorId: 'services-hub', label: 'Services', icon: 'layers' },
            { anchorId: 'insights', label: 'Insights', icon: 'lightbulb' },
            { anchorId: 'enterprise', label: 'Enterprise', icon: 'building' },
            { anchorId: 'trust', label: 'Trust', icon: 'shield' },
            { anchorId: 'testimonials', label: 'Testimonials', icon: 'quote' },
            { anchorId: 'how-we-work', label: 'How We Work', icon: 'workflow' },
            { anchorId: 'services', label: 'All Services', icon: 'grid' },
            { anchorId: 'why-us', label: 'Why Us', icon: 'award' },
            { anchorId: 'faq', label: 'FAQ', icon: 'help' },
            { anchorId: 'blog', label: 'Blog', icon: 'newspaper' },
            { anchorId: 'contact', label: 'Contact', icon: 'mail' },
          ],
        },
        {
          blockType: 'quickServiceHub',
          tagline: 'Find the right support',
          title: 'Where do you need help?',
          description:
            'Jump straight into the area that matches your challenge — each page outlines how we typically engage and what good looks like.',
          services: [
            {
              title: 'Enterprise Risk Management',
              shortDescription:
                'Comprehensive risk management frameworks tailored to your organisation.',
              slug: 'enterprise-risk-management',
            },
            {
              title: 'Regulatory Compliance',
              shortDescription: 'Navigate complex regulatory landscapes with confidence.',
              slug: 'regulatory-compliance',
            },
            {
              title: 'Operational Resilience',
              shortDescription: 'Build resilient operations that withstand disruption.',
              slug: 'operational-resilience',
            },
            {
              title: 'Cyber Risk Advisory',
              shortDescription: 'Protect digital assets with risk-informed security.',
              slug: 'cyber-risk-advisory',
            },
            {
              title: 'Internal Audit',
              shortDescription: 'Independent assurance that adds value to operations.',
              slug: 'internal-audit',
            },
            {
              title: 'Strategic Risk Consulting',
              shortDescription: 'Align risk management with corporate strategy.',
              slug: 'strategic-risk-consulting',
            },
          ],
          viewAllLink: {
            label: 'View all services overview →',
            href: '/services/enterprise-risk-management',
          },
        },
        {
          blockType: 'insightTabs',
          tagline: 'Our Perspective',
          title: 'Understanding risk management',
          tabs: [
            {
              label: 'Why it matters',
              heading: 'Risk management is a strategic enabler',
              points: [
                { text: 'Protects value and supports informed decision-making at every level' },
                { text: 'Builds stakeholder confidence through transparent governance' },
                {
                  text: 'Enables organisations to pursue opportunities with appropriate safeguards',
                },
              ],
            },
            {
              label: 'Our approach',
              heading: 'Proportionate, pragmatic, proven',
              points: [
                { text: 'Tailored to your organisation size, sector, and risk maturity' },
                { text: 'Focused on outcomes, not just compliance' },
                { text: 'Built on ISO 31000 principles and real-world experience' },
              ],
            },
            {
              label: 'The outcome',
              heading: 'Measurable improvements in risk capability',
              points: [
                { text: 'Clear risk appetite statements the board actually uses' },
                { text: 'Embedded risk culture across the organisation' },
                { text: 'Regulatory confidence and audit readiness' },
              ],
            },
          ],
        },
        {
          blockType: 'enterpriseShowcase',
          title: 'Comprehensive Enterprise Risk Management Services',
          cards: [
            {
              title: 'Risk Frameworks',
              description:
                'Design and implement enterprise risk management frameworks aligned to ISO 31000.',
              href: '/services/enterprise-risk-management',
            },
            {
              title: 'Regulatory Programmes',
              description:
                'Build sustainable compliance programmes that keep pace with regulatory expectations.',
              href: '/services/regulatory-compliance',
            },
            {
              title: 'Resilience Testing',
              description:
                'Validate your operational resilience through scenario testing and business impact analysis.',
              href: '/services/operational-resilience',
            },
            {
              title: 'Cyber Governance',
              description:
                'Establish board-level cyber risk governance and incident response capabilities.',
              href: '/services/cyber-risk-advisory',
            },
          ],
        },
        {
          blockType: 'trustMetrics',
          tagline: 'Why teams work with us',
          title: 'Credible delivery, without the noise',
          pillars: [
            {
              title: 'Senior-Led Delivery',
              description:
                'Every engagement is led by experienced consultants, not delegated to juniors.',
            },
            {
              title: 'Sector Expertise',
              description:
                'Deep knowledge of financial services, healthcare, energy, and manufacturing sectors.',
            },
            {
              title: 'Pragmatic Solutions',
              description: 'Frameworks that work in practice, not just in theory or presentations.',
            },
            {
              title: 'Transparent Pricing',
              description: 'Clear, fixed-fee proposals so you always know what you are investing.',
            },
          ],
        },
        {
          blockType: 'featuredTestimonial',
          quote:
            'Consilium helped us move from a spreadsheet-led risk register to a framework the board actually uses in decision meetings.',
          authorRole: 'Director of Risk & Compliance',
          authorOrganisation: 'UK financial services organisation',
          rating: 5,
          ctaLabel: 'Read more client feedback',
          ctaHref: '/testimonials',
        },
        {
          blockType: 'howWeWork',
          tagline: 'Our approach',
          title: 'How we work with you',
          description: 'A clear, five-stage engagement model — transparent at each step.',
          steps: [
            {
              title: 'Discovery',
              description:
                'We listen first. Understanding your organisation, objectives, and current risk landscape.',
            },
            {
              title: 'Assessment',
              description:
                'Structured analysis of your risk environment, identifying gaps, strengths, and priorities.',
            },
            {
              title: 'Design',
              description:
                'Developing tailored frameworks, policies, and tools that fit your context.',
            },
            {
              title: 'Implementation',
              description:
                'Working alongside your teams to embed new practices and build capability.',
            },
            {
              title: 'Review',
              description:
                'Ongoing support to monitor effectiveness and ensure continuous improvement.',
            },
          ],
        },
        {
          blockType: 'servicesOverview',
          title: 'Our Services',
          subtitle: 'Comprehensive risk advisory solutions tailored to your organisation',
          services: [
            {
              title: 'Enterprise Risk Management',
              shortDescription:
                "Comprehensive risk management frameworks tailored to your organisation's strategic objectives.",
              slug: 'enterprise-risk-management',
            },
            {
              title: 'Regulatory Compliance',
              shortDescription:
                'Navigate complex regulatory landscapes with confidence through expert guidance.',
              slug: 'regulatory-compliance',
            },
            {
              title: 'Operational Resilience',
              shortDescription:
                'Build resilient operations that can withstand disruption and deliver critical services.',
              slug: 'operational-resilience',
            },
            {
              title: 'Cyber Risk Advisory',
              shortDescription:
                'Protect your digital assets and manage cyber threats with a risk-informed approach.',
              slug: 'cyber-risk-advisory',
            },
            {
              title: 'Internal Audit',
              shortDescription:
                'Independent assurance and advisory services that add value to your operations.',
              slug: 'internal-audit',
            },
            {
              title: 'Strategic Risk Consulting',
              shortDescription:
                'Align risk management with corporate strategy to protect and create value.',
              slug: 'strategic-risk-consulting',
            },
          ],
        },
        {
          blockType: 'whyChooseUs',
          title: 'Why Choose Consilium?',
          highlights: [
            {
              icon: 'user',
              title: 'Proven Expertise',
              description: 'Decades of combined experience across risk management disciplines',
            },
            {
              icon: 'settings',
              title: 'Tailored Solutions',
              description: "Bespoke frameworks designed for your organisation's unique needs",
            },
            {
              icon: 'target',
              title: 'UK Market Focus',
              description: 'Deep understanding of the UK regulatory and business landscape',
            },
            {
              icon: 'check',
              title: 'Pragmatic Approach',
              description: 'Practical, actionable advice that delivers measurable results',
            },
          ],
        },
        {
          blockType: 'homeFaq',
          tagline: 'FAQ',
          title: 'Common questions',
          description: 'Straight answers on how we engage — before you pick up the phone.',
          faqs: [
            {
              question: 'What types of organisations do you work with?',
              answer:
                'We work with organisations of all sizes across multiple sectors, including financial services, healthcare, energy, manufacturing, and professional services.',
            },
            {
              question: 'How long does a typical engagement last?',
              answer:
                'Engagement length varies. A focused risk assessment might take 4-6 weeks, while a comprehensive framework implementation could span 3-6 months.',
            },
            {
              question: 'Do you offer ongoing support?',
              answer:
                'Yes. Many clients retain us for ongoing advisory support, periodic reviews, or co-sourced internal audit arrangements.',
            },
            {
              question: 'How do you price your services?',
              answer:
                'We offer transparent, fixed-fee proposals based on a clear scope of work. No hidden charges.',
            },
            {
              question: 'What makes Consilium different?',
              answer:
                'Every engagement is led by senior consultants with deep expertise — not delegated to junior staff. We offer the quality of a large firm with the agility of a specialist practice.',
            },
          ],
        },
        {
          blockType: 'blogPreview',
          title: 'Latest Insights',
          postCount: 3,
          viewAllLabel: 'View All Insights →',
        },
        {
          blockType: 'finalCta',
          title: 'Ready to Strengthen Your Risk Management?',
          description:
            'Contact us today for a no-obligation consultation with one of our senior risk advisors.',
          buttonLabel: 'Book a Consultation',
          buttonHref: '/contact',
        },
        {
          blockType: 'floatingSocial',
          enableShare: true,
          links: [
            { label: 'LinkedIn', href: 'https://linkedin.com/company/consilium', icon: 'linkedin' },
            { label: 'Facebook', href: 'https://facebook.com/consilium', icon: 'facebook' },
            { label: 'X', href: 'https://x.com/consilium', icon: 'x' },
          ],
        },
      ],
      meta: {
        title: 'Consilium Risk Advisory Group | Expert Risk Management Services',
        description:
          'Professional risk advisory and management services for UK businesses. Enterprise risk management, regulatory compliance, operational resilience, and more.',
      },
    },
    token,
  )
  console.log(`   Home → ${homePage.doc?.id || 'error'}\n`)

  // 6. Create ABOUT page
  console.log('6. Creating About page...')
  const aboutPage = await api(
    '/pages',
    {
      title: 'About Us',
      slug: 'about',
      _status: 'published',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'companyOverview',
          title: 'About Consilium Risk Advisory Group',
          body: richText(
            paragraph(
              text(
                "Consilium Risk Advisory Group was founded by experienced risk professionals with a shared belief: that effective risk management should be practical, proportionate, and tailored to each organisation's unique circumstances. Based in the United Kingdom, we bring decades of combined expertise to help businesses navigate an increasingly complex risk landscape.",
              ),
            ),
            paragraph(
              text(
                'We serve organisations across a broad range of sectors, from financial services and energy to the public sector and beyond. Our team draws on real-world experience in enterprise risk management, regulatory compliance, operational resilience, and governance to deliver advisory services that make a measurable difference.',
              ),
            ),
            paragraph(
              text(
                "What sets Consilium apart is our commitment to a pragmatic approach. We don't deal in abstract frameworks or generic templates. We work closely with our clients to understand their specific challenges, build bespoke risk strategies, and embed lasting capability within their teams.",
              ),
            ),
          ),
          stats: [
            { value: '20+', label: 'Years Experience' },
            { value: '100+', label: 'Clients Served' },
            { value: '6', label: 'Core Services' },
          ],
        },
        {
          blockType: 'trustMetrics',
          tagline: 'Our track record',
          title: 'Consilium in numbers',
          pillars: [
            { title: '20+ Years', description: 'Combined experience in risk management advisory' },
            { title: '100+ Clients', description: 'Organisations served across the UK' },
            { title: '6 Core Services', description: 'Comprehensive risk advisory disciplines' },
            {
              title: '100% Senior-Led',
              description: 'Every engagement led by experienced consultants',
            },
          ],
        },
        {
          blockType: 'teamGrid',
          title: 'Meet Our Team',
          subtitle:
            'Our people are our greatest strength. Each member brings deep expertise and a genuine commitment to helping clients succeed.',
          members: [
            {
              name: 'James Harrington',
              role: 'Founder & CEO',
              bio: 'James founded Consilium with a vision to bring world-class risk advisory to organisations of all sizes. With over twenty years of experience spanning financial services, energy, and the public sector, he is a recognised thought leader in enterprise risk management and governance.',
            },
            {
              name: 'Sarah Mitchell',
              role: 'Director of Risk Advisory',
              bio: "Sarah leads Consilium's risk advisory practice, bringing deep expertise in regulatory compliance, operational resilience, and ISO 31000 implementation. She has advised some of the UK's largest financial institutions.",
            },
            {
              name: 'David Chen',
              role: 'Head of Compliance',
              bio: "David oversees Consilium's compliance advisory services, helping clients navigate complex regulatory landscapes. His background in both legal and risk disciplines gives him a unique perspective on building effective compliance programmes.",
            },
            {
              name: 'Emma Richardson',
              role: 'Senior Consultant',
              bio: 'Emma is a skilled risk and audit professional with particular expertise in cyber risk, internal audit, and third-party risk management. She delivers pragmatic solutions that strengthen governance.',
            },
          ],
        },
        {
          blockType: 'whyChooseUs',
          title: 'Our Mission & Values',
          description:
            'Our mission is to empower organisations with the insight, frameworks, and confidence they need to manage risk effectively and make better decisions. We believe that sound risk management is not a barrier to growth — it is the foundation of it.',
          highlights: [
            {
              icon: 'shield',
              title: 'Integrity',
              description:
                'We act with honesty and transparency in every engagement, building trust through ethical practice and impartial advice.',
            },
            {
              icon: 'award',
              title: 'Excellence',
              description:
                'We hold ourselves to the highest professional standards, delivering rigorous analysis and actionable recommendations.',
            },
            {
              icon: 'user',
              title: 'Collaboration',
              description:
                "We work as an extension of our clients' teams, fostering open dialogue and shared ownership of outcomes.",
            },
            {
              icon: 'lightbulb',
              title: 'Innovation',
              description:
                'We continuously evolve our methods and thinking to help clients stay ahead of emerging risks and opportunities.',
            },
          ],
        },
        {
          blockType: 'finalCta',
          title: 'Ready to Work With Us?',
          description:
            'Get in touch to discuss how Consilium can help your organisation manage risk more effectively.',
          buttonLabel: 'Book a Consultation',
          buttonHref: '/contact',
        },
      ],
      meta: {
        title: 'About Us | Consilium Risk Advisory Group',
        description:
          'Learn about Consilium Risk Advisory Group — our team, our mission, and our values.',
      },
    },
    token,
  )
  console.log(`   About → ${aboutPage.doc?.id || 'error'}\n`)

  // 7. Create TESTIMONIALS page
  console.log('7. Creating Testimonials page...')
  const testimonialsPage = await api(
    '/pages',
    {
      title: 'Testimonials',
      slug: 'testimonials',
      _status: 'published',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'testimonialsGrid',
          title: 'What Our Clients Say',
          subtitle:
            'Trusted by organisations across the UK for risk advisory and management services',
          testimonials: [
            {
              quote:
                'Consilium transformed our approach to enterprise risk management. Their team brought clarity to a complex landscape and delivered a framework that has genuinely improved our decision-making at board level.',
              name: 'Richard Pemberton',
              role: 'Chief Financial Officer',
              company: 'Meridian Financial Services',
            },
            {
              quote:
                'The operational resilience programme Consilium designed for us was outstanding. They understood our regulatory obligations and translated them into practical, proportionate measures that our teams could actually implement.',
              name: 'Catherine Wells',
              role: 'Chief Risk Officer',
              company: 'Northern Gateway Insurance',
            },
            {
              quote:
                'We engaged Consilium to support our internal audit function during a period of significant organisational change. Their consultants were professional, thorough, and delivered findings that added real value to the business.',
              name: 'Andrew Forsyth',
              role: 'Head of Risk',
              company: 'Sterling Manufacturing Group',
            },
            {
              quote:
                "Consilium's cyber risk advisory service gave our board the confidence and visibility we needed to fulfil our governance responsibilities. Their ability to translate technical risks into business language was particularly valuable.",
              name: 'Helen Cartwright',
              role: 'Managing Director',
              company: 'Atlas Property Holdings',
            },
            {
              quote:
                'Navigating the regulatory landscape in healthcare is extraordinarily complex. Consilium provided the expertise and structured approach we needed to build a compliance programme that is both robust and sustainable.',
              name: 'Jonathan Drake',
              role: 'Group Compliance Director',
              company: 'Whitmore Healthcare Partners',
            },
            {
              quote:
                "As a non-executive, I value independent, high-quality assurance. Consilium's strategic risk consulting gave us a clear picture of our risk exposure during a critical period of growth and acquisition.",
              name: 'Fiona MacLeod',
              role: 'Non-Executive Director',
              company: 'Caledonian Energy Ltd',
            },
          ],
        },
        {
          blockType: 'finalCta',
          title: 'Ready to Strengthen Your Risk Management?',
          description:
            'Contact us today for a no-obligation consultation with one of our senior risk advisors.',
          buttonLabel: 'Book a Consultation',
          buttonHref: '/contact',
        },
      ],
      meta: {
        title: 'Testimonials | Consilium Risk Advisory Group',
        description: 'Read what our clients say about working with Consilium Risk Advisory Group.',
      },
    },
    token,
  )
  console.log(`   Testimonials → ${testimonialsPage.doc?.id || 'error'}\n`)

  // 8. Create ISO 31000 page
  console.log('8. Creating ISO 31000 page...')
  const isoPage = await api(
    '/pages',
    {
      title: 'ISO 31000',
      slug: 'iso-31000',
      _status: 'published',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: richText(
                heading('h2', text('ISO 31000')),
                paragraph(
                  text(
                    'The international standard for risk management — principles, framework, and process',
                  ),
                ),
                paragraph(
                  text(
                    'ISO 31000 provides guidelines on managing risk faced by organisations. It can be customised to any organisation and its context, providing a common approach to managing any type of risk. Consilium helps UK businesses implement ISO 31000 in a practical, proportionate way.',
                  ),
                ),
              ),
            },
          ],
        },
        {
          blockType: 'homeFaq',
          tagline: 'ISO 31000 Framework',
          title: 'Key Areas',
          description:
            'Understanding the core components of the ISO 31000 risk management standard.',
          faqs: [
            {
              question: 'Risk Assessment',
              answer:
                'Risk assessment is the overall process of risk identification, risk analysis, and risk evaluation. It provides the evidence base for informed decisions about how to treat particular risks and select between options.',
            },
            {
              question: 'Risk Treatment',
              answer:
                'Risk treatment involves selecting and implementing options for addressing risk. Options include avoiding the risk, taking or increasing risk to pursue an opportunity, removing the risk source, changing the likelihood, changing the consequences, sharing the risk, or retaining the risk by informed decision.',
            },
            {
              question: 'Risk Monitoring & Review',
              answer:
                "Monitoring and review should take place in all stages of the risk management process. It includes planning, gathering and analysing information, recording results, and providing feedback. Results should be incorporated throughout the organisation's performance management.",
            },
            {
              question: 'Risk Communication',
              answer:
                'Communication and consultation with external and internal stakeholders should take place during all stages of the risk management process. Plans should address issues relating to the risk itself, its causes, its consequences, and the measures being taken to treat it.',
            },
            {
              question: 'Risk Framework',
              answer:
                "The framework provides the foundations and organisational arrangements for designing, implementing, monitoring, reviewing, and continually improving risk management throughout the organisation. It should be integrated into the organisation's overall strategy and governance.",
            },
          ],
        },
        {
          blockType: 'finalCta',
          title: 'Need Help Implementing ISO 31000?',
          description:
            'Our consultants can help you design and implement a proportionate, practical risk management framework aligned with ISO 31000.',
          buttonLabel: 'Book a Consultation',
          buttonHref: '/contact',
        },
      ],
      meta: {
        title: 'ISO 31000 Risk Management | Consilium Risk Advisory Group',
        description: 'Expert ISO 31000 risk management consulting for UK businesses.',
      },
    },
    token,
  )
  console.log(`   ISO 31000 → ${isoPage.doc?.id || 'error'}\n`)

  // 8b. Shared Payload form (contact + consultation → Form Submissions)
  console.log('8b. Creating Contact & Consultation form...')
  const sharedFormRes = await api('/forms', sharedContactFormPayload(), token)
  const sharedFormId = sharedFormRes.doc?.id
  if (!sharedFormId) {
    console.error('   Form creation failed:', JSON.stringify(sharedFormRes))
  } else {
    console.log(`   Form → ${sharedFormId}\n`)
  }

  // 9. Create CONTACT page
  console.log('9. Creating Contact page...')
  const contactPage = await api(
    '/pages',
    {
      title: 'Contact Us',
      slug: 'contact',
      _status: 'published',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'contactSection',
          title: 'Contact Us',
          subtitle: "We'd love to hear from you. Reach out to discuss your risk management needs.",
          formTitle: 'Send Us a Message',
          contactInfoTitle: 'Contact Information',
          contactDetails: [
            {
              label: 'Email',
              value: 'info@consiliumriskadvisorygroup.co.uk',
              href: 'mailto:info@consiliumriskadvisorygroup.co.uk',
            },
            { label: 'Address', value: 'Sheffield, United Kingdom' },
            { label: 'Working Hours', value: 'Monday – Saturday, 9:00 AM – 6:00 PM GMT' },
          ],
          ctaTitle: 'Ready to Get Started?',
          ctaDescription:
            'Book a free consultation to discuss how we can help your organisation manage risk effectively.',
          ctaButtonLabel: 'Book a Consultation',
          ctaButtonHref: '/contact',
          email: 'info@consiliumriskadvisorygroup.co.uk',
          ...(sharedFormId ? { form: sharedFormId } : {}),
        },
      ],
      meta: {
        title: 'Contact Us | Consilium Risk Advisory Group',
        description:
          'Get in touch with Consilium Risk Advisory Group for risk management consultation.',
      },
    },
    token,
  )
  console.log(`   Contact → ${contactPage.doc?.id || 'error'}\n`)

  // (Book Consultation artık ayrı sayfa değil — tüm CTA’lar /contact; eski URL next.config redirect ile /contact’e gider.)

  // 10. Create SERVICE pages
  console.log('10. Creating Service pages...')
  const servicePages = [
    {
      title: 'Enterprise Risk Management',
      slug: 'service-enterprise-risk-management',
      description:
        "Comprehensive risk management frameworks tailored to your organisation's strategic objectives and risk appetite.",
      fullContent: richText(
        heading('h2', text('Enterprise Risk Management')),
        paragraph(
          text(
            'Our Enterprise Risk Management service delivers end-to-end frameworks that align your risk management capabilities with strategic objectives. We work closely with boards and senior leadership to establish clear risk appetite statements, embed robust reporting mechanisms, and ensure that risk considerations inform every level of decision-making.',
          ),
        ),
        paragraph(
          text(
            'Whether you are building a risk function from the ground up or enhancing an existing programme, our consultants bring deep sector expertise and pragmatic solutions that drive measurable value.',
          ),
        ),
        heading('h3', text('Key Features')),
        bulletList(
          listItem(text('Risk identification and assessment')),
          listItem(text('Risk appetite frameworks')),
          listItem(text('Risk reporting and dashboards')),
          listItem(text('Board-level governance and oversight')),
        ),
      ),
    },
    {
      title: 'Regulatory Compliance',
      slug: 'service-regulatory-compliance',
      description:
        'Navigate complex regulatory landscapes with confidence through expert guidance and structured compliance programmes.',
      fullContent: richText(
        heading('h2', text('Regulatory Compliance')),
        paragraph(
          text(
            'Regulatory demands continue to grow in scope and complexity across every sector. Our Regulatory Compliance service helps organisations understand their obligations, identify gaps in current arrangements, and implement sustainable compliance programmes.',
          ),
        ),
        paragraph(
          text(
            'From initial gap analysis through to ongoing monitoring and training, we provide the tools and expertise needed to stay ahead of regulatory change. Our approach is proportionate and risk-based, ensuring your compliance efforts are focused where they matter most.',
          ),
        ),
        heading('h3', text('Key Features')),
        bulletList(
          listItem(text('Regulatory gap analysis')),
          listItem(text('Compliance programme design and implementation')),
          listItem(text('Regulatory change management')),
          listItem(text('Staff training and awareness programmes')),
        ),
      ),
    },
    {
      title: 'Operational Resilience',
      slug: 'service-operational-resilience',
      description:
        'Build resilient operations that can withstand disruption and continue to deliver critical services to customers.',
      fullContent: richText(
        heading('h2', text('Operational Resilience')),
        paragraph(
          text(
            'Operational resilience has moved to the top of the regulatory and boardroom agenda. We help organisations identify their important business services, set impact tolerances, and develop robust testing programmes to validate their ability to remain within tolerance during severe but plausible scenarios.',
          ),
        ),
        paragraph(
          text(
            'Our consultants support you across the full resilience lifecycle, from business impact analysis and third-party dependency mapping to recovery planning and lessons-learned exercises.',
          ),
        ),
        heading('h3', text('Key Features')),
        bulletList(
          listItem(text('Business impact analysis')),
          listItem(text('Scenario testing and exercising')),
          listItem(text('Third-party risk management')),
          listItem(text('Recovery and continuity planning')),
        ),
      ),
    },
    {
      title: 'Cyber Risk Advisory',
      slug: 'service-cyber-risk-advisory',
      description:
        'Protect your digital assets and manage cyber threats with a risk-informed approach to information security.',
      fullContent: richText(
        heading('h2', text('Cyber Risk Advisory')),
        paragraph(
          text(
            'Cyber threats pose one of the most significant risks to modern organisations, yet many struggle to translate technical vulnerabilities into business risk language. Our Cyber Risk Advisory service bridges this gap by providing board-level insight into your cyber risk posture.',
          ),
        ),
        paragraph(
          text(
            'We work alongside your technology teams to ensure that cyber risk is managed as an integral part of your wider enterprise risk framework, not as a siloed technical concern.',
          ),
        ),
        heading('h3', text('Key Features')),
        bulletList(
          listItem(text('Cyber risk assessment and quantification')),
          listItem(text('Information security governance')),
          listItem(text('Incident response planning')),
          listItem(text('Cyber awareness training')),
        ),
      ),
    },
    {
      title: 'Internal Audit',
      slug: 'service-internal-audit',
      description:
        "Independent assurance and advisory services that add value and improve your organisation's operations.",
      fullContent: richText(
        heading('h2', text('Internal Audit')),
        paragraph(
          text(
            'Effective internal audit is a cornerstone of good governance, providing independent assurance to boards and audit committees on the adequacy of risk management, control, and governance processes.',
          ),
        ),
        paragraph(
          text(
            'Our Internal Audit service offers flexible engagement models, from fully outsourced internal audit functions to co-sourced arrangements that supplement your in-house team. We take a risk-based approach to audit planning, focusing resources on the areas of greatest significance.',
          ),
        ),
        heading('h3', text('Key Features')),
        bulletList(
          listItem(text('Risk-based audit planning')),
          listItem(text('Process and controls review')),
          listItem(text('Audit committee support and reporting')),
          listItem(text('Co-sourced and outsourced audit delivery')),
        ),
      ),
    },
    {
      title: 'Strategic Risk Consulting',
      slug: 'service-strategic-risk-consulting',
      description:
        'Align risk management with corporate strategy to protect and create value in an uncertain environment.',
      fullContent: richText(
        heading('h2', text('Strategic Risk Consulting')),
        paragraph(
          text(
            "Strategic risks can fundamentally alter an organisation's trajectory, yet they are often the least well managed. Our Strategic Risk Consulting service helps leadership teams identify, assess, and respond to risks that could impact strategic objectives.",
          ),
        ),
        paragraph(
          text(
            'From evaluating the risk implications of mergers and acquisitions to embedding a proactive risk culture and horizon-scanning for emerging threats, we ensure that risk management is a strategic enabler rather than a compliance exercise.',
          ),
        ),
        heading('h3', text('Key Features')),
        bulletList(
          listItem(text('Strategic risk assessment')),
          listItem(text('Risk culture evaluation and development')),
          listItem(text('M&A risk due diligence')),
          listItem(text('Emerging risk identification and monitoring')),
        ),
      ),
    },
  ]

  for (const svc of servicePages) {
    const result = await api(
      '/pages',
      {
        title: svc.title,
        slug: svc.slug,
        _status: 'published',
        hero: { type: 'none' },
        layout: [
          {
            blockType: 'content',
            columns: [{ size: 'full', richText: svc.fullContent }],
          },
          {
            blockType: 'finalCta',
            title: `Ready to discuss ${svc.title.toLowerCase()}?`,
            description:
              'Contact us for a no-obligation consultation with one of our senior advisors.',
            buttonLabel: 'Book a Consultation',
            buttonHref: '/contact',
          },
        ],
        meta: {
          title: `${svc.title} | Consilium Risk Advisory`,
          description: svc.description,
        },
      },
      token,
    )
    console.log(`   Service: ${svc.title} → ${result.doc?.id || 'error'}`)
  }
  console.log()

  // 11. Update header
  console.log('11. Updating Header...')
  await apiPatch(
    '/globals/header',
    {
      navItems: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/#services-hub' },
        { label: 'ISO 31000', href: '/iso-31000' },
        { label: 'About', href: '/about' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
      ctaButton: { label: 'Book Consultation', href: '/contact' },
    },
    token,
  )
  console.log('   Header updated\n')

  // 12. Update footer
  console.log('12. Updating Footer...')
  await apiPatch(
    '/globals/footer',
    {
      companyDescription:
        'Professional risk advisory and management services based in the United Kingdom. Helping organisations identify, assess, and manage risk effectively.',
      quickLinksTitle: 'Quick Links',
      navItems: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services/enterprise-risk-management' },
        { label: 'About', href: '/about' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
      contactTitle: 'Contact',
      email: 'info@consiliumriskadvisorygroup.co.uk',
      address: 'Sheffield, United Kingdom',
      copyrightText: '© 2026 Consilium Risk Advisory Group. All rights reserved.',
      socialLinks: [
        { label: 'LinkedIn', href: 'https://linkedin.com/company/consilium', icon: 'in' },
        { label: 'Facebook', href: 'https://facebook.com/consilium', icon: 'f' },
        { label: 'X', href: 'https://x.com/consilium', icon: 'x' },
      ],
    },
    token,
  )
  console.log('   Footer updated\n')

  // Done
  console.log('═══════════════════════════════════════════════════')
  console.log('  ALL DONE!')
  console.log('═══════════════════════════════════════════════════')
  console.log()
  console.log('  Pages created:')
  console.log('    / (Home)')
  console.log('    /about')
  console.log('    /testimonials')
  console.log('    /iso-31000')
  console.log('    /contact')
  console.log('    /services/enterprise-risk-management')
  console.log('    /services/regulatory-compliance')
  console.log('    /services/operational-resilience')
  console.log('    /services/cyber-risk-advisory')
  console.log('    /services/internal-audit')
  console.log('    /services/strategic-risk-consulting')
  console.log()
  console.log('  Blog posts: 6')
  console.log('  Categories: 3')
  console.log()
  console.log('  Admin:    http://localhost:3000/admin')
  console.log('  Email:    info@consiliumriskadvisorygroup.co.uk')
  console.log('  Password: consilium2026')
}

main().catch(console.error)
