"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "🔴  Free UK Delivery On All Orders",
  "60-Day Money Back Guarantee — Zero Risk",
  "Join 10,000+ Lumisca Customers Across The UK",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-ink text-cream text-[12px] md:text-[13px] leading-none tracking-[0.15em] uppercase">
      <div className="mx-auto max-w-7xl px-4 h-10 flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center font-medium"
          >
            {MESSAGES[i]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
