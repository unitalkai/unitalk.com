---
version: 1
slug: "src-app-for-you-page-tsx"
primary_target: "src/app/for-you/page.tsx"
related_targets: ["src/app/fr/for-you/page.tsx", "src/components/marketing-for-you.tsx", "src/components/marketing-for-you.css", "src/components/public-door-preview.tsx", "src/components/public-door-preview.css", "src/components/site-shell.tsx", "src/components/public-collaborator.tsx", "src/lib/product-navigation.ts", "src/lib/marketing-language.ts"]
---

# For you — commercial public-profile page

## Latest commercial clarification (2026-10-21)

The page sells the intended full commercial relationship cycle: outbound email/phone prospecting, appointments, answers before/during/after sales, selling and collecting payment, affiliate recruitment, and CRM/communications for every contact. Four offer categories are explicit: AI Collaborators, code, content and missions. The hero names outreach/sales/follow-up, six readable capability rows explain the work, and the personalized preview uses an optional commercial mission. Copy distinguishes target integrations from current previews; Patrick remains a public-welcome example, not evidence of live prospecting or commerce. Latest review: **SHIP at commercial presentation/local-interactive preview scope**, with no material fixes; evidence below supersedes the earlier three-benefit review.

Mode: Persuade. User correction: retain a distinct homepage; For you must sell the public profile, not open Patrick's example directly.

## Direction contract

THESIS: The visitor's own AI Collaborator supports the intended commercial relationship from outreach to ongoing follow-up. Its public profile is an entry point, not the limit of its work; Patrick is an optional public-welcome demonstration.

OWN-WORLD: Existing cream/Archivo/fuchsia marketing system, lightweight headings, pill CTAs and the existing dark personalized public-door preview. No global visual-world change.

STORY: Understand the commercial promise, try a first name in the preview, explore four offer categories and six stages of relationship work, then start the existing creation journey. Patrick's actual portrait identifies a separate example link.

FIRST VIEWPORT: Home return link, product-specific headline and creation CTA alongside the personalized profile preview. Benefits continue as readable hairline-separated rows; a source-backed Patrick example leads to the public profile.

FORM: User-pinned commercial destination at /for-you and /fr/for-you. The Unitalk logo and Home link return to / or /fr; top navigation uses For you / Your team / Your community. Reuse existing signup and example behavior with clear preview status.

FINISH: SHIP at commercial presentation/local-interactive preview scope. Final scoped verification passed; review found no material fixes. Publication status and capability boundaries remain explicit below.

## Implemented composition and navigation

- `/for-you` and `/fr/for-you` sell the visitor's own public AI Collaborator profile. `/` and `/fr` remain distinct homepages. The shared Unitalk logo and the explicit Home / Accueil link return to the matching-language homepage.
- Shared product navigation remains For you / Your team / Your community. For you opens the matching-language commercial route. Marketing active state is pathname-based: desktop and mobile links receive `aria-current="page"` only when their destination matches the current pathname. Patrick's navigation has had its false For you current flag removed.
- The page sequence is commercial hero and personalized preview → four offer categories → six hairline-separated capability rows → explicitly identified Patrick public-welcome example → authority, contact history and privacy → creation CTA, pricing link and current-capability qualification. Offer knowledge remains distinct from each contact's conversation memory; prices, sales terms and affiliate rules stay under the owner's control.
- “Create my Collaborator” / “Créer mon Collaborateur” reuses `EncounterLink` to open the existing `/signup` or `/fr/signup` journey. “See an example” / “Voir un exemple” first targets the on-page Patrick section; its explicit public-profile action opens `/@patrick-chassany`. Patrick's example is separate from the For you top-navigation destination.
- `PublicDoorPreview` retains its labelled optional first-name input, local greeting and normalized sample address. The initial placeholder is `your_name`; entering Camille produces a Camille greeting and `unitalk.com/@camille`. The address is displayed text, not a link, published profile or reservation. The optional `mission` supplies commercial welcome copy here; omitted missions retain “What brings you here?” / “Qu’est-ce qui vous amène ?” in the homepage and signup usages. The adjacent qualification identifies this as a preview and commercial integrations as pending.

