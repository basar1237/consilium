import type { Block } from 'payload'

export const TrustMetrics: Block = {
  slug: 'trustMetrics',
  interfaceName: 'TrustMetricsBlock',
  labels: {
    singular: 'Trust Metrics Strip',
    plural: 'Trust Metrics Strips',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Why teams work with us',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Credible delivery, without the noise',
    },
    {
      name: 'pillars',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
