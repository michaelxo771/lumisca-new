"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types";

export default function ProductBenefits({ product }: { product: Product }) {
  return (
    <section className="bg-neutral-light/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">
            Why It Works
          </p>
          <h2 className="font-display text-display-md">Engineered for real results.</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {product.benefitIcons.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="bg-cream p-6 md:p-8 border border-neutral-light"
            >
              <div className="text-3xl mb-3" aria-hidden>
                {b.icon}
              </div>
              <h3 className="font-display text-lg md:text-xl mb-2">{b.title}</h3>
              <p className="text-sm text-neutral-mid leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
