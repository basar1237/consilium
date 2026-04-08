import type { Block } from 'payload'

export const FinalCTA: Block = {
  slug: 'finalCta',
  interfaceName: 'FinalCtaBlock',
  labels: {
    singular: 'Final CTA',
    plural: 'Final CTAs',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default (Solid Blue)', value: 'default' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Card (Light)', value: 'card' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Ready to Strengthen Your Risk Management?',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Contact us today for a no-obligation consultation with one of our senior risk advisors.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Book a Consultation',
    },
    {
      name: 'buttonHref',
      type: 'text',
      defaultValue: '/book-consultation',
    },
  ],
}
