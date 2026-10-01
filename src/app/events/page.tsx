import type { Metadata } from "next";
import { GALLERIES } from "@/data/portfolio";
import { CLIENTS, EVENT_FAQ, EVENT_SERVICES } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { ServiceBlock } from "@/components/portfolio/ServiceBlock";
import { ArrowLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Marquee } from "@/components/ui/Marquee";
import { PageHero } from "@/components/ui/PageHero";
import { PageFX } from "@/components/ui/ScrollFX";
import { CTABand, FAQ, SectionHead } from "@/components/ui/Sections";
import { Reveal, SplitReveal } from "@/components/ui/SplitReveal";

export const metadata: Metadata = {
  title: "Corporate events, brand activations & private parties",
  description: "Megara plans high-end corporate events, brand activations and private parties in Cape Town and Johannesburg — trusted by Woolworths, Amazon Web Services and UCOOK.",
};

export default function EventsPage() {
  const work = GALLERIES.filter((g) => g.category !== "wedding");
  const quotes = TESTIMONIALS.filter((t) => ["Melvin", "Erin Besnard", "Jessica Giles"].includes(t.name));

  return (
    <>
      <PageHero
        eyebrow="Corporate · Brand · Private"
        title="Events"
        accent="you can be proud of."
        image="amazon-02"
        imageAlt="A Havana-themed rooftop lounge with colourful bunting at a corporate event"
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
        intro={
          <p>
            Megara plans highly customised events that reflect the personality and essence of each client — whether an individual, a product or a company. Incredible events go beyond great design, so we integrate the finest catering, entertainment, production, styling and locations. Your guests will never want to leave.
          </p>
        }
      />

      <section aria-label="Trusted by" className="border-y border-line bg-paper py-8">
        <Marquee speed={30} scrollReactive={false}>
          <div className="flex items-center gap-16 pr-16">
            {CLIENTS.map((c) => (
              <span key={c.name} className="relative block h-12 w-36 shrink-0">
                <Img id={c.logo} alt={c.name} sizes="144px" fit="contain" className="opacity-80 mix-blend-multiply grayscale" />
              </span>
            ))}
          </div>
        </Marquee>
      </section>

      <section data-bg="#E6F0F1" className="py-24 md:py-36">
        <div className="container-x">
          <SplitReveal as="p" className="mx-auto max-w-5xl text-center font-serif text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.08]">
            We draw inspiration from experience, corporate culture and, most of all, your vision — producing a select number of high-end, totally amazing events each year.
          </SplitReveal>
        </div>
      </section>

      <div className="container-x pt-24">
        <SectionHead eyebrow="Ways to work together" title="Interested?" accent="Scroll on" />
      </div>
      {EVENT_SERVICES.map((s, i) => (
        <ServiceBlock key={s.id} s={s} index={i} flip={i % 2 === 1} />
      ))}

      <section data-bg="#2B2321" aria-labelledby="ev-quotes" className="bg-ink py-24 text-paper md:py-32">
        <div className="container-x">
          <p className="font-hand text-5xl text-gold">we are passionate about service</p>
          <h2 id="ev-quotes" className="mt-3 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95]">
            What our clients say
          </h2>
          <Reveal className="mt-12 grid gap-4 md:grid-cols-3">
            {quotes.map((q) => (
              <figure key={q.name} className="flex flex-col justify-between rounded-[8px] bg-paper/[0.06] p-8 ring-1 ring-paper/15">
                <blockquote className="font-serif text-2xl leading-snug">“{q.quote}”</blockquote>
                <figcaption className="mt-8">
                  <span className="block font-medium">{q.name}</span>
                  <span className="micro mt-1 block text-paper/75">{q.occasion}</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <section data-bg="#FBF7F5" aria-labelledby="ev-work" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHead id="ev-work" eyebrow="Our work" title="Brand experiences &" accent="celebrations" aside={<ArrowLink href="/portfolio">Full portfolio</ArrowLink>} />
          <Reveal className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((g) => (
              <PortfolioCard key={g.slug} g={g} />
            ))}
          </Reveal>
        </div>
      </section>

      <section data-bg="#F3EAE4" className="py-24 md:py-32">
        <FAQ items={EVENT_FAQ} />
      </section>

      <CTABand title="Ready to make your" accent="dreams happen?" body="Contact our team today and let's start brainstorming your next WOW moment." image="amazon-10" />
      <PageFX />
    </>
  );
}
