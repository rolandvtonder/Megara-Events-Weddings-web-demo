"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { PILLARS } from "@/data/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { GhostText } from "@/components/ui/ScrollFX";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** Six ways to work together, as arches that relax into windows as you scroll past. */
export function Pillars() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-pillar]", { y: 90, autoAlpha: 0, duration: 1.4, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: "[data-pillar-grid]", start: "top 85%", once: true } });
      // Images drift inside their arches…
      gsap.fromTo("[data-pillar-img]", { yPercent: -6, scale: 1.18 }, { yPercent: 6, scale: 1.06, ease: "none", scrollTrigger: { trigger: "[data-pillar-grid]", start: "top bottom", end: "bottom top", scrub: true } });
      // …and the arches relax into windows as the row leaves.
      gsap.to("[data-arch]", { "--arch": 0.07, ease: "none", scrollTrigger: { trigger: "[data-pillar-grid]", start: "top 30%", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" data-bg="#FBF7F5" aria-labelledby="pillars-title" className="relative isolate overflow-hidden py-24 md:py-36">
      <GhostText text="Weddings & events" className="top-6" speed={12} />
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8" data-px="-4">
            <Eyebrow className="text-ink/75">How we can help</Eyebrow>
            <h2 id="pillars-title" className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
              <SplitReveal as="span" className="font-display text-[clamp(3.4rem,9vw,8.8rem)] uppercase leading-[0.86]">
                Work with us
              </SplitReveal>
              <SplitReveal as="span" delay={0.25} className="pb-[0.6vw] font-serif text-[clamp(1.8rem,3.2vw,3rem)] italic leading-none text-coral-deep">
                your way
              </SplitReveal>
            </h2>
          </div>
          <p data-px="3" className="max-w-sm text-lg leading-relaxed text-ink-2 lg:col-span-4">
            We provide a tailored solution — never a one-size-fits-all answer — to the most important parts of your special day.
          </p>
        </div>

        <div data-pillar-grid className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:mt-20 lg:grid-cols-6 lg:gap-x-5">
          {PILLARS.map((m, i) => (
            <Link key={m.title} href={m.href} data-pillar className="group block">
              <div data-arch data-py={i % 2 ? 60 : -20} className="arch relative aspect-[2/3] bg-blush">
                <div data-pillar-img className="absolute inset-0 will-change-transform">
                  <Img id={m.image} alt={m.alt} sizes="(min-width:1024px) 16vw, (min-width:640px) 30vw, 46vw" className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.07]" />
                </div>
                <span aria-hidden className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-100" style={{ backgroundColor: m.tint }} />
                <span className="absolute bottom-3 right-3 grid size-10 translate-y-3 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </div>
              <p className="mt-4 text-center font-serif text-2xl leading-tight transition-colors duration-300 group-hover:text-coral-deep">{m.title}</p>
              <p className="micro mt-1.5 flex items-center justify-center gap-2 text-center text-mute">
                <span aria-hidden className="size-1.5 rotate-45 transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: m.tint }} />
                {m.sub}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
