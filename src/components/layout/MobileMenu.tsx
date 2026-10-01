"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { CONTACT, NAV, SOCIALS } from "@/data/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { PillLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { cn, pad } from "@/lib/utils";
import { useUI } from "@/store/ui";

const EXTRA = [
  { label: "Contact", href: "/contact" },
  { label: "Free resources", href: "/resources" },
];

export function MobileMenu() {
  const open = useUI((s) => s.menuOpen);
  const setMenu = useUI((s) => s.setMenu);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const close = () => setMenu(false);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus({ preventScroll: true });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, setMenu]);

  const items = [{ label: "Home", href: "/" }, ...NAV, ...EXTRA];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      data-lenis-prevent
      className={cn(
        "fixed inset-0 z-[80] overflow-y-auto bg-teal-deep text-paper transition-[clip-path] duration-[900ms] ease-expo lg:hidden",
        open ? "[clip-path:circle(150%_at_2.25rem_4rem)]" : "pointer-events-none [clip-path:circle(0%_at_2.25rem_4rem)]",
      )}
    >
      <div className="flex min-h-full flex-col px-5 pb-8 pt-5">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={close}>
            <BrandMark size="sm" />
          </Link>
          <button ref={closeBtn} type="button" aria-label="Close menu" onClick={close} className="grid size-12 place-items-center rounded-full bg-paper/10">
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-12">
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li
                key={item.label}
                style={{ transitionDelay: open ? `${180 + i * 50}ms` : "0ms" }}
                className={cn("transition-all duration-700 ease-expo", open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")}
              >
                <Link href={item.href} onClick={close} className="flex items-baseline gap-4 py-1.5">
                  <span className="micro text-gold">{pad(i + 1)}</span>
                  <span className="font-serif text-[2.6rem] leading-[1.05]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={cn("mt-10 transition-all delay-500 duration-700 ease-expo", open ? "opacity-100" : "opacity-0")}>
          <PillLink href="/contact" onClick={close} variant="gold">
            Book a consultation
          </PillLink>
        </div>

        <div className="mt-auto flex items-end justify-between gap-6 pt-12">
          <div className="text-sm text-paper/80">
            <a href={`mailto:${CONTACT.enquiries}`} className="block py-1 underline-offset-4 hover:underline">
              {CONTACT.enquiries}
            </a>
            <a href={CONTACT.phoneHref} className="block py-1 underline-offset-4 hover:underline">
              {CONTACT.phone}
            </a>
          </div>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={`Megara on ${s.label}`} className="grid size-11 place-items-center rounded-full bg-paper/10">
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
