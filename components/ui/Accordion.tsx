"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Item = { q: string; a: React.ReactNode };

type Props = {
  items: Item[];
  theme?: "light" | "dark";
  className?: string;
  defaultOpen?: number | null;
};

export default function Accordion({ items, theme = "light", className, defaultOpen = null }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  const divider = theme === "dark" ? "border-white/10" : "border-neutral-light";
  const question = theme === "dark" ? "text-white" : "text-ink";
  const answer = theme === "dark" ? "text-white/70" : "text-neutral-mid";

  return (
    <div className={cn("divide-y", divider, "border-y", divider, className)}>
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className={cn(divider)}>
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className={cn(
                "w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left",
                question
              )}
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg md:text-xl leading-snug pr-2">{item.q}</span>
              <span
                className={cn(
                  "flex-shrink-0 w-10 h-10 flex items-center justify-center border",
                  theme === "dark"
                    ? "border-white/20 text-white"
                    : "border-neutral-light text-ink",
                  isOpen && "bg-brand-red text-white border-brand-red"
                )}
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  className={cn("w-4 h-4 transition-transform duration-300", isOpen && "rotate-45")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className={cn("pb-6 pr-12 text-[15px] leading-relaxed", answer)}>{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
