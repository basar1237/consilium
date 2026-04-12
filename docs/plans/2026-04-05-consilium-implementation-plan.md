# Consilium Risk Advisory Website - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a professional lead-generation website for Consilium Risk Advisory Group with all pages, SEO, and deployment readiness.

**Architecture:** Next.js 14 App Router with TypeScript, TailwindCSS + Mantine v7 for styling/components. Static data in `constants/` for CMS-ready structure. Server components by default.

**Tech Stack:** Next.js 14, TypeScript, TailwindCSS, Mantine v7, Vercel

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Scaffold Next.js with TypeScript + TailwindCSS**

```bash
cd c:/Users/basary/Projects/consilium
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

**Step 2: Install Mantine v7**

```bash
npm install @mantine/core @mantine/hooks @mantine/form @mantine/carousel embla-carousel-react @tabler/icons-react
```

**Step 3: Install PostCSS plugins for Mantine**

```bash
npm install postcss-preset-mantine postcss-simple-vars
```

**Step 4: Configure PostCSS for Mantine**

Update `postcss.config.mjs`:
```js
const config = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;
```

**Step 5: Verify build**

```bash
npm run build
```
Expected: Build succeeds.

**Step 6: Commit**

```bash
git init && git add -A && git commit -m "feat: initialize Next.js project with TailwindCSS and Mantine v7"
```

---

## Task 2: Configure Theme, Fonts, and Global Styles

**Files:**
- Create: `src/lib/theme.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Create Mantine theme config**

Create `src/lib/theme.ts`:
```typescript
"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#e6f0fd",
      "#cce1fb",
      "#99c3f7",
      "#66a5f3",
      "#3388ef",
      "#2B7DE9",
      "#2264ba",
      "#1a4b8c",
      "#11325d",
      "#09192f",
    ],
  },
  fontFamily: "var(--font-inter), sans-serif",
  headings: {
    fontFamily: "var(--font-inter), sans-serif",
  },
});
```

**Step 2: Update root layout with Mantine provider and Inter font**

Update `src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "@/lib/theme";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Consilium Risk Advisory Group",
  description:
    "Professional risk advisory and management services based in the UK. Expert consultation for ISO 31000, enterprise risk management, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
```

**Step 3: Update globals.css**

Replace `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #2B7DE9;
  --color-dark: #1A1A2E;
  --color-white: #FFFFFF;
}

html {
  scroll-behavior: smooth;
}

body {
  color: var(--color-dark);
  background: var(--color-white);
}
```

**Step 4: Update tailwind.config.ts with brand colors**

In `tailwind.config.ts`, add custom colors:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2B7DE9",
        dark: "#1A1A2E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: configure Mantine theme, Inter font, and TailwindCSS brand colors"
```

---

## Task 3: Create Data Constants (CMS-Ready)

**Files:**
- Create: `src/types/index.ts`
- Create: `src/constants/navigation.ts`
- Create: `src/constants/services.ts`
- Create: `src/constants/blog-posts.ts`
- Create: `src/constants/testimonials.ts`
- Create: `src/constants/team.ts`

**Step 1: Create TypeScript types**

Create `src/types/index.ts`:
```typescript
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readingTime: number;
  category: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
```

**Step 2: Create navigation data**

Create `src/constants/navigation.ts`:
```typescript
import { NavItem } from "@/types";

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/enterprise-risk-management" },
  {
    label: "ISO 31000",
    href: "/iso-31000",
  },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
