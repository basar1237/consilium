'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Header as HeaderType, Media } from '@/payload-types'
import clsx from 'clsx'
import Logo from './Logo'

type Props = {
  data: HeaderType
}

export default function ConsiliumHeader({ data }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = data?.navItems || []
  const ctaButton = data?.ctaButton
  const logo = data?.logo as Media | undefined

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#1A1A2E] transition-colors hover:bg-gray-50 hover:text-[#2B7DE9] md:text-base"
            >
              {item.label}
            </Link>
          ))}
          {ctaButton?.label && ctaButton?.href && (
            <Link
              href={ctaButton.href}
              className="ml-2 inline-block rounded-lg bg-[#2B7DE9] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1a5fc4] hover:shadow-md md:text-base"
            >
              {ctaButton.label}
            </Link>
          )}
        </nav>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block h-0.5 w-6 bg-[#1A1A2E] transition-transform duration-200 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#1A1A2E] transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#1A1A2E] transition-transform duration-200 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-4 py-3 text-base font-medium text-[#1A1A2E] transition-colors hover:bg-gray-50 hover:text-[#2B7DE9]"
                >
                  {item.label}
                </Link>
              ))}
              {ctaButton?.label && ctaButton?.href && (
                <div className="mt-4 border-t pt-4">
                  <Link
                    href={ctaButton.href}
                    onClick={() => setMobileOpen(false)}
                    className="block w-full rounded-lg bg-[#2B7DE9] px-5 py-3 text-center font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1a5fc4]"
                  >
                    {ctaButton.label}
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
