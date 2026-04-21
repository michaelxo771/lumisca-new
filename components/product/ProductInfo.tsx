"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { calculateSavings, formatPrice, formatTwoDigits, getDeliveryDate, getDispatchCountdown } from "@/lib/utils";
import { useCart } from "@/components/layout/CartProvider";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import CountdownTimer from "@/components/ui/CountdownTimer";
import StickyATC from "./StickyATC";

export default function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState<{ cutoff: string; date: string } | null>(null);
  const savings = calculateSavings(product.price, product.compareAtPrice);

  useEffect(() => {
    const update = () => {
      const c = getDispatchCountdown();
      setDeliveryInfo({
        cutoff: `${formatTwoDigits(c.hours)}h ${formatTwoDigits(c.minutes)}m`,
        date: getDeliveryDate(),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <StarRating rating={product.rating} size="md" showNumber reviewCount={product.reviewCount} />
      </div>

      <h1 className="font-display text-[32px] md:text-[42px] leading-tight">{product.name}</h1>
      <p className="text-neutral-mid text-[15px] leading-relaxed">{product.description}</p>

      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-display text-4xl">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-neutral-mid line-through text-lg">{formatPrice(product.compareAtPrice)}</span>
        )}
        {savings && <Badge variant="red">Save {savings.percentage}% · £{savings.saved.toFixed(2)}</Badge>}
      </div>

      {product.category === "bundle" && (
        <div className="bg-ink text-cream p-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-brand-gold font-semibold">Offer ends in</p>
            <p className="text-cream/70 text-xs mt-1">Price increases at midnight</p>
          </div>
          <CountdownTimer mode="daily" theme="dark" labels={false} />
        </div>
      )}

      <div className="text-xs tracking-[0.1em] uppercase text-neutral-mid flex flex-wrap gap-x-4 gap-y-1 border-t border-b border-neutral-light py-4">
        <span>Free UK Delivery</span>
        <span>·</span>
        <span>60-Day Money Back</span>
        <span>·</span>
        <span className="text-brand-red font-semibold">In Stock — Ships Today</span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-brand-red font-medium">
          <span>⚠️</span>
          <span>Only {product.stock} units remaining</span>
        </div>
        <div className="flex items-center gap-2 text-ink">
          <span>🔥</span>
          <span>
            <strong>{product.soldLast24h} people</strong> bought this in the last 24 hours
          </span>
        </div>
        <div className="flex items-center gap-2 text-neutral-mid">
          <span>👁</span>
          <span>
            <strong className="text-ink">{product.viewingNow} people</strong> viewing this right now
          </span>
        </div>
        {deliveryInfo && (
          <div className="flex items-center gap-2 text-ink">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="2" y="7" width="14" height="10" rx="1" />
              <path d="M16 11h4l2 3v3h-6V11z" />
            </svg>
            <span>
              Order in the next <strong>{deliveryInfo.cutoff}</strong> for delivery by <strong>{deliveryInfo.date}</strong>
            </span>
          </div>
        )}
      </div>

      <div className="pt-2">
        <p className="text-xs tracking-[0.15em] uppercase text-neutral-mid mb-3">Quantity</p>
        <div className="inline-flex items-center border border-neutral-light">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-12 h-12 flex items-center justify-center text-xl"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-14 h-12 flex items-center justify-center tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-12 h-12 flex items-center justify-center text-xl"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        id="main-atc"
        onClick={() => addItem(product, qty)}
        className="w-full h-[60px] bg-brand-red text-white uppercase tracking-[0.15em] text-sm font-medium hover:bg-[#a40d25] transition-colors shadow-soft flex items-center justify-center gap-2"
      >
        Add To Cart · {formatPrice(product.price * qty)}
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
        </svg>
      </button>

      <div className="grid grid-cols-3 gap-3">
        {["Apple Pay", "Google Pay", "Klarna"].map((p) => (
          <div
            key={p}
            className="h-11 flex items-center justify-center border border-neutral-light text-xs tracking-[0.1em] uppercase font-semibold"
          >
            {p}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {[
          { icon: "🚚", label: "Free UK Delivery" },
          { icon: "🛡", label: "60-Day Guarantee" },
          { icon: "🔒", label: "Secure Checkout" },
          { icon: "✅", label: "2-Year Warranty" },
        ].map((b) => (
          <div key={b.label} className="flex items-center gap-2 text-xs text-neutral-mid">
            <span className="text-base">{b.icon}</span>
            <span className="leading-tight">{b.label}</span>
          </div>
        ))}
      </div>

      <StickyATC product={product} />
    </div>
  );
}
