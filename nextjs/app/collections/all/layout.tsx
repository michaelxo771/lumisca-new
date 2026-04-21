import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Devices",
  description:
    "The full Lumisca collection — clinic-grade red light therapy for hair, skin and sleep. Free UK delivery. 60-day money back guarantee.",
};

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
