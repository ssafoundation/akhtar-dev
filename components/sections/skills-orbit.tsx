import { apiFetch } from "@/lib/api";

type SkillsSection = {
  eyebrow: string;
  heading: string;
  subtitle: string;
};

type Technology = {
  id: number;
  name: string;
  label?: string;
  order?: number;
};

export async function SkillsOrbit() {
  const [section, technologies] = await Promise.all([
    apiFetch<SkillsSection>("/sections/skills"),
    apiFetch<Technology[]>("/technologies"),
  ]);

  const skills = technologies
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => item.label || item.name)
    .filter(Boolean);

  return (
    <section className="section-pad border-y border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="container-shell grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            {section.eyebrow}
          </p>

          <h2 className="headline text-4xl font-semibold sm:text-6xl">
            {section.heading}
          </h2>

          {section.subtitle && (
            <p className="mt-6 text-lg leading-8 text-muted">
              {section.subtitle}
            </p>
          )}
        </div>

        {/* RIGHT ORBIT */}
        <div className="relative mx-auto grid h-[320px] w-[320px] place-items-center rounded-full border border-white/10 sm:h-[420px] sm:w-[420px]">
          {/* Outer orbit */}
          <div className="absolute h-[68%] w-[68%] rounded-full border border-dashed border-accent/30" />

          {/* Center */}
          <div className="headline z-10 grid h-24 w-24 place-items-center rounded-full bg-accent text-3xl font-semibold text-obsidian shadow-glow">
            AK
          </div>

          {/* Technologies */}
          <div className="absolute inset-0 animate-orbit">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className={`orbit-item-${index + 1} absolute left-1/2 top-1/2 -ml-14 -mt-5 grid h-10 w-28 place-items-center rounded-full border border-white/10 bg-panel text-xs font-semibold text-white shadow-premium`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
