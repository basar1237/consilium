# RFC: Consilium Risk Advisory Group - Website Implementation

**Status:** In Progress  
**Created:** 2026-04-04  
**Domain:** consiliumriskadvisory.co.uk  

---

## Phase 1: Project Setup

- [ ] Initialize Next.js project with TypeScript
- [ ] Install and configure TailwindCSS
- [ ] Install and configure Mantine UI
- [ ] Set up folder structure (app, components, lib, styles, types, constants)
- [ ] Add logo and static assets to public/
- [ ] Configure global styles (fonts, colors, theme)
- [ ] Set up ESLint and Prettier
- [ ] Create base layout (metadata, SEO defaults)

## Phase 2: Layout & Navigation

- [ ] Create Header component (logo, navigation links, mobile hamburger menu)
- [ ] Create Footer component (contact info, links, copyright)
- [ ] Create responsive Navigation (desktop + mobile drawer)
- [ ] Add smooth scroll behavior
- [ ] Create reusable CTA button component (mailto: link)

## Phase 3: Landing Page

- [ ] Hero section (headline, subtext, CTA button)
- [ ] Services overview section (clickable cards grid)
- [ ] Why Choose Us / Highlights section
- [ ] Blog/Insights preview section (latest 3 posts)
- [ ] Final CTA section (consultation booking)
- [ ] Scroll effects / animations

## Phase 4: Services Pages

- [ ] Create dynamic services page route (/services/[slug])
- [ ] Design service detail page layout
- [ ] Add placeholder content for each service
- [ ] Service cards linking from landing page to detail pages
- [ ] ISO 31000 page with dropdown/accordion sections (/iso-31000)

## Phase 5: About Us Page

- [ ] Company overview section
- [ ] Team section (placeholder cards)
- [ ] Mission / Values section
- [ ] Page layout and responsive design

## Phase 6: Testimonials Page

- [ ] Testimonials carousel or grid layout
- [ ] Individual testimonial card component
- [ ] Placeholder client logos and quotes
- [ ] Responsive design

## Phase 7: Blog / Insights

- [ ] Blog listing page (/blog)
- [ ] Blog post detail page (/blog/[slug])
- [ ] Reading time calculator utility
- [ ] Static blog post data structure (CMS-ready)
- [ ] Blog preview cards with reading time indicator
- [ ] Category/tag filtering (optional, structure only)

## Phase 8: Contact Page

- [ ] Contact form (name, email, subject, message)
- [ ] Email link / mailto CTA
- [ ] Company contact information display
- [ ] Form validation
- [ ] Responsive layout

## Phase 9: SEO & Performance

- [ ] Meta tags for all pages (title, description, OG tags)
- [ ] Structured data / JSON-LD for business
- [ ] Sitemap generation
- [ ] robots.txt configuration
- [ ] Image optimization (next/image)
- [ ] Performance audit (Lighthouse)
- [ ] UK-focused SEO keywords in content

## Phase 10: Responsive & Polish

- [ ] Mobile responsiveness audit (all pages)
- [ ] Cross-browser testing
- [ ] Accessibility check (ARIA, contrast, keyboard nav)
- [ ] Loading states and error pages (404, 500)
- [ ] Final design polish and consistency review

## Phase 11: Deployment

- [ ] Vercel project setup
- [ ] Environment variables configuration
- [ ] Custom domain (consiliumriskadvisory.co.uk) connection
- [ ] SSL verification
- [ ] Production build test
- [ ] Go live

## Phase 12: CMS Integration (FUTURE - after design approval)

- [ ] Install and configure Payload CMS
- [ ] Define content collections (services, blog posts, testimonials)
- [ ] Migrate static content to CMS
- [ ] Connect frontend to CMS API
- [ ] Admin panel setup
- [ ] Client training / handoff

---

**Notes:**
- Content (text, images, graphs) will be provided by client
- Using placeholder content until client provides final copy
- CMS integration is intentionally deferred to Phase 12
- All components should be built with CMS-readiness in mind
