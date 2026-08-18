"use client";

import { Button } from "@/components/ui/button";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme/theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-0 pt-4 sm:px-4">
      <nav
        className={cn(
          "container-shell flex h-16 items-center justify-between rounded-full border px-0 sm:px-4 transition-all duration-300",
          scrolled
            ? "border-border bg-background/80 shadow-premium backdrop-blur-2xl px-4"
            : "border-transparent bg-transparent",
        )}
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="headline flex items-center gap-3 text-lg font-semibold text-foreground"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
            AK
          </span>

          <span>AKHTAR DEV</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                rounded-full
                px-4
                py-2
                text-sm
                text-muted-foreground
                transition-colors
                duration-200
                hover:bg-muted/60
                hover:text-foreground
              "
            >
              {item.label}
            </Link>
          ))}

          <ThemeToggle />
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button href="/contact" variant="ghost" className="min-h-10 px-4">
            Start a Project
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            className="
              grid
              h-10
              w-10
              place-items-center
              rounded-full
              border
              border-border
              bg-background/60
              text-foreground
              backdrop-blur
              transition-colors
              hover:border-accent
              hover:text-accent
            "
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open ? (
        <div
          className="
            container-shell
            mt-3
            rounded-2xl
            border
            border-border
            bg-background/95
            p-3
            shadow-premium
            backdrop-blur-2xl
            md:hidden
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                block
                rounded-xl
                px-4
                py-3
                text-sm
                text-muted-foreground
                transition-colors
                duration-200
                hover:bg-muted/60
                hover:text-foreground
              "
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-border pt-3">
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Button className="w-full">Start a Project</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
