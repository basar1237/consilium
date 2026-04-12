import React from 'react'
import Link from 'next/link'
import type { ContactSectionBlock } from '@/payload-types'
import { ContactForm } from '@/components/ContactForm'

export const ContactSectionBlockComponent: React.FC<ContactSectionBlock> = ({
  title,
  subtitle,
  formTitle,
  contactInfoTitle,
  contactDetails,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonHref,
}) => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 text-lg text-zinc-600">{subtitle}</p>}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold text-[#1A1A2E]">{formTitle}</h2>
              <p className="mt-2 text-sm text-zinc-500">Fill out the form and we&rsquo;ll get back to you shortly.</p>
              <div className="mt-8">
                <ContactForm variant="contact" />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#1A1A2E]">{contactInfoTitle}</h2>
              <div className="mt-6 space-y-6">
                {(contactDetails || []).map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2B7DE9]/10 text-[#2B7DE9]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="mt-0.5 block font-semibold text-[#1A1A2E] transition-colors hover:text-[#2B7DE9]">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-semibold text-[#1A1A2E]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A2E] via-[#1f2340] to-[#252b4a] p-8 text-white shadow-xl">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#2B7DE9]/20 blur-2xl" aria-hidden />
              <h3 className="relative text-xl font-bold">{ctaTitle}</h3>
              {ctaDescription && (
                <p className="relative mt-3 leading-relaxed text-white/70">{ctaDescription}</p>
              )}
              {ctaButtonLabel && ctaButtonHref && (
                <Link
                  href={ctaButtonHref}
                  className="relative mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-[#2B7DE9] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl"
                >
                  {ctaButtonLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
