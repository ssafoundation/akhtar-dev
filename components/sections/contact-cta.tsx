import { Button } from "@/components/ui/button";

export function ContactCTA() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <div className="premium-border overflow-hidden rounded-[8px] bg-panel p-8 shadow-premium sm:p-12 lg:p-16">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">Start a Project</p>
            <h2 className="headline text-4xl font-semibold sm:text-6xl">Ready for a website that feels expensive before a word is read?</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Share the goal, the platform, and the launch window. You will get a clear path, realistic scope, and a premium build strategy.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Contact AKHTAR DEV</Button>
              <Button href="/portfolio" variant="ghost">Browse Work</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
