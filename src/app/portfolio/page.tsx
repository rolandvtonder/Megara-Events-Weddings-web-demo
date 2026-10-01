import type { Metadata } from "next";
import { PortfolioGridFromURL } from "@/components/portfolio/PortfolioGridFromURL";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageFX } from "@/components/ui/ScrollFX";
import { CTABand } from "@/components/ui/Sections";
import { SplitReveal } from "@/components/ui/SplitReveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Weddings in the Winelands, milestone birthdays and brand activations for Woolworths, UCOOK and Amazon — explore Megara's portfolio.",
};

export default function PortfolioPage() {
  return (
    <>
      <section data-bg="#FBF7F5" className="pb-10 pt-[calc(var(--ann-h)+var(--nav-h)+2.5rem)] md:pt-[calc(var(--ann-h)+var(--nav-h)+4.5rem)]">
        <div className="container-x">
          <Eyebrow className="text-ink/75">Portfolio highlights</Eyebrow>
          <h1 className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-1">
            <SplitReveal as="span" play className="font-display text-[clamp(3rem,10vw,10rem)] uppercase leading-[0.86]">
              Our work
            </SplitReveal>
            <SplitReveal as="span" play delay={0.25} className="pb-[0.8vw] font-serif text-[clamp(2rem,5vw,5rem)] italic leading-none text-coral-deep">
              like what you see?
            </SplitReveal>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 md:ml-auto">
            We design experiences, not just centrepieces. Browse by gallery type — then save the celebrations you love to your enquiry board and bring them to your consultation.
          </p>
        </div>
      </section>

      <PortfolioGridFromURL />

      <div className="h-24 md:h-40" />
      <CTABand title="Like what you see?" accent="Let's chat!" body="Contact us for a complimentary consultation to discuss your vision and the package that best suits your requirements." image="feature-floral-table" />
      <PageFX />
    </>
  );
}
