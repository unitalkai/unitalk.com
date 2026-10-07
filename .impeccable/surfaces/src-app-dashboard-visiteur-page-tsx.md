---
version: 1
slug: "src-app-dashboard-visiteur-page-tsx"
primary_target: "src/app/dashboard/visiteur/page.tsx"
related_targets: ["src/components/visitor-dashboard.tsx"]
---

# Visitor's dashboard

Mode: Operate. A visitor returns to conversations and begins creating their own Collaborator. They cannot view Patrick's owner data through this surface.

## Direction contract

THESIS: The visitor owns their next step: continue a public conversation or create their Collaborator. Do not clone Patrick's approvals and CRM.

OWN-WORLD: WhatsApp cream shell, light sans-serif hierarchy, light chat surface with cream bubbles, fuchsia primary action, pill inputs and controls. The light chat differentiates the visitor's own workspace from the dark public Collaborator conversation.

STORY: Demo role notice makes the simulated sign-in explicit. Two sections expose conversations and a meeting-first preview from the visitor's name, chosen mission and optional intended channels. A public URL is an optional knowledge source, not the first step. No real connection or AI execution is fabricated.

The homepage's hosting, intelligence and billing choices are parsed against an allowlist and displayed above the encounter. Query parameters carry only public option identifiers, never API keys. Preferences do not activate deployment or a subscription.

FIRST VIEWPORT: The homepage CTA opens “Mon Collaborateur” via ?rencontre=1, showing name and mission inputs beside a labelled local encounter. After submitting, the next action opens Patrick's example work. The conversations section preserves the existing chat and offers a meeting invitation after it on mobile.

FORM: User-pinned reference; standard web dashboard organization, code-led. Chat and lists stack into a single-column mobile flow.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
