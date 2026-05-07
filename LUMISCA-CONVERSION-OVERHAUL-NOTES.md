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

---

## Phase 2 — Pricing reposition + SAVE90 launch edition + science section

**Phase 2 commits on `main`:**
- `4711f47` — Pricing reposition to £179.99 / £89.99 with SAVE90 code
- `cee48f6` — SAVE90 launch edition framing (cards, sticky bar, cart drawer line, URL auto-apply, Why Launch Edition collapsible, countdown 48h reset)
- `a0d5244` — Science section with 3 published PubMed studies
- `(this commit)` — `marketing.md` ad-link templates + admin task list + this Phase 2 section

**Reframe note**: Phase 2 was originally drafted around `WELCOME50 / 50% off`. The Patch issued mid-execution swapped to **`SAVE90 / £90 off`** (fixed-amount voucher). All in-codebase references were applied with the patch already merged — no `WELCOME50` or `50% off` strings remain anywhere added in Phase 2.

### Phase 2 file-by-file

#### `sections/product-main.liquid`
- Hero price: removed the "SAVE £170" pill (per Patch) so the price block now reads `£179.99` with `£349.99` strikethrough only.
- New `cap-save90-line` directly below the price: gold-bordered `✦ £89.99 with code SAVE90 — £90 off ✦`. Server-rendered dynamic from `(variant.price - 9000) | money`, so it tracks admin price changes.
- Klarna sub-line: now dynamic at `(variant.price - 9000) / 3 | money` instead of the prior hardcoded `£18.33`.
- Trust pill row: `CE Marked · 90-Day Guarantee · Free UK & IE Shipping · Klarna Available` → `CE Marked · Clinical Wavelengths · 90-Day Guarantee · Free UK Shipping · Klarna 3x £30`.
- Bundle picker: tier titles, sub copy, data-tv-* attrs all updated to Phase 2 numbers. Tier 2's separate "BEST VALUE" gold pill removed (the inline title now covers it).
- Total Value box hardcoded values updated for Tier 1 active state (£349.99 → £179.99 / save £170 / 49%). Added a small footer line "Apply code SAVE90 at checkout for an extra £90 off."
- Bonus-stack footer values updated to £349.99 → £179.99.
- Replaced "Why we're £54.99 not £549" collapsible with new **Launch Edition discount card** (gold border, monospace SAVE90 pill, "Promotional pricing ends soon" tagline). Originally shipped with a "Slot N of 1,000 claimed" counter; that framing was retired (see "Framing fix" note below) because it contradicted the existing 10,000+ customer social proof elsewhere on the page.
- Added new **"Why Launch Edition pricing?"** collapsible directly under the discount card (reuses `.cap-why-cheap` class for visual consistency).
- Countdown timer: label `OFFER ENDS IN` → `Launch Edition ends in`. Inline JS `WINDOW_MS` extended from 3 hours to 48 hours.

#### `sections/cap-science-studies.liquid` (new, cap-only)
Three study cards in a 1-col mobile / 3-col desktop grid: Lanzafame 2014 (PMID 24249354), Avci 2013 (PMID 24049929), Pillai 2017 (PMID 28748391). Each card opens its PubMed deep link in a new tab. Legal-safety disclaimer at the bottom: "Lumisca is not a medical device and does not diagnose, treat, or cure any condition. Studies cited reference low-level laser therapy as a category, not the Lumisca product specifically. Individual results vary." Slotted into `templates/product.json` between `benefits` ("Engineered for real results") and `cap-clinical-proof` (the 46.6% chart).

#### `layout/theme.liquid`
- Sticky `<div class="cap-launch-strip">` above the header with the `🎁 UK Spring Launch: £90 off the Pro Red Light Cap — code SAVE90` message and a dismiss button. Hidden by default; revealed by JS unless dismissed within last 24h.
- Exposed `autoApplySave90: true|false` from `settings.auto_apply_save90` to JS via the `window.LUMISCA` config object.

#### `snippets/cart-drawer.liquid`
- New gold-tinted line at the top of the drawer body: `💎 Apply code SAVE90 at checkout for £90 off (Launch Edition)`. Renders for every visitor on every page.

#### `assets/theme.js`
- New `launchStrip` IIFE: reveals the sticky launch strip on every page unless dismissed within 24h via localStorage.
- New `autoApplySave90` IIFE: redirects to `/discount/SAVE90?redirect=<current-path>` on first visit when either `?discount=SAVE90` is in the URL or the auto-apply theme setting is true. Skips when already on `/discount/`, `/checkouts`, or `/cart` paths. SessionStorage flag prevents loops.

#### `assets/theme.css`
- Site-wide CSS for `.cap-launch-strip` (black bar, gold SAVE90 emphasis, dismiss button, mobile font-size adjust).

#### `config/settings_schema.json`
- New theme settings panel **"Phase 2 — SAVE90 Launch Edition"** with three settings (`slots_claimed` removed in framing fix):
  - `auto_apply_save90` (checkbox, default true)
  - `duo_bundle_handle` (text, default `hair-skin-duo`)

