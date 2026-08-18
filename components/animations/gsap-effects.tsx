"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function GsapEffects() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Disable GSAP effects for touch devices
    // and users who prefer reduced motion.
    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cleanups: (() => void)[] = [];

    // --------------------------------------------------
    // 1. Desktop card tilt
    // --------------------------------------------------

    const cards = gsap.utils.toArray<HTMLElement>("[data-tilt-card]");

    cards.forEach((card) => {
      const rotateXTo = gsap.quickTo(card, "rotateX", {
        duration: 0.25,
        ease: "power2.out",
      });

      const rotateYTo = gsap.quickTo(card, "rotateY", {
        duration: 0.25,
        ease: "power2.out",
      });

      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 7;
        const rotateX = (y / rect.height - 0.5) * -7;

        rotateXTo(rotateX);
        rotateYTo(rotateY);
      };

      const leave = () => {
        rotateXTo(0);
        rotateYTo(0);
      };

      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);

      cleanups.push(() => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      });
    });

    // --------------------------------------------------
    // 2. Desktop parallax
    // --------------------------------------------------

    const parallaxElements = gsap.utils.toArray<HTMLElement>(
      "[data-parallax='slow']",
    );

    parallaxElements.forEach((element) => {
      gsap.to(element, {
        yPercent: -12,
        ease: "none",

        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",

          // Smoother and lighter than scrub: true
          scrub: 0.5,
        },
      });
    });

    // --------------------------------------------------
    // Cleanup
    // --------------------------------------------------

    return () => {
      cleanups.forEach((cleanup) => cleanup());

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });

      gsap.killTweensOf("[data-tilt-card]");
      gsap.killTweensOf("[data-parallax='slow']");
    };
  }, []);

  return null;
}
