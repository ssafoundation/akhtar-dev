"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-12">
      <div className="container-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="rounded-[8px] border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="headline text-5xl font-semibold text-white">
              <Counter value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
