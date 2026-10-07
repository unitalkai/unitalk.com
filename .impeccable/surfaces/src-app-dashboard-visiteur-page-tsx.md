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

STORY: Demo role notice makes the simulated sign-in explicit. Two standard sections expose conversations and a local identity preview from a URL. URL validation prevents invalid previews; no crawl or AI deployment is fabricated.

FIRST VIEWPORT: Role-aware navigation, visitor greeting, conversation list with one public Collaborator, active interactive conversation. Creation opens in a separate section with visible URL field and an honest preview state.

FORM: User-pinned reference; standard web dashboard organization, code-led. Chat and lists stack into a single-column mobile flow.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
