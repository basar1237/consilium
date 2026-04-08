import type { Block } from 'payload'

export const ConsiliumHero: Block = {
  slug: 'consiliumHero',
  interfaceName: 'ConsiliumHeroBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Navigating Risk, Delivering Confidence',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        'Expert risk advisory and management services for UK businesses. We help organisations identify, assess, and manage risk to protect value and drive sustainable growth.',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Book a Free Consultation' },
        { name: 'href', type: 'text', defaultValue: '/book-consultation' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Explore Our Services' },
        { name: 'href', type: 'text', defaultValue: '#services-hub' },
      ],
    },
  ],
}
