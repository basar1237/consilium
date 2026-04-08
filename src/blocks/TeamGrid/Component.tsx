import React from 'react'

type Member = {
  name: string
  role: string
  bio: string
}

type Props = {
  title?: string | null
  subtitle?: string | null
  members?: Member[] | null
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export const TeamGridBlockComponent: React.FC<Props> = ({ title, subtitle, members }) => {
  if (!members || members.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-20">
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#2B7DE9]/5 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">Our People</p>
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-zinc-600">{subtitle}</p>
            )}
          </div>
        )}

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-zinc-200/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2B7DE9]/30 hover:shadow-xl hover:shadow-[#2B7DE9]/10"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#2B7DE9] to-[#1a5fc4] text-2xl font-bold text-white shadow-lg shadow-[#2B7DE9]/25 ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
                {getInitials(member.name)}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#1A1A2E]">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#2B7DE9]">{member.role}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
