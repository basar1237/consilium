/**
 * Fix: Update Home page + Create missing About page
 */

const BASE = 'http://localhost:3000/api'

function text(t, format = 0) {
  return { type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 }
}
function paragraph(...children) {
  return { type: 'paragraph', format: '', indent: 0, version: 1, children, direction: 'ltr', textFormat: 0, textStyle: '' }
}
function heading(tag, ...children) {
  return { type: 'heading', tag, format: '', indent: 0, version: 1, children, direction: 'ltr' }
}
function richText(...nodes) {
  return { root: { type: 'root', format: '', indent: 0, version: 1, children: nodes, direction: 'ltr' } }
}

async function main() {
  // Login
  const login = await fetch(`${BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'basaryldrm1237@gmail.com', password: '1139basaR.' }),
  }).then(r => r.json())
  const token = login.token

  // Update Home page (ID 1)
  console.log('Updating Home page...')
  const homeRes = await fetch(`${BASE}/pages/1`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({
      _status: 'published',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'consiliumHero',
          title: 'Navigating Risk, Delivering Confidence',
          subtitle: 'Expert risk advisory and management services for UK businesses. We help organisations identify, assess, and manage risk to protect value and drive sustainable growth.',
          primaryCta: { label: 'Book a Free Consultation', href: '/book-consultation' },
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
          description: 'Jump straight into the area that matches your challenge — each page outlines how we typically engage and what good looks like.',
          services: [
            { title: 'Enterprise Risk Management', shortDescription: 'Comprehensive risk management frameworks tailored to your organisation.', slug: 'enterprise-risk-management' },
            { title: 'Regulatory Compliance', shortDescription: 'Navigate complex regulatory landscapes with confidence.', slug: 'regulatory-compliance' },
            { title: 'Operational Resilience', shortDescription: 'Build resilient operations that withstand disruption.', slug: 'operational-resilience' },
            { title: 'Cyber Risk Advisory', shortDescription: 'Protect digital assets with risk-informed security.', slug: 'cyber-risk-advisory' },
            { title: 'Internal Audit', shortDescription: 'Independent assurance that adds value to operations.', slug: 'internal-audit' },
            { title: 'Strategic Risk Consulting', shortDescription: 'Align risk management with corporate strategy.', slug: 'strategic-risk-consulting' },
          ],
          viewAllLink: { label: 'View all services overview →', href: '/services/enterprise-risk-management' },
        },
        {
          blockType: 'insightTabs',
          tagline: 'Our Perspective',
          title: 'Understanding risk management',
          tabs: [
            { label: 'Why it matters', heading: 'Risk management is a strategic enabler', points: [{ text: 'Protects value and supports informed decision-making' }, { text: 'Builds stakeholder confidence through transparent governance' }, { text: 'Enables organisations to pursue opportunities with safeguards' }] },
            { label: 'Our approach', heading: 'Proportionate, pragmatic, proven', points: [{ text: 'Tailored to your organisation size, sector, and risk maturity' }, { text: 'Focused on outcomes, not just compliance' }, { text: 'Built on ISO 31000 principles and real-world experience' }] },
            { label: 'The outcome', heading: 'Measurable improvements in risk capability', points: [{ text: 'Clear risk appetite statements the board actually uses' }, { text: 'Embedded risk culture across the organisation' }, { text: 'Regulatory confidence and audit readiness' }] },
          ],
        },
        {
          blockType: 'enterpriseShowcase',
          title: 'Comprehensive Enterprise Risk Management Services',
          cards: [
            { title: 'Risk Frameworks', description: 'Design and implement enterprise risk management frameworks aligned to ISO 31000.', href: '/services/enterprise-risk-management' },
            { title: 'Regulatory Programmes', description: 'Build sustainable compliance programmes.', href: '/services/regulatory-compliance' },
            { title: 'Resilience Testing', description: 'Validate operational resilience through scenario testing.', href: '/services/operational-resilience' },
            { title: 'Cyber Governance', description: 'Establish board-level cyber risk governance.', href: '/services/cyber-risk-advisory' },
          ],
        },
        {
          blockType: 'trustMetrics',
          tagline: 'Why teams work with us',
          title: 'Credible delivery, without the noise',
          pillars: [
            { title: 'Senior-Led Delivery', description: 'Every engagement is led by experienced consultants, not delegated to juniors.' },
            { title: 'Sector Expertise', description: 'Deep knowledge of financial services, healthcare, energy, and manufacturing sectors.' },
            { title: 'Pragmatic Solutions', description: 'Frameworks that work in practice, not just in theory or presentations.' },
            { title: 'Transparent Pricing', description: 'Clear, fixed-fee proposals so you always know what you are investing.' },
          ],
        },
        {
          blockType: 'featuredTestimonial',
          quote: 'Consilium helped us move from a spreadsheet-led risk register to a framework the board actually uses in decision meetings.',
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
            { title: 'Discovery', description: 'We listen first. Understanding your organisation, objectives, and current risk landscape.' },
            { title: 'Assessment', description: 'Structured analysis of your risk environment, identifying gaps and priorities.' },
            { title: 'Design', description: 'Developing tailored frameworks, policies, and tools for your context.' },
            { title: 'Implementation', description: 'Working alongside your teams to embed new practices and build capability.' },
            { title: 'Review', description: 'Ongoing support to monitor effectiveness and ensure continuous improvement.' },
          ],
        },
        {
          blockType: 'servicesOverview',
          title: 'Our Services',
          subtitle: 'Comprehensive risk advisory solutions tailored to your organisation',
          services: [
            { title: 'Enterprise Risk Management', shortDescription: 'Comprehensive risk management frameworks tailored to your strategic objectives.', slug: 'enterprise-risk-management' },
            { title: 'Regulatory Compliance', shortDescription: 'Navigate complex regulatory landscapes with confidence.', slug: 'regulatory-compliance' },
            { title: 'Operational Resilience', shortDescription: 'Build resilient operations that deliver critical services.', slug: 'operational-resilience' },
            { title: 'Cyber Risk Advisory', shortDescription: 'Protect digital assets with a risk-informed approach.', slug: 'cyber-risk-advisory' },
            { title: 'Internal Audit', shortDescription: 'Independent assurance and advisory services.', slug: 'internal-audit' },
            { title: 'Strategic Risk Consulting', shortDescription: 'Align risk management with corporate strategy.', slug: 'strategic-risk-consulting' },
          ],
        },
        {
          blockType: 'whyChooseUs',
          title: 'Why Choose Consilium?',
          highlights: [
            { icon: 'user', title: 'Proven Expertise', description: 'Decades of combined experience across risk management disciplines' },
            { icon: 'settings', title: 'Tailored Solutions', description: "Bespoke frameworks designed for your organisation's unique needs" },
            { icon: 'target', title: 'UK Market Focus', description: 'Deep understanding of the UK regulatory and business landscape' },
            { icon: 'check', title: 'Pragmatic Approach', description: 'Practical, actionable advice that delivers measurable results' },
          ],
        },
        {
          blockType: 'homeFaq',
          tagline: 'FAQ',
          title: 'Common questions',
          description: 'Straight answers on how we engage — before you pick up the phone.',
          faqs: [
            { question: 'What types of organisations do you work with?', answer: 'We work with organisations of all sizes across multiple sectors, including financial services, healthcare, energy, manufacturing, and professional services.' },
            { question: 'How long does a typical engagement last?', answer: 'A focused risk assessment might take 4-6 weeks, while a comprehensive framework implementation could span 3-6 months.' },
            { question: 'Do you offer ongoing support?', answer: 'Yes. Many clients retain us for ongoing advisory support, periodic reviews, or co-sourced internal audit arrangements.' },
            { question: 'How do you price your services?', answer: 'We offer transparent, fixed-fee proposals based on a clear scope of work. No hidden charges.' },
            { question: 'What makes Consilium different?', answer: 'Every engagement is led by senior consultants with deep expertise — not delegated to junior staff.' },
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
          description: 'Contact us today for a no-obligation consultation with one of our senior risk advisors.',
          buttonLabel: 'Book a Consultation',
          buttonHref: '/book-consultation',
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
        description: 'Professional risk advisory and management services for UK businesses.',
      },
    }),
  }).then(r => r.json())
  console.log('Home updated:', homeRes.doc?.id || JSON.stringify(homeRes.errors?.[0]?.message))

  // Create About page
  console.log('Creating About page...')
  const aboutRes = await fetch(`${BASE}/pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({
      title: 'About Us',
      slug: 'about',
      _status: 'published',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'content',
          columns: [{
            size: 'full',
            richText: richText(
              heading('h2', text('About Consilium Risk Advisory Group')),
              paragraph(text('Consilium Risk Advisory Group was founded by experienced risk professionals with a shared belief: that effective risk management should be practical, proportionate, and tailored to each organisation\'s unique circumstances. Based in the United Kingdom, we bring decades of combined expertise to help businesses navigate an increasingly complex risk landscape.')),
              paragraph(text('We serve organisations across a broad range of sectors, from financial services and energy to the public sector and beyond. Our team draws on real-world experience in enterprise risk management, regulatory compliance, operational resilience, and governance to deliver advisory services that make a measurable difference.')),
              paragraph(text('What sets Consilium apart is our commitment to a pragmatic approach. We don\'t deal in abstract frameworks or generic templates. We work closely with our clients to understand their specific challenges, build bespoke risk strategies, and embed lasting capability within their teams.')),
            ),
          }],
        },
        {
          blockType: 'trustMetrics',
          tagline: 'Our track record',
          title: 'Consilium in numbers',
          pillars: [
            { title: '20+ Years', description: 'Combined experience in risk management advisory' },
            { title: '100+ Clients', description: 'Organisations served across the UK' },
            { title: '6 Core Services', description: 'Comprehensive risk advisory disciplines' },
            { title: '100% Senior-Led', description: 'Every engagement led by experienced consultants' },
          ],
        },
        {
          blockType: 'teamGrid',
          title: 'Meet Our Team',
          subtitle: 'Our people are our greatest strength. Each member brings deep expertise and a genuine commitment to helping clients succeed.',
          members: [
            { name: 'James Harrington', role: 'Founder & CEO', bio: 'James founded Consilium with a vision to bring world-class risk advisory to organisations of all sizes. With over twenty years of experience spanning financial services, energy, and the public sector, he is a recognised thought leader in enterprise risk management and governance.' },
            { name: 'Sarah Mitchell', role: 'Director of Risk Advisory', bio: 'Sarah leads Consilium\'s risk advisory practice, bringing deep expertise in regulatory compliance, operational resilience, and ISO 31000 implementation. She has advised some of the UK\'s largest financial institutions.' },
            { name: 'David Chen', role: 'Head of Compliance', bio: 'David oversees Consilium\'s compliance advisory services, helping clients navigate complex regulatory landscapes. His background in both legal and risk disciplines gives him a unique perspective on building effective compliance programmes.' },
            { name: 'Emma Richardson', role: 'Senior Consultant', bio: 'Emma is a skilled risk and audit professional with particular expertise in cyber risk, internal audit, and third-party risk management. She delivers pragmatic solutions that strengthen governance.' },
          ],
        },
        {
          blockType: 'content',
          columns: [{
            size: 'full',
            richText: richText(
              heading('h2', text('Our Mission & Values')),
              paragraph(text('Our mission is to empower organisations with the insight, frameworks, and confidence they need to manage risk effectively and make better decisions. We believe that sound risk management is not a barrier to growth — it is the foundation of it.')),
            ),
          }],
        },
        {
          blockType: 'whyChooseUs',
          title: 'Our Values',
          highlights: [
            { icon: 'shield', title: 'Integrity', description: 'We act with honesty and transparency in every engagement, building trust through ethical practice and impartial advice.' },
            { icon: 'award', title: 'Excellence', description: 'We hold ourselves to the highest professional standards, delivering rigorous analysis and actionable recommendations.' },
            { icon: 'user', title: 'Collaboration', description: 'We work as an extension of our clients\' teams, fostering open dialogue and shared ownership of outcomes.' },
            { icon: 'globe', title: 'Innovation', description: 'We continuously evolve our methods and thinking to help clients stay ahead of emerging risks and opportunities.' },
          ],
        },
        {
          blockType: 'finalCta',
          title: 'Ready to Work With Us?',
          description: 'Get in touch to discuss how Consilium can help your organisation manage risk more effectively.',
          buttonLabel: 'Book a Consultation',
          buttonHref: '/book-consultation',
        },
      ],
      meta: {
        title: 'About Us | Consilium Risk Advisory Group',
        description: 'Learn about Consilium Risk Advisory Group — our team, our mission, and our values.',
      },
    }),
  }).then(r => r.json())
  console.log('About:', aboutRes.doc?.id || JSON.stringify(aboutRes.errors || aboutRes))
}

main().catch(console.error)
