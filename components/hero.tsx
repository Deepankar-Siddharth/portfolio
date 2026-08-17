"use client";

import { useEffect, useRef } from "react";
import useReveal from "@/lib/use-reveal";
import { SITE } from "@/lib/content";

type HeroStats = {
  repositories: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
};

export default function Hero({ stats }: { stats: HeroStats | null }) {
  useReveal();
  const glowRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // Cursor-following radial glow + restrained typography parallax.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (layerRef.current) {
        const dx = (e.clientX / window.innerWidth - 0.5) * 14;
        const dy = (e.clientY / window.innerHeight - 0.5) * 10;
        layerRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };

    const loop = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle 340px at ${cx}px ${cy}px, rgba(216,255,62,0.09), transparent 70%)`;
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

        <div ref={layerRef} className="will-change-transform">
          <h1 id="hero-name" className="display block leading-[0.9]">
            <span className="line-reveal in delay-1">
              <span className="block">{SITE.firstName}</span>
            </span>
            <span className="line-reveal delay-2" data-reveal>
              <span className="text-outline block">{SITE.lastName}</span>
            </span>
          </h1>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-end" data-reveal>
          <div>
            <p className="lede max-w-md">
              {SITE.title} — {SITE.tagline}
            </p>
            <p className="mono mt-6 max-w-md text-sm uppercase tracking-[0.18em] text-paper">
              I build software that eliminates repetitive work.
            </p>
          </div>

          <div className="mono text-sm md:text-right" aria-label="Disciplines">
            {SITE.roles.map((role, i) => (
              <div key={role} className="flex items-center justify-end gap-3">
                <span className="text-muted">0{i + 1}</span>
                <span className="uppercase tracking-[0.18em]">{role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Account snapshot — live from the GitHub data layer */}
        {stats && (
          <div
            data-reveal
            className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 mt-12 mono text-xs uppercase tracking-[0.16em] text-muted"
          >
            <span>
              <span className="text-paper">{stats.repositories}</span> repos
            </span>
            <span>
              <span className="text-paper">{stats.followers}</span> followers
            </span>
            <span>
              <span className="text-paper">{stats.following}</span> following
            </span>
            <span>
              <span className="text-paper">{stats.stars}</span> stars
            </span>
            <span>
              <span className="text-paper">{stats.forks}</span> forks
            </span>
          </div>
        )}
      </div>

      <div className="container-x relative z-10 flex items-end justify-between pb-8">
        <a
          href="#intro"
          className="btn-magnetic mono text-xs uppercase tracking-[0.2em] text-muted"
          data-reveal
        >
          <span>Scroll to explore</span>
          <span className="btn-arrow btn-bob" aria-hidden="true">↓</span>
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