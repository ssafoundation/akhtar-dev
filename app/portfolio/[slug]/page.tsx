import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/sections/contact-cta";
import { projects } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Case Study" };
  }

  return {
    title: project.name,
    description: project.summary
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="pt-32">
      <section className="section-pad pb-12">
        <div className="container-shell">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">{project.type}</p>
          <h1 className="headline max-w-5xl text-5xl font-semibold leading-tight sm:text-7xl">{project.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-sm text-muted">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-shell">
          <div className="premium-border overflow-hidden rounded-[8px] bg-panel p-3 shadow-premium">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[8px]">
              <Image
                src={project.image}
                alt={`${project.name} full case study visual`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-muted">Measured outcome</p>
            <p className="headline mt-4 text-4xl font-semibold text-accent">{project.result}</p>
          </div>
          <div className="space-y-8">
            <CaseBlock
              title="Challenge"
              body="The brand needed a digital experience that felt more premium, clarified the offer quickly, and removed friction from the highest-value user paths."
            />
            <CaseBlock
              title="Approach"
              body="The build focused on strong hierarchy, reusable sections, performance-minded motion, responsive buying flows, and CMS structures that keep future updates simple."
            />
            <CaseBlock
              title="Delivery"
              body={`Services included ${project.services.join(", ").toLowerCase()}, accessibility review, SEO metadata, analytics readiness, and launch QA across desktop, tablet, and mobile.`}
            />
          </div>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="border-b border-white/10 pb-8">
      <h2 className="headline text-3xl font-semibold">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-muted">{body}</p>
    </article>
  );
}
