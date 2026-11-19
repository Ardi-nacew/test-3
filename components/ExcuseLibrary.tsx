"use client";

import { useState } from "react";
import { EXCUSES } from "@/lib/excuses";

const BADGE_COLORS = ["bg-lemon", "bg-mint", "bg-lilac"];

export function ExcuseLibrary() {
  const [copied, setCopied] = useState<number | null>(null);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {EXCUSES.map((excuse, i) => (
        <div
          key={excuse}
          className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-5 shadow-brutal"
        >
          <div className="flex items-center justify-between">
            <span
              className={`grid size-9 place-items-center rounded-lg border-2 border-line font-display text-sm font-bold ${BADGE_COLORS[i % 3]}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(excuse);
                } catch {
                  return;
                }
                setCopied(i);
                setTimeout(() => setCopied((c) => (c === i ? null : c)), 1500);
              }}
              className="h-7 rounded-full border-2 border-line bg-background px-3 text-xs font-bold transition hover:-translate-y-0.5 hover:bg-lemon"
            >
              {copied === i ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="font-display text-lg leading-7 font-bold">“{excuse}”</p>
        </div>
      ))}
    </div>
  );
}
