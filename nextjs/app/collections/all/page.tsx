"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import TrustBar from "@/components/home/TrustBar";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: "All Devices", value: "all" },
  { label: "Hair", value: "hair" },
  { label: "Face & Skin", value: "face" },
  { label: "Sleep & Eyes", value: "eye" },
  { label: "Bundles", value: "bundle" },
];

const SORTS = [
  { label: "Featured", value: "featured" },
  { label: "Price — Low to High", value: "price-asc" },
  { label: "Price — High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

export default function CollectionPage() {
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("featured");

  const products = useMemo(() => {
    let list = cat === "all" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === cat);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [cat, sort]);

  return (
    <>
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-80 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">Shop</p>
          <h1 className="font-display text-display-xl mb-5">The Lumisca Collection</h1>
          <p className="text-cream/75 max-w-2xl mx-auto leading-relaxed">
            Four devices. Three routines. One complete at-home light therapy clinic. All clinically calibrated.
            All free-shipped across the UK. All 60-day guaranteed.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 border-b border-neutral-light">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCat(c.value)}
                  className={cn(
                    "h-10 px-5 text-xs tracking-[0.12em] uppercase font-medium whitespace-nowrap border transition",
                    cat === c.value
                      ? "bg-ink text-cream border-ink"
                      : "border-neutral-light text-ink hover:border-ink"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-3">
              <span className="text-xs tracking-[0.15em] uppercase text-neutral-mid">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 px-3 bg-cream border border-neutral-light text-sm"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          {products.length === 0 && (
            <p className="text-center text-neutral-mid py-16">No products in this category yet.</p>
          )}
        </div>
      </section>

      <TrustBar />
    </>
  );
}