## System consistency and responsive layout

The implementation retains the user-pinned WhatsApp-derived cream/Archivo/fuchsia system. `DESIGN.md` remains the normative token authority: the page reuses its headline, dashboard, title and body tiers, lightweight headings, fuchsia pill actions, deep-fuchsia accent text, pink wash, rounded panels and hairlines. The shared shell, focus treatment and dark personalized preview preserve continuity with existing marketing surfaces. Flat tonal contrast supplies depth; no new global tokens or raster assets were introduced. `DESIGN.md` and `.impeccable/design.json` are preserved.

- Desktop pairs introduction and preview in a 1.12:1 grid with a 64px gap. The four offers use a two-column definition list; capabilities and authority use two-column reading layouts. The preview quote uses the body tier for the longer mission. The Patrick example sits on a pink-wash panel with 48px padding and the existing panel radius.
- At widths up to 959px, main column gaps tighten to 32px and the example stacks with Patrick's identity first and 32px padding. At widths up to 699px, hero, offer list, capability rows and authority become single-column; actions wrap, example padding becomes 24px, and its public-profile button fills the available width.
- Patrick's existing sourced portrait (`/images/patrick-chassany.jpg`) identifies the example, at 120px desktop and 72px mobile, with his name and handle. Existing provenance is retained; the personalized preview introduces no fictional portrait.
- The mobile sequence keeps the offer and acquisition actions ahead of the personalized preview. Local spacing and responsive rules live in `marketing-for-you.css`; they do not redefine the shared system.

## Final scoped verification

Review disposition: **SHIP — commercial presentation/local-interactive preview scope**, with no material fixes. This records the supplied final implementation/reviewer handoff, checked against current source; this documentation pass is not a new browser or build run.

- Browser checks passed on all six localized For you, Team and Community pages at **320/390/768/1024/1280/1440px**. For you coverage includes the complete commercial scope, four offer categories, local personalization and preservation of the default homepage preview.
- Final application lint: **0 errors, two preexisting `signup-form.tsx` warnings**. Next route type generation, TypeScript and production build passed; the build generated **42 pages**.
- Detector: inherited workspace **8/10px radius advisories only** in the combined scope; no material fixes required.
- The reviewer inspected current source and all seven positioning captures listed in `WORKSPACES.md`. For you captures: `C:/Users/pc/AppData/Local/Temp/opencode/positioning-for-you-en-1440.png` and `C:/Users/pc/AppData/Local/Temp/opencode/positioning-for-you-fr-390.png`.

**Historical evidence:** the earlier three-benefit review covered homepage/commercial/profile separation, localized navigation, signup/example links, personalization and retained profile starters, with a 1200px checkpoint and detector `[]`. Its `for-you-en-1440.png` / `for-you-fr-390.png` captures and verdict apply to that earlier version, not the expanded commercial content.

## Intentional limitations

This disposition covers commercial presentation and local previews. Personalization neither publishes a profile nor reserves the sample address. Signup remains the existing preview journey without live account creation or payment. No outreach, sales/payment, affiliate or CRM backend was introduced. Live AI-generated responses and profile publishing remain to be connected; existing public-profile responses and interactive starters are predefined examples. Meeting and message flows retain their service dependencies and unconfigured integrations, including LinkedIn sign-in and recipient delivery configuration. Link and preview verification does not establish live authentication, booking or delivery.

**Publication pending:** the user requested GitHub `unitalkai/unitalk.com` and the existing Vercel project `unitalkai/unitalk-com`. No completed publication, commit SHA or deployment URL is established by this handoff.

`PRODUCT.md`, `WORKSPACES.md` and `AGENTS.md` already record the user's route/product correction; this brief records its surface implementation and final scoped review.
