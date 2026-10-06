"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   The prompt bar. This is the Collaborator's front door, and the reason the
   page exists — so it sits directly under the banner, at full width, above
   everything else. A visitor must be able to speak to it before scrolling
   past a single claim.

   Design intent: it reads as an input a *person* answers, not as a search
   box or a chatbot widget. Icon inside, placeholder that invites a sentence,
   one magenta send — the single place the accent is spent.
   ───────────────────────────────────────────────────────────────────────── */

const SUGGESTIONS = [
  "Why did Patrick build Unitalk?",
  "What is an AI Collaborator?",
  "What did he walk away from?",
];

export function PromptBar() {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  // Focus on "/" — the shortcut people already have in their fingers.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement !== input.current) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        input.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit(text: string) {
    const q = text.trim();
    if (!q) return;
    setSent(q);
  }

  return (
    <section aria-label="Talk to the Collaborator" className="mt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="group flex items-center gap-3 rounded-[10px] border border-ivory-line bg-white px-3 py-3 shadow-[0_18px_50px_-32px_rgba(10,10,10,0.4)] transition-colors focus-within:border-ink sm:px-4"
      >
        <span
          className="grid size-9 flex-none place-items-center rounded-[3px] bg-ink text-ivory"
          aria-hidden
        >
          <TalkIcon />
        </span>

        <label htmlFor="ask" className="sr-only">
          Ask the Collaborator anything
        </label>
        <input
          ref={input}
          id="ask"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask Patrick's Collaborator anything, or give it a job…"
          className="min-w-0 flex-1 bg-transparent py-2 text-[1rem] text-ink outline-none placeholder:text-muted"
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Send"
          className="grid size-9 flex-none place-items-center rounded-[3px] bg-signal text-white transition-colors hover:not-disabled:bg-signal-deep disabled:cursor-not-allowed disabled:bg-ivory-line disabled:text-ink/50"
        >
          <SendIcon />
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="eyebrow text-muted">Try asking</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="text-[0.875rem] text-muted underline decoration-ivory-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Honest state: the answer engine is not wired yet, and saying so is
          the product's own trust rule — an ambiguous demo is not allowed. */}
      {sent && (
        <div className="mt-5 rounded-[6px] border border-ivory-line bg-white p-6">
          <div className="flex items-start gap-4">
            <span className="mt-1 size-2 flex-none rounded-full bg-signal" aria-hidden />
            <div>
              <p className="text-[1rem] text-ink">{sent}</p>
              <p className="eyebrow mt-3 text-muted">Demo — not connected yet</p>
              <p className="mt-2 max-w-[52ch] text-[0.9375rem] text-muted">
                The Collaborator&apos;s brain is not wired in this build. The next
                step is the conversation itself: streaming answers, memory across
                the session, and voice.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TalkIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3a4 4 0 0 0-4 4v4a4 4 0 0 0 8 0V7a4 4 0 0 0-4-4Z"
        fill="currentColor"
      />
      <path
        d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12h13M12 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}