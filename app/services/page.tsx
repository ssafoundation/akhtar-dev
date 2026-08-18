import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/contact-cta";
import { PageVisual } from "@/components/sections/page-visual";
import { Process } from "@/components/sections/process";
import { ServicesGrid } from "@/components/sections/services-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Premium Shopify, landing page, WordPress, Wix, React, and Next.js development services.",
};

type ServicesHero = {
  eyebrow: string;
  heading: string;
  description: string;
};

type ServicesPageResponse = {
  hero: ServicesHero;
};

export default async function ServicesPage() {
  const data = await apiFetch<ServicesPageResponse>("/services-page");

  const hero = data?.hero;

  return (
    <main className="pt-32">
      {/* Services Hero */}
      <section className="section-pad pb-2">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_0.75fr] lg:items-center">
          <SectionHeading
            eyebrow={hero?.eyebrow || "Services"}
            title={
              hero?.heading ||
              "Elegant websites engineered for speed, trust, and revenue."
            }
            description={
              hero?.description ||
              "Choose a focused build or a complete end-to-end web experience across strategy, design direction, implementation, SEO, and launch."
            }
          />

          <PageVisual variant="services" />
        </div>
      </section>

      {/* Services */}
      <ServicesGrid compact />

      {/* Process */}
      <Process />

      {/* Contact CTA */}
      <ContactCTA />
    </main>
  );
}
