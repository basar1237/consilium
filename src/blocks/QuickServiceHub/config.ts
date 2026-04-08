import type { Block } from 'payload'

export const QuickServiceHub: Block = {
  slug: 'quickServiceHub',
  interfaceName: 'QuickServiceHubBlock',
  labels: {
    singular: 'Quick Service Hub',
    plural: 'Quick Service Hubs',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Find the right support',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Where do you need help?',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Jump straight into the area that matches your challenge—each page outlines how we typically engage and what good looks like.',
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'shortDescription', type: 'text' },
        { name: 'slug', type: 'text', required: true },
      ],
    },
    {
      name: 'viewAllLink',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'View all services overview →' },
        { name: 'href', type: 'text', defaultValue: '/services/enterprise-risk-management' },
      ],
    },
  ],
}
