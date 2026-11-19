"use client";

import { useState } from "react";
import { guiltLevel } from "@/lib/excuses";
import { todoActions, useTodos, type Todo } from "@/lib/todoStore";

type Filter = "all" | "open" | "done";

export function TodoBoard() {
  const todos = useTodos();
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const open = todos.filter((t) => !t.done);
  const done = todos.length - open.length;
  const snoozes = todos.reduce((sum, t) => sum + t.snoozes, 0);
  const guilt = guiltLevel(snoozes);
  const guiltPct = Math.min(100, snoozes * 10);

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "open" ? !t.done : t.done,
  );

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_320px]">
      <section>
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Things I’ll do. Probably.
        </h1>
        <p className="mt-2 text-muted">
          {open.length === 0
            ? "Nothing left. Who even are you?"
            : `${open.length} to go, ${done} done. You’ve got this (later).`}
        </p>

        <form
          className="mt-8 flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const text = draft.trim();
            if (!text) return;
            todoActions.add(text);
            setDraft("");
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What are you going to put off next?"
            aria-label="New task"
            className="h-14 flex-1 rounded-xl border-2 border-line bg-surface px-4 text-base shadow-brutal-sm outline-none placeholder:text-muted focus:shadow-brutal"
          />
          <button
            type="submit"
            className="h-14 rounded-xl border-2 border-line bg-accent px-6 font-bold text-accent-ink shadow-brutal-sm transition hover:-translate-y-0.5 hover:shadow-brutal"
          >
            Add
          </button>
        </form>

        <div className="mt-6 flex gap-2" role="tablist" aria-label="Filter tasks">
          {(["all", "open", "done"] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border-2 border-line px-4 py-1.5 text-sm font-semibold capitalize transition ${
                filter === f ? "bg-foreground text-background" : "bg-surface hover:bg-lemon"
              }`}
            >
              {f === "open" ? "To do" : f}
            </button>
          ))}
        </div>

        <ul className="mt-6 space-y-3">
          {visible.map((t) => (
            <TodoRow key={t.id} todo={t} />
          ))}
          {visible.length === 0 && (
            <li className="rounded-2xl border-2 border-dashed border-line/40 p-10 text-center text-muted">
              {filter === "done"
                ? "Nothing done yet. Bold strategy."
                : "No tasks. Enjoy this rare moment of peace. 🌴"}
            </li>
          )}
        </ul>
      </section>

      <aside className="space-y-6">
        <div className="rounded-2xl border-2 border-line bg-surface p-6 shadow-brutal">
          <p className="text-xs font-bold tracking-widest text-muted uppercase">Guilt meter</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-4xl">{guilt.emoji}</span>
            <div>
              <p className="font-display text-xl leading-tight font-bold">{guilt.label}</p>
              <p className="text-sm text-muted">
                {snoozes} {snoozes === 1 ? "snooze" : "snoozes"} total
              </p>
            </div>
          </div>
          <div className="mt-4 h-4 overflow-hidden rounded-full border-2 border-line bg-background">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${guiltPct}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border-2 border-line bg-lilac p-6 shadow-brutal">
          <p className="font-display text-xl font-bold">The nuclear option</p>
          <p className="mt-1 text-sm">
            Push every open task to tomorrow, each with its own excuse. Tomorrow-you will love this.
          </p>
          <button
            type="button"
            disabled={open.length === 0}
            onClick={() => todoActions.procrastinateAll()}
            className="mt-4 w-full rounded-xl border-2 border-line bg-surface px-4 py-3 font-bold shadow-brutal-sm transition hover:-translate-y-0.5 hover:shadow-brutal disabled:opacity-50 disabled:hover:translate-y-0"
          >
            🛋️ Procrastinate everything
          </button>
        </div>
      </aside>
    </div>
  );
}

function TodoRow({ todo }: { todo: Todo }) {
  return (
    <li className="rounded-2xl border-2 border-line bg-surface p-4 shadow-brutal-sm">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => todoActions.toggle(todo.id)}
          aria-label={todo.done ? `Mark “${todo.text}” as not done` : `Mark “${todo.text}” as done`}
          className={`grid size-7 shrink-0 place-items-center rounded-lg border-2 border-line text-sm font-bold transition ${
            todo.done ? "bg-mint" : "bg-background hover:bg-lemon"
          }`}
        >
          {todo.done ? "✓" : ""}
        </button>
        <div className="min-w-0 flex-1">
          <p className={`font-medium ${todo.done ? "text-muted line-through" : ""}`}>{todo.text}</p>
          {todo.snoozes > 0 && !todo.done && (
            <p className="mt-0.5 text-xs font-semibold text-accent">
              Snoozed {todo.snoozes}× · due tomorrow
            </p>
          )}
        </div>
        {!todo.done && (
          <button
            type="button"
            onClick={() => todoActions.procrastinate(todo.id)}
            className="shrink-0 rounded-full border-2 border-line bg-lemon px-3 py-1.5 text-xs font-bold transition hover:-translate-y-0.5 hover:shadow-brutal-sm"
          >
            ⏰ Procrastinate
          </button>
        )}
        <button
          type="button"
          onClick={() => todoActions.remove(todo.id)}
          aria-label={`Delete “${todo.text}”`}
          className="grid size-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-background hover:text-foreground"
        >
          ✕
        </button>
      </div>
      {todo.excuse && !todo.done && (
        <p
          key={todo.excuse}
          className="animate-wobble mt-3 ml-11 inline-block rounded-lg border-2 border-line bg-background px-3 py-1.5 text-sm italic"
        >
          “{todo.excuse}”
        </p>
      )}
    </li>
  );
}
