"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Img } from "@/components/ui/Img";
import { GALLERIES } from "@/data/portfolio";
import { POSTS } from "@/data/posts";
import { RESOURCES } from "@/data/resources";
import { ALL_SERVICES } from "@/data/services";
import { SEARCH_SUGGESTIONS } from "@/data/site";
import { cn } from "@/lib/utils";
import { useUI } from "@/store/ui";

type Entry = { title: string; kind: string; href: string; image: string; text: string };

// One flat index across services, galleries, journal posts and resources.
const INDEX: Entry[] = [
  ...ALL_SERVICES.map((s) => ({ title: s.title, kind: "Service", href: s.href, image: s.image, text: `${s.kicker} ${s.summary} ${s.includes.join(" ")}` })),
  ...GALLERIES.map((g) => ({ title: g.title, kind: "Portfolio", href: `/portfolio/${g.slug}`, image: g.cover, text: `${g.meta} ${g.intro} ${g.location} ${g.category} ${g.credits.map((c) => c.name).join(" ")}` })),
  ...POSTS.map((p) => ({ title: p.title, kind: "Journal", href: `/blog/${p.slug}`, image: p.image, text: `${p.excerpt} ${p.category}` })),
  ...RESOURCES.map((r) => ({ title: r.title, kind: "Free download", href: "/resources", image: r.image, text: `${r.kicker} ${r.body} checklist` })),
  { title: "Meet Meg", kind: "Page", href: "/about", image: "meg-portrait", text: "about founder story team planner" },
  { title: "Love notes", kind: "Page", href: "/reviews", image: "stacey-steve-14", text: "reviews testimonials clients" },
  { title: "Book a consultation", kind: "Page", href: "/contact", image: "meg-phone", text: "contact enquiry email phone" },
];

export function SearchOverlay() {
  const open = useUI((s) => s.searchOpen);
  const setSearch = useUI((s) => s.setSearch);
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => input.current?.focus(), 250);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSearch(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", esc);
    };
  }, [open, setSearch]);

  const results = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return INDEX.filter((e) => {
      const h = `${e.title} ${e.kind} ${e.text}`.toLowerCase();
      return terms.every((t) => h.includes(t));
    });
  }, [q]);

  const popular = INDEX.filter((e) => ["complete-coordination", "destination"].some((id) => e.href.includes(id)) || ["Stacey + Steve", "Woolworths"].includes(e.title));
  const list = q.trim() ? results : popular;
  const close = () => setSearch(false);

  return (
    <div className={cn("fixed inset-0 z-[95]", open ? "pointer-events-auto" : "pointer-events-none")} inert={!open}>
      <div onClick={close} className={cn("absolute inset-0 bg-ink/40 backdrop-blur-[3px] transition-opacity duration-500", open ? "opacity-100" : "opacity-0")} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={cn("absolute inset-x-0 top-0 max-h-[90vh] overflow-y-auto bg-paper transition-[transform,box-shadow] duration-[800ms] ease-expo", open ? "translate-y-0 shadow-2xl" : "-translate-y-full shadow-none")}
        data-lenis-prevent
      >
        <div className="container-x pb-12 pt-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-mute">Search Megara</p>
            <button type="button" onClick={close} aria-label="Close search" className="grid size-11 place-items-center rounded-full transition-colors hover:bg-ink hover:text-paper">
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (results[0]) {
                setSearch(false);
                router.push(results[0].href);
              }
            }}
            className="mt-4 flex items-center gap-4 border-b-2 border-ink pb-3"
          >
            <Search aria-hidden className="size-7 shrink-0" strokeWidth={1.25} />
            <label htmlFor="site-search" className="sr-only">
              Search services, portfolio and journal
            </label>
            <input
              ref={input}
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “winelands” or “birthday”"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent font-serif text-4xl outline-none md:text-6xl"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} className="micro min-h-11 shrink-0 px-2 text-mute hover:text-ink">
                Clear
              </button>
            )}
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="micro mr-2 text-mute">Popular</span>
            {SEARCH_SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => setQ(s)} className="min-h-10 rounded-full border border-ink/20 px-4 py-1.5 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                {s}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <p className="eyebrow mb-5 text-mute" aria-live="polite">
              {q.trim() ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "Where to start"}
            </p>
            {q.trim() && results.length === 0 ? (
              <p className="font-serif text-3xl text-ink/75">Nothing for “{q}” yet — try “wedding”, “flowers” or “brand”.</p>
            ) : (
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {list.slice(0, 12).map((e) => (
                  <li key={e.href + e.title}>
                    <Link href={e.href} onClick={close} className="group block">
                      <span className="relative block aspect-[4/5] overflow-hidden rounded-[6px] bg-blush">
                        <Img id={e.image} alt="" sizes="(min-width:1280px) 16vw, (min-width:640px) 30vw, 45vw" className="transition-transform duration-700 ease-expo group-hover:scale-105" />
                        <span className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-paper opacity-0 transition-opacity group-hover:opacity-100">
                          <ArrowUpRight aria-hidden className="size-4" />
                        </span>
                      </span>
                      <span className="micro mt-3 block text-coral-deep">{e.kind}</span>
                      <span className="mt-1 block font-serif text-xl leading-tight">{e.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
