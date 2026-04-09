import type { Block } from 'payload'

export const EnterpriseShowcase: Block = {
  slug: 'enterpriseShowcase',
  interfaceName: 'EnterpriseShowcaseBlock',
  labels: {
    singular: 'Enterprise Services Showcase',
    plural: 'Enterprise Services Showcases',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Comprehensive Enterprise Risk Management Services',
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'This card’s background photo (each card can use a different image).',
          },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
