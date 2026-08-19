import { AboutHero } from "@/components/sections/about-hero";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SkillsOrbit } from "@/components/sections/skills-orbit";
import { Stats } from "@/components/sections/stats";
import { Timeline } from "@/components/sections/timeline";
import { siteUrl } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MD. Akhtaruzzaman | Shopify & Full Stack Developer",

  description:
    "Learn about MD. Akhtaruzzaman, the developer behind AKHTAR DEV, specializing in Shopify development, custom themes and apps, WordPress, React, Next.js, and modern web development.",

  alternates: {
    canonical: `${siteUrl}/about`,
  },

  openGraph: {
    title: "About MD. Akhtaruzzaman | Shopify & Full Stack Developer",

    description:
      "Learn about MD. Akhtaruzzaman, a Shopify and full stack web developer specializing in Shopify themes, apps, WordPress, React, and Next.js.",

    url: `${siteUrl}/about`,

    siteName: "AKHTAR DEV",

    type: "profile",
  },

  twitter: {
    card: "summary",

    title: "About MD. Akhtaruzzaman | AKHTAR DEV",

    description:
      "Learn about MD. Akhtaruzzaman, Shopify and full stack web developer behind AKHTAR DEV.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main className="pt-0">
      {/* About Hero */}
      <AboutHero />

      {/* About Preview */}
      {/* <AboutPreview /> */}

      {/* Professional Stats */}
      <Stats />

      {/* Experience Timeline */}
      <Timeline />

      {/* Skills */}
      <SkillsOrbit />

      {/* Contact CTA */}
      <ContactCTA />
    </main>
  );
}
