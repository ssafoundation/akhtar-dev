import { tech } from "@/data/site";

export function TrustedTech() {
  return (
    <section className="border-y border-white/10 py-6">
      <div className="container-shell flex flex-col gap-4 md:flex-row md:items-center">
        <p className="text-sm uppercase tracking-[0.22em] text-muted">Trusted stack</p>
        <div className="flex flex-1 flex-wrap gap-3 md:justify-end">
          {tech.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/86">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
