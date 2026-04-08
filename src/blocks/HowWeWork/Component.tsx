import React from 'react'
import type { HowWeWorkBlock } from '@/payload-types'

export const HowWeWorkBlockComponent: React.FC<HowWeWorkBlock> = ({
  tagline,
  title,
  description,
  steps,
}) => {
  return (
    <section id="how-we-work" className="relative overflow-hidden bg-white py-20">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {tagline && (
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
              {tagline}
            </p>
          )}
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">{description}</p>
          )}
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <ul className="space-y-10 md:space-y-12">
            {(steps || []).map((item, i) => (
              <li key={i} className="relative flex gap-6 md:gap-8">
                <div className="flex shrink-0 flex-col items-center md:w-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2B7DE9] to-[#1a5fc4] text-sm font-bold text-white shadow-md shadow-[#2B7DE9]/25 ring-4 ring-white">
                    {i + 1}
                  </div>
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-6 shadow-sm transition-shadow duration-300 hover:border-[#2B7DE9]/20 hover:shadow-md md:p-8">
                  <h3 className="text-xl font-semibold text-[#1A1A2E]">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-zinc-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
