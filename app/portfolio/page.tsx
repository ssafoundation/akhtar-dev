import { ContactCTA } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { PageVisual } from "@/components/sections/page-visual";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import type { Metadata } from "next";

type PortfolioHero = {
  eyebrow: string;
  heading: string;
  description: string;
};

type PortfolioResponse = {
  hero: PortfolioHero;
};

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected web development projects, eCommerce builds, and digital experiences by AKHTAR DEV.",
};

export default async function PortfolioPage() {
  const portfolio = await apiFetch<PortfolioResponse>("/portfolio");

  return (
    <main className="pt-32">
      {/* Portfolio Hero */}
      <section className="section-pad pb-2">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_0.75fr] lg:items-center">
          <SectionHeading
            eyebrow={portfolio.hero?.eyebrow || "Portfolio"}
            title={
              portfolio.hero?.heading ||
              "Selected work designed to raise perceived value."
            }
            description={
              portfolio.hero?.description ||
              "A curated set of realistic premium case studies showing eCommerce, SaaS, and CMS delivery."
            }
          />

          <PageVisual variant="portfolio" />
        </div>
      </section>

      {/* Featured / All Projects */}
      <FeaturedProjects all />

      <ContactCTA />
    </main>
  );
}
