---
version: 1
slug: "src-app-team-page-tsx"
primary_target: "src/app/team/page.tsx"
related_targets: ["src/app/fr/team/page.tsx", "src/app/community/page.tsx", "src/app/fr/community/page.tsx", "src/components/workspace-introduction.tsx", "src/components/shared-workspace.tsx", "src/components/shared-workspace.css", "src/lib/workspace-demo.ts", "src/components/site-shell.tsx", "src/lib/product-navigation.ts", "src/components/product-navigation.css", "src/components/footer-language.tsx", "src/lib/marketing-language.ts", "src/app/[profile]/page.tsx", "src/components/public-collaborator.tsx", "WORKSPACES.md", "OPENUI-INTEGRATION.md"]
---

# Team and community workspaces

## Latest content and forum adaptation (2026-10-21)

Team now introduces the verified rendered Buzz.xyz pillars—team communication, specialized-agent collaboration and Git projects through plans/code/reviews/PRs—under Unitalk branding. The retained space adds a code/PR channel; no live Git or multi-agent execution is implied.

Community is a discussion forum for fictional photography creator Léa's tutorials/newsletter. Its introduction foregrounds moderation, topic monitoring and member answers. Categories are discussions, questions, topic watch and announcements; topic rows open reply threads. A sample moderation queue supports keep/hide/restore, with hidden discussions and their replies excluded from forum/search. Resource-based example answers stay in their originating topic; topic-watch content is explicitly prewritten. Intro CTAs jump into each local space. Latest review: **SHIP at commercial presentation/local-interactive preview scope**, with no material fixes. Earlier generic design-community descriptions and verification are historical, superseded by the current contract and evidence below.

Mode: Operate. User confirmed direct interactive destinations for Your team and Your community, using the upstream channel/thread/canvas model under Unitalk branding.

## Direction contract

THESIS: Team presents people, specialized agents and Git-project work in shared context; Community presents a creator-led forum with resource-based answers. Each has independent local context and one sample Collaborator; broader agent capabilities remain positioning targets.

OWN-WORLD: Retain this checkout's cream, Archivo, fuchsia active states, white work area and flat hairlines. No global restyling; channel sidebar and task-level controls carry the workspace hierarchy.

STORY: Read the audience-specific introduction and jump into the preview. In Team, choose a channel, discuss work and update its canvas. In Community, open or start a topic, reply, consult creator resources or try the sample moderation queue. Scope copy and example labels qualify local actions and predefined outcomes.

FIRST VIEWPORT: Shared For you / Your team / Your community navigation leads into an audience-specific headline, three capability rows, a preview anchor CTA and explicit current-scope copy. The workspace follows with a 220px channel/category sidebar, fluid white conversation/topic list and optional 300px thread/member pane. Below 1200px, the sidebar becomes 200px and the detail pane moves below the conversation. At 699px and below, the introduction stacks, a native channel selector replaces the channel list and secondary panes stack without an overlay. The local new-channel disclosure remains available on mobile.

FORM: User-pinned channel/thread/canvas grammar, reimplemented as a scoped Unitalk preview. Team channels organize general, product, design and code/PR work; Community categories organize discussions, questions, topic watch and announcements. The upstream reference is documentation-only; its name is absent from rendered copy and route metadata.

FINISH: Final reviewer inspected current source and all seven positioning captures and returned **SHIP at commercial presentation/local-interactive preview scope**, with no material fixes. The six-page/six-width browser pass, lint, type generation, TypeScript and 42-page production build are recorded below. Real shared services remain unconnected; publication is pending.

## Current implementation contract (2026-10-21)

- **Shared navigation and languages:** `product-navigation.ts` supplies For you / Your team / Your community to marketing and profile headers, with current-page state and a mobile menu below 1200px. These labels remain English in both languages. `/team` and `/fr/team` render the product-studio preview; `/community` and `/fr/community` render the community preview. The footer switches to the equivalent EN/FR route; workspace controls and sample context are localized.
- **Product introductions:** `workspace-introduction.tsx` presents Team communication, specialized agents and Git plans/code/reviews/PRs, verified against the actual rendered Buzz.xyz reference. Community presents fictional Léa's photography tutorials/newsletter and moderation, topic-digest and resource-answer benefits. Both CTAs target `#workspace-example`; the workspace remains directly interactive. Homepage `/` and `/fr`, commercial `/for-you` routes and Patrick's explicitly linked `/@patrick-chassany` example remain distinct.
- **Channels, messages and drafts:** select independent channel context, retain per-channel composer drafts within the mounted preview, and add local messages. Enter submits, Shift+Enter adds a line, and IME composition is respected. Empty or over-limit messages are rejected; message/reply text is bounded to 2000 characters. Channel changes close the detail pane and return to conversation without moving another channel's draft.
- **Threads and reactions:** replies stay under their parent message with separate per-thread drafts and reply counts. The thread pane supports sample and local replies, pending example responses and closing/reopening. Like reactions toggle locally with counts and `aria-pressed` state.
- **Search:** workspace-wide local search matches title, author and message text, reports results or an empty state and opens the matching channel; reply results reopen the parent thread. Search is confined to the selected team or community preview and excludes hidden topics and their replies.
- **Canvas and tasks:** each channel has a separate editable brief/draft, a local Save changes confirmation and task checkboxes. Briefs are bounded to 4000 characters. Saving updates the mounted preview's channel context; new channels start with an empty brief/task list and guidance to place next steps in the brief.
- **Demo mentions:** the mention action inserts `@collaborator` into the draft. Team mentions produce deterministic recaps from the originating channel's saved canvas and open tasks. Community mentions produce example answers from that category's saved resource text; a mention in a new topic opens its thread and adds the answer as a reply, while existing-thread mentions reply there. Timer completion remains attached to the originating channel/thread even after navigation; no live AI executes.
- **Creator forum:** title/excerpt/author/reply-count rows open existing topic threads; the composer starts local discussions. Discussions, questions, topic-watch/veille and announcements/annonces have distinct resource notes. The topic-watch digest is prewritten scenario content, without live news collection.
- **Sample moderation:** the creator-view queue contains a sample reported promotional post. Keep dismisses the report; Hide removes the topic and its replies from visible forum/search and closes its open thread; Restore makes the discussion visible again. Hiding is reversible within the mounted preview. These are local decisions, not role authorization, an automated classifier or live AI moderation.
- **New-channel validation:** the disclosure creates a local channel after trimming the name and removing an initial `#`. Names must have 2–32 characters and be unique case-insensitively; inline alert text and `aria-invalid` expose failures. Successful creation selects the new channel.
- **Member list and preview truth:** the member pane lists example participants and roles, with explicit account/invitation unavailability. Introduction scope copy, fictional-creator identification and local/example labels qualify participants, messages and outcomes. Private / Invite only labels describe the example workspace, not implemented authorization or invitation delivery.
- **State isolation:** routes key the workspace so team/community and language changes create separate local state. Messages, reactions, drafts, canvas edits and channels live only in the mounted preview and reset on reload or route/language change. They do not alter Patrick's public conversation or the dashboard demos. No shared membership, persistence, relay, account/session authorization or hosted Collaborator is connected; `WORKSPACES.md` and product contracts retain service authority.

