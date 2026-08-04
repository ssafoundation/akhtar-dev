import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/site";

export function FeaturedProjects({ all = false }: { all?: boolean }) {
  const visibleProjects = all ? projects : projects.slice(0, 3);

  return (
    <section id="featured" className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Large-format case studies with conversion, clarity, and taste."
          description="Each project is treated like a business asset: strategy first, design with restraint, then implementation that survives real traffic."
        />
        <div className="mt-14 space-y-10">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <Link
                href={`/portfolio/${project.slug}`}
                data-tilt-card
                className="group grid overflow-hidden rounded-[8px] border border-white/10 bg-panel/70 shadow-premium backdrop-blur lg:grid-cols-2"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[1.18] overflow-hidden lg:aspect-auto lg:h-full">
                    <Image
                      src={project.image}
                      alt={`${project.name} project preview`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/74 to-transparent" />
                  </div>
                </div>
                <div className="flex flex-col justify-between p-7 sm:p-10 lg:min-h-[520px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                      <span>{project.type}</span>
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      <span>{project.year}</span>
                    </div>
                    <h3 className="headline mt-5 text-4xl font-semibold text-white sm:text-5xl">{project.name}</h3>
                    <p className="mt-5 max-w-xl text-base leading-8 text-muted">{project.summary}</p>
                  </div>
                  <div className="mt-10">
                    <p className="headline text-2xl font-semibold text-accent">{project.result}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">{item}</span>
                      ))}
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      View case study <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
