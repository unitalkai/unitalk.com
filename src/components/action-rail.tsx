/* ─────────────────────────────────────────────────────────────────────────
   The action rail. A profile is not only something you read — it is
   something you *use*. These are the three things you can actually do with
   Patrick, routed through his Collaborator rather than through him.

   Every control here is real: the email link opens a composer, the booking
   link is a normal URL, the phone link dials. Nothing is a decoration
   dressed as a button, and nothing claims a capability the build lacks.
   ───────────────────────────────────────────────────────────────────────── */

const CONTACT_EMAIL = "patrick@unitalk.com";
const BOOKING_URL = "https://cal.com/patrick-chassany";
const PHONE = "+33500000000";

export function ActionRail() {
  return (
    <aside aria-label="Contact Patrick" className="space-y-4">
      <section className="rounded-[10px] border border-ivory-line bg-white p-5">
        <h2 className="eyebrow text-muted">Contact</h2>
        <div className="mt-4 space-y-2">
          <Action
            href={`mailto:${CONTACT_EMAIL}?subject=Via%20Patrick%27s%20Collaborator`}
            label="Send an email"
            hint="Opens in your mail app"
            primary
          />
          <Action
            href={BOOKING_URL}
            label="Book a time"
            hint="30 min — by video"
          />
          <Action
            href={`tel:${PHONE}`}
            label="Call"
            hint="Weekdays, 9–18 CET"
          />
        </div>
        <p className="mt-4 border-t border-ivory-line pt-4 text-[0.8125rem] leading-[1.5] text-muted">
          The Collaborator can also handle these itself once connected — send
          the message, hold the slot, take the call.
        </p>
      </section>

      <section className="rounded-[10px] border border-ivory-line bg-white p-5">
        <h2 className="eyebrow text-muted">What it is</h2>
        <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink">
          A persistent AI identity that represents Patrick, remembers context,
          uses tools, and does work. Not a chatbot: a Collaborator.
        </p>
        <dl className="mt-4 space-y-2.5 border-t border-ivory-line pt-4 text-[0.875rem]">
          <Fact k="Owned by" v="Patrick Chassany" />
          <Fact k="Reaches" v="Web · voice · email" />
          <Fact k="Knows" v="Public professional work" />
        </dl>
      </section>
    </aside>
  );
}

function Action({
  href,
  label,
  hint,
  primary = false,
}: {
  href: string;
  label: string;
  hint: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center justify-between rounded-[6px] border px-4 py-3 transition-colors ${
        primary
          ? "border-ink bg-ink text-ivory hover:bg-signal hover:border-signal"
          : "border-ivory-line text-ink hover:border-ink"
      }`}
    >
      <span className="text-[0.9375rem] font-medium">{label}</span>
      <span
        className={`text-[0.75rem] ${primary ? "text-ivory/60" : "text-muted"}`}
      >
        {hint}
      </span>
    </a>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right text-ink">{v}</dd>
    </div>
  );
}