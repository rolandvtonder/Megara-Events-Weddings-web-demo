import { Monogram } from "@/components/ui/BrandMark";
import { PillLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 pb-20 pt-[calc(var(--ann-h)+var(--nav-h)+2rem)] text-center">
      <Monogram className="size-24 text-coral-deep" />
      <p aria-hidden className="mt-6 font-display text-[clamp(6rem,22vw,16rem)] leading-[0.85]">
        4<span className="text-coral-deep">0</span>4
      </p>
      <h1 className="mt-4 font-serif text-4xl md:text-6xl">Well, this is a hot mess.</h1>
      <p className="mt-3 max-w-md text-lg text-ink-2">The page you&apos;re after isn&apos;t here — but we&apos;re experts at turning things into a mega success.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <PillLink href="/">Back home</PillLink>
        <PillLink href="/portfolio" variant="outline">
          See our work
        </PillLink>
      </div>
    </section>
  );
}
