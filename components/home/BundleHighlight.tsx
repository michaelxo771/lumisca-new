"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";
import CountdownTimer from "@/components/ui/CountdownTimer";

export default function BundleHighlight() {
  const bundle = PRODUCTS.find((p) => p.handle === "lumisca-complete-bundle")!;
  const components = PRODUCTS.filter((p) => p.category !== "bundle");
  const rrp = components.reduce((a, b) => a + (b.compareAtPrice ?? b.price), 0);
  const savings = rrp - bundle.price;
  const savingsPct = Math.round((savings / rrp) * 100);

  return (
    <section className="relative bg-ink text-cream py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-80 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-brand-gold text-ink text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
              Best Value · Save {savingsPct}%
            </span>
            <h2 className="font-display text-display-lg leading-tight mb-4">
              Get Everything.
              <br />
              Save <span className="text-brand-red">£{savings.toFixed(2)}</span>.
            </h2>
            <p className="text-cream/75 text-lg leading-relaxed max-w-xl mb-8">
              The Lumisca Complete Bundle gives you all three devices — hair, skin and sleep — in one beautifully packaged box.
              The single best way to start your at-home light therapy routine.
            </p>

            <ul className="space-y-3 mb-8">
              {components.map((c) => (
                <li key={c.id} className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-cream/90">{c.name}</span>
                  <span className="text-cream/60 line-through text-sm">{formatPrice(c.compareAtPrice ?? c.price)}</span>
                </li>
              ))}
              <li className="flex items-center justify-between py-4 border-b border-brand-red">
                <span className="font-display text-xl">Complete Bundle</span>
                <span className="font-display text-3xl text-brand-red">{formatPrice(bundle.price)}</span>
              </li>
            </ul>

            <div className="mb-8">
              <p className="text-[11px] tracking-[0.2em] uppercase text-cream/60 mb-3">Offer resets in:</p>
              <CountdownTimer mode="daily" theme="dark" />
            </div>

            <Button href={`/products/${bundle.handle}`} variant="red" size="xl">
              Shop The Bundle
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
              </svg>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <PlaceholderImage label="Complete Bundle Gift Box" dark aspect="aspect-[4/5]" />
            <div className="absolute top-4 right-4 bg-brand-red text-white px-4 py-3 text-center shadow-premium">
              <div className="text-[10px] tracking-[0.2em] uppercase">You Save</div>
              <div className="font-display text-2xl">£{savings.toFixed(0)}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
