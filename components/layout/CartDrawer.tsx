"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, updateQuantity, removeItem, itemCount } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const hasBundle = items.some((i) => i.product.handle === "lumisca-complete-bundle");
  const showBundleUpsell = items.length > 0 && items.length < 3 && !hasBundle;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-cream flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-light">
              <h2 className="font-display text-xl">
                Your Cart <span className="text-neutral-mid text-sm font-sans">({itemCount})</span>
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 -mr-2 flex items-center justify-center"
                aria-label="Close cart"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 bg-white border-b border-neutral-light">
                {remaining > 0 ? (
                  <p className="text-sm text-neutral-mid">
                    You're <span className="text-ink font-semibold">{formatPrice(remaining)}</span> away from free UK delivery
                  </p>
                ) : (
                  <p className="text-sm text-brand-red font-semibold">🎉 You've unlocked free UK delivery</p>
                )}
                <div className="mt-2 h-1.5 bg-neutral-light overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-brand-red"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-16 h-16 rounded-full border border-neutral-light flex items-center justify-center mb-4">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-neutral-mid" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M5 7h14l-1.2 11.1a2 2 0 01-2 1.9H8.2a2 2 0 01-2-1.9L5 7z" strokeLinejoin="round" />
                      <path d="M9 7a3 3 0 016 0" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-display text-xl mb-1">Your cart is empty</p>
                  <p className="text-sm text-neutral-mid mb-6 max-w-xs">
                    Add a Lumisca device to start your at-home light therapy routine.
                  </p>
                  <Button variant="red" size="md" href="/collections/all" onClick={closeCart}>
                    Shop The Collection
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-light">
                  {items.map((i) => (
                    <li key={i.id} className="p-6 flex gap-4">
                      <div className="w-20 flex-shrink-0">
                        <PlaceholderImage
                          label={i.product.shortName}
                          aspect="aspect-square"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${i.product.handle}`}
                          onClick={closeCart}
                          className="font-display text-base leading-tight block hover:text-brand-red transition-colors"
                        >
                          {i.product.name}
                        </Link>
                        <p className="text-sm text-neutral-mid mt-0.5">{formatPrice(i.product.price)}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-neutral-light">
                            <button
                              onClick={() => updateQuantity(i.product.id, i.quantity - 1)}
                              className="w-9 h-9 flex items-center justify-center text-lg"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums">{i.quantity}</span>
                            <button
                              onClick={() => updateQuantity(i.product.id, i.quantity + 1)}
                              className="w-9 h-9 flex items-center justify-center text-lg"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(i.product.id)}
                            className="text-xs text-neutral-mid underline underline-offset-4 hover:text-brand-red"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                  {showBundleUpsell && (
                    <li className="p-6 bg-ink text-cream">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-brand-gold mb-2">Upgrade & Save</p>
                      <h3 className="font-display text-xl mb-2">Go Complete — save £174.98</h3>
                      <p className="text-sm text-cream/70 mb-4">
                        Add all 3 devices for just £124.99 — less than buying two individually.
                      </p>
                      <Button variant="red" size="sm" href="/products/lumisca-complete-bundle" onClick={closeCart} fullWidth>
                        View The Bundle
                      </Button>
                    </li>
                  )}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-neutral-light p-6 space-y-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm tracking-[0.15em] uppercase text-neutral-mid">Subtotal</span>
                  <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-neutral-mid">
                  Shipping and taxes calculated at checkout. Free UK delivery on orders over £50.
                </p>
                <Button variant="red" size="lg" fullWidth href="#checkout">
                  Secure Checkout
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M10 2v2M14 2v2M6 8h12l-1 12H7L6 8z" strokeLinecap="round" />
                  </svg>
                </Button>
                <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.15em] uppercase text-neutral-mid">
                  <span>🔒 Secure</span>
                  <span>·</span>
                  <span>60-Day Returns</span>
                  <span>·</span>
                  <span>Free UK Delivery</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
