import { CollaboratorCard } from "@/components/collaborator-card";
import { CreateBlock } from "@/components/create-block";

/* ─────────────────────────────────────────────────────────────────────────
   unitalk.com/@patrick-chassany — the public profile of an AI Collaborator.

   One page, one dominant object, one sequence: MEET → TALK → WANT ONE →
   CREATE. Nothing here explains Unitalk. The visitor meets someone, talks to
   them, and then wants their own.

   Deliberately absent: a feature list, a pricing table, an integration grid,
   a hero with three CTAs, a footer with nine columns. Those are the things
   that turn this into "a website that explains Unitalk" — the one outcome
   the design principle forbids.
   ───────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[72rem] flex-col px-6 py-14 sm:px-10 sm:py-20">
      <nav className="reveal flex items-center justify-between">
        <span className="font-display text-[1.125rem] tracking-[-0.02em]">
          Unitalk
        </span>
        <a
          href="#create"
          className="text-[0.875rem] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          Create yours
        </a>
      </nav>

      <div className="mt-12 sm:mt-20">
        <span className="eyebrow reveal text-muted">Public profile</span>
        <div className="mt-8 max-w-[42rem]">
          <CollaboratorCard />
        </div>
      </div>

      <div className="max-w-[42rem]">
        <CreateBlock />
      </div>

      <footer className="mt-20 flex flex-col gap-2 border-t border-ivory-line pt-6 text-[0.8125rem] text-muted sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-ink">Own your intelligence.</span> The brain can
          change. The Collaborator remains yours.
        </p>
        <p>Unitalk</p>
      </footer>
    </main>
  );
}