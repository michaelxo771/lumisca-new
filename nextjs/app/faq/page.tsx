import type { Metadata } from "next";
import Accordion from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Lumisca — products, how they work, safety, results, shipping, returns and payment.",
};

const SECTIONS = [
  {
    id: "products",
    title: "About Our Products",
    items: [
      {
        q: "What makes Lumisca devices different?",
        a: "Three things. Clinical wavelengths (not decorative LEDs). Genuinely hands-free design (no wires, no stands). And a proper 60-day money-back guarantee — because we'd rather you try it than take our word for it.",
      },
      {
        q: "Are Lumisca devices certified?",
        a: "Yes. Every device is CE-certified, RoHS-compliant and tested to UK and EU electrical safety standards. Our Rest Eye Mask complies with medical device directive IEC 60601-1.",
      },
      {
        q: "Where are they made?",
        a: "Designed in the UK, manufactured in a Shenzhen medical-device facility, assembled and quality-controlled in the Midlands. Every device is individually tested before dispatch.",
      },
      {
        q: "Do I need a different device for men vs women?",
        a: "No. The Pro Hair Growth Cap, Glow Face Mask and Rest Eye Mask are all fully unisex and size-adjustable.",
      },
      {
        q: "Can I give Lumisca as a gift?",
        a: "Yes — the Complete Bundle is designed for gifting, with branded packaging and a welcome card. At checkout you can add a handwritten note (free) or select gift-wrap (£4).",
      },
    ],
  },
  {
    id: "how-it-works",
    title: "How It Works",
    items: [
      {
        q: "What wavelengths do Lumisca devices use?",
        a: "650nm (visible red) for surface stimulation and 850nm (near-infrared) for deeper tissue. The Glow Mask also includes 415nm blue for breakouts and 590nm amber for tone.",
      },
      {
        q: "How long does each session take?",
        a: "Glow Face Mask: 20 minutes. Pro Hair Cap: 25 minutes. Rest Eye Mask: 15 minutes. All have auto-shutoff — you don't need to time it yourself.",
      },
      {
        q: "How often should I use them?",
        a: "4-5 sessions per week is the clinical sweet spot. Seven days is fine, but not necessary. Consistency matters more than duration.",
      },
      {
        q: "Can I use more than one device at a time?",
        a: "Not simultaneously — use them sequentially so your skin and scalp can respond to each specific protocol. A typical routine: Glow Mask in the morning, Pro Cap afternoon, Rest Mask before bed.",
      },
      {
        q: "Do I charge the device or use it plugged in?",
        a: "Every Lumisca device is cordless — fully rechargeable over USB-C. You can use while charging if you prefer.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety",
    items: [
      {
        q: "Is red light therapy safe?",
        a: "Yes. It's non-invasive, non-thermal and non-ionising. It is not UV. There are no cumulative skin damage risks. 20+ years of clinical use in dermatology back this up.",
      },
      {
        q: "Is it safe during pregnancy?",
        a: "We recommend pausing use during pregnancy — not because there is any evidence of harm, but because there are no specific studies on red light therapy and pregnancy. Consult your GP.",
      },
      {
        q: "Can I use if I'm on medication?",
        a: "If you're on a photosensitising medication (certain antibiotics, isotretinoin/Roaccutane, St John's Wort) please consult your GP before use. Otherwise, there are no known interactions.",
      },
      {
        q: "Is it safe for my eyes?",
        a: "The Glow Face Mask ships with protective eye shields. Always use them. The Pro Hair Cap does not direct light toward your eyes. The Rest Eye Mask uses only heat (no light).",
      },
      {
        q: "Can children use it?",
        a: "We recommend Lumisca devices for adults 18+. If you'd like to use for a child for a specific medical reason, consult your GP first.",
      },
    ],
  },
  {
    id: "results",
    title: "Results",
    items: [
      {
        q: "How long until I see results?",
        a: "Sleep: night one. Skin: from week 4. Hair: from week 8-12. These are averages — individual response varies.",
      },
      {
        q: "What if I don't see results?",
        a: "Contact support@lumisca.com within 60 days of delivery and we'll refund you in full. Our 60-day money-back guarantee is unconditional.",
      },
      {
        q: "Can I use on coloured, treated or bleached hair?",
        a: "Yes — the Pro Hair Cap affects follicles, not the hair shaft. It works on all hair colours and types, and will not affect colour or treatment.",
      },
      {
        q: "Will it help with alopecia or medical hair loss?",
        a: "LLLT (low-level laser therapy) is FDA-cleared for androgenetic alopecia. For other causes (alopecia areata, medical conditions) please consult a dermatologist — we don't claim to treat medical hair loss.",
      },
      {
        q: "Will results last if I stop using it?",
        a: "For hair: gradually diminish over 3-6 months of non-use. For skin: collagen stimulation persists but continued use compounds results. We recommend staying on a 3x/week maintenance schedule.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    items: [
      {
        q: "How long does UK delivery take?",
        a: "3-5 working days via tracked courier. Orders placed before 3pm Monday-Friday dispatch same day.",
      },
      {
        q: "Is delivery free?",
        a: "Yes — free UK delivery on every order, every time. No minimum spend.",
      },
      {
        q: "Do you ship to Ireland?",
        a: "Yes — Republic of Ireland delivery is £6.99 and takes 5-7 working days.",
      },
      {
        q: "Do you ship internationally?",
        a: "We currently serve the UK, Ireland, Jersey, Guernsey and the Isle of Man. For other countries, email support@lumisca.com and we'll see what we can do.",
      },
      {
        q: "Can I track my order?",
        a: "Yes — you'll receive a dispatch email with a Royal Mail / DPD tracking link the moment your order ships.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns",
    items: [
      {
        q: "What is your returns policy?",
        a: "60-day money-back guarantee. If you're not happy with your device for any reason, contact support@lumisca.com within 60 days of delivery for a full refund.",
      },
      {
        q: "Do I pay return postage?",
        a: "We cover return postage on any faulty or defective device. For change-of-mind returns within 60 days, the customer covers return postage — we'll send a freepost label for £4.99 if preferred.",
      },
      {
        q: "Does the device need to be unused to return it?",
        a: "No. Use it — that's the whole point. We want you to use it for at least 30 days before deciding.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 3 working days of receiving the returned item. Depending on your bank, funds typically appear in 5-10 working days.",
      },
      {
        q: "Do you offer exchanges?",
        a: "Yes. Email support@lumisca.com if you'd like to exchange for a different device — we'll handle the paperwork.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Visa, Mastercard, Amex, Apple Pay, Google Pay, PayPal, Klarna and Clearpay.",
      },
      {
        q: "Do you offer pay-later?",
        a: "Yes. Klarna (3 interest-free instalments) and Clearpay (4 interest-free instalments) are available at checkout.",
      },
      {
        q: "Is my payment secure?",
        a: "Every transaction is SSL-encrypted and processed via Shopify Payments, PCI-DSS Level 1 certified. We never see or store your card details.",
      },
      {
        q: "Can I use a discount code?",
        a: "Yes — one code per order. New customers: sign up to email for 10% off your first order (code LUMISCA10).",
      },
      {
        q: "I have a billing question.",
        a: "Email support@lumisca.com with your order number — our UK customer team responds within 24 hours.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-70 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 md:py-28 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">FAQ</p>
          <h1 className="font-display text-display-xl mb-5">Everything you want to know.</h1>
          <p className="text-cream/75 text-lg leading-relaxed max-w-2xl mx-auto">
            If your question isn't answered below, our UK team is at{" "}
            <a href="mailto:support@lumisca.com" className="underline underline-offset-4 hover:text-brand-gold">
              support@lumisca.com
            </a>{" "}
            — typical reply within 24 hours.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <nav className="flex flex-wrap gap-2 pb-8 mb-8 border-b border-neutral-light">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="h-10 px-4 inline-flex items-center border border-neutral-light text-xs tracking-[0.12em] uppercase font-medium hover:bg-ink hover:text-cream hover:border-ink transition"
              >
                {s.title}
              </a>
            ))}
          </nav>

          <div className="space-y-14">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id}>
                <h2 className="font-display text-display-md mb-4 scroll-mt-24">{s.title}</h2>
                <Accordion items={s.items.map((i) => ({ q: i.q, a: i.a }))} />
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
