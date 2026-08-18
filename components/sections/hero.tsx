import { Reveal } from "@/components/animations/reveal";
import { ProjectLaptopShowcase } from "@/components/sections/project-laptop-showcase";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { ArrowDown } from "lucide-react";

type HeroSettings = {
  eyebrow: string;
  heading: string;
  description: string;

  primaryButton: {
    text: string;
    url: string;
  };

  secondaryButton: {
    text: string;
    url: string;
  };

  availability?: string;

  image?: {
    id: number;
    url: string;
    width: number;
    height: number;
    alt?: string;
  } | null;

  badges?: string[];

  features?: {
    title: string;
  }[];
};

type Stat = {
  id: number;
  value: string | number;
  suffix: string;
  label: string;
};

export async function Hero() {
  const [hero, stats] = await Promise.all([
    apiFetch<HeroSettings>("/hero"),
    apiFetch<Stat[]>("/stats"),
  ]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-40 md:pt-32 lg:pt-40">
      <div className="aurora" data-parallax="slow" aria-hidden="true" />

      <div className="container-shell grid gap-14 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        {/* LEFT */}
        <Reveal>
          {hero.eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />

              {hero.eyebrow}
            </div>
          )}

          {hero.heading && (
            <h1 className="headline mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] sm:text-5xl lg:text-7xl">
              {hero.heading}
            </h1>
          )}

          {hero.description && (
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
              {hero.description}
            </p>
          )}

          {/* BUTTONS */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {hero.primaryButton?.text && (
              <Button href={hero.primaryButton.url || "/portfolio"}>
                {hero.primaryButton.text}
              </Button>
            )}

            {hero.secondaryButton?.text && (
              <Button
                href={hero.secondaryButton.url || "/contact"}
                variant="ghost"
              >
                {hero.secondaryButton.text}
              </Button>
            )}
          </div>

          {/* STATS */}
          {stats.length > 0 && (
            <div className="mt-12 grid grid-cols-3 gap-3 border-t border-white/10 pt-7 text-sm text-muted">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.id || stat.label}>
                  <strong className="block text-2xl">
                    {stat.value}
                    {stat.suffix}
                  </strong>

                  {stat.label}
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {/* RIGHT */}
        <Reveal delay={0.15} className="relative">
          <ProjectLaptopShowcase />

          <a
            href="#featured"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-white"
          >
            Scroll to explore
            <ArrowDown className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
