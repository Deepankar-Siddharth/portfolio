"use client";

import useReveal from "@/lib/use-reveal";
import { ABOUT, FOCUS } from "@/lib/content";
import { AltReveal } from "./scroll/reveals";

function splitLines(text: string, n: number): string[] {
  const words = text.split(/\s+/);
  const per = Math.ceil(words.length / n);
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    const chunk = words.slice(i * per, (i + 1) * per).join(" ");
    if (chunk) lines.push(chunk);
  }
  return lines;
}

const STATEMENT_LINES = splitLines(ABOUT.statement, 7);

export default function AboutSection() {
  useReveal();

  return (
    <section id="about" className="section section-paper text-ink overflow-x-clip" aria-labelledby="about-heading">
      <div className="container-x py-28 md:py-40">
        <div className="mb-20" data-reveal>
          <p className="overline mb-4">07 · About</p>
        </div>

        <h2 id="about-heading" className="display max-w-5xl leading-[0.92]">
          {STATEMENT_LINES.map((line, i) => (
            <AltReveal
              key={i}
              from={i % 2 === 0 ? "left" : "right"}
              distance={16}
              amount={0.5}
              className="block"
            >
              {line}
            </AltReveal>
          ))}
        </h2>

        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-12">
          {ABOUT.paragraphs.map((p, i) => (
            <p
              key={i}
              data-reveal
              className={
                i === 0
                  ? "md:col-span-7 text-2xl leading-snug text-ink/85 md:text-3xl"
                  : "md:col-span-5 text-lg leading-relaxed text-ink/75 md:text-xl"
              }
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mt-24 border-t border-ink/15 pt-12" data-reveal>
          <p className="overline mb-10">Currently exploring</p>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {FOCUS.map((f) => (
              <li key={f.name} className="border-l-2 border-ink/20 pl-5">
                <p className="focus-name">{f.name}</p>
                <p className="mono mt-2 text-xs uppercase tracking-[0.18em] text-ink/70">
                  {f.status}
                </p>
                <p className="mt-2 text-sm text-ink/70">{f.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}