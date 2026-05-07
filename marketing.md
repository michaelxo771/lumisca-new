# Lumisca Marketing — Ad Link Templates & Copy Guidance

Last updated: Phase 2 follow-up — cold/warm URL split.

---

## Strategic split — cold traffic vs. warm traffic

Two URL patterns. Use them deliberately depending on the audience.

**COLD TRAFFIC** (Meta prospecting, cold audiences, lookalike, broad targeting): use the direct PDP link. The customer sees the £179.99 anchor and the prominent SAVE90 callout, types the code manually at checkout for the dopamine hit and conversion lift.

**WARM TRAFFIC** (retargeting, abandoned-cart emails, email automation, returning visitors): use the /discount/SAVE90 auto-apply URL. These customers already trust the brand and just need friction removed.

Why the split: pre-applying on cold traffic kills the £179.99 → £89.99 transition. The discount becomes invisible — by the time they reach checkout the price was "always" £89.99 in their mental model. Asking the cold buyer to type six characters creates ownership of the deal. On warm traffic the calculus flips: the buyer already knows the price, and friction removal beats the dopamine hit.

### Cold-traffic templates (default)

Women's audiences:
```
https://lumisca.co.uk/products/pro-red-light-hair-growth-cap?audience=women
```

Men's audiences:
```
https://lumisca.co.uk/products/pro-red-light-hair-growth-cap?audience=men
```

Untargeted / lookalike / branded / unspecified:
```
https://lumisca.co.uk/products/pro-red-light-hair-growth-cap
```

### Warm-traffic templates (retargeting + email + SMS only)

Retargeting — women:
```
https://lumisca.co.uk/discount/SAVE90?redirect=/products/pro-red-light-hair-growth-cap?audience=women
```

Retargeting — men:
```
https://lumisca.co.uk/discount/SAVE90?redirect=/products/pro-red-light-hair-growth-cap?audience=men
```

Retargeting / email / SMS — untargeted:
```
https://lumisca.co.uk/discount/SAVE90?redirect=/products/pro-red-light-hair-growth-cap
```

When a visitor clicks one of the /discount/ URLs, Shopify stores SAVE90 in their session before they see the PDP. The cart drawer shows £89.99 with a green ✓ "SAVE90 applied" line, and checkout total is already discounted — no manual code entry needed.

### What happens if SAVE90 isn't created in admin

Both URL patterns assume SAVE90 exists in Shopify admin. The /discount/SAVE90 endpoint will return a "discount not found" error. The cold-PDP path will display the code on the page but the customer's manual entry will be rejected at checkout. Mike must create the code in Shopify admin → Discounts before going live. See "Admin tasks" below.

---

## Ad copy framing — DO and DON'T

### DO use

- "**£90 off** — UK Spring Launch"
- "**£90 off** our Pro Red Light Cap (UK promotional pricing)"
- "**£90 off** — code SAVE90 at checkout"
- "Get **£90 off** the Lumisca Pro Cap"
- "Spring Launch — £90 off with code SAVE90"
- "Drug-free hair regrowth — £89.99 with code SAVE90"
- "Clinical 660nm + 850nm wavelengths — £89.99 launch price"

### DON'T use

