"use client";

import useReveal from "@/lib/use-reveal";

const CAPABILITIES = [
  { index: "01", label: "Products" },
  { index: "02", label: "Automation" },
  { index: "03", label: "Full-stack systems" },
  { index: "04", label: "Android" },
];

export default function Intro() {
  useReveal();

  return (
    <section id="intro" className="section section-paper text-ink" aria-labelledby="intro-heading">
      <div className="container-x py-32 md:py-44">
        <p className="overline mb-12" data-reveal>01 · Intro</p>

        <h2 id="intro-heading" className="text-[clamp(2.75rem,9vw,8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
          <span className="line-reveal" data-reveal>
            <span className="block">I build</span>
          </span>
          <span className="line-reveal" data-reveal>
            <span className="text-outline-ink block">practical</span>
          </span>
          <span className="line-reveal" data-reveal>
            <span className="block">software.</span>
          </span>
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-12" data-reveal>
          <p className="lede text-ink md:col-span-6">
            Software that removes repetitive work — across products,
            automation, full-stack systems and Android, built with a
            privacy-first mindset.
          </p>
          <div className="md:col-span-5 md:col-start-8">
            <ul className="border-t border-ink/20">
              {CAPABILITIES.map((c) => (
                <li
                  key={c.index}
                  className="group flex items-baseline justify-between border-b border-ink/20 py-4"
                >
                  <span className="mono text-xs text-ink/50">{c.index}</span>
                  <span className="display-md text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-4xl">
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}