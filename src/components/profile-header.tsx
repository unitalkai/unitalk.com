import { Portrait } from "@/components/portrait";

/* ─────────────────────────────────────────────────────────────────────────
   Banner + identity, hung the way a profile hangs them.

   This is the structural fix for the previous version's failure: a floating
   card in empty space is a landing page. A profile needs a banner that
   identifies a place, an identity block that overlaps it, and a line of
   facts directly beneath. The Collaborator is *attached to* Patrick — it is
   not the whole page, it is how you reach him.
   ───────────────────────────────────────────────────────────────────────── */

export function ProfileHeader() {
  return (
    <header className="reveal">
      {/* Banner: dark, structural, quiet. Not a photo, not a gradient mesh —
          a surface that makes the identity block read as attached to it. */}
      <div className="relative h-32 overflow-hidden rounded-t-[14px] bg-ink sm:h-44">
        {/* One horizontal hairline, not a two-axis grid: the grid is the
            signature of an AI poster. A single line reads as a surface. */}
        <div
          className="absolute inset-x-0 top-1/2 h-px bg-ivory"
          style={{ opacity: 0.12 }}
          aria-hidden
        />
        <span className="eyebrow absolute right-6 top-5 text-muted-ink sm:right-10">
          Public profile
        </span>
      </div>

      <div className="relative rounded-b-[14px] border border-t-0 border-ivory-line bg-white px-6 py-7 sm:px-10 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-7">
          <div className="-mt-12 shrink-0 sm:-mt-14">
            <div className="size-24 overflow-hidden rounded-[10px] border-4 border-white sm:size-28">
              <Portrait className="size-full" />
            </div>
          </div>

          <div className="min-w-0 flex-1 pb-1">
            <h1 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.05] tracking-[-0.025em]">
              Patrick Chassany
            </h1>
            <p className="mt-1.5 text-[1rem] text-muted">
              Founder of Unitalk · Bordeaux, France
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pb-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory-line px-3 py-1.5 text-[0.8125rem] text-muted">
              <span className="dot dot-live bg-muted" aria-hidden />
              Demo — answers are simulated
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}