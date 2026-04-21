import type { Product, Review } from "@/types";
import StarRating from "@/components/ui/StarRating";
import { getReviewsForProduct } from "@/lib/products";

function ReviewCard({ r }: { r: Review }) {
  const date = new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <article className="bg-white border border-neutral-light p-6 md:p-8">
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={r.rating} size="sm" />
        {r.verified && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-semibold">
            ✓ Verified Buyer
          </span>
        )}
      </div>
      <h3 className="font-display text-lg leading-tight mb-2">{r.title}</h3>
      <p className="text-ink/90 leading-relaxed">&ldquo;{r.body}&rdquo;</p>
      <div className="mt-5 pt-4 border-t border-neutral-light text-sm text-neutral-mid">
        <strong className="text-ink">{r.name}</strong> · {r.location} · {date}
      </div>
    </article>
  );
}

export default function ProductReviews({ product }: { product: Product }) {
  const reviews = getReviewsForProduct(product.handle);
  if (reviews.length === 0) return null;

  return (
    <section className="bg-neutral-light/30 py-16 md:py-24 border-t border-neutral-light">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand-red font-semibold mb-3">Reviews</p>
            <h2 className="font-display text-display-md">What Customers Are Saying</h2>
          </div>
          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} size="md" />
            <p className="text-sm">
              <strong>{product.rating.toFixed(1)}/5</strong>{" "}
              <span className="text-neutral-mid">from {product.reviewCount.toLocaleString("en-GB")} reviews</span>
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
