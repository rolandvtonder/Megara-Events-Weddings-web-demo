"use client";

import { useState } from "react";
import { THIS_OR_THAT } from "@/data/about";
import { cn } from "@/lib/utils";

/** "This or That" — pick your side and see whether you and Meg agree. */
export function ThisOrThat() {
  const [picks, setPicks] = useState<Record<number, "a" | "b">>({});
  const answered = Object.keys(picks).length;
  const agree = Object.entries(picks).filter(([i, p]) => THIS_OR_THAT[Number(i)].pick === p).length;

  return (
    <div>
      <ul className="space-y-3">
        {THIS_OR_THAT.map((row, i) => (
          <li key={row.a} role="radiogroup" aria-label={`${row.a} or ${row.b}`} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            {(["a", "b"] as const).map((side, s) => {
              const chosen = picks[i] === side;
              const megs = picks[i] !== undefined && row.pick === side;
              return (
                <button
                  key={side}
                  type="button"
                  role="radio"
                  aria-checked={chosen}
                  onClick={() => setPicks((p) => ({ ...p, [i]: side }))}
                  className={cn(
                    "relative min-h-12 rounded-full border px-4 text-base transition-all duration-300",
                    s === 1 && "order-3",
                    chosen ? "border-ink bg-ink text-paper" : "border-ink/20 bg-paper/60 hover:border-ink",
                  )}
                >
                  {row[side]}
                  {megs && <span className="micro absolute -top-2.5 right-3 rounded-full bg-coral-deep px-2 py-0.5 text-[0.5625rem] text-paper">Meg</span>}
                </button>
              );
            })}
            <span aria-hidden className="order-2 font-hand text-2xl text-mute">or</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 min-h-7 font-serif text-2xl" aria-live="polite">
        {answered === 0 ? "Where do you stand on the super important stuff?" : `You agree with Meg on ${agree} of ${answered}${answered === THIS_OR_THAT.length ? (agree >= 5 ? " — did we just become best friends?" : " — opposites attract!") : "…"}`}
      </p>
    </div>
  );
}
