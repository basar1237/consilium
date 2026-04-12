import type { Block } from 'payload'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CenteredProse: Block = {
  slug: 'centeredProse',
  interfaceName: 'CenteredProseBlock',
  labels: {
    singular: 'Centered justified text',
    plural: 'Centered justified text',
  },
  fields: [
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Medium', value: 'medium' },
        { label: 'Wide', value: 'wide' },
        { label: 'Extra wide', value: 'xl' },
      ],
      admin: {
        description: 'Column width (centred; body text is justified).',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            AlignFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Content',
    },
  ],
}
