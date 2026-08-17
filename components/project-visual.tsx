"use client";

/**
 * Abstract project visuals — artistic interpretations, NOT fake screenshots.
 * Pure CSS/SVG. Each project gets its own visual language.
 * They are labeled as abstract visualizations wherever they appear.
 */

function FinoraVisual() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0c1209] p-6">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#d8ff3e]/20 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#d8ff3e]/10 blur-3xl" aria-hidden="true" />

      {/* top bar */}
      <div className="relative flex items-center justify-between mono text-[10px] uppercase tracking-[0.2em] text-[#d8ff3e]/80">
        <span>Finora</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d8ff3e]" />
          local-first
        </span>
      </div>

      {/* account row */}
      <div className="relative mt-6 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8ff3e]/40 mono text-[10px] text-[#d8ff3e]">
          DS
        </div>
        <div>
          <p className="text-[11px] text-[#d8ff3e]/80">Cash flow · October</p>
          <p className="display-md text-[#d8ff3e] leading-none">₹1,24,500</p>
        </div>
      </div>

      {/* chart bars as abstract graph */}
      <div className="relative mt-6 grid flex-1 items-end gap-1.5" style={{ gridTemplateColumns: "repeat(12, 1fr)" }}>
        {[45, 62, 40, 78, 55, 90, 68, 48, 84, 60, 72, 96].map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-full rounded-sm bg-[#d8ff3e]"
              style={{ height: `${h}px`, opacity: 0.55 + (i / 12) * 0.45 }}
            />
          </div>
        ))}
      </div>

      {/* budget line */}
      <div className="relative mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Income", v: "+₹84k" },
          { l: "Spend", v: "−₹32k" },
          { l: "Saved", v: "+₹52k" },
          { l: "Budget", v: "81%" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-[#d8ff3e]/15 bg-[#d8ff3e]/5 p-3">
            <p className="mono text-[9px] uppercase tracking-[0.18em] text-[#d8ff3e]/60">{s.l}</p>
            <p className="mono mt-1 text-[13px] text-[#d8ff3e]">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LedgerVisual() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0a0a0b] p-6">
      {/* privacy halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7dd3fc]/10 blur-3xl" aria-hidden="true" />

      <div className="relative flex items-center justify-between mono text-[10px] uppercase tracking-[0.2em] text-[#7dd3fc]/80">
        <span>Instant Ledger</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
          offline
        </span>
      </div>

      <div className="relative mt-6 flex flex-1 items-center justify-center">
        {/* phone frame */}
        <div className="relative h-full max-h-64 w-[170px] rounded-[1.6rem] border border-[#7dd3fc]/30 bg-[#0c1013] p-4">
          {/* notch */}
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-[#7dd3fc]/40" />
          {/* lock row */}
          <div className="flex items-center justify-between border-b border-[#7dd3fc]/15 pb-2 mono text-[9px] uppercase tracking-[0.14em] text-[#7dd3fc]/70">
            <span>Biometric lock</span>
            <span className="h-2 w-2 rounded-full bg-[#7dd3fc]" />
          </div>
          {/* ledger feed */}
          <div className="mt-3 space-y-1.5 mono text-[10px] text-[#7dd3fc]/85">
            <div className="flex justify-between gap-2">
              <span className="truncate">+₹1,200 · SMS</span>
              <span className="text-[9px]">01</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="truncate">−₹349</span>
              <span className="text-[9px]">02</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="truncate">+₹840 · SMS</span>
              <span className="text-[9px]">03</span>
            </div>
          </div>
          {/* encryption wedge */}
          <div className="absolute -bottom-2 -right-2 rounded-full border border-[#7dd3fc]/25 px-3 py-1 mono text-[9px] uppercase tracking-[0.14em] text-[#7dd3fc]/80">
            SQLCipher*
          </div>
        </div>
      </div>

      {/* feature strip */}
      <div className="relative flex flex-wrap justify-center gap-2">
        {["SMS parsing", "CSV", "JSON"].map((f) => (
          <span key={f} className="rounded-full border border-[#7dd3fc]/20 px-2.5 py-1 mono text-[9px] uppercase tracking-[0.14em] text-[#7dd3fc]/70">
            {f}
          </span>
        ))}
      </div>

      <p className="relative mt-2 text-center mono text-[8px] uppercase tracking-[0.18em] text-[#7dd3fc]/40">
        * encryption at rest · abstract visualization
      </p>
    </div>
  );
}

function SphereVisual() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#101014] p-6">
      {/* ember glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-[#ff5a36]/15 blur-3xl" aria-hidden="true" />

      <div className="relative flex items-center justify-between mono text-[10px] uppercase tracking-[0.2em] text-[#ff5a36]/80">
        <span>Event Sphere</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5a36]" />
          live system
        </span>
      </div>

      {/* flow diagram */}
      <div className="relative mt-6 flex flex-1 flex-col items-center justify-center gap-2 mono text-[10px]">
        {/* client */}
        <div className="flex w-full max-w-[260px] items-center gap-3 rounded-lg border border-[#ff5a36]/40 bg-[#ff5a36]/5 px-4 py-2 text-[#ff5a36]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36]" />
          CLIENT · REACT SPA
        </div>
        {/* connector */}
        <div className="relative h-6 w-px overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-full animate-pulse bg-gradient-to-b from-[#ff5a36]/80 to-[#ff5a36]/20" />
        </div>
        {/* jwt tag */}
        <span className="rounded-full border border-[#ff5a36]/30 px-3 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#ff5a36]/80">
          JWT · POST /api
        </span>
        {/* connector */}
        <div className="relative h-6 w-px overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-full animate-pulse bg-gradient-to-b from-[#ff5a36]/20 to-[#ff5a36]/60" />
        </div>
        {/* api */}
        <div className="flex w-full max-w-[260px] items-center gap-3 rounded-lg border border-[#ff5a36]/60 bg-[#ff5a36]/10 px-4 py-2 text-[#ff5a36]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36]" />
          API · NODE / EXPRESS
        </div>
        {/* connector */}
        <div className="relative h-6 w-px overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-full animate-pulse bg-gradient-to-b from-[#ff5a36]/80 to-[#ff5a36]/20" />
        </div>
        {/* db */}
        <div className="flex w-full max-w-[260px] items-center gap-3 rounded-lg border border-[#ff5a36]/80 bg-[#ff5a36]/15 px-4 py-2 text-[#ff5a36]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36]" />
          DATABASE · MYSQL
        </div>
      </div>

      {/* capability strip */}
      <div className="relative flex flex-wrap justify-center gap-2">
        {["bookings", "employees", "packages", "payments"].map((f) => (
          <span key={f} className="rounded-full border border-[#ff5a36]/20 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[#ff5a36]/70">
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectVisual({ kind }: { kind: "finora" | "ledger" | "sphere" }) {
  if (kind === "finora") return <FinoraVisual />;
  if (kind === "ledger") return <LedgerVisual />;
  return <SphereVisual />;
}