import { AboutPreview } from "@/components/sections/about-preview";
import { ContactCTA } from "@/components/sections/contact-cta";
import { ProjectLaptopShowcase } from "@/components/sections/project-laptop-showcase";
import { SkillsOrbit } from "@/components/sections/skills-orbit";
import { Stats } from "@/components/sections/stats";
import { Timeline } from "@/components/sections/timeline";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About MD. Akhtaruzzaman, the developer behind AKHTAR DEV.",
};

export default function AboutPage() {
  return (
    <main className="pt-32">
      <section className="section-pad pb-8">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="About AKHTAR DEV"
            title="Senior frontend taste with full-stack delivery discipline."
            description="MD. Akhtaruzzaman helps brands move from ordinary web presence to premium digital experience across Shopify, WordPress, Wix, React, and Next.js."
          />
          <ProjectLaptopShowcase compact />
        </div>
      </section>
      <AboutPreview />
      <Stats />
      <Timeline />
      <SkillsOrbit />
      <ContactCTA />
    </main>
  );
}
