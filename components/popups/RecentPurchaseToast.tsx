"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

const NAMES = ["Sarah", "David", "Claire", "Priya", "James", "Emma", "Tom", "Rachel"];
const LOCATIONS = [
  "Manchester",
  "Leeds",
  "Edinburgh",
  "London",
  "Birmingham",
  "Dublin",
  "Glasgow",
  "Bristol",
];
const PRODUCTS = [
  "Pro Hair Growth Cap",
  "Glow Face Mask",
  "Rest Heated Eye Mask",
  "Complete Bundle",
];

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function RecentPurchaseToast() {
  const [toast, setToast] = useState<null | { name: string; loc: string; product: string; mins: number }>(null);

  useEffect(() => {
    let mounted = true;
    const schedule = () => {
      const delay = 60_000 + Math.random() * 30_000;
      return setTimeout(() => {
        if (!mounted) return;
        setToast({
          name: pick(NAMES),
          loc: pick(LOCATIONS),
          product: pick(PRODUCTS),
          mins: Math.floor(2 + Math.random() * 20),
        });
        setTimeout(() => {
          if (mounted) setToast(null);
        }, 5000);
        const next = schedule();
        timers.push(next);
      }, delay);
    };
    const timers: ReturnType<typeof setTimeout>[] = [];
    const first = setTimeout(() => {
      setToast({
        name: pick(NAMES),
        loc: pick(LOCATIONS),
        product: pick(PRODUCTS),
        mins: Math.floor(2 + Math.random() * 20),
      });
      setTimeout(() => mounted && setToast(null), 5000);
      timers.push(schedule());
    }, 15000);
    timers.push(first);

    return () => {
      mounted = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 10, x: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 z-30 w-[92vw] max-w-sm bg-cream border border-neutral-light shadow-premium p-3 flex items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <div className="w-14 h-14 flex-shrink-0">
            <PlaceholderImage label={toast.product.split(" ")[0]} aspect="aspect-square" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-tight">
              <strong>{toast.name}</strong> from <strong>{toast.loc}</strong>
            </p>
            <p className="text-xs text-neutral-mid leading-tight mt-0.5">
              Just bought the <strong className="text-ink">{toast.product}</strong>
            </p>
            <p className="text-[10px] text-brand-red tracking-wider uppercase mt-1">✓ {toast.mins} mins ago</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
