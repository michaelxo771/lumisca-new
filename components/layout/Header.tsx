"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Shop", href: "/collections/all" },
  { label: "The Science", href: "/science" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-cream/90 backdrop-blur-md transition-all duration-300 border-b",
          scrolled ? "border-neutral-light" : "border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          <button
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            className="lg:hidden w-11 h-11 -ml-2 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>

          <Link href="/" className="font-display text-[22px] md:text-[26px] tracking-[0.35em] leading-none">
            LUMISCA
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[13px] tracking-[0.15em] uppercase font-medium hover:text-brand-red transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/collections/all"
              className="hidden md:inline-flex w-11 h-11 items-center justify-center"
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.5-4.5" strokeLinecap="round" />
              </svg>
            </Link>
            <button
              onClick={openCart}
              className="relative w-11 h-11 -mr-2 flex items-center justify-center"
              aria-label={`Open cart — ${itemCount} items`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M5 7h14l-1.2 11.1a2 2 0 01-2 1.9H8.2a2 2 0 01-2-1.9L5 7z" strokeLinejoin="round" />
                <path d="M9 7a3 3 0 016 0" strokeLinecap="round" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] px-1 rounded-full bg-brand-red text-white text-[10px] font-semibold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-cream lg:hidden"
          >
            <div className="h-full flex flex-col">
              <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-light">
                <span className="font-display text-[22px] tracking-[0.35em]">LUMISCA</span>
                <button
                  onClick={() => setMenu(false)}
                  className="w-11 h-11 -mr-2 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-8" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1">
                  {NAV.map((n, i) => (
                    <motion.li
                      key={n.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        href={n.href}
                        onClick={() => setMenu(false)}
                        className="flex items-center justify-between py-5 border-b border-neutral-light font-display text-3xl"
                      >
                        {n.label}
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-mid" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <path d="M9 6l6 6-6 6" strokeLinecap="round" />
                        </svg>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-10 p-6 bg-ink text-cream">
                  <p className="font-display text-xl mb-2">Your at-home light therapy clinic.</p>
                  <p className="text-sm text-cream/70 mb-5">Free UK delivery · 60-day money back</p>
                  <Link
                    href="/collections/all"
                    onClick={() => setMenu(false)}
                    className="inline-flex items-center justify-center h-12 w-full bg-brand-red text-white uppercase tracking-[0.15em] text-sm font-medium"
                  >
                    Shop The Collection
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
