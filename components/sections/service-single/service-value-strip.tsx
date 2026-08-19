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

type ValueStripItem = {
  icon?: string | null;
  label?: string | null;
  description?: string | null;
};

type ValueStripSection = {
  enabled?: number | boolean | string | null;
  items?: ValueStripItem[] | null;
};

type Service = {
  id: number;
  title: string;
  slug: string;

  sections?: {
    value_strip?: ValueStripSection | null;
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
   CLEAN TEXT
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
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();
}

/* =========================================================
   ENABLED CHECK
   ========================================================= */

function isEnabled(value?: number | boolean | string | null): boolean {
  /*
   * Backend থেকে enabled না এলে
   * section default হিসেবে enabled থাকবে।
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
   ICON
   ========================================================= */

function getIcon(iconName?: string | null): LucideIcon {
  const name = clean(iconName);

  return iconMap[name] || Code2;
}

/* =========================================================
   SERVICE VALUE STRIP
   ========================================================= */

export async function ServiceValueStrip({ slug }: Props) {
  /* =======================================================
     GET SERVICE
     ======================================================= */

  let service: Service | null = null;

  try {
    service = await apiFetch<Service>(`/services/${slug}`);
  } catch (error) {
    console.error("ServiceValueStrip API error:", error);

    return null;
  }

  /* =======================================================
     SERVICE CHECK
     ======================================================= */

  if (!service) {
    return null;
  }

  /* =======================================================
     GET VALUE STRIP
     
     IMPORTANT:
     Backend uses:
     value_strip

     NOT:
     valueStrip
     ======================================================= */

  const section = service.sections?.value_strip;

  /* =======================================================
     GET ITEMS
     ======================================================= */

  const items = Array.isArray(section?.items) ? section.items : [];

  /* =======================================================
     SECTION CHECK
     ======================================================= */

  if (!isEnabled(section?.enabled)) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  /* =======================================================
     DEBUG
     ======================================================= */

  console.log("Value Strip:", section);

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="border-y border-white/10 bg-elevated/40">
      <div className="container-shell py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);

            const label = clean(item.label) || "Value";

            return (
              <div
                key={`${label}-${index}`}
                className="flex items-center gap-3"
              >
                {/* =========================================
                    ICON
                    ========================================= */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/15 bg-accent/[0.04]">
                  <Icon className="h-4 w-4 text-accent" strokeWidth={1.8} />
                </div>

                {/* =========================================
                    LABEL
                    ========================================= */}

                <span className="text-sm text-muted">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
