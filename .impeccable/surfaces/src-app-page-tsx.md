---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/home.css", "src/components/work-demo.tsx", "src/components/home-entry.tsx", "src/components/channel-ribbon.tsx", "src/components/collaborator-offer-context.tsx", "src/lib/work-examples.ts", "src/lib/collaborator-offer.ts"]
---

# Homepage

Mode: Persuade. English homepage for professionals considering their first AI Collaborator. The user selected work-first **“Voir le travail”**: show a useful next step, let visitors try it, then meet theirs. Current order: **WORK + DEMO PROOF → MIGRATE → OWN → CONTROL → PRESENCE + PATRICK → PRICE → CLOSE**. This is an extension of the pinned system, informed by conversion-oriented pages without a measured-conversion claim.

## Direction contract

THESIS: Your AI Collaborator works for you. Show a prepared follow-up in the first viewport, then let a visitor explore a mission before starting their own. The user chose “Voir le travail”; evidence leads configuration.

OWN-WORLD: User-pinned whatsapp.com: warm cream, near-black, light sans-serif display, 80px navigation, 50px pill controls and generous photo panels. Replace green with fuchsia; white text on solid fuchsia.

STORY: See a specific work artifact; explore follow-up, lead qualification or meeting preparation; optionally enter a domain or intended LinkedIn channel and meet yours in English. Follow with history, ownership, authority, public presence and price. Patrick's proof is consolidated into the public front door after authority, with no separate early Patrick section. Retain the pinned headline, closing, multi-cloud/model labels, palette and removed notices/photo credits. No claims of measured conversion rates, customers or live actions.

FIRST VIEWPORT: The existing rounded dark/photo plane contains the pinned headline on the left, concrete outcome copy, “See it do the work” and quieter “Meet yours”, followed by the 20px price and adjacent “AI usage separate. Explore the demo without payment.” A white follow-up artifact sits low on the right photo, visibly a Demo draft awaiting review. Mobile keeps the actions and qualified price before an in-flow photo/artifact; only part of the artifact appears above the fold. The next work section pairs copy/domain entry on the left with the interactive example on the right; mobile reads copy → example → entry. The single stock-portrait ribbon stays decorative, compact and unnamed.

LAPTOP HEIGHT: At widths ≥960px and heights ≤820px, use the route-local height-aware title, 28px vertical copy padding and 490px minimum hero to retain work actions and qualified price at 1280 × 600. The hero photo area becomes 480px in-flow below 959px and 375px below 699px. At 320px, wrapping the price is acceptable; clipping or horizontal overflow is not. Shared type tokens stay fixed.

FORM: User-pinned reference, no random direction seed. Code-led translation from the measured live reference.

CHANNELS: A compact staggered ribbon of WhatsApp, LinkedIn, Slack and email marks sits immediately above the existing “Designed for…” copy. White circles echo the portrait ribbon at a smaller scale; brand marks keep their original colors, with one pink message bubble and a fuchsia email outline. The ribbon is decorative and non-interactive. Local SVGs shrink at the existing mobile breakpoint. These depict intended channels; the local encounter continues to explain that connections are planned.

CHANNEL VERIFICATION (2026-10-07): Lint, generated route types and TypeScript passed. Browser checks at 1440, 1280, 390 and 320px confirmed four contained icons, no horizontal overflow, no runtime errors and no interactive elements in the decorative ribbon. Desktop and mobile screenshots reviewed; circle scale, vertical staggering and spacing to the channel copy fit the incumbent composition. Detector reported advisory-only findings for documented brand colors and existing type sizes.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Interaction and route boundaries

