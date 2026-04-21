/**
 * Shopify Storefront API client
 * ---------------------------------------------------------------------------
 * This file is intentionally a thin wrapper around the Shopify Storefront API.
 * It currently falls back to the mock data in `lib/products.ts` so the store
 * runs out-of-the-box on Vercel with zero config.
 *
 * To go live against a real Shopify store:
 *
 *  1. Create a private Storefront API access token in your Shopify admin:
 *       Settings → Apps and sales channels → Develop apps →
 *       "Create an app" → "Configure Storefront API scopes" →
 *       enable `unauthenticated_read_product_listings`,
 *              `unauthenticated_read_product_inventory`,
 *              `unauthenticated_write_checkouts`,
 *              `unauthenticated_read_checkouts`.
 *
 *  2. Copy `.env.local.example` to `.env.local` and fill in:
 *       NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
 *       NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
 *
 *  3. Set the same env vars in your Vercel project settings.
 *
 *  4. Remove the `USE_MOCK` branch inside `shopifyFetch()` to route live
 *     traffic through Shopify.
 *
 *  5. Replace `getAllProducts()` / `getProductByHandle()` with GraphQL
 *     queries against the Storefront API (templates below).
 *
 * Everything downstream — product pages, collection pages, cart drawer —
 * reads from the `Product` / `CartItem` types in `types/index.ts`, so the
 * swap is a drop-in once the queries are in place.
 */

import { PRODUCTS, getProduct as getMockProduct } from "./products";
import type { Product } from "@/types";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const USE_MOCK = !SHOPIFY_DOMAIN || !SHOPIFY_TOKEN;

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  if (USE_MOCK) {
    // Mock mode — callers fall back to the data in lib/products.ts
    return null;
  }
  try {
    const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: T };
    return json.data;
  } catch {
    return null;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  // Live implementation would query Shopify `products(first: 100) { edges { node { ... } } }`
  // and map the response to the local `Product` shape. Until then, serve mock data.
  return PRODUCTS;
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  // Live implementation would query Shopify `productByHandle(handle: $handle)`
  // and map to the local `Product` shape.
  return getMockProduct(handle);
}

/**
 * Checkout handoff
 * ---------------------------------------------------------------------------
 * On real Shopify the CartDrawer would call a `cartCreate` / `cartLinesAdd`
 * mutation and redirect the user to `cart.checkoutUrl`. In mock mode we
 * simply display an alert so the flow is visible in development.
 */
export async function createCheckoutUrl(lines: { variantId: string; quantity: number }[]): Promise<string> {
  if (USE_MOCK) {
    return "#checkout-mock";
  }
  // TODO: replace with cartCreate mutation and return cart.checkoutUrl
  return "#checkout";
}
