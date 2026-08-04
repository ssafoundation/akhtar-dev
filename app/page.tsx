import { AboutPreview } from "@/components/sections/about-preview";
import { ContactCTA } from "@/components/sections/contact-cta";
import { FAQ } from "@/components/sections/faq";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { ServicesGrid } from "@/components/sections/services-grid";
import { SkillsOrbit } from "@/components/sections/skills-orbit";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Timeline } from "@/components/sections/timeline";
import { TrustedTech } from "@/components/sections/trusted-tech";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustedTech />
      <FeaturedProjects />
      <ServicesGrid />
      <Process />
      <Timeline />
      <Stats />
      <AboutPreview />
      <SkillsOrbit />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
