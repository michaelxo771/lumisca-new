# LUMISCA — Premium Next.js E-commerce Storefront

Your At-Home Light Therapy Clinic. Production-ready Next.js 14 storefront for LUMISCA — clinic-grade red light therapy devices for hair, skin and sleep.

## Tech Stack

- **Next.js 14** with App Router and React Server Components
- **TypeScript** (strict)
- **Tailwind CSS** with a bespoke LUMISCA design system
- **Framer Motion** for premium micro-animations
- **next/font** for Playfair Display + DM Sans
- **Shopify Storefront API** ready — runs on local mock data out of the box
- **Deploy** on Vercel in a single click

## Brand

- **Name**: LUMISCA (lumisca.co.uk)
- **Tagline**: Your At-Home Light Therapy Clinic.
- **Palette**: `#0A0A0A` ink · `#F9F7F4` cream · `#C8102E` brand red · `#C9A84C` gold · `#4A4A4A` mid grey · `#E8E6E3` light grey
- **Typography**: Playfair Display (display) + DM Sans (body)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The store ships with mock product data in `lib/products.ts` so it runs without any env setup.

### Scripts

| Command | Action |
| ------- | ------ |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with `next lint` |
| `npm run type-check` | Type-check without emitting |

## Project Structure

```
app/
  layout.tsx              # Root layout, fonts, announcement bar, header, footer, popups
  page.tsx                # Homepage
  products/[handle]/      # Dynamic product pages (SSG via generateStaticParams)
  collections/all/        # Collection page with client-side filter + sort
  about/ science/ reviews/ faq/ contact/
  sitemap.ts robots.ts not-found.tsx

components/
  layout/                 # AnnouncementBar, Header, Footer, CartDrawer, CartProvider, TrackingScripts
  home/                   # Hero, TrustBar, FeaturedProducts, HowItWorks, ScienceCallout,
                          # BundleHighlight, Testimonials, UGCStrip, FAQStrip
  product/                # Gallery, Info, Tabs, Benefits, Timeline, Science, Upsell, Reviews, StickyATC
  popups/                 # Welcome, Exit, CartUpsell, RecentPurchaseToast, CookieConsent
  ui/                     # Button, Badge, StarRating, CountdownTimer, Accordion, ProductCard,
                          # PlaceholderImage, BackToTop

lib/
  products.ts             # Mock product & review data — drop-in replaceable with Shopify data
  shopify.ts              # Storefront API client (mock fallback) with step-by-step live-mode guide
  utils.ts                # formatPrice, cn, countdown helpers, delivery date

types/
  index.ts                # Product, CartItem, Review, NavLink
```

## Shopify Integration

The store runs on mock data until you add Shopify credentials. To go live:

1. In your Shopify admin → **Settings → Apps and sales channels → Develop apps → Create an app**.
2. Enable the Storefront API scopes: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`.
3. Copy the Storefront access token.
4. Copy `.env.local.example` → `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token
   ```
5. Replace the mock queries in `lib/shopify.ts` (`getAllProducts`, `getProductByHandle`, `createCheckoutUrl`) with live Storefront GraphQL.

All downstream components consume the local `Product` type, so the transition is a drop-in.

## Conversion Features

- **Announcement bar** rotates 3 messages every 3s
- **Sticky header** with cart badge + full-screen mobile drawer
- **Cart drawer** with free-shipping progress bar + bundle upsell
- **Welcome popup** (8s delay, localStorage-gated, 10% off)
- **Exit-intent popup** (desktop `mouseleave` / 40s mobile idle, localStorage-gated)
- **Cart upsell popup** triggers when single product added without bundle
- **Recent purchase toast** rotates 8 UK customer + product combos
- **Sticky ATC** on mobile product pages once main CTA scrolls out of view
- **Countdown timer** daily-reset on bundle section + product pages
- **Delivery countdown** to 3pm dispatch cutoff
- **Cookie consent** GDPR-compliant banner gating all tracking pixels
- **Back-to-top** fixed button after 400px scroll

## Tracking

Meta Pixel, TikTok Pixel and GA4 are wired into `components/layout/TrackingScripts.tsx`.

- Pixels only load when the user accepts cookies (`lumisca.consent=accepted`).
- Global helper `window.lumiscaTrack(event, data)` fires matching events to all three platforms. The cart uses it automatically for `AddToCart`.
- Environment variables:
  ```
  NEXT_PUBLIC_META_PIXEL_ID=
  NEXT_PUBLIC_TIKTOK_PIXEL_ID=
  NEXT_PUBLIC_GA4_ID=
  ```

## Accessibility

- All interactive elements ≥ 44px touch targets
- Focus-visible outlines on all controls
- `aria-label`s on icon-only buttons
- Reduced-motion support via Tailwind's built-in variants (extendable)
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`)

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo into Vercel.
3. Add the env vars above in **Project Settings → Environment Variables**.
4. Deploy — Next.js 14 builds automatically.

Vercel's default build cache + ISR handles product page revalidation.

## UK English

All copy, dates and prices follow UK conventions (`colour`, £ GBP, `DD Month YYYY`). `Intl.NumberFormat("en-GB", ...)` in `lib/utils.ts`.

---

© 2026 Lumisca Ltd.
