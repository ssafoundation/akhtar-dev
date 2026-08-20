import { ContactCTA } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { PageVisual } from "@/components/sections/page-visual";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import { siteUrl } from "@/lib/utils";
import type { Metadata } from "next";

type PortfolioHero = {
  eyebrow: string;
  heading: string;
  description: string;
};

type PortfolioResponse = {
  hero: PortfolioHero;
};

/**
 * Portfolio Page SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  let portfolio: PortfolioResponse | null = null;

  try {
    portfolio = await apiFetch<PortfolioResponse>("/portfolio");
  } catch (error) {
    console.error("Failed to load portfolio SEO data:", error);
  }

  const description =
    portfolio?.hero?.description?.trim() ||
    "Explore selected Shopify, eCommerce, WordPress, React, Next.js, and custom web development projects by AKHTAR LABS.";

  const title = "Shopify & Web Development Portfolio | AKHTAR LABS";

  return {
    title,
    description,

    alternates: {
      canonical: `${siteUrl}/portfolio`,
    },

    openGraph: {
      title,
      description,
      url: `${siteUrl}/portfolio`,
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
