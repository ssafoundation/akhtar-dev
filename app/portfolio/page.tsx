import type { Metadata } from "next";
import { ContactCTA } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { PageVisual } from "@/components/sections/page-visual";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Premium Shopify, WordPress, Wix, React, and Next.js case studies by AKHTAR DEV."
};

export default function PortfolioPage() {
  return (
    <main className="pt-32">
      <section className="section-pad pb-2">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_0.75fr] lg:items-center">
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected work designed to raise perceived value."
            description="A curated set of realistic premium case studies showing eCommerce, SaaS, and CMS delivery."
          />
          <PageVisual variant="portfolio" />
        </div>
      </section>
      <FeaturedProjects all />
      <ContactCTA />
    </main>
  );
}
