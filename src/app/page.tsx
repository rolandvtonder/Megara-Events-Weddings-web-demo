import { BrandExperiences } from "@/components/home/BrandExperiences";
import { Chapters } from "@/components/home/Chapters";
import { FreebieBand } from "@/components/home/FreebieBand";
import { Hero } from "@/components/home/Hero";
import { LoveNotes } from "@/components/home/LoveNotes";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { MeetMeg } from "@/components/home/MeetMeg";
import { PackagePicker } from "@/components/home/PackagePicker";
import { Pillars } from "@/components/home/Pillars";
import { Process } from "@/components/home/Process";
import { Signatures } from "@/components/home/Signatures";
import { CTABand } from "@/components/ui/Sections";
import { PageFX } from "@/components/ui/ScrollFX";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Pillars />
      <Signatures />
      <MeetMeg />
      <PackagePicker />
      <BrandExperiences />
      <Process />
      <Chapters />
      <LoveNotes />
      <FreebieBand />
      <CTABand />
      <PageFX />
    </>
  );
}
