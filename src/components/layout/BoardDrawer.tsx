"use client";

import Link from "next/link";
import { Heart, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Img } from "@/components/ui/Img";
import { PillLink } from "@/components/ui/Button";
import { ALL_SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";
import { useBoard } from "@/store/enquiry";
import { useUI } from "@/store/ui";

/**
 * The enquiry board replaces a shopping bag: visitors collect the services they're interested in
 * and the celebrations that inspire them, then carry the whole board into the contact form.
 */
export function BoardDrawer() {
  const open = useUI((s) => s.boardOpen);
  const setBoard = useUI((s) => s.setBoard);
  const items = useBoard((s) => s.items);
  const remove = useBoard((s) => s.remove);
  const add = useBoard((s) => s.add);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const close = () => setBoard(false);

  const services = items.filter((i) => i.kind === "service");
  const inspiration = items.filter((i) => i.kind === "inspiration");
  const suggestions = ALL_SERVICES.filter((s) => !items.some((i) => i.id === s.id)).slice(0, 2);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus({ preventScroll: true });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setBoard(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, setBoard]);

  const group = (title: string, list: typeof items) =>
    list.length ? (
      <div className="py-5">
        <p className="eyebrow mb-4 text-mute">{title}</p>
        <ul className="space-y-4">
          {list.map((i) => (
            <li key={i.id} className="flex items-center gap-4">
              <Link href={i.href ?? "/contact"} onClick={close} className="relative block h-20 w-16 shrink-0 overflow-hidden rounded-[4px] bg-blush">
                <Img id={i.image} alt="" sizes="80px" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={i.href ?? "/contact"} onClick={close} className="block font-serif text-xl leading-tight">
                  {i.title}
                </Link>
                {i.meta && <p className="mt-1 truncate text-sm text-mute">{i.meta}</p>}
              </div>
              <button type="button" onClick={() => remove(i.id)} aria-label={`Remove ${i.title}`} className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 hover:border-ink">
                <X className="size-4" strokeWidth={1.5} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <div className={cn("fixed inset-0 z-[90]", open ? "pointer-events-auto" : "pointer-events-none")} inert={!open}>
      <div onClick={close} className={cn("absolute inset-0 bg-ink/45 backdrop-blur-[3px] transition-opacity duration-500", open ? "opacity-100" : "opacity-0")} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="board-title"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-paper transition-[transform,box-shadow] duration-[800ms] ease-expo",
          open ? "translate-x-0 shadow-2xl" : "translate-x-full shadow-none",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id="board-title" className="font-serif text-3xl">
            Your enquiry board <sup className="ml-1 font-sans text-xs font-semibold text-coral-deep">{items.length}</sup>
          </h2>
          <button ref={closeBtn} type="button" aria-label="Close enquiry board" onClick={close} className="grid size-11 place-items-center rounded-full transition-colors hover:bg-ink hover:text-paper">
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="relative mb-8 h-24 w-40" aria-hidden>
                <span className="absolute left-4 top-4 size-16 rotate-45 bg-coral/80 mix-blend-multiply" />
                <span className="absolute left-14 top-0 size-16 rotate-45 bg-gold/80 mix-blend-multiply" />
                <span className="absolute left-24 top-6 size-16 rotate-45 bg-mist mix-blend-multiply" />
              </div>
              <p className="font-serif text-3xl">Nothing saved yet</p>
              <p className="mt-2 max-w-xs text-ink-2">
                Tap the <Heart aria-label="heart" className="inline size-4 align-[-2px]" strokeWidth={1.5} /> on any service or celebration you love — then bring your board to a consultation.
              </p>
              <PillLink href="/portfolio" onClick={close} className="mt-8" variant="ink">
                Browse the portfolio
              </PillLink>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {group("Services I'm interested in", services)}
              {group("Celebrations I love", inspiration)}
              {suggestions.length > 0 && (
                <div className="py-6">
                  <p className="eyebrow mb-4 text-mute">You might also like</p>
                  <div className="grid grid-cols-2 gap-3">
                    {suggestions.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => add({ id: s.id, kind: "service", title: s.title, meta: s.kicker, image: s.image, href: s.href })}
                        className="group rounded-[6px] bg-paper-2 p-2 text-left"
                      >
                        <span className="relative block aspect-[4/5] overflow-hidden rounded-[4px]">
                          <Img id={s.image} alt="" sizes="200px" className="transition-transform duration-700 group-hover:scale-105" />
                        </span>
                        <span className="mt-2 block font-serif text-lg leading-tight">{s.title}</span>
                        <span className="micro mt-1 block text-coral-deep">+ Add to board</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line bg-paper px-6 pb-6 pt-5">
            <p className="text-ink-2">We&apos;ll bring your board to your complimentary consultation.</p>
            <PillLink href="/contact" onClick={close} className="mt-4 w-full">
              Send my enquiry
            </PillLink>
            <button type="button" onClick={close} className="u-link mx-auto mt-3 block py-2 text-sm text-mute hover:text-ink">
              Keep exploring
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
