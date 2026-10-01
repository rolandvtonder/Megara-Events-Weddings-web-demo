"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Monogram } from "@/components/ui/BrandMark";
import { SilkCanvas } from "@/components/ui/SilkCanvas";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { useUI } from "@/store/ui";

// Teal → coral → blush → gold: the brand palette as a sheet of silk.
const PALETTE: [string, string, string, string] = ["#1E3A3C", "#E45E4C", "#F2A48F", "#E8BB5C"];
let played = false;

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
const pageLoaded = () =>
  new Promise<void>((r) => {
    if (document.readyState === "complete") r();
    else window.addEventListener("load", () => r(), { once: true });
  });

/**
 * First-visit preloader: a living silk sheet in the brand colours counts up,
 * then tears open from the corner to reveal the hero behind it.
 */
export function Intro() {
  const pathname = usePathname();
  const [show, setShow] = useState(() => pathname === "/" && !played);
  const setIntroDone = useUI((s) => s.setIntroDone);
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLHeadingElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const reveal = useRef(0);
  const noGL = useRef(false);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (!show) setIntroDone();
  }, [show, setIntroDone]);

  useGSAP(
    () => {
      if (!show || !root.current) return;
      if (prefersReducedMotion()) {
        played = true;
        setIntroDone();
        gsap.to(root.current, { autoAlpha: 0, duration: 0.4, onComplete: () => setShow(false) });
        return;
      }

      const split = SplitText.create(word.current, { type: "chars", mask: "chars" });
      gsap
        .timeline()
        .from("[data-intro-mark]", { scale: 0.6, rotate: -45, autoAlpha: 0, duration: 1.6, ease: "expo.out" })
        .from(split.chars, { yPercent: 115, duration: 1.4, ease: "expo.out", stagger: 0.07 }, 0.15)
        .from("[data-intro-meta]", { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.08 }, "<0.35");

      const count = { v: 0 };
      const paint = () => {
        if (counter.current) counter.current.textContent = String(Math.round(count.v)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${count.v / 100})`;
      };
      gsap.to(count, { v: 86, duration: 2.2, ease: "power2.inOut", onUpdate: paint });

      let cancelled = false;
      const ready = Promise.all([document.fonts?.ready ?? Promise.resolve(), pageLoaded(), wait(2400)]);
      Promise.race([ready, wait(5200)]).then(() => {
        if (cancelled) return;
        gsap
          .timeline({
            onComplete: () => {
              played = true;
              setShow(false);
            },
          })
          .to(count, { v: 100, duration: 0.55, ease: "power2.out", onUpdate: paint })
          .to("[data-intro-ui]", { autoAlpha: 0, y: -28, duration: 0.65, ease: "power2.in", stagger: 0.05 }, "+=0.1")
          // The silk canvas is opaque here, so dropping the gradient underneath is invisible — and the tear then opens onto the hero.
          .set("[data-intro-fallback]", { autoAlpha: noGL.current ? 1 : 0 })
          // WebGL tears the silk open; without it, a CSS mask opens the same hole.
          .to(noGL.current ? root.current : reveal, noGL.current ? { "--hole": "150%", duration: 1.7, ease: "power2.inOut" } : { current: 1, duration: 1.9, ease: "power2.inOut" }, "-=0.25")
          .call(() => setIntroDone(), [], "-=1.35");
      });
      return () => {
        cancelled = true;
      };
    },
    { scope: root, dependencies: [show] },
  );

  if (!show) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] text-paper"
      aria-hidden
      style={
        fallback
          ? ({
              "--hole": "0%",
              maskImage: "radial-gradient(circle at 86% 86%, transparent var(--hole), #000 calc(var(--hole) + 0.6%))",
              WebkitMaskImage: "radial-gradient(circle at 86% 86%, transparent var(--hole), #000 calc(var(--hole) + 0.6%))",
            } as CSSProperties)
          : undefined
      }
    >
      <div
        data-intro-fallback
        className="absolute inset-0 animate-[silk-fallback_9s_ease-in-out_infinite_alternate] bg-[length:220%_220%]"
        style={{ backgroundImage: "linear-gradient(125deg,#1E3A3C,#E45E4C 42%,#F2A48F 66%,#E8BB5C 92%)" }}
      />
      <SilkCanvas
        palette={PALETTE}
        reveal={reveal}
        origin={[0.86, 0.14]}
        resolution={0.55}
        speed={1.15}
        className="absolute inset-0"
        onFallback={() => {
          noGL.current = true;
          setFallback(true);
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-[var(--gutter)]">
        <div data-intro-ui className="flex justify-between">
          <span data-intro-meta className="micro">
            Est. 2016 — Cape Town
          </span>
          <span data-intro-meta className="micro">
            Events &amp; Weddings
          </span>
        </div>
        <div data-intro-ui className="flex flex-col items-center text-center">
          <span data-intro-mark className="mb-6 block">
            <Monogram className="size-20 drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)] md:size-28" />
          </span>
          <h2 ref={word} className="relative inline-block whitespace-nowrap font-display text-[15vw] leading-[0.8] tracking-[0.04em] drop-shadow-[0_8px_40px_rgba(0,0,0,0.25)] md:text-[14vw]">
            MEGARA
          </h2>
          <p data-intro-meta className="mt-6 font-serif text-2xl italic md:text-3xl">
            Beautiful events &amp; memorable occasions
          </p>
        </div>
        <div data-intro-ui className="flex items-end justify-between gap-6">
          <span ref={counter} className="font-display text-6xl leading-none tabular-nums md:text-8xl">
            000
          </span>
          <div data-intro-meta className="w-40 text-right md:w-56">
            <span className="micro">Setting the table</span>
            <span className="mt-3 block h-px w-full bg-paper/30">
              <span ref={bar} className="block h-full origin-left scale-x-0 bg-paper" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
