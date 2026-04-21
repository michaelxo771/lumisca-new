"use client";

import { motion } from "framer-motion";
import StarRating from "@/components/ui/StarRating";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Manchester",
    product: "Pro Hair Growth Cap",
    body: "I've been losing my hair since menopause and tried everything. 10 weeks with the Lumisca cap and I genuinely can't believe the difference. My hairdresser noticed before I even told her.",
  },
  {
    name: "David K.",
    location: "Leeds",
    product: "Pro Hair Growth Cap",
    body: "Started using this in January for my receding hairline. New growth coming through at the temples. My wife is now stealing it for her thinning crown.",
  },
  {
    name: "Claire B.",
    location: "Edinburgh",
    product: "Glow Face Mask",
    body: "I was spending £80 a month on facials. This paid for itself in the first month. My skin looks genuinely brighter after 6 weeks.",
  },
  {
    name: "Priya S.",
    location: "London",
    product: "Glow Face Mask",
    body: "Bought for acne scarring. 8 weeks and the dark marks have faded significantly. My skin texture has completely changed.",
  },
  {
    name: "James T.",
    location: "Birmingham",
    product: "Rest Eye Mask",
    body: "Work in front of screens 10 hours a day. 15 minutes before bed and I sleep better than I have in years.",
  },
  {
    name: "Emma R.",
    location: "Dublin",
    product: "Complete Bundle",
    body: "Bought the full bundle. Use all three every day. Hair cap showing real results at week 8, skin is glowing, haven't had a bad sleep since.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">
            Reviews
          </p>
          <h2 className="font-display text-display-lg mb-4">What Our Customers Are Saying</h2>
          <div className="inline-flex items-center gap-3">
            <StarRating rating={4.9} size="lg" />
            <span className="text-base">
              <span className="font-semibold">4.9/5</span>{" "}
              <span className="text-neutral-mid">from 2,847 verified reviews</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="bg-white border border-neutral-light p-6 md:p-8 flex flex-col"
            >
              <StarRating rating={5} size="sm" />
              <p className="mt-4 text-ink/90 leading-relaxed flex-1">&ldquo;{t.body}&rdquo;</p>
              <div className="mt-6 pt-6 border-t border-neutral-light">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-neutral-mid">
                  {t.location} · <span className="text-brand-red">{t.product}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
