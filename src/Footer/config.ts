import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'companyDescription',
      type: 'textarea',
      defaultValue:
        'Professional risk advisory and management services based in the United Kingdom. Helping organisations identify, assess, and manage risk effectively.',
    },
    {
      name: 'quickLinksTitle',
      type: 'text',
      defaultValue: 'Quick Links',
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contactTitle',
      type: 'text',
      defaultValue: 'Contact',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2026 Consilium Risk Advisory Group. All rights reserved.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Short text icon (e.g. "in" for LinkedIn, "f" for Facebook)',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
