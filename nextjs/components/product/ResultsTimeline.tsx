"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types";

export default function ResultsTimeline({ product }: { product: Product }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">
            Your Timeline
          </p>
          <h2 className="font-display text-display-md">What to expect, when.</h2>
        </div>
        <div className="relative grid md:grid-cols-4 gap-6 md:gap-4">
          <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-neutral-light" aria-hidden />
          {product.timeline.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-start md:items-center md:text-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-red text-white flex items-center justify-center font-display text-lg shadow-premium relative z-10">
                {i + 1}
              </div>
              <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-brand-red font-semibold">
                {t.week}
              </p>
              <h3 className="mt-1 font-display text-xl">{t.title}</h3>
              <p className="mt-2 text-sm text-neutral-mid leading-relaxed max-w-[260px]">{t.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
