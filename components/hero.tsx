"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SITE } from "@/lib/content";
import ThreeElement from "./three-element";

type HeroStats = {
  repositories: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
  since: string;
};

const ROLES = ["Automation", "Full-Stack", "Android"];
const MARKERS = [
  { index: "01", label: "Work" },
  { index: "02", label: "Build" },
  { index: "03", label: "Stack" },
  { index: "04", label: "GitHub" },
  { index: "05", label: "Journey" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero({ stats }: { stats: HeroStats | null }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState(MARKERS[0]);

  // Rotating identity marker (respects reduced motion, desktop only).
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const id = setInterval(() => {
      setMarker((m) => MARKERS[(MARKERS.indexOf(m) + 1) % MARKERS.length]);
    }, 2600);
    return () => clearInterval(id);
  }, [reduced]);

  // Layered parallax: glow (slowest), grid (slow), name (subtle),
  // supporting text (different), 3D (stronger). Fine pointers + motion only.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || prefersReduced) return;

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
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const nx = cx / window.innerWidth - 0.5;
      const ny = cy / window.innerHeight - 0.5;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle 460px at ${cx}px ${cy}px, rgba(216,255,62,0.07), transparent 70%)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${nx * -10}px, ${ny * -8}px, 0)`;
      }
      if (nameRef.current) {
        nameRef.current.style.transform = `translate3d(${nx * -14}px, ${ny * -10}px, 0)`;
      }
      if (supportRef.current) {
        supportRef.current.style.transform = `translate3d(${nx * 20}px, ${ny * 14}px, 0)`;
      }
      if (threeRef.current) {
        threeRef.current.style.transform = `translate3d(${nx * 34}px, ${ny * 24}px, 0)`;
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

  // Cinematic recede as the visitor scrolls into the Intro section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Layered scroll parallax: each layer moves at its own depth.
  const animate = !reduced;
  const nameY1 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const nameY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);
  const threeY = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -36]);

  return (
    <MotionConfig reducedMotion={reduced ? "always" : "user"}>
      <section
        ref={sectionRef}
        id="hero"
        className="section relative flex min-h-[100svh] flex-col overflow-hidden text-paper"
        aria-labelledby="hero-name"
      >
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div ref={glowRef} className="absolute inset-0" />
          <motion.div style={{ y: animate ? bgY : 0 }} className="absolute inset-0 will-change-transform">
            <div ref={bgRef} className="hero-bg absolute inset-0 will-change-transform">
              <div className="hero-grid absolute inset-0" />
              <div className="hero-grain absolute inset-0" />
              <div className="hero-orbit absolute right-[-10rem] top-1/2 hidden -translate-y-1/2 lg:block" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex flex-1 flex-col"
        >
          {/* Top metadata */}
          <header className="container-x flex items-center justify-between pt-7 md:pt-9">
            <motion.span
              className="overline"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              Portfolio — {new Date().getFullYear()}
            </motion.span>
            <motion.span
              className="overline hidden sm:inline"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              Software Developer
            </motion.span>
          </header>

          {/* Main composition */}
          <div className="container-x flex flex-1 flex-col justify-center pb-8 pt-10 md:pt-14">
            {/* Positioning line */}
            <motion.div
              className="mb-8 flex items-center gap-4 md:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            >
              <span className="h-px w-10 bg-acid" aria-hidden="true" />
              <p className="mono text-[11px] uppercase tracking-[0.22em] text-paper/75">
                Automation · Full-Stack · Android
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              {/* Name */}
              <div ref={nameRef} className="lg:col-span-8 will-change-transform">
                <h1 id="hero-name" className="display hero-name block leading-[0.86]">
                  <motion.div style={{ y: animate ? nameY1 : 0 }} className="will-change-transform">
                    <span className="hero-mask block">
                      <motion.span
                        className="block"
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.95, delay: 0.35, ease: EASE }}
                      >
                        {SITE.firstName}
                      </motion.span>
                    </span>
                  </motion.div>
                  <motion.div
                    style={{ y: animate ? nameY2 : 0, scale: animate ? nameScale : 1 }}
                    className="will-change-transform"
                  >
                    <span className="hero-mask block">
                      <motion.span
                        className="hero-name--alt text-outline block"
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.95, delay: 0.48, ease: EASE }}
                      >
                        {SITE.lastName}
                      </motion.span>
                    </span>
                  </motion.div>
                </h1>
              </div>

              {/* Right: identity marker + 3D (desktop) */}
              <div className="hidden flex-col items-end gap-8 lg:col-span-4 lg:flex">
                <motion.div
                  className="identity-marker mono text-[10px] uppercase tracking-[0.22em]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
                  aria-hidden="true"
                >
                  <span className="text-acid">DS</span>
                  <span className="mx-2 text-muted">/</span>
                  <span className="text-muted">{marker.index}</span>
                  <span className="ml-2 text-paper/70">{marker.label}</span>
                </motion.div>
                <motion.div
                  ref={threeRef}
                  className="flex items-end justify-end will-change-transform"
                  aria-hidden="true"
                >
                  <motion.div style={{ y: animate ? threeY : 0 }} className="will-change-transform">
                    <motion.div
                      data-cursor="explore"
                      className="hero-three relative block h-52 w-52 md:h-64 md:w-64"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                    >
                      <ThreeElement />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Positioning + statement */}
            <motion.div
              ref={supportRef}
              className="mt-10 max-w-xl will-change-transform md:mt-12"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            >
              <p className="mono text-sm uppercase tracking-[0.22em] text-acid">
                {SITE.title}
              </p>
              <p className="lede mt-4 text-paper/90">
                I build software that eliminates repetitive work — practical
                products, automation tools and privacy-focused software.
              </p>
            </motion.div>
          </div>

          {/* Signal strip */}
          {stats && (
            <motion.div
              className="container-x border-t border-line py-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            >
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3 mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span>
                  <b className="mr-2 text-sm text-paper">{stats.repositories}</b>
                  public repos
                </span>
                <span>
                  <b className="mr-2 text-sm text-paper">{stats.followers}</b>
                  followers
                </span>
                <span>
                  <b className="mr-2 text-sm text-paper">{stats.since}</b>
                  building since
                </span>
                <span className="ml-auto hidden sm:inline">
                  <b className="mr-2 text-sm text-paper">{stats.stars}</b> stars ·{" "}
                  <b className="ml-2 text-sm text-paper">{stats.forks}</b> forks
                </span>
              </div>
            </motion.div>
          )}

          {/* Bottom info bar */}
          <motion.div
            className="container-x hidden items-center justify-between border-t border-line py-4 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
          >
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Based in India
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {ROLES.join(" · ")}
            </span>
            <a
              href="#intro"
              className="u mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-paper/80"
            >
              Scroll ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator (mobile) */}
        <motion.a
          href="#intro"
          className="hero-scroll-cue container-x relative z-10 flex items-center justify-between pb-7 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
        >
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Scroll to explore
          </span>
          <span className="hero-scroll-line" aria-hidden="true" />
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
            01 / Work
          </span>
        </motion.a>
      </section>
    </MotionConfig>
  );
}