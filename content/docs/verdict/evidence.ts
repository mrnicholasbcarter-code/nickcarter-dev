import type { DocArticle } from "../types";
import { blob } from "./source";

export const evidence: DocArticle = {
  slug: "evidence",
  title: "Benchmarks and evidence",
  navTitle: "Benchmarks & evidence",
  category: "Evidence",
  description: "What Verdict's public evidence supports, how to reproduce it, and which claims are deliberately not made.",
  lede: "Every claim in these docs maps to a repository artifact with a status: verified locally, observed on a dated live run, or not claimed. Where the evidence is a fixture or an estimate, the page says so.",
  sections: [
    {
      id: "governance",
      title: "How claims are governed",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "The repository keeps a claims ledger and a proof matrix. Each claim records its status, evidence paths, observation date, confidence, known objections, and the exact wording allowed in public. A validator script checks both files, and the most recent audit (2026-09-06) found no missing evidence paths." },
        { type: "paragraph", text: "The authority order is deliberate: current source and tests first, then CI and runtime evidence, then versioned documentation. A checked task, an issue checkbox, an old session summary, or a workflow definition is not evidence on its own." },
      ],
    },
    {
      id: "verified",
      title: "Verified locally",
      status: "shipped",
      blocks: [
        {
          type: "table",
          caption: "Claims verified against source and tests",
          columns: ["Claim", "How to check it"],
          rows: [
            ["Hard eligibility runs before advisory ranking; excluded candidates cannot return.", "`tests/test_eligibility_gate.py` tries to reintroduce an excluded candidate through the ranker."],
            ["Missing or stale runtime truth cannot silently authorize protected work.", "`tests/test_availability_cache.py` feeds stale, contradictory, malformed, and missing observations."],
            ["A credential-free quickstart makes a deterministic decision with explicit exclusions.", "`verdict quickstart --non-interactive --dry-run`"],
            ["Local benchmark fixtures and evidence bundles are reproducible and digest-verifiable.", "`tests/test_benchmarking.py` and `tests/test_evidence_bundle.py`"],
            ["Failover and replay work without a network.", "`verdict failover-proof --json`, then `verdict replay`"],
          ],
        },
      ],
    },
    {
      id: "cost-mock",
      title: "Cost comparison: a deterministic mock",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "`python -m verdict.routing_demo --mock` routes exactly 100 fixed requests and compares a class-aware route with a baseline that uses the costliest qualified model, based on fixed Opus, Sonnet, and Haiku price estimates. The recorded fixture reports roughly $0.16 routed against a $0.52 baseline." },
        { type: "callout", title: "An estimate, not a saving", text: "The mock calls no provider. Its figures come from fixed price estimates, not invoices, and they say nothing about live quality. Live mode exits blocked, and claims nothing, if a selected model fails its named check." },
      ],
    },
    {
      id: "live",
      title: "Dated live observations",
      status: "experimental",
      blocks: [
        {
          type: "list",
          items: [
            "**Context lift.** On 2026-08-31, one free-tier model failed an exact check unaided and passed it with a compiled context pack. That is one paired observation, described in [Context Intelligence](/docs/verdict/context-intelligence).",
            "**Catalog snapshots.** Gateway catalog records from July 2026 are bounded historical observations. By their own limitations, catalog membership is not liveness, authorization, quota, or eligibility.",
            "**Paired savings bench.** The bench can claim a saving only from executed, receipt-bound runs: both arms executed on the same input hash, observed cost, provider-bound identity, quality checked on both outputs, no cache hit. Its default mode is a labeled simulation that cannot claim anything. These docs publish no live savings figure.",
          ],
        },
      ],
    },
    {
      id: "not-claimed",
      title: "What is not claimed",
      blocks: [
        { type: "paragraph", text: "The evidence ledger explicitly does not approve the following without a reproducible artifact that defines the metric, baseline, environment, date, and raw result:" },
        {
          type: "list",
          items: [
            "Production readiness, adoption, or usage figures.",
            "Latency, throughput, or percentage-improvement figures.",
            "Model-quality or performance leadership.",
            "Live-provider quality, availability, or cost derived from fixture runs.",
            "That every release gate has passed. CI workflows are defined for tests, lint, types, security, install, build, and CodeQL, but a workflow definition is not a passing run.",
          ],
        },
      ],
    },
  ],
  sources: [
    { label: "Public evidence index", href: blob("docs/proof/EVIDENCE_INDEX.md") },
    { label: "Claims audit, 2026-09-06", href: blob("docs/proof/CLAIMS_AUDIT_2026-09-06.md") },
    { label: "Claims ledger (JSON)", href: blob("docs/proof/claims_ledger.v1.json") },
    { label: "Routing demo: cost vs quality", href: blob("docs/benchmarks/routing-demo.md") },
    { label: "Context lift receipt", href: blob("docs/benchmarks/context-lift.md") },
    { label: "Paired savings bench", href: blob("docs/benchmarks/paired-savings.md") },
  ],
};
