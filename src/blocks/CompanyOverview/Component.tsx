import React from 'react'
import RichText from '@/components/RichText'
import type { CompanyOverviewBlock } from '@/payload-types'

export const CompanyOverviewBlockComponent: React.FC<CompanyOverviewBlock> = ({
  title,
  body,
  stats,
}) => {
  const accents = [
    'from-[#2B7DE9] to-[#1a5fc4]',
    'from-[#2B7DE9] to-[#6c5ce7]',
    'from-[#2B7DE9] to-[#00b894]',
  ]

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>

        {body && (
          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-8 text-zinc-600">
            <RichText data={body} enableGutter={false} />
          </div>
        )}

        {stats && stats.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B7DE9]/10"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[i % accents.length]}`} />
                <p className="text-4xl font-bold text-[#1A1A2E]">{stat.value}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
