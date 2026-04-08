import type { Block } from 'payload'

export const TeamGrid: Block = {
  slug: 'teamGrid',
  interfaceName: 'TeamGridBlock',
  labels: {
    singular: 'Team Grid',
    plural: 'Team Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Meet Our Team',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'members',
      type: 'array',
      minRows: 1,
      fields: [
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
          name: 'bio',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
