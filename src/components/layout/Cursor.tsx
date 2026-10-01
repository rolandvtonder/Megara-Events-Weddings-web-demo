"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Diamond dot + trailing ring. Grows over links/buttons; shows a label over
 * [data-cursor="drag" | "view"] regions. Fine pointers only, off for reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current || !label.current) return;

    const d = dot.current;
    const r = ring.current;
    const l = label.current;
    document.documentElement.classList.add("has-cursor");
    gsap.set([d, r], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3.out" });

    let mode = "";
    let shown = false;
    const setMode = (m: string) => {
      if (m === mode) return;
      mode = m;
      const labelText = m === "drag" ? "Drag" : m === "view" ? "View" : "";
      l.textContent = labelText;
      const big = m === "drag" || m === "view";
      gsap.to(r, {
        width: m === "drag" ? 92 : m === "view" ? 78 : m === "link" ? 54 : 34,
        height: m === "drag" ? 92 : m === "view" ? 78 : m === "link" ? 54 : 34,
        backgroundColor: big ? "rgba(232,187,92,1)" : m === "link" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
        borderColor: big ? "rgba(232,187,92,0)" : "rgba(255,255,255,0.9)",
        duration: 0.45,
        ease: "expo.out",
      });
      gsap.to(l, { autoAlpha: labelText ? 1 : 0, scale: labelText ? 1 : 0.6, duration: 0.3 });
      gsap.to(d, { scale: m ? 0 : 1, duration: 0.3 });
      r.style.mixBlendMode = big ? "normal" : "difference";
    };

    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([d, r], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const special = t.closest<HTMLElement>("[data-cursor]");
      if (special) return setMode(special.dataset.cursor ?? "link");
      if (t.closest("a, button, [role='button'], label, select, summary")) return setMode("link");
      setMode("");
    };
    const leave = () => {
      shown = false;
      gsap.to([d, r], { autoAlpha: 0, duration: 0.3 });
    };
    const down = () => gsap.to(r, { scale: 0.82, duration: 0.2 });
    const up = () => gsap.to(r, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[400] grid size-[34px] place-items-center rounded-full border border-white/90 opacity-0 mix-blend-difference">
        <span ref={label} className="micro text-[0.625rem] text-ink opacity-0">
          Drag
        </span>
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[400] size-2 rotate-45 bg-white opacity-0 mix-blend-difference" />
    </>
  );
}
