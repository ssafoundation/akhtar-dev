import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 focus-visible:outline accent",
    variant === "primary" &&
      "bg-accent text-obsidian shadow-glow hover:bg-white",
    variant === "ghost" &&
      "border border-white/12 bg-white/[0.03]  hover:border-accent/60 hover:bg-accent/10",
    variant === "dark" &&
      "border border-line bg-obsidian  hover:border-accent/60",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {content}
    </button>
  );
}
