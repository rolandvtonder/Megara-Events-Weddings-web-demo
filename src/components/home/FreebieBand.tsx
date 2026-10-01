import { Newsletter } from "@/components/layout/Newsletter";
import { Img } from "@/components/ui/Img";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { RESOURCES } from "@/data/resources";

/** "Get your free gift for stopping by" — the itinerary worksheet lead magnet. */
export function FreebieBand() {
  const r = RESOURCES[0];
  return (
    <section data-bg="#F3EAE4" aria-labelledby="freebie-title" className="overflow-hidden py-24 md:py-32">
      <div className="container-x grid items-center gap-12 md:grid-cols-12">
        <div className="relative md:col-span-5" data-py="-30">
          <div className="relative mx-auto aspect-square max-w-[28rem]">
            <div aria-hidden className="absolute inset-[15%] rotate-45 rounded-[10px] bg-gold/50" />
            <div className="absolute inset-[6%] -rotate-3">
              <Img id={r.image} alt="Preview of the Megara wedding planning checklist on a tablet" sizes="(min-width:768px) 36vw, 90vw" fit="contain" className="drop-shadow-[0_30px_40px_rgba(43,35,33,0.25)]" />
            </div>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="font-hand text-5xl text-coral-deep">{r.kicker.toLowerCase()}</p>
          <h2 id="freebie-title" className="mt-3 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95]">
            <SplitReveal as="span" className="block">
              {r.title}
            </SplitReveal>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">{r.body}</p>
          <div className="mt-8 max-w-md">
            <Newsletter resource={r.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
