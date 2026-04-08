import type { Block } from 'payload'

export const HowWeWork: Block = {
  slug: 'howWeWork',
  interfaceName: 'HowWeWorkBlock',
  labels: {
    singular: 'How We Work',
    plural: 'How We Work',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Our approach',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'How we work with you',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'A clear, five-stage engagement model—transparent at each step, so you always know what happens next and why it matters.',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
