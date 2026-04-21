import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">
              The Lumisca Collection
            </p>
            <h2 className="font-display text-display-lg max-w-2xl">
              Clinic-grade devices, designed for your sofa.
            </h2>
          </div>
          <p className="max-w-md text-neutral-mid leading-relaxed">
            Three devices that cover hair, skin and sleep — or bundle them together and save over £174.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
