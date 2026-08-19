import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { apiFetch } from "@/lib/api";

import { ServiceCapabilities } from "@/components/sections/service-single/service-capabilities";
import { ServiceDevelopment } from "@/components/sections/service-single/service-development";
import { ServiceFAQ } from "@/components/sections/service-single/service-faq";
import { ServiceHero } from "@/components/sections/service-single/service-hero";
import { ServiceProcess } from "@/components/sections/service-single/service-process";
import { ServiceProjectTypes } from "@/components/sections/service-single/service-project-types";
import { ServiceTechnologyStack } from "@/components/sections/service-single/service-technology-stack";
import { ServiceValueStrip } from "@/components/sections/service-single/service-value-strip";
import { ServiceWhyUs } from "@/components/sections/service-single/service-why-us";

/* =========================================================
   SERVICE TYPE
   ========================================================= */

type Service = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  subtitle?: string;
};

/* =========================================================
   GET ALL SERVICES
   ========================================================= */

async function getServices(): Promise<Service[]> {
  try {
    const data = await apiFetch<Service[]>("/services");

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/* =========================================================
   GET SINGLE SERVICE
   ========================================================= */

async function getService(slug: string): Promise<Service | null> {
  try {
    const services = await getServices();

    const service = services.find(
      (item) => item.slug?.toLowerCase() === slug.toLowerCase(),
    );

    return service ?? null;
  } catch {
    return null;
  }
}

/* =========================================================
   STATIC PARAMS
   ========================================================= */

export async function generateStaticParams() {
  const services = await getServices();

  return services
    .filter((service) => service.slug)
    .map((service) => ({
      slug: service.slug,
    }));
}

/* =========================================================
   METADATA
   ========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const title = service.title || "Professional Web Development Services";

  const description =
    service.description ||
    service.subtitle ||
    `Professional ${title} services by AKHTAR DEV.`;

  return {
    title,

    description,

    alternates: {
      canonical: `/services/${service.slug}`,
    },

    openGraph: {
      title: `${title} | AKHTAR DEV`,
      description,
      url: `/services/${service.slug}`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | AKHTAR DEV`,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================================================
   PAGE
   ========================================================= */

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="overflow-hidden pt-16 pb-24 lg:pt-20 lg:pb-32">
      <ServiceHero slug={slug} />
      <ServiceValueStrip slug={slug} />
      <ServiceCapabilities slug={slug} />
      <ServiceDevelopment slug={slug} />
      <ServiceWhyUs slug={slug} />
      <ServiceTechnologyStack slug={slug} />
      <ServiceProcess slug={slug} />
      <ServiceProjectTypes slug={slug} />
      <ServiceFAQ slug={slug} />
    </main>
  );
}
