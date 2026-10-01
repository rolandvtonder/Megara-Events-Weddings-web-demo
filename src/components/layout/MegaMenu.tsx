"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { CATEGORY_LABEL, GALLERIES, type PortfolioCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const FEATURES = [
  { title: "Weddings", sub: "Winelands, destination & everything in between", image: "julia-sander-10", href: "/portfolio?category=wedding", tint: "#E45E4C" },
  { title: "Brand experiences", sub: "Activations that excite & trend", image: "amazon-10", href: "/portfolio?category=brand", tint: "#E8BB5C" },
];

const COLS: PortfolioCategory[] = ["wedding", "celebration", "brand"];

type Props = { open: boolean; onEnter: () => void; onLeave: () => void; onNavigate: () => void };

/** Portfolio mega menu: every gallery by category, plus two feature tiles. */
export function MegaMenu({ open, onEnter, onLeave, onNavigate }: Props) {
  return (
    <div
      id="mega-menu"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      inert={!open}
      className={cn(
        "absolute inset-x-0 top-full hidden overflow-hidden bg-paper text-ink shadow-[0_50px_80px_-50px_rgba(43,35,33,0.45)] transition-[clip-path,opacity] duration-700 ease-expo lg:block",
        open ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]",
      )}
    >
      <div className="container-x grid grid-cols-12 gap-8 border-t border-line py-10">
        {COLS.map((cat, ci) => (
          <div key={cat} className="col-span-2">
            <p className="eyebrow mb-5 text-mute">{CATEGORY_LABEL[cat]}</p>
            <ul className="space-y-2">
              {GALLERIES.filter((g) => g.category === cat).map((g, li) => (
                <li
                  key={g.slug}
                  style={{ transitionDelay: open ? `${80 + (ci * 5 + li) * 28}ms` : "0ms" }}
                  className={cn("transition-all duration-700 ease-expo", open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}
                >
                  <Link href={`/portfolio/${g.slug}`} onClick={onNavigate} className="font-serif text-[1.45rem] leading-tight transition-colors duration-300 hover:text-coral-deep">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-6 grid grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <Link
              key={f.title}
              href={f.href}
              onClick={onNavigate}
              style={{ transitionDelay: open ? `${160 + i * 90}ms` : "0ms" }}
              className={cn("group relative block aspect-[4/3.2] overflow-hidden rounded-[6px] transition-all duration-700 ease-expo", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}
            >
              <Img id={f.image} alt="" sizes="25vw" className="transition-transform duration-[1400ms] ease-expo group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-paper">
                <span>
                  <span className="block font-serif text-3xl leading-none">{f.title}</span>
                  <span className="mt-2 block text-sm opacity-85">{f.sub}</span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full text-ink transition-transform duration-500 ease-expo group-hover:rotate-45" style={{ backgroundColor: f.tint }}>
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
