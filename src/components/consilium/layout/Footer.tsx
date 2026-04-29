import Link from 'next/link'
import Image from 'next/image'
import type { Footer as FooterType, Media } from '@/payload-types'

type Props = {
  data: FooterType
}

export default function ConsiliumFooter({ data }: Props) {
  const logo = data?.logo as Media | undefined
  const navItems = data?.navItems || []
  const socialLinks = data?.socialLinks || []

  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/">
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || 'Consilium Risk Advisory Group'}
                  width={1000}
                  height={1000}
                  className="h-15 w-auto rounded-lg md:h-18"
                />
              ) : (
                <Image
                  src="/logo.png"
                  alt="Consilium Risk Advisory Group"
                  width={1000}
                  height={1000}
                  className="h-15 w-auto rounded-lg md:h-18"
                />
              )}
            </Link>
            {data?.companyDescription && (
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                {data.companyDescription}
              </p>
            )}
            {socialLinks.length > 0 && (
              <div className="mt-6 flex justify-center gap-3 md:justify-start">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white transition-colors hover:bg-[#2B7DE9]"
                    aria-label={social.label}
                  >
                    {social.icon || social.label?.[0]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              {data?.quickLinksTitle || 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-[#2B7DE9]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              {data?.contactTitle || 'Contact'}
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              {data?.email && (
                <li>
                  <a
                    href={`mailto:${data.email}`}
                    className="transition-colors hover:text-[#2B7DE9]"
                  >
                    {data.email}
                  </a>
                </li>
              )}
              {data?.phone && <li>{data.phone}</li>}
              {data?.address && <li>{data.address}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          {data?.copyrightText || '© 2026 Consilium Risk Advisory Group. All rights reserved.'}
        </div>
      </div>
    </footer>
  )
}
