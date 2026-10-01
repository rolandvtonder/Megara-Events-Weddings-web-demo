"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState } from "react";
import { isEmail, submitForm } from "@/lib/submit";
import { cn } from "@/lib/utils";

/** Email capture for the free itinerary worksheet. */
export function Newsletter({ tone = "light", resource = "The Ultimate Wedding Itinerary Worksheet" }: { tone?: "light" | "dark"; resource?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "sending" | "done" | "failed">("idle");
  const dark = tone === "dark";

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (!isEmail(email)) return setState("error");
        setState("sending");
        try {
          await submitForm(`Free download request: ${resource}`, { Email: email, Resource: resource });
          setState("done");
        } catch {
          setState("failed");
        }
      }}
      className="w-full"
    >
      <label htmlFor={`${id}-email`} className="micro mb-2 block opacity-80">
        Email address
      </label>
      <div className={cn("flex items-center gap-2 border-b pb-2 transition-colors", state === "error" ? "border-coral" : dark ? "border-paper/35 focus-within:border-paper" : "border-ink/30 focus-within:border-ink")}>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          disabled={state === "done"}
          aria-invalid={state === "error"}
          aria-describedby={`${id}-msg`}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@example.com"
          className="min-h-11 min-w-0 flex-1 bg-transparent py-2 text-base outline-none"
        />
        <button
          type="submit"
          disabled={state === "done" || state === "sending"}
          className={cn(
            "micro inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-5 transition-colors duration-300 disabled:opacity-80",
            state === "done" ? "bg-teal text-paper" : dark ? "bg-gold text-ink hover:bg-paper" : "bg-ink text-paper hover:bg-coral-deep",
          )}
        >
          {state === "done" ? (
            <>
              <Check aria-hidden className="size-3.5" /> On its way
            </>
          ) : state === "sending" ? (
            "Sending…"
          ) : (
            <>
              Send it <ArrowRight aria-hidden className="size-3.5" />
            </>
          )}
        </button>
      </div>
      <p id={`${id}-msg`} aria-live="polite" className={cn("mt-2 min-h-5 text-sm", state === "error" || state === "failed" ? (dark ? "text-gold" : "text-coral-deep") : "opacity-75")}>
        {state === "error" && "That email doesn't look quite right — please check it."}
        {state === "failed" && "Something went wrong sending that. Please try again, or email us directly."}
        {state === "done" && "Thank you! Your free download is on its way ✦"}
      </p>
    </form>
  );
}
