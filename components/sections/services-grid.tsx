import { Reveal } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/site";

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={
        compact ? "py-10 overflow-hidden" : "section-pad overflow-hidden"
      }
    >
      <div className="container-shell">
        {!compact ? (
          <SectionHeading
            eyebrow="Services"
            title="Premium builds across the modern web stack."
            description="From storefronts to full frontend systems, every engagement is designed for polish, maintainability, and measurable trust."
          />
        ) : null}
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.04}>
              <Card tilt className="h-full p-7">
                <service.icon className="h-8 w-8 text-accent" />
                <h3 className="headline mt-8 text-2xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-4 leading-7 text-muted">
                  {service.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
