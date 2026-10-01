import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, SOCIALS } from "@/data/site";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Img } from "@/components/ui/Img";
import { PageFX } from "@/components/ui/ScrollFX";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SplitReveal } from "@/components/ui/SplitReveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a complimentary, obligation-free consultation with Megara Events & Weddings. Email enquiries@megara.co.za or call 083 995 4589.",
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage(props: PageProps<"/contact">) {
  const sp = await props.searchParams;
  const service = one(sp.service);

  const details = [
    { icon: Mail, label: "Email", value: CONTACT.enquiries, href: `mailto:${CONTACT.enquiries}` },
    { icon: Mail, label: "Email Meg", value: CONTACT.meg, href: `mailto:${CONTACT.meg}` },
    { icon: Phone, label: "Call or WhatsApp", value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Clock, label: "Hours", value: CONTACT.hours },
    { icon: MapPin, label: "Based in", value: CONTACT.location },
  ];

  return (
    <>
      <section data-bg="#F6DCD3" className="pb-24 pt-[calc(var(--ann-h)+var(--nav-h)+2.5rem)] md:pb-32 md:pt-[calc(var(--ann-h)+var(--nav-h)+4.5rem)]">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow className="text-ink/75">Get in touch</Eyebrow>
            <h1 className="mt-6">
              <SplitReveal as="span" play className="block font-display text-[clamp(3rem,8vw,7.4rem)] uppercase leading-[0.86]">
                Let&apos;s chat
              </SplitReveal>
              <SplitReveal as="span" play delay={0.2} className="mt-2 block font-serif text-[clamp(2rem,4vw,3.6rem)] italic leading-none text-coral-deep">
                we&apos;d love to hear from you.
              </SplitReveal>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-2">
              Tell us about your dream celebration and we&apos;ll set up a complimentary, obligation-free consultation. We aim to answer all emails within our normal business hours.
            </p>

            <ul className="mt-10 divide-y divide-line border-y border-line">
              {details.map((d) => (
                <li key={d.label} className="flex items-center gap-4 py-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper">
                    <d.icon aria-hidden className="size-4 text-coral-deep" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="micro block text-mute">{d.label}</span>
                    {d.href ? (
                      <a href={d.href} className="u-link text-lg">
                        {d.value}
                      </a>
                    ) : (
                      <span className="text-lg">{d.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <span className="micro text-mute">Follow along</span>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={`Megara on ${s.label}`} className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper">
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>

            <div className="relative mt-12 hidden aspect-[4/3] overflow-hidden rounded-[8px] lg:block">
              <Img id="meg-office-laugh" alt="Meg laughing in the Megara studio" sizes="40vw" position="50% 30%" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm key={service ?? "none"} initialService={service} />
          </div>
        </div>
      </section>
      <PageFX />
    </>
  );
}
