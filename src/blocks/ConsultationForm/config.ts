import type { Block } from 'payload'

export const ConsultationForm: Block = {
  slug: 'consultationForm',
  interfaceName: 'ConsultationFormBlock',
  labels: {
    singular: 'Consultation Form',
    plural: 'Consultation Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Book a free risk consultation',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Tell us about your organisation and risk management priorities. We will review your request and get back to you to arrange a no-obligation conversation with a senior advisor.',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'basaryldrm1237@gmail.com',
      admin: { description: 'Email address that consultation requests are sent to' },
    },
  ],
}
