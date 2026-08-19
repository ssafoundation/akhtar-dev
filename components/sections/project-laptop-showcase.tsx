"use client";

import { showcaseBadges } from "@/data/site";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Gauge, Layers3, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  type: string;
  result: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  } | null;
  stack?: string[];
  services?: string[];
};

type Preview = {
  title: string;
  subtitle: string;
  metric: string;
  image: string;
  tags: string[];
  imageAlt: string;
};

export function ProjectLaptopShowcase({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [projects, setProjects] = useState<Preview[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 90,
    damping: 18,
  });

  const springY = useSpring(mouseY, {
    stiffness: 90,
    damping: 18,
  });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const preview = projects[active];

  /**
   * Load projects from WordPress API
   */
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiFetch<Project[]>("/projects");

        const mappedProjects: Preview[] = data
          .filter((project) => project.image?.url)
          .map((project) => ({
            title: project.name,
            subtitle: project.type,
            metric: project.result,
            image: project.image?.url || "",
            imageAlt:
              project.image?.alt || `${project.name} premium project preview`,
            tags: [...(project.stack || [])],
          }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    };

    loadProjects();
  }, []);

  /**
   * Auto rotate projects
   */
  useEffect(() => {
    if (!projects.length) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % projects.length);
    }, 4400);

    return () => window.clearInterval(timer);
  }, [projects.length]);

  /**
   * Prevent rendering before API data arrives
   */
  if (!preview) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        "relative mx-auto w-full max-w-3xl py-12",
        compact && "max-w-2xl py-4",
        className,
      )}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);

        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ perspective: 1200 }}
    >
      <div
        className="absolute inset-x-12 top-10 h-72 rounded-full bg-accent/20 blur-[96px]"
        aria-hidden="true"
      />

      <div
        className="absolute left-1/2 top-1/2 h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(149,191,71,0.18),rgba(20,184,166,0.08),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />

      {showcaseBadges.map((badge, index) => {
        const isActive = preview.tags.includes(badge);

        return (
          <motion.div
            key={badge}
            className={cn(
              "absolute z-20 hidden rounded-full border px-4 py-2 text-xs font-semibold shadow-premium backdrop-blur-xl md:block transition-colors duration-500",
              isActive
                ? "border-accent/30 bg-accent/40 text-white"
                : "border-white/10 bg-panel/76 text-white",
              badgePositions[index],
            )}
            animate={{
              y: [0, index % 2 ? -12 : 12, 0],
              rotate: [
                index % 2 ? -2 : 2,
                index % 2 ? 2 : -2,
                index % 2 ? -2 : 2,
              ],
            }}
            transition={{
              duration: 5 + index * 0.22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              x: translateX,
              y: translateY,
            }}
          >
            {badge}
          </motion.div>
        );
      })}

      <motion.div
        className="relative z-10"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="mx-auto w-[92%] rounded-t-[20px] border border-white/14 bg-gradient-to-b from-[#20283300] to-[#0b1017] p-[10px] shadow-[0_45px_120px_rgba(0, 0, 0, 0.185)]">
          <div className="rounded-t-[14px] border border-black/80 bg-black p-[5px]">
            <div className="relative overflow-hidden rounded-t-[10px] bg-obsidian">
              <div
                className="relative aspect-[16/10]"
                style={{
                  backgroundImage: `url(${preview.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={preview.title}
                    initial={{
                      opacity: 0,
                      scale: 1.04,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.985,
                      filter: "blur(8px)",
                    }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={preview.image}
                      alt={preview.imageAlt}
                      fill
                      priority={active === 0}
                      sizes="(min-width: 1280px) 680px, (min-width: 768px) 60vw, 100vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-obsidian/82 via-obsidian/18 to-accent/18" />
                  </motion.div>
                </AnimatePresence>

                {/* <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-full border border-white/10 bg-obsidian/64 px-4 py-2 backdrop-blur-xl">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/90" />
                  </div>

                  <span className="text-[11px] font-medium text-muted">
                    akhtardev.com/live-preview
                  </span>
                </div> */}

                <div className="absolute bottom-5 left-5 right-5 grid gap-4 rounded-[8px] border border-white/10 bg-obsidian/76 p-5 backdrop-blur-2xl sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-accent hidden sm:flex">
                      {preview.subtitle}
                    </p>

                    <h3 className="headline mt-2 text-[13px] font-semibold text-white sm:text-2xl">
                      {preview.title}
                    </h3>

                    <div className="mt-4 flex-wrap gap-2 hidden sm:flex">
                      {preview.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* <div className="rounded-[8px] border border-accent/25 bg-accent/10 p-3 text-right">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                      Outcome
                    </p>

                    <p className="headline mt-1 text-xl font-semibold text-accent">
                      {preview.metric}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto h-4 w-[98%] rounded-b-[24px] bg-gradient-to-b from-[#29313b] to-[#111820] shadow-[0_28px_70px_rgba(0,0,0,0.44)]">
          <div className="mx-auto h-2 w-32 rounded-b-[14px] bg-black/45" />
        </div>

        <div className="mx-auto h-4 w-[72%] rounded-full bg-black/50 blur-xl" />
      </motion.div>

      <div className="relative z-20 mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3">
        {[
          {
            icon: Layers3,
            label: "Platform systems",
          },
          {
            icon: Gauge,
            label: "Fast storefronts",
          },
          {
            icon: Sparkles,
            label: "Premium motion",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[8px] border border-white/10 bg-white/[0.03] p-3 text-center backdrop-blur"
          >
            <item.icon className="mx-auto h-4 w-4 text-accent" />

            <p className="mt-2 text-[11px] font-medium text-muted">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const badgePositions = [
  "left-0 top-20",
  "right-2 top-16",
  "-left-2 bottom-36",
  "right-0 bottom-32",
  "left-16 top-2",
  "right-24 top-2",
  "left-20 bottom-4",
  "right-20 bottom-0",
];
