import type { Block } from 'payload'

export const FloatingSocial: Block = {
  slug: 'floatingSocial',
  interfaceName: 'FloatingSocialBlock',
  labels: {
    singular: 'Floating Social',
    plural: 'Floating Socials',
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Email', value: 'email' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Phone', value: 'phone' },
          ],
        },
      ],
    },
    {
      name: 'enableShare',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable share button',
    },
  ],
}
