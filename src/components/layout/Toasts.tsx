"use client";

import Image from "next/image";
import { Check, Info, X } from "lucide-react";
import { useUI } from "@/store/ui";

export function Toasts() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismiss);
  const setBoard = useUI((s) => s.setBoard);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[170] flex flex-col items-center gap-2 px-4" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto flex w-full max-w-[26rem] items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-2 text-paper shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)] animate-[toast-in_0.7s_var(--ease-expo)]">
          <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-paper/10">
            {t.image ? <Image src={t.image} alt="" fill sizes="44px" className="object-cover" /> : t.tone === "success" ? <Check className="size-4 text-gold" /> : <Info className="size-4 text-gold" />}
          </span>
          <div className="min-w-0 flex-1">
            <span className="block text-sm font-medium">{t.title}</span>
            {t.body && <span className="block truncate text-xs opacity-75">{t.body}</span>}
          </div>
          {t.tone === "success" && (
            <button
              type="button"
              onClick={() => {
                setBoard(true);
                dismiss(t.id);
              }}
              className="micro min-h-10 shrink-0 rounded-full bg-gold px-4 text-ink"
            >
              View board
            </button>
          )}
          <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(t.id)} className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-paper/10">
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
