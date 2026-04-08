import type { Block } from 'payload'

export const InsightTabs: Block = {
  slug: 'insightTabs',
  interfaceName: 'InsightTabsBlock',
  labels: {
    singular: 'Insight Tabs',
    plural: 'Insight Tabs',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Our Perspective',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Understanding risk management',
    },
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'heading', type: 'text', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional image shown on the left side of the tab content' },
        },
        {
          name: 'points',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
}
