import {
  BarChart3,
  Braces,
  CircleDollarSign,
  Layers3,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

type VisualItem = {
  label: string;
  value: string;
  icon: string;
  progress: number;
};

type VisualStep = {
  label: string;
  number: string;
};

type PageVisualData = {
  eyebrow: string;
  title: string;
  items: VisualItem[];
  steps: VisualStep[];
};

type PortfolioResponse = {
  visual?: PageVisualData;
};

type ServicesPageResponse = {
  visual?: PageVisualData;
};

const iconMap = {
  BarChart3,
  Braces,
  CircleDollarSign,
  Layers3,
  SearchCheck,
  ShieldCheck,
};

function getIcon(iconName?: string) {
  if (!iconName) {
    return Layers3;
  }

  return iconMap[iconName as keyof typeof iconMap] || Layers3;
}

const fallbackPortfolio: PageVisualData = {
  eyebrow: "Case study system",
  title: "Project pipeline",

  items: [
    {
      label: "Shopify",
      value: "Storefront UX",
      icon: "CircleDollarSign",
      progress: 82,
    },
    {
      label: "Next.js",
      value: "Launch pages",
      icon: "Layers3",
      progress: 87,
    },
    {
      label: "WordPress",
      value: "Editorial CMS",
      icon: "SearchCheck",
      progress: 92,
    },
  ],

  steps: [
    {
      label: "Strategy",
      number: "01",
    },
    {
      label: "Interface",
      number: "02",
    },
    {
      label: "Launch",
      number: "03",
    },
  ],
};

const fallbackServices: PageVisualData = {
  eyebrow: "Build architecture",
  title: "Premium delivery map",

  items: [
    {
      label: "Design",
      value: "Visual hierarchy",
      icon: "Layers3",
      progress: 82,
    },
    {
      label: "Code",
      value: "Typed components",
      icon: "Braces",
      progress: 87,
    },
    {
      label: "Growth",
      value: "SEO + speed",
      icon: "BarChart3",
      progress: 92,
    },
  ],

  steps: [
    {
      label: "Strategy",
      number: "01",
    },
    {
      label: "Interface",
      number: "02",
    },
    {
      label: "Launch",
      number: "03",
    },
  ],
};

const fallbackPrivacy: PageVisualData = {
  eyebrow: "Trust layer",
  title: "Clean data handling",

  items: [
    {
      label: "Forms",
      value: "Minimal collection",
      icon: "ShieldCheck",
      progress: 82,
    },
    {
      label: "Analytics",
      value: "Performance signals",
      icon: "BarChart3",
      progress: 87,
    },
    {
      label: "Access",
      value: "Deletion on request",
      icon: "SearchCheck",
      progress: 92,
    },
  ],

  steps: [
    {
      label: "Collection",
      number: "01",
    },
    {
      label: "Protection",
      number: "02",
    },
    {
      label: "Control",
      number: "03",
    },
  ],
};

export async function PageVisual({
  variant,
  className,
}: {
  variant: "portfolio" | "services" | "privacy";
  className?: string;
}) {
  let visual: PageVisualData;

  if (variant === "portfolio") {
    try {
      const response = await apiFetch<PortfolioResponse>("/portfolio");

      visual = response?.visual || fallbackPortfolio;
    } catch (error) {
      console.error("Failed to load portfolio visual:", error);

      visual = fallbackPortfolio;
    }
  } else if (variant === "services") {
    try {
      const response = await apiFetch<ServicesPageResponse>("/services-page");

      visual = response?.visual || fallbackServices;
    } catch (error) {
      console.error("Failed to load services visual:", error);

      visual = fallbackServices;
    }
  } else {
    visual = fallbackPrivacy;
  }

  return (
    <div className={cn("relative min-h-[360px]", className)}>
      <div
        className="absolute inset-8 rounded-full bg-accent/15 blur-[76px]"
        aria-hidden="true"
      />

      <div className="premium-border relative overflow-hidden rounded-[8px] bg-panel/76 p-5 shadow-premium backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="min-w-0">
            {visual.eyebrow && (
              <p className="text-xs uppercase tracking-[0.22em] text-accent">
                {visual.eyebrow}
              </p>
            )}

            {visual.title && (
              <h2 className="headline mt-2 text-2xl font-semibold">
                {visual.title}
              </h2>
            )}
          </div>

          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-obsidian">
            AK
          </div>
        </div>

        {/* Items */}
        {Array.isArray(visual.items) && visual.items.length > 0 && (
          <div className="mt-5 space-y-3">
            {visual.items.slice(0, 3).map((item, index) => {
              const Icon = getIcon(item.icon);

              const progress = Math.min(
                100,
                Math.max(0, Number(item.progress) || 0),
              );

              return (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {item.label}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted">
                      {item.value}
                    </p>
                  </div>

                  <div className="hidden h-2 w-24 shrink-0 overflow-hidden rounded-full bg-white/10 sm:block">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-700"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Steps */}
        {Array.isArray(visual.steps) && visual.steps.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-3">
            {visual.steps.slice(0, 3).map((step, index) => (
              <div
                key={`${step.label}-${index}`}
                className="rounded-[8px] border border-white/10 bg-obsidian/60 p-3"
              >
                <p className="truncate text-[11px] uppercase tracking-[0.18em] text-muted">
                  {step.label}
                </p>

                <p className="headline mt-3 text-xl font-semibold text-white">
                  {step.number || `0${index + 1}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className="absolute -bottom-6 left-8 right-8 h-20 rounded-full bg-black/40 blur-2xl"
        aria-hidden="true"
      />
    </div>
  );
}
