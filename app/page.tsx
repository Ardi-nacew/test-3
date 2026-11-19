import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { ExcuseDemo } from "@/components/ExcuseDemo";

const FEATURES = [
  {
    emoji: "⏰",
    title: "The Procrastinate button",
    body: "Every task gets one. Tap it and the task politely moves to tomorrow. Tap it again. We won’t judge. Much.",
    color: "bg-lemon",
  },
  {
    emoji: "🎲",
    title: "Built-in excuses",
    body: "Each snooze comes with a fresh, hand-crafted excuse, so you always have something to tell your boss.",
    color: "bg-mint",
  },
  {
    emoji: "📈",
    title: "Guilt meter",
    body: "Watch your rank climb from “Suspiciously productive” all the way to “Living legend of later.”",
    color: "bg-lilac",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-mint px-3 py-1 text-xs font-bold">
              ✨ Now with 40% more snoozing
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] font-extrabold tracking-tight md:text-7xl">
              The to-do app that{" "}
              <span className="relative inline-block">
                <span className="relative z-10">gets you.</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-4 -rotate-1 bg-accent/80" />
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Later. is a simple, honest to-do list. Add tasks, tick them off — or hit
              Procrastinate and let us write the excuse for you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/app"
                className="rounded-full border-2 border-line bg-accent px-7 py-3.5 font-bold text-accent-ink shadow-brutal transition hover:-translate-y-0.5"
              >
                Start my list — free
              </Link>
              <a
                href="#features"
                className="rounded-full border-2 border-line bg-surface px-7 py-3.5 font-bold shadow-brutal-sm transition hover:-translate-y-0.5"
              >
                I’ll look later
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              Trusted by 12,000+ people who will definitely do it tomorrow.
            </p>
          </div>
          <ExcuseDemo />
        </section>

        <section id="features" className="border-y-2 border-line bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="font-display text-4xl font-extrabold tracking-tight">
              Features you’ll get around to using
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border-2 border-line bg-background p-6 shadow-brutal"
                >
                  <span
                    className={`grid size-12 place-items-center rounded-xl border-2 border-line text-2xl ${f.color}`}
                  >
                    {f.emoji}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
                  <p className="mt-2 text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Your tasks aren’t going anywhere.
          </h2>
          <p className="mt-4 text-lg text-muted">That’s kind of the problem. Let’s fix it. Eventually.</p>
          <Link
            href="/app"
            className="mt-8 inline-block rounded-full border-2 border-line bg-accent px-8 py-4 font-bold text-accent-ink shadow-brutal transition hover:-translate-y-0.5"
          >
            Open my list
          </Link>
        </section>
      </main>
      <footer className="border-t-2 border-line py-6 text-center text-sm text-muted">
        © 2026 Later. Made slowly, with love.
      </footer>
    </>
  );
}
