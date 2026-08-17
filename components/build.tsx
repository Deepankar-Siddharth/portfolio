"use client";

import useReveal from "@/lib/use-reveal";
import { ENGINEERING } from "@/lib/content";

export default function Build() {
  useReveal();

  return (
    <section id="build" className="section section-ink text-paper" aria-labelledby="build-heading">
      <div className="container-x py-28 md:py-40">
        <div className="mb-16" data-reveal>
          <p className="overline mb-4">03 · What I build</p>
          <h2 id="build-heading" className="display-2">
            Things that
            <br />
            <span className="text-outline">work for you</span>
          </h2>
        </div>

        <div className="border-t border-line">
          {ENGINEERING.map((item, i) => (
            <div
              key={item.phrase}
              data-reveal
              className="group grid gap-4 border-b border-line py-10 md:grid-cols-12 md:items-center md:py-12"
            >
              <span className="mono text-xs text-muted md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="display-2 text-paper md:col-span-6 md:text-6xl">
                {item.phrase}
              </h3>
              <div className="md:col-span-5 md:pl-4">
                <p className="text-paper/80">{item.body}</p>
                <p className="mono mt-3 text-xs uppercase tracking-[0.16em] text-muted">
                  {item.evidence.join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}