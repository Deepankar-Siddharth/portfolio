"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function CountUp({ value, label }: { value: string | number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const str = String(value);
  const isNumeric = /^\d+$/.test(str);
  const target = Number(value) || 0;
  const [display, setDisplay] = useState(str);

  useEffect(() => {
    if (!inView || !isNumeric || reduced) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(String(Math.round(target * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumeric, target, reduced, value]);

  return (
    <div ref={ref}>
      <p className="display-md text-paper">{display}</p>
      <p className="mono mt-2 text-[10px] uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
    </div>
  );
}

function HeatmapReveal({
  cells,
  total,
  available,
}: {
  cells: { day: string; count: number }[];
  total: number;
  available: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {available ? (
        <>
          <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
            {cells.map((cell) => {
              const level =
                cell.count === 0 ? 0 : Math.ceil((cell.count / Math.max(1, ...cells.map((c) => c.count))) * 3);
              return (
                <div
                  key={cell.day}
                  title={`${cell.day} — ${cell.count} event${cell.count === 1 ? "" : "s"}`}
                  aria-label={`${cell.day}: ${cell.count} events`}
                  className={`h-2.5 w-2.5 rounded-[3px] md:h-3 md:w-3 ${
                    level === 0
                      ? "bg-line"
                      : level === 1
                        ? "bg-acid/30"
                        : level === 2
                          ? "bg-acid/60"
                          : "bg-acid"
                  }`}
                />
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {total} event{total === 1 ? "" : "s"} · last 13 weeks
            </p>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-[3px] bg-line" />
              <span className="h-2 w-2 rounded-[3px] bg-acid/30" />
              <span className="h-2 w-2 rounded-[3px] bg-acid/60" />
              <span className="h-2 w-2 rounded-[3px] bg-acid" />
            </div>
          </div>
          <p className="mt-2 mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Derived from live public events
          </p>
        </>
      ) : (
        <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-line p-6">
          <p className="mono text-xs text-center text-muted">
            No usable public event data in the last 13 weeks.
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function GithubClient({
  stats,
  heatmap,
  heatmapTotal,
  heatmapAvailable,
}: {
  stats: { label: string; value: string | number }[];
  heatmap: { day: string; count: number }[];
  heatmapTotal: number;
  heatmapAvailable: boolean;
}) {
  return (
    <div className="lg:col-span-7">
      {/* Account stats */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-ink p-6">
            <CountUp value={s.value} label={s.label} />
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="mt-6 rounded-xl border border-line p-6">
        <p className="overline mb-6">Public activity — last 13 weeks</p>
        <HeatmapReveal cells={heatmap} total={heatmapTotal} available={heatmapAvailable} />
      </div>
    </div>
  );
}