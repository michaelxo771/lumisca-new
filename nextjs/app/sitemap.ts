import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const BASE = "https://lumisca.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/collections/all", "/about", "/science", "/reviews", "/faq", "/contact"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${BASE}/products/${p.handle}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
