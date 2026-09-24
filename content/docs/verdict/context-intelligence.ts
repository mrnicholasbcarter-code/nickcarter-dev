import type { DocArticle } from "../types";
import { blob } from "./source";

export const contextIntelligence: DocArticle = {
  slug: "context-intelligence",
  title: "Context Intelligence",
  navTitle: "Context Intelligence",
  category: "Context",
  description: "How Verdict plans and hydrates context for a task, keeps provenance on every unit, and enforces a token budget with disclosed omissions.",
  lede: "A cheaper model often fails because it lacks the right facts, not the ability. Context Intelligence compiles a bounded context pack for a specific task and a specific model. It never dumps a repository or a chat transcript into the prompt.",
  sections: [
    {
      id: "planning",
      title: "Planning",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "Core owns context policy; retrieval systems only supply units. A context plan describes what a task needs, such as governing policy, relevant code, documentation, and prior decisions, and the compiler decides what reaches the model." },
        { type: "paragraph", text: "Plans are specific to each candidate. The same task can produce a different pack for a model with a smaller context window, and that plan is part of the evidence used to choose between candidates." },
      ],
    },
    {
      id: "hydration",
      title: "Hydration",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "Hydration gathers real units for the pack under an invent-never rule:" },
        {
          type: "list",
          items: [
            "Only files that exist become units.",
            "A missing configured root or an unreadable source becomes a named omission, such as `absent: no such file` or `unreadable`.",
            "External sources, such as an MCP server, are consulted only when they are actually configured. An absent configuration is skipped, not faked.",
            "Memory and code-graph systems are replaceable adapters. Verdict consumes their units; it does not become another memory database.",
          ],
        },
      ],
    },
    {
      id: "provenance",
      title: "Provenance",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "Each unit carries, where available, its source identity and reference, observed and retrieved timestamps, confidence, and lifecycle state: active, superseded, or disputed. Active claims outrank superseded ones only through an explicit, deterministic rule. Disputed claims stay visible and cannot silently satisfy a required fact." },
        { type: "paragraph", text: "Redaction boundaries keep credentials and unnecessary personal data out of the pack. The receipt records a content digest of the compiled pack, so a run can be audited afterward without storing the prompt." },
      ],
    },
    {
      id: "budget",
      title: "Budget enforcement",
      status: "shipped",
      blocks: [
        { type: "paragraph", text: "The budget governor treats the model's entire context window as a scarce resource. It accounts for, allocates, and enforces the whole window, not just the space reserved for included context." },
        {
          type: "list",
          items: [
            "Every unit dropped to fit is recorded as an omission with a category and reason.",
            "Required policy is never dropped. If it cannot fit, the run fails closed rather than sending a truncated pack.",
            "Token counts use an approximation and are described as estimates.",
          ],
        },
      ],
    },
    {
      id: "lift",
      title: "Does it help? One recorded observation",
      status: "experimental",
      blocks: [
        { type: "paragraph", text: "A paired live run asked the same free-tier model one exact check twice: once unaided, then with a compiled context pack. The answer depended on a synthetic token planted in local files, so it could not be guessed from the task wording." },
        { type: "paragraph", text: "The recorded receipt from 2026-08-31 shows the unaided attempt failed and the packed attempt passed, with no omissions. This is a single dated observation that required a live gateway. It shows the mechanism working; it is not a general quality benchmark. A blocked or skipped run makes no claim." },
      ],
    },
  ],
  sources: [
    { label: "Context lift: paired live proof", href: blob("docs/benchmarks/context-lift.md") },
    { label: "ADR-022: Context provider conformance", href: blob("docs/adr/ADR-022-context-provider-conformance.md") },
    { label: "ADR-027: Context omissions", href: blob("docs/adr/ADR-027-observed-free-status-and-context-omissions.md") },
    { label: "Context pack compiler (context_pack.py)", href: blob("verdict/context_pack.py") },
    { label: "Budget governor (context_budget.py)", href: blob("verdict/context_budget.py") },
    { label: "Hydration (context_hydrate.py)", href: blob("verdict/context_hydrate.py") },
  ],
};