- **Footer/FAQ language extension:** the shared composition now lives in `src/components/marketing-home.tsx`, rendered by English `/` and translated `/fr`. Native six-question FAQ follows pricing and precedes the closing action. The dark shared footer owns “Own your intelligence”, grouped links, verified `unitalkai` social icons and English/Français route switching. Marketing CTAs retain the selected language and shared preferences; the French marketing encounter is `/fr/meet`, separate from the visitor dashboard. French examples, form labels/errors, price labels and navigation are translated. Footer/FAQ and bilingual route checks passed at 1440, 1280 × 600, 390 and 320px; lint, TypeScript and production build passed. No new palette or typography scale is introduced.
- **Latest user refinement:** remove the hero Demo chip and label its static illustration “Example follow-up”; keep interactive work labelled. The primary hero CTA hovers white with ink text/border for contrast against its dark photographic plane. Customer login opens `/login` directly from desktop/mobile navigation, with no example-workspace chooser. Add six sourced decorative SVG marks to the existing history list, preserving the pinned composition. AI subscription wording, Privacy, Store and For businesses are recommendations pending a product/navigation decision; no ChatGPT OAuth, catalog or new privacy claim is implied by this refinement.
- **Primary action:** See it do the work anchors to `#work-example` with sticky-header scroll clearance. **Meet yours** and shared English marketing CTAs open `/meet?rencontre=1`, a separate English encounter; Patrick's public-front-door links open `/@patrick`.
- **Work proof:** Follow up / Qualify a lead / Prepare a meeting are native button selectors with `aria-pressed`, not an ARIA tab widget. Each displays a prewritten request/context/draft and authority boundary. Changing the example clears edits/approval. Edit the draft opens a labelled textarea (1500-character limit); keeping edits or changing text clears approval. Approval is disabled for blank/already-approved drafts and only changes local state. Interactive demo and nothing-sent/no-meeting-booked copy remain visible, with a polite result status. The hero artifact is non-interactive and does not send anything.
- **Entry:** HomeEntry validates the supplied public URL, shows an inline error on failure, and carries valid `url` plus offer choices to English `/meet`. Start with LinkedIn carries `channel=linkedin`; the note says both connections are planned. No OAuth or website analysis runs. `/meet` visibly confirms the reference/channel and returns the selected mission's prewritten artifact; its details live in the new encounter brief.
- **Preferences:** root-layout provider state survives client marketing navigation. Link merge order is defaults → shared preferences → explicit `choices`; an explicit keys CTA wins over a prior intelligence selection while preserving other fields. `language="en"` selects `/meet`; omitted/French language retains `/dashboard/visiteur`. These are allowlisted preview choices, not billing or deployment.
- **Preserved close:** “You don’t have to be everywhere. Your Collaborator can.”, Meet your Collaborator and “Own your intelligence.” Stay within the WhatsApp–fuchsia family and keep Multi cloud hosting / Multi model intelligence. Migration and Hermes remain planned; setup/footer notices and photograph credits removed by the user stay removed.

## Documentation evidence and review status

Checked the latest homepage, route CSS, work example/component, HomeEntry, offer context/library and English encounter source. Opened `conversion-desktop-viewport.png` (1440px), `conversion-laptop-viewport.png` (1280 × 600), `conversion-mobile-viewport.png` (390px), `conversion-narrow-viewport.png` (320px), plus the supplied work and encounter captures. The parent reports no horizontal overflow at these widths; the viewport evidence keeps work CTA/qualified price visible and shows partial mobile proof below the fold. The older work capture predates the latest channel ribbon and entry markup; source wins for those details. No new browser session or application tests were run by the documenter.

The independent finish review accepted the visual direction and required one restart-control correction on `/meet`. The final verdict scored that correction **resolved** and returned **SHIP within the frontend-demo scope**. Desktop/mobile restart checks verified that edits and approval reset, the form receives focus, and resubmission creates a fresh unapproved example. Lint, route generation, TypeScript and the final production build passed. Stock photographs and embedded source provenance are existing assets. Older French-route/sequence context, source-record captions and sidecar examples remain pre-existing drift, recorded in PRODUCT.md and DESIGN.md.
