"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   The conversion moment, and the whole of it.

   The entire pitch is one field. No questionnaire, no industry selector, no
   role picker, no password wall, no "tell us about yourself". The URL is the
   magic input — everything else is configuration, and configuration comes
   after the visitor has already got something worth configuring.

   The CTA is ink-on-ivory, NOT magenta: magenta belongs to the Collaborator
   (talking to it). Two magenta actions would make the accent mean nothing.
   ───────────────────────────────────────────────────────────────────────── */

export function CreateBlock() {
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const valid = /^[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(url.trim());

  return (
    <section
      id="create"
      aria-labelledby="create-heading"
      className="reveal mt-16 border-t border-ivory-line pt-12 sm:mt-24"
    >
      <div className="flex items-baseline gap-3">
        <span className="eyebrow text-signal">Want one?</span>
        <span className="h-px flex-1 translate-y-[-3px] bg-ivory-line" aria-hidden />
      </div>

      <h2
        id="create-heading"
        className="font-display mt-5 max-w-[18ch] text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]"
      >
        Create yours in one click.
      </h2>

      <p className="mt-4 max-w-[42ch] text-[1.0625rem] text-muted">
        Start with a URL. Your site, your company, your public profile — we
        build the Collaborator from what is already public.
      </p>

      <form
        className="mt-8 flex max-w-[34rem] flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) setSubmitted(true);
        }}
      >
        <label htmlFor="url" className="sr-only">
          Start with a URL
        </label>
        <input
          id="url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourwebsite.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setSubmitted(false);
          }}
          className="min-w-0 flex-1 rounded-[6px] border border-ivory-line bg-ivory-sunk px-5 py-[18px] text-[1rem] text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"
        />
        <button
          type="submit"
          disabled={!valid}
          className="rounded-[6px] bg-ink px-7 py-[18px] text-[0.9375rem] font-medium text-ivory transition-colors hover:not-disabled:bg-signal disabled:cursor-not-allowed disabled:bg-ivory-line disabled:text-ink/55"
        >
          Create my Collaborator →
        </button>
      </form>

      <p className="mt-4 text-[0.8125rem] text-muted">
        7 days free · 5M tokens · No credit card
      </p>

      {/* Creation is a reveal, not an account setup — but nothing here invents
          a result. The line is honest about what has actually happened. */}
      {submitted && (
        <div className="mt-8 max-w-[34rem] rounded-[6px] border border-ivory-line bg-ivory-sunk p-6">
          <span className="eyebrow text-muted">Creating your Collaborator</span>
          <ol className="mt-4 space-y-2 text-[0.9375rem] text-muted">
            <li>Finding your public presence</li>
            <li>Understanding your work</li>
            <li>Building its knowledge</li>
          </ol>
          <p className="mt-5 text-[0.875rem] text-ink">
            Next step in the build: this becomes a real scan of{" "}
            <span className="font-medium">{url.trim()}</span>.
          </p>
        </div>
      )}
    </section>
  );
}