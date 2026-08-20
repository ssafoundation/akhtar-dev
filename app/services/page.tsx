import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/contact-cta";
import { PageVisual } from "@/components/sections/page-visual";
import { Process } from "@/components/sections/process";
import { ServicesGrid } from "@/components/sections/services-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import { siteUrl } from "@/lib/utils";

type ServicesHero = {
  eyebrow: string;
  heading: string;
  description: string;
};

type ServicesPageResponse = {
  hero: ServicesHero;
};

/**
 * Services Page SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  let data: ServicesPageResponse | null = null;

  try {
    data = await apiFetch<ServicesPageResponse>("/services-page");
  } catch (error) {
    console.error("Failed to load services SEO data:", error);
  }

  const hero = data?.hero;

  const title = "Shopify & Web Development Services | AKHTAR LABS";

  const description =
    hero?.description?.trim() ||
    "Professional Shopify development, custom Shopify themes and apps, WordPress, Wix, React, and Next.js development services for modern digital brands.";

  return {
    title,

    description,

    alternates: {
      canonical: `${siteUrl}/services`,
    },

    openGraph: {
      title,
      description,
      url: `${siteUrl}/services`,
      siteName: "AKHTAR LABS",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

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
