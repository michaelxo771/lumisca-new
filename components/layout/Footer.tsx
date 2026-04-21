import Link from "next/link";

const SHOP = [
  { label: "Hair Growth Cap", href: "/products/lumisca-pro-hair-growth-cap" },
  { label: "Glow Face Mask", href: "/products/lumisca-glow-face-mask" },
  { label: "Rest Eye Mask", href: "/products/lumisca-rest-eye-mask" },
  { label: "Complete Bundle", href: "/products/lumisca-complete-bundle" },
  { label: "Shop All", href: "/collections/all" },
];

const INFO = [
  { label: "The Science", href: "/science" },
  { label: "About Lumisca", href: "/about" },
  { label: "Customer Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
];

const SUPPORT = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Delivery", href: "/faq#shipping" },
  { label: "60-Day Returns", href: "/faq#returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const PAYMENTS = ["Visa", "Mastercard", "Amex", "PayPal", "Klarna", "Clearpay", "Apple Pay", "Google Pay"];

function PaymentBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center h-7 px-3 bg-white/10 border border-white/10 text-[10px] font-semibold tracking-wider uppercase text-white/80">
      {label}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-16 md:pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <Link href="/" className="font-display text-2xl md:text-3xl tracking-[0.35em] block mb-4">
              LUMISCA
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed max-w-sm">
              Clinic-grade red light therapy for hair, skin and sleep. UK-designed. 60-day money back guarantee on every Lumisca device.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://tiktok.com/@lumisca"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lumisca on TikTok"
                className="w-10 h-10 flex items-center justify-center border border-white/15 hover:border-white/40 transition"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
                  <path d="M16 4c.6 2.2 2.6 3.8 5 4v3c-1.8 0-3.6-.5-5-1.4v6.5a6 6 0 11-6-6v3a3 3 0 103 3V4h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/lumisca"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lumisca on Instagram"
                className="w-10 h-10 flex items-center justify-center border border-white/15 hover:border-white/40 transition"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              {SHOP.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase mb-4">Info</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              {INFO.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-cream/70 mb-6">
              {SUPPORT.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-cream/60">
              <span className="block text-cream/80">support@lumisca.com</span>
              Mon-Fri, 9am-6pm GMT
            </p>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <p className="text-xs text-cream/50 tracking-wider uppercase">
            © 2026 Lumisca Ltd — Registered in England & Wales
          </p>
          <div className="flex flex-wrap gap-2">
            {PAYMENTS.map((p) => (
              <PaymentBadge key={p} label={p} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
