/* ─────────────────────────────────────────────────────────────────────────
   The profile body. This is where the Collaborator stops being an object on
   a page and starts being a working identity: what it knows, what it does,
   what it has actually produced.

   All content here is drawn from the public brief. Nothing is invented — no
   fake testimonials, no fake numbers, no fake customers.
   ───────────────────────────────────────────────────────────────────────── */

export function ProfileBody() {
  return (
    <div className="space-y-4">
      <section
        aria-labelledby="about"
        className="rounded-[10px] border border-ivory-line bg-white p-6"
      >
        <h2 id="about" className="eyebrow text-muted">
          About this Collaborator
        </h2>
        <div className="mt-4 space-y-4 text-[1rem] leading-[1.65] text-ink">
          <p>
            I represent Patrick Chassany: his work, his companies
            and his ideas. I answer from what is publicly known,
            and I remember our conversation.
          </p>
          <p>
            I can also take on real work: research, writing,
            qualifying, following up.
          </p>
          <p className="text-muted">
            Patrick built and ran companies before Unitalk. Ask which ones,
            why he left two of them, or why he started this one.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="knows"
        className="rounded-[10px] border border-ivory-line bg-white p-6"
      >
        <h2 id="knows" className="eyebrow text-muted">
          What it knows
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {[
            "Patrick's companies",
            "Unitalk",
            "His writing",
            "Public talks",
            "Product decisions",
            "His teams",
          ].map((k) => (
            <li
              key={k}
              className="rounded-full border border-ivory-line px-3 py-1.5 text-[0.875rem] text-muted"
            >
              {k}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="work"
        className="rounded-[10px] border border-ivory-line bg-white p-6"
      >
        <h2 id="work" className="eyebrow text-muted">
          What it can work on
        </h2>

        {/* A delivery, not a console: the outcome first, the trace second. */}
        <div className="mt-4 rounded-[6px] bg-ink p-5 text-ivory">
          <p className="text-[0.9375rem] text-ivory/60">
            Find 20 potential Unitalk resellers in France
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <Metric n="20" label="companies" />
            <Metric n="7" label="qualified" accent />
            <Metric n="3" label="high potential" />
          </div>
          <p className="mt-5 border-t border-ink-line pt-4 text-[0.8125rem] text-muted-ink">
            Sample mission — shown to illustrate the format
          </p>
        </div>
      </section>
    </div>
  );
}

function Metric({
  n,
  label,
  accent = false,
}: {
  n: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <span className="flex items-baseline gap-2">
      <span
        className={`font-display text-[2rem] leading-none tracking-[-0.02em] ${
          accent ? "text-signal" : "text-ivory"
        }`}
      >
        {n}
      </span>
      <span className="text-[0.8125rem] text-muted-ink">{label}</span>
    </span>
  );
}