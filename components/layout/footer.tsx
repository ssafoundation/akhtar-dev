import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";

import { navItems } from "@/data/site";
import { apiFetch } from "@/lib/api";

type GlobalSettings = {
  email?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    calendly?: string;
  };
};

type AboutData = {
  description?: string;
  subtitle?: string;
};

type SocialItem = {
  label: string;
  href: string;
  icon: typeof Github;
};

export async function Footer() {
  const [settings, about] = await Promise.all([
    apiFetch<GlobalSettings>("/settings"),
    apiFetch<AboutData>("/about"),
  ]);

  const socials = settings.socials || {};

  const socialItems: SocialItem[] = [
    {
      label: "GitHub",
      href: socials.github || "",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: socials.linkedin || "",
      icon: Linkedin,
    },
    {
      label: "Instagram",
      href: socials.instagram || "",
      icon: Instagram,
    },
    {
      label: "Facebook",
      href: socials.facebook || "",
      icon: Facebook,
    },
    {
      label: "X",
      href: socials.twitter || "",
      icon: Twitter,
    },
  ].filter((item) => item.href.trim() !== "");

  const aboutDescription =
    about.description?.trim() ||
    about.subtitle?.trim() ||
    "Premium web development for modern digital brands.";

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* BRAND / ABOUT */}
        <div>
          <Link href="/" className="headline text-xl font-semibold">
            AKHTAR DEV
          </Link>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            {aboutDescription}
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex gap-3">
          {socialItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition hover:border-accent/60 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}

          {/* EMAIL */}
          {settings.email?.trim() && (
            <a
              href={`mailto:${settings.email}`}
              aria-label="Email"
              title="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition hover:border-accent/60 hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
