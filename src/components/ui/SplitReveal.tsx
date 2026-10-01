"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  type?: "lines" | "words" | "chars";
  /** When provided, the reveal is driven by this flag instead of scroll position. */
  play?: boolean;
  id?: string;
};

/** Masked line/word/char reveal powered by GSAP SplitText. */
export function SplitReveal({ as: Tag = "div", children, className, delay = 0, stagger = 0.09, start = "top 88%", type = "lines", play, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) {
        if (el) gsap.set(el, { autoAlpha: 1 });
        return;
      }
      if (play === false) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });
      SplitText.create(el, {
        type: type === "lines" ? "lines" : type === "words" ? "lines,words" : "lines,words,chars",
        mask: type === "lines" ? "lines" : type === "words" ? "words" : "chars",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          const targets = type === "lines" ? self.lines : type === "words" ? self.words : self.chars;
          return gsap.from(targets, {
            yPercent: 115,
            rotate: type === "chars" ? 6 : 0,
            duration: type === "chars" ? 1 : 1.25,
            ease: "expo.out",
            stagger: type === "chars" ? 0.025 : stagger,
            delay,
            scrollTrigger: play === undefined ? { trigger: el, start, once: true } : undefined,
          });
        },
      });
    },
    { dependencies: [play], scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={cn(play === false && "invisible", className)}>
      {children}
    </Tag>
  );
}

/** Fades + lifts the direct children (or `selector` matches) in sequence when scrolled into view. */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  y = 48,
  stagger = 0.08,
  delay = 0,
  start = "top 86%",
  selector,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  selector?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = selector ? el.querySelectorAll(selector) : el.children;
      if (!targets.length) return;
      gsap.from(targets, { y, autoAlpha: 0, duration: 1.2, ease: "expo.out", stagger, delay, scrollTrigger: { trigger: el, start, once: true } });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
