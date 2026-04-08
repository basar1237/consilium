import React from 'react'

type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
}

type Props = {
  title?: string | null
  subtitle?: string | null
  testimonials?: Testimonial[] | null
}

export const TestimonialsGridBlockComponent: React.FC<Props> = ({ title, subtitle, testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">Testimonials</p>
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 text-lg text-zinc-600">{subtitle}</p>}
          </div>
        )}

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2B7DE9]/30 hover:shadow-xl hover:shadow-[#2B7DE9]/10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2B7DE9] to-[#1a5fc4] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-amber-400">★</span>
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-zinc-600 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2B7DE9] to-[#1a5fc4] text-xs font-bold text-white shadow-sm">
                  {t.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')}
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A2E]">{t.name}</p>
                  <p className="text-sm text-zinc-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
