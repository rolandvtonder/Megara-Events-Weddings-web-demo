import type { Metadata } from "next";
import { POSTS } from "@/data/posts";
import { PostCard } from "@/components/blog/PostCard";
import { FreebieBand } from "@/components/home/FreebieBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageFX } from "@/components/ui/ScrollFX";
import { Reveal, SplitReveal } from "@/components/ui/SplitReveal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Wedding planning tips, flower checklists, corporate event advice and more from the Megara team.",
};

export default function BlogPage() {
  const [lead, ...rest] = POSTS;
  return (
    <>
      <section data-bg="#FBF7F5" className="pb-24 pt-[calc(var(--ann-h)+var(--nav-h)+2.5rem)] md:pb-32 md:pt-[calc(var(--ann-h)+var(--nav-h)+4.5rem)]">
        <div className="container-x">
          <Eyebrow className="text-ink/75">Top resources</Eyebrow>
          <h1 className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-1">
            <SplitReveal as="span" play className="font-display text-[clamp(3rem,10vw,10rem)] uppercase leading-[0.86]">
              Journal
            </SplitReveal>
            <SplitReveal as="span" play delay={0.25} className="pb-[0.8vw] font-serif text-[clamp(2rem,5vw,5rem)] italic leading-none text-coral-deep">
              notes from the planning desk
            </SplitReveal>
          </h1>

          <div className="mt-16 grid items-end gap-12 lg:grid-cols-12">
            <PostCard post={lead} large className="lg:col-span-7" />
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-hand text-5xl text-coral-deep">steal my checklist</p>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">
                Looking to take the stress out of planning your own wedding or event? These are the tips, checklists and lessons our team leans on every single week.
              </p>
            </div>
          </div>

          <Reveal className="mt-20 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </Reveal>
        </div>
      </section>
      <FreebieBand />
      <PageFX />
    </>
  );
}
