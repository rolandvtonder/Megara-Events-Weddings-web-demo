"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/data/services";
import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { GhostText } from "@/components/ui/ScrollFX";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { cn, pad, prefersReducedMotion } from "@/lib/utils";

/**
 * "How we work": an expanding accordion gallery whose monochrome strips bloom into colour.
 * Auto-advances while in view; pauses on hover/focus and for reduced motion.
 */
export function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || prefersReducedMotion()) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % PROCESS.length), 4600);
    return () => window.clearInterval(id);
  }, [inView, paused]);

  return (
    <section ref={root} data-bg="#E6F0F1" aria-labelledby="process-title" className="relative isolate overflow-hidden py-24 md:py-32">
      <GhostText text="How we work" className="top-4" speed={12} />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-px="4">
            <Eyebrow color="var(--color-teal)" className="text-ink/75">
              Experienced team · We deliver
            </Eyebrow>
            <h2 id="process-title" className="mt-4 font-serif text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95]">
              <SplitReveal as="span" className="block">
                Listen, understand — <em className="text-coral-deep">then</em> act
              </SplitReveal>
            </h2>
          </div>
          <ArrowLink href="/contact">Start with a free consult</ArrowLink>
        </div>

        <div
          className="mt-12 flex flex-col gap-2 md:h-[min(68vh,620px)] md:flex-row md:gap-3"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {PROCESS.map((o, i) => {
            const on = i === active;
            return (
              <article
                key={o.title}
                onPointerEnter={() => setActive(i)}
                className={cn("group relative overflow-hidden rounded-[6px] bg-sand transition-[flex-grow,height] duration-[900ms] ease-expo", on ? "h-[28rem] md:h-auto md:grow-[7]" : "h-16 md:h-auto md:grow")}
                style={{ flexBasis: 0 }}
              >
                <div className={cn("absolute inset-0 transition-[filter,transform] duration-[1200ms] ease-expo", on ? "scale-100 grayscale-0" : "scale-110 grayscale")}>
                  <Img id={o.image} alt="" sizes="(min-width:768px) 60vw, 100vw" />
                </div>
                <div className={cn("absolute inset-0 transition-colors duration-700", on ? "bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" : "bg-ink/50")} />

                <span aria-hidden className={cn("pointer-events-none absolute right-5 top-3 font-display text-[clamp(4rem,9vw,8rem)] leading-none transition-all duration-1000 ease-expo", on ? "translate-y-0 opacity-90" : "translate-y-8 opacity-0")} style={{ color: o.accent }}>
                  {pad(i + 1)}
                </span>

                {/* The whole strip is a button so keyboard users can open each step. */}
                <button type="button" onClick={() => setActive(i)} onFocus={() => setActive(i)} aria-expanded={on} className="absolute inset-0 z-10 text-left">
                  <span className="micro absolute left-4 top-4 text-paper">{pad(i + 1)}</span>
                  <span className={cn("micro absolute bottom-5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-paper transition-opacity duration-500 [writing-mode:vertical-rl] md:block", on ? "opacity-0" : "rotate-180 opacity-100")}>{o.title}</span>
                  <span className={cn("micro absolute right-4 top-1/2 -translate-y-1/2 text-paper transition-opacity md:hidden", on ? "opacity-0" : "opacity-100")}>{o.title}</span>
                  <span className="sr-only">{on ? "" : `Show step: ${o.title}`}</span>
                </button>

                <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 text-paper transition-all duration-700 ease-expo md:p-8", on ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-0")}>
                  <span className="micro inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-ink" style={{ backgroundColor: o.accent }}>
                    {o.kicker}
                  </span>
                  <h3 className="mt-4 font-serif text-[clamp(2.2rem,3.6vw,3.6rem)] leading-[0.95]">{o.title}</h3>
                  <p className="mt-3 max-w-md text-paper/90">{o.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
