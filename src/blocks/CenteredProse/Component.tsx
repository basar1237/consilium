import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import type { CenteredProseBlock } from '@/payload-types'

/**
 * Sınıf adlarını doğrudan JSX’te yazıyoruz; Tailwind v4 scanner değişkenle
 * geçirilen `max-w-*` string’lerini bazen CSS’e dahil etmiyor (hep aynı genişlik gibi görünür).
 */
function maxWidthPresetClass(maxWidth: CenteredProseBlock['maxWidth']): string {
  switch (maxWidth) {
    case 'narrow':
      return 'max-w-lg sm:max-w-xl'
    case 'wide':
      return 'max-w-3xl lg:max-w-4xl'
    case 'xl':
      return 'max-w-4xl lg:max-w-6xl'
    case 'medium':
    default:
      return 'max-w-2xl lg:max-w-3xl'
  }
}

export const CenteredProseBlockComponent: React.FC<CenteredProseBlock> = ({
  content,
  maxWidth,
}) => {
  const widthClasses = maxWidthPresetClass(maxWidth ?? 'medium')

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={cn(
            'mx-auto w-full text-zinc-700 [&_h2]:text-[#1A1A2E] [&_h3]:text-[#1A1A2E] [&_h4]:text-[#1A1A2E]',
            '[&_li]:text-left',
            widthClasses,
          )}
        >
          {content && (
            <RichText
              data={content}
              enableGutter={false}
              className="w-full max-w-none text-base leading-relaxed md:text-lg"
              getLexicalBlockClassName={({ type }) =>
                type === 'heading' ? 'text-center' : 'text-justify'
              }
            />
          )}
        </div>
      </div>
    </section>
  )
}
