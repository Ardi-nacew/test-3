import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ExcuseLibrary } from "@/components/ExcuseLibrary";
import { EXCUSES } from "@/lib/excuses";

export const metadata: Metadata = {
  title: "The excuse library — Later.",
};

export default function ExcusesPage() {
  return (
    <>
      <SiteHeader cta back />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
        <span className="inline-flex rounded-full border-2 border-line bg-lilac px-3 py-1 text-xs font-bold">
          {EXCUSES.length} excuses · all free · none accepted by HR
        </span>
        <h1 className="mt-6 font-display text-5xl leading-none font-extrabold tracking-tight md:text-6xl">
          The excuse library
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Every excuse the Procrastinate button can hand you, in one place. Pick a favourite.
          Use it responsibly. Or tomorrow.
        </p>
        <div className="mt-10">
          <ExcuseLibrary />
        </div>
      </main>
      <footer className="border-t-2 border-line py-6 text-center text-sm text-muted">
        © 2026 Later. Made slowly, with love.
      </footer>
    </>
  );
}
