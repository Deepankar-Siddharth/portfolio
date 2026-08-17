"use client";

/**
 * Abstract project visuals — artistic interpretations, NOT fake screenshots.
 * Pure CSS/SVG. Each project gets its own visual language.
 */

function FinoraVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#0c1209] p-6" aria-hidden="true">
      {/* finance-style composition */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute left-6 top-16 h-24 w-24 rounded-full bg-[#d8ff3e]" />
        <div className="absolute right-10 top-8 h-16 w-16 rounded-full bg-[#d8ff3e]" />
      </div>
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between mono text-[10px] uppercase tracking-[0.2em] text-[#d8ff3e]/80">
          <span>Finora</span>
          <span>● live</span>
        </div>
        <div className="mt-auto grid gap-4 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-[11px] text-[#d8ff3e]/60 mono">Balance</p>
            <p className="display-2 text-[#d8ff3e]">₹</p>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-[#d8ff3e]/15">
              <div className="h-full w-[62%] bg-[#d8ff3e]" />
            </div>
            <div className="h-2 w-full bg-[#d8ff3e]/15">
              <div className="h-full w-[38%] bg-[#d8ff3e]/60" />
            </div>
            <div className="h-2 w-full bg-[#d8ff3e]/15">
              <div className="h-full w-[81%] bg-[#d8ff3e]/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LedgerVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#0a0a0b] p-6" aria-hidden="true">
      {/* phone-frame abstraction + ledger numbers */}
      <div className="mx-auto flex h-full max-w-[180px] items-center justify-center">
        <div className="relative h-full w-full rounded-[1.4rem] border border-[#7dd3fc]/30 p-4">
          <div className="mb-3 h-1 w-12 rounded-full bg-[#7dd3fc]/50" />
          <div className="space-y-2 mono text-[11px] text-[#7dd3fc]/80">
            <p className="flex justify-between"><span>+₹1,200</span><span>·</span></p>
            <p className="flex justify-between"><span>−₹349</span><span>·</span></p>
            <p className="flex justify-between"><span>+₹840</span><span>·</span></p>
            <p className="flex justify-between text-[#7dd3fc]/50"><span>encrypted</span><span>⦿</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SphereVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#101014] p-6" aria-hidden="true">
      {/* architecture diagram: client → api → db */}
      <div className="relative flex h-full flex-col justify-center gap-3 mono text-[11px]">
        <div className="mx-auto w-full max-w-[260px] rounded-lg border border-[#ff5a36]/40 px-4 py-2 text-center text-[#ff5a36]">
          CLIENT
        </div>
        <div className="mx-auto h-6 w-px bg-gradient-to-b from-[#ff5a36] to-[#ff5a36]/30" />
        <div className="mx-auto w-full max-w-[260px] rounded-lg border border-[#ff5a36]/60 px-4 py-2 text-center text-[#ff5a36]">
          API · JWT
        </div>
        <div className="mx-auto h-6 w-px bg-gradient-to-b from-[#ff5a36]/30 to-[#ff5a36]/10" />
        <div className="mx-auto w-full max-w-[260px] rounded-lg border border-[#ff5a36]/80 px-4 py-2 text-center text-[#ff5a36]">
          MYSQL
        </div>
      </div>
    </div>
  );
}

export default function ProjectVisual({ kind }: { kind: "finora" | "ledger" | "sphere" }) {
  if (kind === "finora") return <FinoraVisual />;
  if (kind === "ledger") return <LedgerVisual />;
  return <SphereVisual />;
}