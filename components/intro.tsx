"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import useReveal from "@/lib/use-reveal";
import usePinnedMode from "@/lib/use-pinned-mode";

const CAPABILITIES = [
  { index: "01", label: "Products" },
  { index: "02", label: "Automation" },
  { index: "03", label: "Full-stack systems" },
  { index: "04", label: "Android" },
];

const STATEMENT = ["I build", "practical", "software."];

function StaticIntro() {
  useReveal();

  return (
    <section id="intro" className="section section-paper text-ink" aria-labelledby="intro-heading">
      <div className="container-x py-32 md:py-44">
        <p className="overline mb-12" data-reveal>01 · Intro</p>

        <h2 id="intro-heading" className="text-[clamp(2.75rem,9vw,8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
          <span className="line-reveal" data-reveal>
            <span className="block">{STATEMENT[0]}</span>
          </span>
          <span className="line-reveal" data-reveal>
            <span className="text-outline-ink block">{STATEMENT[1]}</span>
          </span>
          <span className="line-reveal" data-reveal>
            <span className="block">{STATEMENT[2]}</span>
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

function CapabilityItem({
  p,
  index,
  label,
}: {
  p: MotionValue<number>;
  index: number;
  label: string;
}) {
  const from = 0.74 + index * 0.05;
  const to = Math.min(1, 0.86 + index * 0.05);
  const opacity = useTransform(p, [from, to], [0, 1]);
  const x = useTransform(p, [from, to], [24, 0]);

  return (
    <motion.li
      style={{ opacity, x }}
      className="group flex items-baseline justify-between border-b border-ink/20 py-4"
    >
      <span className="mono text-xs text-ink/50">0{index + 1}</span>
      <span className="display-md text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-4xl">
        {label}
      </span>
    </motion.li>
  );
}

function PinnedIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const line1Y = useTransform(p, [0, 0.18], [40, 0]);
  const line1Opacity = useTransform(p, [0, 0.14], [0, 1]);
  const practicalOpacity = useTransform(p, [0.22, 0.42], [0, 1]);
  const softwareY = useTransform(p, [0.45, 0.68], ["9rem", "0rem"]);
  const softwareOpacity = useTransform(p, [0.45, 0.66], [0, 1]);
  const ledeOpacity = useTransform(p, [0.62, 0.76], [0, 1]);
  const ledeY = useTransform(p, [0.62, 0.78], [18, 0]);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="section relative text-ink lg:h-[190vh]"
      aria-labelledby="intro-heading"
    >
      <div className="section-paper lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="container-x py-28 lg:py-0">
          <motion.p
            className="overline mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            01 · Intro
          </motion.p>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h2
                id="intro-heading"
                className="text-[clamp(2.75rem,9vw,8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]"
              >
                <span className="block overflow-hidden">
                  <motion.span className="block" style={{ y: line1Y, opacity: line1Opacity }}>
                    {STATEMENT[0]}
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span className="relative block">
                    <span className="text-outline-ink block">{STATEMENT[1]}</span>
                    <motion.span className="absolute inset-0 block" style={{ opacity: practicalOpacity }}>
                      {STATEMENT[1]}
                    </motion.span>
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span className="block" style={{ y: softwareY, opacity: softwareOpacity }}>
                    {STATEMENT[2]}
                  </motion.span>
                </span>
              </h2>
            </div>

            <div className="mt-16 lg:col-span-5 lg:mt-0 lg:flex lg:flex-col lg:justify-end">
              <ul className="border-t border-ink/20">
                {CAPABILITIES.map((c, i) => (
                  <CapabilityItem key={c.index} p={p} index={i} label={c.label} />
                ))}
              </ul>
              <motion.p className="lede mt-10 max-w-xl text-ink" style={{ opacity: ledeOpacity, y: ledeY }}>
                Software that removes repetitive work — across products,
                automation, full-stack systems and Android, built with a
                privacy-first mindset.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Intro() {
  const pinned = usePinnedMode();
  return pinned ? <PinnedIntro /> : <StaticIntro />;
}
