import type { Block } from 'payload'

export const ServicesOverview: Block = {
  slug: 'servicesOverview',
  interfaceName: 'ServicesOverviewBlock',
  labels: {
    singular: 'Services Overview',
    plural: 'Services Overviews',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Services',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Comprehensive risk advisory solutions tailored to your organisation',
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'shortDescription', type: 'textarea' },
        { name: 'slug', type: 'text', required: true },
      ],
    },
  ],
}
