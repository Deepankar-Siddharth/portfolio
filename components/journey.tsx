"use client";

import useReveal from "@/lib/use-reveal";
import { JOURNEY } from "@/lib/content";

export default function Journey() {
  useReveal();

  return (
    <section id="journey" className="section section-ink text-paper" aria-labelledby="journey-heading">
      <div className="container-x py-28 md:py-40">
        <div className="mb-16 flex items-end justify-between" data-reveal>
          <div>
            <p className="overline mb-4">06 · Journey</p>
            <h2 id="journey-heading" className="display-2">
              A timeline,
              <br />
              <span className="text-outline">not a resume</span>
            </h2>
          </div>
          <p className="mono hidden text-xs uppercase tracking-[0.2em] text-muted md:block">
            (scroll horizontally)
          </p>
        </div>

        <div
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-0 overflow-x-auto px-6"
          data-reveal
        >
          {JOURNEY.map((step, i) => (
            <article
              key={step.phase}
              className="group relative flex w-[80vw] shrink-0 snap-start flex-col border-l border-line pl-6 pr-10 transition-colors duration-500 hover:border-acid sm:w-[46vw] md:w-[38vw] lg:w-[30vw]"
            >
              {/* node marker */}
              <span
                className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-paper transition-colors duration-500 group-hover:bg-acid"
                aria-hidden="true"
              />

              <div className="mb-6 flex items-center gap-4">
                <span className="mono text-xs text-acid">0{i + 1}</span>
                <span className="mono text-xs uppercase tracking-[0.18em] text-muted">
                  {step.phase.split("· ").slice(1).join("") || step.phase}
                </span>
              </div>

              <p className="display-md text-outline-acid opacity-40 transition-opacity duration-500 group-hover:opacity-100 md:text-5xl">
                {step.period}
              </p>
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
          ))}
        </div>
      </div>
    </section>
  );
}