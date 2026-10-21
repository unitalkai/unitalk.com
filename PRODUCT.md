# Unitalk.com — Communities Product Definition

<!-- impeccable:product-schema 1 -->

**Status:** approved product direction; production service not implemented in this repository.

**Updated:** 2026-10-21.

**Companion documents:** [community SPEC.md](../buzz/SPEC.md), [community DESIGN.md](../buzz/DESIGN.md), [community AGENTS.md](../buzz/AGENTS.md), [DEPLOYMENT.md](../buzz/DEPLOYMENT.md).

## Product assignment and implementation provenance

The user assigned the **Buzz-based communities product to unitalk.com**. This file is its canonical product brief, transferred from `buzz/PRODUCT.md`. The **personal AI Collaborator product belongs to unitalk.ai**, with its canonical brief in [unitalk-homepage/PRODUCT.md](../unitalk-homepage/PRODUCT.md).

References below to the current repository, local implementation, README, source paths, tests, conditional Clerk integration and community design describe the [sibling `buzz/` checkout](../buzz/), where that prototype and its companion documents still live. This documentation reassignment does not move application code or establish a deployment. The current `unitalk.com/` application still contains the personal-Collaborator prototype described by the transferred Unitalk.ai brief. Community implementation status must be checked in `buzz/`; shared Clerk, Convex and Hermes integrations live in `unitalk-homepage/`.

This product assignment supersedes older personal-product scope statements in this checkout's documentation. Community implementation and design contracts come from the companion documents linked above; personal prototype history is not a community requirement.

### User-supplied target architecture — 2026-10-21

The user supplied the **Unitalk.com — Target Architecture** diagram as context for this assignment. It maps shared Unitalk.ai Clerk accounts to the Unitalk.com portal, a session/access gateway and managed Nostr signer, then the Buzz relay backed by PostgreSQL, Redis and S3. Existing Unitalk Convex owns membership and orchestration; service metadata is to be added. Unitalk.ai budgets fund per-community allocations through Dokploy, with isolated `buzz-acp` + CLI, Hermes and channel-aware community memory. Models and authorized tools are accessed through the configured provider/tool layer.

Preserve the diagram's distinction between existing components, extensions, connections and components to build/deploy. Its desktop label leaves Unitalk authentication to implement; the approved branded-desktop requirement below still applies. The maintained architecture artifact is linked from [the community checkout's README](../buzz/README.md).

## Platform

web

The target service also includes **Unitalk Desktop**, a Unitalk-branded client based on the open-source Buzz desktop application, for macOS, Windows, and Linux. Mobile browser access is part of the web experience. Native iOS and Android applications are not a V1 commitment.

## Product Purpose

Unitalk.com makes it easy to create or join a hosted community where people and AI Collaborators communicate and work in the same shared context.

A person signs in with their Unitalk account, names a community, and arrives in a workspace with a hosted Collaborator managed by Unitalk.ai. Other people can join that community and work with the same Collaborator through the browser or Unitalk Desktop.

The product must make the underlying relay, keys, agent runtime, and model configuration operationally invisible to an ordinary new member. The service still explains that Unitalk manages their hosted Nostr identity; it must not claim that these users exclusively control the signing keys.

## Users

- **Community owners:** people creating a space around a business, interest, learning group, or project.
- **Members:** people joining an existing community to communicate, contribute, learn, or build.
- **Teams and builders:** groups turning shared discussions into plans and digital products.
- **Creators, trainers, and experts:** people sharing knowledge and, in later commercial phases, distributing profiles, skills, templates, training, or services.

Unitalk is not limited to development teams. A community may contain people from multiple companies and multiple Clerk organizations.

## Positioning

### Public navigation — approved 2026-10-21

