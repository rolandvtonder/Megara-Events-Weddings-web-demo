"use client";

import { Check, Heart, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Img } from "@/components/ui/Img";
import { PillButton } from "@/components/ui/Button";
import { ALL_SERVICES } from "@/data/services";
import { CONTACT } from "@/data/site";
import { isEmail, submitForm, type SubmitResult } from "@/lib/submit";
import { cn } from "@/lib/utils";
import { useBoard } from "@/store/enquiry";
import { useUI } from "@/store/ui";

const EVENT_TYPES = ["Wedding", "Destination / multi-day wedding", "Corporate event", "Brand activation", "Private party", "Something else"];
const GUESTS = ["Under 50", "50 – 120", "120 – 200", "200+", "Not sure yet"];

type Fields = { name: string; email: string; phone: string; type: string; date: string; guests: string; location: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  if (!f.email.trim()) e.email = "Please add your email so we can reply.";
  else if (!isEmail(f.email)) e.email = "That email doesn't look quite right — check for typos.";
  if (!f.type) e.type = "Please choose the kind of celebration you're planning.";
  if (f.message.trim().length < 10) e.message = "Tell us a little about your vision (a sentence or two is perfect).";
  return e;
}

const LABELS: Record<keyof Fields, string> = { name: "Your name", email: "Email", phone: "Phone", type: "What are you planning?", date: "Date (or rough timing)", guests: "Guest count", location: "Venue or location", message: "Tell us about your vision" };

