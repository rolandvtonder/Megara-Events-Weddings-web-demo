"use client";

import { Expand } from "lucide-react";
import { galleryAlt, type Gallery } from "@/data/portfolio";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/SplitReveal";
import { imageSize } from "@/lib/images";
import { useUI } from "@/store/ui";

/** Masonry gallery; every photo opens the full-screen lightbox. */
export function GalleryGrid({ g }: { g: Gallery }) {
  const open = useUI((s) => s.openLightbox);
  const images = g.images.map((id, i) => ({ id, alt: galleryAlt(g, i) }));

  return (
    <Reveal className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4" stagger={0.04}>
      {images.map((img, i) => {
        const s = imageSize(img.id);
        return (
          <button
            key={img.id}
            type="button"
            onClick={() => open(images, i)}
            data-cursor="view"
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-[6px] bg-sand"
            style={{ aspectRatio: `${s.w} / ${s.h}` }}
          >
            <Img id={img.id} alt={img.alt} sizes="(min-width:1024px) 31vw, (min-width:640px) 47vw, 92vw" className="transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]" />
            <span aria-hidden className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-paper/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand className="size-4" strokeWidth={1.5} />
            </span>
          </button>
        );
      })}
    </Reveal>
  );
}
