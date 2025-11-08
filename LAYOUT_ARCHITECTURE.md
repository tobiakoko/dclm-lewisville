# DCLM Lewisville - Modern Layout Architecture

## Overview

This document describes the new flexible, CMS-driven layout architecture for the DCLM Lewisville website. The design combines modern aesthetics from leading church websites with a fully customizable page builder powered by Sanity CMS.

## Design Inspiration

### From Glam-128 (Modern Web Design)
- Clean, grid-based layouts with generous whitespace
- Card-based component designs with hover effects
- Smooth animations and transitions
- Mobile-first responsive design

### From DCLM.org (Church-Specific Features)
- Professional color scheme (Blue/Red hierarchy)
- Sermon libraries and event calendars
- Testimonial showcases
- Clear service information and ministry details

## Architecture Components

### 1. Sanity CMS Schemas

#### Page Builder Sections

Located in `/sanity/schemas/objects/`:

- **hero.ts** - Hero header sections with background images, CTAs, and feature highlights
- **featuresList.ts** - Grid of features with icons, titles, and descriptions
- **benefitsSection.ts** - Benefits display in grid, alternating, or card layouts
- **aboutSection.ts** - About sections with images, stats, and flexible layouts
- **ctaSection.ts** - Call-to-action sections with gradient, image, or solid backgrounds
- **ctaFormSection.ts** - Form sections (newsletter, contact, prayer request, visitor info)
- **faqSection.ts** - Collapsible FAQ sections

#### Page Schema (`/sanity/schemas/page.ts`)

The page schema now includes a flexible `sections` array that allows content editors to:
- Add multiple section types in any order
- Reference existing content (ministries, testimonials, team)
- Create custom layouts without code changes

```typescript
sections: [
  { type: 'hero' },
  { type: 'featuresList' },
  { type: 'benefitsSection' },
  { type: 'aboutSection' },
  { type: 'ctaSection' },
  { type: 'ctaFormSection' },
  { type: 'faqSection' },
  { type: 'reference', to: 'ministry' },
  { type: 'reference', to: 'testimonial' },
  { type: 'reference', to: 'person' },
]
```

### 2. React Components

#### Section Components

Located in `/components/sections/`:

- **HeroSection.tsx** - Modern hero with animated gradients, badges, and features
- **FeaturesListSection.tsx** - Icon-based feature grid with hover effects
- **BenefitsSection.tsx** - Three layout modes (grid, alternating, cards)
- **AboutSection.tsx** - Flexible about section with stats overlay
- **CTASection.tsx** - Call-to-action with three style variations
- **CTAFormSection.tsx** - Dynamic forms with client-side validation
- **FAQSection.tsx** - Accordion-style FAQ component

#### Layout Components

- **ModernNavigation.tsx** (`/components/layout/ModernNavigation.tsx`)
  - Desktop: Dropdown menus with descriptions
  - Mobile: Sheet sidebar with accordion navigation
  - Sticky header with scroll effects
  - Animated transitions

- **Footer.tsx** - Comprehensive footer with service times, quick links, contact info

- **PageRenderer.tsx** - Dynamic component renderer that maps Sanity sections to React components

### 3. Page Templates

#### Dynamic Pages (`/app/(site)/pages/[slug]/page.tsx`)

Automatically renders any page created in Sanity CMS using the PageRenderer component.

Features:
- Static generation for optimal performance
- SEO metadata from Sanity
- Flexible section ordering
- No code changes needed for new pages

#### Home Page (`/app/(site)/page.tsx`)

Updated to use new section components with rich content:
- Modern hero section
- Service schedule
- Features list (Events, Sermons, Ministries)
- Benefits cards (Spiritual Growth, Community, etc.)
- Sermon previews
- Ministry highlights
- Team showcase
- Testimonials
- CTA section
- Contact form

## Design System

### Color Scheme

Following DCLM.org professional palette:
- **Primary Blue**: `#338fe0` - Main branding, headers, links
- **Accent Red**: `#c42d2d` - CTAs, hover states, emphasis
- **Neutrals**: Grays for backgrounds and text
- **Gradients**: Primary to secondary for visual interest

### Typography

- **Headings**: Large, bold, with gradient effects
- **Body**: Readable, generous line-height
- **Hierarchy**: Clear visual distinction between levels

### Spacing & Layout

- Generous padding (py-20 for sections)
- Consistent container widths
- Responsive breakpoints (mobile, tablet, desktop)
- Grid-based layouts with gap utilities

### Components

All components follow:
- **Hover effects**: Scale, shadow, color transitions
- **Animations**: Fade-in, slide-in (using Tailwind classes)
- **Accessibility**: Semantic HTML, ARIA labels
- **Responsive**: Mobile-first approach

## Content Management Workflow

### Creating a New Page

