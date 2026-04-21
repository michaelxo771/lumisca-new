import { PRODUCTS } from "@/lib/products";
import type { Product } from "@/types";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductUpsell({ current }: { current: Product }) {
  const others = PRODUCTS.filter((p) => p.handle !== current.handle);
  return (
    <section className="bg-cream py-16 md:py-24 border-t border-neutral-light">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">
              Better Together
            </p>
            <h2 className="font-display text-display-md">Complete Your Lumisca Routine</h2>
          </div>
          <p className="text-neutral-mid max-w-sm">
            Customers who get the best results use all three devices. Bundle them and save over £174.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
