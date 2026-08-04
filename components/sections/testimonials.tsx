import { Quote } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Clear communication, sharp taste, reliable delivery."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.05}>
              <Card className="h-full p-7">
                <Quote className="h-7 w-7 text-accent" />
                <p className="mt-8 text-lg leading-8 text-white/90">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.role}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
