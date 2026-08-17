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
              className="flex w-[78vw] shrink-0 snap-start flex-col border-l border-line pl-6 pr-10 sm:w-[46vw] md:w-[38vw] lg:w-[30vw]"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="mono text-xs text-acid">0{i + 1}</span>
                <span className="mono text-xs uppercase tracking-[0.18em] text-muted">
                  {step.phase}
                </span>
              </div>
              <h3 className="display-md md:text-4xl">{step.title}</h3>
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
              <span className="mt-auto pt-8 mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {step.period}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}