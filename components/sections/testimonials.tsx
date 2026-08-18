import { Reveal } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import { Quote } from "lucide-react";

type SectionSettings = {
  eyebrow: string;
  heading: string;
  subtitle: string;
};

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
};

export async function Testimonials() {
  const [section, testimonials] = await Promise.all([
    apiFetch<SectionSettings>("/sections/testimonials"),
    apiFetch<Testimonial[]>("/testimonials"),
  ]);

  return (
    <section className="section-pad overflow-hidden">
      <div className="container-shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.heading}
          description={section.subtitle}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id || item.name} delay={index * 0.05}>
              <Card className="h-full p-7">
                <Quote className="h-7 w-7 text-accent" />

                <p className="mt-8 text-lg leading-8">
                  &ldquo;
                  {item.quote?.replace(/<[^>]*>/g, "")}
                  &rdquo;
                </p>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-semibold">{item.name}</p>

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
