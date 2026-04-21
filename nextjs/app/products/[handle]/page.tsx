import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProduct } from "@/lib/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import ProductBenefits from "@/components/product/ProductBenefits";
import ResultsTimeline from "@/components/product/ResultsTimeline";
import ProductScience from "@/components/product/ProductScience";
import ProductUpsell from "@/components/product/ProductUpsell";
import ProductReviews from "@/components/product/ProductReviews";

type Params = { handle: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getProduct(params.handle);
  if (!p) return { title: "Product not found" };
  return {
    title: p.name,
    description: p.description,
    openGraph: {
      title: p.name,
      description: p.description,
      type: "website",
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const product = getProduct(params.handle);
  if (!product) return notFound();

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 pt-6">
          <nav className="text-xs tracking-[0.12em] uppercase text-neutral-mid" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/collections/all" className="hover:text-ink">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{product.shortName}</span>
          </nav>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
        <div className="mx-auto max-w-7xl px-4">
          <ProductTabs product={product} />
        </div>
      </section>
      <ProductBenefits product={product} />
      <ResultsTimeline product={product} />
      <ProductScience product={product} />
      <ProductUpsell current={product} />
      <ProductReviews product={product} />
    </>
  );
}
