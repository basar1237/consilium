import React from 'react'
import Link from 'next/link'
import type { EnterpriseShowcaseBlock, Media } from '@/payload-types'

export const EnterpriseShowcaseBlockComponent: React.FC<EnterpriseShowcaseBlock> = ({
  title,
  backgroundImage,
  cards,
}) => {
  const bgUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? (backgroundImage as Media).url
      : '/consiliyum-services-bg.webp'

  return (
    <section id="enterprise" className="relative isolate overflow-hidden bg-zinc-50 text-[#1A1A2E]">
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <h3 className="text-center text-2xl font-bold tracking-tight text-[#1A1A2E] sm:text-3xl md:text-4xl">
          {title}
        </h3>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(cards || []).map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="group relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden rounded-xl p-5 text-left text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] sm:min-h-[260px] md:p-6"
            >
              <div
                className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${bgUrl}')` }}
                aria-hidden
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/35"
                aria-hidden
              />
              <h4 className="relative text-base font-bold leading-snug sm:text-lg">{card.title}</h4>
              <p className="relative mt-2 text-sm leading-relaxed text-white/90">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
