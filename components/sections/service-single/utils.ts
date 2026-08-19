import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Code2 } from "lucide-react";

export function getIcon(name?: string): LucideIcon {
  if (!name) return Code2;

  const normalized = name.trim();

  const icons = LucideIcons as unknown as Record<string, LucideIcon>;

  const icon =
    icons[normalized] ??
    icons[normalized.charAt(0).toUpperCase() + normalized.slice(1)];

  return icon || Code2;
}

export function isEnabled(value?: number | boolean | string | null) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    return (
      normalized === "1" ||
      normalized === "true" ||
      normalized === "yes" ||
      normalized === "on"
    );
  }

  return false;
}

export function clean(value?: string) {
  return value?.trim() || "";
}
