import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ContactCTA } from "@/components/sections/contact-cta";
import { apiFetch } from "@/lib/api";
import { siteUrl } from "@/lib/utils";

type Project = {
  id: number;
  slug: string;
  name: string;
  title?: string;
  type: string;
  year: string;

  // Short content for cards / header
  summary: string;

  // Full WordPress editor content
  content?: string;

  result: string;

  image?: {
    id: number;
    url: string;
    width: number;
    height: number;
    alt?: string;
  } | null;

  stack: string[];
  services: string[];

  subtitle?: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;

  featured?: boolean;
  showcase?: boolean;

  gallery?: {
    id: number;
    url: string;
    width: number;
    height: number;
    alt?: string;
  }[];
};

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate static project routes from WordPress
 */
export async function generateStaticParams() {
  const projects = await apiFetch<Project[]>("/projects");

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * Dynamic SEO metadata
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = await apiFetch<Project>(`/projects/${slug}`);

    /**
     * Clean HTML from summary in case WordPress
     * returns formatted content.
     */
    const cleanSummary =
      project.summary
        ?.replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim() || "";

    /**
     * Clean and prepare services.
     */
    const services = Array.isArray(project.services)
      ? project.services
          .filter(
            (item): item is string =>
              typeof item === "string" && item.trim().length > 0,
          )
          .map((item) => item.trim())
      : [];

    /**
     * Clean and prepare stack.
     */
    const stack = Array.isArray(project.stack)
      ? project.stack
          .filter(
            (item): item is string =>
              typeof item === "string" && item.trim().length > 0,
          )
          .map((item) => item.trim())
      : [];

    /**
     * Use custom project title if available,
     * otherwise fallback to project name.
     */
    const projectTitle =
      project.title?.trim() || project.name?.trim() || "Case Study";

    /**
     * SEO title.
     *
     * Example:
     * Nutri77 | Shopify Development | AKHTAR DEV
     */
    const seoTitle = services.length
      ? `${projectTitle} | ${services.slice(0, 2).join(" & ")} | AKHTAR DEV`
      : `${projectTitle} | ${project.type || "Web Development"} | AKHTAR DEV`;

    /**
     * SEO description.
     */
    const description =
      cleanSummary ||
      project.subtitle?.trim() ||
      `${projectTitle}${
        project.type ? ` — ${project.type}` : ""
      } project developed by AKHTAR DEV.`;

    /**
     * Canonical project URL.
     */
    const canonicalUrl = `${siteUrl}/portfolio/${project.slug}`;

    /**
     * SEO keywords.
     *
     * These are supplementary metadata only.
     * The main SEO value comes from the visible content,
     * title, headings, links and overall page quality.
     */
    const keywords = [
      projectTitle,
      project.name,
      project.type,
      ...services,
      ...stack,
      "AKHTAR DEV",
      "Web Development",
    ].filter(
      (item, index, array): item is string =>
        typeof item === "string" &&
        item.trim().length > 0 &&
        array.indexOf(item) === index,
    );

    return {
      title: seoTitle,

      description,

      keywords,

      alternates: {
        canonical: canonicalUrl,
      },

      openGraph: {
        title: seoTitle,

        description,

        url: canonicalUrl,

        siteName: "AKHTAR DEV",

        type: "article",

        ...(project.image?.url
          ? {
              images: [
                {
                  url: project.image.url,
                  width: project.image.width,
                  height: project.image.height,
                  alt: project.image.alt || `${project.name} project preview`,
                },
              ],
            }
          : {}),
      },

      twitter: {
        card: "summary_large_image",

        title: seoTitle,

        description,

        ...(project.image?.url
          ? {
              images: [project.image.url],
            }
          : {}),
      },

      robots: {
        index: true,
        follow: true,

        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
    };
  } catch {
    /**
     * If the project does not exist,
     * don't allow the fallback page to be indexed.
     */
    return {
      title: "Case Study | AKHTAR DEV",

      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

/**
 * Project Detail Page
 */
export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;

  let project: Project;

  try {
    project = await apiFetch<Project>(`/projects/${slug}`);
  } catch {
    notFound();
  }

  return (
    <main className="pt-32">
      {/* =========================
          HEADER
      ========================== */}
      <section className="section-pad pb-12">
        <div className="container-shell">
          {project.type && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {project.type}
            </p>
          )}

          <h1 className="headline max-w-5xl text-5xl font-semibold leading-tight sm:text-7xl">
            {project.name}
          </h1>

          {project.subtitle && (
            <p className="mt-4 text-xl font-medium text-white">
              {project.subtitle}
            </p>
          )}

          {project.summary && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              {project.summary}
            </p>
          )}

          {/* Technologies */}
          {Array.isArray(project.stack) && project.stack.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack
                .filter(
                  (item): item is string =>
                    typeof item === "string" && item.trim().length > 0,
                )
                .map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-muted"
                  >
                    {item}
                  </span>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================
          MAIN PROJECT IMAGE
      ========================== */}
      {project.image?.url && (
        <section>
          <div className="container-shell">
            <div className="overflow-hidden rounded-[8px]">
              <Image
                src={project.image.url}
                alt={
                  project.image.alt || `${project.name} full case study visual`
                }
                width={project.image.width}
                height={project.image.height}
                priority
                sizes="100vw"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* =========================
          PROJECT INFORMATION
      ========================== */}
      <section className="section-pad">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* =========================
                LEFT INFORMATION
            ========================== */}
            <aside className="self-start lg:sticky lg:top-32">
              <div className="space-y-4">
                {/* Measured Outcome */}
                {project.result && (
                  <InfoCard label="Measured Outcome" highlight>
                    <p className="headline text-3xl font-semibold leading-tight text-accent sm:text-4xl">
                      {project.result}
                    </p>
                  </InfoCard>
                )}

                {/* Client */}
                {project.client && (
                  <InfoCard label="Client">
                    <p className="font-semibold text-white">{project.client}</p>
                  </InfoCard>
                )}

                {/* Year */}
                {project.year && (
                  <InfoCard label="Year">
                    <p className="font-semibold text-white">{project.year}</p>
                  </InfoCard>
                )}

                {/* Project Type */}
                {project.type && (
                  <InfoCard label="Project Type">
                    <p className="font-semibold text-white">{project.type}</p>
                  </InfoCard>
                )}

                {/* Services */}
                {Array.isArray(project.services) &&
                  project.services.length > 0 && (
                    <InfoCard label="Services">
                      <div className="flex flex-wrap gap-2">
                        {project.services
                          .filter(
                            (item): item is string =>
                              typeof item === "string" &&
                              item.trim().length > 0,
                          )
                          .map((service) => (
                            <span
                              key={service}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-white"
                            >
                              {service}
                            </span>
                          ))}
                      </div>
                    </InfoCard>
                  )}
              </div>
            </aside>

            {/* =========================
                RIGHT - WORDPRESS CONTENT
            ========================== */}
            <div className="min-w-0">
              {project.content ? (
                <article
                  className="
                    project-content
                    max-w-none
                    text-lg
                    leading-8
                    text-muted

                    [&_p]:mb-6

                    [&_strong]:font-semibold
                    [&_strong]:text-white

                    [&_b]:font-semibold
                    [&_b]:text-white

                    [&_h1]:mb-5
                    [&_h1]:mt-10
                    [&_h1]:text-4xl
                    [&_h1]:font-semibold
                    [&_h1]:leading-tight
                    [&_h1]:text-white

                    [&_h2]:mb-5
                    [&_h2]:mt-10
                    [&_h2]:text-3xl
                    [&_h2]:font-semibold
                    [&_h2]:leading-tight
                    [&_h2]:text-white

                    [&_h3]:mb-4
                    [&_h3]:mt-8
                    [&_h3]:text-2xl
                    [&_h3]:font-semibold
                    [&_h3]:leading-tight
                    [&_h3]:text-white

                    [&_ul]:my-6
                    [&_ul]:list-disc
                    [&_ul]:space-y-2
                    [&_ul]:pl-6

                    [&_ol]:my-6
                    [&_ol]:list-decimal
                    [&_ol]:space-y-2
                    [&_ol]:pl-6

                    [&_li]:pl-1

                    [&_a]:text-accent
                    [&_a]:underline
                    [&_a]:underline-offset-4

                    [&_blockquote]:my-8
                    [&_blockquote]:border-l-2
                    [&_blockquote]:border-accent
                    [&_blockquote]:pl-5
                    [&_blockquote]:italic
                  "
                  dangerouslySetInnerHTML={{
                    __html: project.content,
                  }}
                />
              ) : (
                <p className="text-lg leading-8 text-muted">
                  {project.summary}
                </p>
              )}
            </div>
          </div>

          {/* =========================
              LIVE PROJECT BUTTON
          ========================== */}
          {project.liveUrl && (
            <div className="mt-10 flex justify-center">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent/90"
              >
                View Live Project
              </a>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          GALLERY
      ========================== */}
      {Array.isArray(project.gallery) && project.gallery.length > 0 && (
        <section className="section-pad pt-0">
          <div className="container-shell">
            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((image) => (
                <div
                  key={image.id}
                  className="premium-border overflow-hidden rounded-[8px] bg-panel p-3 shadow-premium"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
                    <Image
                      src={image.url}
                      alt={image.alt || `${project.name} project gallery image`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================
          CONTACT CTA
      ========================== */}
      <ContactCTA />
    </main>
  );
}

/**
 * Reusable information card
 */
function InfoCard({
  label,
  children,
  highlight = false,
}: {
  label: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[8px] border border-white/10 bg-white/[0.03] p-6 ${
        highlight ? "min-h-[150px]" : ""
      }`}
    >
      <p className="text-sm uppercase tracking-[0.22em] text-muted">{label}</p>

      <div className="mt-4">{children}</div>
    </div>
  );
}
