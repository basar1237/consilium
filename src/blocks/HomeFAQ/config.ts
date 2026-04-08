import type { Block } from 'payload'

export const HomeFAQ: Block = {
  slug: 'homeFaq',
  interfaceName: 'HomeFaqBlock',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'FAQ',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Common questions',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Straight answers on how we engage—before you pick up the phone.',
    },
    {
      name: 'faqs',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}
