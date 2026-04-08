import React from 'react'
import Link from 'next/link'
import type { QuickServiceHubBlock } from '@/payload-types'

export const QuickServiceHubBlockComponent: React.FC<QuickServiceHubBlock> = ({
  tagline,
  title,
  description,
  services,
  viewAllLink,
}) => {
  return (
    <section
      id="services-hub"
      className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50/80 to-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            {tagline && (
              <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
                {tagline}
              </p>
            )}
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
              {title}
            </h2>
            {description && <p className="mt-3 text-lg text-zinc-600">{description}</p>}
          </div>
          {viewAllLink?.label && viewAllLink?.href && (
            <Link
              href={viewAllLink.href}
              className="text-sm font-semibold text-[#2B7DE9] underline-offset-4 transition-colors hover:text-[#1a5fc4] hover:underline"
            >
              {viewAllLink.label}
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(services || []).map((service, i) => (
            <Link
              key={service.slug || i}
              href={`/services/${service.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-[#2B7DE9]/20 bg-[#EBF3FE] p-4 py-8 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2B7DE9]/40 hover:bg-[#DCEAFA] hover:shadow-lg hover:shadow-[#2B7DE9]/15"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2B7DE9]/10 text-[#2B7DE9] text-xl font-bold transition-colors duration-200 group-hover:bg-[#2B7DE9] group-hover:text-white">
                {service.title?.[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-[#1A1A2E] transition-colors group-hover:text-[#2B7DE9]">
                  {service.title}
                </span>
                <span className="mt-0.5 line-clamp-2 text-sm text-zinc-500">
                  {service.shortDescription}
                </span>
              </span>
              <span className="text-zinc-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#2B7DE9]">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
