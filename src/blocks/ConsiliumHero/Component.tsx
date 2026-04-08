import React from 'react'
import Link from 'next/link'
import type { ConsiliumHeroBlock } from '@/payload-types'
import type { Media } from '@/payload-types'

export const ConsiliumHeroBlockComponent: React.FC<ConsiliumHeroBlock> = ({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
}) => {
  const bgUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? (backgroundImage as Media).url
      : '/consiliyum-hero-bg.webp'

  return (
    <section className="relative isolate overflow-hidden text-white">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgUrl}')` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-black/68 to-white/30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center md:text-left md:max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-blue-100 sm:text-xl">{subtitle}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start">
            {primaryCta?.label && primaryCta?.href && (
              <Link
                href={primaryCta.href}
                className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-[#2B7DE9] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:text-[#1a4f9a]"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta?.label && secondaryCta?.href && (
              <a
                href={secondaryCta.href}
                className="inline-block rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#2B7DE9]"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
