"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

const KEY = "lumisca.welcome.seen";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const id = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(id);
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem(KEY, "1");
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(close, 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-label="Welcome offer"
          >
            <div className="relative grid md:grid-cols-2 w-full max-w-3xl bg-ink text-cream overflow-hidden shadow-premium">
              <button
                onClick={close}
                className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white z-10"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                </svg>
              </button>
              <PlaceholderImage label="Lumisca Welcome" dark aspect="aspect-square md:aspect-auto md:min-h-[420px]" className="hidden md:block" />
              <div className="p-7 md:p-9">
                <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">
                  Welcome to Lumisca
                </p>
                {submitted ? (
                  <>
                    <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">Check your inbox.</h2>
                    <p className="text-cream/75 leading-relaxed">
                      Your <strong className="text-brand-gold">10% off code</strong> is on its way. Welcome to the Lumisca family.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">
                      Get <span className="text-brand-red">10% off</span> your first order.
                    </h2>
                    <p className="text-cream/75 leading-relaxed mb-6">
                      Join 10,000+ UK customers. We'll email your discount code, plus early access to new devices.
                    </p>
                    <form onSubmit={submit} className="space-y-3">
                      <label className="block">
                        <span className="sr-only">Email address</span>
                        <input
                          type="email"
                          required
                          placeholder="Your email address"
                          className="w-full h-12 px-4 bg-white/10 border border-white/15 text-white placeholder:text-white/50 focus:border-brand-red outline-none"
                        />
                      </label>
                      <button
                        type="submit"
                        className="w-full h-12 bg-brand-red text-white uppercase tracking-[0.15em] text-sm font-medium hover:bg-[#a40d25] transition-colors"
                      >
                        Send My 10% Off Code
                      </button>
                    </form>
                    <p className="text-[11px] text-cream/50 mt-4 leading-relaxed">
                      Code: <span className="text-brand-gold font-semibold">LUMISCA10</span> · Unsubscribe anytime. By signing up you agree to our privacy policy.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
