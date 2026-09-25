import type { DocArticle } from "../types";
import { blob } from "./source";

export const overview: DocArticle = {
  slug: "overview",
  title: "Verdict overview",
  navTitle: "Overview",
  category: "Start here",
  description: "What Verdict is, the model-routing problem it addresses, and what is shipped today versus experimental or planned.",
  lede: "Verdict is a fail-closed control plane between AI coding tools and the models they call. It decides which models are eligible for a task before any ranking happens, and it records why every other candidate was dropped.",
  sections: [
    {
      id: "problem",
      title: "The problem",
      blocks: [
        { type: "paragraph", text: "A coding agent that sends every task to one frontier model pays frontier prices for work a cheaper model could complete, and it leaves no record of why a given call was made. Cost dashboards report the bill afterward. They do not decide anything." },
        { type: "paragraph", text: "The usual fix is a router that scores models and picks a winner. That moves the problem rather than solving it. A confident score can still select a model that is stale, unqualified, or excluded by policy, and when a run misbehaves there is no artifact showing which candidates existed and why they were rejected." },
      ],
    },
    {
      id: "approach",
      title: "The approach",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "Verdict treats model choice as an admission decision first and a preference second. The execution-path optimizer qualifies offers, then selects a strategy by expected complete cost. Legacy selectors can supply evidence, not override that authority." },
        {
          type: "list",
          items: [
            "Eligibility runs before ranking. A ranker can reorder survivors; it cannot restore a candidate the gates removed.",
            "Unknown is not healthy. Missing, stale, malformed, or contradictory availability evidence is a named drop, not a pass.",
            "Every dropped candidate carries a named reason, such as `policy`, `health`, `capability`, `stale`, or `quota`.",
            "Spend policy and authoritative session decisions constrain cost selection. Free preference is policy-specific, not a universal cheapest-model guarantee.",
            "When nothing qualifies, the request is blocked. There is no silent fallback to a frontier model.",
          ],
        },
        { type: "paragraph", text: "The details are in [Architecture](/docs/verdict/architecture) and [Dynamic model selection](/docs/verdict/model-selection)." },
      ],
    },
    {
      id: "try-it",
      title: "See a decision without credentials",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "The repository includes a deterministic fixture that makes one routing decision and names every excluded candidate:" },
        {
          type: "code",
          label: "Credential-free quickstart (fixture output from the repository README)",
          code: "$ verdict quickstart --non-interactive --dry-run\nVerdict credential-free quickstart\n===================================\nTask: Add structured output to the invoice parser\nRequired capabilities: structured_output, tools\nSelected route: demo/frontier-tools\nExcluded candidates: 3\nReceipt: fixture:issue-35 (deterministic_fixture)\nStatus: PASS\n- demo/no-tools: missing capability: tools\n- demo/quota-empty: quota exhausted\n- demo/unverified: health unknown",
        },
        { type: "paragraph", text: "It calls no provider, reads no credentials, and writes no state. The fixture demonstrates capability and availability filtering with deterministic inputs. It is not a run of the live execution-path optimizer or proof of live-provider behavior." },
      ],
    },
    {
      id: "my-role",
      title: "What I designed and built",
      blocks: [
        { type: "paragraph", text: "Verdict is an independent project. I designed its architecture and decision records and built the Python reference implementation: eligibility and policy gates, the context-pack compiler, receipts and replay, the CLI and HTTP API, gateway and coding-tool adapters, and the proof tooling that keeps public claims tied to evidence. A TypeScript companion, [verdict-node](https://github.com/mrnicholasbcarter-code/verdict-node), shares the request contract." },
        { type: "paragraph", text: "Much of the implementation runs through the [autonomous development workflow](/docs/verdict/autonomous-workflow) described in these docs. Agents implement bounded tickets. The workflow's proof gates, not the agents, decide when work is done." },
      ],
    },
    {
      id: "status",
      title: "What runs today",
      blocks: [
        {
          type: "status-list",
          items: [
            { status: "shipped", title: "Eligibility, fail-closed routing, and receipts", text: "Hard gates, named drop reasons, durable receipts, replay, and the offline proof paths are implemented in the public repository and covered by CI." },
            { status: "shipped", title: "Credential-free fixtures", text: "The quickstart fixture and local benchmark fixtures are deterministic, and the evidence bundles are digest-verifiable." },
                        { status: "shipped", title: "ExecutionEnvelope v1 contract", text: "Shipped on main; ships in v0.3.0. Python, JSON Schema, and Zod contract definitions with parity checks, plus a fixture corpus and mutation tests." },
            { status: "shipped", title: "Release certification bundles", text: "Shipped on main; ships in v0.3.0. Automated gate scanning and evidence collection for tagged releases." },
            { status: "shipped", title: "Goal-to-receipt orchestration with independent review", text: "Shipped on main; ships in v0.3.0. Orchestrated runs project separate implementer and reviewer routes with bounded recovery (ADR-036)." },
            { status: "shipped", title: "Route identity in run receipts", text: "Shipped on main; ships in v0.3.0. Receipts record intended vs executed route for transparency." },
            { status: "shipped", title: "Privacy floor", text: "Shipped on main; ships in v0.3.0. Restricted and trusted_upstream tasks require explicit restricted_data_routes allowlist; fail closed." },
            { status: "shipped", title: "Acceptance pipeline", text: "Shipped on main; ships in v0.3.0. Honest, fail-closed gate evidence with credential scanning and explicit pass requirements; threat model and privacy policy documented." },
            { status: "experimental", title: "Live gateway routing", text: "Admitting free-tier models from a live gateway, proving they respond, and executing through that gateway works against a compatible local gateway. The evidence is dated observation, not a production operating record." },
            { status: "experimental", title: "Coding-tool adapters", text: "Reversible commands point Claude Code, Codex, Cursor, Cline, OpenCode, and Prime at Verdict. Some IDE settings still need a manual step, so certification is partial." },
            { status: "roadmap", title: "Receipt explorer UI", text: "A public interface built on the receipt contract is planned. It is outside the current release boundary." },
            { status: "roadmap", title: "Tagged release with full gate evidence", text: "v0.3.0 release candidate in progress (acceptance gates being completed)" },
                        { status: "roadmap", title: "OpenJev decision signals", text: "In progress for v0.3.0: shadow signals plus an opt-in advisory mode that may only reorder candidates that already passed every hard gate. Not live, and no effect on routing today." },
            { status: "roadmap", title: "Codiv provider", text: "Provider candidate built (identity, failure classes); no live endpoint configured." },
          ],
        },
      ],
    },
  ],
  sources: [
    { label: "verdict-core README", href: blob("README.md") },
    { label: "Public evidence index", href: blob("docs/proof/EVIDENCE_INDEX.md") },
    { label: "v0.3.0 release boundary", href: blob("docs/proof/RELEASE_BOUNDARY_0.3.0.md") },
    { label: "Credential-free demo and its filtering", href: blob("verdict/flagship_demo.py#L1-L122") },
    { label: "Strategy authority", href: blob("verdict/execution_path.py#L102-L107") },
    { label: "Policy-specific free preference", href: blob("verdict/free_tier_admit.py#L1453-L1507") },
    { label: "Session constraints and expected complete cost", href: blob("verdict/execution_path.py#L644-L681") },
    { label: "ExecutionEnvelope v1 contract", href: blob("docs/contracts/EXECUTION_ENVELOPE_V1.md") },
    { label: "Release certification", href: blob("scripts/certify_release.py") },
    { label: "Independent review orchestration", href: blob("verdict/orchestration/review.py") },
    { label: "Orchestration runtime", href: blob("verdict/orchestration/runtime.py") },
    { label: "Privacy floor policy", href: blob("verdict/policy.py") },
    { label: "Privacy floor acceptance tests", href: blob("tests/test_acceptance_g1_routing.py") },
    { label: "Credential scanning", href: blob("scripts/scan_committed_credentials.py") },
    { label: "Gates report generator", href: blob("scripts/generate_gates_report.py") },
    { label: "Threat model", href: blob("THREAT_MODEL.md") },
    { label: "Privacy policy", href: blob("PRIVACY_POLICY.md") },
  ],
};
