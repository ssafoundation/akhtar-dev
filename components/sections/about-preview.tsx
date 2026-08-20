import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import Image from "next/image";

type AboutImage = {
  id?: number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

type AboutHighlight = {
  title: string;
  description: string;
};

type AboutData = {
  eyebrow: string;
  heading: string;
  description: string;

  image?: AboutImage | null;

  highlights?: AboutHighlight[];

  button?: {
    text: string;
    url: string;
  };
};

export async function AboutPreview() {
  const about = await apiFetch<AboutData>("/about");

  return (
    <section className="section-pad overflow-hidden">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* IMAGE */}
        <Reveal>
          <div className="premium-border overflow-hidden rounded-[8px] bg-panel p-3 shadow-premium">
            <div className="relative aspect-[0.92] w-full overflow-hidden rounded-[8px]">
              {about.image?.url ? (
                <Image
                  src={about.image.url}
                  alt={about.image.alt || "About AKHTAR LABS"}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-white/[0.03]" />
              )}
            </div>
          </div>
        </Reveal>

        {/* CONTENT */}
        <Reveal delay={0.1}>
          {about.eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {about.eyebrow}
            </p>
          )}

          {about.heading && (
            <h2 className="headline text-4xl font-semibold sm:text-6xl">
              {about.heading}
            </h2>
          )}

          {about.description && (
            <p className="mt-6 text-lg leading-8 text-muted">
              {about.description.replace(/<[^>]*>/g, "")}
            </p>
          )}

          {/* HIGHLIGHTS */}
          {about.highlights && about.highlights.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {about.highlights.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="headline text-xl font-semibold">{item.title}</p>

                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* BUTTON */}
          {about.button?.text && (
            <div className="mt-8">
              <Button href={about.button.url || "/about"} variant="ghost">
                {about.button.text}
              </Button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
