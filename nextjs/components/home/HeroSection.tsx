"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function HeroSection() {
  return (
    <section className="relative bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 min-h-[calc(100vh-6.5rem)] grid lg:grid-cols-2 gap-10 lg:gap-14 items-center py-14 md:py-20">
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 w-fit px-4 py-2 border border-brand-red/40 bg-brand-red/10 text-[11px] tracking-[0.2em] uppercase font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse-soft" />
            As Seen On TikTok
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-display-xl"
          >
            Your <span className="text-brand-red">At-Home</span>
            <br />
            Light Therapy Clinic.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-cream/75 text-lg leading-relaxed"
          >
            Clinic-grade red light therapy for hair, skin and sleep — delivered to your door, designed for your sofa.
            Over 10,000 UK customers. 60-day money back guarantee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/collections/all"
              className="inline-flex items-center justify-center h-[60px] px-8 bg-brand-red text-white uppercase tracking-[0.15em] text-sm font-medium hover:bg-[#a40d25] transition-colors group"
            >
              Shop The Collection
              <svg viewBox="0 0 24 24" className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              href="/science"
              className="inline-flex items-center justify-center h-[60px] px-8 border border-white/70 text-white uppercase tracking-[0.15em] text-sm font-medium hover:bg-white hover:text-ink transition-all"
            >
              See The Science
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-lg"
          >
            {[
              { value: "10,000+", label: "Customers" },
              { value: "4.9 ★", label: "Rated" },
              { value: "60-Day", label: "Money Back" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl md:text-3xl">{s.value}</div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-cream/60 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative border-2 border-dashed border-brand-red/50">
            <PlaceholderImage
              label="Lumisca Hero Lifestyle"
              dark
              aspect="aspect-[4/5] md:aspect-[4/5]"
              className="relative"
            />
            <div className="absolute -bottom-5 -left-5 px-5 py-3 bg-brand-red text-white text-xs tracking-[0.2em] uppercase font-medium">
              Clinic-Grade
            </div>
            <div className="absolute -top-4 right-4 md:-right-6 px-4 py-2 bg-brand-gold text-ink text-[11px] tracking-[0.2em] uppercase font-semibold">
              Best of 2026
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
