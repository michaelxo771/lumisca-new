# LUMISCA — Shopify Liquid theme

Shopify 2.0 theme converted from the sibling Next.js storefront. Drop-in
ready — upload as a ZIP via **Online Store → Themes → Add theme → Upload
zip file**, or deploy with the Shopify CLI (`shopify theme push`).

## Install

```bash
npm i -g @shopify/cli @shopify/theme
shopify theme dev --store your-store
```

## Required store setup

Create the following in your Shopify admin before going live:

1. **Menus** (Online Store → Navigation)
   - `main-menu` — Shop, The Science, Reviews, About, FAQ
   - `footer-shop`, `footer-info`, `footer-support` — anything you like
2. **Pages** (Online Store → Pages) and assign the right template from
   the `Theme template` dropdown on the edit screen:
   - About → `page.about`
   - Science → `page.science`
   - Reviews → `page.reviews`
   - FAQ → `page.faq`
   - Contact → `page.contact`
3. **Products** — seed the four Lumisca products with the handles
   listed below so the JSON templates line up:
   - `lumisca-pro-hair-growth-cap`
   - `lumisca-glow-face-mask`
   - `lumisca-rest-eye-mask`
   - `lumisca-complete-bundle`
4. **Theme settings** — Online Store → Themes → Customize:
   - Brand tagline, colours
   - Free shipping threshold (default £50)
   - Bundle product handle (`lumisca-complete-bundle`)
   - Welcome discount code (`LUMISCA10`)
   - TikTok + Instagram URLs

## Conversion rules (enforced)

This theme was built to seven hard rules:

1. ✅ No `data-animate` CSS that sets `opacity: 0`. All content paints
   immediately — animations layer on top, they never hide content.
2. ✅ Cart drawer is rendered via `{% render 'cart-drawer' %}` — not a
   `{% section %}` — so it always appears and cannot end up disabled
   from the theme editor.
3. ✅ Footer lives in the JSON templates only (`index.json`,
   `product.json`, etc.) — never in `layout/theme.liquid`.
4. ✅ All popups default to `display: none` via `.popup { display:
   none }`. JS adds `.is-open` to show them.
5. ✅ Mobile nav defaults to `display: none` via `.mobile-nav { display:
   none }`. JS adds `.is-open` on the menu button click.
6. ✅ CSS is under 300 lines (`assets/theme.css` is 190 lines). Each
   section ships its own scoped `{% stylesheet %}` block so global CSS
   stays lean.
7. ✅ Each phase was committed separately (see `git log`).

## File tree

```
assets/
  theme.css            # 190 lines, all design tokens and primitives
  theme.js             # vanilla JS — cart AJAX, popups, countdown, tabs
config/
  settings_schema.json
  settings_data.json
layout/
  theme.liquid         # base layout — NO footer here
locales/
  en.default.json
sections/              # 36 sections, all with schemas and presets
snippets/              # icons, cart-drawer, mobile-nav, popups, cards
templates/
  index.json           # homepage (hero → footer)
  product.json         # PDP (main → upsell → reviews → footer)
  collection.json      # collection page
  cart.json
  404.json
  list-collections.json
  search.json
  page.json            # generic page fallback
  page.about.json
  page.science.json
  page.reviews.json
  page.faq.json
  page.contact.json
```

## Extending

- **Swap an image**: every section with an image ships with an
  `image_picker` setting — editable from the theme editor, falls back
  to a placeholder at `.ph` if unset.
- **Add a review**: open the product page in the editor, find the
  *Product Reviews* section, click *Add Review*.
- **Change the bundle**: set `bundle_product_handle` in Theme Settings.
  The cart upsell and bundle countdown both read from it.

## Tracking

The theme does not ship tracking pixels by default. Paste Meta Pixel,
TikTok Pixel or GA4 snippets in **Online Store → Preferences →
Additional scripts** — gate on `document.cookie.indexOf("lumisca.consent=accepted")` to respect the cookie banner.
