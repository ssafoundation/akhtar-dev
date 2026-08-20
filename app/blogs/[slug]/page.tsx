import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Code2,
  Layers3,
  List,
  Share2,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { apiFetch } from "@/lib/api";

/* =========================================================
   TYPES
   ========================================================= */

type BlogImage = {
  url?: string;
  width?: number;
  height?: number;
  alt?: string;
} | null;

type BlogSection = {
  id?: string;
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
};

type BlogPost = {
  id: number;
  slug: string;

  category?: string;
  categoryLabel?: string;

  title: string;
  excerpt?: string;

  image?: BlogImage;

  date?: string;
  readTime?: string;

  featured?: boolean;

  content?: string;

  quickAnswer?: string[];

  tools?: string[];

  sections?: BlogSection[];

  conclusion?: string;

  ctaTitle?: string;
  ctaDescription?: string;
};

/* =========================================================
   PARAMS
   ========================================================= */

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   HELPERS
   ========================================================= */

function clean(value?: string | null): string {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/gi, "&")
    .replace(/&#038;/gi, "&")
    .replace(/&#38;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .trim();
}

function getImageData(image?: BlogImage) {
  if (!image?.url) return null;

  return {
    url: image.url,
    width: image.width || 1600,
    height: image.height || 900,
    alt: clean(image.alt),
  };
}

/* =========================================================
   API - ALL POSTS
   ========================================================= */

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await apiFetch<BlogPost[]>("/blog");

    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error("Blog list API error:", error);

    return [];
  }
}

/* =========================================================
   API - SINGLE POST
   ========================================================= */

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await apiFetch<BlogPost>(`/blog/${encodeURIComponent(slug)}`);

    return post || null;
  } catch (error) {
    console.error("Single blog API error:", error);

    return null;
  }
}

/* =========================================================
   STATIC PARAMS
   ========================================================= */

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts
    .filter((post) => post.slug)
    .map((post) => ({
      slug: post.slug,
    }));
}

export const dynamicParams = false;

