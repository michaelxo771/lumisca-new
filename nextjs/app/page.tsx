import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import ScienceCallout from "@/components/home/ScienceCallout";
import BundleHighlight from "@/components/home/BundleHighlight";
import Testimonials from "@/components/home/Testimonials";
import UGCStrip from "@/components/home/UGCStrip";
import FAQStrip from "@/components/home/FAQStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <HowItWorks />
      <ScienceCallout />
      <BundleHighlight />
      <Testimonials />
      <UGCStrip />
      <FAQStrip />
    </>
  );
}
