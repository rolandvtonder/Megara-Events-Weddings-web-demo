import { imageSrc } from "@/lib/images";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CATEGORY_LABEL, GALLERIES, galleryBySlug } from "@/data/portfolio";
import { TESTIMONIALS } from "@/data/testimonials";
import { GalleryGrid } from "@/components/portfolio/GalleryGrid";
import { PillLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/ui/PageHero";
import { SaveButton } from "@/components/ui/SaveButton";
import { PageFX } from "@/components/ui/ScrollFX";
import { CTABand } from "@/components/ui/Sections";

export function generateStaticParams() {
  return GALLERIES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const g = galleryBySlug(slug);
  if (!g) return { title: "Not found" };
  return { title: `${g.title} — ${g.meta}`, description: g.intro, openGraph: { images: [imageSrc(g.cover)] } };
}

export default async function GalleryPage(props: PageProps<"/portfolio/[slug]">) {
  const { slug } = await props.params;
  const g = galleryBySlug(slug);
  if (!g) notFound();

  const idx = GALLERIES.findIndex((x) => x.slug === slug);
  const prev = GALLERIES[(idx - 1 + GALLERIES.length) % GALLERIES.length];
  const next = GALLERIES[(idx + 1) % GALLERIES.length];
  const quote = TESTIMONIALS.find((t) => t.gallery === g.slug);
  const accent = { wedding: "a love story.", celebration: "a celebration.", brand: "a brand story." }[g.category];

  return (
    <>
      <PageHero
        eyebrow={`${CATEGORY_LABEL[g.category]} · ${g.location}`}
        title={g.title}
        accent={accent}
        image={g.wide}
        imageAlt={`${g.title} — ${g.meta}`}
        bg={g.tint}
        crumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: g.title }]}
        intro={<p>{g.intro}</p>}
      >
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
          {g.credits.map((c) => (
            <div key={c.role}>
              <dt className="micro text-mute">{c.role}</dt>
              <dd className="mt-1 font-serif text-xl">{c.name}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex items-center gap-3 text-ink-2">
          <SaveButton item={{ id: `g-${g.slug}`, kind: "inspiration", title: g.title, meta: g.meta, image: g.cover, href: `/portfolio/${g.slug}` }} tone="ghost" />
          Save this celebration to your enquiry board
        </div>
      </PageHero>

      <section data-bg="#FBF7F5" aria-label={`${g.title} gallery`} className="py-20 md:py-28">
        <div className="container-x">
          <GalleryGrid g={g} />
        </div>
      </section>

      {quote && (
        <section data-bg={g.tint} className="py-20 md:py-28">
          <figure className="container-x mx-auto max-w-4xl text-center">
            <blockquote className="font-serif text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[1.15]">“{quote.full ?? quote.quote}”</blockquote>
            <figcaption className="micro mt-8 text-ink-2">
              — {quote.name}, {quote.occasion}
            </figcaption>
          </figure>
        </section>
      )}

      <nav aria-label="More celebrations" className="border-t border-line">
        <div className="grid md:grid-cols-2">
          {[
            { g: prev, label: "Previous", Icon: ArrowLeft },
            { g: next, label: "Next", Icon: ArrowRight },
          ].map(({ g: o, label, Icon }) => (
            <Link key={label} href={`/portfolio/${o.slug}`} className="group relative block h-72 overflow-hidden md:h-96">
              <Img id={o.cover} alt="" sizes="50vw" className="transition-transform duration-[1400ms] ease-expo group-hover:scale-105" />
              <span className="absolute inset-0 bg-ink/50 transition-colors duration-500 group-hover:bg-ink/35" />
              <span className="absolute inset-0 flex flex-col items-center justify-center text-paper">
                <span className="micro flex items-center gap-2">
                  {label === "Previous" && <Icon aria-hidden className="size-3.5" />}
                  {label} celebration
                  {label === "Next" && <Icon aria-hidden className="size-3.5" />}
                </span>
                <span className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-none">{o.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="container-x flex justify-center py-16">
        <PillLink href="/portfolio" variant="outline">
          Back to the portfolio
        </PillLink>
      </div>

      <CTABand title="Dreaming of something" accent="like this?" image={g.cover} />
      <PageFX />
    </>
  );
}
