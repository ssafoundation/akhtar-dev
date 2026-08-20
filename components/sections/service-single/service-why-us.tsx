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

import { apiFetch } from "@/lib/api";

/* =========================================================
   TYPES
   ========================================================= */

type WhyUsItem = {
  icon?: string | null;

  title?: string | null;
  label?: string | null;
  name?: string | null;

  description?: string | null;
  desc?: string | null;
};

type WhyUsSection = {
  enabled?: number | boolean | string | null;

  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;

  items?: WhyUsItem[] | null;
};

type ServiceResponse = {
  id: number;
  title: string;
  slug: string;

  sections?: {
    why_us?: WhyUsSection | null;
    whyUs?: WhyUsSection | null;
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
   * enabled না থাকলে section ON থাকবে।
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

export async function ServiceWhyUs({ slug }: Props) {
  let service: ServiceResponse | null = null;

  try {
    service = await apiFetch<ServiceResponse>(`/services/${slug}`);
  } catch (error) {
    console.error(`Failed to load Why Us section for "${slug}":`, error);

    return null;
  }

  if (!service) {
    return null;
  }

  /* =======================================================
     GET WHY US SECTION
     ======================================================= */

  const section = service.sections?.why_us ?? service.sections?.whyUs ?? null;

  if (!section) {
    return null;
  }

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
    <section className="section-pad">
      <div className="container-shell">
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
            WHY US ITEMS
        ================================================= */}

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);

            const itemTitle =
              clean(item.title) ||
              clean(item.label) ||
              clean(item.name) ||
              "Why AKHTAR LABS";

            const itemDescription = clean(item.description) || clean(item.desc);

            return (
              <div
                key={`${itemTitle}-${index}`}
                className="rounded-[8px] border border-white/10 bg-elevated p-5"
              >
                {/* ICON */}

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/15 bg-accent/[0.04] text-accent">
                  <Icon className="h-4 w-4" />
                </div>

                {/* TITLE */}

                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {itemTitle}
                </h3>

                {/* DESCRIPTION */}

                {itemDescription && (
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {itemDescription}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
