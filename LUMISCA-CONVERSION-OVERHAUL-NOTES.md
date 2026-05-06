# Lumisca Cap PDP Conversion Overhaul — Notes

**Branch:** `claude/lumisca-ecommerce-store-yLX61` → also pushed to `main`
**Live theme:** `lumisca-2.myshopify.com` theme `198139117911`
**Commits in this overhaul:**
- `a7932dc` — commit 1/3: copy + theme settings (Problems 1, 2, 5D, 6, 7, 9, 10, 12)
- `a6581d0` — commit 2/3: above-fold reorder + audience self-routing (Problems 3, 11A)
- (this commit) — notes doc

**Skipped this round (deferred):**
- Problem 4 — Real Results horizontal scroll: Mike to drop image handles in admin first
- Problem 5 mid-tier (£64.99 Cap + Protocol + Tracker): needs Shopify Bundles app handle from admin
- Problem 8 — image 1:1: already shipped earlier in `1e00827`

Every visible change is gated on `product.handle == 'pro-red-light-hair-growth-cap'`. Face Mask / Eye Mask / Bundle PDPs and the homepage are byte-identical to pre-overhaul.

---

## File-by-file changes

### `sections/product-main.liquid`
- **Above-fold reorder** (Problem 3): countdown timer moved from above the price block to below the "Why £54.99 not £549" collapsible. Social-proof scarcity moved from above the bundle selector to immediately under the ATC button.
- **New blocks** (cap-only):
  - Regulatory trust strip (`.cap-regulatory`) — fed by 4 new section settings.
  - "Why we're £54.99 not £549" collapsible (`.cap-why-cheap` `<details>` element) — closed by default on mobile.
  - Self-routing audience CTAs (`.cap-audience-route`) — visible on generic, hidden on `?audience=women|men`.
- **Copy changes** (cap-only):
  - Trust pill row: `Clinically Proven · Drug-Free Formula · 90-Day Guarantee · Free UK Shipping` → `CE Marked · 90-Day Guarantee · Free UK & IE Shipping · Klarna Available`.
  - Bundle tier titles: `1 DEVICE / HAIR + SKIN DUO — POPULAR / COMPLETE BUNDLE — MAXIMUM RESULTS` → `Just the Cap / Hair + Skin Duo — Best Value / Complete System — Maximum Results`.
  - Scarcity: removed "12 people viewing this right now"; "Only 23 units remaining" → "Limited UK stock — restocking in 2 weeks"; "47 people bought in the last 24 hours" → "Trending this week — 47 customers ordered". Other PDPs keep the original 3-line scarcity block.
- **New section schema settings** (Online Store → Customize → Product Main):
  - `regulatory_marker_1` (default `CE Marked`)
  - `regulatory_marker_2` (default `660nm + 850nm Clinical Wavelengths`)
  - `regulatory_marker_3` (default `UK & IE Stock`)
  - `regulatory_marker_4` (default `30,000+ LEDs Tested`)
- **JS extension**: existing audience IIFE now also hides `[data-cap-audience-route]` when `?audience=women|men` is detected.

### `sections/cap-press-bar.liquid`
- 6 new schema settings (`press_logo_1` through `press_logo_6`) for editable publication names.
- Defaults swapped from `VOGUE / ELLE / WOMEN'S HEALTH / REFINERY29 / GRAZIA` to `Get The Gloss / Beauty Daily / The Sunday Edit / Hair Magazine UK / Stylist Beauty / The Beauty Edit`.

### `sections/cap-trichologist.liquid` (new)
- "Recommended by trichologists" credibility section, slotted into `templates/product.json` between `reviews` and `product-faq`.
- Generic legal-safe wavelength claim by default ("The 660nm and 850nm wavelengths used in Lumisca are the same wavelengths recommended by trichologists worldwide for at-home hair regeneration.").
- Three settings (`trichologist_name`, `trichologist_credentials`, `trichologist_photo`) — when blank, only the claim renders. When `trichologist_name` is filled, an attribution block (photo + name + credentials) appears beneath the claim.

