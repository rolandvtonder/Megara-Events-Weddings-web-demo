import { MEG } from "@/data/about";
import { TESTIMONIALS } from "@/data/testimonials";
import { PillLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { SplitReveal } from "@/components/ui/SplitReveal";

/** "hi friend!" — Meg's introduction, with her portrait cropped to the logo's diamond. */
export function MeetMeg() {
  const quote = TESTIMONIALS[0];
  return (
    <section data-bg="#F6DCD3" aria-labelledby="meg-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <div className="relative md:col-span-5" data-py="-40">
          <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
            <div aria-hidden className="diamond absolute inset-[-6%] bg-coral/25" />
            <div className="diamond absolute inset-0 overflow-hidden bg-sand">
              <Img id="meg-portrait" alt="Meg, founder of Megara, smiling in a leather jacket" sizes="(min-width:768px) 40vw, 90vw" position="50% 30%" />
            </div>
            <div aria-hidden className="absolute bottom-[8%] right-[10%] size-[11%] rotate-45 border-2 border-ink" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7" data-py="30">
          <p className="font-hand text-6xl leading-none text-coral-deep md:text-7xl">{MEG.hello}</p>
          <h2 id="meg-title" className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95]">
            <SplitReveal as="span" className="block">
              {MEG.intro}
            </SplitReveal>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">{MEG.short}</p>
          <blockquote className="mt-8 max-w-lg border-l-2 border-coral pl-5">
            <p className="font-serif text-2xl italic leading-snug">“{quote.quote}”</p>
            <footer className="micro mt-3 text-mute">— {quote.name}</footer>
          </blockquote>
          <PillLink href="/about" variant="ink" className="mt-10">
            Get to know me
          </PillLink>
        </div>
      </div>
    </section>
  );
}
