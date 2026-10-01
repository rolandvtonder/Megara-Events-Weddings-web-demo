"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { SIGNATURES } from "@/data/home";
import { CATEGORY_LABEL, galleryBySlug, type Gallery } from "@/data/portfolio";
import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { GhostText } from "@/components/ui/ScrollFX";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { gsap } from "@/lib/gsap";
import { clamp, prefersReducedMotion, wrap } from "@/lib/utils";

const GALLERIES = SIGNATURES.map((s) => galleryBySlug(s)).filter((g): g is Gallery => Boolean(g));

/**
 * A concave, cylinder-mapped carousel (CSS 3D). The camera sits at the centre of the ring,
 * so cards bow towards you at the edges. Drifts on its own; drag, swipe, trackpad or arrows to steer.
 */
export function Signatures() {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const nudge = useRef<(dir: number) => void>(() => {});

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const N = GALLERIES.length;
    const reduce = prefersReducedMotion();

    let cardW = 0;
    let R = 0;
    let step = 0;
    let maxA = 0;
    const measure = () => {
      const W = el.clientWidth;
      const mobile = W < 700;
      cardW = mobile ? W * 0.6 : clamp(W * 0.18, 220, 320);
      R = mobile ? W * 1.25 : Math.max(980, W * 0.82);
      step = (cardW * 1.1) / R;
      maxA = Math.atan((W / 2 + cardW * 0.6) / R);
      el.style.setProperty("--card-w", `${cardW}px`);
      el.style.perspective = `${R}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    let pos = 0;
    let vel = 0;
    let target: number | null = null;
    // Auto-drift stops while the ring has keyboard focus or the pointer rests on it.
    let paused = false;
    const auto = reduce ? 0 : 0.14;

    const render = () => {
      for (let i = 0; i < N; i++) {
        const c = cards.current[i];
        if (!c) continue;
        const d = wrap(i - pos, -N / 2, N / 2);
        const a = d * step;
        if (Math.abs(a) > maxA) {
          c.style.visibility = "hidden";
          continue;
        }
        c.style.visibility = "visible";
        const x = R * Math.sin(a);
        const z = R - R * Math.cos(a);
        c.style.transform = `translate3d(${x.toFixed(2)}px,0,${z.toFixed(2)}px) rotateY(${(-a).toFixed(4)}rad)`;
        c.style.zIndex = String(100 - Math.round(Math.abs(d) * 4));
      }
    };

    // Pointer drag with inertia
    let down = false;
    let dragging = false;
    let startX = 0;
    let lastX = 0;
    let lastT = 0;
    let pointerId = -1;
    const pxPerCard = () => R * step;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      down = true;
      dragging = false;
      startX = lastX = e.clientX;
      lastT = performance.now();
      pointerId = e.pointerId;
      vel = 0;
      target = null;
    };
    const onMove = (e: PointerEvent) => {
      if (!down || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      if (!dragging && Math.abs(e.clientX - startX) > 6) {
        dragging = true;
        el.setPointerCapture(pointerId);
        el.dataset.dragging = "";
      }
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dCards = -dx / pxPerCard();
      pos += dCards;
      vel = vel * 0.6 + (dCards / (dt / 1000)) * 0.4;
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (dragging) {
        vel = clamp(vel, -9, 9);
        el.releasePointerCapture?.(pointerId);
        window.setTimeout(() => delete el.dataset.dragging, 0);
      }
      dragging = false;
    };
    const onClick = (e: MouseEvent) => {
      if (el.dataset.dragging !== undefined) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2) {
        e.preventDefault();
        pos += e.deltaX / pxPerCard();
        vel = 0;
      }
    };
    // Tabbing to a card rotates it to the front.
    const onFocus = (e: FocusEvent) => {
      paused = true;
      const idx = cards.current.indexOf(e.target as HTMLAnchorElement);
      if (idx >= 0) target = pos + wrap(idx - pos, -N / 2, N / 2);
    };
    const onBlur = () => (paused = false);
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    nudge.current = (dir: number) => {
      target = Math.round(pos) + dir;
      vel = 0;
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("focusin", onFocus);
    el.addEventListener("focusout", onBlur);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);

    const tick = (_t: number, dtMs: number) => {
      if (!visible) return;
      const dt = Math.min(dtMs, 64) / 1000;
      if (!dragging) {
        if (target !== null) {
          pos += (target - pos) * Math.min(1, dt * 7);
          if (Math.abs(target - pos) < 0.002) {
            pos = target;
            target = null;
          }
        } else {
          vel *= Math.pow(0.04, dt);
          pos += (vel + (paused ? 0 : auto)) * dt;
        }
      }
      render();
    };
    render();
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("focusin", onFocus);
      el.removeEventListener("focusout", onBlur);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section data-bg="#F3EAE4" aria-labelledby="signatures-title" className="relative isolate overflow-hidden py-24 md:py-32">
      <GhostText text="Celebrations" className="bottom-6" speed={-12} />
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div data-px="-4">
          <Eyebrow color="var(--color-gold)" className="text-ink/75">
            Our portfolio
          </Eyebrow>
          <h2 id="signatures-title" className="mt-4 font-serif text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95]">
            <SplitReveal as="span" className="block">
              Celebrations we&apos;ve <em className="text-coral-deep">loved</em>
            </SplitReveal>
          </h2>
        </div>
        <div className="flex items-center gap-5">
          <ArrowLink href="/portfolio">See the full portfolio</ArrowLink>
          <div className="hidden gap-2 md:flex">
            <button type="button" aria-label="Previous celebration" onClick={() => nudge.current(-1)} className="grid size-12 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper">
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button type="button" aria-label="Next celebration" onClick={() => nudge.current(1)} className="grid size-12 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-paper">
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={stage}
        data-cursor="drag"
        data-skew
        role="region"
        aria-roledescription="carousel"
        aria-label="Celebrations we've loved"
        className="relative mt-12 h-[calc(var(--card-w,240px)*1.5*1.3+2rem)] touch-pan-y select-none md:mt-16"
        style={{ perspectiveOrigin: "50% 50%" }}
      >
        {GALLERIES.map((g, i) => (
          <Link
            key={g.slug}
            ref={(node) => {
              cards.current[i] = node;
            }}
            href={`/portfolio/${g.slug}`}
            draggable={false}
            className="group absolute left-1/2 top-1/2 block aspect-[2/3] w-[var(--card-w,240px)] overflow-hidden rounded-[6px] bg-sand [backface-visibility:hidden] will-change-transform"
            style={{ marginLeft: "calc(var(--card-w,240px) / -2)", marginTop: "calc(var(--card-w,240px) * -0.75)" }}
          >
            <Img id={g.cover} alt="" sizes="(min-width:768px) 22vw, 60vw" className="pointer-events-none transition-transform duration-[1400ms] ease-expo group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <span className="micro absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-ink">{CATEGORY_LABEL[g.category]}</span>
            <span className="absolute inset-x-0 bottom-0 p-4 text-paper md:p-5">
              <span className="block font-serif text-[1.7rem] leading-[1] md:text-[2rem]">{g.title}</span>
              <span className="mt-2 block text-sm opacity-90">{g.meta}</span>
            </span>
          </Link>
        ))}
      </div>
      <p className="micro mt-6 flex items-center justify-center gap-3 text-ink/60" aria-hidden>
        <ArrowLeft className="size-3 animate-[hint_2.4s_ease-in-out_infinite] [animation-direction:reverse]" /> Drag to explore
        <ArrowRight className="size-3 animate-[hint_2.4s_ease-in-out_infinite]" />
      </p>
    </section>
  );
}
