"use client";

import { useTrackLastVisitedPage } from "@/hooks/use-track-last-visited-page";

export function PageTracker() {
  useTrackLastVisitedPage();
  return null;
}
