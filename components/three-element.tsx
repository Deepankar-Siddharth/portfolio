"use client";

import { Suspense, lazy, useSyncExternalStore } from "react";

const Scene = lazy(() => import("./scene"));

function detectWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return detectWebGL();
}

function subscribe(callback: () => void): () => void {
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  mqReduced.addEventListener("change", callback);
  return () => mqReduced.removeEventListener("change", callback);
}

export default function ThreeElement() {
  const supported = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (!supported) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative h-40 w-40 md:h-60 md:w-60">
          <div className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full border border-paper/20" />
          <div className="absolute inset-6 animate-[spin-reverse_10s_linear_infinite] rounded-full border border-dashed border-paper/20" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid" />
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  );
}