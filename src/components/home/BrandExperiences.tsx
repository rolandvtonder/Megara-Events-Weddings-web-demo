"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORY_LABEL, GALLERIES } from "@/data/portfolio";
import { CLIENTS } from "@/data/services";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { Rail } from "@/components/ui/Rail";
import { SaveButton } from "@/components/ui/SaveButton";
import { GhostText } from "@/components/ui/ScrollFX";
import { SilkCanvas } from "@/components/ui/SilkCanvas";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { WaveEdge } from "@/components/ui/WaveEdge";
import { cn, prefersReducedMotion } from "@/lib/utils";

const DARK_SILK: [string, string, string, string] = ["#0F2224", "#1E3A3C", "#8A3A2C", "#C99A45"];
const FEATURES = [
  { id: "woolworths-activation", alt: "A red Woolworths personalisation pop-up in a mall atrium" },
  { id: "amazon-10", alt: "Salsa dancers performing at a Havana-themed corporate event" },
  { id: "ucook-04", alt: "UCOOK chefs serving at a branded tasting counter" },
];
const STORIES = GALLERIES.filter((g) => g.category !== "wedding");

function FeatureSlideshow() {
  const [i, setI] = useState(0);
  const n = FEATURES.length;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), 4800);
    return () => window.clearInterval(id);
  }, [n]);

  return (
    <Link href="/events" data-cursor="view" className="group relative block aspect-[4/5] overflow-hidden rounded-[6px] bg-teal">
      {FEATURES.map((f, idx) => (
        <div key={f.id} className={cn("absolute inset-0 transition-[opacity,transform] duration-[1600ms] ease-expo", idx === i ? "scale-100 opacity-100" : "scale-110 opacity-0")}>
          <Img id={f.id} alt={f.alt} sizes="(min-width:1024px) 32vw, 90vw" eager={idx === 0} />
        </div>
      ))}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
        <span className="font-serif text-[2.1rem] leading-[1] text-paper">
          Explore events
          <br />& activations
        </span>
        <span className="grid size-12 place-items-center rounded-full bg-paper text-ink transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-gold">
          <ArrowUpRight aria-hidden className="size-5" />
        </span>
      </span>
      <span className="absolute left-6 top-6 flex gap-1.5" aria-hidden>
        {FEATURES.map((f, idx) => (
          <span key={f.id} className={cn("h-[3px] rounded-full bg-paper transition-all duration-700", idx === i ? "w-8 opacity-100" : "w-3 opacity-40")} />
        ))}
      </span>
    </Link>
  );
}

/** Dark, silk-backed section for corporate events, activations and private parties. */
export function BrandExperiences() {
  return (
    <section aria-labelledby="brand-title" className="relative isolate overflow-hidden bg-teal-deep text-paper">
      <SilkCanvas palette={DARK_SILK} brightness={0.7} speed={0.5} scale={1.7} resolution={0.5} className="absolute inset-0 -z-10 opacity-80" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-deep/40 via-teal-deep/10 to-teal-deep/70" />
      <WaveEdge position="top" height={130} />
      <WaveEdge position="bottom" height={130} seed={2} />
      <GhostText text="Brand experiences" className="top-1/2 -translate-y-1/2" speed={14} tone="light" />

      <div className="container-x relative z-20 grid gap-12 py-40 lg:grid-cols-12 lg:gap-14 lg:py-52">
        <div className="lg:col-span-4" data-py="-50">
          <FeatureSlideshow />
        </div>
        <div className="min-w-0 lg:col-span-8">
          <Rail
            tone="dark"
            label="Events and brand experiences"
            slideClassName="flex-[0_0_70%] sm:flex-[0_0_44%] lg:flex-[0_0_34%]"
            renderControls={(controls) => (
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow color="var(--color-gold)" className="text-paper/80">
                    Corporate · Activations · Parties
                  </Eyebrow>
                  <h2 id="brand-title" className="mt-4 font-serif text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[0.95]">
                    <SplitReveal as="span" className="block">
                      Events your guests will <em className="text-gold">never</em> want to leave
                    </SplitReveal>
                  </h2>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-paper/80">
                    We integrate design with the finest in catering, entertainment, production, furniture and styling — so your brand shines and your guests talk about it for weeks.
                  </p>
                </div>
                <div className="hidden md:block">{controls}</div>
              </div>
            )}
          >
            {STORIES.map((g) => (
              <article key={g.slug} className="group/card relative flex h-full flex-col rounded-[6px] bg-paper p-2 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <Link href={`/portfolio/${g.slug}`} data-cursor="view" className="relative block aspect-[4/5] overflow-hidden rounded-[4px] bg-sand">
                  <Img id={g.cover} alt={`${g.title} — ${g.meta}`} sizes="(min-width: 1024px) 20vw, 60vw" className="transition-transform duration-[1400ms] ease-expo group-hover/card:scale-[1.06]" />
                  <span className="micro absolute left-2.5 top-2.5 rounded-full bg-paper/90 px-3 py-1.5">{CATEGORY_LABEL[g.category]}</span>
                </Link>
                <SaveButton item={{ id: `g-${g.slug}`, kind: "inspiration", title: g.title, meta: g.meta, image: g.cover, href: `/portfolio/${g.slug}` }} className="absolute right-4 top-4" />
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <Link href={`/portfolio/${g.slug}`} className="font-serif text-2xl leading-tight">
                    {g.title}
                  </Link>
                  <p className="mt-1 text-sm text-mute">{g.meta}</p>
                </div>
              </article>
            ))}
          </Rail>

          <div className="mt-16">
            <p className="micro text-paper/70">As trusted by</p>
            <ul className="mt-5 flex flex-wrap items-center gap-3">
              {CLIENTS.map((c) => (
                <li key={c.name} className="relative h-14 w-32 overflow-hidden rounded-[6px] bg-paper/95 p-2.5">
                  <span className="relative block size-full">
                    <Img id={c.logo} alt={c.name} sizes="128px" fit="contain" className="grayscale" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