```

**Step 3: Create services data**

Create `src/constants/services.ts` with 6 placeholder services:
```typescript
import { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "enterprise-risk-management",
    title: "Enterprise Risk Management",
    shortDescription: "Comprehensive risk management frameworks tailored to your organisation's needs.",
    fullDescription: "Our Enterprise Risk Management service provides a holistic approach to identifying, assessing, and mitigating risks across your entire organisation. We work closely with your leadership team to develop robust frameworks that align with your strategic objectives and regulatory requirements.",
    icon: "IconShield",
    features: [
      "Risk identification and assessment",
      "Risk appetite and tolerance frameworks",
      "Risk reporting and dashboards",
      "Board-level risk governance",
    ],
  },
  {
    slug: "regulatory-compliance",
    title: "Regulatory Compliance",
    shortDescription: "Navigate complex regulatory landscapes with expert guidance and support.",
    fullDescription: "Stay ahead of regulatory changes with our compliance advisory services. We help organisations understand, implement, and maintain compliance with relevant regulations, reducing the risk of penalties and reputational damage.",
    icon: "IconScale",
    features: [
      "Regulatory gap analysis",
      "Compliance programme design",
      "Regulatory change management",
      "Compliance training and awareness",
    ],
  },
  {
    slug: "operational-resilience",
    title: "Operational Resilience",
    shortDescription: "Build resilient operations that withstand disruptions and adapt to change.",
    fullDescription: "Ensure your organisation can prevent, respond to, recover from, and learn from operational disruptions. Our operational resilience services help you identify critical business services and set impact tolerances.",
    icon: "IconRefresh",
    features: [
      "Business impact analysis",
      "Scenario testing and planning",
      "Third-party risk management",
      "Recovery and continuity planning",
    ],
  },
  {
    slug: "cyber-risk-advisory",
    title: "Cyber Risk Advisory",
    shortDescription: "Protect your digital assets with strategic cyber risk management.",
    fullDescription: "In an increasingly digital world, cyber risks pose significant threats to organisations of all sizes. Our cyber risk advisory services help you understand your cyber risk profile and implement effective controls.",
    icon: "IconLock",
    features: [
      "Cyber risk assessment",
      "Security governance frameworks",
      "Incident response planning",
      "Cyber awareness training",
    ],
  },
  {
    slug: "internal-audit",
    title: "Internal Audit",
    shortDescription: "Independent assurance and advisory services to improve governance.",
    fullDescription: "Our internal audit services provide independent, objective assurance and consulting to add value and improve your organisation's operations. We help you evaluate and improve the effectiveness of risk management, control, and governance processes.",
    icon: "IconClipboardCheck",
    features: [
      "Risk-based audit planning",
      "Process and controls review",
      "Audit committee support",
      "Co-sourced and outsourced audit",
    ],
  },
  {
    slug: "strategic-risk-consulting",
    title: "Strategic Risk Consulting",
    shortDescription: "Align risk management with your organisation's strategic objectives.",
    fullDescription: "Our strategic risk consulting services help organisations integrate risk considerations into strategic decision-making. We work with boards and senior management to ensure risks are properly considered in business planning and strategy execution.",
    icon: "IconTarget",
    features: [
      "Strategic risk assessment",
      "Risk culture evaluation",
      "Mergers and acquisitions risk",
      "Emerging risk identification",
    ],
  },
];
```

**Step 4: Create blog posts data**

Create `src/constants/blog-posts.ts` with 6 placeholder posts (with reading time calculated from content length).

**Step 5: Create testimonials data**

Create `src/constants/testimonials.ts` with 6 placeholder testimonials.

**Step 6: Create team data**

Create `src/constants/team.ts` with 4 placeholder team members.

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: add TypeScript types and CMS-ready data constants"
```

---

## Task 4: Create Layout Components (Header + Footer)

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Create: `src/components/ui/CTAButton.tsx`
- Modify: `src/app/layout.tsx` — add Header and Footer

**Step 1: Create CTA Button component**

Create `src/components/ui/CTAButton.tsx`:
```tsx
import Link from "next/link";

interface CTAButtonProps {
  text?: string;
  className?: string;
  variant?: "primary" | "outline";
}

export function CTAButton({
  text = "Book a Consultation",
  className = "",
  variant = "primary",
}: CTAButtonProps) {
  const baseStyles = "inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  return (
    <Link
      href="mailto:info@consiliumriskadvisorygroup.co.uk"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {text}
    </Link>
  );
}
```

**Step 2: Create MobileNav (client component with Mantine Drawer)**

