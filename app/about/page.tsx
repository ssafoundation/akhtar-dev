import { AboutHero } from "@/components/sections/about-hero";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SkillsOrbit } from "@/components/sections/skills-orbit";
import { Stats } from "@/components/sections/stats";
import { Timeline } from "@/components/sections/timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About MD. Akhtaruzzaman, the developer behind AKHTAR DEV.",
};

export default function AboutPage() {
  return (
    <main className="pt-0">
      <AboutHero />
      {/* <AboutPreview /> */}
      <Stats />
      <Timeline />
      <SkillsOrbit />
      <ContactCTA />
    </main>
  );
}
