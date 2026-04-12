import type { CollectionConfig } from 'payload'

/** Site iletişim formu — eski “Forms / Form Submissions” eklentisi yok; kayıtlar burada. */
export const ContactEnquiries: CollectionConfig = {
  slug: 'contact-enquiries',
  labels: { singular: 'Contact enquiry', plural: 'Contact enquiries' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'fullName', 'country', 'createdAt'],
    group: 'Website',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'country', type: 'text', required: true },
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'organisation', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
  ],
  timestamps: true,
}