Create `src/components/layout/MobileNav.tsx`:
```tsx
"use client";

import { Burger, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { navigation } from "@/constants/navigation";

export function MobileNav() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Burger opened={opened} onClick={toggle} className="md:hidden" aria-label="Toggle navigation" />
      <Drawer opened={opened} onClose={close} title="Menu" position="right" size="xs">
        <Stack gap="md">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-dark hover:text-primary font-medium text-lg py-2"
            >
              {item.label}
            </Link>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
```

**Step 3: Create Header component**

Create `src/components/layout/Header.tsx` — logo left, nav links right (hidden on mobile), MobileNav burger on mobile.

**Step 4: Create Footer component**

Create `src/components/layout/Footer.tsx` — 3 columns: company info, quick links, contact.

**Step 5: Add Header and Footer to root layout**

Modify `src/app/layout.tsx`: wrap `{children}` with Header above and Footer below.

**Step 6: Verify build + visual check**

```bash
npm run build && npm run dev
```

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: add Header, Footer, MobileNav, and CTA button components"
```

---

## Task 5: Landing Page (Phase 3)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/ServicesOverview.tsx`
- Create: `src/components/sections/WhyChooseUs.tsx`
- Create: `src/components/sections/BlogPreview.tsx`
- Create: `src/components/sections/FinalCTA.tsx`

**Step 1: Create Hero section**

Full-width hero with headline, subtext, CTA button. Blue gradient background.

**Step 2: Create ServicesOverview section**

Grid of 6 clickable service cards using data from `constants/services.ts`. Each card links to `/services/[slug]`.

**Step 3: Create WhyChooseUs section**

3-4 highlight cards (experience, expertise, tailored approach, UK focus).

**Step 4: Create BlogPreview section**

Latest 3 blog posts from `constants/blog-posts.ts` with reading time badges.

**Step 5: Create FinalCTA section**

Full-width banner with consultation CTA.

**Step 6: Compose landing page**

Update `src/app/page.tsx` to render: Hero → ServicesOverview → WhyChooseUs → BlogPreview → FinalCTA.

**Step 7: Verify build**

```bash
npm run build
```

**Step 8: Commit**

```bash
git add -A && git commit -m "feat: implement landing page with Hero, Services, WhyChooseUs, Blog preview, and CTA sections"
```

---

## Task 6: Services Pages (PARALLEL - Agent A)

**Files:**
- Create: `src/app/services/[slug]/page.tsx`
- Create: `src/app/iso-31000/page.tsx`
- Create: `src/components/sections/ServiceDetail.tsx`

**Step 1: Create dynamic service page**

`src/app/services/[slug]/page.tsx` — reads slug param, finds service from `constants/services.ts`, renders detail page with title, description, features list, and CTA.

**Step 2: Add generateStaticParams**

Export `generateStaticParams` to pre-render all 6 service pages.

**Step 3: Create ISO 31000 page**

`src/app/iso-31000/page.tsx` — uses Mantine Accordion for sub-sections: Risk Assessment, Risk Treatment, Risk Monitoring, Risk Communication, Risk Framework.

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add services detail pages and ISO 31000 page"
```

---

## Task 7: About Us Page (PARALLEL - Agent B)

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/components/sections/CompanyOverview.tsx`
- Create: `src/components/sections/TeamSection.tsx`
- Create: `src/components/sections/MissionValues.tsx`

**Step 1: Create CompanyOverview section**

Company history, what we do, UK focus.

**Step 2: Create TeamSection**

Grid of team member cards from `constants/team.ts`.

**Step 3: Create MissionValues section**

Mission statement + 3-4 value cards.

**Step 4: Compose About page**

`src/app/about/page.tsx` renders: CompanyOverview → TeamSection → MissionValues → CTA.

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add About Us page with team and mission sections"
```

---

## Task 8: Testimonials Page (PARALLEL - Agent C)

**Files:**
- Create: `src/app/testimonials/page.tsx`
- Create: `src/components/sections/TestimonialsGrid.tsx`

**Step 1: Create TestimonialsGrid component**

Grid/carousel of testimonial cards from `constants/testimonials.ts`. Use Mantine Carousel for mobile, grid for desktop.

**Step 2: Compose Testimonials page**

`src/app/testimonials/page.tsx` renders: page title → TestimonialsGrid → CTA.

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Testimonials page with carousel and grid"
```

