import React from 'react'
import type { ConsultationFormBlock } from '@/payload-types'
import { ContactForm } from '@/components/ContactForm'

export const ConsultationFormBlockComponent: React.FC<ConsultationFormBlock> = ({
  title,
  description,
}) => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">{title}</h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">{description}</p>
          )}
          <div className="mt-10">
            <ContactForm variant="consultation" />
          </div>
        </div>
      </div>
    </section>
  )
}
