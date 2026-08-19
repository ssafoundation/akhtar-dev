import {
  Activity,
  BarChart3,
  Braces,
  Bug,
  Code2,
  Database,
  Gauge,
  Globe,
  Layers,
  Layout,
  Monitor,
  PenTool,
  Plug,
  PlugZap,
  Rocket,
  Server,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Target,
  Terminal,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { apiFetch } from "@/lib/api";

/* =========================================================
   TYPES
   ========================================================= */

type TechnologyItem = {
  name?: string | null;
  label?: string | null;
  icon?: string | null;
  url?: string | null;
};

type TechnologyStackSection = {
  enabled?: number | boolean | string | null;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  items?: TechnologyItem[] | null;
};

type ServiceResponse = {
  id: number;
  title: string;
  slug: string;

  sections?: {
    technology_stack?: TechnologyStackSection | null;
    technologyStack?: TechnologyStackSection | null;
  } | null;
};

type Props = {
  slug: string;
};

/* =========================================================
   ICON MAP
   ========================================================= */

const iconMap: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  Braces,
  Bug,
  Code2,
  Database,
  Gauge,
  Globe,
  Layers,
  Layout,
  Monitor,
  PenTool,
  Plug,
  PlugZap,
  Rocket,
  Server,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Target,
  Terminal,
  TrendingUp,
};

/* =========================================================
   HELPERS
   ========================================================= */

function clean(value?: string | null): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/gi, "&")
    .replace(/&#038;/gi, "&")
    .replace(/&#38;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .trim();
}

function isEnabled(value?: number | boolean | string | null): boolean {
  /*
   * Backend থেকে enabled না এলে
   * section default হিসেবে ON থাকবে।
   */

  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  const normalized = value.trim().toLowerCase();

  return !["0", "false", "off", "no", "disabled"].includes(normalized);
}

function getIcon(iconName?: string | null): LucideIcon {
  const name = clean(iconName);

  return iconMap[name] || Code2;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export async function ServiceTechnologyStack({ slug }: Props) {
  let service: ServiceResponse | null = null;

  /* =======================================================
     FETCH SERVICE
     ======================================================= */

  try {
    service = await apiFetch<ServiceResponse>(`/services/${slug}`);
  } catch (error) {
    console.error(`Failed to load Technology Stack for "${slug}":`, error);

    return null;
  }

  if (!service) {
    return null;
  }

  /* =======================================================
     GET SECTION
     ======================================================= */

  const section =
    service.sections?.technology_stack ??
    service.sections?.technologyStack ??
    null;

  if (!section) {
    return null;
  }

  /* =======================================================
     GET ITEMS
     ======================================================= */

  const items = Array.isArray(section.items) ? section.items : [];

  /* =======================================================
     ENABLE / EMPTY CHECK
     ======================================================= */

  if (!isEnabled(section.enabled) || items.length === 0) {
    return null;
  }

  /* =======================================================
     SECTION CONTENT
     ======================================================= */

  const eyebrow = clean(section.eyebrow);
  const title = clean(section.title);
  const description = clean(section.description);

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="border-y border-white/10 bg-elevated/35">
      <div className="container-shell py-16">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="max-w-xl">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className="headline mt-3 text-2xl font-semibold sm:text-3xl">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
            )}
          </div>

          {/* =================================================
              TECHNOLOGY ITEMS
          ================================================= */}

          <div className="flex flex-wrap gap-2 md:max-w-2xl md:justify-end">
            {items.map((tech, index) => {
              const name =
                clean(tech.name) || clean(tech.label) || "Technology";

              const iconName = clean(tech.icon);
              const Icon = getIcon(iconName);

              const content = (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.02]
                    px-3.5
                    py-1.5
                    text-xs
                    text-muted
                    transition-colors
                    duration-300
                    hover:border-accent/25
                    hover:text-foreground
                  "
                >
                  {iconName && <Icon className="h-3.5 w-3.5 text-accent" />}

                  {name}
                </span>
              );

              const url = clean(tech.url);

              /* =================================================
                 EXTERNAL / CUSTOM URL
              ================================================= */

              if (url) {
                return (
                  <Link
                    key={`${name}-${index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </Link>
                );
              }

              /* =================================================
                 NO URL
              ================================================= */

              return <span key={`${name}-${index}`}>{content}</span>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
