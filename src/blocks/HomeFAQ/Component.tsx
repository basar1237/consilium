'use client'

import React from 'react'
import type { HomeFaqBlock } from '@/payload-types'

export const HomeFaqBlockComponent: React.FC<HomeFaqBlock> = ({
  tagline,
  title,
  description,
  faqs,
}) => {
  return (
    <section id="faq" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {tagline && (
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
              {tagline}
            </p>
          )}
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-lg text-zinc-600">{description}</p>}
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {(faqs || []).map((faq, i) => (
            <details
              key={i}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 open:border-[#2B7DE9]/30 open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[#1A1A2E] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="pr-2">{faq.question}</span>
                <span className="shrink-0 text-[#2B7DE9] transition-transform duration-200 group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="border-t border-zinc-100 px-5 pb-5 pt-3 leading-relaxed text-zinc-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
