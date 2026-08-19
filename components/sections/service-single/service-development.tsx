import { Check } from "lucide-react";

import { apiFetch } from "@/lib/api";

type DevelopmentItem = {
  text?: string | null;
  title?: string | null;
  label?: string | null;
  name?: string | null;
};

type DevelopmentSection = {
  enabled?: number | boolean | string | null;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  items?: DevelopmentItem[] | null;
};

type ServiceResponse = {
  id: number;
  title: string;
  slug: string;

  sections?: {
    development?: DevelopmentSection | null;
  } | null;
};

type Props = {
  slug: string;
};

/* =========================================================
   HELPERS
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

/* =========================================================
   COMPONENT
   ========================================================= */

export async function ServiceDevelopment({ slug }: Props) {
  let service: ServiceResponse | null = null;

  try {
    service = await apiFetch<ServiceResponse>(`/services/${slug}`);
  } catch (error) {
    console.error(`Failed to load development section for "${slug}":`, error);

    return null;
  }

  if (!service) {
    return null;
  }

  /* =======================================================
     GET DEVELOPMENT SECTION
     ======================================================= */

  const section = service.sections?.development;

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
     CLEAN SECTION CONTENT
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
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* =================================================
              SECTION CONTENT
          ================================================= */}

          <div>
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
              <p className="mt-6 max-w-xl text-base leading-8 text-muted">
                {description}
              </p>
            )}
          </div>

          {/* =================================================
              DEVELOPMENT ITEMS
          ================================================= */}

          <div className="grid gap-x-10 sm:grid-cols-2">
            {items.map((item, index) => {
              const text =
                clean(item.text) ||
                clean(item.title) ||
                clean(item.label) ||
                clean(item.name);

              if (!text) {
                return null;
              }

              return (
                <div
                  key={`${text}-${index}`}
                  className="flex items-center gap-3 border-b border-white/[0.07] py-4"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/[0.08]">
                    <Check className="h-3 w-3 text-accent" />
                  </span>

                  <span className="text-sm text-muted">{text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
