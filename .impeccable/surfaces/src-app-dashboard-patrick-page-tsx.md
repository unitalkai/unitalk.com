---
version: 1
slug: "src-app-dashboard-patrick-page-tsx"
primary_target: "src/app/dashboard/patrick/page.tsx"
related_targets: ["src/components/owner-dashboard.tsx", "src/components/owner-collaborator.tsx", "src/components/owner-setup.tsx", "src/app/owner.css", "src/lib/owner-demo.ts"]
---

# Patrick's dashboard

Mode: Operate. Owner reviews decisions, inspects demo work and relationships, and understands the Collaborator's knowledge and permissions.

## Direction contract

THESIS: Home is exceptions plus proof of work. Three primary sections only: Accueil, People, Collaborator. The Collaborator works; the owner gets involved when needed.

OWN-WORLD: WhatsApp cream and lightweight sans-serif; fuchsia selections, understated hairlines and rounded standard controls. Dense enough to operate, without marketing-sized dashboard titles.

STORY: French owner experience, confirmed by the user. Three explicitly simulated exceptions lead to contextual decisions. A local approval removes an exception, updates the relationship and adds an outcome to the activity. People opens narrative relationships and conversations, with owner takeover and return of control. Collaborator owns knowledge, memory, capabilities and explicit authority.

FIRST VIEWPORT: A compact owner-only shell, identity at left and clickable fuchsia status at right. Three understated navigation controls. A large “J’y travaille.”, then “Vous” and three stacked white exception summaries. No counters beyond the exceptions, no grid of statistics. Concise first-person activity and people follow below. Conversation is always one click away.

FORM: User-pinned wireframe v1.0, code-led; no concept seed needed. WhatsApp–fuchsia world retained. Focused detail screens with explicit back controls; secondary infrastructure stays behind Collaborator/account. Mobile uses bottom navigation Accueil / People / Moi. Signature interaction: approve an exception and see it become a work outcome. Pause, takeover, authority and memory changes are local demo state.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Implemented controls — wireframe v1.0

- **Navigation and home:** Accueil / People / Collaborator; mobile Accueil / People / Moi. Owner-only identity/status shell, account menu and one-click native conversation dialog. Home stacks Sarah, Acme and David exceptions, then first-person activity and People. Only the pending-exception count is shown; no metrics grid. Resolving the three exceptions reveals the all-clear state.
- **Contextual decisions:** context, recommendation, why and available action; Sarah’s selectable slots, Acme’s editable draft and David’s required priorities. Approval updates the local pending list, activity, relationship next step and conversation. Empty drafts/priorities report inline errors. Focused views have explicit back controls.
- **People and activity:** searchable narrative relationships, context/history/next step, simulated threads, take over / let the Collaborator continue, and local owner replies. Activity has day groups, filters, expandable outcomes and relationship links. Status opens activity; pause/resume and a labelled working/waiting/needs-owner scenario selector update local state.
- **Authority:** editable DO IT / ASK ME / NEVER DO IT zones, with local activity on changes and focus retained on the moved rule. NEVER DO IT blocks the corresponding decision approval; pause and takeover also block it. DO IT does not auto-approve existing pending decisions.
- **Secondary Collaborator controls:** add/remove knowledge references with URL validation, history-provider migration preview, planned capabilities, intended tools/MCP choices and per-channel permission save/remove previews. Memory supports correction/cancel/delete independently of knowledge. Identity name changes appear in the owner shell; Patrick’s public identity remains independent, with open/copy URL controls.
- **Infrastructure/account:** local hosting/intelligence and monthly/annual billing preferences; JSON download of demo preferences, not a production backup or work-history export. Security, durable backups and advanced configuration are a planned disclosure. The mounted Collaborator component preserves its local choices while sections change.
- **Owner onboarding replay:** account-menu entry opens name + optional website, confirmation/correction, mission + intended channels, scripted work and result, then returns to Patrick’s existing scenario. LinkedIn and voice controls explain planned availability. No real Collaborator is created or scenario data personalized.

## Verification truth

Documentation checked against the route, scoped owner CSS, all three owner components and `src/lib/owner-demo.ts`. Final verification: `npm.cmd run lint -- src`, `npx.cmd next typegen`, `npx.cmd tsc --noEmit`, `npm.cmd run build` and `git diff --check` passed. Browser integration verified three approvals and empty success, activity filters and pause/waiting, search and takeover, memory continuity, knowledge references, migration preview, permissions, tools, hosting/intelligence preferences, export, identity, authority blocking and retained keyboard focus, named conversation dialog and contextual replies, and onboarding replay. No runtime errors or horizontal overflow at 320/390/768/1024/1440px. Captures are in `.impeccable/review/owner-wireframe/`; development-only Next.js chrome was hidden in the final captures. A finish review accepted the visual direction and requested two accessibility fixes. Its verdict pass scored the dialog name and authority focus fixes resolved (`ship` at the scope of those fixes).

All work, replies and outcomes are visibly labelled demo/local. No authentication or authorization, AI execution, external send/calendar action, account/tool connection, source/history ingestion, provisioning, payment or durable persistence is implemented. State is in the mounted page and resets on reload; export is an explicit local download.

**Consistency verdict:** owner documentation matches the pinned v1.0 and inspected implementation. `owner.css` reuses the palette, type and radius variables from `globals.css`; DESIGN.md frontmatter and `.impeccable/design.json` canonical colors agree, including the existing literal signal-light. No global visual-system change. The preserved sidecar still carries older list/detail narrative and source metadata (provider placement/preference precedence, removed footer disclosures and ownership-select preview copy). DESIGN.md's existing shared-encounter paragraph also predates root provider placement and explicit CTA overrides, and its marketing layout still mentions removed footer disclosures. These are unresolved documentation drift outside the owner update, not token drift.
