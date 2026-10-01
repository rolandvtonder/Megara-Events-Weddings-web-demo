"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PortfolioGrid } from "./PortfolioGrid";

function FromURL() {
  const category = useSearchParams().get("category") ?? undefined;
  // Remount when the URL changes via navigation (e.g. from the mega menu) so the filter re-initialises.
  return <PortfolioGrid key={category ?? "all"} initial={category} />;
}

/** Reads ?category= in the browser so the page can be pre-rendered as static HTML. */
export function PortfolioGridFromURL() {
  return (
    <Suspense fallback={<PortfolioGrid />}>
      <FromURL />
    </Suspense>
  );
}
