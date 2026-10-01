"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/components/providers/SmoothScroll";
import { cn, prefersReducedMotion } from "@/lib/utils";

const W = 1440;
const POINTS = 56;

/**
 * A living liquid edge, like a ribbon of silk. `position="top"` paints the page colour above
 * the wave (use at the top of a dark section); `bottom` paints it below.
 */
export function WaveEdge({ position = "top", height = 120, className, seed = 0 }: { position?: "top" | "bottom"; height?: number; className?: string; seed?: number }) {
  const path = useRef<SVGPathElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const p = path.current;
    const el = svg.current;
    if (!p || !el) return;
    const H = height;
    let t = seed * 3.7;
    let amp = 1;
    let visible = true;

    const build = () => {
      const base = H * 0.52;
      let d = position === "top" ? "M0 0" : `M0 ${H}`;
      for (let i = 0; i <= POINTS; i++) {
        const x = (i / POINTS) * W;
        const y =
          base +
          Math.sin(x * 0.0042 + t * 0.9 + seed) * H * 0.2 * amp +
          Math.sin(x * 0.0097 - t * 1.3 + 1.7 + seed) * H * 0.09 * amp +
          Math.sin(x * 0.0021 + t * 0.45 + 4.1) * H * 0.12;
        d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      d += position === "top" ? ` L${W} 0 Z` : ` L${W} ${H} Z`;
      p.setAttribute("d", d);
    };
    build();
    if (prefersReducedMotion()) return;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    const tick = (_t: number, dt: number) => {
      if (!visible) return;
      const v = Math.abs(getLenis()?.velocity ?? 0);
      amp += (1 + Math.min(v * 0.05, 1.1) - amp) * 0.06;
      t += (Math.min(dt, 64) / 1000) * (0.9 + Math.min(v * 0.04, 1.5));
      build();
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
    };
  }, [position, height, seed]);

  return (
    <svg
      ref={svg}
      aria-hidden
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 z-10 block w-full", position === "top" ? "top-0" : "bottom-0", className)}
      style={{ height }}
    >
      <path ref={path} style={{ fill: "var(--page-bg)" }} />
    </svg>
  );
}
