"use client";

import Link from "next/link";
import useReveal from "@/lib/use-reveal";
import { PROJECTS } from "@/lib/content";
import ProjectVisual from "./project-visual";

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
          <a
            href="#work"
            className="mono hidden text-xs uppercase tracking-[0.2em] text-muted md:block"
            data-reveal
          >
            (3)
          </a>
        </div>

        <div className="mt-20 space-y-6">
          {PROJECTS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              data-cursor="view"
              data-reveal
              className={`group relative block overflow-hidden border border-line transition-colors duration-500 hover:border-paper/30 ${
                i === 0 ? "work-tile--flagship" : ""
              }`}
            >
              <div className="grid gap-6 p-6 md:grid-cols-12 md:gap-10 md:p-10">
                {/* Visual */}
                <div className="relative order-2 h-52 overflow-hidden rounded-xl md:order-1 md:col-span-6 md:h-72 lg:h-80">
                  <div className="absolute inset-0 scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                    <ProjectVisual kind={p.visual} />
                  </div>
                </div>

                {/* Content */}
                <div className="order-1 flex flex-col md:order-2 md:col-span-6">
                  <div className="mono text-xs text-acid">{p.index}</div>
                  <h3 className="display-md mt-3 md:text-6xl">{p.title}</h3>
                  <p className="mono mt-3 text-xs uppercase tracking-[0.18em] text-muted">
                    {p.position}
                  </p>
                  <p className="lede mt-6 max-w-md">{p.tagline}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="mono rounded-full border border-line px-3 py-1 text-[11px] text-paper/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-3 mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-acid">
                    <span>View case study</span>
                    <span className="btn-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}