import type { Metadata } from "next";
import { BELIEFS, CURRENTLY, MEG, STATS } from "@/data/about";
import { ThisOrThat } from "@/components/forms/ThisOrThat";
import { PillLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/ui/PageHero";
import { PageFX } from "@/components/ui/ScrollFX";
import { CTABand } from "@/components/ui/Sections";
import { Reveal, SplitReveal } from "@/components/ui/SplitReveal";

export const metadata: Metadata = {
  title: "About Meg",
  description: "Meet Meg, founder of Megara Events & Weddings — a decade of international VIP and superyacht experience, now creating bespoke celebrations in Cape Town.",
};

const BELIEF_TINTS = [
  { bg: "#B23F2C", fg: "#FBF7F5" },
  { bg: "#E8BB5C", fg: "#2B2321" },
  { bg: "#1E3A3C", fg: "#FBF7F5" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Megara"
        title="Experiences,"
        accent="not just centrepieces."
        image="meg-flowers"
        imageAlt="Meg laughing while holding an armful of pink lilies and orchids"
        position="50% 25%"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        intro={
          <p>
            We design every event custom, drawing on elements of your story to create an experience you could never have imagined, yet is so unmistakably yours. Our work is painstaking and precise — we work hard to make it look easy and effortless.
          </p>
        }
      />

      <section data-bg="#F6DCD3" aria-labelledby="story-title" className="py-24 md:py-32">
        <div className="container-x grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="relative md:sticky md:top-[calc(var(--nav-h)+2rem)] md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[8px] bg-sand">
              <Img id="meg-office" alt="Meg in a white blazer in the Megara studio" sizes="(min-width:768px) 40vw, 100vw" position="50% 20%" />
            </div>
            <p className="absolute -bottom-6 right-4 rotate-[-6deg] rounded-full bg-paper px-6 py-3 font-hand text-3xl shadow-xl">{MEG.hello}</p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Eyebrow className="text-ink/75">{MEG.role}</Eyebrow>
            <h2 id="story-title" className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95]">
              <SplitReveal as="span" className="block">
                {MEG.intro}
              </SplitReveal>
            </h2>
            {MEG.story.map((p) => (
              <p key={p.slice(0, 20)} className="mt-6 text-lg leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
            <blockquote className="mt-10 border-l-2 border-coral-deep pl-6">
              <p className="micro text-mute">My superpower</p>
              <p className="mt-2 font-serif text-3xl italic leading-snug">{MEG.superpower}</p>
            </blockquote>
            <p className="mt-10 font-hand text-4xl text-coral-deep">I look forward to meeting you soon! xo</p>
          </div>
        </div>
      </section>

      <section data-bg="#FBF7F5" aria-labelledby="founded-title" className="py-24 md:py-32">
        <div className="container-x grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Eyebrow color="var(--color-gold)" className="text-ink/75">
              Since {STATS[0].big}
            </Eyebrow>
            <h2 id="founded-title" className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95]">
              <SplitReveal as="span" className="block">
                Founded by two friends over a <em className="text-coral-deep">shared passion</em>
              </SplitReveal>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">
              Megara was born from a love of creating inspired events around life&apos;s most special celebrations and corporate occasions. Today we&apos;re renowned for unforgettable, dreamy celebrations — luxury weddings, brand experiences, destination weddings and private parties.
            </p>
            <ul className="mt-12 grid grid-cols-3 gap-4">
              {STATS.map((r) => (
                <li key={r.label}>
                  <span className="block font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-none text-coral-deep">{r.big}</span>
                  <span className="mt-2 block text-sm text-ink-2">{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-sand">
            <Img id="founders" alt="The Megara team smiling on a venue stairway" sizes="(min-width:768px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      <section data-bg="#FBF7F5" aria-label="Meg's beliefs" className="pb-24 md:pb-32">
        <div className="container-x">
          <Reveal className="grid gap-4 md:grid-cols-3">
            {BELIEFS.map((b, i) => (
              <article key={b.label} className="flex min-h-[18rem] flex-col justify-between rounded-[8px] p-8" style={{ backgroundColor: BELIEF_TINTS[i].bg, color: BELIEF_TINTS[i].fg }}>
                <span className="micro opacity-90">{b.label}:</span>
                <p className="font-serif text-[1.75rem] leading-snug">{b.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section data-bg="#E6F0F1" aria-labelledby="tot-title" className="py-24 md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-hand text-5xl text-coral-deep">my favourite things</p>
            <h2 id="tot-title" className="mt-3 font-serif text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95]">
              This or that
            </h2>
            <p className="mt-4 max-w-sm text-lg text-ink-2">Where I stand on the super important stuff… agree or disagree?</p>
            <div className="mt-12 rounded-[8px] bg-paper p-7">
              <p className="micro text-mute">Currently</p>
              <dl className="mt-4 space-y-3">
                {CURRENTLY.map((c) => (
                  <div key={c.label} className="flex flex-wrap items-baseline gap-x-3 border-b border-line pb-3 last:border-0">
                    <dt className="micro w-24 text-coral-deep">{c.label}</dt>
                    <dd className="font-serif text-xl">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ThisOrThat />
          </div>
        </div>
      </section>

      <section data-bg="#FBF7F5" className="py-24 md:py-32">
        <div className="container-x grid items-center gap-12 md:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 md:col-span-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-sand" data-py="-30">
              <Img id="team-planning" alt="A planner reviewing wedding stationery and photos on a phone" sizes="(min-width:768px) 25vw, 46vw" />
            </div>
            <div className="relative mt-16 aspect-[3/4] overflow-hidden rounded-[8px] bg-sand" data-py="30">
              <Img id="meg-phone" alt="Meg smiling while checking her phone at an event" sizes="(min-width:768px) 25vw, 46vw" />
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Eyebrow className="text-ink/75">The team</Eyebrow>
            <h2 className="mt-4 font-serif text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.95]">Gorgeous, passionate & hard-working</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              Meg has built an incredible team of staff, networks and stakeholders that support each event and bring it to life — a team that stops at nothing to create a fabulous experience for every client.
            </p>
            <PillLink href="/contact" className="mt-8">
              Let&apos;s work together
            </PillLink>
          </div>
        </div>
      </section>

      <CTABand />
      <PageFX />
    </>
  );
}
