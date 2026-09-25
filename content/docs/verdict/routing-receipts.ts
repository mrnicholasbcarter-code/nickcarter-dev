import type { DocArticle } from "../types";
import { blob } from "./source";

export const routingReceipts: DocArticle = {
  slug: "routing-receipts",
  title: "Routing receipts and observability",
  navTitle: "Routing receipts",
  category: "Observability",
  description: "How Verdict records and explains each routing decision with privacy-safe receipts, an explain endpoint, and a dependency-free verifier.",
  lede: "Every decision that claims Verdict authority produces a receipt: which candidates existed, which were dropped and why, what was chosen, and what happened at execution. It does this without storing prompts or credentials.",
  sections: [
    {
      id: "contents",
      title: "What a receipt records",
      status: "shipped",
      blocks: [
        {
          type: "list",
          items: [
            "Correlation: request, story, work-unit, and attempt identifiers, plus a link to any parent receipt.",
            "Policy: the policy version and a digest of the decision, so the record can be recomputed and checked.",
            "Candidates: every candidate in the pipeline, whether it was eligible, and its reason codes.",
            "Context: digests of the context plan and pack, not their contents.",
            "Execution: the selected identity, the identity the gateway reports actually served the request, and observed usage.",
            "Outcome: verification results and the final state.",
          ],
        },
        { type: "paragraph", text: "Exact excerpt from the credential-free fixture source below. `selected` is the admitted model ID; exclusions come from the candidate explanation. The result stores the decision separately from `receipt`, whose fields are `receipt_id` and `mode`. This quickstart writes no state and does not create a durable ledger." },
        {
          type: "code",
          label: "Fixture decision construction (flagship_demo.py, lines 97–111)",
          code: "selected = eligible[0].model.id if eligible else None\ndecision = RoutingDecisionContract(\n    selected_route={\"runtime_id\": selected, \"provider\": \"demo\"},\n    task_spec=task_spec.to_dict(),\n    candidate_snapshot=\"fixture:issue-35\",\n    exclusions=[row for row in explanation if row[\"rejected\"]],\n    policy_floor=\"high\",\n    planner_mode=\"deterministic_fixture\",\n    explanation=(\n        \"Selected the only candidate satisfying required capabilities and \"\n        \"fresh healthy availability; excluded all hard-gate failures.\"\n    ),\n    fallback_plan=[],\n    policy_version=\"demo-policy-1\",\n)",
        },
      ],
    },
    {
      id: "persistence",
      title: "Durable, append-only storage",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "Receipts persist to a local SQLite ledger in WAL mode. Each record gets a stable ID, a payload hash, and the previous record's hash, forming a chain within its scope. Existing records are never updated: lifecycle changes are new linked records, and deletion is a tombstone." },
        { type: "paragraph", text: "Payloads are redacted by default. Raw prompts, completions, tool arguments, and credentials are rejected at the contract boundary. Reads, exports, and replay verify the chain and fail closed if it has been tampered with." },
      ],
    },
    {
      id: "explain",
      title: "Explaining a decision",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "Route responses carry an `x-verdict-evidence-id` header and correlation IDs. `GET /v1/route/explain` accepts exactly one selector and answers two kinds of question:" },
        {
          type: "list",
          items: [
            "**What happened?** Look up the immutable decision-time evidence by evidence, request, or correlation ID. This works even after caches expire or the gateway is unavailable.",
            "**What would happen now?** For a model, return its freshness record: when it was observed, when that expires, its age, source, and confidence, the eligible and excluded sets with reasons, and the cache's refresh or error state. This part requires a configured gateway.",
          ],
        },
      ],
    },
    {
      id: "verification",
      title: "Independent verification",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "A verifier that imports only the Python standard library can check a serialized receipt without loading any routing, policy, or gateway code. It fails closed for tampered, malformed, incomplete, skipped, or unavailable evidence; a missing piece never becomes an implicit pass." },
      ],
    },
    {
      id: "observed-identity",
      title: "Observed, not assumed",
      status: "experimental",
      blocks: [
        { type: "paragraph", text: "In live paired benchmark runs, the model that served a request is bound only to identity headers reported by the gateway. The model field in the response body echoes the requested alias, so it is ignored. Cost is recorded only from observed usage headers and is never estimated from a model name. The retained evidence bundle keeps hashes of inputs and outputs, not their text." },
      ],
    },
    {
      id: "explorer",
      title: "Receipt explorer",
      status: "roadmap",
      blocks: [
        { type: "paragraph", text: "A public UI is planned to read the receipt contract directly and to run in fixture mode without credentials, showing accepted and denied routes, reasons, freshness, provenance, and verification status. It is outside the current release boundary." },
      ],
    },
  ],
  sources: [
    { label: "Quickstart has no side effects", href: blob("verdict/flagship_demo.py#L1-L6") },
    { label: "Fixture decision construction (exact excerpt)", href: blob("verdict/flagship_demo.py#L97-L111") },
    { label: "Separate decision and receipt fields", href: blob("verdict/flagship_demo.py#L112-L122") },
    { label: "ADR-015: Evidence authority and portable receipts", href: blob("docs/adr/ADR-015-evidence-authority-and-portable-receipts.md") },
    { label: "ADR-017: Durable receipt ledger", href: blob("docs/adr/ADR-017-durable-privacy-safe-receipt-ledger.md") },
    { label: "Routing receipt (routing_receipt.py)", href: blob("verdict/routing_receipt.py") },
    { label: "Receipt verifier (receipt_verifier.py)", href: blob("verdict/receipt_verifier.py") },
    { label: "Paired savings bench", href: blob("docs/benchmarks/paired-savings.md") },
  ],
};
