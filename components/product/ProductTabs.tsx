"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

const TABS = ["Description", "How To Use", "In The Box", "Specs", "Shipping"] as const;
type Tab = (typeof TABS)[number];

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("Description");

  return (
    <section className="mt-16 md:mt-24">
      <div className="border-y border-neutral-light overflow-x-auto no-scrollbar">
        <div className="flex min-w-max">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-5 md:px-7 h-14 text-[13px] tracking-[0.12em] uppercase font-medium border-b-2 transition-colors whitespace-nowrap",
                tab === t
                  ? "border-brand-red text-ink"
                  : "border-transparent text-neutral-mid hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="py-10 md:py-14 max-w-3xl">
        {tab === "Description" && (
          <div className="space-y-5 text-neutral-mid leading-relaxed text-[15px]">
            <p>{product.longDescription}</p>
            <ul className="mt-6 space-y-3">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-red" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-ink">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "How To Use" && (
          <ol className="space-y-5 counter-reset">
            {product.howToUse.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-display">
                  {i + 1}
                </span>
                <span className="text-ink leading-relaxed pt-1.5">{step}</span>
              </li>
            ))}
          </ol>
        )}

        {tab === "In The Box" && (
          <ul className="space-y-3">
            {product.inTheBox.map((item) => (
              <li key={item} className="flex items-center gap-3 text-ink">
                <span className="w-2 h-2 rounded-full bg-brand-red" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {tab === "Specs" && (
          <dl className="divide-y divide-neutral-light border-y border-neutral-light">
            {product.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[180px_1fr] gap-4 py-4">
                <dt className="text-xs tracking-[0.15em] uppercase text-neutral-mid">{s.label}</dt>
                <dd className="text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {tab === "Shipping" && (
          <div className="space-y-5 text-neutral-mid leading-relaxed text-[15px]">
            <p>
              <strong className="text-ink">Free UK delivery on every order.</strong> Tracked courier, 3-5 working days.
              Order before 3pm Monday-Friday for same-day dispatch from our Midlands warehouse.
            </p>
            <p>
              We also ship to Ireland, Jersey, Guernsey and the Isle of Man. International customers: please contact{" "}
              <a href="mailto:support@lumisca.com" className="text-brand-red underline">
                support@lumisca.com
              </a>{" "}
              for delivery timings.
            </p>
            <p>
              <strong className="text-ink">60-day returns, no questions asked.</strong> If you're not seeing results within 60 days, contact us for a full refund.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
