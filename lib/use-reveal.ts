"use client";

import { useEffect } from "react";

/**
 * Scroll reveal — hardened so content NEVER depends on animation:
 *
 * - No JS / no hydration: nothing is hidden (no `.js [data-reveal]` CSS gate).
 * - JS present, normal motion: only elements below the fold get `.will-reveal`
 *   (opacity 0) after mount, then `.in` once they enter the viewport.
 * - Reduced motion or no IntersectionObserver: everything is shown immediately.
 *
 * One shared IntersectionObserver serves the whole document, so any mounted
 * consumer initializes it exactly once.
 */

let observer: IntersectionObserver | null = null;
let initialized = false;

function getElements(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll("[data-reveal], .line-reveal")
  ) as HTMLElement[];
}

function reveal(el: HTMLElement) {
  el.classList.remove("will-reveal");
  el.classList.add("in");
}

function initReveal() {
  if (initialized) return;
  initialized = true;

  if (!("IntersectionObserver" in window)) {
    getElements().forEach(reveal);
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    getElements().forEach(reveal);
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );

  for (const el of getElements()) {
    const rect = el.getBoundingClientRect();
    const aboveFold = rect.top < window.innerHeight && rect.bottom > 0;
    if (aboveFold) {
      reveal(el);
    } else {
      el.classList.add("will-reveal");
      observer.observe(el);
    }
  }
}

export default function useReveal() {
  useEffect(() => {
    initReveal();
  }, []);
}
