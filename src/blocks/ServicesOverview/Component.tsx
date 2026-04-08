import React from 'react'
import Link from 'next/link'
import type { ServicesOverviewBlock } from '@/payload-types'

export const ServicesOverviewBlockComponent: React.FC<ServicesOverviewBlock> = ({
  title,
  subtitle,
  services,
}) => {
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-zinc-600">{subtitle}</p>}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(services || []).map((service, i) => (
            <Link
              key={service.slug || i}
              href={`/services/${service.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:border-[#2B7DE9] hover:shadow-lg"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B7DE9]/10 text-lg font-bold text-[#2B7DE9]">
                {service.title?.[0]}
              </span>
              <h3 className="text-xl font-semibold text-[#1A1A2E] transition-colors group-hover:text-[#2B7DE9]">
                {service.title}
              </h3>
              <p className="mt-2 leading-relaxed text-zinc-600">{service.shortDescription}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
