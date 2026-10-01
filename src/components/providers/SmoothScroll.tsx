"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { selectScrollLocked, useUI } from "@/store/ui";

// A tiny external store so any component can reach the Lenis instance without prop drilling.
let instance: Lenis | null = null;
const listeners = new Set<() => void>();
const setInstance = (l: Lenis | null) => {
  instance = l;
  listeners.forEach((fn) => fn());
};
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

/** Non-React access (tickers, event handlers). */
export const getLenis = () => instance;

export function useLenis() {
  return useSyncExternalStore(
    subscribe,
    () => instance,
    () => null,
  );
}

/**
 * One Lenis instance, advanced from GSAP's ticker (autoRaf off) and feeding ScrollTrigger on
 * every scroll — every pinned section depends on this wiring, so don't add a second rAF loop.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locked = useUI(selectScrollLocked);
  const introDone = useUI((s) => s.introDone);
  const lenis = useLenis();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const l = new Lenis({
      lerp: reduce ? 1 : 0.095,
      smoothWheel: !reduce,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.3,
      autoRaf: false,
      anchors: { offset: -90 },
    });
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setInstance(l);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      l.destroy();
      setInstance(null);
    };
  }, []);

  // Freeze the page behind overlays and during the intro.
  useEffect(() => {
    if (!lenis) return;
    if (locked || !introDone) lenis.stop();
    else lenis.start();
  }, [lenis, locked, introDone]);

  // Reset scroll on route change (or honour a #hash target), and move focus to main content.
  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    lenis.scrollTo(0, { immediate: true, force: true });
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash) {
        const el = document.querySelector(hash);
        if (el) window.setTimeout(() => lenis.scrollTo(el as HTMLElement, { offset: -90, force: true }), 350);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, lenis]);

  return <>{children}</>;
}
