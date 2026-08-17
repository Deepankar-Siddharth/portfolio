"use client";

import { useEffect } from "react";

/**
 * Observes [data-reveal] and .line-reveal elements and marks them `.in`
 * when scrolled into view. Respects prefers-reduced-motion (CSS handles
 * the no-motion state; this only toggles the class for the animated path).
 */
export default function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll("[data-reveal], .line-reveal")
    ) as HTMLElement[];

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}