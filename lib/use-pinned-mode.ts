"use client";

import { useSyncExternalStore } from "react";

/**
 * True only client-side when the visitor gets the pinned, choreographed
 * experiences: fine pointer, motion allowed, wide viewport (>= lg).
 * SSR snapshot is false, so no-JS / server HTML always renders the static,
 * fully-visible layout — no empty pinned regions without JS.
 */

function read(): boolean {
  if (typeof window === "undefined") return false;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  return fine && !reduced && wide;
}

function subscribe(cb: () => void): () => void {
  const queries = [
    window.matchMedia("(pointer: fine)"),
    window.matchMedia("(prefers-reduced-motion: reduce)"),
    window.matchMedia("(min-width: 1024px)"),
  ];
  queries.forEach((q) => q.addEventListener("change", cb));
  return () => queries.forEach((q) => q.removeEventListener("change", cb));
}

export default function usePinnedMode(): boolean {
  return useSyncExternalStore(subscribe, read, () => false);
}
