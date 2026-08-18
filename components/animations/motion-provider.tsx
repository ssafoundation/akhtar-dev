"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.8,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
