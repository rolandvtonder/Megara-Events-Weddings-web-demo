import Image from "next/image";
import type { CSSProperties } from "react";
import { imageSrc } from "@/lib/images";
import { cn } from "@/lib/utils";

type ImgProps = {
  id: string;
  alt: string;
  sizes?: string;
  className?: string;
  /** Loads immediately with high fetch priority — use for the LCP image only. */
  priority?: boolean;
  /** Loads immediately without raising priority (off-screen layers that animate in). */
  eager?: boolean;
  fit?: "cover" | "contain";
  position?: string;
  style?: CSSProperties;
};

/** Fills its (relatively positioned) parent with /images/<id>.webp. */
export function Img({ id, alt, sizes = "100vw", className, priority, eager, fit = "cover", position, style }: ImgProps) {
  return (
    <Image
      src={imageSrc(id)}
      alt={alt}
      fill
      sizes={sizes}
      draggable={false}
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", "select-none", className)}
      style={position ? { objectPosition: position, ...style } : style}
    />
  );
}
