"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const img = product.images[active] ?? product.images[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
      <div className="flex md:flex-col gap-3 md:gap-4 md:w-20 overflow-x-auto md:overflow-visible no-scrollbar">
        {product.images.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "flex-shrink-0 w-20 md:w-full border-2 transition-colors",
              i === active ? "border-brand-red" : "border-neutral-light hover:border-ink/30"
            )}
            aria-label={`View image ${i + 1}: ${thumb.alt}`}
          >
            <PlaceholderImage label={thumb.placeholder ?? `Image ${i + 1}`} aspect="aspect-square" />
          </button>
        ))}
      </div>
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <PlaceholderImage label={img.placeholder ?? product.shortName} aspect="aspect-[4/5]" />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setActive((a) => (a - 1 + product.images.length) % product.images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/90 backdrop-blur border border-neutral-light flex items-center justify-center md:hidden"
          aria-label="Previous image"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => setActive((a) => (a + 1) % product.images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/90 backdrop-blur border border-neutral-light flex items-center justify-center md:hidden"
          aria-label="Next image"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M9 6l6 6-6 6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
