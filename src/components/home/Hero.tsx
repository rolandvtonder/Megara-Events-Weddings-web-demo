"use client";

import { Coffee, MapPin, Play, Sparkles } from "lucide-react";
import { useRef } from "react";
import { HERO } from "@/data/home";
import { TRUST } from "@/data/site";
import { Img } from "@/components/ui/Img";
import { PillLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { useUI } from "@/store/ui";

const TRUST_ICONS = { sparkles: Sparkles, map: MapPin, coffee: Coffee } as const;
const HIDDEN = { visibility: "hidden" } as const;

/**
 * Pinned, scroll-driven hero. Three stills play one beat: the first pushes in, the second
 * opens from a diamond, the third wipes up — while captions drift in "here and there".
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const introDone = useUI((s) => s.introDone);
  const setStory = useUI((s) => s.setStory);

  // Scroll scene
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        defaults: { ease: "none", immediateRender: false },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.9 },
      });

      // Copy + captions are a pure function of scroll position (not a reversible timeline),
      // so jumping from the bottom of the page straight to the top can never leave them stacked.
      const q = <T extends HTMLElement>(sel: string) => root.current?.querySelector<T>(sel) ?? null;
      const copy = q("[data-hero-copy]");
      const trust = q("[data-hero-trust]");
      const side = q("[data-hero-side]");
      const caps = [0, 1, 2].map((i) => q(`[data-caption='${i}']`));
      const WINDOWS: [number, number, number, number][] = [
        [0.24, 0.31, 0.4, 0.47],
        [0.5, 0.57, 0.66, 0.73],
        [0.78, 0.88, 2, 3],
      ];
      const win = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
      let target = 0;
      let smooth = -1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => (target = self.progress),
        onRefresh: (self) => (target = self.progress),
      });
      const paint = () => {
        const next = smooth < 0 ? target : smooth + (target - smooth) * 0.2;
        if (Math.abs(next - smooth) < 0.0002) return;
        smooth = Math.abs(next - target) < 0.0005 ? target : next;
        const out = win(smooth, 0.02, 0.18);
        if (copy) gsap.set(copy, { autoAlpha: 1 - out, yPercent: -22 * out, filter: `blur(${(12 * out).toFixed(2)}px)` });
        const fade = win(smooth, 0.02, 0.12);
        if (trust) gsap.set(trust, { autoAlpha: 1 - fade, y: 40 * fade });
        if (side) gsap.set(side, { autoAlpha: 1 - fade });
        caps.forEach((el, i) => {
          if (!el) return;
          const [a0, a1, b0, b1] = WINDOWS[i];
          const a = win(smooth, a0, a1);
          const b = win(smooth, b0, b1);
          gsap.set(el, i === 2 ? { autoAlpha: a, scale: 0.92 + 0.08 * a } : { autoAlpha: a * (1 - b), y: 70 * (1 - a) - 70 * b });
        });
      };
      gsap.ticker.add(paint);

      // First still pushes in, the second opens from the logo's diamond, the third wipes up.
      tl.fromTo("[data-hero-progress]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        .fromTo("[data-layer='0'] [data-zoom]", { scale: 1 }, { scale: 1.3, duration: 0.44 }, 0)
        .fromTo("[data-layer='1']", { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }, { clipPath: "polygon(50% -60%, 160% 50%, 50% 160%, -60% 50%)", duration: 0.26, ease: "power2.inOut" }, 0.18)
        .fromTo("[data-layer='1'] [data-zoom]", { scale: 1.4 }, { scale: 1.05, duration: 0.42 }, 0.18)
        .fromTo("[data-layer='2']", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.18, ease: "power2.inOut" }, 0.5)
        .fromTo("[data-layer='2'] [data-zoom]", { scale: 1.3, yPercent: 6 }, { scale: 1, yPercent: 0, duration: 0.46 }, 0.5);
      return () => gsap.ticker.remove(paint);
    },
    { scope: root },
  );

  // Entrance once the intro has torn away
  useGSAP(
    () => {
      if (!introDone) return;
      if (prefersReducedMotion()) {
        gsap.set("[data-hero-in]", { autoAlpha: 1 });
        return;
      }
      const split = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap
        .timeline({ delay: 0.05 })
        .set("[data-hero-in]", { autoAlpha: 1 })
        .from("[data-enter]", { scale: 1.28, duration: 2.6, ease: "expo.out" }, 0)
        .from(split.lines, { yPercent: 112, duration: 1.5, ease: "expo.out", stagger: 0.12 }, 0.15)
        .from("[data-hero-fade]", { autoAlpha: 0, y: 32, duration: 1.3, ease: "expo.out", stagger: 0.09 }, 0.45)
        .from("[data-hero-trust] li", { autoAlpha: 0, y: 26, duration: 1.1, ease: "expo.out", stagger: 0.08 }, 0.75);
    },
    { scope: root, dependencies: [introDone] },
  );

  return (
    <section id="hero" ref={root} aria-label="Megara Events & Weddings" className="relative h-[300svh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {HERO.layers.map((l, i) => (
          <div
            key={l.id}
            data-layer={i}
            className="absolute inset-0 overflow-hidden"
            style={i === 1 ? { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" } : i === 2 ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}
          >
            <div data-zoom className="absolute inset-0 will-change-transform">
              <div data-enter={i === 0 ? "" : undefined} className="absolute inset-0">
                <Img id={l.id} alt={l.alt} sizes="100vw" priority={i === 0} eager={i > 0} position={l.position} />
              </div>
            </div>
          </div>
        ))}

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/45 to-transparent" />

        {/* Copy */}
        <div data-hero-copy className="absolute inset-x-0 bottom-[17svh] z-10 text-paper md:bottom-[19svh]">
          <div className="container-x">
            <p data-hero-in data-hero-fade style={HIDDEN} className="eyebrow text-gold">
              {HERO.eyebrow}
            </p>
            <h1 data-hero-in data-hero-title style={HIDDEN} className="mt-5 max-w-[14ch] font-serif text-[clamp(3.2rem,8.4vw,9.4rem)] leading-[0.88] tracking-[-0.01em]">
              {HERO.titleTop}
              <br />
              {HERO.titleBottom} <em className="text-gold">{HERO.titleAccent}</em>
            </h1>
            <p data-hero-in data-hero-fade style={HIDDEN} className="eyebrow mt-7 text-paper/90">
              {HERO.kicker}
            </p>
            <p data-hero-in data-hero-fade style={HIDDEN} className="mt-3 max-w-md text-lg leading-relaxed text-paper/90">
              {HERO.body}
            </p>
            <div data-hero-in data-hero-fade style={HIDDEN} className="mt-9 flex flex-wrap items-center gap-6">
              <Magnetic>
                <PillLink href="/contact" variant="gold">
                  Let&apos;s start dreaming
                </PillLink>
              </Magnetic>
              <button type="button" onClick={() => setStory(true)} className="group flex min-h-12 items-center gap-3 text-paper">
                <span className="relative grid size-12 place-items-center rounded-full border border-paper/60 transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-paper/30 [animation-duration:2.4s]" />
                  <Play aria-hidden className="ml-0.5 size-4 fill-current" />
                </span>
                <span className="micro text-left leading-snug">
                  Watch
                  <br />
                  our story
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Vertical side note */}
        <p data-hero-side data-hero-in style={HIDDEN} className="absolute right-[var(--gutter)] top-1/2 z-10 hidden -translate-y-1/2 font-serif text-xl italic text-paper/85 [writing-mode:vertical-rl] lg:block">
          {HERO.side}
        </p>

        {/* Scroll captions — they land at different heights on the calm left side */}
        {HERO.captions.map((c, i) => (
          <p
            key={c}
            data-caption={i}
            style={HIDDEN}
            className={cn(
              "pointer-events-none absolute inset-x-[var(--gutter)] bottom-[15svh] z-10 font-serif italic text-paper md:inset-x-auto md:left-[var(--gutter)]",
              i < 2 && "text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.02] md:max-w-[30rem]",
              i === 0 && "md:bottom-[18svh]",
              i === 1 && "md:bottom-auto md:top-[26svh]",
              i === 2 && "text-[clamp(3.2rem,8vw,8.6rem)] leading-[0.9] md:bottom-auto md:top-1/2 md:-translate-y-1/2",
            )}
          >
            {i === 2 ? (
              <>
                From hot mess <br />
                to <span className="text-gold">mega success.</span>
              </>
            ) : (
              c
            )}
          </p>
        ))}

        {/* Trust strip */}
        <div data-hero-trust className="absolute bottom-5 left-0 z-10 w-full md:bottom-7">
          <div className="container-x flex items-end justify-between gap-6">
            <ul data-hero-in style={HIDDEN} className="flex max-w-full gap-6 overflow-x-auto rounded-full border border-paper/25 bg-ink/40 px-5 py-3 text-paper backdrop-blur-md no-scrollbar md:gap-8 md:px-6">
              {TRUST.map((t) => {
                const Icon = TRUST_ICONS[t.icon];
                return (
                  <li key={t.title} className="flex shrink-0 items-center gap-2.5">
                    <Icon aria-hidden className="size-4 text-gold" strokeWidth={1.5} />
                    <span className="text-xs leading-tight">
                      <span className="block font-medium">{t.title}</span>
                      <span className="block opacity-80">{t.sub}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="hidden shrink-0 items-center gap-3 text-paper md:flex" aria-hidden>
              <span className="micro">Scroll</span>
              <span className="block h-px w-24 bg-paper/25">
                <span data-hero-progress className="block h-full origin-left scale-x-0 bg-gold" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
