"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/types";
import { useCart } from "@/components/layout/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function StickyATC({ product }: { product: Product }) {
  const [show, setShow] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const main = document.getElementById("main-atc");
    if (!main) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(main);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: "spring", damping: 24, stiffness: 220 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-cream border-t border-neutral-light p-3 md:p-4 shadow-premium md:hidden"
        >
          <div className="mx-auto max-w-md flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-neutral-mid truncate">{product.shortName}</p>
              <p className="font-display text-lg leading-none">{formatPrice(product.price)}</p>
            </div>
            <button
              onClick={() => addItem(product)}
              className="flex-shrink-0 h-12 px-6 bg-brand-red text-white uppercase tracking-[0.15em] text-sm font-medium"
            >
              Add To Cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
