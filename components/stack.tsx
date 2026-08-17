"use client";

import { useState } from "react";
import useReveal from "@/lib/use-reveal";
import { STACK } from "@/lib/content";

export default function Stack() {
  useReveal();
  const [active, setActive] = useState(0);

  return (
    <section id="stack" className="section section-ink text-paper" aria-labelledby="stack-heading">
      <div className="container-x py-28 md:py-40">
        <div className="mb-16 grid gap-8 md:grid-cols-2" data-reveal>
          <div>
            <p className="overline mb-4">04 · Technologies</p>
            <h2 id="stack-heading" className="display-2">
              Stack,
              <br />
              <span className="text-outline">evidenced</span>
            </h2>
          </div>
          <p className="lede self-end max-w-md md:justify-self-end">
            Hover a technology to see where it is actually used across public
            repositories. No badge walls — just what ships.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-xl border border-line"
          data-reveal
        >
          {STACK.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`group flex w-full flex-col gap-1 border-b border-line px-5 py-4 text-left transition-colors duration-300 last:border-b-0 focus-visible:outline-2 focus-visible:outline-acid md:flex-row md:items-center md:justify-between md:px-7 md:py-5 ${
                active === i ? "bg-acid text-ink" : "bg-transparent"
              }`}
            >
              <span className="display-md md:text-3xl">{item.name}</span>
              <span
                className={`mono text-xs uppercase tracking-[0.16em] ${
                  active === i ? "text-ink/70" : "text-muted"
                }`}
              >
                {active === i ? `Used in — ${item.usedIn}` : "Hover to reveal"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}