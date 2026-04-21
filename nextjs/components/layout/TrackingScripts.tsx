"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Tracking scripts are gated behind the `lumisca.consent` cookie set by
 * <CookieConsent />. If consent is withdrawn no pixels load.
 * ENV: NEXT_PUBLIC_META_PIXEL_ID, NEXT_PUBLIC_TIKTOK_PIXEL_ID, NEXT_PUBLIC_GA4_ID.
 * Events: PageView (auto on route), ViewContent, AddToCart, InitiateCheckout, Purchase.
 */

declare global {
  interface Window {
    fbq?: any;
    ttq?: any;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    lumiscaTrack?: (event: string, data?: Record<string, unknown>) => void;
  }
}

const META = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;

export default function TrackingScripts() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const check = () => setConsent(document.cookie.includes("lumisca.consent=accepted"));
    check();
    window.addEventListener("storage", check);
    const id = setInterval(check, 1500);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    window.lumiscaTrack = (event, data) => {
      if (!consent) return;
      if (window.fbq) window.fbq("track", event, data);
      if (window.ttq) window.ttq.track(event, data);
      if (window.gtag) window.gtag("event", event, data);
    };
  }, [consent]);

  if (!consent) return null;

  return (
    <>
      {META && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META}');
            fbq('track', 'PageView');
          `}</Script>
        </>
      )}
      {TIKTOK && (
        <Script id="tiktok-pixel" strategy="afterInteractive">{`
          !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ttq.load('${TIKTOK}');
          ttq.page();
          }(window, document, 'ttq');
        `}</Script>
      )}
      {GA4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA4}');
          `}</Script>
        </>
      )}
    </>
  );
}
