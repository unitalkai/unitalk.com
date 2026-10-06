/* ─────────────────────────────────────────────────────────────────────────
   Placeholder portrait — generated, to be replaced by the real photograph.

   A profile needs a face. A monogram plate reads as a logo; an abstract
   portrait at least reads as a person. This is a deterministic SVG portrait
   plate: warm paper ground, ink silhouette, signal accent. Swap the <img>
   in profile-header.tsx when the real asset exists — nothing else changes.
   ───────────────────────────────────────────────────────────────────────── */

export function Portrait({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Portrait of Patrick Chassany (placeholder)"
    >
      <defs>
        <linearGradient id="pt-ground" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EDE7DC" />
          <stop offset="100%" stopColor="#DCD4C6" />
        </linearGradient>
        <linearGradient id="pt-ink" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#2A2724" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>

      <rect width="200" height="200" fill="url(#pt-ground)" />

      {/* Shoulders */}
      <path
        d="M18 200c0-42 34-70 82-70s82 28 82 70z"
        fill="url(#pt-ink)"
      />
      {/* Neck */}
      <path d="M84 118h32v34c0 9-32 9-32 0z" fill="#161514" />
      {/* Head */}
      <ellipse cx="100" cy="82" rx="38" ry="44" fill="url(#pt-ink)" />
      {/* Collar light — reads as a shirt, not a blob */}
      <path
        d="M100 132l-22 14 22 22 22-22z"
        fill="#F5F1EA"
        opacity="0.9"
      />
      {/* Signal accent: the one identity mark */}
      <rect x="150" y="26" width="24" height="4" rx="2" fill="#E01B84" />
    </svg>
  );
}