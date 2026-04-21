"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

const KEY = "lumisca.exit.seen";

export default function ExitPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
    };

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget == null) trigger();
    };
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const idle = isMobile ? setTimeout(trigger, 40000) : null;

    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mouseleave", onLeave);
      if (idle) clearTimeout(idle);
    };
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
            className="fixed inset-0 z-[60] bg-ink/75 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            role="dialog"
            aria-label="Exit offer"
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
              <div className="p-7 md:p-9 order-2 md:order-1">
                <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">
                  Wait — before you go
                </p>
                {submitted ? (
                  <>
                    <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">Code on its way.</h2>
                    <p className="text-cream/75 leading-relaxed">
                      Check your inbox for <strong className="text-brand-gold">LUMISCA10</strong> — good for 10% off your first order.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">
                      Here's <span className="text-brand-red">10% off</span>.
                      <br />
                      On the house.
                    </h2>
                    <p className="text-cream/75 leading-relaxed mb-6">
                      Zero risk — try your Lumisca for 60 days. If you don't see results, we'll refund you in full.
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
                        Claim My 10% Off
                      </button>
                    </form>
                    <button onClick={close} className="mt-4 text-xs text-cream/50 underline underline-offset-4">
                      No thanks, I'll pay full price.
                    </button>
                  </>
                )}
              </div>
              <PlaceholderImage label="Lumisca Exit" dark aspect="aspect-square md:aspect-auto md:min-h-[420px]" className="order-1 md:order-2 hidden md:block" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
