---
version: 1
slug: "src-app-meet-page-tsx"
primary_target: "src/app/meet/page.tsx"
related_targets: ["src/components/english-encounter.tsx", "src/components/work-demo.tsx", "src/app/home.css", "src/lib/work-examples.ts", "src/components/collaborator-offer-context.tsx", "src/lib/collaborator-offer.ts"]
---

# Meet your AI Collaborator

Mode: Persuade. An English marketing encounter for a prospective owner arriving from the homepage, How it works or Pricing. Job: choose one mission and experience a useful draft with the final decision still theirs. This local preview is independent of Patrick's public interaction and the French owner/visitor dashboards.

## Direction contract

THESIS: Continue the work-first promise with name + mission → a corresponding prepared draft. Make the encounter tangible without claiming to create a real Collaborator.

OWN-WORLD: Extend the pinned WhatsApp–fuchsia world: cream canvas, normal-weight Archivo heading, fuchsia pills, white work paper, pink reference/request bubbles, hairlines and visible focus. No new palette, shared type ramp or imagery.

STORY: Confirm any website reference or intended LinkedIn channel; ask a name and one mission; greet the visitor and show its editable prewritten example. Approve locally, restart or try another mission, then return to the work. Setup choices stay secondary.

FIRST VIEWPORT: Shared English header; Back to the work; “Meet yours. Start with one mission.” and local-demo qualification. Desktop places context/form on the left and a dark Local encounter preview on the right. Submission replaces that preview with an inline greeting and white draft panel. Mobile stacks form then result; submission focuses/scrolls to the greeting so the result is discoverable.

FORM: Precisely specified marketing extension inside the incumbent world; code-led, no new direction seed. Native name input and mission radios precede the fuchsia Meet my Collaborator action. Website/channel confirmation is immediately visible when supplied; hosting/intelligence/billing appear in Your setup choices disclosure.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Layout and states

- Shared 1152px content container and sticky English header. Workspace uses 0.85:1.15 columns and 72px gap, reducing to 40px at 1199px. At 699px it stacks with a 32px gap and a fluid 32–44px heading. The dark empty panel uses 24px corners and 40px padding, reducing to 28px padding/320px minimum height on mobile. These are route-local values in `src/app/home.css`.
- White 53px-minimum name pill with a visible label; 70-character limit and name autocomplete. Blank/whitespace submission exposes an English inline alert and `aria-invalid`. Follow-up is the default radio; choices are Prepare my follow-ups / Qualify my opportunities / Prepare my meetings.
- A valid URL produces Website received: [hostname] with “Not analysed or connected.” Invalid direct URL context produces an alert while allowing a mission-only encounter. Only `channel=linkedin` is recognized by the route; it displays Starting with LinkedIn and explains that no account is connected. Neither route performs OAuth, crawling or ingestion.
- Submit displays “Hi [name]. Let’s make the next step easier.” and the matching compact WorkDemo, without its homepage selectors. The heading receives programmatic focus and scrolls into view, instant for reduced motion and smooth otherwise. The result region and local approval status are polite live regions.
- The compact artifact retains Interactive demo, its example context, editable draft, approval boundary and no-action copy. Approval edits local state only; nothing is sent, no meeting is booked and no AI call runs. The supplied name changes the greeting, not the underlying draft or example context.
- Start again / Try another mission return to the form and unmount the artifact, clearing draft edits, editing and approval. The inspected source requests name-field focus and retains the form's name/mission; changing either also exits the result. URL/channel/setup context remains supplied by the route. Reload resets local encounter state, with no storage-backed identity or transcript. The restart control's final behavior is subject to the parent's pending correction/verdict, not certified here.

## Routing and offer handoff

`src/app/meet/page.tsx` owns English metadata with noindex/nofollow and renders a `lang="en"` wrapper, shared English shell and EnglishEncounter. Completion stays here; Back to the work opens `/#work-example`. No Patrick dashboard redirect, account creation, authentication, new public URL, payment or deployed Collaborator follows submission.

Homepage/How it works/Pricing and shared English CTA components use `EncounterLink language="en"` or `encounterLink(preferences, "en")`, yielding `/meet?rencontre=1`. Omitted language or `"fr"` retains the French `/dashboard/visiteur?rencontre=1` path. Root-layout provider state survives client navigation. Defaults → shared preferences → explicit CTA `choices` determines the link; explicit named choices win, including Bring my keys after credits/gateway. Only allowlisted hosting/intelligence/billing query values are displayed under Your setup choices. The disclosure says no deployment or subscription is activated; no keys are collected. AI usage remains separate from the subscription.

## Evidence and outstanding review

Source checked: route, EnglishEncounter, WorkDemo, work examples, route CSS, HomeEntry, root provider, offer library and English marketing CTA call sites. Supplied desktop/mobile encounter captures show name/mission, website confirmation, matching meeting draft and local edit/approval controls. Homepage viewport captures cover 320px, 390px, 1280 × 600 and 1440px; the parent reports no horizontal overflow in the checked homepage/encounter layouts. This documentation pass inspects source and existing captures only; it does not rerun interactions, lint, TypeScript or builds.

The current reviewer found **one restart-control issue** and the parent is fixing it. **Final verdict is pending the parent's recorded review.** No SHIP or resolved-fix claim is made for this revision. Earlier public Collaborator approval and older French-homepage reviews do not approve `/meet`. No asset is created by this task; existing stock-photo provenance stays intact. Global design/frontmatter and sidecar tokens remain the incumbent system, with pre-existing context drift noted in PRODUCT.md and DESIGN.md.
