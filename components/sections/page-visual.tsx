import { BarChart3, Braces, CircleDollarSign, Layers3, SearchCheck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  portfolio: {
    eyebrow: "Case study system",
    title: "Project pipeline",
    items: [
      { label: "Shopify", value: "Storefront UX", icon: CircleDollarSign },
      { label: "Next.js", value: "Launch pages", icon: Layers3 },
      { label: "WordPress", value: "Editorial CMS", icon: SearchCheck }
    ]
  },
  services: {
    eyebrow: "Build architecture",
    title: "Premium delivery map",
    items: [
      { label: "Design", value: "Visual hierarchy", icon: Layers3 },
      { label: "Code", value: "Typed components", icon: Braces },
      { label: "Growth", value: "SEO + speed", icon: BarChart3 }
    ]
  },
  privacy: {
    eyebrow: "Trust layer",
    title: "Clean data handling",
    items: [
      { label: "Forms", value: "Minimal collection", icon: ShieldCheck },
      { label: "Analytics", value: "Performance signals", icon: BarChart3 },
      { label: "Access", value: "Deletion on request", icon: SearchCheck }
    ]
  }
};

export function PageVisual({
  variant,
  className
}: {
  variant: keyof typeof variants;
  className?: string;
}) {
  const visual = variants[variant];

  return (
    <div className={cn("relative min-h-[360px]", className)}>
      <div className="absolute inset-8 rounded-full bg-accent/15 blur-[76px]" aria-hidden="true" />
      <div className="premium-border relative overflow-hidden rounded-[8px] bg-panel/76 p-5 shadow-premium backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">{visual.eyebrow}</p>
            <h2 className="headline mt-2 text-2xl font-semibold">{visual.title}</h2>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-sm font-bold text-obsidian">AK</div>
        </div>
        <div className="mt-5 space-y-3">
          {visual.items.map((item, index) => (
            <div key={item.label} className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs text-muted">{item.value}</p>
              </div>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                <div className={cn("h-full rounded-full bg-accent", ["w-[82%]", "w-[87%]", "w-[92%]"][index])} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {["Strategy", "Interface", "Launch"].map((item) => (
            <div key={item} className="rounded-[8px] border border-white/10 bg-obsidian/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{item}</p>
              <p className="headline mt-3 text-xl font-semibold text-white">0{item.length % 4 + 1}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-6 left-8 right-8 h-20 rounded-full bg-black/40 blur-2xl" aria-hidden="true" />
    </div>
  );
}
