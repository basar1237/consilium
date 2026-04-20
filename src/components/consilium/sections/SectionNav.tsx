'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'services-hub', label: 'Services' },
  { id: 'how-we-work', label: 'How We Work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'faq', label: 'FAQ' },
  { id: 'blog', label: 'Perspectives' },
] as const

export default function SectionNav() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="sticky md:top-24 top-21 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide md:justify-start justify-center sm:gap-2 md:py-3 py-2">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex shrink-0 items-center cursor-pointer gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 sm:px-4 sm:py-2 ${
                active === id
                  ? 'bg-[#2B7DE9] text-white shadow-sm'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-[#2B7DE9]'
              }`}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
