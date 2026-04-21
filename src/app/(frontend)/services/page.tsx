import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Services | Consilium Risk Advisory Group',
  description:
    'Explore our full range of risk advisory services including ISO 31000 risk management, compliance, operational resilience, and governance consulting.',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: 'title',
    where: {
      slug: { contains: 'service-' },
    },
  })

  const services = pages.docs.map((page) => ({
    title: page.title,
    slug: page.slug?.replace('service-', '') || '',
    description: page.meta?.description || '',
  }))

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Comprehensive risk advisory solutions tailored to your organisation
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2B7DE9]/40 hover:shadow-lg hover:shadow-[#2B7DE9]/10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2B7DE9]/10 text-xl font-bold text-[#2B7DE9] transition-colors duration-200 group-hover:bg-[#2B7DE9] group-hover:text-white">
                {service.title?.[0]}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-[#1A1A2E] transition-colors group-hover:text-[#2B7DE9]">
                {service.title}
              </h2>
              {service.description && (
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                  {service.description}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2B7DE9] transition-all duration-200 group-hover:gap-2">
                Learn more <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>

        {services.length === 0 && (
          <p className="mt-14 text-center text-zinc-500">
            No services available yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  )
}
