"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function GsapEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>("[data-tilt-card]");
    const cleanups = cards.map((card) => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 7;
        const rotateX = ((y / rect.height) - 0.5) * -7;
        gsap.to(card, { rotateX, rotateY, duration: 0.35, ease: "power2.out" });
      };
      const leave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: "power2.out" });
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      };
    });

    gsap.to("[data-parallax='slow']", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
