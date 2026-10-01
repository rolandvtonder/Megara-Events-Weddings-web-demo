import { Check } from "lucide-react";
import type { Service } from "@/data/services";
import { PillLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { SaveButton } from "@/components/ui/SaveButton";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { cn, pad } from "@/lib/utils";

/** One service/package, alternating image side, with "includes" list and save-to-board. */
export function ServiceBlock({ s, index, flip }: { s: Service; index: number; flip?: boolean }) {
  return (
    <section id={s.id} data-bg={s.tint} aria-labelledby={`${s.id}-title`} className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className={cn("relative md:col-span-6", flip && "md:order-2")} data-py={flip ? 40 : -40}>
          <div className="arch relative aspect-[4/5] overflow-hidden bg-sand">
            <div data-img-parallax className="absolute inset-0">
              <Img id={s.image} alt={`${s.title} — a Megara celebration`} sizes="(min-width:768px) 45vw, 100vw" />
            </div>
          </div>
          <span aria-hidden className="absolute -top-6 left-4 font-display text-[clamp(5rem,10vw,9rem)] leading-none text-paper mix-blend-overlay md:-left-6">
            {pad(index + 1)}
          </span>
        </div>
        <div className={cn("md:col-span-6", flip && "md:order-1")}>
          <p className="font-hand text-4xl text-coral-deep md:text-5xl">{s.kicker}</p>
          <h2 id={`${s.id}-title`} className="mt-3 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95]">
            <SplitReveal as="span" className="block">
              {s.title}
            </SplitReveal>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">{s.summary}</p>
          {s.body.map((p) => (
            <p key={p.slice(0, 24)} className="mt-4 max-w-xl leading-relaxed text-ink-2">
              {p}
            </p>
          ))}
          <div className="mt-8 rounded-[8px] bg-paper/70 p-6 backdrop-blur">
            <p className="micro text-mute">Ideal for · {s.idealFor}</p>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {s.includes.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-ink-2">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-coral-deep" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PillLink href={`/contact?service=${s.id}`}>{s.cta}</PillLink>
            <span className="flex items-center gap-3 text-ink-2">
              <SaveButton item={{ id: s.id, kind: "service", title: s.title, meta: s.kicker, image: s.image, href: s.href }} tone="ghost" />
              Save to my board
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
