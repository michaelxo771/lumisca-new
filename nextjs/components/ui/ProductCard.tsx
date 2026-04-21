"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { calculateSavings, formatPrice } from "@/lib/utils";
import StarRating from "./StarRating";
import Badge from "./Badge";
import PlaceholderImage from "./PlaceholderImage";

type Props = {
  product: Product;
  priority?: boolean;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const savings = calculateSavings(product.price, product.compareAtPrice);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col bg-cream"
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative">
          <PlaceholderImage
            label={product.images[0]?.placeholder ?? product.shortName}
            aspect="aspect-[4/5]"
            className="transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge && <Badge variant={product.category === "bundle" ? "gold" : "red"}>{product.badge}</Badge>}
            {savings && <Badge variant="dark">Save {savings.percentage}%</Badge>}
          </div>
        </div>
      </Link>
      <div className="pt-5 flex flex-col gap-2">
        <StarRating rating={product.rating} size="sm" showNumber reviewCount={product.reviewCount} />
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-brand-red transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-neutral-mid leading-relaxed">{product.tagline}</p>
        <div className="flex items-baseline gap-3 pt-1">
          <span className="font-display text-2xl">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-neutral-mid line-through text-sm">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <Link
          href={`/products/${product.handle}`}
          className="mt-4 inline-flex items-center justify-center h-12 bg-ink text-cream uppercase tracking-[0.15em] text-sm font-medium hover:bg-brand-red transition-colors"
        >
          Shop Now
          <svg viewBox="0 0 24 24" className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