- ~~"50% off"~~ — we're not framing as a percentage. Percentage discounts trigger scam alarms in clinical/wellness categories where £400+ competitors dominate.
- ~~"Half price"~~ — same reason.
- ~~"60% off" / "70% off" / any stacked percentage claim~~ — the maths look great but read as deal-of-the-day, not Launch Edition.
- ~~"FREE £90 voucher"~~ — sounds scammy. The £90 isn't free; it's a launch-edition discount.
- ~~"Limited time only" without specifics~~ — pair urgency with a believable anchor (the "Spring Launch" period is strong; a generic "limited time" isn't).
- ~~"Doctor recommended"~~ unless we have a real practitioner endorsement on file. Currently the cap PDP says "wavelengths recommended by trichologists worldwide" — generic claim, legally safe. A specific named doctor endorsement requires their written permission.

### Tone

The £90-off framing positions the discount as a fixed-value Launch Edition offer, not a percentage sale. This converts better in clinical/wellness categories where percentage discounts trigger scam alarms — buyers reading "50% off a £179 device" think "this is fake, the real price IS £89.99". Buyers reading "£90 off our Launch Edition pricing" think "I'm getting in early on a real launch."

---

## URL parameter quick reference

| Param | Effect | Notes |
| --- | --- | --- |
| `?audience=women` | Reveals "FOR WOMEN" gold banner; reviews stay default | Use for female-targeted ad sets |
| `?audience=men` | Reveals "FOR MEN" banner; first review swapped to Tom W. | Use for male-targeted ad sets |
| `?discount=SAVE90` | Forces the auto-apply redirect even on direct PDP URLs | Optional escape hatch. Equivalent to using the /discount/ prefix. Don't use on cold traffic — defeats the cold-traffic strategy |
| (no params) | Generic variant — shows "Which experience matches you?" self-routing buttons | Default landing for branded/organic search traffic |

The /discount/ prefix is the canonical way to auto-apply on warm traffic. The `?discount=SAVE90` query param is supported as a fallback for systems that can't construct /discount/-prefixed URLs.

---

## Admin tasks — Mike

Before any of the above URLs work end-to-end, complete these in Shopify admin:

### 1. Create the SAVE90 discount code

Shopify admin → Discounts → Create discount → Amount off products

| Field | Value |
| --- | --- |
| Discount code | `SAVE90` |
| Discount type | Amount off products |
| Value | **£90.00** |
| Applies to | All products |
| Minimum purchase requirement | £179.99 minimum order amount |
| Customer eligibility | All customers |
| Maximum discount uses | 1 use per customer |
| Combinations | **None** — uncheck "Can be combined with other product / order / shipping discounts" |
| Active dates | Start: today / End: today + 90 days (renewable) |

### 2. Verify LUMISCA10 (still active for email/recovery only)

Shopify admin → Discounts → LUMISCA10

| Field | Value |
| --- | --- |
| Combinations | **None** — disable stacking |
| Featured | **Off** — must NOT appear in any "Featured Discounts" lists that auto-render in checkout |
| Surface on PDP | **No** — used in welcome popup / cart-recovery email only |

The two codes serve different purposes (SAVE90 = launch acquisition, LUMISCA10 = email signup / recovery). Stacking would double-discount.

### 3. Set compare_at_price values on the cap, face mask, eye mask, and bundle products

Shopify admin → Products → for each:

| Product | Variant price | Compare-at price |
| --- | --- | --- |
| Pro Red Light Hair Growth Cap | £179.99 | £349.99 |
| Glow Red Light Face Mask | £109.99 | (depends — set so cap+face combined RRP = £459.98) |
| Rest Heated Eye Mask | (no PDP changes Phase 2) | — |
| Lumisca Complete Bundle | £279.99 | £559.97 |

Without these set, the headline "was £349.99" / "was £459.98" / "was £559.97" strikethroughs render correctly on the PDP via Shopify's native compare_at_price logic — but the bundle picker tier copy hardcodes those numbers anyway, so the picker UI is consistent regardless. The discrepancy you'd see if admin prices drift: the cart subtotal at checkout won't match the PDP's tier price.

### 4. Update the slots-claimed counter as orders come in

Shopify admin → Online Store → Themes → Customize → Theme settings → "Phase 2 — SAVE90 Launch Edition"

The launch framing is now "UK Spring Launch — limited promotional pricing" (not "first 1,000 UK customers", which contradicted the 10,000+ customer social proof elsewhere on the page). There is no slot counter to update — the "Promotional pricing ends soon" line on the discount card is static.

### 5. Auto-apply theme setting (leave OFF for the cold-traffic strategy)

Same theme settings panel as above. The `auto_apply_save90` checkbox is now **OFF by default**, which is the recommended state for the current cold/warm split.

- **OFF (default, recommended):** cold visitors see the £179.99 anchor on the PDP and the prominent SAVE90 copy chip. Warm/recovery URLs (`/discount/SAVE90?redirect=…`) still auto-apply for retargeting + email + SMS audiences. This is the cold-traffic strategy.
- **ON:** every first-time visitor — cold or warm — is redirected through /discount/SAVE90. Overrides the cold-traffic strategy. Only flip this back on if testing shows the silent-auto-apply variant outperforms manual entry on cold spend (it usually doesn't, in this category).

---

## Pre-launch verification checklist

Before flipping the first paid traffic spend window:

- [ ] SAVE90 discount created in Shopify admin (£90 fixed amount)
- [ ] Compare-at prices set on cap / bundle in admin
- [ ] Test order: cap + SAVE90 at checkout charges £89.99 final
- [ ] Test order: bundle + SAVE90 at checkout charges £189.99 final
- [ ] **Cold path:** /products/pro-red-light-hair-growth-cap shows £179.99, SAVE90 copy chip visible, ATC opens drawer with £179.99 + 💎 prompt, manually typing SAVE90 at checkout reduces total to £89.99
- [ ] **Warm path:** /discount/SAVE90?redirect=/products/pro-red-light-hair-growth-cap stores discount in session, ATC opens drawer with £89.99 + ✓ "SAVE90 applied" line, checkout total already £89.99
- [ ] Tap-to-copy chip on cap PDP changes label to "Copied" for ~2s after tap, copies SAVE90 to clipboard
- [ ] /products/pro-red-light-hair-growth-cap?audience=women shows women's banner + Sarah M. first review
- [ ] /products/pro-red-light-hair-growth-cap?audience=men shows men's banner + Tom W. first review (or Connor S. / Mark P. fallback)
- [ ] /products/pro-red-light-hair-growth-cap (no params) shows the self-routing buttons
- [ ] Sticky launch strip above header shows on first visit, dismisses for 24h on close
- [ ] Theme setting `auto_apply_save90` is OFF in the published theme
- [ ] Science section renders the 3 study cards with PubMed links resolving correctly
- [ ] Disclaimer ("Lumisca is not a medical device…") visible below the science cards