The user replaced the primary public navigation with **For you / Your team / Your community** (these labels stay English). In a subsequent correction, the user required a **distinct homepage** at `/` and `/fr`, and **For you as a commercial presentation of the public AI Collaborator profile** at `/for-you` and `/fr/for-you`. It must not link directly to Patrick's profile. Patrick's `/@patrick-chassany` remains an explicitly labelled example accessible from that commercial page. Your team opens a teamspace; Your community opens a separate community workspace. The user confirmed direct interactive spaces for team/community rather than marketing-only destination pages. Team and community interactions follow the channels, threads, shared canvas and human/agent membership model of Buzz.xyz, presented entirely under Unitalk branding without mentioning the upstream name in the interface.

In this checkout the new workspace destinations are explicitly local interactive previews. Authentication, relay-backed messages, invitations and live Collaborator execution remain subject to the shared-service contracts; local messages and example responses do not establish a deployed service. This navigation decision supersedes the older primary-navigation list below. Supporting pricing, store, privacy and guide routes remain reachable from the footer.

### Commercial and audience clarification — 2026-10-21

- **For you** must communicate the intended end-to-end commercial role: outbound prospecting by email and phone, appointment booking, answers before/during/after sales, selling AI Collaborators/code/content/missions, collecting payment through connected services, recruiting affiliates, CRM follow-up and communication with every contact. The public profile is an entry point, not the limit of the Collaborator's work. These are approved positioning/capability targets; no new outbound, payment, affiliate or CRM integration is established by this copy update.
- **Your team** adopts the content pillars verified on the rendered `https://buzz.xyz/` homepage: people and agents sharing a workspace, team communication, specialized-agent collaboration, and Git projects spanning plans, code, reviews and PRs. Unitalk branding is retained; no upstream product name is displayed. Git/agent/development-tool connections are still planned in this checkout.
- **Your community** becomes a discussion group/forum illustrated by a fictional content creator, Léa, who publishes photography tutorials and a newsletter. Its benefits are moderation assistance, relevant topic monitoring/digests and answers grounded in creator resources. The preview includes topic lists and reply threads, an example review queue with reversible local hiding, a prewritten topic digest and resource-based example answers. Live monitoring and AI moderation are not connected.

**People and AI. Building together.**

The three core capabilities remain:

1. **Communicate with your team.** Keep people, context, decisions, and next steps together.
2. **Bring in your AI agents.** Work with a hosted Collaborator that participates in the same conversations.
3. **Build websites, apps, and dashboards.** Develop ideas into digital outcomes using the tools actually enabled for the Collaborator.

The third capability is a product direction. Specific build, preview, deployment, and pull-request capabilities must be demonstrated before they are presented as available. A generic ACP connection alone does not establish a working app-building or hosting product.

## Unitalk.com and Unitalk.ai

| Surface | Product responsibility |
| --- | --- |
| Unitalk.com | Public website, Discover, community creation and admission, community access, desktop distribution |
| Unitalk web workspace | Community conversations and collaboration, adapted from Buzz's web client |
| Unitalk Desktop | Branded downloadable Buzz-based client for the same hosted communities |
| Unitalk.ai | Existing account environment and management of Collaborator resources, configuration, and budgets |

One Clerk application provides the shared account identity. Convex manages Unitalk service metadata and orchestration. Buzz provides the community conversation substrate. Hermes supplies the hosted Collaborator runtime through the ACP bridge.

## Confirmed Decisions

| ID | Decision |
| --- | --- |
| P-01 | Reuse the existing Unitalk.ai Clerk accounts and Convex backend integration. |
| P-02 | Community membership is independent of membership in a Clerk organization. |
| P-03 | New communities are unlisted and invitation-only by default. |
| P-04 | Owners may opt into Discover listing and select open or approval-based admission. Listing does not publish private conversations. |
| P-05 | Unitalk manages Nostr keys for hosted accounts and the signing service associated with them. |
| P-06 | Each community receives its own hosted Hermes Collaborator identity and isolated context. |
| P-07 | Use the Buzz ACP relay bridge for the community Collaborator. |
| P-08 | Ship a Unitalk-branded desktop client, with maintained Buzz upstream compatibility. An official Buzz download alone does not satisfy this requirement. |
| P-09 | V1 is communities-first. Marketplace checkout, seller payments, and payouts are later phases. |
| P-10 | Preserve the Apple-inspired Unitalk visual direction and English product copy. |

