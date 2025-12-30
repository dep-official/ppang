"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ViewTransitions } from "next-view-transitions";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분 (구 cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// 네이티브 스크롤로 최상단 이동
function ScrollToTop({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // 네이티브 스크롤 사용
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}

export default function ClientLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ViewTransitions>
        <ScrollToTop>
          {children}
        </ScrollToTop>
      </ViewTransitions>
    </QueryClientProvider>
  );
}
