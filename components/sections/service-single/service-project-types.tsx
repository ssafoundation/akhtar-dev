import {
  Activity,
  ArrowRight,
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

type ProjectTypeItem = {
  title?: string | null;
  label?: string | null;
  name?: string | null;

  icon?: string | null;

  url?: string | null;
};

type ProjectTypesSection = {
  enabled?: number | boolean | string | null;

  eyebrow?: string | null;

  title?: string | null;

  description?: string | null;

  items?: ProjectTypeItem[] | null;
};

type ServiceResponse = {
  id: number;

  title: string;

  slug: string;

  sections?: {
    project_types?: ProjectTypesSection | null;
    projectTypes?: ProjectTypesSection | null;
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
  ArrowRight,
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

export async function ServiceProjectTypes({ slug }: Props) {
  let service: ServiceResponse | null = null;

  /* =======================================================
     FETCH SERVICE
     ======================================================= */

  try {
    service = await apiFetch<ServiceResponse>(`/services/${slug}`);
  } catch (error) {
    console.error(`Failed to load Project Types for "${slug}":`, error);

    return null;
  }

  if (!service) {
    return null;
  }

  /* =======================================================
     GET SECTION
     ======================================================= */

  const section =
    service.sections?.project_types ?? service.sections?.projectTypes ?? null;

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
      <div className="container-shell section-pad">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
          )}

          {title && (
            <h2 className="headline mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
              {description}
            </p>
          )}
        </div>

        {/* =================================================
            PROJECT TYPES
        ================================================= */}

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const itemTitle =
              clean(item.title) ||
              clean(item.label) ||
              clean(item.name) ||
              "Project Type";

            const iconName = clean(item.icon);

            const Icon = getIcon(iconName);

            const content = (
              <div
                className="
                  group
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-[8px]
                  border
                  border-white/10
                  bg-elevated
                  px-4
                  py-4
                  transition-all
                  duration-300
                  hover:border-accent/25
                  hover:shadow-premium
                "
              >
                {/* =================================================
                    TITLE + ICON
                ================================================= */}

                <span
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                    text-sm
                    text-muted
                    transition-colors
                    duration-300
                    group-hover:text-foreground
                  "
                >
                  {iconName && (
                    <Icon className="h-4 w-4 shrink-0 text-accent" />
                  )}

                  <span className="truncate">{itemTitle}</span>
                </span>

                {/* =================================================
                    ARROW
                ================================================= */}

                <ArrowRight
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-accent
                    opacity-50
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:opacity-100
                  "
                />
              </div>
            );

            const url = clean(item.url);

            /* =================================================
               URL
            ================================================= */

            if (url) {
              return (
                <Link key={`${itemTitle}-${index}`} href={url}>
                  {content}
                </Link>
              );
            }

            /* =================================================
               WITHOUT URL
            ================================================= */

            return <div key={`${itemTitle}-${index}`}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
