"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-pad border-y border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="A few answers before the first call."
        />
        <div className="space-y-3">
          {faqs.map((item, index) => (
            <button
              key={item.question}
              type="button"
              onClick={() => setActive(index)}
              className="w-full rounded-[8px] border border-white/10 bg-panel/70 p-5 text-left transition hover:border-accent/40"
              aria-expanded={active === index}
            >
              <span className="flex items-center justify-between gap-5">
                <span className="headline text-xl font-semibold text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-accent transition",
                    active === index && "rotate-180",
                  )}
                />
              </span>
              {active === index ? (
                <span className="mt-4 block leading-7 text-muted">
                  {item.answer}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
