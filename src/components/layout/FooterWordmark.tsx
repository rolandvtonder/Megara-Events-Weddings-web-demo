"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const LETTERS = "MEGARA".split("");
const HUES = ["#E45E4C", "#E8BB5C", "#4F8A8B", "#D98C86", "#E45E4C", "#E8BB5C"];

/** Full-bleed masthead. Letters rise in on scroll and each catches a brand colour on hover. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(gsap.utils.toArray<HTMLElement>("[data-letter]"), {
        yPercent: 105,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
      });
      ScrollTrigger.refresh();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className="relative z-10 mt-20 select-none overflow-hidden px-[2vw] lg:mt-28">
      <div data-px="-2" className="flex justify-between font-display text-[22vw] leading-[0.8] tracking-[-0.02em] text-ink">
        {LETTERS.map((l, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.02em]">
            <span data-letter className="inline-block transition-colors duration-500 hover:[color:var(--hue)]" style={{ ["--hue" as string]: HUES[i % HUES.length] }}>
              {l}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
