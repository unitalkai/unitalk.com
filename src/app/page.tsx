import { ActionRail } from "@/components/action-rail";
import { ProfileBody } from "@/components/profile-body";
import { ProfileHeader } from "@/components/profile-header";
import { PromptBar } from "@/components/prompt-bar";
import { WantOne } from "@/components/want-one";

/* ─────────────────────────────────────────────────────────────────────────
   unitalk.com/@patrick-chassany — the public profile of an AI Collaborator.

   Structure, top to bottom: banner → identity → prompt bar → two columns.
   The prompt bar sits *above the fold and above the columns* because talking
   to the Collaborator is the primary action of the page, not a sidebar
   widget. The right column is the rail of things you can actually do.

   Still deliberately absent: a feature encyclopedia, a pricing table, an
   integration grid, a nine-column footer, three competing hero CTAs.
   ───────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[76rem] px-5 py-8 sm:px-8 sm:py-12">
      <nav className="reveal mb-6 flex items-center justify-between">
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

      <ProfileHeader />

      {/* Talk first. Before the bio, before the rail, before any claim. */}
      <PromptBar />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
        <div className="space-y-8">
          <ProfileBody />
        </div>

        <div className="space-y-4">
          <ActionRail />
          <WantOne />
        </div>
      </div>

      <footer className="mt-16 flex flex-col gap-2 border-t border-ivory-line pt-6 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-ink">Own your intelligence.</span> The brain can
          change. The Collaborator remains yours.
        </p>
        <p>Unitalk</p>
      </footer>
    </main>
  );
}