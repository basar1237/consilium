import type { Block } from 'payload'

export const SectionNav: Block = {
  slug: 'sectionNav',
  interfaceName: 'SectionNavBlock',
  labels: {
    singular: 'Section Navigation',
    plural: 'Section Navigations',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'anchorId', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'layers',
          options: [
            { label: 'Layers / Services', value: 'layers' },
            { label: 'Lightbulb / Insights', value: 'lightbulb' },
            { label: 'Building / Enterprise', value: 'building' },
            { label: 'Shield / Trust', value: 'shield' },
            { label: 'Quote / Testimonials', value: 'quote' },
            { label: 'Workflow / How We Work', value: 'workflow' },
            { label: 'Grid / Overview', value: 'grid' },
            { label: 'Award / Why Us', value: 'award' },
            { label: 'HelpCircle / FAQ', value: 'help' },
            { label: 'Newspaper / Blog', value: 'newspaper' },
            { label: 'Mail / Contact', value: 'mail' },
          ],
          admin: { description: 'Icon shown next to the label' },
        },
      ],
    },
  ],
}
