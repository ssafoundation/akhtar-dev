import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import Image from "next/image";

type AboutImage = {
  id?: number;
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type AboutHero = {
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

  image?: AboutImage | null;

  badges?: string[];
};

type AboutResponse = {
  hero: AboutHero;
};

export async function AboutHero() {
  const data = await apiFetch<AboutResponse>("/about");

  const hero = data.hero;

  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 lg:pt-44">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container-shell">
        <div className="grid items-center gap-14 pb-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:pb-28">
          {/* LEFT CONTENT */}
          <Reveal>
            {hero.eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted">
                <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />
                {hero.eyebrow}
              </div>
            )}

            {hero.heading && (
              <h1 className="headline mt-7 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
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
                <Button href={hero.primaryButton.url || "/about"}>
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

            {/* BADGES */}
            {hero.badges && hero.badges.length > 0 && (
              <div className="mt-10 flex max-w-2xl flex-wrap gap-2">
                {hero.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </Reveal>

          {/* RIGHT IMAGE */}
          <Reveal delay={0.12}>
            <div className="relative mx-auto w-full max-w-[620px]">
              {/* Decorative glow */}
              <div
                className="absolute -inset-6 rounded-[32px] bg-accent/10 blur-3xl"
                aria-hidden="true"
              />

              {/* Outer frame */}
              <div className="premium-border relative overflow-hidden rounded-[8px] bg-panel p-3 shadow-premium">
                <div className="relative aspect-[0.95] overflow-hidden rounded-[8px] bg-white/[0.03]">
                  {hero.image?.url ? (
                    <Image
                      src={hero.image.url}
                      alt={hero.image.alt || "MD. Akhtaruzzaman - AKHTAR DEV"}
                      fill
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-accent text-3xl font-semibold text-obsidian shadow-glow">
                          AK
                        </div>

                        <p className="mt-5 text-sm text-muted">
                          About Hero Image
                        </p>

                        <p className="mt-1 text-xs text-muted/70">
                          Upload an image from WordPress
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -left-3 top-8 rounded-full border border-white/10 bg-panel/90 px-4 py-2 text-xs font-semibold text-white shadow-premium backdrop-blur sm:-left-6">
                Full-Stack Developer
              </div>

              <div className="absolute -right-3 bottom-8 rounded-full border border-accent/30 bg-panel/90 px-4 py-2 text-xs font-semibold text-accent shadow-premium backdrop-blur sm:-right-6">
                AKHTAR DEV
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
