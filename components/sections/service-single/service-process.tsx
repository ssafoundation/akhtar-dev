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

type ProcessStep = {
  number?: string | number | null;

  icon?: string | null;

  title?: string | null;

  description?: string | null;
};

type ProcessSection = {
  enabled?: number | boolean | string | null;

  eyebrow?: string | null;

  title?: string | null;

  description?: string | null;

  steps?: ProcessStep[] | null;
};

type ServiceResponse = {
  id: number;

  title: string;

  slug: string;

  sections?: {
    process?: ProcessSection | null;
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

function clean(value?: string | number | null): string {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value)
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

export async function ServiceProcess({ slug }: Props) {
  let service: ServiceResponse | null = null;

  /* =======================================================
     FETCH SERVICE
     ======================================================= */

  try {
    service = await apiFetch<ServiceResponse>(`/services/${slug}`);
  } catch (error) {
    console.error(`Failed to load Process section for "${slug}":`, error);

    return null;
  }

  if (!service) {
    return null;
  }

  /* =======================================================
     GET PROCESS SECTION
     ======================================================= */

  const section = service.sections?.process ?? null;

  if (!section) {
    return null;
  }

  /* =======================================================
     GET STEPS
     ======================================================= */

  const steps = Array.isArray(section.steps) ? section.steps : [];

  /* =======================================================
     ENABLE / EMPTY CHECK
     ======================================================= */

  if (!isEnabled(section.enabled) || steps.length === 0) {
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
            PROCESS STEPS
        ================================================= */}

        <div className="mt-14 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = getIcon(step.icon);

            const number =
              clean(step.number) || String(index + 1).padStart(2, "0");

            const stepTitle = clean(step.title);

            const stepDescription = clean(step.description);

            return (
              <div
                key={`${number}-${stepTitle || "step"}-${index}`}
                className="relative rounded-[8px] border border-white/10 bg-elevated p-5"
              >
                {/* =================================================
                    TOP ROW
                ================================================= */}

                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-medium text-accent">
                    {number}
                  </span>

                  {clean(step.icon) && (
                    <Icon className="h-4 w-4 text-accent/80" />
                  )}
                </div>

                {/* =================================================
                    TITLE
                ================================================= */}

                {stepTitle && (
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {stepTitle}
                  </h3>
                )}

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                {stepDescription && (
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {stepDescription}
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
