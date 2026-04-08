import type { Block } from 'payload'

export const WhyChooseUs: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  labels: {
    singular: 'Why Choose Us',
    plural: 'Why Choose Us',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Why Choose Consilium?',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'highlights',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'check',
          options: [
            { label: 'User / Expertise', value: 'user' },
            { label: 'Settings / Tailored', value: 'settings' },
            { label: 'Target / Focus', value: 'target' },
            { label: 'Checklist / Pragmatic', value: 'check' },
            { label: 'Shield / Security', value: 'shield' },
            { label: 'Chart / Growth', value: 'chart' },
            { label: 'Globe / Global', value: 'globe' },
            { label: 'Award / Quality', value: 'award' },
          ],
          admin: {
            description: 'Select an icon for this highlight',
          },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
    },
  ],
}
