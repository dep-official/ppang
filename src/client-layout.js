"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { ReactLenis, useLenis } from "lenis/react";
import { ViewTransitions } from "next-view-transitions";

// Lenis 인스턴스를 사용하여 스크롤 리셋하는 내부 컴포넌트
function ScrollToTop({ children }) {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) {
      // Lenis 인스턴스를 사용하여 즉시 최상단으로 스크롤
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return children;
}

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Default settings (for server-side rendering)
  const defaultScrollSettings = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1,
    wheelMultiplier: 1,
    orientation: "vertical",
    smoothWheel: true,
    syncTouch: true,
  };

  const scrollSettings =
    isMobile === undefined
      ? defaultScrollSettings
      : isMobile
      ? {
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          smoothTouch: true,
          touchMultiplier: 1.5,
          infinite: false,
          lerp: 0.09,
          wheelMultiplier: 1,
          orientation: "vertical",
          smoothWheel: true,
          syncTouch: true,
        }
      : {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
          lerp: 0.1,
          wheelMultiplier: 1,
          orientation: "vertical",
          smoothWheel: true,
          syncTouch: true,
        };

  return (
    <ViewTransitions>
      <ReactLenis root options={scrollSettings} suppressHydrationWarning>
        <ScrollToTop>
          {children}
        </ScrollToTop>
      </ReactLenis>
    </ViewTransitions>
  );
}
