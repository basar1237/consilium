import React from 'react'
import type { ConsultationFormBlock } from '@/payload-types'

export const ConsultationFormBlockComponent: React.FC<ConsultationFormBlock> = ({
  title,
  description,
  email,
}) => {
  const consultationEmail = email || 'basaryldrm1237@gmail.com'

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">{title}</h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">{description}</p>
          )}
          <form className="mt-10 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Full name *</label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-[#2B7DE9] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2B7DE9]/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Work email *</label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-[#2B7DE9] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2B7DE9]/10"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Organisation *</label>
                <input
                  type="text"
                  placeholder="Company or institution"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-[#2B7DE9] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2B7DE9]/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Phone (optional)</label>
                <input
                  type="tel"
                  placeholder="+44 …"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-[#2B7DE9] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2B7DE9]/10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">Job title (optional)</label>
              <input
                type="text"
                placeholder="e.g. Head of Risk"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-[#2B7DE9] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2B7DE9]/10"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                What are you looking to achieve? *
              </label>
              <p className="mb-2 text-xs text-zinc-500">
                Briefly describe your current risk management setup, challenges, or goals.
              </p>
              <textarea
                rows={5}
                placeholder="e.g. We are aligning with ISO 31000, need help with risk appetite and reporting to the board…"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-[#2B7DE9] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2B7DE9]/10"
              />
            </div>
            <a
              href={`mailto:${consultationEmail}?subject=Consultation%20Request`}
              className="inline-block rounded-xl bg-gradient-to-r from-[#2B7DE9] to-[#1a5fc4] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#2B7DE9]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2B7DE9]/30"
            >
              Request consultation →
            </a>
          </form>
        </div>
      </div>
    </section>
  )
}
