# Design: Consilium Risk Advisory Group Website

**Status:** Approved  
**Date:** 2026-04-05  
**Approach:** Parallel Agent Build (Yaklaşım 2)

---

## Architecture

- **Framework:** Next.js 14+ App Router, TypeScript
- **Styling:** TailwindCSS + Mantine v7
- **Components:** Server components by default, `"use client"` only for interactive parts
- **Data:** Static TypeScript files in `constants/`, CMS-ready structure
- **CMS:** Deferred to Phase 12 (after design approval)

## Theme

- Primary Blue: `#2B7DE9`
- Dark: `#1A1A2E`
- White: `#FFFFFF`
- Font: Inter (via next/font/google)
- All CTAs → `mailto:basaryldrm1237@gmail.com`

## Pages

| Route | Description |
|-------|------------|
| `/` | Landing: Hero + Services Cards + Blog Preview + CTA |
| `/services/[slug]` | Individual service detail pages |
| `/iso-31000` | ISO 31000 with accordion sub-sections |
| `/about` | Company + Team + Mission/Values |
| `/testimonials` | Client feedback grid/carousel |
| `/blog` | Blog listing page |
| `/blog/[slug]` | Blog post detail with reading time |
| `/contact` | Contact form + company info |

## Layout Components

- **Header:** Logo left, nav links right, mobile hamburger → Mantine Drawer
- **Footer:** 3 columns (logo+description, quick links, contact info)
- **CTA Button:** Reusable mailto component

## Data Structure (CMS-Ready)

```
constants/
  services.ts      — service list with slugs
  blog-posts.ts    — posts with reading time
  testimonials.ts  — client quotes
  team.ts          — team members
  navigation.ts    — nav links
```

## Implementation Strategy

1. **Phase 1-2 (Sequential):** Project setup + Layout + Navigation
2. **Phase 3 (Sequential):** Landing page (depends on layout)
3. **Phase 4-8 (Parallel agents):** Services, About, Testimonials, Blog, Contact
4. **Phase 9-10 (Sequential):** SEO + Responsive polish
5. **Phase 11:** Deployment prep
