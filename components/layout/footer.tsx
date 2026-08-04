import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="headline text-xl font-semibold">AKHTAR DEV</Link>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Premium web development for Shopify, WordPress, Wix, React, and Next.js brands.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 hover:bg-white/5 hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          {[
            { icon: Github, label: "GitHub", href: "https://github.com/" },
            { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
            { icon: Mail, label: "Email", href: "mailto:hello@akhtardev.com" }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition hover:border-accent/60 hover:text-white"
            >
              <item.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
