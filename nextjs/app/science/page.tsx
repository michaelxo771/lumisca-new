import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Science",
  description:
    "How red and near-infrared light therapy works — the 650nm and 850nm wavelengths, clinical research, and what to expect for hair, skin and sleep.",
};

const STUDIES = [
  {
    title: "Avram & Rogers (2009) — Low-Level Laser Therapy for Hair Regrowth",
    journal: "Journal of Cosmetic and Laser Therapy",
    takeaway:
      "12-month randomised controlled trial of 110 patients with androgenetic alopecia. Active LLLT group saw a 39% increase in terminal hair count vs. 0.75% in the sham group.",
  },
  {
    title: "Barolet (2009) — Light-Emitting Diodes in Dermatology",
    journal: "Seminars in Cutaneous Medicine and Surgery",
    takeaway:
      "Comprehensive review of clinical applications of LED therapy. Red light in the 630-660nm range demonstrated significant effects on collagen synthesis, wound healing and reduction of inflammation.",
  },
  {
    title: "Hamblin (2016) — Shining Light on the Head: Photobiomodulation for Brain Disorders",
    journal: "BBA Clinical",
    takeaway:
      "Review of transcranial photobiomodulation. 810-850nm near-infrared light penetrates deeply, increases mitochondrial ATP production, and has measurable effects on neurological and cellular function.",
  },
];

const FAQS = [
  {
    q: "How does red light therapy actually work?",
    a: "Red and near-infrared light photons are absorbed by cytochrome c oxidase — a molecule in the mitochondria of your cells. This accelerates ATP (cellular energy) production, reduces oxidative stress and promotes the expression of genes involved in cell repair, collagen synthesis and hair follicle function. It's not a chemical or a drug — it's your own cells, working harder.",
  },
  {
    q: "Is there a difference between 650nm and 850nm?",
    a: "Yes. 650nm (visible red) penetrates 1-5mm — ideal for surface skin concerns, hair follicle stimulation and collagen production. 850nm (near-infrared) penetrates 5-20mm — ideal for deeper tissue, inflammation and cellular repair. Lumisca devices use both — because real clinical outcomes need both wavelengths working together.",
  },
  {
    q: "Is there any risk?",
    a: "Red light therapy is a non-invasive, non-thermal, non-ionising treatment. It is not UV. There are no cumulative skin damage risks. The only caution is if you are photosensitive or on photosensitising medication (certain antibiotics, Roaccutane) — consult your GP first.",
  },
  {
    q: "How often should I use my device?",
    a: "4-5 sessions per week is the clinical sweet spot. Consistency matters more than duration — 20 minutes five times a week beats 60 minutes twice a week. Results from week 4 (skin) and week 8-12 (hair).",
  },
];

export default function SciencePage() {
  return (
    <>
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-70 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 md:py-28 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">The Science</p>
          <h1 className="font-display text-display-xl mb-6">What Red Light Therapy Actually Does.</h1>
          <p className="text-cream/75 text-lg leading-relaxed">
            The clinical research, the biology, the wavelengths that matter — and what it means for your hair, skin and sleep.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-14">
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">Foundations</p>
            <h2 className="font-display text-display-lg mb-5">What is red light therapy?</h2>
            <div className="space-y-5 text-[17px] text-neutral-mid leading-relaxed">
              <p>
                Red light therapy — also called <em>low-level light therapy (LLLT)</em> and <em>photobiomodulation (PBM)</em> —
                is the therapeutic use of specific wavelengths of red (630-660nm) and near-infrared (810-850nm) light.
              </p>
              <p>
                It's been used in dermatology and sports medicine for over two decades. It does not produce heat. It is not UV.
                It is not a laser. It is visible, safe light delivered at a clinical dose.
              </p>
              <p>
                At the cellular level, these wavelengths are absorbed by cytochrome c oxidase in the mitochondria,
                triggering a measurable increase in ATP production, a reduction in oxidative stress, and upregulation of
                genes involved in collagen synthesis, wound healing and follicular regeneration.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 md:p-10 border border-neutral-light">
              <div className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">Visible Red</div>
              <h3 className="font-display text-3xl mb-3">650nm</h3>
              <p className="text-neutral-mid leading-relaxed">
                Penetrates 1-5mm into skin and scalp. Primary wavelength for hair follicle stimulation and surface-level
                skin outcomes: collagen, elastin, pigmentation. You see this wavelength as red.
              </p>
            </div>
            <div className="bg-ink text-cream p-8 md:p-10">
              <div className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">Near-Infrared</div>
              <h3 className="font-display text-3xl mb-3">850nm</h3>
              <p className="text-cream/70 leading-relaxed">
                Penetrates 5-20mm — deep tissue. Ideal for inflammation, cellular repair and reaching follicles below the
                skin surface. You don't see 850nm — it's invisible to the human eye.
              </p>
            </div>
          </div>

          <div className="space-y-14">
            <div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Hair</h2>
              <p className="text-neutral-mid leading-relaxed text-[17px]">
                LLLT has been FDA-cleared for the treatment of androgenetic alopecia in both men and women since 2007.
                Clinical trials — including the landmark Avram & Rogers (2009) study — demonstrate an average hair count
                increase of 31-39% after 12-26 weeks of consistent use. Mechanism: extension of the anagen (growth) phase
                and reactivation of dormant follicles via increased follicular ATP.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Skin</h2>
              <p className="text-neutral-mid leading-relaxed text-[17px]">
                Red light stimulates fibroblasts — the cells that produce collagen and elastin. After 12 weeks of
                3-5 sessions per week, studies have shown a 35% increase in collagen density and a measurable reduction
                in fine lines, pigmentation and erythema. Blue light (where included) has antibacterial effects against
                P. acnes and is clinically used in acne protocols.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Sleep</h2>
              <p className="text-neutral-mid leading-relaxed text-[17px]">
                Warm compress therapy at 42°C for 10-15 minutes is the gold standard in ophthalmology for meibomian gland
                dysfunction. It also downregulates sympathetic nervous activity — warmth on the eyes signals to the
                nervous system that it's safe to rest. The Lumisca Rest is calibrated to exactly these clinical parameters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-light/40 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-10">
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">References</p>
            <h2 className="font-display text-display-lg">Peer-reviewed studies we stand on.</h2>
          </div>
          <ul className="space-y-5">
            {STUDIES.map((s) => (
              <li key={s.title} className="bg-cream border border-neutral-light p-6 md:p-8">
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-mid mb-2">{s.journal}</p>
                <h3 className="font-display text-xl md:text-2xl mb-3 leading-snug">{s.title}</h3>
                <p className="text-neutral-mid leading-relaxed">{s.takeaway}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">FAQ</p>
            <h2 className="font-display text-display-lg">The Science, Questions Answered</h2>
          </div>
          <Accordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          <div className="mt-10 text-center">
            <Button href="/collections/all" variant="red" size="lg">
              Shop The Collection
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
