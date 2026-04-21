import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] bg-ink text-cream flex items-center relative overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-70 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">404</p>
        <h1 className="font-display text-display-xl mb-4">This page is off-grid.</h1>
        <p className="text-cream/75 text-lg leading-relaxed mb-8">
          The link you followed doesn't exist, or the page has moved. Let's get you back to the light.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/" variant="red" size="lg">
            Go Home
          </Button>
          <Button href="/collections/all" variant="outline-light" size="lg">
            Shop The Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
