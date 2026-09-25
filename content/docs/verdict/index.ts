import type { DocProject } from "../types";
import { architecture } from "./architecture";
import { autonomousWorkflow } from "./autonomous-workflow";
import { contextIntelligence } from "./context-intelligence";
import { decisions } from "./decisions";
import { evidence } from "./evidence";
import { modelSelection } from "./model-selection";
import { overview } from "./overview";
import { routingReceipts } from "./routing-receipts";
import { repository, revision } from "./source";

export const verdict: DocProject = {
  slug: "verdict",
  name: "Verdict",
  tagline: "A model router that can say no.",
  description: "Architecture, routing policy, context handling, delivery workflow, and evidence for Verdict, a fail-closed control plane for AI coding tools.",
  repository,
  reviewed: `2026-09-24 · ${revision}`,
  brief: [
    { question: "What is it?", answer: "A control plane that decides which AI models may run a coding task before any ranking happens, and records why every other candidate was dropped." },
    { question: "What problem does it solve?", answer: "Routers that score models can still pick a stale, unqualified, or policy-excluded model, and they leave no record of why. Verdict separates admission from preference. When nothing qualifies, it blocks instead of silently falling back to an expensive model." },
    { question: "What did Nicholas build?", answer: "The architecture, the decision records, and the Python reference implementation: policy gates, context packing, receipts and replay, the CLI and HTTP API, gateway and coding-tool adapters, and the evidence tooling." },
    { question: "What runs today?", answer: "Eligibility gates, fail-closed routing, receipts, replay, and a credential-free demo are in the public repository and covered by CI. Live-gateway routing and coding-tool adapters are experimental." },
    { question: "What supports the claims?", answer: "A claims ledger that ties each public claim to source files and tests, a reproducible quickstart that needs no credentials, and dated receipts for live observations. Numbers without a reproducible artifact are not claimed." },
  ],
  articles: [overview, architecture, modelSelection, contextIntelligence, autonomousWorkflow, routingReceipts, evidence, decisions],
};
