"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLastVisitedPageStore } from "@/stores/last-visited-page-store";

export function useTrackLastVisitedPage() {
  const pathname = usePathname();
  const setLastPath = useLastVisitedPageStore((state) => state.setLastPath);

  useEffect(() => {
    if (pathname) {
      setLastPath(pathname);
    }
  }, [pathname, setLastPath]);
}
