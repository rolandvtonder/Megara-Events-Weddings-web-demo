"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/data/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { PillLink } from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useBoard } from "@/store/enquiry";
import { useUI } from "@/store/ui";
import { AnnouncementBar } from "./AnnouncementBar";
import { MegaMenu } from "./MegaMenu";

function useHeaderState(pathname: string) {
  const [s, setS] = useState({ scrolled: false, hidden: false, overlay: pathname === "/" });

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const hero = document.getElementById("hero");
      // Transparent header only while the home hero sits behind it.
      const overlay = pathname === "/" && !!hero && hero.getBoundingClientRect().bottom > 90;
      const down = y > lastY + 2;
      const up = y < lastY - 2;
      lastY = y;
      setS((prev) => {
        const hidden = y > 520 && !overlay ? (down ? true : up ? false : prev.hidden) : false;
        const next = { scrolled: y > 12, hidden, overlay };
        return next.scrolled === prev.scrolled && next.hidden === prev.hidden && next.overlay === prev.overlay ? prev : next;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return s;
}

function CountBadge({ count }: { count: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(count);
  useEffect(() => {
    if (count > prev.current && ref.current) gsap.fromTo(ref.current, { scale: 0.4 }, { scale: 1, duration: 0.8, ease: "elastic.out(1.2, 0.4)" });
    prev.current = count;
  }, [count]);
  if (!count) return null;
  return (
    <span ref={ref} aria-hidden className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[0.625rem] font-semibold text-paper">
      {count}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { scrolled, hidden, overlay } = useHeaderState(pathname);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef<number>(0);
  const boardCount = useBoard((s) => s.items.length);
  const setBoard = useUI((s) => s.setBoard);
  const setSearch = useUI((s) => s.setSearch);
  const setMenu = useUI((s) => s.setMenu);
  const introDone = useUI((s) => s.introDone);

  const light = overlay && !mega;

  // "/" or ⌘K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === "Escape") setMega(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearch]);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  };

  return (
    <header
      onMouseLeave={scheduleClose}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-expo",
        hidden ? "-translate-y-full" : scrolled ? "-translate-y-[var(--ann-h)]" : "translate-y-0",
        pathname === "/" && !introDone && "pointer-events-none opacity-0",
      )}
    >
      <AnnouncementBar />
      <div
        className={cn(
          "relative transition-[background-color,color,box-shadow,backdrop-filter] duration-500",
          light ? "bg-transparent text-paper" : "bg-paper/92 text-ink shadow-[0_1px_0_rgba(43,35,33,0.08)] backdrop-blur-xl",
        )}
      >
        {light && <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/50 to-transparent" />}
        <nav aria-label="Main" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
          <div className="flex items-center gap-2 xl:w-[260px]">
            <button type="button" aria-label="Open menu" onClick={() => setMenu(true)} className="-ml-2 grid size-11 place-items-center lg:hidden">
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
            <Link href="/" aria-label="Megara Events & Weddings — home" className="shrink-0">
              <BrandMark size="sm" />
            </Link>
          </div>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.label} onMouseEnter={item.mega ? openMega : () => setMega(false)}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={item.mega ? mega : undefined}
                    aria-controls={item.mega ? "mega-menu" : undefined}
                    onFocus={item.mega ? openMega : () => setMega(false)}
                    className="group relative block px-3.5 py-3 text-[0.9375rem] tracking-wide"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-1/2 top-1 size-1.5 -translate-x-1/2 rotate-45 bg-coral transition-all duration-500 ease-expo",
                        active ? "opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                      )}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-end gap-1 sm:gap-2 xl:w-[260px]">
            <button type="button" aria-label="Search the site" aria-keyshortcuts="/" onClick={() => setSearch(true)} className="grid size-11 place-items-center">
              <Search className="size-[1.15rem]" strokeWidth={1.5} />
            </button>
            <button type="button" aria-label={`Your enquiry board (${boardCount} saved)`} onClick={() => setBoard(true)} className="relative grid size-11 place-items-center">
              <Heart className="size-[1.15rem]" strokeWidth={1.5} />
              <CountBadge count={boardCount} />
            </button>
            {/* Wrapped so `hidden` isn't fighting the pill's own inline-flex. */}
            <span className="ml-1 hidden sm:block">
              <PillLink href="/contact" variant={light ? "light" : "coral"} size="sm" icon="none">
                Let&apos;s chat
              </PillLink>
            </span>
          </div>
        </nav>
        <MegaMenu open={mega} onEnter={openMega} onLeave={scheduleClose} onNavigate={() => setMega(false)} />
      </div>
    </header>
  );
}
