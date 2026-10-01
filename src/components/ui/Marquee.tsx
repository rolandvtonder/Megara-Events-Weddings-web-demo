"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/components/providers/SmoothScroll";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Pixels per second at rest. */
  speed?: number;
  /** 1 = content travels left, -1 = travels right. */
  direction?: 1 | -1;
  /** Speeds up with scroll velocity and flips with scroll direction. */
  scrollReactive?: boolean;
  pauseOnHover?: boolean;
  copies?: number;
  className?: string;
};

export function Marquee({ children, speed = 50, direction = 1, scrollReactive = true, pauseOnHover = false, copies = 3, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr || prefersReducedMotion()) return;

    let x = 0;
    let width = 0;
    let visible = true;
    let hovered = false;
    let run = 1;
    let boost = 0;
    let dir = 1;

    const measure = () => {
      const first = tr.firstElementChild as HTMLElement | null;
      width = first ? first.offsetWidth : 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);

    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    if (pauseOnHover) {
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("focusin", enter);
      el.addEventListener("focusout", leave);
    }

    const tick = (_t: number, dt: number) => {
      if (!visible || !width) return;
      const v = scrollReactive ? (getLenis()?.velocity ?? 0) : 0;
      if (Math.abs(v) > 0.6) dir = v > 0 ? 1 : -1;
      boost += (Math.min(Math.abs(v) * 0.12, 4) - boost) * 0.08;
      run += ((hovered ? 0 : 1) - run) * 0.08;
      x -= speed * direction * dir * (1 + boost) * run * (Math.min(dt, 64) / 1000);
      if (x <= -width) x += width;
      else if (x > 0) x -= width;
      tr.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", enter);
      el.removeEventListener("focusout", leave);
    };
  }, [speed, direction, scrollReactive, pauseOnHover]);

  return (
    <div ref={root} className={cn("overflow-hidden", className)}>
      <div ref={track} className="flex w-max will-change-transform">
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} className="flex shrink-0" aria-hidden={i > 0 || undefined} inert={i > 0 || undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
