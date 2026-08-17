"use client";

import { useEffect, useRef } from "react";
import useReveal from "@/lib/use-reveal";
import { SITE } from "@/lib/content";

export default function Hero() {
  useReveal();
  const glowRef = useRef<HTMLDivElement>(null);

  // Cursor-following radial glow (fine pointer + no reduced motion only).
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !glowRef.current) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle 320px at ${cx}px ${cy}px, rgba(216,255,62,0.08), transparent 70%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      className="section relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
      aria-labelledby="hero-name"
    >
      <div ref={glowRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-end pb-10 pt-32">
        <p className="overline mb-6 animate-fade-up" data-reveal>
          Portfolio — {new Date().getFullYear()}
        </p>

        <h1 id="hero-name" className="display block leading-[0.9]">
          <span className="line-reveal in delay-1">
            <span className="block">{SITE.firstName}</span>
          </span>
          <span className="line-reveal delay-2" data-reveal>
            <span className="text-outline block">{SITE.lastName}</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-end" data-reveal>
          <p className="lede max-w-md">
            {SITE.title} building{" "}
            <span className="text-paper">practical products</span>,{" "}
            <span className="text-paper">automation tools</span> and{" "}
            <span className="text-paper">privacy-focused software</span>.
          </p>

          <div className="mono text-sm md:text-right" aria-label="Disciplines">
            {SITE.roles.map((role, i) => (
              <div key={role} className="flex items-center justify-end gap-3">
                <span className="text-muted">0{i + 1}</span>
                <span className="uppercase tracking-[0.18em]">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x relative z-10 flex items-end justify-between pb-8">
        <a
          href="#intro"
          className="btn-magnetic mono text-xs uppercase tracking-[0.2em] text-muted"
          data-reveal
        >
          <span>Scroll to explore</span>
          <span className="btn-arrow" aria-hidden="true">↓</span>
        </a>
        <a
          href="#work"
          className="mono hidden text-xs uppercase tracking-[0.2em] text-muted sm:block"
          data-reveal
        >
          Work ↓
        </a>
      </div>
    </section>
  );
}