import React from 'react'
import Link from 'next/link'
import type { FinalCtaBlock } from '@/payload-types'

export const FinalCtaBlockComponent: React.FC<FinalCtaBlock> = ({
  title,
  description,
  buttonLabel,
  buttonHref,
  variant,
}) => {
  if (variant === 'card') {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#2B7DE9]/20 bg-[#2B7DE9]/5 p-8 text-center">
            <h3 className="text-xl font-bold text-[#1A1A2E]">{title}</h3>
            {description && <p className="mt-2 text-zinc-600">{description}</p>}
            {buttonLabel && buttonHref && (
              <div className="mt-6">
                <Link
                  href={buttonHref}
                  className="inline-block rounded-xl bg-gradient-to-r from-[#2B7DE9] to-[#1a5fc4] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#2B7DE9]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2B7DE9]/30"
                >
                  {buttonLabel}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#1f2340] to-[#252b4a] py-20 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2B7DE9]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#2B7DE9]/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {description && <p className="mt-6 text-lg leading-8 text-white/70">{description}</p>}
        {buttonLabel && buttonHref && (
          <div className="mt-10">
            <Link
              href={buttonHref}
              className="inline-block rounded-xl bg-white px-8 py-4 font-semibold text-[#2B7DE9] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl"
            >
              {buttonLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
