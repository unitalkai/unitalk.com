<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Product scope

The user requires four distinct surfaces:
- Homepage.
- Public profile of Patrick Chassany's AI Collaborator.
- Dashboard for Patrick Chassany when signed in.
- Dashboard for a signed-in visitor.

The user-pinned owner wireframe v1.0 has three navigation areas: `Accueil / People / Collaborator` (`Accueil / People / Moi` in mobile bottom navigation). The French experience is confirmed. These are areas of one owner dashboard, not the four product surfaces. Accueil is exceptions plus proof of work, People is narrative relationships and takeover, and Collaborator holds authority and secondary controls. Keep public, owner, and visitor experiences distinct when adding authentication.

## Current implementation and context

- This is one npm application. `.opencode/package.json` belongs to the coding tooling, not a second application package.
- Routes: `/` is the homepage; `src/app/[profile]/page.tsx` renders `/@patrick-chassany`; `/@patrick` redirects to it. `/dashboard/patrick` and `/dashboard/visiteur` are distinct demo dashboards. Public routing accepts raw `@` and `%40` parameters, which this Next.js version passes during routing/prerendering; unknown profiles return 404.
- `/how-it-works` and `/pricing` are supporting English marketing pages. They explain the five dimensions (knowledge, connections, tools, ongoing work, authority); the core four experiences remain separate.
- The dashboards simulate signed-in roles and use example data. No actual authentication, AI model, crawling, external integrations, or durable persistence exists. Owner validations are local; conversation responses are predefined. Never treat the demo role selection as authorization.
- Owner implementation: `src/components/owner-dashboard.tsx`, `owner-collaborator.tsx`, `owner-setup.tsx` and `src/lib/owner-demo.ts`. Local approvals remove exceptions and update activity/relationship next steps; NEVER DO IT, pause and takeover block corresponding demo approvals. Knowledge/history/tools/permissions are local references or previews, memory supports edit/delete, and onboarding can be replayed from the account menu. See `PRODUCT.md` and the owner surface brief for the full scope and verification truth.
- Server pages own route metadata; shared interactive components live in `src/components/`. The visitor chat remains mounted when switching dashboard sections so its in-page conversation survives.
- Read `PRODUCT.md` for terminology and product intent: use **AI Collaborator**, keep knowledge distinct from memory, and do not rename Patrick's Collaborator to Pacha. Simulated activity/results must be visibly labelled as a demo.
- Positioning is work-first: **“Il travaille pour vous”** and **“Rencontrer mon Collaborateur”**. The homepage CTA opens `/dashboard/visiteur?rencontre=1` on a local encounter (name, mission, optional intended channels); a public URL is only an optional source. LinkedIn/email/WhatsApp integrations remain planned, not implemented.
- Homepage sequence: WORK → PROOF → MIGRATE → OWN → CONTROL → PRESENCE → PRICE. Hermes, history import and deployment are planned, not integrated. `src/lib/collaborator-offer.ts` owns the €9.99/month and €99/year labels plus allowlisted hosting/intelligence/billing preferences passed to the encounter. Do not treat these selectors as provisioning or payment.
- `CollaboratorOfferProvider` lives in the root layout so choices survive navigation between marketing pages. `EncounterLink` merges defaults, shared choices, then explicit CTA overrides; a “Bring my keys” CTA must select keys even if another intelligence option was previously chosen. AI usage is separate from the subscription; no credit-pack prices are defined.
- The user pinned the design system to **whatsapp.com with green replaced by fuchsia**. `DESIGN.md` and `.impeccable/design.json` document the implemented system; `.impeccable/surfaces/` holds route-specific briefs. Cream, pill buttons, white bubbles and lightweight sans-serif titles are intentional.
- The README is a starter template: entrypoint is under `src/app/`; homepage, How it works and Pricing are English (`lang="en"` wrappers), while profiles/dashboards remain French. Shared shell components support these languages. Archivo is loaded in `layout.tsx` with `next/font/google`; `--font-display` aliases the body face.
- The homepage photograph is a local illustrative asset, not Patrick or Unitalk's team; provenance is in `public/images/SOURCES.md` and embedded in the JPEG.

## Commands and verification

Run from the repository root. In this Windows PowerShell environment, use `npm.cmd` and `npx.cmd`: the plain names resolve to scripts blocked by the execution policy.

| Task | Command |
| --- | --- |
| Install locked dependencies | `npm.cmd ci` |
| Develop | `npm.cmd run dev` (specific port: `npm.cmd run dev -- --port 3100`) |
| Lint application code | `npm.cmd run lint -- src` |
| Lint one file | `npm.cmd run lint -- src/app/page.tsx` |
| Generate route types | `npx.cmd next typegen` |
| Type-check after type generation | `npx.cmd tsc --noEmit` |
| Production build / serve | `npm.cmd run build`, then `npm.cmd run start` |

- Generate route types before type-checking: `layout.tsx` uses generated `LayoutProps`, and `next-env.d.ts` imports generated route declarations. Do not edit `next-env.d.ts` or `.next/` outputs.
- Next.js 16 builds do not run ESLint. Run lint separately; there are no test/typecheck npm scripts or configured test suites in this repository.
- Use the URL printed by the dev server. Next.js prevents a second dev server for the same project; verify the existing server's project/process before stopping it.

## UI tooling

- Tailwind CSS v4 is configured through `@tailwindcss/postcss` and `@import "tailwindcss"`; shared tokens and component styles live in `src/app/globals.css`, not a `tailwind.config.*` file. `src/app/owner.css` is imported by the Patrick dashboard route and scopes owner composition/controls through owner-prefixed selectors while inheriting the shared tokens.
- For frontend design work, use the repository's Impeccable skill at `.opencode/skills/impeccable/SKILL.md`. Its Windows launcher is `.opencode/skills/impeccable/scripts/impeccable.cmd`; follow its setup and the requested command's reference.
