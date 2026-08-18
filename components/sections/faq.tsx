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
    <section className="section-pad border-y border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {/* FAQ HEADING */}
        <SectionHeading
          eyebrow={section.eyebrow || "FAQ"}
          title={section.heading || "A few answers before the first call."}
          description={section.subtitle}
        />

        {/* FAQ ITEMS */}
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <button
              key={item.id || item.question}
              type="button"
              onClick={() => setActive(active === index ? -1 : index)}
              className="w-full rounded-[8px] border border-white/10 bg-elevated p-5 text-left transition hover:border-accent/40"
              aria-expanded={active === index}
            >
              <span className="flex items-center justify-between gap-5">
                <span className="headline text-xl font-semibold">
                  {item.question}
                </span>

                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-accent transition",
                    active === index && "rotate-180",
                  )}
                />
              </span>

              {active === index && (
                <span className="mt-4 block leading-7 text-muted">
                  {item.answer?.replace(/<[^>]*>/g, "")}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
