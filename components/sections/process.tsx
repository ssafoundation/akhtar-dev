import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";

type ProcessItem = {
  id: number;
  title: string;
  description: string;
};

type ProcessSection = {
  eyebrow: string;
  heading: string;
  subtitle: string;
};

export async function Process() {
  const [process, section] = await Promise.all([
    apiFetch<ProcessItem[]>("/process"),
    apiFetch<ProcessSection>("/sections/process"),
  ]);

  return (
    <section className="section-pad border-y border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="container-shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.heading}
          description={section.subtitle}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {process.map((item, index) => (
            <Reveal key={item.id || item.title} delay={index * 0.05}>
              <div className="relative h-full rounded-[8px] border bg-elevated p-6">
                <span className="headline text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="headline mt-10 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-muted">
                  {item.description.replace(/<[^>]*>/g, "")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
