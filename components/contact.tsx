"use client";

import { motion, useReducedMotion } from "motion/react";
import useReveal from "@/lib/use-reveal";
import { CONTACT } from "@/lib/content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Contact() {
  useReveal();
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="contact"
      className="section section-ember text-ink"
      aria-labelledby="contact-heading"
      initial={reduced ? false : { backgroundColor: "#ffd28f" }}
      whileInView={reduced ? undefined : { backgroundColor: "#ff5a36" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.6, ease: EASE }}
    >
      <div className="container-x flex min-h-[80vh] flex-col justify-center py-28 md:py-40">
        <div>
          <p className="overline mb-10" data-reveal>08 · Contact</p>
          <h2 id="contact-heading" className="display leading-[0.88]">
            {CONTACT.headlines.map((h, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              >
                {i === CONTACT.headlines.length - 1 ? (
                  <span className="text-outline-ink">{h}</span>
                ) : (
                  h
                )}
              </motion.span>
            ))}
          </h2>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <p className="mono text-sm uppercase tracking-[0.18em] text-ink/70">
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
        </motion.div>
      </div>
    </motion.section>
  );
}