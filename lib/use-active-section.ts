"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared scroll-spy — a single IntersectionObserver for the whole page.
 * Consumers (site header, section rail) read the same active section id.
 */

const SECTION_IDS = [
  "hero",
  "intro",
  "work",
  "build",
  "stack",
  "github",
  "journey",
  "about",
  "contact",
];

let active = "hero";
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();

function onIntersect(entries: IntersectionObserverEntry[]) {
  let next = active;
  for (const entry of entries) {
    if (entry.isIntersecting) next = entry.target.id;
  }
  if (next !== active) {
    active = next;
    listeners.forEach((l) => l());
  }
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  if (!observer && typeof window !== "undefined") {
    observer = new IntersectionObserver(onIntersect, {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    });
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  }
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): string {
  return active;
}

function getServerSnapshot(): string {
  return "hero";
}

export default function useActiveSection(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
