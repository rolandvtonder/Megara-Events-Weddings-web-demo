"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RailProps = {
  children: ReactNode[];
  slideClassName?: string;
  className?: string;
  tone?: "light" | "dark";
  label: string;
  /** Renders the prev/next controls into a slot the parent positions (e.g. the header row). */
  renderControls?: (controls: ReactNode) => ReactNode;
};

/** Drag / trackpad / button driven horizontal rail with a progress line. */
export function Rail({ children, slideClassName = "flex-[0_0_78%] sm:flex-[0_0_44%] md:flex-[0_0_32%] lg:flex-[0_0_24%]", className, tone = "light", label, renderControls }: RailProps) {
  const [ref, api] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps", skipSnaps: true }, [WheelGesturesPlugin()]);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ prev: false, next: true });

  const sync = useCallback(() => {
    if (!api) return;
    setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
    setEdges({ prev: api.canScrollPrev(), next: api.canScrollNext() });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("init", sync).on("scroll", sync).on("reInit", sync).on("select", sync);
    const raf = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(raf);
      api.off("init", sync).off("scroll", sync).off("reInit", sync).off("select", sync);
    };
  }, [api, sync]);

  const btn = cn(
    "grid size-12 place-items-center rounded-full border transition-all duration-300 disabled:opacity-30",
    tone === "light"
      ? "border-ink/25 hover:bg-ink hover:text-paper disabled:hover:bg-transparent disabled:hover:text-ink"
      : "border-paper/35 hover:bg-paper hover:text-ink disabled:hover:bg-transparent disabled:hover:text-paper",
  );
  const controls = (
    <div className="flex gap-2">
      <button type="button" aria-label="Scroll back" disabled={!edges.prev} onClick={() => api?.scrollPrev()} className={btn}>
        <ArrowLeft className="size-4" strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="Scroll forward" disabled={!edges.next} onClick={() => api?.scrollNext()} className={btn}>
        <ArrowRight className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  );

  return (
    <div className={className}>
      {renderControls?.(controls)}
      <div ref={ref} data-cursor="drag" data-skew className="overflow-hidden" role="region" aria-roledescription="carousel" aria-label={label}>
        <div className="-ml-4 flex touch-pan-y md:-ml-6">
          {children.map((child, i) => (
            <div key={i} className={cn("min-w-0 pl-4 md:pl-6", slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className={cn("mt-10 h-px w-full", tone === "light" ? "bg-ink/12" : "bg-paper/20")}>
        <div className={cn("h-full origin-left", tone === "light" ? "bg-coral" : "bg-gold")} style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
      </div>
    </div>
  );
}
