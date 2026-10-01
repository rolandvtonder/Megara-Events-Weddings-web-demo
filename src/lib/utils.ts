import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Wraps `v` into the half-open range [min, max). */
export function wrap(v: number, min: number, max: number) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}

export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
