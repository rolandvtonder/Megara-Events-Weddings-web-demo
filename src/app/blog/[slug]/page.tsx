import { imageSrc } from "@/lib/images";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { POSTS, postBySlug } from "@/data/posts";
import { BRAND } from "@/data/site";
import { PostCard } from "@/components/blog/PostCard";
import { Img } from "@/components/ui/Img";
import { PageFX } from "@/components/ui/ScrollFX";
import { CTABand } from "@/components/ui/Sections";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = postBySlug(slug);
  if (!p) return { title: "Not found" };
  return { title: p.title, description: p.excerpt, openGraph: { type: "article", images: [imageSrc(p.image)] } };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = postBySlug(slug);
  if (!post) notFound();
  const more = POSTS.filter((p) => p.slug !== slug && p.category === post.category)
    .concat(POSTS.filter((p) => p.slug !== slug && p.category !== post.category))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: imageSrc(post.image),
    author: { "@type": "Organization", name: BRAND.fullName },
  };

  return (
    <>
      <article>
        <header data-bg="#FBF7F5" className="pt-[calc(var(--ann-h)+var(--nav-h)+2.5rem)] md:pt-[calc(var(--ann-h)+var(--nav-h)+4.5rem)]">
          <div className="container-x mx-auto max-w-4xl">
            <Link href="/blog" className="micro inline-flex min-h-11 items-center gap-2 text-ink/70 hover:text-ink">
              <ArrowLeft aria-hidden className="size-3.5" /> Journal
            </Link>
            <p className="micro mt-6 text-coral-deep">
              {post.category} · {formatDate(post.date)} · {post.readMins} min read
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.8rem,6.4vw,6rem)] leading-[0.95]">
              <SplitReveal as="span" play className="block">
                {post.title}
              </SplitReveal>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-2">{post.excerpt}</p>
          </div>
          <div className="container-x mt-12">
            <div className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden rounded-[8px] bg-sand">
              <Img id={post.image} alt="" sizes="(min-width:1200px) 1150px, 100vw" priority />
            </div>
          </div>
        </header>

        <div data-bg="#FBF7F5" className="container-x py-16 md:py-24">
          <div className="prose-megara mx-auto max-w-[68ch]">
            {post.body.map((b, i) =>
              "h" in b ? (
                <h2 key={i}>{b.h}</h2>
              ) : "p" in b ? (
                <p key={i}>{b.p}</p>
              ) : (
                <ul key={i}>
                  {b.ul.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ),
            )}
            <p className="font-hand text-4xl text-coral-deep">With love, Meg &amp; the Megara team x</p>
          </div>
        </div>
      </article>

      <section data-bg="#F3EAE4" aria-labelledby="more-title" className="py-24">
        <div className="container-x">
          <h2 id="more-title" className="font-serif text-5xl">
            Keep reading
          </h2>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Still feeling" accent="overwhelmed?" body="Whether you need full planning, partial co-ordination or just on-the-day help — we've got you covered. Book a complimentary consultation." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageFX />
    </>
  );
}
