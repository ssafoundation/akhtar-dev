import { Reveal } from "@/components/animations/reveal";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import Image from "next/image";

type ServiceIcon = {
  id?: number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

type Service = {
  id: number;
  title: string;
  description: string;
  icon?: ServiceIcon | null;
};

type ServicesSection = {
  eyebrow: string;
  heading: string;
  subtitle: string;
};

export async function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const [services, section] = await Promise.all([
    apiFetch<Service[]>("/services"),
    apiFetch<ServicesSection>("/sections/services"),
  ]);

  return (
    <section
      className={
        compact ? "py-10 overflow-hidden" : "section-pad overflow-hidden"
      }
    >
      <div className="container-shell">
        {!compact ? (
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.heading}
            description={section.subtitle}
          />
        ) : null}

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id || service.title} delay={index * 0.04}>
              <Card tilt className="h-full p-7">
                {service.icon?.url && (
                  <Image
                    src={service.icon.url}
                    alt={service.icon.alt || `${service.title} icon`}
                    width={service.icon.width || 32}
                    height={service.icon.height || 32}
                    className="h-8 w-8 object-contain"
                  />
                )}

                <h3 className="headline mt-8 text-2xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-muted">
                  {service.description.replace(/<[^>]*>/g, "")}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
