"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

const noop = () => () => {};
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * Extremely thin (2px) acid progress bar pinned to the top of the viewport.
 * Pure transform (scaleX) — zero layout. Reduced motion → not rendered.
 * Mounted-gated so the server HTML never flashes a bar before hydration.
 */
export default function ScrollProgress() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (!mounted || reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}
