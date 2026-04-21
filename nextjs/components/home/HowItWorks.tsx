"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Choose Your Device",
    body: "Hair, skin, sleep — or the Complete Bundle and save £174. Ships free across the UK.",
  },
  {
    n: "02",
    title: "Use Daily 20-25 Mins",
    body: "Hands-free sessions you fit around life — while you work, watch or wind down.",
  },
  {
    n: "03",
    title: "See Visible Results",
    body: "Sleep from night one. Skin from week 4. Hair regrowth from week 8-12. Backed by our 60-day guarantee.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-neutral-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">How It Works</p>
          <h2 className="font-display text-display-lg">Results In 3 Simple Steps</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-cream p-8 md:p-10 border border-neutral-light"
            >
              <div className="w-14 h-14 rounded-full bg-brand-red text-white flex items-center justify-center font-display text-xl mb-6">
                {s.n}
              </div>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-neutral-mid leading-relaxed">{s.body}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-14 -right-4 w-8 h-px bg-neutral-light" aria-hidden />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
