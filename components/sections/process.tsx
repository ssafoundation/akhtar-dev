import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { process } from "@/data/site";

export function Process() {
  return (
    <section className="section-pad border-y border-white/10 bg-white/[0.02]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Process"
          title="A calm path from idea to launch."
          description="The process is intentionally direct, because premium work needs fewer surprises and better decisions."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {process.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="relative h-full rounded-[8px] border border-white/10 bg-obsidian/70 p-6">
                <span className="headline text-sm text-accent">0{index + 1}</span>
                <h3 className="headline mt-10 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
