"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   The one conversion moment on the whole page.

   It used to be a full section with a headline, a paragraph, a metric list
   and a footer claim — which made the page half profile, half pitch. A
   profile's conversion block should be quiet and small, sitting where a
   profile's "get your own" link would sit. The visitor who has just talked
   to the Collaborator does not need convincing; they need a field.
   ───────────────────────────────────────────────────────────────────────── */

export function WantOne() {
  const [url, setUrl] = useState("");
  const [sent, setSent] = useState(false);
  const valid = /^[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(url.trim());

  return (
    <section
      id="create"
      aria-labelledby="want-one"
      className="rounded-[10px] border border-ivory-line bg-ivory-sunk p-6"
    >
      <h2 id="want-one" className="font-display text-[1.5rem] tracking-[-0.02em]">
        Want one?
      </h2>
      <p className="mt-2 text-[0.9375rem] leading-[1.55] text-muted">
        Start with a URL. Your site, your company, your public profile — it
        builds from what is already public.
      </p>

      <form
        className="mt-5 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) setSent(true);
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
            setSent(false);
          }}
          className="min-w-0 flex-1 rounded-[6px] border border-ivory-line bg-white px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"
        />
        <button
          type="submit"
          disabled={!valid}
          className="rounded-[6px] bg-ink px-5 py-3 text-[0.9375rem] font-medium text-ivory transition-colors hover:not-disabled:bg-signal disabled:cursor-not-allowed disabled:bg-ivory-line disabled:text-ink/55"
        >
          Create
        </button>
      </form>

      <p className="mt-3 text-[0.8125rem] text-muted">
        7 days free · 5M tokens · No credit card
      </p>

      {sent && (
        <p className="mt-4 border-t border-ivory-line pt-4 text-[0.875rem] text-ink">
          Next step in the build: this becomes a real scan of{" "}
          <span className="font-medium">{url.trim()}</span> and your Collaborator
          is created from it.
        </p>
      )}
    </section>
  );
}