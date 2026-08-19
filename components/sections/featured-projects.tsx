import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { apiFetch } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  slug: string;
  name: string;
  type: string;
  year: string;

  // Short description used on homepage
  summary: string;

  // Full WordPress content used on project detail page
  content?: string;

  result: string;

  image?: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  } | null;

  stack: string[];
  services: string[];
  featured: boolean;
};

type ProjectSection = {
  eyebrow: string;
  heading: string;
  subtitle: string;
};

export async function FeaturedProjects({ all = false }: { all?: boolean }) {
  const [projects, section] = await Promise.all([
    apiFetch<Project[]>("/projects"),
    apiFetch<ProjectSection>("/sections/projects"),
  ]);

  const visibleProjects = all
    ? projects
    : projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section id="featured" className="section-pad overflow-hidden">
      <div className="container-shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.heading}
          description={section.subtitle}
        />

        <div className="mt-14 space-y-10">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id || project.slug} delay={index * 0.06}>
              <Link
                href={`/portfolio/${project.slug}`}
                data-tilt-card
                className="group grid overflow-hidden rounded-[8px] border bg-elevated shadow-premium backdrop-blur lg:grid-cols-2"
              >
                {/* PROJECT IMAGE */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[1.18] overflow-hidden lg:aspect-auto lg:h-full">
                    {project.image?.url ? (
                      <Image
                        src={project.image.url}
                        alt={
                          project.image.alt || `${project.name} project preview`
                        }
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full min-h-[320px] bg-white/[0.03]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/74 to-transparent" />
                  </div>
                </div>

                {/* PROJECT CONTENT */}
                <div className="flex flex-col justify-between p-7 sm:p-10 lg:min-h-[520px]">
                  <div>
                    {/* PROJECT META */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                      {project.type && <span>{project.type}</span>}

                      {project.type && project.year && (
                        <span className="h-1 w-1 rounded-full bg-accent" />
                      )}

                      {project.year && <span>{project.year}</span>}
                    </div>

                    {/* PROJECT NAME */}
                    <h3 className="headline mt-5 text-4xl font-semibold sm:text-5xl">
                      {project.name}
                    </h3>

                    {/* SHORT SUMMARY */}
                    <p className="mt-5 max-w-xl text-base leading-8 text-muted">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-10">
                    {/* RESULT */}
                    {project.result && (
                      <p className="headline text-2xl font-semibold text-accent">
                        {project.result}
                      </p>
                    )}

                    {/* STACK */}
                    {Array.isArray(project.stack) &&
                      project.stack.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.stack
                            .filter(
                              (item): item is string =>
                                typeof item === "string" &&
                                item.trim().length > 0,
                            )
                            .map((item) => (
                              <span
                                key={`${project.slug}-${item}`}
                                className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
                              >
                                {item}
                              </span>
                            ))}
                        </div>
                      )}

                    {/* VIEW CASE STUDY */}
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                      View case study
                      <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
