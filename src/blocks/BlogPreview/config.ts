import type { Block } from 'payload'

export const BlogPreview: Block = {
  slug: 'blogPreview',
  interfaceName: 'BlogPreviewBlock',
  labels: {
    singular: 'Blog Preview',
    plural: 'Blog Previews',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Latest Insights',
    },
    {
      name: 'postCount',
      type: 'number',
      min: 1,
      max: 12,
      defaultValue: 3,
      admin: {
        description: 'Number of latest posts to display',
      },
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View All Insights →',
    },
  ],
}