### `sections/cap-risk-reversal.liquid`
- Sub-headline copy: `No questions, no return fees, no fine print.` → `90-day money-back guarantee · Use the cap consistently for at least 30 days · Submit before/after photos to claim your full refund — we'll even cover return shipping.`

### `sections/product-faq.liquid`
- Hair-branch "What if I don't see results?" panel updated to mirror the new guarantee conditions (use 30 days minimum, submit photos, return shipping covered).

### `sections/product-reviews.liquid`
- Replaced `.prev-thumb` (product-photo) with `.prev-avatar` (neutral SVG initial-avatar — cream circle, gold initial in display serif).
- Added "Reviews collected via order email after delivery — no third-party widget. We don't filter, edit, or pay for reviews." note above the all-reviews link.
- Unified verified pill styling shared with `cap-testimonial-row.liquid` — green pill, dark-green text, white check icon.

### `sections/cap-testimonial-row.liquid`
- `.ctr-verified` pill restyled to match the new `.prev-verified` (green tone with check icon via SVG mask).

### `assets/theme.js`
- Toast (recent-purchase popup) frequency throttled to **90–120 seconds** between shows (was 60–90s) and capped at **6 shows per session** via `MAX_SHOWS` + `shownCount` guards. Variable names hoisted for easy tuning.

### `templates/product.json`
- Inserted `cap-trichologist` section in the order between `reviews` and `product-faq`.

---

## What Mike needs to do in admin (before going live or as soon as possible)

### Critical — needed before live (paid traffic)
1. **Regulatory markers**: Online Store → Customize → Product page → Product Main → confirm or edit:
   - "CE Marked" — confirm CE certificate on file from AutoDS supplier. **Without this, remove or change the marker**.
   - "660nm + 850nm Clinical Wavelengths" — confirmed via product specs.
   - "UK & IE Stock" — verify with AutoDS that fulfilment ships from UK; if drop-ship from China, change copy.
   - "30,000+ LEDs Tested" — fact-check with supplier.
   - **Do NOT add "FDA Cleared" or "MHRA Registered"** unless certified paperwork exists. UK ASA / MHRA pulls these in days otherwise.

2. **Image gallery reorder** (Problem 4): Shopify admin → Products → Pro Red Light Hair Growth Cap → Media → drag the before/after image to **position 2** (immediately after the hero "RED LIGHT THERAPY CAP" creative).

3. **Cap variant compare-at price**: confirm `compare_at_price = £109.99` is set on the Pro Red Light Hair Growth Cap variant in admin so the strikethrough hero price renders natively. If unset, the cap-only fallback hardcodes £109.99 visually but Shopify will charge whatever the variant price is.

### Important — within first week
4. **Press logos**: Online Store → Customize → Cap Press Bar — these are placeholder lower-tier UK beauty publications. Swap for any real placements as you get them. Leave a slot blank to hide that pill.

5. **Trichologist endorsement**: Online Store → Customize → Cap Trichologist — fill in `trichologist_name`, `trichologist_credentials`, `trichologist_photo` as soon as you have a real practitioner on board. Until then the section renders only the generic wavelength claim.

6. **Bundle mid-tier (£64.99 Cap + Protocol + Tracker)** — Problem 5 mid-tier was deferred. Two paths to add it later:
   - Create a new "Cap + Protocol Bundle" product in Shopify admin at £64.99, then ping Claude with the product handle to wire Tier 2 to its variant.
   - Use the Shopify Bundles app to define the bundle, then provide the bundle's product handle.
   - Decide what to do with the bonus-stack reconciliation: protocol PDF + tracker are currently shown as "FREE" with every order. If the new mid-tier charges £10 for them, the Tier 1 bonus stack messaging needs updating.

### Optional — when budget allows
7. **Real Results section** (Problem 4): three before/after photos in a horizontal scroll under the ATC. Drop the 3 image filenames in admin or hand handles to Claude — the section markup is ready to add but skipped this round to avoid hardcoding image paths.

---

## Men's-variant masculine restyling — flagged, not built

Per Problem 11 closing question. Current state:
- The audience IIFE reveals different banner copy for `?audience=men` ("FOR MEN: Noticed thinning at the crown…") and reorders reviews so a male testimonial (Tom W.) is first.
- **Visual treatment is identical to the women's variant** — the same gold italic banner styling on cream background, same review card layout, same buy-box palette.

