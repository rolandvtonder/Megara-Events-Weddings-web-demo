"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { ANNOUNCEMENTS, CONTACT } from "@/data/site";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Item = (typeof ANNOUNCEMENTS)[number];

function Message({ item, short }: { item: Item; short?: boolean }) {
  const text = short ? item.short : item.text;
  if ("href" in item && item.href) {
    return (
      <Link href={item.href} className="truncate rounded-full bg-gold px-3 py-1 text-ink transition-colors hover:bg-paper">
        {text}
      </Link>
    );
  }
  return <span className="truncate">{text}</span>;
}

export function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % ANNOUNCEMENTS.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative z-10 h-[var(--ann-h)] bg-ink text-paper">
      <div className="container-x flex h-full items-center justify-between gap-4">
        <span className="hidden w-48 2xl:block" />
        {/* Desktop: all messages */}
        <p className="micro hidden items-center gap-5 whitespace-nowrap 2xl:flex">
          {ANNOUNCEMENTS.map((a, idx) => (
            <span key={a.text} className="inline-flex items-center gap-5">
              {idx > 0 && <span aria-hidden className="size-1 rotate-45 bg-gold" />}
              <Message item={a} />
            </span>
          ))}
        </p>
        {/* Mobile: rotating single message */}
        <div className="micro relative h-6 flex-1 overflow-hidden whitespace-nowrap 2xl:hidden">
          {ANNOUNCEMENTS.map((a, idx) => (
            <span
              key={a.text}
              aria-hidden={idx !== i}
              className={cn(
                "absolute inset-0 flex items-center transition-all duration-700 ease-expo",
                idx === i ? "translate-y-0 opacity-100" : idx < i ? "pointer-events-none -translate-y-full opacity-0" : "pointer-events-none translate-y-full opacity-0",
              )}
            >
              <Message item={a} short />
            </span>
          ))}
        </div>
        <a href={CONTACT.phoneHref} className="micro flex shrink-0 items-center justify-end gap-2 whitespace-nowrap 2xl:w-48 opacity-85 transition-opacity hover:opacity-100">
          <Phone aria-hidden className="size-3" strokeWidth={1.5} />
          <span className="hidden sm:inline">{CONTACT.phone}</span>
          <span className="sm:hidden">Call us</span>
        </a>
      </div>
    </div>
  );
}
