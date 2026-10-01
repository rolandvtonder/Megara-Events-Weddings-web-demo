"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * One scroll-motion layer per page, driven by data attributes:
 *   data-px="6"          drifts horizontally from +6vw to −6vw while the element crosses the viewport
 *   data-py="80"         drifts vertically from +80px to −80px (depth parallax)
 *   data-img-parallax    image travels inside its frame (frame must clip overflow)
 *   data-skew            leans with scroll velocity, then settles back
 */
export function ScrollFX() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scrub = { start: "top bottom", end: "bottom top", scrub: 0.6 } as const;

    gsap.utils.toArray<HTMLElement>("[data-px]").forEach((el) => {
      const v = Number(el.dataset.px) || 0;
      gsap.fromTo(el, { x: () => (window.innerWidth * v) / 100 }, { x: () => (-window.innerWidth * v) / 100, ease: "none", scrollTrigger: { trigger: el, ...scrub, invalidateOnRefresh: true } });
    });

    gsap.utils.toArray<HTMLElement>("[data-py]").forEach((el) => {
      const v = Number(el.dataset.py) || 0;
      // Parallax only on wider screens — on phones it just pushes content into neighbours.
      if (window.innerWidth < 768) return;
      gsap.fromTo(el, { y: v }, { y: -v, ease: "none", scrollTrigger: { trigger: el, ...scrub } });
    });

    gsap.utils.toArray<HTMLElement>("[data-img-parallax]").forEach((el) => {
      gsap.fromTo(el, { yPercent: -8, scale: 1.18 }, { yPercent: 8, scale: 1.18, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, ...scrub } });
    });

    const skews = gsap.utils.toArray<HTMLElement>("[data-skew]");
    if (skews.length) {
      const setters = skews.map((el) => gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3.out" }));
      ScrollTrigger.create({
        onUpdate: (self) => {
          const s = gsap.utils.clamp(-3, 3, self.getVelocity() / -500);
          setters.forEach((set) => set(s));
        },
      });
    }

    ScrollTrigger.refresh();
  });

  return null;
}

/** Giant outlined word that slides sideways behind a section's content. */
export function GhostText({ text, className = "top-10", speed = 14, tone = "dark" }: { text: string; className?: string; speed?: number; tone?: "dark" | "light" }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 -z-10 select-none overflow-hidden ${className}`}>
      <div
        data-px={speed}
        className="whitespace-nowrap font-display text-[17vw] uppercase leading-none tracking-tight text-transparent"
        style={{ WebkitTextStroke: tone === "dark" ? "1.2px rgba(43,35,33,0.12)" : "1.2px rgba(251,247,245,0.16)" }}
      >
        {text} · {text} · {text}
      </div>
    </div>
  );
}

const DEFAULT_BG = "#FBF7F5";

/**
 * The page quietly changes its colour as you scroll: every section with a
 * `data-bg` colour tweens the page background when it takes centre stage.
 */
export function BackgroundMorph() {
  useGSAP(() => {
    const root = document.documentElement;
    gsap.utils.toArray<HTMLElement>("[data-bg]").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => {
          if (!self.isActive) return;
          gsap.to(root, { "--page-bg": section.dataset.bg ?? DEFAULT_BG, duration: 0.9, ease: "power2.out", overwrite: "auto" });
        },
      });
    });
    return () => {
      gsap.set(root, { "--page-bg": DEFAULT_BG });
    };
  });

  return null;
}

/** Drop into any page to get the colour morph + scroll motion layer. */
export function PageFX() {
  return (
    <>
      <BackgroundMorph />
      <ScrollFX />
    </>
  );
}
