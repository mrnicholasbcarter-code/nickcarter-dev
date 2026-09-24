import type { DocArticle } from "../types";
import { blob } from "./source";

export const modelSelection: DocArticle = {
  slug: "model-selection",
  title: "Dynamic model selection",
  navTitle: "Model selection",
  category: "Routing",
  description: "How Verdict decides which models may run a task: eligibility gates, health qualification, free and paid policy, explicit worker selection, and fail-closed outcomes.",
  lede: "Selection happens in two phases with different authority. Hard gates decide what is allowed. Only then do advisory signals decide what is preferred.",
  sections: [
    {
      id: "eligibility",
      title: "Eligibility comes first",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "The eligibility gate is the single source of truth for filtering. It runs before any adaptive or cost ranking, and nothing downstream, whether a ranker, a planner, or a retrieval result, can reintroduce a candidate it excluded. The explain endpoint reads the same gate, so an operator sees exactly what the router used." },
        { type: "paragraph", text: "Each candidate resolves to `allow`, `deny`, or `unknown`. Only `allow` enters ranking. Every other outcome carries one of these reasons:" },
        {
          type: "table",
          caption: "Named drop reasons",
          columns: ["Reason", "Meaning"],
          rows: [
            ["`policy`", "Rules forbid this identity for this task."],
            ["`health`", "Live availability is not admitted: unknown, error, or not ready."],
            ["`capability`", "Required tools, context size, or output shape are missing."],
            ["`unclassified`", "The catalog row cannot be interpreted safely."],
            ["`stale`", "The evidence is past its freshness window."],
            ["`opaque_mix`", "The identity is not a concrete model, such as an `auto/*` alias."],
            ["`cost`", "The candidate fails the cost or budget gate."],
            ["`quota`", "Budget or rate limit is exhausted."],
          ],
        },
      ],
    },
    {
      id: "health",
      title: "Health qualification",
      blocks: [
        { type: "subheading", id: "unknown-is-not-healthy", text: "Unknown is not healthy" },
        {
          type: "status-list",
          items: [
            { status: "shipped", title: "Explicit freshness", text: "Availability is cached with a documented freshness window. Entries are keyed by provider, model, and policy version, so one source cannot contaminate another. An expired entry or a failed refresh becomes an explicit `unknown` or `error` state." },
            { status: "shipped", title: "Protected work fails closed", text: "For protected work, an absent or stale health signal excludes the candidate. A `degraded` probe is not `ready`, and a catalog timeout is blocked rather than treated as success." },
            { status: "shipped", title: "Capability passports", text: "Qualification is a versioned passport for one exact route. A hard requirement is met only by a fresh observed `supported` value; missing, expired, or claim-only evidence resolves to `unknown`." },
          ],
        },
        { type: "subheading", id: "proving-live-routes", text: "Proving routes against a live gateway" },
        {
          type: "status-list",
          items: [
            { status: "experimental", title: "Prove at rest, confirm at request time", text: "A background process proves only free-tier models on active providers. Paid models are never probed. At request time a small, budgeted confirm probe runs, and only confirmed identities may be selected." },
            { status: "experimental", title: "Consent and budget for probes", text: "Live probes that could spend money require explicit operator consent and a spend budget." },
          ],
        },
      ],
    },
    {
      id: "free-and-paid",
      title: "Free and paid policy",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "Before cost is considered, a task is classified as **worthy** or **ordinary** using explicit rules, never an invented score. Worthy work, such as architecture, security, and final review, goes to frontier or high-capability models. Ordinary work goes free first, then to lesser paid models." },
        {
          type: "list",
          items: [
            "Candidates are ordered local, then free, then cheaper, then paid.",
            "Free status is observed, never inferred. A model is `free`, `paid`, or `UNKNOWN`, and a missing price never counts as free.",
            "A paid model is never chosen while a cheaper qualified candidate remains. The selection record refuses to construct if it would be, so the violation cannot be serialized.",
          ],
        },
      ],
    },
    {
      id: "explicit-selection",
      title: "Explicit worker and controller selection",
      status: "experimental",
      blocks: [
        { type: "paragraph", text: "For autonomous sessions, Verdict selects the exact controller before the session launches: provider, model, and reasoning setting. The supervisor executes that decision. It never ranks, substitutes, or falls back." },
        {
          type: "list",
          items: [
            "In automatic mode, the decision comes from live eligibility, a context plan for each candidate, and the execution-path optimizer. A routing receipt is persisted before anything launches.",
            "An operator override must name both provider and model. One-sided flags, `auto/*`, and `default` are rejected, and the override must still be in the live eligible set.",
            "After launch, the observed identity must exactly match the approved one. On a mismatch, Verdict stops only the process it owns and fences the attempt.",
            "Continuity is explicit: a healthy current route stays, an ineligible one switches, and no eligible route means blocked.",
          ],
        },
        { type: "paragraph", text: "These rules are covered by unit tests. End-to-end operation depends on a live gateway and the Prime agent runtime, which is why the section is labeled Experimental." },
      ],
    },
    {
      id: "fail-closed",
      title: "Fail-closed outcomes",
      status: "shipped",
      blocks: [
        { type: "callout", title: "No eligible model means blocked", text: "Verdict does not fall back to a frontier model when nothing qualifies. The HTTP API returns 503 with the denial and its reasons. On the live free-tier path, an empty set of admitted models also fails closed instead of falling back to Opus." },
        { type: "paragraph", text: "A blocked result is still a result: it comes with a receipt that names every candidate and why it was dropped, so the operator can fix the cause rather than guess at it." },
      ],
    },
  ],
  sources: [
    { label: "Unknown is not healthy", href: blob("docs/guides/unknown-not-healthy.md") },
    { label: "Controller routing guide", href: blob("docs/guides/controller-routing.md") },
    { label: "Free-tier admit smoke test", href: blob("docs/guides/free-tier-admit-smoke.md") },
    { label: "ADR-010: Fail-closed capability passports", href: blob("docs/adr/ADR-010-fail-closed-capability-passports.md") },
    { label: "ADR-012: Consented, budgeted probes", href: blob("docs/adr/ADR-012-consented-budgeted-probes.md") },
    { label: "ADR-027: Observed free status", href: blob("docs/adr/ADR-027-observed-free-status-and-context-omissions.md") },
  ],
};
