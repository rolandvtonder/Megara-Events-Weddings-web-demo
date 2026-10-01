"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import { PillLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { GhostText } from "@/components/ui/ScrollFX";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Draggable, gsap, useGSAP } from "@/lib/gsap";
import { pad } from "@/lib/utils";

const CARDS = TESTIMONIALS.slice(0, 5);
const TILT = [0, -6, 5, -3, 4];

const EXPLORE = [
  { label: "Weddings", href: "/weddings" },
  { label: "Corporate & brand events", href: "/events" },
  { label: "Private parties", href: "/events#private-parties" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Journal", href: "/blog" },
];

/** A draggable stack of testimonial cards — flick one away to read the next. */
function Deck() {
  const [order, setOrder] = useState(() => CARDS.map((_, i) => i));
  const cards = useRef<(HTMLElement | null)[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    order.forEach((idx, pos) => {
      const el = cards.current[idx];
      if (!el) return;
      gsap.to(el, { x: pos * 14, y: pos * -14, rotate: TILT[pos % TILT.length], scale: 1 - pos * 0.05, zIndex: 20 - pos, autoAlpha: pos > 3 ? 0 : 1, duration: first.current ? 0 : 0.9, ease: "expo.out" });
      el.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
    });
    first.current = false;
  }, [order]);

  const fly = (dir: -1 | 1) => {
    if (busy.current) return;
    const el = cards.current[order[0]];
    if (!el) return;
    busy.current = true;
    gsap.to(el, {
      x: dir * 620,
      y: "+=60",
      rotate: dir * 26,
      autoAlpha: 0,
      duration: 0.55,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(el, { x: 0, y: 0, rotate: 0 });
        busy.current = false;
        setOrder((o) => [...o.slice(1), o[0]]);
      },
    });
  };

  const back = () => {
    if (busy.current) return;
    const el = cards.current[order[order.length - 1]];
    if (!el) return;
    busy.current = true;
    gsap.fromTo(el, { x: -620, rotate: -26, autoAlpha: 0, zIndex: 30 }, { x: 0, rotate: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out", onComplete: () => void (busy.current = false) });
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  };

  // Only the top card is draggable.
  useGSAP(
    () => {
      const el = cards.current[order[0]];
      if (!el) return;
      const [d] = Draggable.create(el, {
        type: "x,y",
        zIndexBoost: false,
        onDrag() {
          gsap.set(this.target, { rotate: this.x * 0.05 });
        },
        onRelease() {
          if (Math.abs(this.x) > 110) fly(this.x > 0 ? 1 : -1);
          else gsap.to(this.target, { x: 0, y: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1, 0.6)" });
        },
      });
      return () => d.kill();
    },
    { dependencies: [order], scope: wrap },
  );

  return (
    <div className="flex flex-col items-center">
      <p className="micro mb-6 text-ink/60">Drag to read the next note</p>
      <div ref={wrap} data-cursor="drag" className="relative aspect-[3/4] w-[min(78vw,22rem)] md:w-[24rem]" aria-live="polite">
        {CARDS.map((c, i) => (
          <figure
            key={c.name}
            ref={(n) => {
              cards.current[i] = n;
            }}
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[8px] bg-paper shadow-[0_40px_60px_-30px_rgba(43,35,33,0.55)]"
            style={{ zIndex: 20 - i }}
          >
            <div className="relative h-[42%] shrink-0 bg-sand">
              <Img id={c.image} alt="" sizes="(min-width:768px) 24rem, 78vw" className="pointer-events-none" />
              <span className="absolute -bottom-6 left-6 grid size-12 place-items-center rounded-full bg-coral-deep text-paper">
                <Quote aria-hidden className="size-5 fill-current" strokeWidth={0} />
              </span>
            </div>
            <blockquote className="flex flex-1 flex-col justify-between p-6 pt-9">
              <p className="font-serif text-[1.45rem] leading-snug">“{c.quote}”</p>
              <figcaption className="mt-4">
                <span className="block font-medium">{c.name}</span>
                <span className="micro mt-1 block text-mute">{c.occasion}</span>
              </figcaption>
            </blockquote>
          </figure>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-4">
        <button type="button" aria-label="Previous note" onClick={back} className="grid size-12 place-items-center rounded-full border border-ink/25 hover:bg-ink hover:text-paper">
          <ChevronLeft className="size-4" strokeWidth={1.5} />
        </button>
        <span className="micro w-14 text-center tabular-nums">
          {pad(order[0] + 1)} / {pad(CARDS.length)}
        </span>
        <button type="button" aria-label="Next note" onClick={() => fly(-1)} className="grid size-12 place-items-center rounded-full border border-ink/25 hover:bg-ink hover:text-paper">
          <ChevronRight className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export function LoveNotes() {
  return (
    <section data-bg="#FBF7F5" aria-labelledby="love-title" className="relative isolate overflow-hidden py-24 md:py-36">
      <GhostText text="Love notes" className="bottom-8" speed={-14} />
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4" data-px="-3">
          <span className="micro inline-flex rounded-full border border-ink/30 px-4 py-2">Overheard</span>
          <h2 id="love-title" className="relative isolate mt-6 font-display text-[clamp(3.6rem,8vw,7.6rem)] uppercase leading-[0.86]">
            <span aria-hidden className="absolute left-[0.04em] top-[0.04em] -z-10 text-blush">
              Love
              <br />
              notes
            </span>
            <SplitReveal as="span" className="block">
              Love
              <br />
              notes
            </SplitReveal>
          </h2>
          <PillLink href="/reviews" variant="ink" className="mt-8">
            Read them all
          </PillLink>
          <h3 className="mt-14 font-serif text-3xl">Client & service first</h3>
          <p className="mt-3 max-w-sm leading-relaxed text-ink-2">
            Meg&apos;s approach is client and service first, managing each occasion with passion — backed by an incredible team, network and stakeholders who bring every event to life.
          </p>
        </div>

        <div className="lg:col-span-4" data-py="-40">
          <Deck />
        </div>

        <div className="lg:col-span-3 lg:col-start-10" data-py="40">
          <h3 className="font-serif text-3xl">Explore Megara</h3>
          <ul className="mt-6 border-t border-line">
            {EXPLORE.map((r, i) => (
              <li key={r.href} className="border-b border-line">
                <Link href={r.href} className="group flex min-h-14 items-center justify-between py-4">
                  <span className="flex items-center gap-3">
                    <span className="micro text-mute">{pad(i + 1)}</span>
                    <span className="text-lg transition-transform duration-500 ease-expo group-hover:translate-x-1.5">{r.label}</span>
                  </span>
                  <span className="grid size-8 scale-0 place-items-center rounded-full bg-ink text-paper transition-all duration-500 ease-expo group-hover:scale-100 group-focus-visible:scale-100">
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
