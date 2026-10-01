"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "@/data/home";
import { Img } from "@/components/ui/Img";
import { getLenis } from "@/components/providers/SmoothScroll";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { cn, pad, prefersReducedMotion } from "@/lib/utils";

const N = CHAPTERS.length;
const HIDE = { opacity: 0, visibility: "hidden" } as const;

/** Pinned full-screen portfolio "lookbook": scroll, drag, thumbnails or arrow keys move through chapters. */
export function Chapters() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const prevRef = useRef(0);
  const inView = useRef(false);
  const splits = useRef<SplitText[]>([]);
  const chapter = CHAPTERS[active];

  const goTo = (idx: number) => {
    const el = root.current;
    if (!el) return;
    const i = Math.max(0, Math.min(N - 1, idx));
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + ((i + 0.5) / N) * (el.offsetHeight - window.innerHeight);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Scroll position → chapter
  useGSAP(
    () => {
      const bar = root.current?.querySelector<HTMLElement>("[data-ch-progress]");
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onToggle: (self) => (inView.current = self.isActive),
        onUpdate: (self) => {
          const idx = Math.min(N - 1, Math.floor(self.progress * N));
          if (bar) bar.style.transform = `scaleX(${(idx + 1) / N})`;
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
        },
      });
      splits.current = gsap.utils.toArray<HTMLElement>("[data-ch-title]").map((t) => SplitText.create(t, { type: "chars,words", mask: "chars" }));
    },
    { scope: root },
  );

  // Chapter transition
  useGSAP(
    () => {
      const from = prevRef.current;
      if (from === active) return;
      const reduce = prefersReducedMotion();
      const bgs = gsap.utils.toArray<HTMLElement>("[data-ch-bg]");
      const titles = gsap.utils.toArray<HTMLElement>("[data-ch-title]");
      const metas = gsap.utils.toArray<HTMLElement>("[data-ch-meta]");

      gsap.to(bgs[from], { autoAlpha: 0, duration: 1, ease: "power2.inOut" });
      gsap.fromTo(bgs[active], { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: "power2.inOut" });
      gsap.fromTo(bgs[active].firstElementChild, { scale: 1.16 }, { scale: 1, duration: reduce ? 0.1 : 2.4, ease: "expo.out" });

      gsap.to(titles[from], { autoAlpha: 0, yPercent: -30, duration: 0.5, ease: "power2.in" });
      gsap.set(titles[active], { autoAlpha: 1, yPercent: 0 });
      gsap.fromTo(splits.current[active]?.chars ?? titles[active], { yPercent: 115 }, { yPercent: 0, duration: reduce ? 0.1 : 1.1, ease: "expo.out", stagger: 0.03, delay: 0.25 });
      gsap.to(metas[from], { autoAlpha: 0, y: -12, duration: 0.4 });
      gsap.fromTo(metas[active], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", delay: 0.35 });
      prevRef.current = active;
    },
    { dependencies: [active], scope: root },
  );

  // Arrow keys while the section is pinned
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(activeRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(activeRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const drag = useRef<{ x: number; id: number } | null>(null);

  return (
    <section ref={root} id="chapters" aria-label="Portfolio highlights" className="relative bg-ink" style={{ height: `calc(${N} * 62vh + 100svh)` }}>
      <div
        data-cursor="drag"
        className="sticky top-0 h-[100svh] touch-pan-y select-none overflow-hidden text-paper"
        onPointerDown={(e) => (drag.current = { x: e.clientX, id: e.pointerId })}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          if (!d || d.id !== e.pointerId) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 70) goTo(activeRef.current + (dx < 0 ? 1 : -1));
        }}
      >
        {CHAPTERS.map((c, i) => (
          <div key={c.title} data-ch-bg className="absolute inset-0" style={i === 0 ? undefined : HIDE}>
            <div className="absolute inset-0 will-change-transform">
              <Img id={c.image} alt={c.alt} sizes="100vw" eager={i === 0} position="55% 50%" />
            </div>
          </div>
        ))}
        <div aria-hidden className="absolute inset-0 opacity-50 mix-blend-multiply transition-colors duration-1000" style={{ backgroundColor: chapter.tint }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/75 to-transparent" />

        <p className="micro absolute left-1/2 top-[calc(var(--nav-h)+1.5rem)] -translate-x-1/2 whitespace-nowrap">Megara — Portfolio highlights</p>

        <div className="container-x relative flex h-full flex-col justify-center">
          <div className="relative h-[clamp(9rem,22vw,20rem)] max-w-[80vw]">
            {CHAPTERS.map((c, i) => (
              <h3 key={c.title} data-ch-title style={i === 0 ? undefined : HIDE} className="absolute bottom-0 left-0 max-w-[8ch] font-serif text-[clamp(3.8rem,9.6vw,9.4rem)] italic leading-[0.86]">
                {c.title}
              </h3>
            ))}
          </div>
          <div className="relative mt-6 h-10">
            {CHAPTERS.map((c, i) => (
              <p key={c.title} data-ch-meta style={i === 0 ? undefined : HIDE} className="micro absolute left-0 top-0 flex flex-wrap items-center gap-x-6 gap-y-2 text-paper/90">
                <span className="text-gold">{c.kind}</span>
                <span>{c.place}</span>
                <span>{pad(i + 1)}</span>
              </p>
            ))}
          </div>
          <Link
            href={`/portfolio/${chapter.gallery}`}
            className="micro group mt-8 inline-flex min-h-11 w-max items-center gap-2 rounded-full border border-paper/50 bg-ink/20 px-5 backdrop-blur transition-colors hover:bg-paper hover:text-ink"
          >
            View the celebration <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-[4.5rem] right-[var(--gutter)] flex items-start gap-2 md:bottom-24 md:gap-3">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.title}
              type="button"
              aria-label={`Chapter ${i + 1}: ${c.title}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={cn("relative aspect-[4/3] w-11 overflow-hidden rounded-[4px] ring-paper transition-all duration-700 ease-expo sm:w-16 md:w-24", i === active ? "z-10 translate-y-4 scale-[1.3] ring-2" : "opacity-60 hover:opacity-100")}
            >
              <Img id={c.image} alt="" sizes="140px" />
            </button>
          ))}
        </div>

        {/* Progress + hint */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-between px-[var(--gutter)]">
          <div className="flex items-center gap-3">
            <span className="micro tabular-nums">{pad(active + 1)}</span>
            <span className="block h-px w-28 bg-paper/25 md:w-44">
              <span data-ch-progress className="block h-full origin-left bg-gold transition-transform duration-700 ease-expo" style={{ transform: `scaleX(${1 / N})` }} />
            </span>
            <span className="micro tabular-nums opacity-70">{pad(N)}</span>
          </div>
          <p className="micro hidden opacity-75 md:block">Drag, scroll, or use the arrow keys to explore</p>
        </div>
      </div>
    </section>
  );
}
