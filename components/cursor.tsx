"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return fine && !reduced;
}

function subscribe(callback: () => void): () => void {
  const mqFine = window.matchMedia("(pointer: fine)");
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  mqFine.addEventListener("change", callback);
  mqReduced.addEventListener("change", callback);
  return () => {
    mqFine.removeEventListener("change", callback);
    mqReduced.removeEventListener("change", callback);
  };
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const visible = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    let cx = -100;
    let cy = -100;
    let tx = -100;
    let ty = -100;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      if (dotRef.current && labelRef.current) {
        dotRef.current.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`;
        labelRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      if (!labelRef.current) return;
      if (t) {
        const mode = t.getAttribute("data-cursor");
        labelRef.current.textContent =
          mode === "open" ? "Open →" : mode === "explore" ? "Explore" : "View →";
        labelRef.current.style.opacity = "1";
        labelRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(1)`;
      } else {
        labelRef.current.textContent = "";
        labelRef.current.style.opacity = "0";
      }
    };

    const onDown = () => {
      if (dotRef.current) dotRef.current.style.scale = "0.6";
    };
    const onUp = () => {
      if (dotRef.current) dotRef.current.style.scale = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="ds-cursor" aria-hidden="true">
      <div ref={dotRef} className="ds-cursor-dot" style={{ opacity: 0 }} />
      <div ref={labelRef} className="ds-cursor-label" style={{ opacity: 0 }}>
        View →
      </div>
    </div>
  );
}