1. In Sanity Studio, create a new Page document
2. Add a title and slug
3. Add sections from the available section types
4. Configure each section's content
5. Publish the page
6. Page is automatically available at `/pages/{slug}`

### Customizing Sections

Each section type has configurable options:

**Hero Section:**
- Title, subtitle, description
- Badge text
- Background image or gradient
- Primary/secondary buttons
- Feature highlights (up to 3)

**Features List:**
- Heading and subheading
- Features with icons, titles, descriptions
- Optional links

**Benefits Section:**
- Layout choice (grid/alternating/cards)
- Benefits with icons and descriptions
- Optional images

**About Section:**
- Layout (image-left/right/centered)
- Rich text content
- Stats display
- Call-to-action button

**CTA Section:**
- Style (gradient/image/solid)
- Title and description
- Primary/secondary buttons
- Background image

**Form Section:**
- Form type (newsletter/contact/prayer/visitor)
- Heading and subheading
- Custom button text
- Success message

**FAQ Section:**
- Heading and subheading
- Question/answer pairs

## Technical Details

### Image Handling

Images are processed through Sanity's CDN with automatic optimization:

```typescript
import { urlForImage } from '@/lib/sanity/image'

<Image
  src={urlForImage(image).url()}
  alt="Description"
  fill
  className="object-cover"
/>
```

### Icon System

Components use Lucide React icons with a mapping system:

```typescript
const iconMap: Record<string, any> = {
  Heart,
  Users,
  Book,
  Calendar,
  // etc.
}
```

Icons are referenced by string name in Sanity, making them easy for content editors to select.

### Responsive Design

All components use Tailwind's responsive utilities:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### Performance

- Static generation for all pages
- Image optimization through Next.js Image
- Sanity CDN for fast asset delivery
- Revalidation every hour (configurable)

## Page Structure Examples

### Home Page Structure

```
- HeroSection (gradient background with features)
- ServiceSchedule (existing component)
- FeaturesListSection (Events, Sermons, Ministries)
- BenefitsSection (cards layout)
- SermonsList (existing component)
- MinistriesPreview (existing component)
- Team (existing component)
- Testimonials (existing component)
- CTASection (gradient style)
- Contact (existing component)
```

### About Page Structure (Recommended)

```
- HeroSection (with church image)
- AboutSection (history and mission)
- Timeline (existing component)
- Team (leadership)
- FAQSection (beliefs and practices)
- CTASection (visit invitation)
```

### Ministry Detail Page Structure (Recommended)

```
- HeroSection (ministry-specific)
- AboutSection (ministry mission)
- FeaturesListSection (programs and activities)
- Team (ministry leaders)
- Testimonials (ministry-specific)
- FAQSection (how to join)
- CTAFormSection (signup form)
```

### Sermons Page Structure (Recommended)

```
- HeroSection (inspirational message)
- SermonsList (all sermons)
- FAQSection (how to access, formats)
- CTAFormSection (sermon updates signup)
```

## Navigation Structure

The new ModernNavigation component includes:

**Desktop Menu:**
- Home
- About (dropdown)
  - Our Story
  - Our Team
  - Beliefs
- Ministries (dropdown)
  - All Ministries
  - Children's Ministry
  - Youth Ministry
  - Women's Ministry
- Sermons
- Events
- Contact
- Give (CTA button)

**Mobile Menu:**
- Sheet sidebar with accordion navigation
- Same menu structure
- Optimized for touch

## Deployment & Updates

### Deploying Sanity Schema Changes

```bash
cd sanity
npm run deploy
```

### Building the Frontend

```bash
npm run build
npm start
```

### Development

```bash
# Frontend
npm run dev

# Sanity Studio
npm run sanity
```

## Best Practices

### Content Guidelines

1. **Hero Sections**: Keep titles concise (2-5 words), descriptions under 200 characters
2. **Features**: Limit to 3-6 items for optimal visual balance
3. **Images**: Use high-quality images (1920x1080 or larger)
4. **CTAs**: Use action-oriented language ("Join Us", "Learn More")
5. **FAQs**: Keep questions clear and answers comprehensive but concise

### Technical Guidelines

1. Always use the urlForImage helper for Sanity images
2. Provide alt text for all images
3. Test components on mobile, tablet, and desktop
4. Use semantic HTML elements
5. Maintain consistent spacing (py-20 for sections)

## Future Enhancements

Potential additions to the system:

1. **Timeline Section**: Visual milestone display
2. **Gallery Section**: Image/video gallery component
3. **Event Calendar**: Interactive event listing
4. **Donation Widget**: Integrated giving options
5. **Live Stream**: Embedded streaming component
6. **Prayer Wall**: Community prayer requests
7. **Blog Section**: Article listing and detail pages

## Support

For questions or issues:
- Technical: Review this documentation
- Content: Use Sanity Studio documentation
- Design: Refer to component props in TypeScript files
