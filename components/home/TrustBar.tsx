const ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="2" y="7" width="14" height="10" rx="1" />
        <path d="M16 11h4l2 3v3h-6V11z" />
        <circle cx="6.5" cy="18.5" r="1.5" />
        <circle cx="17.5" cy="18.5" r="1.5" />
      </svg>
    ),
    title: "Free UK Delivery",
    sub: "On every order",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "60-Day Money Back",
    sub: "No questions asked",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M4 20c3-4 7-4 10 0 3-4 6-4 6 0" />
        <circle cx="12" cy="8" r="3" />
        <path d="M6 10v-3M18 10v-3" strokeLinecap="round" />
      </svg>
    ),
    title: "Clinically Studied",
    sub: "Wavelengths backed by research",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <circle cx="9" cy="8" r="3.5" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M3 19c1-3.5 3.5-5 6-5s5 1.5 6 5M15 19c.6-2.2 2-3 3.5-3s2.5.8 2.5 3" strokeLinecap="round" />
      </svg>
    ),
    title: "10,000+ Customers",
    sub: "Across the UK and Ireland",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="5" y="11" width="14" height="9" rx="1" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </svg>
    ),
    title: "Secure Checkout",
    sub: "SSL & Klarna supported",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-cream border-y border-neutral-light">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4 md:gap-x-8">
          {ITEMS.map((i) => (
            <li key={i.title} className="flex items-center gap-3 min-w-0">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-ink text-cream flex items-center justify-center">
                {i.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{i.title}</p>
                <p className="text-xs text-neutral-mid leading-tight">{i.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