function Field({ id, label, required, error, hint, children }: { id: string; label: string; required?: boolean; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="micro block text-ink/80">
        {label} {required ? <span className="text-coral-deep">*</span> : <span className="normal-case tracking-normal text-mute">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-coral-deep">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({ initialService }: { initialService?: string }) {
  const uid = useId();
  const items = useBoard((s) => s.items);
  const remove = useBoard((s) => s.remove);
  const clear = useBoard((s) => s.clear);
  const setBoard = useUI((s) => s.setBoard);
  const svc = ALL_SERVICES.find((s) => s.id === initialService);
  const [f, setF] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    type: svc ? (svc.id === "destination" ? EVENT_TYPES[1] : ["corporate-events", "brand-activations", "private-parties"].includes(svc.id) ? EVENT_TYPES[["corporate-events", "brand-activations", "private-parties"].indexOf(svc.id) + 2] : EVENT_TYPES[0]) : "",
    date: "",
    guests: "",
    location: "",
    message: svc ? `I'm interested in ${svc.title}. ` : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed" | SubmitResult>("idle");
  const summary = useRef<HTMLDivElement>(null);
  // Bumped on every failed submit; focusing in an effect guarantees the summary has rendered.
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (attempt) summary.current?.focus();
  }, [attempt]);

  const id = (k: keyof Fields) => `${uid}-${k}`;
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...f, [k]: e.target.value };
    setF(next);
    // Once a field has been left, keep its error in sync as the visitor fixes it.
    if (touched[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: validate(f)[k] }));
  };
  const describe = (k: keyof Fields, hint?: boolean) => (errors[k] ? `${id(k)}-error` : hint ? `${id(k)}-hint` : undefined);
  const input = (k: keyof Fields) => cn("mt-2 min-h-12 w-full rounded-[6px] border bg-paper px-4 py-3 text-base outline-none transition-colors focus:border-ink", errors[k] ? "border-coral-deep" : "border-ink/20");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    setTouched({ name: true, email: true, type: true, message: true });
    if (Object.keys(errs).length) {
      setAttempt((a) => a + 1);
      return;
    }
    setStatus("sending");
    try {
      const board = items.map((i) => `${i.kind === "service" ? "Service" : "Inspiration"}: ${i.title}${i.meta ? ` (${i.meta})` : ""}`).join("; ");
      const result = await submitForm(`New enquiry: ${f.type} — ${f.name}`, {
        Name: f.name,
        Email: f.email,
        Phone: f.phone,
        "Planning": f.type,
        Date: f.date,
        Guests: f.guests,
        Location: f.location,
        Message: f.message,
        "Enquiry board": board,
      });
      setStatus(result);
      if (result === "sent") clear();
    } catch {
      setStatus("failed");
    }
  };

  const errorList = (Object.keys(errors) as (keyof Fields)[]).filter((k) => errors[k]);

  if (status === "sent" || status === "mailto") {
    return (
      <div className="rounded-[10px] bg-paper p-8 text-center md:p-12" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-teal text-paper">
          <Check aria-hidden className="size-7" />
        </span>
        <h2 className="mt-6 font-serif text-4xl md:text-5xl">{status === "sent" ? "Thank you — we've got it!" : "Almost there!"}</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-2">
          {status === "sent"
            ? "We aim to answer every enquiry within our business hours (Mon–Fri, 9am–4pm). Keep an eye on your inbox."
            : `Your email app should have opened with your enquiry ready to go — just press send. If it didn't, email us at ${CONTACT.enquiries}.`}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="u-link mt-8 text-sm text-mute hover:text-ink">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[10px] bg-paper p-6 shadow-[0_40px_80px_-50px_rgba(43,35,33,0.45)] md:p-10" aria-describedby={`${uid}-req`}>
      {errorList.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="mb-8 rounded-[6px] border border-coral-deep/40 bg-blush p-5 outline-none focus:ring-2 focus:ring-coral-deep">
          <p className="font-medium">Please fix {errorList.length === 1 ? "this" : `these ${errorList.length}`} before sending:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="text-coral-deep underline underline-offset-2">
                  {LABELS[k]}: {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p id={`${uid}-req`} className="mb-6 text-sm text-mute">
        Fields marked <span className="text-coral-deep">*</span> are required.
      </p>

      <fieldset>
        <legend className="font-serif text-2xl">About you</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id={id("name")} label={LABELS.name} required error={errors.name}>
            <input id={id("name")} autoComplete="name" value={f.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={!!errors.name} aria-describedby={describe("name")} className={input("name")} />
          </Field>
          <Field id={id("email")} label={LABELS.email} required error={errors.email}>
            <input id={id("email")} type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set("email")} onBlur={blur("email")} aria-invalid={!!errors.email} aria-describedby={describe("email")} className={input("email")} />
          </Field>
          <Field id={id("phone")} label={LABELS.phone} hint="Happy to chat on WhatsApp too.">
            <input id={id("phone")} type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} aria-describedby={describe("phone", true)} className={input("phone")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="font-serif text-2xl">Your celebration</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id={id("type")} label={LABELS.type} required error={errors.type}>
            <select id={id("type")} value={f.type} onChange={set("type")} onBlur={blur("type")} aria-invalid={!!errors.type} aria-describedby={describe("type")} className={input("type")}>
              <option value="">Choose one…</option>
              {EVENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field id={id("date")} label={LABELS.date} hint="e.g. 14 March 2027, or “spring 2027”.">
            <input id={id("date")} value={f.date} onChange={set("date")} aria-describedby={describe("date", true)} className={input("date")} />
          </Field>
          <Field id={id("guests")} label={LABELS.guests}>
            <select id={id("guests")} value={f.guests} onChange={set("guests")} className={input("guests")}>
              <option value="">Choose one…</option>
              {GUESTS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field id={id("location")} label={LABELS.location} hint="Booked already, or still dreaming?">
            <input id={id("location")} value={f.location} onChange={set("location")} aria-describedby={describe("location", true)} className={input("location")} />
          </Field>
        </div>
        <div className="mt-5">
          <Field id={id("message")} label={LABELS.message} required error={errors.message}>
            <textarea id={id("message")} rows={5} value={f.message} onChange={set("message")} onBlur={blur("message")} aria-invalid={!!errors.message} aria-describedby={describe("message")} className={cn(input("message"), "resize-y")} />
          </Field>
        </div>
      </fieldset>

      <div className="mt-10 rounded-[8px] bg-paper-2 p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-serif text-xl">
            <Heart aria-hidden className="size-4 fill-coral text-coral" /> Your enquiry board
          </p>
          <button type="button" onClick={() => setBoard(true)} className="micro min-h-11 text-coral-deep hover:text-ink">
            Open board
          </button>
        </div>
        {items.length === 0 ? (
          <p className="mt-2 text-sm text-ink-2">Nothing saved yet — tap the heart on any service or celebration and it&apos;ll be sent along with your enquiry.</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-2 rounded-full bg-paper py-1 pl-1 pr-1 text-sm">
                <span className="relative size-8 overflow-hidden rounded-full">
                  <Img id={i.image} alt="" sizes="32px" />
                </span>
                <span className="max-w-[14rem] truncate">{i.title}</span>
                <button type="button" onClick={() => remove(i.id)} aria-label={`Remove ${i.title} from your enquiry`} className="grid size-8 place-items-center rounded-full hover:bg-ink/5">
                  <X aria-hidden className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <PillButton type="submit" disabled={status === "sending"} className="disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send my enquiry"}
        </PillButton>
        <p className="text-sm text-mute">We reply Mon–Fri, 9am–4pm.</p>
      </div>
      {status === "failed" && (
        <p role="alert" className="mt-4 text-coral-deep">
          Sorry — that didn&apos;t send. Please try again, or email us at{" "}
          <a href={`mailto:${CONTACT.enquiries}`} className="underline">
            {CONTACT.enquiries}
          </a>
          .
        </p>
      )}
    </form>
  );
}
