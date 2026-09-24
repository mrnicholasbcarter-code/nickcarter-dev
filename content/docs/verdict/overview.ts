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
        { type: "paragraph", text: "Verdict treats model choice as an admission decision first and a preference second. Hard gates decide what is allowed. Advisory signals such as price or history only order the candidates that survive." },
        {
          type: "list",
          items: [
            "Eligibility runs before ranking. A ranker can reorder survivors; it cannot restore a candidate the gates removed.",
            "Unknown is not healthy. Missing, stale, malformed, or contradictory availability evidence is a named drop, not a pass.",
            "Every dropped candidate carries a named reason, such as `policy`, `health`, `capability`, `stale`, or `quota`.",
            "A paid model is never chosen while a cheaper qualified candidate remains.",
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
        { type: "paragraph", text: "It calls no provider, reads no credentials, and writes no state. The fixture uses the same decision rules as live routing, with deterministic inputs. It demonstrates the logic, not live-provider behavior." },
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
            { status: "experimental", title: "Live gateway routing", text: "Admitting free-tier models from a live gateway, proving they respond, and executing through that gateway works against a compatible local gateway. The evidence is dated observation, not a production operating record." },
            { status: "experimental", title: "Coding-tool adapters", text: "Reversible commands point Claude Code, Codex, Cursor, Cline, OpenCode, and Prime at Verdict. Some IDE settings still need a manual step, so certification is partial." },
            { status: "roadmap", title: "Receipt explorer UI", text: "A public interface built on the receipt contract is planned. It is outside the current release boundary." },
            { status: "roadmap", title: "Tagged release with full gate evidence", text: "The current package is version 0.2.0. A v0.3.0 boundary is defined, but it is not a release approval until every required check is recorded against the candidate revision." },
          ],
        },
      ],
    },
  ],
  sources: [
    { label: "verdict-core README", href: blob("README.md") },
    { label: "Public evidence index", href: blob("docs/proof/EVIDENCE_INDEX.md") },
    { label: "v0.3.0 release boundary", href: blob("docs/proof/RELEASE_BOUNDARY_0.3.0.md") },
    { label: "Credential-free demo source", href: blob("verdict/flagship_demo.py") },
  ],
};
