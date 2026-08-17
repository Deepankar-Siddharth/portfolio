"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { MotionStyle } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Reveal-once wrapper. Content is visible in the DOM at all times; Motion only
 * enhances. Settles to fully visible, respects global reduced-motion config.
 */
export function RevealOnce({
  children,
  className,
  delay = 0,
  y = 28,
  scale = 0.98,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Alternating directional reveal — `from` chooses which side the content
 * travels from. Used for Build rows and About statement lines.
 */
export function AltReveal({
  children,
  className,
  from = "left",
  delay = 0,
  amount = 0.3,
  distance = 24,
}: {
  children: React.ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
  amount?: number;
  distance?: number;
}) {
  const x = from === "left" ? -distance : distance;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked parallax. Translates the element along y (or x) between the
 * given range as it passes through the viewport. Transform only.
 */
export function ScrollParallax({
  children,
  className,
  y,
  x,
}: {
  children: React.ReactNode;
  className?: string;
  y?: [number, number];
  x?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yVal = useTransform(scrollYProgress, [0, 1], y ?? [0, 0]);
  const xVal = useTransform(scrollYProgress, [0, 1], x ?? [0, 0]);

  const style: MotionStyle = {};
  if (y) style.y = yVal;
  if (x) style.x = xVal;

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}
