import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { MeetMeg } from "@/components/home/MeetMeg";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/ui/PageHero";
import { PageFX } from "@/components/ui/ScrollFX";
import { CTABand } from "@/components/ui/Sections";
import { Reveal } from "@/components/ui/SplitReveal";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Love notes from Megara's couples and clients — weddings, milestone birthdays and brand activations.",
};

const TINTS = ["#F6DCD3", "#D2E5E7", "#F3E2B8", "#EADBC8", "#F6DCD3", "#D2E5E7"];

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Event & wedding planning experts"
        title="Happy"
        accent="clients."
        image="stacey-steve-09"
        imageAlt="Newlyweds walking back down the aisle as guests throw petals"
        crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
        intro={<p>Happy clients mean the world to us, and we&apos;re so grateful to them for sharing a few kind words about their experience. Read some love notes from previous clients.</p>}
      >
        <p className="flex items-center gap-3 text-ink-2">
          <span className="flex text-gold-deep" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-4 fill-current" strokeWidth={0} />
            ))}
          </span>
          <span>“If there was a higher rating than 5 stars we would give it.”</span>
        </p>
      </PageHero>

      <section data-bg="#FBF7F5" aria-label="Client testimonials" className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="columns-1 gap-5 md:columns-2 xl:columns-3 [&>*]:mb-5" stagger={0.06}>
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.name} className="break-inside-avoid overflow-hidden rounded-[8px]" style={{ backgroundColor: TINTS[i % TINTS.length] }}>
                <div className="relative aspect-[16/10] bg-sand">
                  <Img id={t.image} alt="" sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 92vw" />
                </div>
                <div className="p-7 md:p-8">
                  <span aria-hidden className="block font-serif text-7xl leading-[0.5] text-coral-deep">“</span>
                  <blockquote className="mt-4 font-serif text-[1.45rem] leading-snug">{t.full ?? t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-4">
                    <span>
                      <span className="block font-medium">{t.name}</span>
                      <span className="micro mt-1 block text-ink-2">{t.occasion}</span>
                    </span>
                    {t.gallery && (
                      <Link href={`/portfolio/${t.gallery}`} className="micro u-link shrink-0 text-coral-deep">
                        See the event
                      </Link>
                    )}
                  </figcaption>
                </div>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <MeetMeg />
      <CTABand title="Your love note" accent="could be next." />
      <PageFX />
    </>
  );
}
