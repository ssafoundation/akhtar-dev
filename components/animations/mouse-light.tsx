"use client";

import { useEffect } from "react";

export function MouseLight() {
  useEffect(() => {
    const setPosition = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", setPosition);
    return () => window.removeEventListener("pointermove", setPosition);
  }, []);

  return <div className="mouse-light" aria-hidden="true" />;
}
