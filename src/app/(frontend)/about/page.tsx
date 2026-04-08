import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'

export const metadata: Metadata = {
  title: 'About Us | Consilium Risk Advisory Group',
  description: 'Learn about Consilium Risk Advisory Group — our team, our mission, and our values.',
}

export default async function AboutPage() {
  const page = await queryPageBySlug('about')

  if (page?.layout && page.layout.length > 0) {
    return (
      <article>
        <RenderHero {...page.hero} />
        <RenderBlocks blocks={page.layout} />
      </article>
    )
  }

  return <AboutFallback />
}

const fallbackStats = [
  { label: 'Years Experience', value: '20+', accent: 'from-[#2B7DE9] to-[#1a5fc4]' },
  { label: 'Clients Served', value: '100+', accent: 'from-[#2B7DE9] to-[#6c5ce7]' },
  { label: 'Core Services', value: '6', accent: 'from-[#2B7DE9] to-[#00b894]' },
]

const fallbackTeam = [
  {
    name: 'James Harrington',
    role: 'Founding Director',
    bio: 'Over 20 years in enterprise risk management across financial services and energy sectors.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Advisory',
    bio: 'Specialist in regulatory compliance and operational resilience for FTSE 250 companies.',
  },
  {
    name: 'David Chen',
    role: 'Senior Consultant',
    bio: 'Expert in ISO 31000 implementation with experience across public and private sectors.',
  },
  {
    name: 'Emily Watson',
    role: 'Risk Analyst',
    bio: 'Quantitative risk modelling and data-driven risk assessment for complex organisations.',
  },
]

const fallbackValues = [
  {
    title: 'Integrity',
    description: 'We operate with honesty, transparency, and the highest ethical standards.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'We are committed to delivering work of the highest quality, every time.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
        <circle cx="12" cy="8" r="6" />
      </svg>
    ),
  },
  {
    title: 'Pragmatism',
    description: 'We focus on practical, proportionate solutions that deliver real results.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'Partnership',
    description: 'We build lasting relationships based on trust, respect, and shared goals.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

function AboutFallback() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#1f2340] to-[#252b4a] py-24 text-white md:py-32">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#2B7DE9]/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#2B7DE9]/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
              About Us
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Consilium Risk Advisory Group
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Trusted by organisations across the UK to navigate complexity with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-8 text-zinc-600">
            <p>
              at effective risk management should be practical, proportionate, and tailored to each
              organisation&rsquo;s unique circumstances. Based in the United Kingdom, we bring
              decades of combined expertise to help businesses navigate an increasingly complex risk
              landscape.
            </p>
            <p>
              We serve organisations across a broad range of sectors, from financial services and
              energy to the public sector and beyond. Our team draws on real-world experience in
              enterprise risk management, regulatory compliance, operational resilience, and
              governance to deliver advisory services that make a measurable difference.
            </p>
            <p>
              What sets Consilium apart is our commitment to a pragmatic approach. We don&rsquo;t
              deal in abstract frameworks or generic templates. We work closely with our clients to
              understand their specific challenges, build bespoke risk strategies, and embed lasting
              capability within their teams.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {fallbackStats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B7DE9]/10"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`} />
                <p className="text-4xl font-bold text-[#1A1A2E]">{stat.value}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative overflow-hidden bg-zinc-50 py-20">
        <div
          className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#2B7DE9]/5 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
              Our People
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Our people are our greatest strength. Each member brings deep expertise and a genuine
              commitment to helping clients succeed.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fallbackTeam.map((member, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-zinc-200/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2B7DE9]/30 hover:shadow-xl hover:shadow-[#2B7DE9]/10"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#2B7DE9] to-[#1a5fc4] text-2xl font-bold text-white shadow-lg shadow-[#2B7DE9]/25 ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
                  {member.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#1A1A2E]">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#2B7DE9]">{member.role}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
              What We Stand For
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
              Our Mission &amp; Values
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Our mission is to empower organisations with the insight, frameworks, and confidence
              they need to manage risk effectively and make better decisions. We believe that sound
              risk management is not a barrier to growth &mdash; it is the foundation of it.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fallbackValues.map((value) => (
              <div
                key={value.title}
                className="group rounded-2xl border border-zinc-200/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2B7DE9]/30 hover:shadow-xl hover:shadow-[#2B7DE9]/10"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2B7DE9]/10 text-[#2B7DE9] transition-all duration-300 group-hover:bg-[#2B7DE9] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#2B7DE9]/25">
                  {value.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1A1A2E]">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#1f2340] to-[#252b4a] py-20 text-white">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2B7DE9]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#2B7DE9]/15 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Work With Us?</h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Get in touch to discuss how Consilium can help your organisation manage risk more
            effectively.
          </p>
          <div className="mt-10">
            <Link
              href="/book-consultation"
              className="inline-block rounded-xl bg-white px-8 py-4 font-semibold text-[#2B7DE9] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

const queryPageBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
