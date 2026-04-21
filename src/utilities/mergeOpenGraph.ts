import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Consilium Risk Advisory Group — trusted UK experts in enterprise risk management, ISO 31000, compliance, and operational resilience.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.webp`,
    },
  ],
  siteName: 'Consilium Risk Advisory Group',
  title: 'Consilium Risk Advisory Group | UK Risk Management Experts',
  locale: 'en_GB',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
