"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          "container-shell flex h-16 items-center justify-between rounded-full border px-4 transition duration-300",
          scrolled
            ? "border-white/10 bg-obsidian/72 shadow-premium backdrop-blur-2xl"
            : "border-white/0 bg-transparent"
        )}
        aria-label="Primary navigation"
      >
        <Link href="/" className="headline flex items-center gap-3 text-lg font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm text-obsidian">AK</span>
          <span>AKHTAR DEV</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href="/contact" variant="ghost" className="min-h-10 px-4">Start a Project</Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="container-shell mt-3 rounded-[8px] border border-white/10 bg-obsidian/94 p-3 shadow-premium backdrop-blur-2xl md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-[8px] px-4 py-3 text-sm text-muted hover:bg-white/5 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
