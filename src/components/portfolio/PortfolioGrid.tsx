"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { CATEGORY_LABEL, GALLERIES, type PortfolioCategory } from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { Flip, gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Filter = "all" | PortfolioCategory;
const FILTERS: Filter[] = ["all", "wedding", "celebration", "brand"];

/** Category filter whose cards FLIP-animate into their new positions. */
export function PortfolioGrid({ initial }: { initial?: string }) {
  const [filter, setFilter] = useState<Filter>(FILTERS.includes(initial as Filter) ? (initial as Filter) : "all");
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const list = useMemo(() => (filter === "all" ? GALLERIES : GALLERIES.filter((g) => g.category === filter)), [filter]);

  const change = (f: Filter) => {
    if (grid.current && !prefersReducedMotion()) flipState.current = Flip.getState(grid.current.querySelectorAll("[data-flip-id]"));
    setFilter(f);
    window.history.replaceState(null, "", f === "all" ? "/portfolio" : `/portfolio?category=${f}`);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !grid.current) return;
    flipState.current = null;
    Flip.from(state, {
      targets: grid.current.querySelectorAll("[data-flip-id]"),
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.02,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.03 }),
    });
  }, [list]);

  return (
    <>
      <div className="sticky top-[calc(var(--nav-h)-1px)] z-30 border-y border-line bg-[var(--page-bg)]/92 backdrop-blur-xl">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <div className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 no-scrollbar" role="group" aria-label="Filter portfolio">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => change(f)}
                className={cn("min-h-11 shrink-0 rounded-full border px-5 text-sm transition-colors duration-300", filter === f ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink")}
              >
                {f === "all" ? "Everything" : CATEGORY_LABEL[f]}
              </button>
            ))}
          </div>
          <p className="hidden text-sm text-mute sm:block" aria-live="polite">
            {list.length} {list.length === 1 ? "celebration" : "celebrations"}
          </p>
        </div>
      </div>

      <div className="container-x mt-12">
        <div ref={grid} className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g, i) => (
            <div key={g.slug} data-flip-id={g.slug} className={cn(i % 3 === 1 && "lg:translate-y-16")}>
              <PortfolioCard g={g} priority={i < 3} tall={i % 3 === 1} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
