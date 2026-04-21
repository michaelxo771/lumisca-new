import type { Metadata } from "next";
import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Lumisca",
  description:
    "The story behind Lumisca — a British light therapy brand on a mission to make clinic-grade skin and hair treatments accessible to everyone.",
};

const VALUES = [
  {
    icon: "🔬",
    title: "Science-Backed",
    body: "Every wavelength, intensity and session length is calibrated to peer-reviewed research. No magic — just clinically validated light.",
  },
  {
    icon: "🤲",
    title: "Accessible",
    body: "We believe a £150 clinic session should not be a privilege. Lumisca devices deliver the same wavelengths for a one-time price.",
  },
  {
    icon: "✨",
    title: "Quality You Can Trust",
    body: "Medical-grade LEDs. 2-year warranties. 60-day guarantee. If you don't see results, you don't pay — simple as that.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-70 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">
              Our Story
            </p>
            <h1 className="font-display text-display-xl mb-6">
              Clinic-grade light. <br className="hidden md:inline" />
              At home. For everyone.
            </h1>
            <p className="text-cream/75 text-lg leading-relaxed max-w-xl">
              Lumisca was born in a London dermatology clinic, where our founder paid £150 a session for red light therapy
              on a receding hairline. It worked — and it felt absurd that something this effective was locked away for
              the few who could afford it.
            </p>
          </div>
          <div className="border-2 border-dashed border-brand-red/40">
            <PlaceholderImage label="Founder Portrait" dark aspect="aspect-[4/5]" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 prose prose-lg">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">
            Mission
          </p>
          <h2 className="font-display text-display-lg mb-6">A full-body light therapy routine, for the price of one clinic session.</h2>
          <div className="space-y-5 text-neutral-mid leading-relaxed text-[17px]">
            <p>
              In 2023, after another £150 clinic appointment, we sat down with a dermatologist, two engineers and
              a handful of TikTok creators and asked a single question: why isn't this at-home tech?
            </p>
            <p>
              The answer, it turned out, was a mix of inertia and margin. Clinic devices use the same LEDs we
              can source today — but they cost thousands because the market has always been B2B. No one had made
              the consumer version <em>really good.</em>
            </p>
            <p>
              We spent 18 months on prototypes. We calibrated wavelengths, LED density, session timers, battery life
              and silicone softness. We ran a 12-week pilot with 200 UK customers. 94% saw results. The ones that
              didn't got full refunds — and that became our 60-day guarantee.
            </p>
            <p>
              Today, over 10,000 UK customers wear a Lumisca device. We ship from a Midlands warehouse, offer
              support from a real team in Manchester, and reinvest every pound of margin into the next product.
            </p>
            <p className="text-ink font-semibold">
              Our mission is simple — make clinic-grade light therapy available to anyone with a sofa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-light/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">
              What We Stand For
            </p>
            <h2 className="font-display text-display-lg">Three values. Every decision.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-cream p-8 md:p-10 border border-neutral-light">
                <div className="text-4xl mb-4" aria-hidden>
                  {v.icon}
                </div>
                <h3 className="font-display text-2xl mb-3">{v.title}</h3>
                <p className="text-neutral-mid leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-60 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-red mb-6">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-display text-display-lg mb-4">60-Day Money-Back Guarantee</h2>
          <p className="text-cream/75 text-lg leading-relaxed mb-8">
            Try any Lumisca device for 60 days. If you don't see results — or simply don't love it — we'll refund you in
            full, no questions asked. That's how confident we are.
          </p>
          <Button href="/collections/all" variant="red" size="lg">
            Shop The Collection
          </Button>
        </div>
      </section>
    </>
  );
}
