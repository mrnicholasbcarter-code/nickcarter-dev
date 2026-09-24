import type { DocArticle } from "../types";
import { blob } from "./source";

export const architecture: DocArticle = {
  slug: "architecture",
  title: "Architecture: harness, Core, and gateway",
  navTitle: "Architecture",
  category: "Architecture",
  description: "How Verdict separates coding-tool harnesses, the Core decision plane, and an optional execution gateway, and how one request moves through them.",
  lede: "Verdict keeps three responsibilities apart. The harness is where work starts, Core decides, and the gateway executes. The boundaries exist so that no downstream system can quietly redefine a decision Core has made.",
  sections: [
    {
      id: "boundaries",
      title: "Three boundaries",
      blocks: [
        {
          type: "diagram",
          diagram: {
            kind: "layers",
            figure: "Fig. 01",
            title: "System boundaries",
            summary: "Coding tools send requests to Verdict Core. Core decides and records; an optional gateway adapter executes the exact route Core selected.",
            layers: [
              { name: "Harness", role: "Where work starts", items: ["Claude Code", "Codex", "Cursor", "Cline", "OpenCode", "Prime"], status: "experimental" },
              { name: "Verdict Core", role: "Decides and records", items: ["Hard gates and eligibility", "Advisory ranking", "Context packs", "Model metadata store", "Receipts and evidence"], status: "shipped", core: true },
              { name: "Gateway adapter", role: "Executes the chosen route", items: ["Inventory", "Execute", "Health"], status: "experimental" },
              { name: "Providers", role: "Where models run", items: ["Free tiers", "Paid APIs", "Local models"] },
            ],
            connectors: ["OpenAI-compatible request", "Exact route and context pack", "Provider call"],
          },
        },
        { type: "paragraph", text: "**Core** owns policy, eligibility, context packing, the routing decision, and the receipt. Keeping those rules in one place means the same decision logic applies whether a request comes from the CLI, the HTTP API, or a coding tool." },
        { type: "paragraph", text: "**The gateway is an adapter.** The current adapter targets OmniRoute and uses it for three things only: which models exist (inventory), running the chosen route (execute), and whether a route responds (health). OmniRoute is never the source of truth for model capabilities, and it does not own the routing decision." },
        { type: "paragraph", text: "**Model capabilities** such as tools, vision, structured output, and context window come from Core's own metadata store. The store is built from models.dev and LiteLLM's published model data, and it records the source and fetch time for every field. An unmapped model or an unknown required field is a named drop." },
        { type: "paragraph", text: "**Harness adapters** configure a coding tool to use Verdict as its OpenAI-compatible endpoint, rather than calling a gateway directly. They are reversible: disabling an adapter restores the files it changed." },
      ],
    },
    {
      id: "request-flow",
      title: "One request, end to end",
      status: "shipped",
      blocks: [
        {
          type: "diagram",
          diagram: {
            kind: "flow",
            figure: "Fig. 02",
            title: "Routing and dispatch sequence",
            summary: "Each stage narrows the candidate set. Any stage can end the request with a named reason; no later stage can widen the set again.",
            steps: [
              { label: "Request", detail: "A harness, the CLI, or the HTTP API submits a task with its requirements: tools, structured output, context size, privacy, and criticality." },
              { label: "Concrete candidates", detail: "Only concrete model identities become candidates. Opaque `auto/*` aliases resolve to an unknown model at call time, so they are dropped.", exit: "opaque_mix" },
              { label: "Hard gates", detail: "Policy, freshness, capability, security, privacy, and quota are checked. Each failure is recorded with a reason code.", exit: "named drop" },
              { label: "Authoritative eligible set", detail: "The survivors are the only candidates later stages may use. If the set is empty, the request stops here.", exit: "blocked" },
              { label: "Advisory ranking", detail: "Price, history, and similarity order the eligible set, cheaper first. These signals cannot add candidates back." },
              { label: "Dispatch and execute", detail: "The selected exact route and its context pack go through the upstream proxy to the gateway. Response fields pass through unchanged." },
              { label: "Receipt", detail: "The decision, the drops, and the execution correlation are recorded as privacy-safe evidence that the explain endpoint can retrieve later." },
            ],
          },
        },
        { type: "subheading", id: "in-code", text: "Where this lives in code" },
        { type: "paragraph", text: "The CLI enters through `Gate.route()` and the HTTP API through the `/v1/route` and `/v1/chat/completions` handlers in `api.py`. Both reach `IntelligenceService.route()`, where `EligibilityGate` filters candidates before any ranking. The production serve path requires an explicit execution-path decision: older selectors may contribute evidence, but they cannot invent a strategy. `Dispatcher` binds the authorized route and explains the assignment without calling a provider, and `UpstreamProxy` forwards it." },
        { type: "paragraph", text: "A denied route returns HTTP 503 with the denial and its reasons, plus evidence and correlation headers that the explain endpoint accepts. See [Routing receipts](/docs/verdict/routing-receipts)." },
      ],
    },
    {
      id: "tradeoffs",
      title: "Why the boundaries sit here",
      blocks: [
        {
          type: "list",
          items: [
            "Gateways stay replaceable. A versioned, provider-neutral adapter contract keeps gateway-specific identifiers, credentials, and headers out of Core.",
            "A gateway catalog is optimistic by design: it lists what might run. Treating it as capability truth would admit work the control plane cannot prove.",
            "Letting a gateway or LiteLLM own the decision was considered and rejected. Fail-closed, reason-coded behavior would then depend on each provider.",
            "The planned UI reads the receipt contract instead of defining its own event model, so the interface cannot drift from the evidence.",
          ],
        },
        { type: "paragraph", text: "These choices are recorded in [Engineering decisions](/docs/verdict/decisions)." },
      ],
    },
  ],
  sources: [
    { label: "ADR-020: Gateway adapter contracts", href: blob("docs/adr/ADR-020-gateway-adapter-contracts.md") },
    { label: "ADR-030: Proof-carrying decision plane", href: blob("docs/adr/ADR-030-proof-carrying-decision-plane.md") },
    { label: "ADR-032: Core owns model metadata", href: blob("docs/adr/ADR-032-core-model-metadata-store.md") },
    { label: "Cursor harness guide", href: blob("docs/guides/cursor-harness.md") },
    { label: "HTTP API (api.py)", href: blob("verdict/api.py") },
    { label: "Eligibility gate (eligibility.py)", href: blob("verdict/eligibility.py") },
  ],
};
