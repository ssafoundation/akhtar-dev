import {
  Braces,
  Bug,
  Code2,
  Database,
  Gauge,
  Globe,
  Layout,
  Monitor,
  PenTool,
  PlugZap,
  Server,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

type Service = {
  id: number;
  title: string;
  description: string;
  subtitle?: string;
  slug?: string;
  // Support multiple possible API field names
  iconName?: string;
  icon_name?: string;
  icon?: string | null;

  featured?: boolean;
};

type ServicesSection = {
  eyebrow: string;
  heading: string;
  subtitle: string;
};

/**
 * Lucide icon mapping
 */
const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  ShoppingCart,
  Code2,
  Braces,
  Layout,
  Globe,
  PenTool,
  Gauge,
  Bug,
  PlugZap,
  Database,
  Server,
  Monitor,
  Smartphone,
  Settings,
};

/**
 * Decode WordPress HTML entities
 *
 * Example:
 * React &#038; Next.js
 * ↓
 * React & Next.js
 */
function decodeHtmlEntities(value: string = "") {
  return value
    .replace(/&#038;/gi, "&")
    .replace(/&#38;/gi, "&")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

/**
 * Get icon name from API
 */
function getIconName(service: Service) {
  return service.iconName || service.icon_name || service.icon || "Code2";
}

/**
 * Get Lucide icon
 */
function getServiceIcon(service: Service): LucideIcon {
  const iconName = getIconName(service);

  return iconMap[iconName] || Code2;
}

export async function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const [services, section] = await Promise.all([
    apiFetch<Service[]>("/services"),
    apiFetch<ServicesSection>("/sections/services"),
  ]);

  return (
    <section
      className={
        compact ? "py-10 overflow-hidden" : "section-pad overflow-hidden"
      }
    >
      <div className="container-shell">
        {!compact ? (
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.heading}
            description={section.subtitle}
          />
        ) : null}

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service);

            const title = decodeHtmlEntities(service.title);

            const description = decodeHtmlEntities(
              service.description?.replace(/<[^>]*>/g, "") || "",
            );

            const subtitle = service.subtitle
              ? decodeHtmlEntities(service.subtitle)
              : "";

            return (
              <Reveal key={service.id || service.title} delay={index * 0.04}>
                <Link href={`/services/${service.slug}`}>
                  <Card tilt className="h-full p-7">
                    {/* ICON */}
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>

                    {/* TITLE */}
                    <h3 className="headline mt-8 text-2xl font-semibold">
                      {title}
                    </h3>

                    {/* SUBTITLE */}
                    {subtitle ? (
                      <p className="mt-2 text-sm font-medium text-accent">
                        {subtitle}
                      </p>
                    ) : null}

                    {/* DESCRIPTION */}
                    <p className="mt-4 leading-7 text-muted">{description}</p>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
