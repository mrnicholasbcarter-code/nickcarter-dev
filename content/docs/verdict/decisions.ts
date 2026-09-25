import type { DocArticle } from "../types";
import { blob } from "./source";

const adr = (file: string) => blob(`docs/adr/${file}.md`);

export const decisions: DocArticle = {
  slug: "decisions",
  title: "Engineering decisions",
  navTitle: "Engineering decisions",
  category: "Decisions",
  description: "A curated set of Verdict's architecture decision records: the choices that shape how it routes, proves, and integrates, and the trade-offs each one accepts.",
  lede: "Verdict records significant choices as append-only decision records: context, decision, and consequences. These nine explain most of how the system behaves. The full index is in the repository.",
  sections: [
    {
      id: "decide-before-ranking",
      title: "Decide before ranking",
      blocks: [
        { type: "decision", decision: { record: "ADR-016", title: "Deterministic policy and transition graphs", href: adr("ADR-016-deterministic-policy-and-transition-graphs"), recordStatus: "Accepted", status: "shipped", decision: "A versioned hard-policy document compiles before any ranking or execution. Each candidate resolves to allow, deny, or unknown, and only allow enters ranking. Retries and fallbacks form an inspectable graph; after the first response bytes, switching to a different route is forbidden.", tradeoff: "Mid-stream failover is given up so that one response never splices output from two models. Stale evidence may be used only for unprotected work, and only when explicitly enabled." } },
        { type: "decision", decision: { record: "ADR-010", title: "Fail-closed capability passports", href: adr("ADR-010-fail-closed-capability-passports"), recordStatus: "Accepted", status: "shipped", decision: "Qualification is a versioned passport for one exact route: gateway, provider, endpoint, protocol, and upstream model. A hard requirement is satisfied only by a fresh observed `supported` value, and a fresh negative observation beats a conflicting claim.", tradeoff: "Catalog metadata stays useful as provenance but never grants permission to execute, and an alias cannot merge two distinct routes. The passport is deliberately not a probe scheduler or a signed attestation." } },
        { type: "decision", decision: { record: "ADR-027", title: "Observed free status and context omissions", href: adr("ADR-027-observed-free-status-and-context-omissions"), recordStatus: "Accepted", status: "shipped", decision: "Free status is `free`, `paid`, or `UNKNOWN`, never inferred from a missing price. A context source that was requested but could not be read is recorded with a reason instead of being silently skipped.", tradeoff: "Preferring free models is a ranking, not an exclusion, so a gateway that publishes no pricing is not locked out. Cost figures remain estimates." } },
        { type: "decision", decision: { record: "ADR-032", title: "Core owns model metadata", href: adr("ADR-032-core-model-metadata-store"), recordStatus: "Accepted", status: "shipped", decision: "Capabilities come from a Core-owned store fetched from models.dev and LiteLLM's published data, with a source and fetch time on every field. The gateway is limited to inventory, execution, and health.", tradeoff: "A model is dropped until it is explicitly mapped. Expanding coverage is a data change, not a heuristic, and missing leaderboard scores stay empty rather than estimated." } },
      ],
    },
    {
      id: "evidence",
      title: "Evidence and learning",
      blocks: [
        { type: "decision", decision: { record: "ADR-015", title: "Evidence authority and portable receipts", href: adr("ADR-015-evidence-authority-and-portable-receipts"), recordStatus: "Accepted", status: "shipped", decision: "Evidence is labeled claimed, observed, verified, or inferred. Only a fresh direct observation admits a hard capability. Receipts are append-only metadata envelopes; raw prompts, completions, and credentials are rejected at the boundary.", tradeoff: "Authority is provenance, not permission. Claims and scores can explain a decision but cannot turn unknown into supported, so some usable models wait until they are observed." } },
        { type: "decision", decision: { record: "ADR-018", title: "Shadow and counterfactual evaluation", href: adr("ADR-018-shadow-and-counterfactual-evaluation"), recordStatus: "Accepted", status: "shipped", decision: "Advisory learning runs in shadow. Promotion requires a durably recorded, integrity-checked report bound to an exact route and a fresh passport, and counterfactual results are replay-only.", tradeoff: "Improvement is slower: a better-scoring route is not promoted until verified evidence supports it, and operational failures are never counted as quality evidence." } },
      ],
    },
    {
      id: "boundaries",
      title: "Boundaries with other systems",
      blocks: [
        { type: "decision", decision: { record: "ADR-030", title: "Proof-carrying decision plane", href: adr("ADR-030-proof-carrying-decision-plane"), recordStatus: "Accepted; implementation in progress", status: "experimental", decision: "Verdict owns the chain from bounded context to eligibility, decision, receipt, and proof. Gateways and LiteLLM are optional adapters, and the UI follows the receipt contract.", tradeoff: "Rejected alternatives: a separate decision-plane repository, a new unified memory database, letting a gateway own the decision, and building the UI before the proof slice. Each would have split the source of truth." } },
      ],
    },
    {
      id: "workflow",
      title: "How the work gets done",
      blocks: [
        { type: "decision", decision: { record: "ADR-031", title: "Project-owned Prime workflow", href: adr("ADR-031-prime-workflow-skills"), recordStatus: "Accepted", status: "shipped", decision: "Five workflow skills own resumption, hydration, dispatch, proof, and finishing. Linear owns objectives, GitHub owns source and merge facts, and local checkpoints are hints reconciled with both on every restart.", tradeoff: "External Linear, GitHub, and model health remain runtime prerequisites. A legacy session that was already running is not retroactively fenced." } },
        { type: "decision", decision: { record: "ADR-023", title: "Governed swarm supervision", href: adr("ADR-023-governed-swarm-supervision"), recordStatus: "Superseded", decision: "Swarm supervision was originally part of Core. It was later removed, and dispatch moved behind a single execution-path authority.", tradeoff: "Kept as a record, not deleted. Decisions are superseded rather than rewritten, so the reasoning behind the old design stays reviewable." } },
      ],
    },
  ],
  sources: [
    { label: "Decision record index", href: blob("docs/adr/README.md") },
    { label: "ADR-020: Gateway adapter contracts", href: adr("ADR-020-gateway-adapter-contracts") },
    { label: "ADR-017: Durable receipt ledger", href: adr("ADR-017-durable-privacy-safe-receipt-ledger") },
  ],
};
