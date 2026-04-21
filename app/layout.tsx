import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import WelcomePopup from "@/components/popups/WelcomePopup";
import ExitPopup from "@/components/popups/ExitPopup";
import CartUpsellPopup from "@/components/popups/CartUpsellPopup";
import RecentPurchaseToast from "@/components/popups/RecentPurchaseToast";
import CookieConsent from "@/components/popups/CookieConsent";
import BackToTop from "@/components/ui/BackToTop";
import { CartProvider } from "@/components/layout/CartProvider";
import TrackingScripts from "@/components/layout/TrackingScripts";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lumisca.co.uk"),
  title: {
    default: "LUMISCA — Your At-Home Light Therapy Clinic",
    template: "%s | LUMISCA",
  },
  description:
    "Clinic-grade red light therapy for hair, skin and sleep. UK-designed. 60-day money-back guarantee. Free UK delivery. Join 10,000+ Lumisca customers.",
  keywords: [
    "red light therapy UK",
    "LED face mask UK",
    "hair growth cap",
    "heated eye mask",
    "at-home light therapy",
    "lumisca",
  ],
  applicationName: "LUMISCA",
  creator: "LUMISCA",
  publisher: "LUMISCA",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://lumisca.co.uk",
    siteName: "LUMISCA",
    title: "LUMISCA — Your At-Home Light Therapy Clinic",
    description:
      "Clinic-grade red light therapy for hair, skin and sleep. UK-designed. 60-day money-back guarantee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMISCA — Your At-Home Light Therapy Clinic",
    description:
      "Clinic-grade red light therapy for hair, skin and sleep. 60-day money-back guarantee.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-cream text-ink antialiased no-horizontal-overflow">
        <TrackingScripts />
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <CartUpsellPopup />
          <WelcomePopup />
          <ExitPopup />
          <RecentPurchaseToast />
          <CookieConsent />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
