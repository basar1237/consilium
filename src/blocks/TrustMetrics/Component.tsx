import React from 'react'
import type { TrustMetricsBlock } from '@/payload-types'

export const TrustMetricsBlockComponent: React.FC<TrustMetricsBlock> = ({
  tagline,
  title,
  pillars,
}) => {
  return (
    <section id="trust" className="relative bg-[#1A1A2E] py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(43,125,233,0.18),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {tagline && (
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
            {tagline}
          </p>
        )}
        <h2 className="mx-auto mt-2 max-w-2xl text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(pillars || []).map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#2B7DE9]/40 hover:bg-white/[0.07]"
            >
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
