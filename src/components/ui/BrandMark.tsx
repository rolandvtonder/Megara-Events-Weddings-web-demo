import { cn } from "@/lib/utils";

/** The Megara diamond monogram, redrawn as SVG from the original logo so it stays crisp and recolourable. */
export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="40 8 218 212" className={cn("block", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <g fill="none" stroke="currentColor" strokeWidth="5">
        <path d="M148 14 L232 98 L148 182 L64 98 Z" />
        <path d="M151 44 L237 130 L151 216 L65 130 Z" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="3.4">
        <path d="M43 98 L52 89 L61 98 L52 107 Z" />
        <path d="M236 130 L245 121 L254 130 L245 139 Z" />
      </g>
      <path d="M128 142 V96 L144.5 134 L161 96 V142" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

export function BrandMark({ className, tagline = true, size = "md" }: { className?: string; tagline?: boolean; size?: "sm" | "md" | "lg" }) {
  const mark = size === "lg" ? "size-16" : size === "sm" ? "size-9" : "size-11";
  const word = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-[1.35rem]";
  return (
    <span className={cn("group/brand inline-flex items-center gap-3 leading-none", className)}>
      <Monogram className={cn(mark, "shrink-0 transition-transform duration-700 ease-expo group-hover/brand:rotate-90")} />
      <span className="flex flex-col">
        <span className={cn("font-display tracking-[0.28em]", word)}>MEGARA</span>
        {tagline && <span className="micro mt-1.5 text-[0.5625rem] tracking-[0.32em] opacity-80">Events &amp; Weddings</span>}
      </span>
    </span>
  );
}
