import type { DocArticle } from "../types";
import { blob } from "./source";

export const architecture: DocArticle = {
  slug: "architecture",
  title: "Architecture: harness, Core, and gateway",
  navTitle: "Architecture",
  category: "Architecture",
  description: "How Verdict separates coding-tool harnesses, the Core decision plane, and an optional execution gateway, and how decision-only, completion, and worker paths differ.",
  lede: "Verdict keeps three responsibilities apart. The harness is where work starts, Core decides, and the gateway executes. The exact-route worker contract and the HTTP relay have different enforcement boundaries.",
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
            summary: "Coding tools send requests to Verdict Core. Core decides and records. The HTTP relay uses a configured upstream; packet workers enforce the authorized route.",
            layers: [
              { name: "Harness", role: "Where work starts", items: ["Claude Code", "Codex", "Cursor", "Cline", "OpenCode", "Prime"], status: "experimental" },
              { name: "Verdict Core", role: "Decides and records", items: ["Offer qualification", "Execution-path optimizer", "Context packs", "Model metadata store", "Receipts and evidence"], status: "shipped", core: true },
              { name: "Gateway adapter", role: "Execution transport", items: ["Inventory", "Execute", "Health"], status: "experimental" },
              { name: "Providers", role: "Where models run", items: ["Free tiers", "Paid APIs", "Local models"] },
            ],
            connectors: ["OpenAI-compatible request", "Path-specific execution", "Provider call"],
          },
        },
        { type: "paragraph", text: "**Core** owns policy, eligibility, context packing, the routing decision, and the receipt. The execution-path optimizer owns strategy selection. Legacy selectors may supply evidence or run in explicit compatibility mode; they are not a second strategy authority." },
        { type: "paragraph", text: "**The gateway is an adapter.** The current adapter targets OmniRoute and uses it for three things only: which models exist (inventory), running the chosen route (execute), and whether a route responds (health). OmniRoute is never the source of truth for model capabilities, and it does not own the routing decision." },
        { type: "paragraph", text: "**Model capabilities** such as tools, vision, structured output, and context window come from Core's own metadata store. The store is built from models.dev and LiteLLM's published model data, and it records the source and fetch time for every field. An unmapped model or an unknown required field is a named drop." },
        { type: "paragraph", text: "**Harness adapters** configure a coding tool to use Verdict as its OpenAI-compatible endpoint, rather than calling a gateway directly. They are reversible: disabling an adapter restores the files it changed." },
      ],
    },
    {
      id: "request-flow",
      title: "Three request paths",
      status: "shipped",
      blocks: [
        {
          type: "diagram",
          diagram: {
            kind: "flow",
            figure: "Fig. 02",
            title: "Decision-only request sequence",
            summary: "The authoritative route path qualifies offers, selects a strategy, and records the decision. A route-only response does not execute inference or launch a worker.",
            steps: [
              { label: "Request", detail: "POST /v1/route submits a task and requirements for a decision, not execution." },
              { label: "Qualify offers", detail: "The execution-path optimizer checks offers against the candidate pool and hard exclusions. No qualified offer means blocked.", exit: "blocked" },
              { label: "Select strategy", detail: "Compare expected complete cost within policy and any authoritative session constraint. Legacy ranking cannot restore excluded offers." },
              { label: "Record and return", detail: "Return decision JSON and route-only evidence. No provider call or worker launch follows from this endpoint." },
            ],
          },
        },
        { type: "subheading", id: "in-code", text: "Where this lives in code" },
        { type: "paragraph", text: "**Decision-only:** `/v1/route` calls `IntelligenceService.route()` and returns decision JSON with `route_only=True` evidence. An execution-path decision returns before the legacy `EligibilityGate` branch. Production defaults to requiring this authority, with explicit context, configuration, and environment overrides for compatibility." },
        { type: "paragraph", text: "**Completion relay:** `/v1/chat/completions` and `/v1/responses` replace the model and call `UpstreamProxy` directly, without a Dispatcher hop. The proxy uses the server-configured upstream URL, not the optimizer-selected gateway endpoint. Gateway and route IDs in the authoritative decision are flags, not transport enforcement." },
        { type: "paragraph", text: "Context injection is conditional: an eligible compiled pack must be attached and the `cheap_path_context_pack` flag must be present. Without that flag, injection leaves the payload unchanged. The authoritative decision projection does not itself attach a compiled pack." },
        { type: "paragraph", text: "**Packet worker:** `SwarmDispatcher` binds an authorized runtime as a planning contract; it does not invoke a provider. Packet execution separately checks model, provider, and gateway against the authorized route before calling an executor with compiled context." },
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
    { label: "Decision-only endpoint", href: blob("verdict/api.py#L871-L914") },
    { label: "Completion relay", href: blob("verdict/api.py#L1509-L1529") },
    { label: "Configured upstream transport", href: blob("verdict/api.py#L477-L505") },
    { label: "Proxy route identity", href: blob("verdict/proxy.py#L123-L136") },
    { label: "Conditional pack injection", href: blob("verdict/api.py#L1025-L1051") },
    { label: "Authoritative decision projection", href: blob("verdict/intelligence.py#L377-L421") },
    { label: "Authority and compatibility settings", href: blob("verdict/serve_path.py#L54-L71") },
    { label: "Offer qualification", href: blob("verdict/execution_path.py#L556-L589") },
    { label: "Session constraints and cost selection", href: blob("verdict/execution_path.py#L644-L681") },
    { label: "Dispatch planning contract", href: blob("verdict/dispatcher.py#L135-L160") },
    { label: "Packet-worker route enforcement", href: blob("verdict/autodev_run.py#L1293-L1320") },
  ],
};
