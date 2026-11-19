import { useSyncExternalStore } from "react";
import { randomExcuse } from "./excuses";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
  snoozes: number;
  excuse?: string;
};

const KEY = "later.todos.v1";

const SEED: Todo[] = [
  { id: "seed-1", text: "Reply to that email from March", done: false, snoozes: 0 },
  { id: "seed-2", text: "Go to the gym (for real this time)", done: false, snoozes: 0 },
  {
    id: "seed-5",
    text: "Fold the laundry (it’s been on the chair a week)",
    done: false,
    snoozes: 0,
  },
  { id: "seed-3", text: "Water the plant", done: true, snoozes: 0 },
  {
    id: "seed-4",
    text: "Do my taxes",
    done: false,
    snoozes: 3,
    excuse: "Future me is way more qualified for this.",
  },
];

let todos: Todo[] = SEED;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) todos = JSON.parse(raw) as Todo[];
  } catch {
    todos = SEED;
  }
}

function set(next: Todo[]) {
  todos = next;
  window.localStorage.setItem(KEY, JSON.stringify(todos));
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTodos() {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return todos;
    },
    () => SEED,
  );
}

export const todoActions = {
  add(text: string) {
    set([{ id: crypto.randomUUID(), text, done: false, snoozes: 0 }, ...todos]);
  },
  toggle(id: string) {
    set(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  },
  remove(id: string) {
    set(todos.filter((t) => t.id !== id));
  },
  procrastinate(id: string) {
    set(
      todos.map((t) =>
        t.id === id ? { ...t, snoozes: t.snoozes + 1, excuse: randomExcuse(t.excuse) } : t,
      ),
    );
  },
  procrastinateAll() {
    set(
      todos.map((t) =>
        t.done ? t : { ...t, snoozes: t.snoozes + 1, excuse: randomExcuse(t.excuse) },
      ),
    );
  },
};
