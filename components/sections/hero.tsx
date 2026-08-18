import { Reveal } from "@/components/animations/reveal";
import { ProjectLaptopShowcase } from "@/components/sections/project-laptop-showcase";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-40 md:pt-32 lg:pt-40">
      <div className="aurora" data-parallax="slow" aria-hidden="true" />
      <div className="container-shell grid gap-14 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />
            Hello, I am MD. Akhtaruzzaman
          </div>
          <h1 className="headline mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-7xl">
            Premium web experiences for ambitious digital brands.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
            AKHTAR DEV builds polished Shopify, WordPress, Wix, React, and
            Next.js experiences with the calm precision of senior engineering
            and the taste of a boutique studio.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/portfolio">View Case Studies</Button>
            <Button href="/contact" variant="ghost">
              Book a Build
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-3 border-t border-white/10 pt-7 text-sm text-muted">
            <div>
              <strong className="block text-2xl text-white">6+</strong> Years
            </div>
            <div>
              <strong className="block text-2xl text-white">82+</strong>{" "}
              Projects
            </div>
            <div>
              <strong className="block text-2xl text-white">18+</strong>{" "}
              Countries
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <ProjectLaptopShowcase />
          <a
            href="#featured"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-white"
          >
            Scroll to explore <ArrowDown className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
