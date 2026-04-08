# Consilium Risk Advisory Group - Website Project

## Project Overview
- **Client:** Consilium Risk Advisory Group
- **Domain:** consiliumriskadvisory.co.uk
- **Purpose:** Professional lead-generation website directing traffic to email for consultation bookings
- **Language:** English only
- **Target Market:** UK

## Tech Stack
- **Framework:** Next.js (React)
- **Styling:** TailwindCSS + Mantine UI components
- **CMS:** Payload CMS (to be integrated AFTER design approval - do NOT set up yet)
- **Deployment:** Vercel
- **Package Manager:** npm

## Branding
- **Colors:** Blue (#2B7DE9 primary blue from logo) + White (#FFFFFF) + Dark text (#1A1A2E)
- **Logo:** Provided by client (Consilium Risk Advisory Group)
- **Style:** Professional, corporate, clean

## Contact
- **Email:** basaryldrm1237@gmail.com (used for all CTAs)

## Website Structure

### Pages
1. **Landing Page (/)** - Hero, services overview cards, CTA, blog preview
2. **Services Pages (/services/[slug])** - Individual service detail pages
3. **ISO 31000 (/iso-31000)** - Dropdown subpages for different risk management areas
4. **Testimonials (/testimonials)** - Client feedback carousel/grid
5. **Blog / Insights (/blog)** - Static blog with reading time indicator
6. **About Us (/about)** - Company and team info
7. **Contact (/contact)** - Contact form + email link

### Key Features
- Responsive design (mobile-first)
- Smooth scroll effects
- Clickable service cards
- SEO optimized for UK market
- Reading time on blog posts
- Lead generation via email CTAs

## Development Rules
- Do NOT integrate Payload CMS yet - only prepare CMS-ready structure
- Use placeholder content where client content is pending
- Keep architecture future-proof for CMS integration
- All components must be responsive
- Follow Next.js App Router conventions
- Use server components where possible
- Keep bundle size minimal

## Project Phases
1. Design Phase - Implement layouts, pages, components (CURRENT)
2. Feedback Phase - Client reviews and approves
3. CMS Integration - Payload CMS setup
4. SEO & Optimization
5. Deployment to Vercel
6. Ongoing maintenance

## Folder Structure Convention
```
src/
  app/              # Next.js App Router pages
  components/       # Reusable UI components
    ui/             # Base UI elements
    layout/         # Header, Footer, Navigation
    sections/       # Page sections (Hero, Services, etc.)
  lib/              # Utilities, helpers
  styles/           # Global styles
  types/            # TypeScript types
  constants/        # Static data, config
public/
  images/           # Static images, logo
```
