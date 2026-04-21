import Accordion from "@/components/ui/Accordion";
import Link from "next/link";

const FAQS = [
  {
    q: "Is red light therapy safe?",
    a: "Yes — absolutely. Red and near-infrared light therapy is a non-invasive, drug-free, clinically studied treatment used in dermatology clinics worldwide for over 20 years. There are no known side effects when used as directed. Every Lumisca device carries CE certification and is calibrated to clinical wavelengths.",
  },
  {
    q: "How long before I see results?",
    a: "Everyone's different, but here's the typical Lumisca timeline: sleep improvements from night one with the Rest Mask; skin results (brightness, tone, fine lines) from week 4 with the Glow Mask; hair regrowth from week 8-12 with the Pro Cap. Consistency is the single biggest factor — 4-5 sessions per week, every week.",
  },
  {
    q: "Can I use multiple devices?",
    a: "Yes — many customers use the full routine daily. A typical Lumisca customer uses the Glow Mask with their morning coffee, the Pro Cap in the afternoon while working, and the Rest Mask before bed. The Complete Bundle is designed exactly for this, and saves you over £174 vs buying devices individually.",
  },
  {
    q: "What is your returns policy?",
    a: "We offer a 60-day money-back guarantee, no questions asked. If you're not seeing results or don't love the device, contact support@lumisca.com within 60 days for a full refund. Your confidence is backed by ours.",
  },
  {
    q: "How long does UK delivery take?",
    a: "Free UK delivery takes 3-5 working days via tracked courier. Order before 3pm for same-day dispatch Monday to Friday. We also ship to Ireland, Jersey, Guernsey and the Isle of Man.",
  },
  {
    q: "Is this suitable for sensitive skin?",
    a: "Yes. Lumisca devices use only light therapy — no chemicals, no heat that irritates, and no abrasion. The Glow Mask is made from hypoallergenic medical-grade silicone. That said, if you have photosensitivity or are on medications that cause photosensitivity (like certain antibiotics or Roaccutane) please check with your GP first.",
  },
];

export default function FAQStrip() {
  return (
    <section className="bg-cream py-20 md:py-28 border-t border-neutral-light">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">FAQ</p>
          <h2 className="font-display text-display-lg">Questions, answered.</h2>
        </div>
        <Accordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-medium hover:text-brand-red transition-colors"
          >
            View Full FAQ
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
