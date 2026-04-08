import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { ConsiliumHero } from '../../blocks/ConsiliumHero/config'
import { QuickServiceHub } from '../../blocks/QuickServiceHub/config'
import { TrustMetrics } from '../../blocks/TrustMetrics/config'
import { FeaturedTestimonial } from '../../blocks/FeaturedTestimonial/config'
import { HowWeWork } from '../../blocks/HowWeWork/config'
import { WhyChooseUs } from '../../blocks/WhyChooseUs/config'
import { HomeFAQ } from '../../blocks/HomeFAQ/config'
import { BlogPreview } from '../../blocks/BlogPreview/config'
import { FinalCTA } from '../../blocks/FinalCTA/config'
import { InsightTabs } from '../../blocks/InsightTabs/config'
import { EnterpriseShowcase } from '../../blocks/EnterpriseShowcase/config'
import { ServicesOverview } from '../../blocks/ServicesOverview/config'
import { SectionNav } from '../../blocks/SectionNav/config'
import { FloatingSocial } from '../../blocks/FloatingSocial/config'
import { TestimonialsGrid } from '../../blocks/TestimonialsGrid/config'
import { TeamGrid } from '../../blocks/TeamGrid/config'
import { CompanyOverview } from '../../blocks/CompanyOverview/config'
import { ContactSection } from '../../blocks/ContactSection/config'
import { ConsultationForm } from '../../blocks/ConsultationForm/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                ConsiliumHero,
                QuickServiceHub,
                TrustMetrics,
                FeaturedTestimonial,
                HowWeWork,
                WhyChooseUs,
                HomeFAQ,
                BlogPreview,
                FinalCTA,
                InsightTabs,
                EnterpriseShowcase,
                ServicesOverview,
                SectionNav,
                FloatingSocial,
                TestimonialsGrid,
                TeamGrid,
                CompanyOverview,
                ContactSection,
                ConsultationForm,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
