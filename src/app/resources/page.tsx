import type { Metadata } from "next";
import { RESOURCES } from "@/data/resources";
import { POSTS } from "@/data/posts";
import { PostCard } from "@/components/blog/PostCard";
import { Newsletter } from "@/components/layout/Newsletter";
import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { PageFX } from "@/components/ui/ScrollFX";
import { CTABand } from "@/components/ui/Sections";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free resources",
  description: "Free downloads from Megara: The Ultimate Wedding Itinerary Worksheet, the Ultimate Floral Checklist and our Wedding Planning Checklist.",
};

export default function ResourcesPage() {
  return (
    <>
      <section data-bg="#FBF7F5" className="pt-[calc(var(--ann-h)+var(--nav-h)+2.5rem)] md:pt-[calc(var(--ann-h)+var(--nav-h)+4.5rem)]">
        <div className="container-x">
          <Eyebrow className="text-ink/75">Free downloads</Eyebrow>
          <h1 className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-1">
            <SplitReveal as="span" play className="font-display text-[clamp(3rem,10vw,10rem)] uppercase leading-[0.86]">
              Resources
            </SplitReveal>
            <SplitReveal as="span" play delay={0.25} className="pb-[0.8vw] font-serif text-[clamp(2rem,5vw,5rem)] italic leading-none text-coral-deep">
              on the house
            </SplitReveal>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 md:ml-auto">
            The worksheets and checklists our own team uses for every event — free for stopping by. Pop in your email and we&apos;ll send them straight over.
          </p>
        </div>
      </section>

      {RESOURCES.map((r, i) => (
        <section key={r.id} id={r.id} data-bg={r.tint} aria-labelledby={`${r.id}-title`} className="scroll-mt-24 py-20 md:py-28">
          <div className="container-x grid items-center gap-12 md:grid-cols-12">
            <div className={i % 2 ? "md:order-2 md:col-span-5 md:col-start-8" : "md:col-span-5"} data-py={i % 2 ? 30 : -30}>
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-t-full rounded-b-[10px] bg-paper">
                <Img id={r.image} alt="" sizes="(min-width:768px) 36vw, 90vw" fit={r.image === "freebie-checklist" ? "contain" : "cover"} className={r.image === "freebie-checklist" ? "p-8" : undefined} />
              </div>
            </div>
            <div className={i % 2 ? "md:order-1 md:col-span-6" : "md:col-span-6 md:col-start-7"}>
              <p className="micro text-ink/70">
                {pad(i + 1)} · {r.kicker}
              </p>
              <h2 id={`${r.id}-title`} className="mt-4 font-serif text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.95]">
                {r.title}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-2">{r.body}</p>
              <div className="mt-8 max-w-md">
                <Newsletter resource={r.title} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section data-bg="#FBF7F5" aria-labelledby="reading-title" className="py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="reading-title" className="font-serif text-5xl">
              Further reading
            </h2>
            <ArrowLink href="/blog">The journal</ArrowLink>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.filter((p) => p.category !== "Corporate")
              .slice(0, 3)
              .map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
          </div>
        </div>
      </section>

      <CTABand />
      <PageFX />
    </>
  );
}
