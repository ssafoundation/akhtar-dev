import { skills } from "@/data/site";

export function SkillsOrbit() {
  return (
    <section className="section-pad border-y border-white/10 bg-white/[0.02]">
      <div className="container-shell grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">Skills</p>
          <h2 className="headline text-4xl font-semibold sm:text-6xl">A focused stack orbiting around business-grade execution.</h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            No noisy progress bars. The stack is a connected system: frontend polish, CMS flexibility, eCommerce fluency, animation, and clean TypeScript architecture.
          </p>
        </div>
        <div className="relative mx-auto grid h-[320px] w-[320px] place-items-center rounded-full border border-white/10 sm:h-[420px] sm:w-[420px]">
          <div className="absolute h-[68%] w-[68%] rounded-full border border-dashed border-accent/30" />
          <div className="headline z-10 grid h-24 w-24 place-items-center rounded-full bg-accent text-3xl font-semibold text-obsidian shadow-glow">AK</div>
          <div className="absolute inset-0 animate-orbit">
            {skills.map((skill, index) => (
              <span
                key={skill}
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
