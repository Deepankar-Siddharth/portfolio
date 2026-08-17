"use client";

import useReveal from "@/lib/use-reveal";
import { CONTACT } from "@/lib/content";

export default function Contact() {
  useReveal();

  return (
    <section id="contact" className="section section-ember text-ink" aria-labelledby="contact-heading">
      <div className="container-x flex min-h-[80vh] flex-col justify-center py-28 md:py-40">
        <div>
          <p className="overline mb-10">08 · Contact</p>
          <h2 id="contact-heading" data-reveal className="display leading-[0.88]">
            {CONTACT.headlines.map((h, i) => (
              <span key={i} className="block">
                {i === CONTACT.headlines.length - 1 ? (
                  <span className="text-outline-ink">{h}</span>
                ) : (
                  h
                )}
              </span>
            ))}
          </h2>
        </div>

        <div data-reveal>
          <p className="mono mt-12 text-sm uppercase tracking-[0.18em] text-ink/70">
            Find me at
          </p>
          <ul className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-10">
            {CONTACT.channels.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  data-cursor="view"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="u display-md text-ink">{c.label}</span>
                  <span className="mono text-base text-ink/70 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}