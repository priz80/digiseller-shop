"use client";

import React from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface YandexMetrikaProps {
  counterId: number;
}

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

function MetrikaTracker({ counterId }: YandexMetrikaProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevUrlRef = React.useRef<string | null>(null);
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  React.useEffect(() => {
    if (prevUrlRef.current === currentUrl) return;

    if (prevUrlRef.current !== null && typeof window.ym === "function") {
      window.ym(counterId, "hit", currentUrl);
    }

    prevUrlRef.current = currentUrl;
  }, [counterId, currentUrl]);

  return (
    <Script
      id="yandex-metrika"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${counterId}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `,
      }}
    />
  );
}

export function YandexMetrika({ counterId }: YandexMetrikaProps) {
  const hasConsent = useCookieConsent();

  if (!hasConsent || !counterId) return null;

  return (
    <React.Suspense fallback={null}>
      <MetrikaTracker counterId={counterId} />
    </React.Suspense>
  );
}