---

## Task 9: Blog Pages (PARALLEL - Agent D)

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/components/sections/BlogList.tsx`
- Create: `src/components/ui/BlogCard.tsx`
- Create: `src/lib/reading-time.ts`

**Step 1: Create reading time utility**

`src/lib/reading-time.ts`: calculate reading time from word count (avg 200 wpm).

**Step 2: Create BlogCard component**

Card with title, excerpt, date, reading time badge, category tag.

**Step 3: Create BlogList section**

Grid of BlogCards from `constants/blog-posts.ts`.

**Step 4: Create blog listing page**

`src/app/blog/page.tsx` renders: page title → BlogList.

**Step 5: Create blog detail page**

`src/app/blog/[slug]/page.tsx` with `generateStaticParams`, full post content, reading time, back link.

**Step 6: Verify build**

```bash
npm run build
```

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: add Blog listing and detail pages with reading time"
```

---

## Task 10: Contact Page (PARALLEL - Agent E)

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/components/sections/ContactForm.tsx`
- Create: `src/components/sections/ContactInfo.tsx`

**Step 1: Create ContactForm component**

Client component with Mantine form: name, email, subject, message fields. Client-side validation. Submit sends mailto link (no backend).

**Step 2: Create ContactInfo component**

Company email, address placeholder, working hours.

**Step 3: Compose Contact page**

`src/app/contact/page.tsx` renders: page title → 2-column layout (ContactForm + ContactInfo).

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Contact page with form and company info"
```

---

## Task 11: SEO & Performance (Phase 9)

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/lib/metadata.ts`
- Modify: All page files — add page-specific metadata

**Step 1: Create metadata utility**

`src/lib/metadata.ts`: helper to generate consistent metadata with OG tags for each page.

**Step 2: Add metadata to all pages**

Each page.tsx exports `metadata` or `generateMetadata` with title, description, OG tags.

**Step 3: Create sitemap.ts**

Dynamic sitemap generation for all routes.

**Step 4: Create robots.ts**

Allow all crawlers, point to sitemap.

**Step 5: Add JSON-LD structured data**

Add LocalBusiness schema to root layout.

**Step 6: Verify build**

```bash
npm run build
```

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: add SEO metadata, sitemap, robots.txt, and structured data"
```

---

## Task 12: Responsive Polish & Error Pages (Phase 10)

**Files:**
- Create: `src/app/not-found.tsx`
- Create: `src/app/error.tsx`
- Create: `src/app/loading.tsx`
- Modify: Various components for responsive fixes

**Step 1: Create 404 page**

Custom not-found page with link back to home.

**Step 2: Create error page**

Client component error boundary with retry button.

**Step 3: Create loading state**

Simple loading spinner/skeleton.

**Step 4: Responsive audit**

Review all pages at mobile (375px), tablet (768px), and desktop (1280px) breakpoints. Fix any overflow, spacing, or layout issues.

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add error pages, loading states, and responsive polish"
```

---

## Task 13: Deployment Preparation (Phase 11)

**Files:**
- Create: `vercel.json` (if needed)
- Verify: `next.config.ts` production settings

**Step 1: Verify production build**

```bash
npm run build
```

Ensure zero warnings and errors.

**Step 2: Check bundle size**

```bash
npx @next/bundle-analyzer
```

**Step 3: Final commit**

```bash
git add -A && git commit -m "chore: production build verification and deployment prep"
```

---

## Execution Strategy

### Sequential (Tasks 1-5)
Tasks 1-5 must run in order — each depends on the previous.

### Parallel (Tasks 6-10)
Tasks 6-10 are independent pages. Run as 5 parallel agents after Task 5 completes.

### Sequential (Tasks 11-13)
SEO, polish, and deployment run after all pages are complete.
