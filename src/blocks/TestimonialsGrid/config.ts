import type { Block } from 'payload'

export const TestimonialsGrid: Block = {
  slug: 'testimonialsGrid',
  interfaceName: 'TestimonialsGridBlock',
  labels: {
    singular: 'Testimonials Grid',
    plural: 'Testimonials Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Trusted by organisations across the UK for risk advisory and management services',
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
