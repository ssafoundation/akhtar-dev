"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type SectionSettings = {
  eyebrow: string;
  heading: string;
  subtitle: string;
};

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

export function FAQ() {
  const [section, setSection] = useState<SectionSettings>({
    eyebrow: "",
    heading: "",
    subtitle: "",
  });

  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [sectionData, faqData] = await Promise.all([
          apiFetch<SectionSettings>("/sections/faqs"),
          apiFetch<FAQItem[]>("/faqs"),
        ]);

        setSection(sectionData);
        setFaqs(faqData);
      } catch (error) {
        console.error("Failed to load FAQ data:", error);
      }
    }

    loadData();
  }, []);

  return (
    <section className="section-pad border-y border-accent/10 bg-black/20">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {/* FAQ HEADING */}
        <div className="sticky top-32 self-start">
          <SectionHeading
            eyebrow={section.eyebrow || "FAQ"}
            title={section.heading || "A few answers before the first call."}
            description={section.subtitle}
          />
        </div>

        {/* FAQ ITEMS */}
        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isActive = active === index;

            return (
              <button
                key={item.id || item.question}
                type="button"
                onClick={() => setActive(isActive ? -1 : index)}
                className={cn(
                  "w-full rounded-[8px] border bg-elevated/70 p-5 text-left",
                  "transition-all duration-300",
                  "backdrop-blur-sm",
                  "hover:border-accent/40 hover:bg-elevated",
                  isActive
                    ? "border-accent/30 bg-elevated shadow-[0_0_30px_rgba(148,195,61,0.04)]"
                    : "border-white/10",
                )}
                aria-expanded={isActive}
              >
                <span className="flex items-center justify-between gap-5">
                  <span className="headline text-xl font-semibold">
                    {item.question}
                  </span>

                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                      "border border-accent/20",
                      "bg-accent/[0.06]",
                      "transition-all duration-300",
                      isActive && "border-accent/40 bg-accent/[0.12]",
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-accent transition-transform duration-300",
                        isActive && "rotate-180",
                      )}
                    />
                  </span>
                </span>

                {isActive && (
                  <span className="mt-4 block border-t border-accent/10 pt-4 leading-7 text-muted">
                    {item.answer?.replace(/<[^>]*>/g, "")}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
