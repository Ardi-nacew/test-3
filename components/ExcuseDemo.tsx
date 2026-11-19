"use client";

import Image from "next/image";
import { useState } from "react";
import { EXCUSES, randomExcuse } from "@/lib/excuses";

export function ExcuseDemo() {
  const [excuse, setExcuse] = useState(EXCUSES[0]);
  const [spins, setSpins] = useState(0);

  return (
    <div className="rounded-2xl border-2 border-line bg-surface p-6 shadow-brutal">
      <p className="text-xs font-bold tracking-widest text-muted uppercase">
        Excuse generator™
      </p>
      <p
        key={spins}
        aria-live="polite"
        className="animate-wobble mt-3 min-h-16 font-display text-2xl leading-snug font-bold"
      >
        “{excuse}”
      </p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setExcuse((prev) => randomExcuse(prev));
            setSpins((s) => s + 1);
          }}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-line bg-lemon px-5 py-2.5 text-sm font-bold shadow-brutal-sm transition hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0 active:shadow-none"
        >
          <Image src="/icons/dice.svg" alt="" width={14} height={14} />
          Give me another
        </button>
        <span className="text-sm text-muted">
          {spins === 0 ? "Try it. You know you want to." : `${spins} excuses wasted`}
        </span>
      </div>
    </div>
  );
}
