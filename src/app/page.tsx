"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   Unitalk — the Collaborator's app.

   The Collaborator is not a feature of this app. It is the subject of it.
   So it does not sit in a status bar: it sits at the top of every screen,
   stated as an identity with a live state and a voice ("I'm on it."). The
   application is what it *reports to you*, not what you operate.

   Navigation, exactly four destinations and nothing else:
     You           — what needs Patrick's attention
     Me            — what the Collaborator already did
     People        — who it works with
     Collaborator  — what it knows, can do, and can decide

   Deliberately absent from the navigation: Dashboard, CRM, Inbox,
   Analytics, Automations, Knowledge. Those are not places the owner goes.
   They are things the Collaborator runs.

   The rule that shaped every screen:
     If the Collaborator can do it, it is not shown as a task for the human.

   Design system adapted from whatsapp.com, measured on the live site:
     cream ground rgb(252,245,235) · sticky 80px bar, no shadow ·
     pill controls radius 50px weight 500 with a 1px border · headlines in
     the 48–80px range at weight 400, never bold · one saturated fill only.
   Green rgb(37,211,102) → magenta, with the label flipped to white because
   magenta on near-black fails contrast while the lime green passes.
   ───────────────────────────────────────────────────────────────────────── */

const TABS = ["You", "Me", "People", "Collaborator"] as const;
type Tab = (typeof TABS)[number];

export default function Home() {
  const [tab, setTab] = useState<Tab>("You");

  return (
    <div className="min-h-dvh bg-ivory">
      <CollaboratorBar />
      <Tabs tab={tab} setTab={setTab} />
      <main className="mx-auto w-full max-w-[72rem] px-6 pb-24 pt-12 sm:px-10">
        {tab === "You" && <You />}
        {tab === "Me" && <Me />}
        {tab === "People" && <People />}
        {tab === "Collaborator" && <Collaborator />}
      </main>
    </div>
  );
}

/* ── The Collaborator, stated first on every screen ───────────────────── */

function CollaboratorBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-ivory-line bg-ivory">
      <div className="mx-auto flex h-20 w-full max-w-[72rem] items-center justify-between gap-6 px-6 sm:px-10">
        <div className="flex min-w-0 items-center gap-4">
          <span
            className="grid size-10 flex-none place-items-center rounded-full bg-signal text-[0.9375rem] font-medium text-white"
            aria-hidden
          >
            PC
          </span>
          <span className="min-w-0">
            <span className="eyebrow block text-muted">
              Patrick&apos;s Collaborator
            </span>
            <span className="mt-1 flex items-center gap-2 text-[0.9375rem]">
              <span className="dot dot-live bg-signal" aria-hidden />
              Working
            </span>
          </span>
        </div>

        <p className="hidden shrink-0 text-[1.0625rem] sm:block">
          I&apos;m on it.
        </p>
      </div>
    </header>
  );
}

/* ── Tabs ─────────────────────────────────────────────────────────────── */

function Tabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <nav aria-label="Sections" className="border-b border-ivory-line bg-ivory">
      <div className="mx-auto flex w-full max-w-[72rem] gap-1 overflow-x-auto px-6 sm:px-10">
        {TABS.map((t) => {
          const on = t === tab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-current={on ? "page" : undefined}
              className={`-mb-px whitespace-nowrap border-b-2 px-4 py-4 text-[0.9375rem] transition-colors ${
                on
                  ? "border-signal font-medium text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ── YOU: only what needs a human ─────────────────────────────────────── */

function You() {
  const DECISIONS = [
    { t: "Approve Acme proposal", m: "Drafted · waiting on you" },
    { t: "Choose Sarah's meeting time", m: "Two slots proposed" },
    { t: "Reply to investor", m: "Draft ready to send" },
  ];

  return (
    <section>
      <p className="eyebrow text-muted">What needs Patrick</p>
      <h1 className="font-display mt-5 text-[clamp(2.75rem,8vw,5rem)] leading-[0.98] tracking-[-0.035em]">
        3 decisions.
      </h1>

      <ul className="mt-12 max-w-[48rem]">
        {DECISIONS.map((d) => (
          <li key={d.t} className="border-b border-ivory-line last:border-0">
            <button
              type="button"
              className="flex w-full items-baseline justify-between gap-6 py-6 text-left transition-colors hover:text-signal"
            >
              <span className="text-[1.25rem]">{d.t}</span>
              <span className="shrink-0 text-right text-[0.875rem] text-muted">
                {d.m}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-10 rounded-full bg-signal px-8 py-4 text-[1rem] font-medium text-white transition-colors hover:bg-signal-deep"
      >
        Review
      </button>

      {/* The rest of the rule, said out loud: everything else was handled. */}
      <p className="mt-10 max-w-[48rem] text-[1.0625rem] text-muted">
        Everything else it could do alone, it already did. That is why this
        list is three lines long.
      </p>
    </section>
  );
}

/* ── ME: what it already did ──────────────────────────────────────────── */

function Me() {
  const STATS = [
    { n: "47", l: "conversations" },
    { n: "18", l: "follow-ups" },
    { n: "6", l: "opportunities" },
    { n: "61", l: "contacts updated" },
  ];

  return (
    <section>
      <p className="eyebrow text-muted">What it has already done</p>
      <h1 className="font-display mt-5 text-[clamp(2.75rem,8vw,5rem)] leading-[0.98] tracking-[-0.035em]">
        132 handled.
      </h1>

      <dl className="mt-12 grid max-w-[48rem] gap-px overflow-hidden rounded-[1rem] border border-ivory-line bg-ivory-line sm:grid-cols-2">
        {STATS.map((s) => (
          <div key={s.l} className="bg-white px-7 py-8">
            <dt className="font-display text-[2.75rem] leading-none tracking-[-0.03em]">
              {s.n}
            </dt>
            <dd className="mt-3 text-[0.9375rem] text-muted">{s.l}</dd>
          </div>
        ))}
      </dl>

      <p className="font-display mt-12 text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.1] tracking-[-0.02em]">
        Nothing needs you.
      </p>
    </section>
  );
}

/* ── PEOPLE: a relationship, never a CRM record ───────────────────────── */

function People() {
  const PEOPLE = [
    { n: "Jean Dupont", r: "Client", s: "Active" },
    { n: "Sarah Martin", r: "Prospect", s: "Hot" },
    { n: "David Cohen", r: "Investor", s: "Watching" },
  ];

  return (
    <section>
      <p className="eyebrow text-muted">Who it works with</p>
      <h1 className="font-display mt-5 text-[clamp(2.75rem,8vw,5rem)] leading-[0.98] tracking-[-0.035em]">
        3 relationships.
      </h1>

      <ul className="mt-12 max-w-[48rem]">
        {PEOPLE.map((p) => (
          <li key={p.n} className="border-b border-ivory-line last:border-0">
            <button
              type="button"
              className="flex w-full items-center gap-5 py-6 text-left transition-colors hover:text-signal"
            >
              <span
                className="grid size-12 flex-none place-items-center rounded-full bg-ink text-[0.9375rem] text-ivory"
                aria-hidden
              >
                {p.n
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.25rem]">{p.n}</span>
                <span className="block text-[0.875rem] text-muted">{p.r}</span>
              </span>
              <span className="shrink-0 text-[0.875rem] text-muted">
                {p.s}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-[48rem] text-[1.0625rem] text-muted">
        Each one is a relationship the Collaborator keeps, not a record in a
        database.
      </p>
    </section>
  );
}

/* ── COLLABORATOR: what it knows, does, and decides ───────────────────── */

function Collaborator() {
  const BLOCKS = [
    {
      h: "What I know",
      items: ["Patrick's work", "The companies", "Open threads"],
    },
    {
      h: "What I can do",
      items: ["Research", "Write", "Qualify", "Follow up"],
    },
    {
      h: "What I can decide",
      items: ["Send a reply", "Book a slot", "Ask for a detail"],
    },
  ];

  return (
    <section>
      <p className="eyebrow text-muted">The Collaborator itself</p>
      <h1 className="font-display mt-5 text-[clamp(2.75rem,8vw,5rem)] leading-[0.98] tracking-[-0.035em]">
        What I know,
        <br />
        and what I can do.
      </h1>

      <div className="mt-12 grid max-w-[48rem] gap-10 sm:grid-cols-3">
        {BLOCKS.map((b) => (
          <div key={b.h}>
            <h2 className="eyebrow text-muted">{b.h}</h2>
            <ul className="mt-4 space-y-2.5">
              {b.items.map((i) => (
                <li key={i} className="text-[1rem]">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 max-w-[48rem] border-t border-ivory-line pt-6">
        <h2 className="eyebrow text-muted">Connected</h2>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {["LinkedIn", "Email", "WhatsApp", "Calendar", "Phone"].map((c) => (
            <li
              key={c}
              className="rounded-full border border-ivory-line bg-white px-4 py-2 text-[0.9375rem]"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}