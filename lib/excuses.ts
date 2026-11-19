export const EXCUSES = [
  "Mercury is in retrograde. Again.",
  "My horoscope said “avoid productivity.”",
  "The cat sat on my keyboard and I respect her choices.",
  "I need to reorganize my desk first. Spiritually.",
  "It’s not a great day for it. The vibes are off.",
  "I’m waiting for a sign. Not that sign. A better one.",
  "My plant needs emotional support right now.",
  "I’ll do it after one more episode. Probably two.",
  "Future me is way more qualified for this.",
  "I’m in a meeting. With my couch.",
  "The Wi‑Fi looked at me funny.",
  "I have to research the best way to do it first.",
  "It’s technically a weekend somewhere.",
  "My coffee hasn’t kicked in. It never will.",
  "I’m saving my energy for something important. Unclear what.",
  "A pigeon made eye contact and I need a minute.",
  "I’m letting the task marinate. For flavour.",
  "My lucky socks are in the wash.",
  "I can’t start a task at :47. Nobody starts at :47.",
  "I’m practicing mindfulness. Mostly of snacks.",
];

export function randomExcuse(previous?: string) {
  const pool = previous ? EXCUSES.filter((e) => e !== previous) : EXCUSES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function guiltLevel(snoozes: number) {
  if (snoozes === 0) return { label: "Suspiciously productive", emoji: "😇" };
  if (snoozes < 3) return { label: "Mildly human", emoji: "🙂" };
  if (snoozes < 6) return { label: "Professional procrastinator", emoji: "🦥" };
  if (snoozes < 10) return { label: "Certified couch potato", emoji: "🛋️" };
  return { label: "Living legend of later", emoji: "👑" };
}
