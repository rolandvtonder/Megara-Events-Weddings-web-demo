import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_LABEL, type Gallery } from "@/data/portfolio";
import { Img } from "@/components/ui/Img";
import { SaveButton } from "@/components/ui/SaveButton";
import { cn } from "@/lib/utils";

/** Portfolio card: hover zoom + brand-tint wash, category pill and a save-to-board heart. */
export function PortfolioCard({ g, className, sizes = "(min-width:1280px) 30vw, (min-width:768px) 45vw, 90vw", priority, tall }: { g: Gallery; className?: string; sizes?: string; priority?: boolean; tall?: boolean }) {
  return (
    <article className={cn("group/card relative flex flex-col", className)}>
      <div className={cn("relative overflow-hidden rounded-[6px] bg-sand", tall ? "aspect-[3/4]" : "aspect-[4/5]")}>
        <Link href={`/portfolio/${g.slug}`} data-cursor="view" className="absolute inset-0" aria-label={`${g.title} — ${g.meta}`}>
          <Img id={g.cover} alt="" sizes={sizes} priority={priority} className="transition-transform duration-[1400ms] ease-expo group-hover/card:scale-[1.06]" />
          <span aria-hidden className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover/card:opacity-70" style={{ backgroundColor: g.tint }} />
          <span aria-hidden className="absolute bottom-3 right-3 grid size-11 translate-y-3 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 ease-expo group-hover/card:translate-y-0 group-hover/card:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
        <span className="micro pointer-events-none absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1.5 text-ink">{CATEGORY_LABEL[g.category]}</span>
        <SaveButton item={{ id: `g-${g.slug}`, kind: "inspiration", title: g.title, meta: g.meta, image: g.cover, href: `/portfolio/${g.slug}` }} className="absolute right-3 top-3" />
      </div>
      <div className="mt-4">
        <Link href={`/portfolio/${g.slug}`} className="font-serif text-[1.9rem] leading-tight">
          <span className="u-link">{g.title}</span>
        </Link>
        <p className="mt-1 text-mute">{g.meta}</p>
      </div>
    </article>
  );
}
