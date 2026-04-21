"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/layout/CartProvider";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function CartUpsellPopup() {
  const { justAdded, dismissJustAdded, items } = useCart();
  const [visible, setVisible] = useState(false);
  const bundle = PRODUCTS.find((p) => p.handle === "lumisca-complete-bundle")!;
  const hasBundle = items.some((i) => i.product.handle === "lumisca-complete-bundle");

  useEffect(() => {
    if (!justAdded) return;
    if (justAdded.handle === "lumisca-complete-bundle") {
      dismissJustAdded();
      return;
    }
    if (hasBundle) {
      dismissJustAdded();
      return;
    }
    // only fire on single-product adds (drawer also opens separately via CartProvider)
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, [justAdded, hasBundle, dismissJustAdded]);

  const close = () => {
    setVisible(false);
    dismissJustAdded();
  };

  return (
    <AnimatePresence>
      {visible && justAdded && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-ink/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed inset-x-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:bottom-8 z-[55] md:max-w-lg md:w-full"
            role="dialog"
            aria-label="Upgrade to bundle"
          >
            <div className="bg-cream border border-neutral-light shadow-premium">
              <div className="p-5 md:p-6 flex items-start gap-4">
                <div className="w-20 flex-shrink-0">
                  <PlaceholderImage label="Bundle" aspect="aspect-square" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-semibold">
                    Upgrade & Save £174
                  </p>
                  <h3 className="font-display text-lg leading-tight mt-1 mb-1">
                    Add the other 2 devices and save 58%
                  </h3>
                  <p className="text-xs text-neutral-mid">
                    Upgrade to the Complete Bundle for just {formatPrice(bundle.price)} — a single purchase for hair, skin and sleep.
                  </p>
                </div>
                <button
                  onClick={close}
                  className="w-8 h-8 -mr-2 -mt-2 flex items-center justify-center text-neutral-mid"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 border-t border-neutral-light">
                <button onClick={close} className="h-12 text-xs tracking-[0.15em] uppercase font-medium">
                  No Thanks
                </button>
                <Link
                  href={`/products/${bundle.handle}`}
                  onClick={close}
                  className="h-12 bg-brand-red text-white flex items-center justify-center text-xs tracking-[0.15em] uppercase font-medium"
                >
                  View The Bundle
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
