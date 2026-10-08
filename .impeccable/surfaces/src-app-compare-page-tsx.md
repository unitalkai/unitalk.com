---
version: 1
slug: "src-app-compare-page-tsx"
primary_target: "src/app/compare/page.tsx"
related_targets: ["src/app/fr/compare/page.tsx", "src/components/compare-page.tsx", "src/components/compare.css", "src/lib/collaborator-comparison.ts"]
---

# Compare

Mode: Persuade. Help prospective users choose by the work they want to delegate, rather than asking them what they are building. Preserve the pinned WhatsApp–fuchsia family: cream canvas, Archivo, one fuchsia headline cartouche, pill controls and restrained hairlines.

## Approved direction

- Hero: **“An AI Collaborator. What’s the difference?”** / **“Un Collaborateur IA. Qu’est-ce que ça change ?”**. The user-approved subtitle compares familiar tools with a Collaborator that remembers relationships and prepares what comes next. French punctuation uses a nonbreaking space to keep the question mark with the final word.
- Four native selector buttons: Work / Context / Contacts / Control. Each exposes its selected state with `aria-pressed`, controls the same results area and updates a politely announced question. These are buttons, not an incomplete ARIA tabs widget.
- Seven named offerings share the same four criteria: ChatGPT Dots, Claude Cowork, Gemini Spark, Meta Muse, Delos AI Workers, Dust and ElevenLabs / ElevenAgents. Present their published capabilities neutrally. Do not claim competitors lack memory, autonomy, connected work, identity or permissions.
- Official source links sit next to product names. Copy is a summary of official pages consulted October 8, 2026, not a hands-on product benchmark. Availability and behavior vary by plan, country, connections and configuration. Do not add invented prices, scores, checkmark winners or universal absence claims.
- A native disclosure covers Intercom / Fin, Zendesk AI agents and Calendly, acknowledging customer workflows, connected actions, scheduling and newer AI features.
- Unitalk uses the same four criteria to describe its focus: ongoing professional relationships, a public front door and private follow-up space, with authority controls. This is positioning, not a verified exclusive capability. The current-state paragraph distinguishes interactive demonstrations from planned connected execution and durable memory.
- Close with Patrick’s canonical public Collaborator and matching-language signup, preserving the existing offer provider and shared shell.

## Layout and behavior

Desktop uses a centered hero, two-column section headings and compact product-name / description rows. Mobile aligns the hero left, stacks the rows and presents criteria in a 2 × 2 grid. Source actions and selector targets are at least 44px high; no horizontal comparison table forces mobile scrolling. Knowledge remains distinct from memory. No generated asset or new dependency is introduced.

## Evidence

Official references fetched in this session:
- https://chatgpt.com/features/dots/
- https://claude.com/product/cowork (the page also notes Cowork branding is being folded into Claude)
- https://gemini.google/overview/agent/spark/?hl=en
- https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/
- https://www.delos.so/
- https://dust.tt/
- https://elevenlabs.io/agents
- https://fin.ai/
- https://www.zendesk.com/service/ai/ai-agents/
- https://calendly.com/features

Meta’s September Muse release is the personal agent reference; the April Muse Spark model release is not substituted for it. Product provider claims about performance, certifications and customer counts are not copied into this comparison.

## Verification

English/French checks passed at 1440 × 1000, 1280 × 600, 1024 × 768, 768 × 1024, 390 × 844 and 320 × 740: approved hero, seven products, four changing criteria with one selected button, four Unitalk criteria, source links, specialist disclosure keyboard toggle, updated metadata, signup/Patrick hrefs and no horizontal overflow/runtime errors. A final confirmation checked the corrected French punctuation at 1440/390/320px plus 720px reflow, keyboard selection/focus, actual Patrick/signup navigation and equivalent-language selection. This is not a formal browser-zoom, screen-reader or cross-browser audit.

Desktop English, mobile French and Unitalk-section screenshots were visually reviewed. Captures are temporary under `C:\Users\pc\AppData\Local\Temp\opencode\compare-final-{en,fr}-{1440,390}.png` and `compare-unitalk-{en,fr}-{1440,390}.png`. Targeted lint, generated route types, TypeScript and production build passed. No independent numerical verdict or measured conversion claim is attached.
