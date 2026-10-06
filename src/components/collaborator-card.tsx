"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   The Collaborator's opening line.

   Deliberately NOT generic. "Hi, I'm an AI assistant" is what every product
   says; it is the single fastest way to kill the desire this page exists to
   create. This opens with the one thing only Patrick's Collaborator could
   know — and closes by handing the visitor a door, not a menu.

   Typed, not animated in: typing reads as a mind at work, and it buys the
   two seconds the visitor needs before the prompt lands.
   ───────────────────────────────────────────────────────────────────────── */

const OPENING =
  "Patrick built three companies before Unitalk. Two he walked away from. Ask me why — or ask me anything else about his work.";

const PROMPTS = [
  "Why did Patrick build Unitalk?",
  "What is an AI Collaborator?",
  "What did he walk away from?",
  "Give me a job you could do.",
];

export function CollaboratorCard() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const alive = useRef(true);

  // Typing. Respects reduced-motion by rendering the full line at once.
  useEffect(() => {
    alive.current = true;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setTyped(OPENING);
      setDone(true);
      return;
    }

    let i = 0;
    const tick = window.setInterval(() => {
      if (!alive.current) return;
      i += 1;
      setTyped(OPENING.slice(0, i));
      if (i >= OPENING.length) {
        window.clearInterval(tick);
        setDone(true);
      }
    }, 22);

    return () => {
      alive.current = false;
      window.clearInterval(tick);
    };
  }, []);

  return (
    <article className="reveal w-full rounded-[14px] bg-ink p-6 text-ivory sm:p-10">
      <header className="flex items-start gap-4">
        <Avatar />
        <div className="min-w-0 pt-1">
          <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">
            Patrick Chassany
          </h1>
          <p className="mt-1 text-[0.9375rem] text-muted-ink">
            Founder of Unitalk
          </p>
        </div>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="eyebrow rounded-[3px] border border-ink-line px-2 py-1 text-muted-ink">
          AI Collaborator
        </span>
        {/* Demo state is stated, never hidden. A fake magenta "Online" would
            be exactly the lie the product's own trust rule forbids. */}
        <span className="inline-flex items-center gap-2 text-[0.8125rem] text-muted-ink">
          <span className="dot bg-muted" aria-hidden />
          Demo — answers are simulated
        </span>
      </div>

      <p
        className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-ivory/85"
        aria-live="polite"
      >
        {typed}
        {!done && (
          <span
            className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-signal align-middle"
            aria-hidden
          />
        )}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setPicked(PROMPTS[0])}
          className="rounded-[6px] bg-signal px-7 py-4 text-[0.9375rem] font-medium text-white transition-colors hover:bg-signal-deep"
        >
          Talk to me →
        </button>
        <span className="text-[0.8125rem] text-muted-ink">
          No sign-up. Start talking.
        </span>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {PROMPTS.map((p) => (
          <li key={p}>
            <button
              type="button"
              onClick={() => setPicked(p)}
              className={`rounded-full border px-[16px] py-[9px] text-left text-[0.875rem] transition-colors ${
                picked === p
                  ? "border-signal text-ivory"
                  : "border-ink-line text-muted-ink hover:border-ivory/40 hover:text-ivory"
              }`}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>

      {picked && (
        <p className="mt-5 border-t border-ink-line pt-5 text-[0.875rem] text-muted-ink">
          <span className="text-ivory">“{picked}”</span> — the conversation
          interface lands in the next step.
        </p>
      )}
    </article>
  );
}

/* A portrait, not an icon. The design rule is explicit: the Collaborator must
   feel like a real identity, never a generic chat avatar. This is a monogram
   plate with the signal accent — replace with the real photograph when the
   asset exists, at the same 56px. */
function Avatar() {
  return (
    <span
      className="grid size-14 flex-none place-items-center rounded-[6px] border border-ink-line bg-ink-raised"
      aria-hidden
    >
      <span className="font-display text-[1.5rem] leading-none tracking-[-0.02em] text-ivory">
        PC
      </span>
    </span>
  );
}