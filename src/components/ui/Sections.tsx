import type { ReactNode } from "react";
import { Monogram } from "@/components/ui/BrandMark";
import { PillLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { CONTACT } from "@/data/site";
import { cn } from "@/lib/utils";

/** Standard section heading: kicker + serif title, optional aside on the right. */
export function SectionHead({ eyebrow, title, accent, aside, className, color, id }: { eyebrow: string; title: string; accent?: string; aside?: ReactNode; className?: string; color?: string; id?: string }) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div data-px="-3" className="max-w-4xl">
        <Eyebrow color={color} className="text-ink/75">
          {eyebrow}
        </Eyebrow>
        <h2 id={id} className="mt-4 font-serif text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[0.95]">
          <SplitReveal as="span" className="block">
            {title} {accent && <em className="text-coral-deep">{accent}</em>}
          </SplitReveal>
        </h2>
      </div>
      {aside}
    </div>
  );
}

/** Closing call-to-action used at the bottom of most pages. */
export function CTABand({ title = "Did we just become", accent = "best friends?", body = "Send us a note and let us know how we can help. Consultations are complimentary and obligation free.", image = "yasmeen-rafiq-15" }: { title?: string; accent?: string; body?: string; image?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-teal-deep py-24 text-paper md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-30">
        <Img id={image} alt="" sizes="100vw" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-deep via-teal-deep/90 to-teal-deep/60" />
      <Monogram className="pointer-events-none absolute -right-20 top-1/2 -z-10 size-[34rem] -translate-y-1/2 text-paper/[0.07] [animation:spin-slow_90s_linear_infinite]" />
      <div className="container-x grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="font-hand text-4xl text-gold md:text-5xl">let&apos;s get planning</p>
          <h2 id="cta-title" className="mt-4 font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.9]">
            <SplitReveal as="span" className="block">
              {title} <em className="text-gold">{accent}</em>
            </SplitReveal>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-paper/85">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-5 md:col-span-4 md:items-end">
          <PillLink href="/contact" variant="gold">
            Let&apos;s work together
          </PillLink>
          <a href={`mailto:${CONTACT.enquiries}`} className="u-link text-sm text-paper/85 hover:text-paper">
            {CONTACT.enquiries}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Native <details> accordion — keyboard accessible and animated where supported. */
export function FAQ({ items, title = "Good to know", eyebrow = "Questions" }: { items: { q: string; a: string }[]; title?: string; eyebrow?: string }) {
  return (
    <div className="container-x grid gap-12 md:grid-cols-12">
      <div className="md:col-span-4">
        <Eyebrow className="text-ink/75">{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl">{title}</h2>
        <p className="mt-4 max-w-xs text-ink-2">
          Something else on your mind? Email{" "}
          <a className="u-link text-coral-deep" href={`mailto:${CONTACT.enquiries}`}>
            {CONTACT.enquiries}
          </a>
          .
        </p>
      </div>
      <div className="border-t border-line md:col-span-7 md:col-start-6">
        {items.map((s, i) => (
          <details key={s.q} className="group border-b border-line" open={i === 0}>
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-2xl md:text-[1.7rem] [&::-webkit-details-marker]:hidden">
              {s.q}
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/25 text-lg transition-transform duration-500 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-ink-2">{s.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
