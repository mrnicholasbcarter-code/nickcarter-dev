import type { DocArticle } from "../types";
import { blob, tree } from "./source";

export const autonomousWorkflow: DocArticle = {
  slug: "autonomous-workflow",
  title: "Autonomous development workflow",
  navTitle: "Autonomous workflow",
  category: "Workflow",
  description: "How a ticket moves from Linear through context hydration, a routed worker, layered verification, and a proof-gated pull request, and which parts are shipped versus planned.",
  lede: "Verdict is developed under the same discipline it enforces. An agent may implement a bounded ticket, but it may not call the work complete until the code, checks, proof, and pull-request state agree.",
  sections: [
    {
      id: "loop",
      title: "From ticket to merged change",
      blocks: [
        {
          type: "diagram",
          diagram: {
            kind: "flow",
            figure: "Fig. 03",
            title: "Autonomous delivery loop",
            summary: "Each state advances only with the evidence that state requires. Any source change after proof invalidates the proof, review, and CI gates.",
            steps: [
              { label: "Ticket", detail: "Linear owns the objective, acceptance criteria, priority, and dependencies. Work starts only when a ticket's blockers are clear.", status: "shipped" },
              { label: "Hydrate context", detail: "A versioned packet binds the ticket revision, base commit, worktree, file scope, allowed commands, budget, and required proof. A changed ticket or base commit forces rehydration.", status: "shipped", exit: "rehydrate" },
              { label: "Select and dispatch a worker", detail: "Verdict routing chooses the worker model from fresh eligibility evidence. A durable, fenced lease allows one writer per ticket.", status: "experimental" },
              { label: "Implement within scope", detail: "The worker writes only in its owned worktree and reports progress receipts. Heartbeats do not count as progress, so a stalled worker is superseded.", status: "experimental", exit: "fenced" },
              { label: "Verify in layers", detail: "Static, unit, integration, and acceptance-proof gates are each required or marked not applicable with a reason. Acceptance proof is never optional, and proof binds a clean commit.", status: "shipped" },
              { label: "Pull request and CI", detail: "A helper refuses to open a pull request with incomplete proof. CI results are classified, and failures route to bounded recovery.", status: "shipped", exit: "blocked" },
              { label: "Merge and verify main", detail: "Merges follow the repository's branch protection and use a head-matched merge. The ticket closes only after the merge commit is confirmed on main.", status: "shipped" },
            ],
          },
        },
      ],
    },
    {
      id: "status",
      title: "Shipped, experimental, and planned",
      blocks: [
        {
          type: "status-list",
          items: [
            { status: "shipped", title: "Hydration packet and validation", text: "Packets are validated before dispatch and persisted atomically. Discovery and failure paths can be tested locally without model calls." },
            { status: "shipped", title: "Durable leases and progress detection", text: "Ownership is a per-ticket lease with a generation number that acts as a fence token. A lease whose progress deadline expires is superseded at the next supervisor start, and the fenced writer can no longer open a pull request." },
            { status: "shipped", title: "Proof gates", text: "Proof maps every acceptance criterion to artifacts and binds a clean head commit. Checked boxes, old summaries, and workflow definitions are not proof." },
            { status: "shipped", title: "CI classification and bounded recovery", text: "Results are classified as green, pending, code failure, infrastructure failure, cancelled, missing, or empty. Code failures return to the same worktree, infrastructure failures retry without code changes, and exhausted attempts stop as blocked. A red or unclassifiable result is never reported as success." },
            { status: "experimental", title: "Routed worker execution", text: "Live runs depend on external model availability, the gateway, and the Prime agent runtime. Linear, GitHub, and model health remain runtime prerequisites." },
            { status: "roadmap", title: "Independent semantic review with OpenCodeReview", text: "Planned: an independent semantic review of the diff before autonomous merge. Verdict owns policy, context, and model selection; workers implement; deterministic gates validate mechanically; OpenCodeReview would review the diff independently. It is not shipped, and this page will change only when its acceptance evidence exists." },
          ],
        },
      ],
    },
    {
      id: "guardrails",
      title: "Guardrails worth knowing",
      blocks: [
        {
          type: "list",
          items: [
            "Memory and reasoning aids are advisory. They are never completion evidence.",
            "A cold restart projects the next legal action from files on disk, not from conversation history.",
            "Retries are bounded. After the configured number of restarts, the supervisor exits as blocked and records the reason.",
            "The pull-request guard is a workflow gate, not a sandbox. It stops the workflow from opening a pull request with incomplete proof; it does not prevent every possible network call.",
            "Recovery never kills a process based on a guessed PID. Only processes the supervisor owns are stopped.",
          ],
        },
      ],
    },
  ],
  sources: [
    { label: "ADR-031: Project-owned Prime workflow", href: blob("docs/adr/ADR-031-prime-workflow-skills.md") },
    { label: "Prime workflow guide", href: blob("docs/guides/prime-workflow.md") },
    { label: "Autonomous development guide", href: blob("docs/guides/autonomous-development.md") },
    { label: "Workflow skills", href: tree(".prime/agent/skills") },
  ],
};
