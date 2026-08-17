"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import useReveal from "@/lib/use-reveal";
import usePinnedMode from "@/lib/use-pinned-mode";
import { JOURNEY } from "@/lib/content";

const ACCENTS: Record<string, string> = {
  "2020": "#d8ff3e",
  "2021": "#7dd3fc",
  "2022": "#7dd3fc",
  "2023–24": "#a78bfa",
  "2025": "#a78bfa",
  "2026": "#ff5a36",
};

function JourneyCard({ step, index }: { step: (typeof JOURNEY)[number]; index: number }) {
  const accent = ACCENTS[step.period] ?? "#d8ff3e";
  return (
    <article
      className="journey-article group relative flex w-[80vw] shrink-0 snap-start flex-col border-l border-line pl-6 pr-10 transition-colors duration-500 sm:w-[46vw] md:w-[38vw] lg:w-[30vw]"
      style={{ "--step-accent": accent } as CSSProperties}
    >
      {/* node marker */}
      <span
        className="journey-node absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full"
        aria-hidden="true"
      />

      <div className="mb-6 flex items-center gap-4">
        <span className="journey-index mono text-xs">0{index}</span>
        <span className="mono text-xs uppercase tracking-[0.18em] text-muted">
          {step.phase.split("· ").slice(1).join("") || step.phase}
        </span>
      </div>

      <p className="journey-period display-md md:text-5xl">{step.period}</p>
      <h3 className="display-md mt-4 md:text-4xl">{step.title}</h3>
      <p className="mt-4 max-w-sm text-paper/80">{step.body}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {step.tags.map((t) => (
          <span
            key={t}
            className="mono rounded-full border border-line px-3 py-1 text-[11px] text-paper/70"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Journey() {
  useReveal();
  const pinned = usePinnedMode();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(p, [0, 1], ["0%", "-78%"]);

  const cards = JOURNEY.map((step, i) => (
    <JourneyCard key={step.phase} step={step} index={i + 1} />
  ));

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`section section-ink text-paper overflow-x-clip ${pinned ? "lg:h-[200vh]" : ""}`}
      aria-labelledby="journey-heading"
    >
      <div className={`container-x py-28 md:py-40 ${pinned ? "lg:py-0" : ""}`}>
        <div className="mb-16 flex items-end justify-between" data-reveal>
          <div>
            <p className="overline mb-4">06 · Journey</p>
            <h2 id="journey-heading" className="display-2">
              A timeline,
              <br />
              <span className="text-outline">not a resume</span>
            </h2>
          </div>
          {pinned ? (
            <p className="mono hidden text-xs uppercase tracking-[0.2em] text-muted md:block">
              (right → left)
            </p>
          ) : (
            <p className="mono hidden text-xs uppercase tracking-[0.2em] text-muted md:block">
              (scroll horizontally)
            </p>
          )}
        </div>

        {pinned ? (
          <div className="journey-stage lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
            <motion.div style={{ x: trackX }} className="lg:flex lg:gap-0">
              {cards}
            </motion.div>
          </div>
        ) : (
          <div
            className="no-scrollbar flex snap-x snap-mandatory gap-0 overflow-x-auto"
            data-reveal
          >
            {cards}
          </div>
        )}
      </div>
    </section>
  );
}