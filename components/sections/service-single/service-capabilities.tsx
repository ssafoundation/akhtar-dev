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

type ContentItem = {
  icon?: string | null;
  title?: string | null;
  label?: string | null;
  name?: string | null;
  description?: string | null;
  desc?: string | null;
};

type CapabilitiesSection = {
  enabled?: number | boolean | string | null;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  items?: ContentItem[] | null;
};

type Service = {
  id: number;
  title: string;
  slug: string;

  sections?: {
    capabilities?: CapabilitiesSection | null;
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
   CLEAN
   ========================================================= */

function clean(value?: string | null): string {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/gi, "&")
    .replace(/&#038;/gi, "&")
    .replace(/&#38;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();
}

/* =========================================================
   ENABLED
   ========================================================= */

function isEnabled(value?: number | boolean | string | null): boolean {
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

/* =========================================================
   GET ICON
   ========================================================= */

function getIcon(iconName?: string | null): LucideIcon {
  const name = clean(iconName);

  return iconMap[name] || Code2;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export async function ServiceCapabilities({ slug }: Props) {
  let service: Service | null = null;

  try {
    service = await apiFetch<Service>(`/services/${slug}`);
  } catch (error) {
    console.error("ServiceCapabilities API error:", error);

    return null;
  }

  if (!service) {
    return null;
  }

  /* =======================================================
     SECTION
     ======================================================= */

  const section = service.sections?.capabilities;

  if (!section) {
    return null;
  }

  /* =======================================================
     ENABLE CHECK
     ======================================================= */

  if (!isEnabled(section.enabled)) {
    return null;
  }

  /* =======================================================
     ITEMS
     ======================================================= */

  const items = Array.isArray(section.items) ? section.items : [];

  /* =======================================================
     RENDER
     ======================================================= */
  console.log("ddddddd", service.sections);
  return (
    <section className="section-pad">
      <div className="container-shell">
        {/* ===============================================
            HEADER
        =============================================== */}

        <div className="max-w-3xl">
          {clean(section.eyebrow) && (
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {clean(section.eyebrow)}
            </p>
          )}

          {clean(section.title) && (
            <h2 className="headline mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {clean(section.title)}
            </h2>
          )}

          {clean(section.description) && (
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
              {clean(section.description)}
            </p>
          )}
        </div>

        {/* ===============================================
            ITEMS
        =============================================== */}

        {items.length > 0 && (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const Icon = getIcon(item.icon);

              const title =
                clean(item.title) ||
                clean(item.label) ||
                clean(item.name) ||
                "Capability";

              const description = clean(item.description) || clean(item.desc);

              return (
                <div
                  key={`${title}-${index}`}
                  className="
                    group
                    rounded-[8px]
                    border
                    border-white/10
                    bg-elevated
                    p-5
                    transition-all
                    duration-300
                    hover:border-accent/25
                    hover:shadow-premium
                  "
                >
                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-accent/15
                      bg-accent/[0.04]
                      text-accent
                      transition-colors
                      duration-300
                      group-hover:border-accent/30
                    "
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  {/* TITLE */}

                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {title}
                  </h3>

                  {/* DESCRIPTION */}

                  {description && (
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
