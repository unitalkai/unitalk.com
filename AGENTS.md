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

The owner's `Vous / Votre Collaborateur / Relations / Connaissances & capacités` tabs are sections of one dashboard, not these four surfaces. Keep public, owner, and visitor experiences distinct when adding authentication.

## Current implementation and context

- This is one npm application. `.opencode/package.json` belongs to the coding tooling, not a second application package.
- Routes: `/` is the homepage; `src/app/[profile]/page.tsx` renders `/@patrick-chassany`; `/dashboard/patrick` and `/dashboard/visiteur` render distinct demo dashboards. The public route accepts both `@patrick-chassany` and its `%40` representation, which this Next.js version passes during routing/prerendering; other profiles return 404.
- The dashboards simulate signed-in roles and use example data. No actual authentication, AI model, crawling, external integrations, or durable persistence exists. Owner validations are local; conversation responses are predefined. Never treat the demo role selection as authorization.
- Server pages own route metadata; shared interactive components live in `src/components/`. The visitor chat remains mounted when switching dashboard sections so its in-page conversation survives.
- Read `PRODUCT.md` for terminology and product intent: use **AI Collaborator**, keep knowledge distinct from memory, and do not rename Patrick's Collaborator to Pacha. Simulated activity/results must be visibly labelled as a demo.
- The user pinned the design system to **whatsapp.com with green replaced by fuchsia**. `DESIGN.md` and `.impeccable/design.json` document the implemented system; `.impeccable/surfaces/` holds route-specific briefs. Cream, pill buttons, white bubbles and lightweight sans-serif titles are intentional.
- The README is a starter template: the actual entrypoint is under `src/app/`, the interface is French, and Archivo is loaded in `layout.tsx` with `next/font/google`. `--font-display` aliases the body face in CSS; no serif display font is used.
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

- Tailwind CSS v4 is configured through `@tailwindcss/postcss` and `@import "tailwindcss"`; shared tokens and component styles live in `src/app/globals.css`, not a `tailwind.config.*` file.
- For frontend design work, use the repository's Impeccable skill at `.opencode/skills/impeccable/SKILL.md`. Its Windows launcher is `.opencode/skills/impeccable/scripts/impeccable.cmd`; follow its setup and the requested command's reference.
