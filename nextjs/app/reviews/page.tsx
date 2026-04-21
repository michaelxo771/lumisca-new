import type { Metadata } from "next";
import Link from "next/link";
import { REVIEWS } from "@/lib/products";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read verified UK customer reviews of Lumisca hair, face and eye devices. 4.9/5 from 2,847 reviews. Real results, real stories.",
};

const PRODUCT_LABELS: Record<string, string> = {
  "lumisca-pro-hair-growth-cap": "Pro Hair Growth Cap",
  "lumisca-glow-face-mask": "Glow Face Mask",
  "lumisca-rest-eye-mask": "Rest Eye Mask",
  "lumisca-complete-bundle": "Complete Bundle",
};

export default function ReviewsPage() {
  const totalStars = REVIEWS.reduce((a, r) => a + r.rating, 0);
  const avg = totalStars / REVIEWS.length;

  return (
    <>
      <section className="bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-70 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 md:py-28 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-semibold mb-3">Reviews</p>
          <h1 className="font-display text-display-xl mb-5">
            10,000+ customers. <br className="md:hidden" />
            4.9 stars.
          </h1>
          <p className="text-cream/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Every review below is from a verified UK buyer. Real names, real results, real timelines.
          </p>
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-4 border border-white/15 bg-white/5">
            <div className="font-display text-5xl">{avg.toFixed(1)}</div>
            <div>
              <StarRating rating={avg} size="md" color="gold" />
              <p className="text-xs tracking-[0.15em] uppercase text-cream/70 mt-1">
                From 2,847 verified UK reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <ul className="space-y-5">
            {REVIEWS.map((r) => {
              const date = new Date(r.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return (
                <li key={r.id} className="bg-white border border-neutral-light p-6 md:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={r.rating} size="sm" />
                    {r.verified && (
                      <span className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-semibold">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-xl md:text-2xl leading-snug mb-3">{r.title}</h2>
                  <p className="text-ink/90 leading-relaxed text-[16px]">&ldquo;{r.body}&rdquo;</p>
                  <div className="mt-5 pt-4 border-t border-neutral-light text-sm text-neutral-mid flex flex-wrap gap-x-2">
                    <strong className="text-ink">{r.name}</strong>
                    <span>·</span>
                    <span>{r.location}</span>
                    <span>·</span>
                    <span>{date}</span>
                    <span>·</span>
                    <Link
                      href={`/products/${r.productHandle}`}
                      className="text-brand-red hover:underline"
                    >
                      {PRODUCT_LABELS[r.productHandle]}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 text-center">
            <Button href="/collections/all" variant="red" size="lg">
              Shop The Collection
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
