"use client";

import Link from "next/link";
import { ArrowUpRight, Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { CHAPTERS } from "@/data/home";
import { cn, pad } from "@/lib/utils";
import { useUI } from "@/store/ui";

const DURATION = 5200;

/** "Watch our story" — a story-style film in stills with Ken Burns motion. */
export function StoryModal() {
  const open = useUI((s) => s.storyOpen);
  const setStory = useUI((s) => s.setStory);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const n = CHAPTERS.length;

  const close = () => {
    setStory(false);
    setI(0);
    setPaused(false);
  };
  const next = () => setI((v) => (v + 1) % n);
  const prev = () => setI((v) => (v - 1 + n) % n);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus({ preventScroll: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStory(false);
        setI(0);
      }
      if (e.key === "ArrowRight") setI((v) => (v + 1) % n);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + n) % n);
      if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, n, setStory]);

  const chapter = CHAPTERS[i];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Megara — our story in stills"
      inert={!open}
      className={cn("fixed inset-0 z-[160] bg-ink text-paper transition-opacity duration-700", open ? "opacity-100" : "pointer-events-none opacity-0")}
    >
      {open &&
        CHAPTERS.map((c, idx) => (
          <div key={c.title} className={cn("absolute inset-0 overflow-hidden transition-opacity duration-1000", idx === i ? "opacity-100" : "opacity-0")}>
            <div key={idx === i ? `on-${i}` : "off"} className={cn("absolute inset-0", idx === i && "animate-[kenburns_7s_linear_forwards]")}>
              <Img id={c.image} alt={c.alt} sizes="100vw" eager />
            </div>
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${c.tint}CC 0%, ${c.tint}33 45%, transparent 75%)`, mixBlendMode: "multiply" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/45" />
          </div>
        ))}

      <div className="absolute inset-x-0 top-0 z-10 flex gap-1.5 px-5 pt-5 md:px-10">
        {CHAPTERS.map((c, idx) => (
          <button key={c.title} type="button" aria-label={`Chapter ${idx + 1}: ${c.title}`} onClick={() => setI(idx)} className="h-6 flex-1">
            <span className="block h-[2px] overflow-hidden rounded-full bg-paper/25">
              {idx < i && <span className="block h-full w-full bg-paper" />}
              {idx === i && open && (
                <span
                  key={`bar-${i}`}
                  onAnimationEnd={next}
                  className="block h-full w-full origin-left bg-paper"
                  style={{ animation: `film-progress ${DURATION}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="absolute inset-x-0 top-12 z-10 flex items-center justify-between px-5 md:px-10">
        <span className="micro">Megara — a story in stills</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play" : "Pause"} className="grid size-11 place-items-center rounded-full bg-paper/15 backdrop-blur hover:bg-paper/25">
            {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
          <button ref={closeBtn} type="button" onClick={close} aria-label="Close story" className="grid size-11 place-items-center rounded-full bg-paper text-ink">
            <X className="size-4" />
          </button>
        </div>
      </div>

      <button type="button" aria-label="Previous chapter" onClick={prev} className="absolute inset-y-0 left-0 z-[5] w-1/3" />
      <button type="button" aria-label="Next chapter" onClick={next} className="absolute inset-y-0 right-0 z-[5] w-1/3" />

      <div key={`cap-${i}`} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-10 md:px-10 md:pb-14">
        <p className="micro animate-[toast-in_0.9s_var(--ease-expo)]">
          {pad(i + 1)} / {pad(n)} — {chapter.kind}
        </p>
        <h3 className="mt-3 font-serif text-[15vw] leading-[0.85] animate-[toast-in_1.1s_var(--ease-expo)] md:text-[8vw]">{chapter.title}</h3>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <span className="opacity-85">{chapter.place}</span>
          <Link href={`/portfolio/${chapter.gallery}`} onClick={close} className="micro pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-ink">
            View the celebration <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
