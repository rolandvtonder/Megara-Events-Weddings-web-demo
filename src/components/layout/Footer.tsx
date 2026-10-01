import Link from "next/link";
import { BRAND, CONTACT, FOOTER_LINKS, SOCIALS } from "@/data/site";
import { Monogram } from "@/components/ui/BrandMark";
import { Img } from "@/components/ui/Img";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { FooterWordmark } from "./FooterWordmark";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden" data-bg="#FBF7F5">
      <div className="container-x pt-24 lg:pt-32">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href="/" aria-label="Megara — home" className="inline-flex items-center gap-4 text-ink">
              <Monogram className="size-16" />
              <span className="font-display text-3xl tracking-[0.24em]">MEGARA</span>
            </Link>
            <p className="mt-6 max-w-[17rem] font-serif text-[1.6rem] italic leading-snug">You relax, we handle the details.</p>
            <p className="mt-4 text-ink-2">{BRAND.promise}</p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="mb-4 font-serif text-2xl italic">{col.title}</p>
              <ul className="space-y-1">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="inline-block py-1.5 text-ink/80 transition-colors hover:text-ink">
                      <span className="u-link">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-3">
            <p className="mb-2 font-serif text-2xl italic">A free gift for stopping by</p>
            <p className="mb-5 max-w-sm text-ink-2">The Ultimate Wedding Itinerary Worksheet — the exact tool our team uses to time every wedding day.</p>
            <Newsletter />
          </div>
        </div>
      </div>

      <FooterWordmark />

      <div className="relative -mt-[5vw] h-[46vw] max-h-[620px] min-h-[340px]">
        <Img id="stacey-steve-07" alt="A couple at golden hour beside a lake beneath the Boschendal mountains" sizes="100vw" position="50% 60%" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[var(--page-bg)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent pt-24 text-paper">
          <div className="container-x flex flex-col gap-4 pb-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="opacity-90">
              © {BRAND.year} {BRAND.fullName}. {CONTACT.location}
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Megara on ${s.label}`}
                  className="grid size-11 place-items-center rounded-full bg-paper/15 backdrop-blur transition-colors hover:bg-paper hover:text-ink"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
            <div className="flex gap-5 opacity-90">
              <Link href="/contact" className="u-link">
                Contact
              </Link>
              <Link href="/resources" className="u-link">
                Free resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
