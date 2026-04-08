import type { Block } from 'payload'

export const ContactSection: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Contact Us',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue:
        "We'd love to hear from you. Reach out to discuss your risk management needs.",
    },
    {
      name: 'formTitle',
      type: 'text',
      defaultValue: 'Send Us a Message',
    },
    {
      name: 'contactInfoTitle',
      type: 'text',
      defaultValue: 'Contact Information',
    },
    {
      name: 'contactDetails',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        {
          name: 'href',
          type: 'text',
          admin: { description: 'Optional link (e.g. mailto: or tel:)' },
        },
      ],
    },
    {
      name: 'ctaTitle',
      type: 'text',
      defaultValue: 'Ready to Get Started?',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      defaultValue:
        'Book a free consultation to discuss how we can help your organisation manage risk effectively.',
    },
    {
      name: 'ctaButtonLabel',
      type: 'text',
      defaultValue: 'Book a Consultation',
    },
    {
      name: 'ctaButtonHref',
      type: 'text',
      defaultValue: '/book-consultation',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'basaryldrm1237@gmail.com',
      admin: { description: 'Email address for the mailto link on form submit' },
    },
  ],
}
