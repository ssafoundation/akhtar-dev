import { ArrowRight, ChevronRight, Terminal } from "lucide-react";

import Link from "next/link";

import { apiFetch } from "@/lib/api";

/* =========================================================
   TYPES
   ========================================================= */

type HeroMetric = {
  value?: string;
  label?: string;
};

type HeroSection = {
  enabled?: number | boolean | string | null;

  eyebrow?: string;

  title?: string;

  description?: string;

  primary_text?: string;

  primary_url?: string;

  secondary_text?: string;

  secondary_url?: string;

  visual_enabled?: number | boolean | string | null;

  visual_label?: string;

  visual_code?: string[];

  metrics?: HeroMetric[];
};

type Service = {
  id: number;

  title: string;

  slug: string;

  description?: string;

  subtitle?: string;

  sections?: {
    hero?: HeroSection | null;
  } | null;
};

type Props = {
  slug: string;
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
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  const normalized = value.toString().trim().toLowerCase();

  return !["0", "false", "off", "no", "disabled"].includes(normalized);
}

/* =========================================================
   COMPONENT
   ========================================================= */

export async function ServiceHero({ slug }: Props) {
  let service: Service | null = null;

  try {
    service = await apiFetch<Service>(`/services/${slug}`);
  } catch {
    return null;
  }

  if (!service) {
    return null;
  }

  const hero = service.sections?.hero;

  /*
   * Hero section-এর enabled false হলে
   * পুরো section render হবে না।
   */

  if (!isEnabled(hero?.enabled)) {
    return null;
  }

  /* =======================================================
     HERO DATA
     ======================================================= */

  const serviceTitle = clean(service.title) || "Professional Web Development";

  const heroEyebrow = clean(hero?.eyebrow) || serviceTitle;

  const heroTitle = clean(hero?.title) || serviceTitle;

  const heroDescription =
    clean(hero?.description) ||
    clean(service.description) ||
    clean(service.subtitle);

  const primaryText = clean(hero?.primary_text) || "Start a Project";

  const primaryUrl = clean(hero?.primary_url) || "/contact";

  const secondaryText = clean(hero?.secondary_text) || "View Portfolio";

  const secondaryUrl = clean(hero?.secondary_url) || "/portfolio";

  const visualLabel = clean(hero?.visual_label) || "service.tsx";

  const visualCode = Array.isArray(hero?.visual_code) ? hero.visual_code : [];

  const metrics = Array.isArray(hero?.metrics) ? hero.metrics : [];

  const showVisual =
    hero?.visual_enabled === undefined || isEnabled(hero.visual_enabled);

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="section-pad pb-20 md:pb-24">
      <div className="container-shell">
        {/* =================================================
            BREADCRUMB
            ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex flex-wrap items-center gap-1.5 text-sm text-muted"
        >
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>

          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />

          <Link
            href="/services"
            className="transition-colors hover:text-accent"
          >
            Services
          </Link>

          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />

          <span className="text-foreground">{serviceTitle}</span>
        </nav>

        {/* =================================================
            HERO GRID
            ================================================= */}

        <div
          className={
            showVisual
              ? "grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16"
              : "block"
          }
        >
          {/* =================================================
              CONTENT
              ================================================= */}

          <div>
            {/* EYEBROW */}

            {heroEyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                {heroEyebrow}
              </p>
            )}

            {/* TITLE */}

            {heroTitle && (
              <h1 className="headline mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.4rem]">
                {heroTitle}
              </h1>
            )}

            {/* DESCRIPTION */}

            {heroDescription && (
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {heroDescription}
              </p>
            )}

            {/* BUTTONS */}

            {(primaryText || secondaryText) && (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {primaryText && (
                  <Link
                    href={primaryUrl}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-accent px-5 py-3 text-sm font-semibold text-obsidian transition-all duration-300 hover:brightness-110"
                  >
                    {primaryText}

                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}

                {secondaryText && (
                  <Link
                    href={secondaryUrl}
                    className="inline-flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.04]"
                  >
                    {secondaryText}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* =================================================
              VISUAL
              ================================================= */}

          {showVisual && (
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-full bg-accent/[0.035] blur-3xl"
              />

              <div className="overflow-hidden rounded-[8px] border border-white/10 bg-elevated shadow-premium">
                {/* WINDOW HEADER */}

                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Terminal className="h-3.5 w-3.5 text-accent" />

                    <span className="font-mono">{visualLabel}</span>
                  </div>
                </div>

                {/* CODE */}

                {visualCode.length > 0 && (
                  <div className="space-y-2.5 px-5 py-7 font-mono text-xs leading-relaxed sm:text-[13px]">
                    {visualCode.map((line, index) => (
                      <p
                        key={`${index}-${line}`}
                        className={
                          index === 0 || index === visualCode.length - 1
                            ? ""
                            : "pl-4"
                        }
                      >
                        <span className="text-muted">{line}</span>
                      </p>
                    ))}
                  </div>
                )}

                {/* METRICS */}

                {metrics.length > 0 && (
                  <div className="grid grid-cols-3 border-t border-white/10">
                    {metrics.slice(0, 3).map((metric, index) => (
                      <div
                        key={`${metric.label || "metric"}-${index}`}
                        className="border-r border-white/10 px-3 py-5 text-center last:border-r-0"
                      >
                        <p className="headline text-xl font-semibold text-accent">
                          {clean(metric.value) || "—"}
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                          {clean(metric.label) || "Metric"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