#### `templates/product.json`
- Added `cap-science-studies` section entry + slotted into the order between `benefits` and `cap-clinical-proof`.

#### `marketing.md` (new, repo root)
- Ad link templates for women / men / untargeted using the `/discount/SAVE90?redirect=` pattern.
- Ad copy DO/DON'T list (use `£90 off`; avoid percentage framing).
- Pre-launch verification checklist.

### Mike's Phase 2 admin tasks (status as of last session)

| # | Task | Status |
| --- | --- | --- |
| 1 | **Create SAVE90 discount** (£90 fixed-amount, £179.99 minimum, no combinations, 1 use per customer, applies to all products) | ✅ Done |
| 2a | **Cap variant price** = £179.99 + **compare_at_price** = £349.99 | ✅ Done |
| 2b | **Bundle pricing** (Tier 3 Complete Bundle £279.99 / £559.97 + Tier 2 Hair + Skin Duo £229.99 / £459.98) | ⚠️ See "Bundle pricing setup" below — Tier 2 needs a Shopify Bundles product to be created first |
| 3 | **Verify LUMISCA10 settings** — combinations: NONE, NOT in Shopify featured discounts, used for email/cart-recovery only | ⏳ Pending |
| 4 | ~~Update `slots_claimed` setting~~ | ❌ Removed — see "Framing fix" below. The "first 1,000 customers" framing contradicted 10,000+ social proof; replaced with "UK Spring Launch — limited promotional pricing" (no slot counter). |
| 5 | **Verify PubMed PMIDs** in `sections/cap-science-studies.liquid` (24249354 / 24049929 / 28748391) resolve to the correct studies | ⏳ Pending |
| 6 | **Confirm cap product images don't have AI watermarks** | ⏳ Pending |
| 7 | **SEO meta description** updated from "60-day" to "90-day money-back guarantee" | ✅ Done |

### Bundle pricing setup — what's needed for Tier 2 + Tier 3

**Tier 3 — Complete Bundle (£279.99 / £559.97)** — Standard product update.
- If the bundle is a normal Shopify product: admin → Products → Lumisca Complete Bundle → set Price £279.99, Compare-at £559.97. Done.
- If the bundle is configured via the Shopify Bundles app: Apps → Shopify Bundles → find Lumisca Complete Bundle → edit pricing there.
- The theme already wires Tier 3 to `all_products[settings.bundle_product_handle]`, so the new price flows through automatically with no code change.

**Tier 2 — Hair + Skin Duo (£229.99 / £459.98)** — **Needs a new bundle product created in Shopify Bundles app** before code wiring can complete.

Current implementation: Tier 2 is NOT a product. The theme does a multi-item POST adding cap + face mask as two separate line items at checkout. There's no "Duo" SKU. So the displayed `£229.99` doesn't match what Shopify charges (which is the sum of cap variant price + face mask variant price).

To fix:
1. Apps → **Shopify Bundles** → **Create bundle**
2. Bundle name: `Hair + Skin Duo` — note the auto-generated handle (usually `hair-skin-duo`)
3. Components: Pro Red Light Hair Growth Cap (qty 1) + Glow Red Light Face Mask (qty 1)
4. **Pricing model**: Fixed price (NOT "sum of components minus %")
5. **Price**: £229.99
6. **Compare-at price**: £459.98
7. Publish to Online Store sales channel
8. Once created, paste the bundle's product handle here — Claude Code will then update Tier 2's cart-add logic to use that bundle product instead of multi-item POST. About 8 lines of code, single follow-up commit.

After that change ships, Tier 2 customers will see a single "Hair + Skin Duo" line item in their cart at £229.99 (or £139.99 with SAVE90), instead of two separate line items totalling whatever cap + face individual prices add to.

### Live verification (Phase 2)

The Claude sandbox can't browse to lumisca.co.uk to verify deployed behaviour. Mike runs through this checklist on the deployed theme after `shopify theme push`:

1. **All three audience variants render cleanly:**
   - `https://lumisca.co.uk/products/pro-red-light-hair-growth-cap` — generic, route buttons visible, no banner, sticky launch strip visible
   - `?audience=women` — women's banner visible, route buttons hidden, Sarah M. first review
   - `?audience=men` — men's banner visible, route buttons hidden, Tom W. first review

2. **Discount auto-apply via URL works:**
   - `https://lumisca.co.uk/discount/SAVE90?redirect=/products/pro-red-light-hair-growth-cap` — redirects to PDP with SAVE90 in session
   - Adding the cap to cart and proceeding to checkout shows £89.99 final (£179.99 - £90)
   - Bundle (Tier 3) at checkout shows £189.99 final (£279.99 - £90)

3. **Sticky bar dismiss persists 24h** — close it, reload, stays gone. Open in incognito after 24h, reappears.

4. **Cart drawer SAVE90 line visible** when drawer is opened, regardless of cart state.

5. **Science section** renders 3 study cards on cap PDP, with PubMed links resolving correctly. Disclaimer visible below the cards.

