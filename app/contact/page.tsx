"use client";

import { useState } from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production: POST to /api/contact or Formspree / Sendgrid etc.
    setSent(true);
  };

  return (
    <>
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-70 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 md:py-28 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">
            Contact
          </p>
          <h1 className="font-display text-display-xl mb-5">We're here to help.</h1>
          <p className="text-cream/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Email us at{" "}
            <a href="mailto:support@lumisca.com" className="underline underline-offset-4 hover:text-brand-gold">
              support@lumisca.com
            </a>{" "}
            — our UK team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-2">
            <div className="border-2 border-dashed border-brand-red/30">
              <PlaceholderImage label="Lumisca Support" aspect="aspect-[4/5]" />
            </div>
            <div className="mt-8 space-y-5 text-[15px]">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-mid mb-1">Email</p>
                <a href="mailto:support@lumisca.com" className="text-ink hover:text-brand-red">
                  support@lumisca.com
                </a>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-mid mb-1">Response Time</p>
                <p className="text-ink">Within 24 hours, Monday-Friday</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-mid mb-1">Registered Office</p>
                <p className="text-ink leading-relaxed">
                  Lumisca Ltd
                  <br />
                  71-75 Shelton Street
                  <br />
                  London, WC2H 9JQ
                </p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-mid mb-1">Socials</p>
                <div className="flex gap-3 mt-1">
                  <a
                    href="https://tiktok.com/@lumisca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-neutral-light hover:border-ink transition"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
                      <path d="M16 4c.6 2.2 2.6 3.8 5 4v3c-1.8 0-3.6-.5-5-1.4v6.5a6 6 0 11-6-6v3a3 3 0 103 3V4h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/lumisca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-neutral-light hover:border-ink transition"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white border border-neutral-light p-6 md:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-red text-white mb-5">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl mb-3">Message received.</h2>
                <p className="text-neutral-mid leading-relaxed max-w-md mx-auto">
                  Thanks for reaching out. We'll be in touch within 24 working hours at the email you provided.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h2 className="font-display text-2xl md:text-3xl mb-2">Send us a message</h2>
                <p className="text-sm text-neutral-mid mb-3">
                  Include your order number if your query is order-related — it speeds things up.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs tracking-[0.15em] uppercase text-neutral-mid block mb-2">Name</span>
                    <input
                      type="text"
                      required
                      className="w-full h-12 px-4 border border-neutral-light focus:border-brand-red outline-none bg-cream"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs tracking-[0.15em] uppercase text-neutral-mid block mb-2">Email</span>
                    <input
                      type="email"
                      required
                      className="w-full h-12 px-4 border border-neutral-light focus:border-brand-red outline-none bg-cream"
                    />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs tracking-[0.15em] uppercase text-neutral-mid block mb-2">
                      Order number <span className="text-neutral-mid/60">(optional)</span>
                    </span>
                    <input
                      type="text"
                      placeholder="#LUM-12345"
                      className="w-full h-12 px-4 border border-neutral-light focus:border-brand-red outline-none bg-cream"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs tracking-[0.15em] uppercase text-neutral-mid block mb-2">Subject</span>
                    <select
                      required
                      className="w-full h-12 px-4 border border-neutral-light focus:border-brand-red outline-none bg-cream"
                    >
                      <option value="">Select a topic</option>
                      <option>Order enquiry</option>
                      <option>Returns / Refunds</option>
                      <option>Product help</option>
                      <option>Press / Wholesale</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-mid block mb-2">Message</span>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-light focus:border-brand-red outline-none bg-cream resize-none"
                  />
                </label>
                <button
                  type="submit"
                  className="h-[60px] w-full bg-brand-red text-white uppercase tracking-[0.15em] text-sm font-medium hover:bg-[#a40d25] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
