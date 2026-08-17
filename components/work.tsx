"use client";

import Link from "next/link";
import { motion } from "motion/react";
import useReveal from "@/lib/use-reveal";
import { PROJECTS } from "@/lib/content";
import ProjectVisual from "./project-visual";
import { RevealOnce, ScrollParallax } from "./scroll/reveals";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BRIEF_ROWS = ["briefProblem", "briefContribution", "briefEngineering", "briefResult"] as const;
const ROW_LABELS: Record<(typeof BRIEF_ROWS)[number], string> = {
  briefProblem: "Problem",
  briefContribution: "Contribution",
  briefEngineering: "Engineering",
  briefResult: "Result",
};

function ProjectTile({ project, flagship }: { project: (typeof PROJECTS)[number]; flagship: boolean }) {
  const visualSpan = flagship ? "md:col-span-7" : "md:col-span-6";
  const contentSpan = flagship ? "md:col-span-5" : "md:col-span-6";
  const visualOrder = flagship ? "md:order-1" : project.slug === "instant-ledger" ? "md:order-2" : "md:order-1";
  const contentOrder = flagship ? "md:order-2" : project.slug === "instant-ledger" ? "md:order-1" : "md:order-2";

  return (
    <article
      className={`project-tile group relative overflow-hidden border border-line transition-colors duration-500 hover:border-paper/25 ${
        flagship
          ? "project-tile--flagship bg-gradient-to-b from-[rgba(216,255,62,0.05)] to-transparent"
          : ""
      }`}
      data-cursor="view"
    >
      {/* Meta row */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4 md:px-10">
        <div className="flex items-baseline gap-4">
          <span className="mono text-xs text-acid">{project.index}</span>
          <motion.h3
            className={`display-md ${flagship ? "text-acid md:text-5xl" : "text-paper md:text-4xl"}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          >
            {project.title}
          </motion.h3>
        </div>
        <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-muted">
          <span>{project.position}</span>
          <span aria-hidden="true">·</span>
          <span className="text-paper/80">{project.status}</span>
        </div>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-12 md:gap-10 md:p-10">
        {/* Visual */}
        <div className={`relative order-2 h-60 overflow-hidden rounded-xl ${visualSpan} ${visualOrder} ${flagship ? "md:h-[28rem]" : "md:h-80 lg:h-96"}`}>
          <ScrollParallax y={[-20, 20]} className="absolute inset-0">
            <div className="absolute inset-0 scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
              <ProjectVisual kind={project.visual} />
            </div>
          </ScrollParallax>
        </div>

        {/* Content */}
        <div className={`order-1 flex flex-col ${contentSpan} ${contentOrder}`}>
          <p className="lede">{project.tagline}</p>
          <p className="mono mt-3 text-xs uppercase tracking-[0.16em] text-muted">
            {project.category}
          </p>

          {/* Concise evidence rows */}
          <dl className="mt-8 space-y-0 border-t border-line">
            {BRIEF_ROWS.map((row) => (
              <div key={row} className="grid grid-cols-12 gap-3 border-b border-line py-3.5">
                <dt className="mono col-span-4 text-[10px] uppercase tracking-[0.18em] text-muted">
                  {ROW_LABELS[row]}
                </dt>
                <dd className="col-span-8 text-[13px] uppercase leading-snug tracking-[0.08em] text-paper/90">
                  {project[row]}
                </dd>
              </div>
            ))}
          </dl>

          {/* Verified features (only for Instant Ledger) */}
          {project.features && (
            <>
              <p className="mono mt-8 text-[10px] uppercase tracking-[0.18em] text-muted">
                Verified features
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.features.map((f) => (
                  <span key={f} className="mono rounded-full border border-line px-3 py-1 text-[11px] text-paper/80">
                    {f}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Tech */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((s) => (
              <span key={s} className="mono rounded-full border border-line px-3 py-1 text-[11px] text-paper/80">
                {s}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="btn-magnetic mono border border-line px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-paper transition-colors duration-300 hover:border-acid hover:text-acid"
              >
                {link.label}
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          {/* View case study */}
          <Link
            href={`/work/${project.slug}`}
            className="btn-magnetic mono mt-8 text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-acid"
          >
            View case study
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  useReveal();

  return (
    <section id="work" className="section section-ink text-paper" aria-labelledby="work-heading">
      <div className="container-x py-28 md:py-36">
        <div className="flex items-end justify-between" data-reveal>
          <div>
            <p className="overline mb-4">02 · Selected work</p>
            <h2 id="work-heading" className="display-2">
              Featured
              <br />
              <span className="text-outline">projects</span>
            </h2>
          </div>
          <a href="#work" className="mono hidden text-xs uppercase tracking-[0.2em] text-muted md:block" data-reveal>
            (3)
          </a>
        </div>

        <div className="mt-20 flex flex-col gap-14">
          {PROJECTS.map((p, i) => (
            <RevealOnce key={p.slug} y={24} scale={0.97} delay={i * 0.08}>
              <ProjectTile project={p} flagship={i === 0} />
            </RevealOnce>
          ))}
        </div>
      </div>
    </section>
  );
}