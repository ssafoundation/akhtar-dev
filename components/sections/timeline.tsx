import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { timeline } from "@/data/site";

export function Timeline() {
  return (
    <section className="section-pad overflow-hidden">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Experience Timeline"
          title="Built through steady craft, client trust, and deeper specialization."
        />
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent via-white/20 to-transparent md:left-1/2" />
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.05}>
                <div
                  className={`relative grid gap-5 md:grid-cols-2 ${index % 2 ? "" : "md:text-right"}`}
                >
                  <div className={index % 2 ? "md:col-start-2" : ""}>
                    <div className="ml-12 rounded-[8px] border border-white/10 bg-panel/70 p-6 shadow-premium backdrop-blur md:ml-0">
                      <p className="headline text-3xl font-semibold text-accent">
                        {item.year}
                      </p>
                      <h3 className="headline mt-3 text-2xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-3 leading-7 text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-glow md:left-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
