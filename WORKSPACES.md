# Public product navigation and local workspaces

Approved 2026-10-21: **For you / Your team / Your community**, with English navigation labels in both site languages. The user confirmed direct interactive spaces for team and community.

| Entry | English route | French route | Experience |
| --- | --- | --- | --- |
| For you | `/for-you` | `/fr/for-you` | Commercial public-profile page, personalized preview, creation journey and an explicit Patrick example link |
| Your team | `/team` | `/fr/team` | Team communication, specialized agents and Git-project positioning; Product studio with general, product, design and code/PR channels |
| Your community | `/community` | `/fr/community` | Fictional creator Léa's forum, with discussions, questions, a sample topic digest and announcements |

`src/lib/product-navigation.ts` owns link labels/destinations. `SiteHeader` and the public profile header share them, with active-page state and a mobile menu below 1200px. Supporting marketing routes remain in the footer.

The homepage remains separately available at `/` and `/fr` through the Unitalk logo and the For you page's Home link. Following the user's correction, For you sells the public-profile offer; `/@patrick-chassany` is the optional working example, not the navigation destination. The example page no longer marks For you as the current page.

The latest For you copy presents the full intended commercial cycle: outbound email/phone prospecting, appointments, answers before/during/after sales, selling and collecting payment, affiliate recruitment, and CRM/communications with every contact. AI Collaborators, code, content and missions are its four offer categories, followed by six capability rows. The public profile is an entry point, not the limit of the work. `PublicDoorPreview` accepts an optional commercial mission here while preserving default homepage/signup usages; its sample address is text, not a link or reservation. `workspace-introduction.tsx` explains the separate Team and Community propositions above the interactive spaces, with an anchor action into each preview.

`PRODUCT.md` remains the communities-first Unitalk.com authority; the personal AI Collaborator product belongs to Unitalk.ai. These routes document the approved presentation and local prototype in this checkout, not a migration of application code or completion of the shared-service target.

## Implemented

`shared-workspace.tsx` renders the shared workspace interaction model, with separate data from `workspace-demo.ts` for each mode/language. Routes explicitly key the component so team/community state does not carry over. The shell inherits this checkout's cream/Archivo/fuchsia system.

- Channel selection, per-channel drafts and local messages.
- Threads with separate reply drafts and sample/local replies.
- Message reactions, workspace-wide local search and navigation to matching channels/threads.
- Shared canvas editing, saving within the mounted preview and task checkboxes.
- Team mentions trigger deterministic example recaps using the selected channel's saved canvas and open tasks; timer completion remains scoped to the originating channel/thread.
- Add a local channel, with name-length and duplicate validation.
- Example member pane; mobile channel selector and stacked secondary panes.
- EN/FR routes and equivalent-language navigation.
- Community-specific title/excerpt/author/reply-count topic lists, existing/new discussion threads and creator resource notes. Mentions in a new community topic open its thread and answer as replies using that category's saved resources; mentions in an existing thread answer there. These resource-grounded answers are deterministic examples.
- A sample moderation queue: Keep dismisses a report; Hide removes its discussion locally and closes its open thread; Restore makes it visible again. Hidden discussions and their replies are excluded from the visible forum and search. Hiding is reversible within the mounted preview; no automated classifier runs.
- A local topic-watch category, explicitly a prewritten digest, not a live news feed.

Introduction scope copy, fictional-creator identification and local/example labels qualify participants, messages and AI outcomes. These pages have no account/session authorization, live membership, relay connection, real invitation delivery or live AI execution. Messages and edits reset on reload or route/language changes. They do not modify Patrick's public conversation or the existing dashboard demos.

## Source and service boundaries

The requested interaction reference is [Buzz.xyz](https://buzz.xyz) and [block/buzz](https://github.com/block/buzz): people and agents share channels, threads and canvases. This is a local Unitalk implementation of that model, not an imported or deployed upstream client. No upstream product name appears in the rendered workspace or its route metadata.

The Team introduction was also checked against the rendered Buzz.xyz homepage on 2026-10-21: “A new native workspace for human + agent teams”, “Communicate with your team”, “Bring in your agents” and “Manage your git projects”. Unitalk adapts these concepts and the planning/project-management/code/review/PR journey, without copying the upstream download, enterprise waitlist or availability claims. The Community scenario is locally authored for a fictional photography content creator.

Léa publishes fictional photography tutorials and a newsletter. The forum illustrates moderation assistance, relevant topic digests and answers from creator resources; its moderation is local, its digest prewritten and its answers predefined. Live topic monitoring and AI moderation remain unconnected. Team Git repositories, specialized-agent execution and development tools remain planned. The commercial clarification adds no outreach, sales/payment, affiliate or CRM backend.

The actual shared-service target remains governed by `PRODUCT.md` and the sibling `buzz/AGENTS.md`, `SPEC.md`, `DESIGN.md`, and `DEPLOYMENT.md`: shared Clerk/Convex, community-scoped membership, managed signing and isolated hosted Collaborators. Public navigation work does not establish those integrations or provision infrastructure.

## Latest verification — 2026-10-21

**SHIP at commercial presentation/local-interactive preview scope; no material fixes.** The reviewer inspected current source and all seven captures below. This is the supplied final implementation/review evidence, reconciled with current source during documentation; it is not a new test run or publication result.

- Browser passed **six localized pages** (`/for-you`, `/fr/for-you`, `/team`, `/fr/team`, `/community`, `/fr/community`) at **320/390/768/1024/1280/1440px**.
- Coverage: complete For you commercial scope, Team Git/agent content, community topic lists, hide/restore/keep sample moderation, hidden-topic/reply exclusion from forum/search, resource-grounded mentions as thread replies, prewritten digest, separate context and preserved default homepage preview.
- Actual final application lint: **0 errors, two preexisting `signup-form.tsx` warnings**. Next route type generation, TypeScript and production build passed; **42 pages** generated.
- Detector: **inherited 8/10px workspace radius advisories only**. No new global design tokens or raster assets; `DESIGN.md` and `.impeccable/design.json` are preserved.

### Reviewed capture manifest

All files are under `C:/Users/pc/AppData/Local/Temp/opencode/`:

- `positioning-for-you-en-1440.png`
- `positioning-for-you-fr-390.png`
- `positioning-team-en-1440.png`
- `positioning-team-fr-390.png`
- `positioning-community-en-1440.png`
- `positioning-community-fr-390.png`
- `positioning-community-thread.png`

**Historical verification:** the prior navigation/generic-workspace pass covered seven routes at 320/390/768/1024/1200/1280/1440px, including active state, drafts, messages, replies, canvas recaps, search, channel validation, members and language/context isolation. Its local-prototype SHIP verdict, nine-image workspace/profile review and 40-page build belong to that earlier version. The initial three-benefit For you review is likewise historical. Surface briefs retain compact provenance; the latest evidence above governs the expanded commercial and creator-forum content.

## Publication status

The user requested publication to GitHub **`unitalkai/unitalk.com`** and the existing Vercel project **`unitalkai/unitalk-com`**. Status: **pending**. No completed publication, commit SHA or deployment URL is established by this handoff. The scoped SHIP verdict certifies the reviewed presentation/local interactions, not a deployed collaboration or commerce service.
