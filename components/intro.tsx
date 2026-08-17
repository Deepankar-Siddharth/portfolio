"use client";

import useReveal from "@/lib/use-reveal";

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

        <div className="mt-14 grid gap-10 md:grid-cols-12" data-reveal>
          <p className="lede text-ink md:col-span-6">
            {`I'm ${"Deepankar Siddharth"}. I make software that eliminates
            repetitive work — automation, full-stack applications and
            Android products, all built with a privacy-first mindset.`}
          </p>
          <div className="md:col-span-4 md:col-start-9 mono text-xs text-ink/60 leading-relaxed">
            <p>Automation tools ↓</p>
            <p>Full-stack systems ↓</p>
            <p>Android apps ↓</p>
            <p>Privacy & local-first ↓</p>
          </div>
        </div>
      </div>
    </section>
  );
}