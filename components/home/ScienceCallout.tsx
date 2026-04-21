"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const STATS = [
  { value: "650nm", label: "Peak absorption wavelength for hair follicles and skin collagen" },
  { value: "31%", label: "Average increase in hair count in clinical trials of low-level laser therapy" },
  { value: "92%", label: "Of Lumisca users report visible results by week 12" },
];

export default function ScienceCallout() {
  return (
    <section className="relative bg-ink text-cream py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-4">
            The Science
          </p>
          <h2 className="font-display text-display-lg mb-6">
            The Science Behind Lumisca
          </h2>
          <p className="text-cream/75 text-lg leading-relaxed max-w-2xl">
            Red and near-infrared light (630-850nm) have been used in dermatology clinics for over 20 years.
            At these specific wavelengths, light penetrates skin and scalp to stimulate mitochondrial activity —
            increasing ATP production in cells responsible for collagen synthesis and hair follicle function.
            Every Lumisca device calibrates those same wavelengths to clinical intensity, in a form you can use at home.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-brand-gold/30 p-8"
            >
              <div className="font-display text-5xl md:text-6xl text-brand-gold leading-none mb-4">
                {s.value}
              </div>
              <p className="text-cream/70 leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/science" variant="outline-light" size="lg">
            Read The Full Science
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