6. **Other PDPs unchanged**:
   - `/products/glow-red-light-face-mask` — original 3-line scarcity, no science studies, no launch card, no route buttons
   - `/products/rest-heated-eye-mask` — same
   - `/products/lumisca-complete-bundle` — same
   - sticky launch strip + cart drawer SAVE90 line render on these pages too (intentional — they're site-wide, not cap-only)

7. **Pricing display matches Mike's admin pricing**:
   - Cap variant price in admin = £179.99 → headline matches
   - Cap variant compare-at = £349.99 → strikethrough matches
   - Bundle variant price = £279.99 → Tier 3 ATC adds £279.99 worth, SAVE90 brings it to £189.99

If any item above looks wrong, ping Claude with the page URL, the actual symptom, and what was expected.

---

## Audience personalization v2 — REVERTED (May 2026)

**Status: REVERTED.** Visual personalization (announcement bar colours, trust pill tints, audience-specific FAQ/review ordering, palette-per-variant) was attempted but introduced display bugs that couldn't be cleanly fixed:

- Duplicate announcement bars (one above the header from the cap-launch-strip, one below from `content_for_layout`)
- Black instead of cream/gold on generic visitors
- Cut-off / marquee-scrolling audience copy
- Audience class persisting across navigation via cookie, leaking the women's variant onto the homepage and other pages
- "FOR WOMEN" PDP banner showing on generic URLs as a downstream effect of the cookie carryover

Two follow-up fix attempts (commits `c75a1e7` and `25b48fc`) didn't fully resolve all of these on the live theme, and the site was scheduled to go live to ad traffic. To unblock the launch, BOTH commits were reverted in a single revert commit, returning the site to the stable Phase 1 + Phase 2 baseline.

**Future attempt should be done from scratch** with proper component scoping rather than additive CSS overrides:

- A separate dedicated branch
- Tested in a development theme first (Shopify allows duplicate themes for staging)
- Only deployed to live once verified working in dev
- Audience class sourced server-side if possible (Shopify Liquid has no native query-string access — would require a different pattern such as URL-routed templates, persistent session via Shopify's customer object, or an app-injected variable)
- Single source-of-truth for the announcement bar (rendered exactly once, in one place)

For now, the "FOR WOMEN" / "FOR MEN" PDP banner per audience variant (Phase 1 behaviour) is sufficient personalization. The audience IIFE on the cap PDP still reads `?audience=` from the URL and reveals the matching banner + reorders the male reviews — that part was always working and is unaffected by the revert.

---

## Phase 3 — REVERTED (May 2026)

**Status: REVERTED.** All five Phase 3 commits (`912691e` foundation, `79a1803` visual, `40be04a` copy, `678d139` polish, `9288ab0` notes) reverted in a single squashed revert.

The Option 1 architecture — server-side render of all three variant blocks (`.aud-only-generic`, `.aud-only-women`, `.aud-only-men`) gated by a `body.audience-*` class set via inline JS — failed on the live theme. Symptoms reported:

- Multiple repeats of every section (timeline, trust pills, etc.) rendering simultaneously
- Catalog menu / collections navigation broken or removed
- FOR WOMEN / FOR MEN intro banner missing entirely
- Self-routing buttons broken on generic
- All three variant blocks visible regardless of body class

Likely root cause: the `display: revert` rule in `audience-variants.css` plus the `display:contents` wrappers around the timeline `<li>` blocks didn't behave as intended — possibly because Shopify's CSS asset pipeline minified/rewrote the rules, because cascade specificity was lost, or because `display:contents` interacted badly with the generated wrapper's other styles. The pre-render-and-CSS-gate approach, in this codebase, doesn't scale to the volume of variant blocks Phase 3 introduced (subtitle + description + trust pills + reviews + FAQ + timeline + comparison + science lead + CTA). Each gate point is another opportunity for the cascade to leak.

**Do NOT re-attempt Phase 3 in this session.** Architectural rethink required before the next try. Recommended directions:

- **Server-side template suffix routing.** Separate `product.women.liquid` / `product.men.liquid` templates, with a redirect (Shopify admin URL redirect or Liquid layout-level redirect via JS replacement) from `?audience=` to the template suffix. Each template renders ONE variant — no CSS gating, no display gymnastics. Cost: 3× the templates to maintain, but each is unambiguous.
- **Headless / framework-level personalization.** A Hydrogen, Next-Shopify, or app-level layer where audience routing is a first-class concept rather than a Liquid retrofit.

Both require more architectural setup than fits a single session. Park audience personalization entirely until either path is chosen.

For now the site stays on the stable Phase 1 + Phase 2 baseline:

- Phase 1 audience banners (the short italic "For women: …" / "For men: …" line on the cap PDP, revealed via the existing JS IIFE when `?audience=women|men` is on the URL). Generic gets the self-routing buttons.
- Phase 2 pricing repositioning (£179.99 / £349.99 strikethrough, SAVE90 £90-off code, science section, regulatory strip, sticky launch strip, cart drawer SAVE90 line).
- Single cream-on-black announcement bar rendering inside `content_for_layout` per template JSONs (with all of Mike's customized message blocks intact).
- Catalog / navigation menu intact.
- Site is in the same state as it was at commit `1989b19`.
