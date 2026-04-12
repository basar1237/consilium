import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Consilium Risk Advisory Group',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'info@consiliumriskadvisorygroup.co.uk',
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          defaultValue: 'https://www.linkedin.com/company/consilium-risk-advisory-group',
        },
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://www.facebook.com/consiliumriskadvisory',
        },
      ],
    },
  ],
}
