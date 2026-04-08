import React from 'react'
import Link from 'next/link'
import type { FeaturedTestimonialBlock } from '@/payload-types'

export const FeaturedTestimonialBlockComponent: React.FC<FeaturedTestimonialBlock> = ({
  quote,
  authorRole,
  authorOrganisation,
  rating,
  ctaLabel,
  ctaHref,
}) => {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A2E] via-[#1f2340] to-[#252b4a] px-8 py-12 shadow-2xl shadow-[#1A1A2E]/20 md:px-14 md:py-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2B7DE9]/20 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <span className="text-3xl text-[#2B7DE9]">&ldquo;</span>
                <blockquote className="mt-2 text-xl font-medium leading-relaxed text-white md:text-2xl md:leading-snug">
                  {quote}
                </blockquote>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {rating && (
                    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                      {Array.from({ length: rating }).map((_, i) => (
                        <span key={i} className="text-amber-400">
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="h-4 w-px bg-white/20" aria-hidden />
                  <div>
                    {authorRole && <p className="font-semibold text-white">{authorRole}</p>}
                    {authorOrganisation && (
                      <p className="text-sm text-white/60">{authorOrganisation}</p>
                    )}
                  </div>
                </div>
              </div>

              {ctaLabel && ctaHref && (
                <div className="shrink-0 lg:pt-2">
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#2B7DE9] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl"
                  >
                    {ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
