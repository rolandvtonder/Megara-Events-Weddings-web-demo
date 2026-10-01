import { MARQUEE } from "@/data/site";
import { Marquee } from "@/components/ui/Marquee";

function Items({ star }: { star: string }) {
  return (
    <>
      {MARQUEE.map((m) => (
        <span key={m} className="flex items-center gap-8 pl-8 font-serif text-[1.7rem] italic leading-none md:text-[2.1rem]">
          {m}
          <span aria-hidden className={`size-2 rotate-45 ${star}`} />
        </span>
      ))}
    </>
  );
}

/** Two crossing ribbons that run in opposite directions and react to scroll speed. */
export function MarqueeBand() {
  return (
    <section aria-label="What we plan" className="relative z-10 -my-6 overflow-hidden py-14 md:py-16">
      <div className="-rotate-[2.5deg] scale-[1.04] bg-coral-deep py-4 text-paper shadow-[0_20px_40px_-20px_rgba(178,63,44,0.6)] md:py-5">
        <Marquee speed={55}>
          <Items star="bg-gold" />
        </Marquee>
      </div>
      <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 rotate-[2deg] scale-[1.04] bg-gold py-3 text-ink md:py-4">
        <Marquee speed={40} direction={-1}>
          <Items star="bg-coral-deep" />
        </Marquee>
      </div>
    </section>
  );
}