## Visual and system consistency

The workspace extends the existing cream/Archivo/fuchsia world: white work area, cream sidebar, pink-wash selections, deep-fuchsia active text, hairlines and flat tonal depth. The shell retains 24px corners (20px mobile), shared small/control/title typography, pill member/save actions and circular send/close controls. Native selectors, visible focus, semantic current/pressed states and mobile stacking preserve the operational hierarchy.

The introduction uses the shared headline/title/body tiers, an open two-column desktop layout and hairline-separated benefits; it stacks on mobile. Forum rows and moderation reports remain flat, with wrapping text and pill moderation actions. The latest detector reported **inherited workspace radius advisories at 8/10px only**, for compact channel rows, search, inputs and detail avatars. Earlier compact-profile font advisories belong to the historical combined review. No new global tokens or raster assets were introduced; `DESIGN.md` and `.impeccable/design.json` are preserved. Workspace avatars use initials/icons, and Patrick's retained portrait provenance remains intact on the related profile.

## Verification and scoped finish (2026-10-21)

This records the supplied final implementation/reviewer handoff, checked against current source; no new browser or build run is claimed by this documentation pass.

- **Browser evidence:** all six localized For you, Team and Community pages passed at **320/390/768/1024/1280/1440px**. Coverage includes the complete For you commercial scope, Team Git/agent content, community topic lists, hide/restore/keep moderation, hidden-topic/reply exclusion from forum/search, resource-grounded mentions as thread replies, prewritten digest, separate context and preservation of the default homepage preview.
- **Reference evidence:** the actual rendered Buzz.xyz content was verified for Team's communication/agents/Git pillars. Its name is absent from the Unitalk UI; the local creator scenario is fictional. This establishes content provenance, not a connected upstream client or live Git/agent service.
- **Final review:** reviewer read current source and all seven positioning captures in `WORKSPACES.md`; **SHIP at commercial presentation/local-interactive preview scope**, no material fixes.
- **Final checks:** application lint returned **0 errors and two preexisting `signup-form.tsx` warnings**. Next route type generation, TypeScript and production build passed with **42 generated pages**. Detector findings are limited to the inherited 8/10px workspace radius advisories.

**Historical evidence:** the earlier generic design-community/navigation review covered seven routes, included 1200px, used nine workspace/profile captures and a 40-page build, and returned SHIP at local-interactive prototype scope. Its `product-team-*` / `product-community-*` captures and related 52-program profile checks certify that earlier version only. Detailed profile evidence remains in `.impeccable/surfaces/src-app-profile-page-tsx.md`; it is not a fresh verification of this positioning/forum change.

### Current validated workspace captures

- `C:/Users/pc/AppData/Local/Temp/opencode/positioning-team-en-1440.png`
- `C:/Users/pc/AppData/Local/Temp/opencode/positioning-team-fr-390.png`
- `C:/Users/pc/AppData/Local/Temp/opencode/positioning-community-en-1440.png`
- `C:/Users/pc/AppData/Local/Temp/opencode/positioning-community-fr-390.png`
- `C:/Users/pc/AppData/Local/Temp/opencode/positioning-community-thread.png`

## Publication and service boundary

Publication to GitHub `unitalkai/unitalk.com` and the existing Vercel project `unitalkai/unitalk-com` is **requested, pending**. No completed publication, commit SHA or deployment URL is established. This commercial/local-preview finish introduces no outreach, payment or CRM backend, live Git/agent connections, topic monitoring or AI moderation. The communities-first product and shared-service targets remain governed by `PRODUCT.md` and the sibling community contracts referenced in `WORKSPACES.md`.
