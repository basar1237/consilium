import React from 'react'
import Link from 'next/link'
import type { EnterpriseShowcaseBlock, Media } from '@/payload-types'

/** When no CMS image is set, each index gets a distinct crop from project assets. */
const FALLBACK_BACKGROUNDS: { url: string; position: string }[] = [
  { url: '/consiliyum-services-bg.webp', position: 'center top' },
  { url: '/consiliyum-hero-bg.webp', position: 'center center' },
  { url: '/consiliyum-services-bg.webp', position: 'center bottom' },
  { url: '/consiliyum-hero-bg.webp', position: 'right center' },
]

function cardBackgroundUrl(
  card: NonNullable<EnterpriseShowcaseBlock['cards']>[number],
  index: number,
): { url: string; position: string } {
  const img = card.backgroundImage
  if (img && typeof img === 'object') {
    const url = (img as Media).url
    if (url) return { url, position: 'center center' }
  }
  const fb = FALLBACK_BACKGROUNDS[index % FALLBACK_BACKGROUNDS.length]
  return fb
}

export const EnterpriseShowcaseBlockComponent: React.FC<EnterpriseShowcaseBlock> = ({
  title,
  cards,
}) => {
  return (
    <section id="enterprise" className="relative isolate overflow-hidden bg-zinc-50 text-[#1A1A2E]">
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <h3 className="text-center text-2xl font-bold tracking-tight text-[#1A1A2E] sm:text-3xl md:text-4xl">
          {title}
        </h3>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(cards || []).map((card, i) => {
            const { url: bgUrl, position: bgPosition } = cardBackgroundUrl(card, i)
            return (
              <Link
                key={card.id ?? i}
                href={card.href}
                className="group relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden rounded-xl p-5 text-left text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] sm:min-h-[260px] md:p-6"
              >
                <div
                  className="absolute inset-0 -z-20 bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${bgUrl}')`,
                    backgroundPosition: bgPosition,
                  }}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
