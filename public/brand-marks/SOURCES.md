# AI source marks

The homepage renders decorative inline SVG marks in
`src/components/ai-provider-logo.tsx`, beside visible provider names.
They identify planned migration sources, not connected accounts or partnerships.

| Mark | Source | Treatment |
| --- | --- | --- |
| ChatGPT / OpenAI | https://github.com/lobehub/lobe-icons/blob/master/packages/static-svg/icons/openai.svg | Original path, ink fill. |
| Claude | https://github.com/lobehub/lobe-icons/blob/master/packages/static-svg/icons/claude.svg | Original path, brand terracotta. |
| OpenClaw | https://github.com/lobehub/lobe-icons/blob/master/packages/static-svg/icons/openclaw.svg | Original paths, red fill; unneeded full-viewport clip removed. |
| Gemini | https://github.com/lobehub/lobe-icons/blob/master/packages/static-svg/icons/gemini-color.svg | Original silhouette, source blue fill. |
| Grok | https://github.com/lobehub/lobe-icons/blob/master/packages/static-svg/icons/grok.svg | Original path, ink fill. |
| Hermes Agent | https://github.com/NousResearch/hermes-agent/blob/main/website/static/img/favicon-32x32.png | Official 32px Hermes Agent icon embedded unchanged in local `hermes-agent.svg`; source recorded in SVG metadata. Replaces the rejected wing mark. |

The LobeHub paths are MIT licensed; see `LOBE-ICONS-LICENSE.txt`.
Hermes Agent's icon comes from its official Nous Research repository.
Product names and marks remain those of their respective owners.

## Footer social marks and destinations

`src/components/footer-social-links.tsx` uses monochrome SVG silhouettes from
Simple Icons (LinkedIn, X, YouTube, GitHub), beside accessible network names.
The user supplied `unitalkai`; the following pages resolved to Unitalk during
the 2026-10-07 verification:

- LinkedIn: https://www.linkedin.com/company/unitalkai/
- X / Twitter: https://x.com/unitalkai
- YouTube: https://www.youtube.com/@unitalkai
- GitHub: https://github.com/unitalkai

Icon sources: https://github.com/simple-icons/simple-icons (CC0).
