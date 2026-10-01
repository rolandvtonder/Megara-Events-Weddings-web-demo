"use client";

import { Heart } from "lucide-react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { imageSrc } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useBoard, type BoardItem } from "@/store/enquiry";
import { useUI } from "@/store/ui";

/** Heart that saves a service or celebration to the visitor's enquiry board. */
export function SaveButton({ item, className, tone = "light", large }: { item: BoardItem; className?: string; tone?: "light" | "ghost"; large?: boolean }) {
  const on = useBoard((s) => s.items.some((i) => i.id === item.id));
  const toggle = useBoard((s) => s.toggle);
  const toast = useUI((s) => s.toast);
  const icon = useRef<SVGSVGElement>(null);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${item.title} from your enquiry board` : `Save ${item.title} to your enquiry board`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const now = toggle(item);
        if (icon.current) gsap.fromTo(icon.current, { scale: 0.55 }, { scale: 1, duration: 0.7, ease: "back.out(4)" });
        toast({ title: now ? "Saved to your enquiry board" : "Removed from your board", body: item.title, image: now ? imageSrc(item.image) : undefined, tone: now ? "success" : "info" });
      }}
      className={cn(
        "grid place-items-center rounded-full transition-colors duration-300",
        large ? "size-12" : "size-11",
        tone === "light" ? "bg-paper/90 text-ink backdrop-blur-sm hover:bg-paper" : "border border-current/25 hover:border-current",
        className,
      )}
    >
      <Heart ref={icon} className={cn("size-4 transition-colors", on && "fill-coral text-coral")} strokeWidth={1.5} />
    </button>
  );
}