## Operating Context

### Create a community

1. Select **Get started free** on Unitalk.com.
2. Complete the shared Clerk sign-in or sign-up flow if needed.
3. Choose **Create a community** and enter a name.
4. Confirm the suggested address; advanced settings are optional.
5. See real preparation status for the workspace and its Collaborator.
6. Enter the community when access is ready and send the first message.

Defaults favor privacy and minimum setup. The user is not asked to install Hermes, configure a relay, handle a Nostr secret, or supply a model-provider key.

### Join an existing community

The visitor follows an invitation or a published Discover listing. After authentication, the system evaluates the community's admission policy. Open admission may complete immediately; approval-based admission exposes a pending state; private communities require a valid invitation.

Joining does not allocate another Collaborator, change the member's organization, grant access to the payer's business data, or make the member responsible for the community's AI charges.

### Work with the Collaborator

Members communicate normally and explicitly mention the Collaborator when they want help. It responds in the relevant conversation using the context it is authorized to access. Availability and work-in-progress states reflect the runtime, not a decorative presence indicator.

The Collaborator continues to run on Unitalk infrastructure when members close their desktop clients. Its memory must not inherit the owner's personal Unitalk.ai conversations.

### Move between browser and desktop

The user downloads Unitalk Desktop, authenticates through the system browser, and opens an authorized community. Browser and desktop expose the same community membership and relay-backed history. Installing the client creates neither a second community nor a second agent.

### Manage a community

Owners and delegated administrators invite members, review requests, manage supported roles, and see the Collaborator's state. Owners control discoverability and admission settings. Ownership and billing changes have dedicated rules in SPEC.md.

## V1 Scope

### Required for the first production release

- Shared Clerk sign-in, sign-up, sign-out, and recovery entry points.
- Create a private community; reserve an address; see recoverable provisioning progress.
- My communities, invitations, admission requests, and membership removal.
- Discover listings containing only owner-published public metadata.
- Relay-backed conversations and supported channels in the web client.
- One hosted, community-scoped Hermes Collaborator, with explicit mention-based interaction.
- Managed Nostr identity and signing for both browser and desktop paths.
- Unitalk-branded desktop packages and a tested authentication/update path.
- Community roles, isolated data/context, truthful availability, and bounded AI usage.

### Later phases

- Store purchases, entitlements, seller verification, refunds, revenue sharing, and payouts.
- Guaranteed website/app hosting, custom-domain deployment, and broader software-delivery automation.
- Additional installed agents, personal agents joining communities, external agent-provider catalogs.
- Native mobile apps, broad federation, and user-managed/imported Nostr identities.
- Organization-specific deployment or support guarantees not yet defined.

The Store remains in the agreed navigation. Until commerce is implemented, its presentation must clearly identify preview or future functionality; it must not simulate a completed purchase as a real transaction.

## Capabilities and Constraints

### Current repository: implemented application shell and prototype

- Next.js App Router with a server-rendered homepage and React shell; existing JavaScript/CSS previews retain hash routing.
- Conditional Clerk provider, sign-in/sign-up entries, protected account page and auth-status endpoint. Production settings target the existing Unitalk.ai application through Clerk's satellite flow. Live authentication has not yet been verified.
- Marketing homepage and six use cases: communication, agents, building, communities, teaching, and selling expertise.
- Searchable illustrative community and Store listings, including category deep links.
- Interactive website/app/dashboard examples; output-first mobile presentation with expandable conversation.
- Local sample or personalized space preview with Conversation and Shared brief views.
- Local sales/seller briefs and demonstration membership selections.
- Browser tests for prototype behavior. These are not evidence of a production collaboration service.

When Clerk is unconfigured, preview forms remain local and account routes explicitly report setup unavailable. With a complete configuration, account CTAs route to Clerk and `/account` verifies the session server-side. No real community provisioning, Convex community connection, Buzz relay integration, managed signer, or desktop distribution is implemented here. Demo forms do not create memberships or call live agents.

