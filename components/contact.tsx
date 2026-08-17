"use client";

import useReveal from "@/lib/use-reveal";
import { CONTACT } from "@/lib/content";

export default function Contact() {
  useReveal();

  return (
    <section id="contact" className="section section-ember text-ink" aria-labelledby="contact-heading">
      <div className="container-x flex min-h-[80vh] flex-col justify-center py-28 md:py-40">
        <div>
          <p className="overline mb-8">08 · Contact</p>
          <h2 id="contact-heading" data-reveal className="display leading-[0.9]">
            {CONTACT.headlines.map((h, i) => (
              <span key={i} className="block">
                {h}
              </span>
            ))}
          </h2>
        </div>

        <div data-reveal>
          <p className="mono mt-10 text-sm uppercase tracking-[0.18em] text-ink/70">
            Find me at
          </p>
          <ul className="mt-6 flex flex-col gap-4">
            {CONTACT.channels.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  data-cursor="view"
                  className="u display-md group inline-flex items-center gap-4 text-ink"
                >
                  <span className="mono text-base uppercase tracking-[0.16em] text-ink/60">
                    {c.label}
                  </span>
                  <span className="mono text-base text-ink/60 transition-transform duration-300 group-hover:translate-x-2">
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