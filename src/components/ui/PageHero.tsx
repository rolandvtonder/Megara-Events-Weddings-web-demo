"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: ReactNode;
  image: string;
  imageAlt: string;
  position?: string;
  bg?: string;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
};

/**
 * Shared hero for inner pages: heavy Bodoni caps + a Cormorant italic accent, then a
 * full-width photograph that opens from an arch into a window as you scroll.
 */
export function PageHero({ eyebrow, title, accent, intro, image, imageAlt, position, bg = "#FBF7F5", crumbs, children }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-hero-frame]", { clipPath: "inset(14% 18% 0% 18% round 999px 999px 8px 8px)", duration: 1.8, ease: "expo.out", delay: 0.2 });
      gsap.from("[data-hero-img]", { scale: 1.25, duration: 2.4, ease: "expo.out", delay: 0.2 });
      gsap.from("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: 1.2, ease: "expo.out", stagger: 0.08, delay: 0.35 });
      gsap.to("[data-hero-img]", { yPercent: 10, ease: "none", scrollTrigger: { trigger: "[data-hero-frame]", start: "top top+=100", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-bg={bg} className="pt-[calc(var(--ann-h)+var(--nav-h)+2.5rem)] md:pt-[calc(var(--ann-h)+var(--nav-h)+4.5rem)]">
      <div className="container-x">
        {crumbs && (
          <nav aria-label="Breadcrumb" data-hero-fade className="micro mb-6 flex flex-wrap items-center gap-2 text-ink/60">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div data-hero-fade>
          <Eyebrow className="text-ink/75">{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-1">
          <SplitReveal as="span" play className="font-display text-[clamp(3rem,10vw,10rem)] uppercase leading-[0.86] tracking-[-0.01em]">
            {title}
          </SplitReveal>
          <SplitReveal as="span" play delay={0.25} className="pb-[0.8vw] font-serif text-[clamp(2.2rem,6vw,6rem)] italic leading-none text-coral-deep">
            {accent}
          </SplitReveal>
        </h1>
        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12">
          <div data-hero-fade className="text-lg leading-relaxed text-ink-2 md:col-span-6 md:col-start-7">
            {intro}
          </div>
          {children && (
            <div data-hero-fade className="md:col-span-6 md:col-start-7">
              {children}
            </div>
          )}
        </div>
      </div>
      <div className="container-x mt-12 md:mt-16">
        <div data-hero-frame className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-blush sm:aspect-[16/10] md:aspect-[16/7]">
          <div data-hero-img className="absolute inset-0 will-change-transform">
            <Img id={image} alt={imageAlt} sizes="100vw" priority position={position} />
          </div>
        </div>
      </div>
    </section>
  );
}
