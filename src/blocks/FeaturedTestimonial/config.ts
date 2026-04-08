import type { Block } from 'payload'

export const FeaturedTestimonial: Block = {
  slug: 'featuredTestimonial',
  interfaceName: 'FeaturedTestimonialBlock',
  labels: {
    singular: 'Featured Testimonial',
    plural: 'Featured Testimonials',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      defaultValue:
        'Consilium helped us move from a spreadsheet-led risk register to a framework the board actually uses in decision meetings. The work was thorough, proportionate, and grounded in our regulatory context.',
    },
    {
      name: 'authorRole',
      type: 'text',
      defaultValue: 'Director of Risk & Compliance',
    },
    {
      name: 'authorOrganisation',
      type: 'text',
      defaultValue: 'UK financial services organisation',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Read more client feedback',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/testimonials',
    },
  ],
}
