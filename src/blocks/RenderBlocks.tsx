import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ConsiliumHeroBlockComponent } from '@/blocks/ConsiliumHero/Component'
import { QuickServiceHubBlockComponent } from '@/blocks/QuickServiceHub/Component'
import { TrustMetricsBlockComponent } from '@/blocks/TrustMetrics/Component'
import { FeaturedTestimonialBlockComponent } from '@/blocks/FeaturedTestimonial/Component'
import { HowWeWorkBlockComponent } from '@/blocks/HowWeWork/Component'
import { WhyChooseUsBlockComponent } from '@/blocks/WhyChooseUs/Component'
import { HomeFaqBlockComponent } from '@/blocks/HomeFAQ/Component'
import { BlogPreviewBlockComponent } from '@/blocks/BlogPreview/Component'
import { FinalCtaBlockComponent } from '@/blocks/FinalCTA/Component'
import { InsightTabsBlockComponent } from '@/blocks/InsightTabs/Component'
import { EnterpriseShowcaseBlockComponent } from '@/blocks/EnterpriseShowcase/Component'
import { ServicesOverviewBlockComponent } from '@/blocks/ServicesOverview/Component'
import { SectionNavBlockComponent } from '@/blocks/SectionNav/Component'
import { FloatingSocialBlockComponent } from '@/blocks/FloatingSocial/Component'
import { TestimonialsGridBlockComponent } from '@/blocks/TestimonialsGrid/Component'
import { TeamGridBlockComponent } from '@/blocks/TeamGrid/Component'
import { CompanyOverviewBlockComponent } from '@/blocks/CompanyOverview/Component'
import { ContactSectionBlockComponent } from '@/blocks/ContactSection/Component'
import { ConsultationFormBlockComponent } from '@/blocks/ConsultationForm/Component'
import { CenteredProseBlockComponent } from '@/blocks/CenteredProse/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  consiliumHero: ConsiliumHeroBlockComponent,
  quickServiceHub: QuickServiceHubBlockComponent,
  trustMetrics: TrustMetricsBlockComponent,
  featuredTestimonial: FeaturedTestimonialBlockComponent,
  howWeWork: HowWeWorkBlockComponent,
  whyChooseUs: WhyChooseUsBlockComponent,
  homeFaq: HomeFaqBlockComponent,
  blogPreview: BlogPreviewBlockComponent,
  finalCta: FinalCtaBlockComponent,
  insightTabs: InsightTabsBlockComponent,
  enterpriseShowcase: EnterpriseShowcaseBlockComponent,
  servicesOverview: ServicesOverviewBlockComponent,
  sectionNav: SectionNavBlockComponent,
  floatingSocial: FloatingSocialBlockComponent,
  testimonialsGrid: TestimonialsGridBlockComponent,
  teamGrid: TeamGridBlockComponent,
  companyOverview: CompanyOverviewBlockComponent,
  contactSection: ContactSectionBlockComponent,
  consultationForm: ConsultationFormBlockComponent,
  centeredProse: CenteredProseBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const stickyBlocks = ['sectionNav', 'floatingSocial']
              const fullWidthBlocks = ['finalCta']

              const isConsiliumBlock = [
                'consiliumHero',
                'quickServiceHub',
                'trustMetrics',
                'featuredTestimonial',
                'howWeWork',
                'whyChooseUs',
                'homeFaq',
                'blogPreview',
                'finalCta',
                'insightTabs',
                'enterpriseShowcase',
                'servicesOverview',
                'sectionNav',
                'floatingSocial',
                'testimonialsGrid',
                'teamGrid',
                'companyOverview',
                'contactSection',
                'consultationForm',
                'centeredProse',
              ].includes(blockType)

              if (stickyBlocks.includes(blockType)) {
                return (
                  <Fragment key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} />
                  </Fragment>
                )
              }

              if (fullWidthBlocks.includes(blockType)) {
                return (
                  <div
                    key={index}
                    className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
                  >
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} />
                  </div>
                )
              }

              return isConsiliumBlock ? (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} />
                </div>
              ) : (
                <div className="my-11" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
