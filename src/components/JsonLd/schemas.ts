import { getServerSideURL } from '@/utilities/getURL'

const SITE_NAME = 'Consilium Risk Advisory Group'
const DEFAULT_DESCRIPTION =
  'Consilium Risk Advisory Group — trusted UK experts in enterprise risk management, ISO 31000, compliance, and operational resilience.'
const CONTACT_EMAIL = 'info@consiliumriskadvisorygroup.co.uk'

export const getOrganizationSchema = () => {
  const siteUrl = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
      width: 917,
      height: 319,
    },
    image: `${siteUrl}/og-image.webp`,
    description: DEFAULT_DESCRIPTION,
    email: CONTACT_EMAIL,
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    knowsAbout: [
      'Enterprise Risk Management',
      'ISO 31000',
      'Regulatory Compliance',
      'Operational Resilience',
      'Governance',
      'Risk Advisory',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
  }
}

export const getWebSiteSchema = () => {
  const siteUrl = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en-GB',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export const getBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
) => {
  const siteUrl = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  }
}

export const getServiceSchema = (opts: {
  name: string
  description?: string
  slug: string
  image?: string
}) => {
  const siteUrl = getServerSideURL()
  const url = `${siteUrl}/services/${opts.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url,
    image: opts.image,
    serviceType: opts.name,
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  }
}

export const getArticleSchema = (opts: {
  title: string
  description?: string
  slug: string
  image?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
}) => {
  const siteUrl = getServerSideURL()
  const url = `${siteUrl}/perspectives/${opts.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: opts.authorName
      ? {
          '@type': 'Person',
          name: opts.authorName,
        }
      : {
          '@id': `${siteUrl}/#organization`,
        },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}