/* =========================================================
   METADATA
   ========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | AKHTAR LABS",
    };
  }

  const title = clean(post.title) || "AKHTAR LABS Blog";

  const description =
    clean(post.excerpt) || "Web development insights from AKHTAR LABS.";

  const image = getImageData(post.image);

  return {
    title: `${title} | AKHTAR LABS`,
    description,

    alternates: {
      canonical: `/blogs/${post.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `/blogs/${post.slug}`,
      type: "article",

      ...(image
        ? {
            images: [
              {
                url: image.url,
                width: image.width,
                height: image.height,
                alt: image.alt || title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      ...(image
        ? {
            images: [image.url],
          }
        : {}),
    },
  };
}

/* =========================================================
   PAGE
   ========================================================= */

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <main className="container-shell section-pad">
        <div className="rounded-[8px] border border-white/10 bg-elevated p-10 text-center">
          <p className="font-mono text-xs text-accent"> article not found</p>

          <h1 className="headline mt-4 text-3xl font-semibold">
            Article not found
          </h1>

          <Link
            href="/blogs"
            className="mt-6 inline-flex items-center gap-2 rounded-[8px] bg-accent px-5 py-3 text-sm font-semibold text-obsidian"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const title = clean(post.title);

  const excerpt = clean(post.excerpt);

  const category =
    clean(post.categoryLabel) || clean(post.category) || "General";

  const image = getImageData(post.image);

  const quickAnswer = Array.isArray(post.quickAnswer)
    ? post.quickAnswer.filter(Boolean)
    : [];

  const sections = Array.isArray(post.sections) ? post.sections : [];

  const tools = Array.isArray(post.tools) ? post.tools.filter(Boolean) : [];

  /* =======================================================
     RELATED POSTS
     ======================================================= */

  const allPosts = await getBlogPosts();

  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!post.category) return true;

      return item.category === post.category;
    })
    .slice(0, 2);

  const recommendedPosts =
    relatedPosts.length > 0
      ? relatedPosts
      : allPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main className="overflow-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/10 pt-20 ">
        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            opacity-40
            [background-image:linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            -left-40
            top-10
            -z-10
            h-96
            w-96
            rounded-full
            bg-accent/[0.045]
            blur-3xl
          "
        />

        <div className="container-shell section-pad">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-muted"
          >
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>

            <span className="text-white/20">/</span>

            <Link href="/blogs" className="transition-colors hover:text-accent">
              Blog
            </Link>

            <span className="text-white/20">/</span>

            <span className="max-w-[300px] truncate text-foreground">
              {title}
            </span>
          </nav>

          {/* Category */}

          <div className="mt-10">
            <span
              className="
                inline-flex
                rounded-full
                border
                border-accent/20
                bg-accent/[0.04]
                px-3
                py-1.5
                font-mono
                text-[11px]
                uppercase
                tracking-[0.12em]
                text-accent
              "
            >
              {category}
            </span>
          </div>

          {/* Title */}

          <div className="mt-6 max-w-5xl">
            <h1
              className="
                headline
                text-4xl
                font-semibold
                leading-[1.04]
                tracking-tight
                sm:text-5xl
                md:text-6xl
                lg:text-[4.7rem]
              "
            >
              {title}
            </h1>

            {excerpt && (
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted sm:text-lg">
                {excerpt}
              </p>
            )}
          </div>

          {/* Meta */}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs text-muted">
            <span>AKHTAR LABS</span>

            {post.date && (
              <>
                <span className="text-white/20">·</span>

                <span>{clean(post.date)}</span>
              </>
            )}

            {post.readTime && (
              <>
                <span className="text-white/20">·</span>

                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {clean(post.readTime)}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          IMAGE
      ===================================================== */}

      {image && (
        <section className="border-b border-white/10">
          <div className="container-shell py-10 md:py-14">
            <div className="relative overflow-hidden rounded-[8px] border border-white/10 bg-elevated shadow-premium">
              <div className="relative aspect-[16/8.5] min-h-[280px]">
                <Image
                  src={image.url}
                  alt={image.alt || title}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-obsidian/70 px-3 py-1.5 backdrop-blur-md">
                  <Code2 className="h-3.5 w-3.5 text-accent" />

                  <span className="font-mono text-[10px] text-muted">
                    article-preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section>
        <div className="container-shell section-pad">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            {/* =================================================
                ARTICLE
            ================================================= */}

            <article className="min-w-0">
              {excerpt && (
                <div className="border-l-2 border-accent/50 pl-5">
                  <p className="text-base leading-8 text-muted sm:text-lg">
                    {excerpt}
                  </p>
                </div>
              )}

              {/* Quick Answer */}

              {quickAnswer.length > 0 && (
                <div className="mt-10 rounded-[8px] border border-accent/15 bg-accent/[0.025] p-6">
                  <div className="flex items-center gap-2">
                    <Layers3 className="h-4 w-4 text-accent" />

                    <h2 className="text-sm font-semibold text-foreground">
                      Quick answer
                    </h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    {quickAnswer.map((item, index) => (
                      <div key={`${item}-${index}`} className="flex gap-3">
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/[0.1]">
                          <Check className="h-2.5 w-2.5 text-accent" />
                        </span>

                        <p className="text-sm leading-7 text-muted">
                          {clean(item)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sections */}

              {sections.length > 0 && (
                <div className="mt-12 space-y-14">
                  {sections.map((section, index) => {
                    const id = clean(section.id) || `section-${index + 1}`;

                    const sectionTitle =
                      clean(section.title) || `Section ${index + 1}`;

                    const paragraphs = Array.isArray(section.paragraphs)
                      ? section.paragraphs.filter(Boolean)
                      : [];

                    const bullets = Array.isArray(section.bullets)
                      ? section.bullets.filter(Boolean)
                      : [];

                    return (
                      <section
                        key={`${id}-${index}`}
                        id={id}
                        className="scroll-mt-28"
                      >
                        <div className="flex items-start gap-4">
                          <span className="font-mono text-xs text-accent">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="min-w-0 flex-1">
                            <h2 className="headline text-2xl font-semibold tracking-tight sm:text-3xl">
                              {sectionTitle}
                            </h2>

                            {paragraphs.map((paragraph, paragraphIndex) => (
                              <p
                                key={`${id}-p-${paragraphIndex}`}
                                className="mt-5 text-sm leading-8 text-muted sm:text-base"
                              >
                                {paragraph}
                              </p>
                            ))}

                            {bullets.length > 0 && (
                              <div className="mt-6 space-y-3">
                                {bullets.map((bullet, bulletIndex) => (
                                  <div
                                    key={`${id}-b-${bulletIndex}`}
                                    className="flex gap-3 rounded-[6px] border border-white/[0.06] bg-elevated/40 px-4 py-3"
                                  >
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />

                                    <span className="text-sm leading-6 text-muted">
                                      {clean(bullet)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}

              {/* Raw Content */}

              {post.content && (
                <section className="mt-16">
                  <div className="border-t border-white/10 pt-10">
                    <div
                      className="
                        prose
                        prose-invert
                        max-w-none
                        prose-headings:font-semibold
                        prose-headings:tracking-tight
                        prose-p:text-muted
                        prose-p:leading-8
                        prose-a:text-accent
                        prose-strong:text-foreground
                        prose-li:text-muted
                      "
                      dangerouslySetInnerHTML={{
                        __html: post.content,
                      }}
                    />
                  </div>
                </section>
              )}

              {/* Tools */}

              {tools.length > 0 && (
                <section className="mt-16">
                  <div className="border-t border-white/10 pt-10">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                      tools & technologies
                    </p>

                    <h2 className="headline mt-3 text-2xl font-semibold sm:text-3xl">
                      Tools used for this approach
                    </h2>

                    <div className="mt-7 grid gap-2 sm:grid-cols-2">
                      {tools.map((tool, index) => (
                        <div
                          key={`${tool}-${index}`}
                          className="flex items-center gap-3 rounded-[7px] border border-white/10 bg-elevated px-4 py-3.5"
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/[0.06]">
                            <Code2 className="h-3.5 w-3.5 text-accent" />
                          </span>

                          <span className="text-sm text-muted">
                            {clean(tool)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Conclusion */}

              {clean(post.conclusion) && (
                <section className="mt-16">
                  <div className="rounded-[8px] border border-accent/15 bg-elevated p-6 sm:p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                      conclusion
                    </p>

                    <h2 className="headline mt-3 text-2xl font-semibold sm:text-3xl">
                      The takeaway
                    </h2>

                    <p className="mt-5 text-sm leading-8 text-muted sm:text-base">
                      {clean(post.conclusion)}
                    </p>
                  </div>
                </section>
              )}

              {/* CTA */}

              {(clean(post.ctaTitle) || clean(post.ctaDescription)) && (
                <section className="mt-10">
                  <div className="relative overflow-hidden rounded-[8px] border border-accent/15 bg-accent/[0.025] p-7 sm:p-9">
                    <div className="relative">
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                        next step
                      </p>

                      {clean(post.ctaTitle) && (
                        <h2 className="headline mt-3 max-w-2xl text-2xl font-semibold sm:text-3xl">
                          {clean(post.ctaTitle)}
                        </h2>
                      )}

                      {clean(post.ctaDescription) && (
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                          {clean(post.ctaDescription)}
                        </p>
                      )}

                      <Link
                        href="/contact"
                        className="mt-7 inline-flex items-center gap-2 rounded-[8px] bg-accent px-5 py-3 text-sm font-semibold text-obsidian transition-all duration-300 hover:brightness-110"
                      >
                        Start a Project
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </section>
              )}
            </article>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {sections.length > 0 && (
                  <div className="rounded-[8px] border border-white/10 bg-elevated p-5">
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4 text-accent" />

                      <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                        on this page
                      </span>
                    </div>

                    <nav className="mt-5 space-y-1">
                      {sections.map((section, index) => {
                        const id = clean(section.id) || `section-${index + 1}`;

                        return (
                          <a
                            key={`${id}-${index}`}
                            href={`#${id}`}
                            className="group flex gap-3 rounded-[5px] px-2 py-2 text-xs text-muted transition-colors hover:bg-accent/[0.04] hover:text-foreground"
                          >
                            <span className="font-mono text-accent/70">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span>
                              {clean(section.title) || `Section ${index + 1}`}
                            </span>
                          </a>
                        );
                      })}
                    </nav>
                  </div>
                )}

                <div className="rounded-[8px] border border-white/10 bg-elevated p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    article info
                  </p>

                  <div className="mt-5 space-y-4">
                    {post.date && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.12em] text-muted">
                          Published
                        </p>

                        <p className="mt-1 text-sm text-foreground">
                          {clean(post.date)}
                        </p>
                      </div>
                    )}

                    {post.readTime && (
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.12em] text-muted">
                          Reading time
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-sm text-foreground">
                          <Clock3 className="h-3.5 w-3.5 text-accent" />

                          {clean(post.readTime)}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-muted">
                        Category
                      </p>

                      <p className="mt-1 text-sm text-accent">{category}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[8px] border border-white/10 bg-elevated p-5">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-accent" />

                    <span className="text-sm font-medium text-foreground">
                      Share this article
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-6 text-muted">
                    Useful notes worth sharing with your team.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED POSTS
      ===================================================== */}

      {recommendedPosts.length > 0 && (
        <section className="border-t border-white/10">
          <div className="container-shell section-pad">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  continue reading
                </p>

                <h2 className="headline mt-3 text-3xl font-semibold sm:text-4xl">
                  More articles & insights
                </h2>
              </div>

              <Link
                href="/blogs"
                className="hidden items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent sm:inline-flex"
              >
                all posts
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {recommendedPosts.map((related) => {
                const relatedImage = getImageData(related.image);

                return (
                  <Link
                    key={related.id}
                    href={`/blogs/${related.slug}`}
                    className="group grid gap-5 overflow-hidden rounded-[8px] border border-white/10 bg-elevated p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 sm:grid-cols-[180px_1fr]"
                  >
                    {relatedImage ? (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-white/[0.02] sm:aspect-auto">
                        <Image
                          src={relatedImage.url}
                          alt={relatedImage.alt || clean(related.title)}
                          fill
                          sizes="180px"
                          className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center rounded-[6px] border border-white/10 bg-white/[0.02] sm:aspect-auto">
                        <Code2 className="h-6 w-6 text-accent/50" />
                      </div>
                    )}

                    <div className="flex min-w-0 flex-col justify-center">
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                        {clean(related.categoryLabel) ||
                          clean(related.category) ||
                          "General"}
                      </span>

                      <h3 className="headline mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
                        {clean(related.title)}
                      </h3>

                      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-muted">
                        {related.date && <span>{clean(related.date)}</span>}

                        {related.date && related.readTime && (
                          <span className="text-white/20">·</span>
                        )}

                        {related.readTime && (
                          <span>{clean(related.readTime)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          BACK
      ===================================================== */}

      <section className="border-t border-white/10">
        <div className="container-shell py-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all articles
          </Link>
        </div>
      </section>
    </main>
  );
}
