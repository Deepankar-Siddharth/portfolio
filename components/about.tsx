"use client";

import useReveal from "@/lib/use-reveal";
import { ABOUT, FOCUS } from "@/lib/content";

export default function AboutSection() {
  useReveal();

  return (
    <section id="about" className="section section-paper text-ink" aria-labelledby="about-heading">
      <div className="container-x py-28 md:py-40">
        <div className="mb-20" data-reveal>
          <p className="overline mb-4">07 · About</p>
        </div>

        <h2 id="about-heading" data-reveal className="display max-w-5xl leading-[0.92]">
          {ABOUT.statement}
        </h2>

        <div className="mt-20 space-y-6 md:mt-28">
          {ABOUT.paragraphs.map((p) => (
            <p
              key={p}
              data-reveal
              className="max-w-3xl text-2xl leading-snug text-ink/85 md:text-3xl"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mt-20" data-reveal>
          <p className="overline mb-8">Currently exploring</p>
          <ul className="flex flex-col gap-6 md:flex-row md:gap-10">
            {FOCUS.map((f, i) => (
              <li key={f} className="flex items-baseline gap-4">
                <span className="mono text-sm text-ink/50">0{i + 1}</span>
                <span className="display-md">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}