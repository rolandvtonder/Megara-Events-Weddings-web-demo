"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useRef, useState } from "react";
import { WEDDING_PACKAGES } from "@/data/services";
import { Img } from "@/components/ui/Img";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn, pad, prefersReducedMotion } from "@/lib/utils";
import { useBoard } from "@/store/enquiry";
import { useUI } from "@/store/ui";

const GUESTS = ["Under 50", "50 – 120", "120+"];
const CONFETTI = ["#E45E4C", "#E8BB5C", "#D2E5E7", "#D98C86", "#4F8A8B", "#F6DCD3"];

function burst(origin: HTMLElement) {
  if (prefersReducedMotion()) return;
  const host = origin.parentElement;
  if (!host) return;
  const hostRect = host.getBoundingClientRect();
  const r = origin.getBoundingClientRect();
  const cx = r.left - hostRect.left + r.width * 0.5;
  const cy = r.top - hostRect.top + r.height * 0.5;
  for (let i = 0; i < 26; i++) {
    const bit = document.createElement("span");
    const size = 5 + Math.random() * 7;
    // Confetti in the shape of the logo's little diamonds and petals.
    bit.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;background:${CONFETTI[i % CONFETTI.length]};border-radius:${Math.random() > 0.5 ? "999px 0" : "1px"};pointer-events:none;z-index:30;transform:rotate(45deg)`;
    host.appendChild(bit);
    const angle = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 120;
    gsap
      .timeline({ onComplete: () => bit.remove() })
      .to(bit, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 40, rotate: Math.random() * 540, duration: 0.7, ease: "power3.out" })
      .to(bit, { y: `+=${80 + Math.random() * 80}`, autoAlpha: 0, duration: 0.8, ease: "power1.in" }, ">-0.1");
  }
}

/** "Choose your package": browse the four wedding packages and add one to the enquiry board. */
export function PackagePicker() {
  const [active, setActive] = useState(0);
  const [guests, setGuests] = useState(GUESTS[1]);
  const root = useRef<HTMLElement>(null);
  const prev = useRef(0);
  const pill = useRef<HTMLButtonElement>(null);
  const add = useBoard((s) => s.add);
  const pkg = WEDDING_PACKAGES[active];
  const added = useBoard((s) => s.items.some((i) => i.id === pkg.id));
  const toast = useUI((s) => s.toast);
  const N = WEDDING_PACKAGES.length;

  const go = (i: number) => setActive(((i % N) + N) % N);

  useGSAP(
    () => {
      const from = prev.current;
      if (from === active) return;
      let dir = active > from ? 1 : -1;
      if (from === N - 1 && active === 0) dir = 1;
      if (from === 0 && active === N - 1) dir = -1;
      const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      const reduce = prefersReducedMotion();

      gsap.to(frames[from], { xPercent: -20 * dir, rotate: -4 * dir, autoAlpha: 0, filter: "blur(10px)", duration: reduce ? 0.2 : 0.85, ease: "power3.inOut" });
      gsap.fromTo(
        frames[active],
        { xPercent: 24 * dir, rotate: 5 * dir, autoAlpha: 0, filter: "blur(10px)" },
        { xPercent: 0, rotate: 0, autoAlpha: 1, filter: "blur(0px)", duration: reduce ? 0.2 : 1.2, ease: "expo.out", delay: reduce ? 0 : 0.18 },
      );
      gsap.to(words[from], { autoAlpha: 0, xPercent: -12 * dir, duration: 0.8, ease: "power3.inOut" });
      gsap.fromTo(words[active], { autoAlpha: 0, xPercent: 12 * dir }, { autoAlpha: 1, xPercent: 0, duration: 1.3, ease: "expo.out", delay: 0.1 });
      gsap.to("[data-orbit]", { rotate: `+=${38 * dir}`, duration: 1.4, ease: "expo.out" });
      if (!reduce) gsap.from("[data-info] > *", { y: 26, autoAlpha: 0, duration: 0.9, ease: "expo.out", stagger: 0.045 });
      prev.current = active;
    },
    { dependencies: [active], scope: root },
  );

  const addPackage = () => {
    add({ id: pkg.id, kind: "service", title: pkg.title, meta: `${pkg.kicker} · ${guests} guests`, image: pkg.image, href: pkg.href });
    toast({ title: "Added to your enquiry board", body: `${pkg.title} · ${guests} guests`, image: `/images/${pkg.image}.webp`, tone: "success" });
    if (pill.current) burst(pill.current);
  };

  return (
    <section ref={root} aria-labelledby="package-title" className="relative overflow-hidden py-20 transition-colors duration-1000 md:py-28" style={{ backgroundColor: pkg.tint }}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-6">
        {/* Thumbnails */}
        <div className="flex flex-col lg:col-span-2">
          <p className="font-hand text-[2.6rem] leading-none text-ink/85">
            Choose your package
            <svg aria-hidden viewBox="0 0 60 50" className="ml-6 mt-1 block h-10 w-12 text-ink/70">
              <path d="M8 4 C 30 8, 40 22, 22 36 M22 36 l2 -9 M22 36 l8 -3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </p>
          <div role="tablist" aria-label="Wedding packages" className="mt-2 flex gap-3 lg:flex-col lg:gap-4">
            {WEDDING_PACKAGES.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={i === active}
                aria-controls="package-panel"
                aria-label={p.title}
                onClick={() => go(i)}
                className={cn(
                  "relative aspect-[3/4] w-16 overflow-hidden rounded-[6px] bg-paper/70 transition-all duration-700 ease-expo sm:w-20 md:w-24",
                  i === active ? "scale-100 opacity-100 ring-2 ring-ink ring-offset-2" : "scale-[0.92] opacity-60 hover:opacity-90",
                )}
                style={{ ["--tw-ring-offset-color" as string]: pkg.tint }}
              >
                <Img id={p.image} alt="" sizes="100px" />
              </button>
            ))}
          </div>
          <p className="mt-auto hidden pt-12 font-hand text-[2rem] leading-none text-ink/80 -rotate-6 lg:block">Tailored, always</p>
        </div>

        {/* Stage */}
        <div className="relative lg:col-span-5" data-py="-30">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] lg:max-w-none">
            <svg data-orbit aria-hidden viewBox="0 0 400 400" className="absolute left-1/2 top-1/2 w-[112%] -translate-x-1/2 -translate-y-1/2 text-ink/25">
              <circle cx="200" cy="200" r="196" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="620 612" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" />
              <rect x="195" y="-1" width="10" height="10" transform="rotate(45 200 4)" fill="#E45E4C" />
            </svg>
            {WEDDING_PACKAGES.map((p, i) => (
              <p
                key={p.id}
                data-word
                aria-hidden
                style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
                className="pointer-events-none absolute left-1/2 top-[8%] z-0 -translate-x-1/2 whitespace-nowrap font-serif text-[clamp(4rem,11vw,10rem)] italic leading-none text-ink/10"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
            ))}
            {WEDDING_PACKAGES.map((p, i) => (
              <div key={p.id} data-frame className="absolute inset-[6%] overflow-hidden rounded-t-full rounded-b-[10px] shadow-[0_40px_70px_-30px_rgba(43,35,33,0.5)]" style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}>
                <Img id={p.image} alt={`${p.title} — a Megara wedding`} sizes="(min-width:1024px) 34vw, 90vw" eager />
              </div>
            ))}
            <button type="button" aria-label="Previous package" onClick={() => go(active - 1)} className="absolute left-0 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/85 shadow-lg backdrop-blur transition-transform hover:scale-110">
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button type="button" aria-label="Next package" onClick={() => go(active + 1)} className="absolute right-0 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/85 shadow-lg backdrop-blur transition-transform hover:scale-110">
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div id="package-panel" role="tabpanel" aria-labelledby="package-title" className="lg:col-span-5 lg:pl-8" data-py="25">
          <div data-info className="flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <p className="micro text-ink/75">
                Package {pad(active + 1)} / {pad(N)}
              </p>
              <Link href="/weddings#packages" className="group micro inline-flex min-h-11 items-center gap-1.5 text-ink/75 hover:text-ink">
                Compare all <ArrowRight aria-hidden className="size-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <h2 id="package-title" className="mt-3 font-serif text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[0.92]">
              {pkg.title}
            </h2>
            <p className="mt-3 font-hand text-4xl text-coral-deep">{pkg.kicker}</p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">{pkg.summary}</p>
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {pkg.includes.slice(0, 6).map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-ink-2">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-paper/80">
                    <Check aria-hidden className="size-3" strokeWidth={2} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <p className="micro mt-8 text-ink/75" id="guest-label">
              Roughly how many guests?
            </p>
            <div role="radiogroup" aria-labelledby="guest-label" className="mt-3 flex flex-wrap gap-2">
              {GUESTS.map((g) => (
                <button
                  key={g}
                  type="button"
                  role="radio"
                  aria-checked={guests === g}
                  onClick={() => setGuests(g)}
                  className={cn("min-h-11 rounded-full border px-5 text-sm transition-all duration-300", guests === g ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink")}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="relative mt-9 flex flex-wrap items-center gap-6">
              <button
                ref={pill}
                type="button"
                onClick={addPackage}
                className="group relative flex h-16 -rotate-[6deg] items-center gap-4 rounded-full bg-ink pl-8 pr-2 text-paper transition-transform duration-500 ease-back hover:-rotate-[3deg] hover:scale-[1.03] active:scale-95"
                style={{ boxShadow: "0 18px 40px -12px rgba(178,63,44,0.55)" }}
              >
                <span className="micro text-xs tracking-[0.2em]">{added ? "On your board ✓" : "Add to my enquiry"}</span>
                <span className={cn("grid size-12 place-items-center rounded-full text-ink transition-transform duration-700 ease-expo group-hover:rotate-[-45deg]", added ? "bg-gold" : "bg-paper")}>
                  {added ? <Heart aria-hidden className="size-5 fill-coral text-coral" /> : <ArrowRight aria-hidden className="size-5" />}
                </span>
              </button>
              <Link href={pkg.href} className="u-link text-sm text-ink/80 hover:text-ink">
                Read more about this package
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
