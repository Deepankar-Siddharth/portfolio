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

function getPointerSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: fine)").matches;
}

function subscribePointer(callback: () => void): () => void {
  const mqFine = window.matchMedia("(pointer: fine)");
  mqFine.addEventListener("change", callback);
  return () => mqFine.removeEventListener("change", callback);
}

export default function ThreeElement() {
  const supported = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const finePointer = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    () => true,
  );

  // Non-fine pointers (touch) and unsupported WebGL get a still, graphic fallback.
  if (!finePointer || !supported) {
    return (
      <div
        className="relative h-full w-full"
        role="img"
        aria-label="Abstract torus knot"
      >
        <div className="absolute inset-0 rounded-full border border-paper/20" />
        <div className="absolute inset-6 rounded-full border border-paper/10" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid" />
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  );
}