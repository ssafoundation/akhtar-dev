import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AboutPreview() {
  return (
    <section className="section-pad">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="premium-border overflow-hidden rounded-[8px] bg-panel p-3 shadow-premium">
            <div className="relative aspect-[0.92] w-full overflow-hidden rounded-[8px]">
              <Image
                src="/images/profile-picture.png"
                alt="Premium developer workspace"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            About
          </p>
          <h2 className="headline text-4xl font-semibold sm:text-6xl">
            A developer who cares about the business feeling behind the
            interface.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            MD. Akhtaruzzaman partners with founders, stores, agencies, and
            teams that need more than a functional website. The work blends
            crisp frontend engineering, conversion-aware UX, CMS flexibility,
            and a premium visual finish that makes brands feel more valuable.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Shopify", "React", "WordPress"].map((item) => (
              <div
                key={item}
                className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="headline text-xl font-semibold">{item}</p>
                <p className="mt-2 text-sm text-muted">Specialized delivery</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/about" variant="ghost">
              Read the Story
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
