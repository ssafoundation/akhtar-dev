import { apiFetch } from "@/lib/api";

/* =========================================================
   TYPES
   ========================================================= */

type FAQItem = {
  question?: string | null;
  answer?: string | null;
};

type FAQSection = {
  enabled?: number | boolean | string | null;

  eyebrow?: string | null;

  title?: string | null;

  description?: string | null;

  items?: FAQItem[] | null;
};

type ServiceResponse = {
  id: number;

  title: string;

  slug: string;

  sections?: {
    faq?: FAQSection | null;
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

export async function ServiceFAQ({ slug }: Props) {
  let service: ServiceResponse | null = null;

  /* =======================================================
     FETCH SERVICE
     ======================================================= */

  try {
    service = await apiFetch<ServiceResponse>(`/services/${slug}`);
  } catch (error) {
    console.error(`Failed to load FAQ section for "${slug}":`, error);

    return null;
  }

  if (!service) {
    return null;
  }

  /* =======================================================
     GET FAQ SECTION
     ======================================================= */

  const section = service.sections?.faq ?? null;

  if (!section) {
    return null;
  }

  /* =======================================================
     GET FAQ ITEMS
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
    <section className="section-pad">
      <div className="container-shell">
        {/* =================================================
            HEADER
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
            FAQ LIST
        ================================================= */}

        <div className="mt-10 max-w-4xl divide-y divide-white/10 border-y border-white/10">
          {items.map((item, index) => {
            const question = clean(item.question);

            const answer = clean(item.answer);

            /*
             * Question না থাকলে
             * invalid FAQ render করবে না।
             */

            if (!question) {
              return null;
            }

            return (
              <details
                key={`${question}-${index}`}
                className="
                  group
                  py-5
                  [&_summary::-webkit-details-marker]:hidden
                "
              >
                {/* =================================================
                    QUESTION
                ================================================= */}

                <summary
                  className="
                    flex
                    cursor-pointer
                    list-none
                    items-center
                    justify-between
                    gap-4
                    text-sm
                    font-medium
                    text-foreground
                    marker:content-none
                  "
                >
                  <span>{question}</span>

                  {/* =================================================
                      PLUS / MINUS ICON
                  ================================================= */}

                  <span className="relative h-4 w-4 shrink-0 text-muted">
                    {/* Horizontal */}

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="h-px w-3 bg-current" />
                    </span>

                    {/* Vertical */}

                    <span
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        transition-transform
                        duration-200
                        group-open:rotate-90
                      "
                    >
                      <span className="h-3 w-px bg-current" />
                    </span>
                  </span>
                </summary>

                {/* =================================================
                    ANSWER
                ================================================= */}

                {answer && (
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                    {answer}
                  </p>
                )}
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
