"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

    setTheme(currentTheme);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);

    root.style.colorScheme = nextTheme;

    localStorage.setItem("theme", nextTheme);

    setTheme(nextTheme);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground opacity-0"
      >
        <Sun size={18} />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        group
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-border
        bg-background
        text-foreground
        shadow-sm
        transition-all
        duration-300
        hover:border-accent
        hover:text-accent
      "
    >
      <span
        className="
          absolute
          inset-0
          rounded-full
          bg-accent/10
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <span
        className="
          relative
          z-10
          transition-transform
          duration-300
          group-hover:rotate-12
        "
      >
        {isDark ? (
          <Sun size={18} strokeWidth={2} />
        ) : (
          <Moon size={18} strokeWidth={2} />
        )}
      </span>
    </button>
  );
}