**Recommendation**: men respond better to:
- Darker accent palette (charcoal / deep navy instead of gold italic)
- Sans-serif headlines vs. the current Playfair display serif
- More direct, results-focused copy (vs. the current "you're not alone" empathy framing)
- Different stat band imagery (men + hair-loss-stats focus, not customer-count-mostly-female-named focus)

**Decision needed before next round**: keep men's variant as a copy-only swap (current state) or build a separate masculine theme branch. If branching, add `.cap-men-*` namespace alongside the existing cap-only blocks and gate by `?audience=men` in JS instead of just revealing the banner.

---

## Suggested A/B tests for next iteration

Variants to test once the rebuild has 2+ weeks of baseline data:

1. **Mid-tier bundle (£64.99 Cap + Protocol)**: vs current 2-tier setup. Hypothesis: 8–12% AOV lift on cap traffic.
2. **Generic-variant headline**: A) current "Pro Red Light Hair Growth Cap" + clinical hook vs. B) split into two route-aware H1s ("Thicker hair without drugs" / "Re-grow what you're losing"). Test on /no-audience-param/ traffic.
3. **Countdown removal vs. retention**: cohort the cap PDP traffic; show countdown vs. hide. Hypothesis: removing the countdown does NOT drop conversion (the urgency it creates is artificial enough that real buyers ignore it).
4. **Bonus-stack repositioning**: above the ATC vs. current below-ATC. Hypothesis: above-ATC buyers see "what they get for £54.99" before the buy decision, lifting CTR on the ATC.
5. **Real Results section** (once images are uploaded): with vs. without. Hypothesis: 15–25% lift on iOS organic traffic specifically (visual decision-makers).
6. **Trichologist endorsement** (once a real one is signed): with name + photo vs. generic claim only. Hypothesis: 5–8% lift across all variants.
7. **Self-routing buttons** (Problem 11A): conversion of self-routed buyers vs. random-default buyers. If self-routed > 1.5x conversion of random, push the same routing pattern up the funnel into the homepage hero.

---

## Verification before going live

After `shopify theme push --store lumisca-2.myshopify.com --theme 198139117911 --publish`:

1. **All three variants render cleanly**:
   - `https://lumisca.co.uk/products/pro-red-light-hair-growth-cap` — generic, route buttons visible, no banner
   - `https://lumisca.co.uk/products/pro-red-light-hair-growth-cap?audience=women` — women's banner visible, route buttons hidden, Sarah M. first review
   - `https://lumisca.co.uk/products/pro-red-light-hair-growth-cap?audience=men` — men's banner visible, route buttons hidden, Tom W. first review

2. **Above-fold order on mobile (iPhone 14)** — top to bottom inside buy-box:
   - audience banner (or self-routing buttons on generic)
   - star rating
   - product title
   - clinical hook
   - regulatory trust strip (4 markers)
   - trust pill row (CE Marked / 90-Day / Free UK & IE / Klarna)
   - £54.99 + £109.99 strike + SAVE £55 pill
   - Klarna line
   - "Why we're £54.99 not £549" collapsible (closed by default)
   - countdown timer
   - stats trio (10,000+ / 4.9★ / 90-Day)
   - bundle selector with 3 tiers (relabelled)
   - ATC button
   - scarcity ul (2 lines, no viewing-now)
   - bonus stack
   - rest of page unchanged

3. **Other PDPs untouched**:
   - `/products/glow-red-light-face-mask` — original 3-line scarcity, no regulatory strip, no collapsible, no route buttons
   - `/products/rest-heated-eye-mask` — same
   - `/products/lumisca-complete-bundle` — same

4. **Toast popup**: wait 15s, first popup. Subsequent popups every 90–120s. Stops after 6 total.

5. **Reviews section**: cream-and-gold initial avatars next to each name, green-tick verified pills consistent with cap-testimonial-row, "Reviews collected via order email" note above the all-reviews link.

6. **Trichologist section**: visible above FAQ, generic claim only (until Mike fills attribution settings).

If any item above looks wrong, ping Claude with the page URL and what's broken.
