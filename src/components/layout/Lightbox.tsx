"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Img } from "@/components/ui/Img";
import { cn, pad } from "@/lib/utils";
import { useUI } from "@/store/ui";

/** Full-screen gallery viewer: arrow keys, swipe, Escape, and visible prev/next/close buttons. */
export function Lightbox() {
  const lb = useUI((s) => s.lightbox);
  const setIndex = useUI((s) => s.setLightboxIndex);
  const close = useUI((s) => s.closeLightbox);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);
  const open = lb !== null;

  useEffect(() => {
    if (!lb) return;
    closeBtn.current?.focus({ preventScroll: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIndex(lb.index + 1);
      if (e.key === "ArrowLeft") setIndex(lb.index - 1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [lb, close, setIndex]);

  const current = lb?.images[lb.index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      inert={!open}
      className={cn("fixed inset-0 z-[150] bg-ink/95 text-paper transition-opacity duration-500", open ? "opacity-100" : "pointer-events-none opacity-0")}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null || !lb) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 50) setIndex(lb.index + (dx < 0 ? 1 : -1));
      }}
    >
      {lb && current && (
        <>
          <div className="absolute inset-x-4 bottom-24 top-20 md:inset-x-24">
            <Img key={current.id} id={current.id} alt={current.alt} sizes="90vw" fit="contain" eager className="animate-[toast-in_0.6s_var(--ease-expo)]" />
          </div>
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 md:px-8">
            <p className="micro tabular-nums" aria-live="polite">
              {pad(lb.index + 1)} / {pad(lb.images.length)}
            </p>
            <button ref={closeBtn} type="button" onClick={close} aria-label="Close photo viewer" className="grid size-12 place-items-center rounded-full bg-paper text-ink">
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>
          <button type="button" aria-label="Previous photo" onClick={() => setIndex(lb.index - 1)} className="absolute bottom-6 left-5 grid size-12 place-items-center rounded-full border border-paper/40 hover:bg-paper hover:text-ink md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2">
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => setIndex(lb.index + 1)} className="absolute bottom-6 right-5 grid size-12 place-items-center rounded-full border border-paper/40 hover:bg-paper hover:text-ink md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2">
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
          <p className="absolute inset-x-20 bottom-9 text-center text-sm text-paper/75">{current.alt}</p>
        </>
      )}
    </div>
  );
}
