import type { Metadata } from "next";
import { GALLERIES } from "@/data/portfolio";
import { WEDDING_FAQ, WEDDING_PACKAGES, WEDDING_PROMISES } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { ServiceBlock } from "@/components/portfolio/ServiceBlock";
import { ArrowLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/ui/PageHero";
import { PageFX } from "@/components/ui/ScrollFX";
import { CTABand, FAQ, SectionHead } from "@/components/ui/Sections";
import { Reveal, SplitReveal } from "@/components/ui/SplitReveal";

export const metadata: Metadata = {
  title: "Weddings",
  description: "Bespoke wedding planning in Cape Town, the Winelands and beyond — complete co-ordination, partial planning & styling, on-the-day co-ordination and destination weddings.",
};

const PROMISE_TINTS = ["#B23F2C", "#E8BB5C", "#1E3A3C"];

export default function WeddingsPage() {
  const weddings = GALLERIES.filter((g) => g.category === "wedding").slice(0, 3);
  const quote = TESTIMONIALS[1];

  return (
    <>
      <PageHero
        eyebrow="Hello lovers"
        title="Weddings"
        accent="that are all you."
        image="julia-sander-10"
        imageAlt="A bride and groom walking towards the mountains at Johannesdal"
        position="50% 55%"
        crumbs={[{ label: "Home", href: "/" }, { label: "Weddings" }]}
        intro={
          <p>
            Let&apos;s do that thing you&apos;ve always wanted to do. As creators of bespoke events, we design a wedding that is an expression of you — a reflection of your character, your quirks, your style and your love story.
          </p>
        }
      />

      <section data-bg="#F6DCD3" className="py-24 md:py-36">
        <div className="container-x">
          <SplitReveal as="p" className="mx-auto max-w-5xl text-center font-serif text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.08]">
            Welcome to the most amazing wedding decision you will make. From the moment we first meet to the moment your last guest walks out, we guide you in making the best decisions — every step of the way.
          </SplitReveal>
        </div>
      </section>

      <div id="packages" className="scroll-mt-24">
        <div className="container-x pt-24">
          <SectionHead eyebrow="Wedding packages" title="Four ways to" accent="say yes" aside={<p className="max-w-sm text-ink-2">Every proposal is individually customised — we consider size, location and budget to build a plan that fits.</p>} />
        </div>
        {WEDDING_PACKAGES.map((s, i) => (
          <ServiceBlock key={s.id} s={s} index={i} flip={i % 2 === 1} />
        ))}
      </div>

      <section data-bg="#FBF7F5" aria-labelledby="promises-title" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHead id="promises-title" eyebrow="Why Megara" title="You relax," accent="we handle the details" />
          <Reveal className="mt-14 grid gap-4 md:grid-cols-3">
            {WEDDING_PROMISES.map((p, i) => (
              <article key={p.title} className="flex min-h-[20rem] flex-col justify-between rounded-[8px] p-8" style={{ backgroundColor: PROMISE_TINTS[i], color: i === 1 ? "#2B2321" : "#FBF7F5" }}>
                <span aria-hidden className="size-4 rotate-45 border-2 border-current" />
                <span>
                  <span className="block font-serif text-[2.4rem] leading-[1]">{p.title}</span>
                  <span className="mt-4 block leading-relaxed opacity-95">{p.body}</span>
                </span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section data-bg="#2B2321" className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
        <div className="container-x grid items-center gap-12 md:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] md:col-span-5">
            <Img id={quote.image} alt="Bride and groom dancing at sunset beside a lake" sizes="(min-width:768px) 40vw, 100vw" />
          </div>
          <blockquote className="md:col-span-6 md:col-start-7">
            <p className="font-hand text-5xl text-gold">overheard</p>
            <p className="mt-4 font-serif text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.15]">“{quote.full}”</p>
            <footer className="micro mt-8 text-paper/80">
              — {quote.name}, {quote.occasion}
            </footer>
          </blockquote>
        </div>
      </section>

      <section data-bg="#FBF7F5" aria-labelledby="wed-work" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHead id="wed-work" eyebrow="Our work" title="Recent" accent="weddings" aside={<ArrowLink href="/portfolio?category=wedding">All weddings</ArrowLink>} />
          <Reveal className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {weddings.map((g) => (
              <PortfolioCard key={g.slug} g={g} />
            ))}
          </Reveal>
        </div>
      </section>

      <section data-bg="#E6F0F1" className="py-24 md:py-32">
        <FAQ items={WEDDING_FAQ} />
      </section>

      <CTABand title="We can't wait to bring your" accent="wedding dreams to life" body="Pop us a mail and let's get planning. Consultations are complimentary and obligation free." image="stacey-steve-09" />
      <PageFX />
    </>
  );
}
