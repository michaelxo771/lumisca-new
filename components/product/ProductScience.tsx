import type { Product } from "@/types";
import Button from "@/components/ui/Button";

export default function ProductScience({ product }: { product: Product }) {
  return (
    <section className="bg-ink text-cream py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-80 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">
              The Science
            </p>
            <h2 className="font-display text-display-md leading-tight mb-5">
              Clinically studied. Engineered for you.
            </h2>
            <p className="text-cream/70 leading-relaxed mb-6">
              The {product.shortName} is calibrated to the same clinical parameters shown in peer-reviewed studies to
              drive measurable outcomes.
            </p>
            <Button href="/science" variant="outline-light" size="md">
              Read The Research
            </Button>
          </div>
          <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
            {product.stats.map((s) => (
              <div key={s.value} className="bg-white/5 border border-brand-gold/30 p-6">
                <div className="font-display text-4xl text-brand-gold mb-3 leading-none">{s.value}</div>
                <p className="text-sm text-cream/70 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
