import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase kicker led by a tiny diamond — the logo's motif. */
export function Eyebrow({ children, className, color = "var(--color-coral)" }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-3", className)}>
      <span aria-hidden className="size-1.5 rotate-45" style={{ backgroundColor: color }} />
      {children}
    </p>
  );
}
