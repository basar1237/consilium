import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import ConsiliumHeader from '@/components/consilium/layout/Header'
import ConsiliumFooter from '@/components/consilium/layout/Footer'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { JsonLd } from '@/components/JsonLd'
import { getOrganizationSchema, getWebSiteSchema } from '@/components/JsonLd/schemas'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Clarity } from '@/components/Clarity'

import type { Header as HeaderType, Footer as FooterType } from '@/payload-types'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerData: HeaderType = await getCachedGlobal('header', 1)()
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const favicon = typeof headerData?.favicon === 'object' && headerData.favicon !== null ? headerData.favicon : null
  const faviconUrl = favicon?.url

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en-GB" data-theme="light" suppressHydrationWarning>
      <head>
        {faviconUrl ? (
          <link href={faviconUrl} rel="icon" type={favicon?.mimeType || 'image/x-icon'} />
        ) : (
          <>
            <link href="/favicon.ico" rel="icon" sizes="32x32" />
            <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          </>
        )}
        <JsonLd id="schema-organization" data={getOrganizationSchema()} />
        <JsonLd id="schema-website" data={getWebSiteSchema()} />
      </head>
      <body>
        <ConsiliumHeader data={headerData} />
        <main className="flex-1">{children}</main>
        <ConsiliumFooter data={footerData} />
        <Clarity />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Consilium Risk Advisory Group | UK Risk Management Experts',
    template: '%s | Consilium Risk Advisory Group',
  },
  description:
    'Consilium Risk Advisory Group — trusted UK experts in enterprise risk management, ISO 31000, compliance, and operational resilience.',
  applicationName: 'Consilium Risk Advisory Group',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
