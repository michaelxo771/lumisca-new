"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE = "lumisca.consent";

function setConsentCookie(value: "accepted" | "declined") {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  document.cookie = `${COOKIE}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!document.cookie.includes(`${COOKIE}=`)) {
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    setConsentCookie("accepted");
    setOpen(false);
  };
  const decline = () => {
    setConsentCookie("declined");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          className="fixed bottom-0 inset-x-0 z-30 bg-ink text-cream shadow-premium"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="mx-auto max-w-7xl px-4 py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="font-display text-lg mb-1">We use cookies.</p>
              <p className="text-sm text-cream/70 leading-relaxed">
                We use cookies to personalise content, improve your experience and measure marketing performance.{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-brand-gold">
                  Read our privacy policy
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="h-12 px-5 border border-white/25 text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-white/10 transition"
              >
                Manage
              </button>
              <button
                onClick={accept}
                className="h-12 px-6 bg-brand-red text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#a40d25] transition"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