### Confirmed hosting direction

- Next.js frontend on Vercel, serving `unitalk.com` with the same address retained in the browser.
- Buzz on the designated Azure VM in France Central, with `buzz.unitalk.com` as the requested relay hostname.
- Cloudflare manages DNS. Origin records and hosting-provider targets must be verified before replacement.
- Community Hermes runtimes remain managed through Unitalk.ai/Dokploy. Infrastructure inspection does not establish a running Buzz deployment.

### Existing external foundation

The inspected Unitalk.ai branch provides Clerk–Convex integration, Hermes resource allocation, Dokploy management, organization budgets, and personal-agent memory synchronization. These are source observations, not a verification of deployed configuration.

The community service must adapt these mechanisms to a community-scoped resource. It must not use personal-agent allocation or memory import unchanged.

### Commercial constraints

Pricing, free-tier allowances, eligibility, per-community limits, service-level targets, and production legal policies are unresolved. **Get started free** is the approved acquisition label, not evidence of unlimited usage or a settled allowance. Production funding and limits must be agreed before opening unrestricted provisioning.

## Success Measures

Measure the following once real service telemetry exists; numerical targets remain to be set after the pilot:

- Completion rate from authenticated creation to an accessible community.
- Time to community access and time to the Collaborator's first useful reply, tracked separately.
- Invitation acceptance and first contribution by a second member.
- Provisioning recovery rate and duplicate-resource incidence.
- Cross-client success: an existing community opens correctly in Unitalk Desktop.
- Collaborator response reliability, usage cost per active community, and budget exhaustion experience.

The first proof of value is **two people in the same community receiving a useful response from their hosted Collaborator**, with no manual relay or key setup.

## Brand Commitments

- Preserve the Unitalk name, English-language copy, and original Apple-inspired visual presentation.
- Preserve **Discover → Use cases / Communities**, **Store**, **For Business**, **Log in**, and **Get started free**.
- Unitalk.ai is not an additional top-level navigation entry; it remains the management/account foundation.
- Make **Download Unitalk Desktop** discoverable in the product journey without silently replacing the approved navigation.
- Distinguish planned capability, interactive example, verified upstream capability, and implemented Unitalk behavior.
- Preserve upstream license notices. Do not imply endorsement by Block, Apple, or Nous Research.

## Evidence on Hand

- Local implementation: `index.html`, `src/`, `tests/`, `package.json`, and `playwright.config.js`.
- Unitalk.ai source inspection: [unitalkai/unitalk-personal at bdebe80133406ba9a3ee684187e7b67f4c4c1b42](https://github.com/unitalkai/unitalk-personal/tree/bdebe80133406ba9a3ee684187e7b67f4c4c1b42), originally on `feat/homepage`.
- Upstream [Buzz](https://github.com/block/buzz), [Hermes ACP bridge](https://hermes-agent.nousresearch.com/docs/user-guide/features/acp#buzz-channels-relay-bridge), and [Clerk multidomain documentation](https://clerk.com/docs/guides/dashboard/dns-domains/satellite-domains).
- The English architecture diagram linked from README.md is a target design, not an inventory of deployed services.

No verified customer testimonials, production community counts, marketplace sales, or measured service benchmarks have been established.

## Open Decisions

SPEC.md tracks implementation dependencies, including upstream versions, desktop signing/distribution infrastructure, NIP-FI/signing interoperability, hosting capacity, personal billing ownership, and lifecycle/retention policies. They remain explicit blockers where relevant; agents must not silently turn them into commitments.

## Product Principles

1. Make the first shared conversation easy to reach.
2. Treat people and Collaborators as distinct participants with attributable actions.
3. Keep community access independent from company membership and funding.
4. Share context deliberately; never infer permission from proximity or a shared payer.
5. Preserve a useful human workspace when the AI is unavailable.
6. Make browser and desktop two entrances to the same hosted community.
7. Keep product claims aligned with demonstrated behavior.
