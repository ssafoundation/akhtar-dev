import { ArrowRight, ArrowUpRight, Clock3, Filter } from "lucide-react";
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
};

/* =========================================================
   METADATA
   ========================================================= */

export const metadata: Metadata = {
  title: "Blog | AKHTAR LABS",
  description:
    "Practical insights on Shopify, React, Next.js, WordPress, web development, performance, and premium web design.",
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
    width: image.width || 1200,
    height: image.height || 750,
    alt: clean(image.alt),
  };
}

function getCategoryLabel(post: BlogPost): string {
  return clean(post.categoryLabel) || clean(post.category) || "General";
}

/* =========================================================
   API
   ========================================================= */

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // IMPORTANT:
    // This is the API endpoint.
    // It remains /blog even though frontend route is /blogs.
    const posts = await apiFetch<BlogPost[]>("/blog");

    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    return [];
  }
}

/* =========================================================
   PAGE
   ========================================================= */

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  const featuredPost = posts.find((post) => post.featured) ?? posts[0] ?? null;

  const regularPosts = featuredPost
    ? posts.filter((post) => post.id !== featuredPost.id)
    : posts;

  const categories = Array.from(
    new Map(
      posts
        .filter((post) => post.category)
        .map((post) => [post.category, getCategoryLabel(post)]),
    ).entries(),
  );

  return (
    <main className="overflow-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/10">
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
            -left-32
            top-20
            -z-10
            h-72
            w-72
            rounded-full
            bg-accent/[0.045]
            blur-3xl
          "
        />

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            -right-40
            top-1/2
            -z-10
            h-80
            w-80
            rounded-full
            bg-accent/[0.025]
            blur-3xl
          "
        />

        <div className="container-shell section-pad">
          <p className="font-mono text-sm text-accent">
            blog<span className="animate-pulse">_</span>
          </p>

          <h1
            className="
              headline
              mt-5
              max-w-4xl
              text-5xl
              font-semibold
              leading-[1.05]
              tracking-tight
              sm:text-6xl
              lg:text-7xl
            "
          >
            Field notes from real client builds.
          </h1>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-muted
              sm:text-lg
            "
          >
            Practical breakdowns on Shopify architecture, React & Next.js
            frontends, WordPress systems, performance, and the small decisions
            that make a website feel premium.
          </p>

          {/* Filters */}

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <div className="mr-1 flex items-center gap-2 text-xs text-muted">
              <Filter className="h-3.5 w-3.5 text-accent" />

              <span className="font-mono">filter:</span>
            </div>

            <Link
              href="/blogs"
              className="
                rounded-full
                border
                border-accent
                bg-accent
                px-4
                py-2
                text-xs
                font-medium
                text-obsidian
                transition-all
                duration-300
                hover:brightness-110
              "
            >
              All
            </Link>

            {categories.map(([value, label]) => (
              <Link
                key={value}
                href={`/blogs?category=${encodeURIComponent(value as string)}`}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-muted
                  transition-all
                  duration-300
                  hover:border-accent/30
                  hover:bg-accent/[0.04]
                  hover:text-foreground
                "
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          EMPTY
      ===================================================== */}

      {posts.length === 0 && (
        <section className="border-b border-white/10">
          <div className="container-shell section-pad">
            <div
              className="
                rounded-[8px]
                border
                border-white/10
                bg-elevated
                p-10
                text-center
              "
            >
              <p className="font-mono text-xs text-accent"> no posts</p>

              <h2 className="headline mt-4 text-2xl font-semibold">
                No blog posts available yet.
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted">
                Blog content will appear here once published from the WordPress
                Blog Manager.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FEATURED
      ===================================================== */}

      {featuredPost && (
        <section className="border-b border-white/10">
          <div className="container-shell section-pad">
            <p className="mb-7 font-mono text-xs text-muted">featured</p>

            <Link
              href={`/blogs/${featuredPost.slug}`}
              className="
                group
                grid
                gap-10
                lg:grid-cols-2
                lg:items-center
              "
            >
              <div
                className="
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  rounded-[8px]
                  border
                  border-white/10
                  bg-elevated
                  shadow-premium
                  transition-all
                  duration-500
                  group-hover:border-accent/30
                "
              >
                {(() => {
                  const image = getImageData(featuredPost.image);

                  if (!image) {
                    return (
                      <div className="absolute inset-0 flex items-center justify-center bg-elevated">
                        <span className="font-mono text-xs text-muted">
                          no image
                        </span>
                      </div>
                    );
                  }

                  return (
                    <Image
                      src={image.url}
                      alt={image.alt || clean(featuredPost.title)}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="
                        object-cover
                        grayscale
                        transition-all
                        duration-700
                        group-hover:scale-105
                        group-hover:grayscale-0
                      "
                    />
                  );
                })()}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-obsidian/70
                    via-transparent
                    to-transparent
                  "
                />
              </div>

              <div>
                <span
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-accent/20
                    bg-accent/[0.04]
                    px-3
                    py-1
                    font-mono
                    text-xs
                    text-accent
                  "
                >
                  {getCategoryLabel(featuredPost)}
                </span>

                <h2
                  className="
                    headline
                    mt-5
                    text-3xl
                    font-semibold
                    leading-tight
                    tracking-tight
                    transition-colors
                    duration-300
                    group-hover:text-accent
                    sm:text-4xl
                  "
                >
                  {clean(featuredPost.title)}
                </h2>

                {clean(featuredPost.excerpt) && (
                  <p className="mt-5 max-w-xl text-base leading-8 text-muted">
                    {clean(featuredPost.excerpt)}
                  </p>
                )}

                <div
                  className="
                    mt-7
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                    font-mono
                    text-xs
                    text-muted
                  "
                >
                  <span>AKHTAR LABS</span>

                  {featuredPost.date && (
                    <>
                      <span className="text-white/20">·</span>
                      <span>{clean(featuredPost.date)}</span>
                    </>
                  )}

                  {featuredPost.readTime && (
                    <>
                      <span className="text-white/20">·</span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {clean(featuredPost.readTime)}
                      </span>
                    </>
                  )}
                </div>

                <span
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    font-mono
                    text-sm
                    font-medium
                    text-accent
                  "
                >
                  read the breakdown
                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* =====================================================
          ALL POSTS
      ===================================================== */}

      {regularPosts.length > 0 && (
        <section className="border-b border-white/10">
          <div className="container-shell section-pad">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="font-mono text-xs text-muted">all posts</p>

                <h2 className="headline mt-3 text-3xl font-semibold sm:text-4xl">
                  Latest articles & insights
                </h2>
              </div>

              <span className="hidden font-mono text-xs text-muted sm:block">
                {regularPosts.length} articles
              </span>
            </div>

            <div
              className="
                mt-10
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {regularPosts.map((post) => {
                const image = getImageData(post.image);

                return (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.slug}`}
                    className="
                      group
                      flex
                      flex-col
                      overflow-hidden
                      rounded-[8px]
                      border
                      border-white/10
                      bg-elevated
                      shadow-premium
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-accent/25
                    "
                  >
                    <div
                      className="
                        relative
                        aspect-[16/10]
                        overflow-hidden
                        bg-white/[0.02]
                      "
                    >
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.alt || clean(post.title)}
                          fill
                          sizes="
                            (min-width: 1024px) 33vw,
                            (min-width: 640px) 50vw,
                            100vw
                          "
                          className="
                            object-cover
                            grayscale
                            transition-all
                            duration-700
                            group-hover:scale-105
                            group-hover:grayscale-0
                          "
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted">
                          no image
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent opacity-70" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                        {getCategoryLabel(post)}
                      </span>

                      <h3 className="headline mt-3 text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-accent">
                        {clean(post.title)}
                      </h3>

                      {clean(post.excerpt) && (
                        <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                          {clean(post.excerpt)}
                        </p>
                      )}

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-between
                          gap-3
                          border-t
                          border-white/[0.06]
                          pt-5
                          font-mono
                          text-[11px]
                          text-muted
                        "
                      >
                        <span>{clean(post.date)}</span>

                        {post.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock3 className="h-3 w-3" />
                            {clean(post.readTime)}
                          </span>
                        )}
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                          read article
                        </span>

                        <ArrowUpRight
                          className="
                            h-4
                            w-4
                            text-accent
                            opacity-50
                            transition-all
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                            group-hover:opacity-100
                          "
                        />
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
          CTA
      ===================================================== */}

      <section>
        <div className="container-shell section-pad">
          <div
            className="
              relative
              overflow-hidden
              rounded-[8px]
              border
              border-white/10
              bg-elevated
              px-6
              py-12
              text-center
              sm:px-10
              sm:py-16
            "
          >
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-40
                w-80
                -translate-x-1/2
                rounded-full
                bg-accent/[0.05]
                blur-3xl
              "
            />

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                build something better
              </p>

              <h2
                className="
                  headline
                  mx-auto
                  mt-4
                  max-w-3xl
                  text-3xl
                  font-semibold
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Have a project in mind?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                Let&apos;s turn your idea into a fast, scalable,
                conversion-focused digital experience.
              </p>

              <Link
                href="/contact"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-[8px]
                  bg-accent
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-obsidian
                  transition-all
                  duration-300
                  hover:brightness-110
                "
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
