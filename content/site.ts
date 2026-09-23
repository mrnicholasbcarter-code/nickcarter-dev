export const site = {
  name: "Nicholas Carter",
  shortName: "NC",
  title: "Software engineer · AI infrastructure & decision systems",
  location: "Sarasota, Florida",
  availability: "Open to senior/staff engineering roles and selected client work",
  email: "mr.nicholas.b.carter@gmail.com",
  url: "https://nickcarter.dev",
  summary:
    "I build policy-gated AI infrastructure, evidence-bound software automation, and quantitative risk systems. My work favors deterministic controls, explicit failure modes, and proof that can be reproduced.",
  links: {
    github: "https://github.com/mrnicholasbcarter-code",
    linkedin: "https://www.linkedin.com/in/nicholas-carter-dev",
  },
} as const;

export type Project = {
  name: string;
  eyebrow: string;
  blurb: string;
  proof: string;
  href: string;
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Verdict",
    eyebrow: "AI control plane",
    blurb:
      "A fail-closed control plane that filters models through deterministic capability, privacy, reliability, and policy gates before advisory ranking.",
    proof:
      "The public credential-free path uses checked-in fixtures and simulated failure. It proves routing behavior and receipts—not live-provider availability, adoption, or production scale.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-core",
    tags: ["Python", "policy gates", "receipts", "failover"],
    featured: true,
  },
  {
    name: "Prediction Market SDK",
    eyebrow: "Async market infrastructure",
    blurb:
      "A typed Python foundation for Kalshi REST workflows, reusable L2 order-book state, and resilient WebSocket lifecycle management.",
    proof:
      "Kalshi signing, order workflows, order-book snapshots and deltas, and subscription management are implemented and tested. Polymarket signing and live-order safety remain limited.",
    href: "https://github.com/mrnicholasbcarter-code/prediction-market-sdk",
    tags: ["Python", "AsyncIO", "WebSockets", "msgspec"],
  },
  {
    name: "Verdict Risk",
    eyebrow: "Deterministic risk",
    blurb:
      "Pure-functional capital protection primitives that separate risk decisions from persistence and network I/O.",
    proof:
      "The repository exposes deterministic drawdown, position, cluster exposure, and Kelly-sizing gates with property-based tests.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-risk",
    tags: ["Python", "risk gates", "Hypothesis", "OpenTelemetry"],
  },
  {
    name: "verdict-node",
    eyebrow: "TypeScript gateway adapter",
    blurb:
      "Express and Next.js middleware that checks outgoing OpenAI-compatible requests at an HTTP enforcement boundary.",
    proof:
      "Published as an alpha. The Python/TypeScript envelope contract is still being reconciled and is not presented as complete end-to-end enforcement.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-node",
    tags: ["TypeScript", "Express", "Next.js", "Zod"],
  },
];

export const skillGroups = [
  {
    name: "AI infrastructure",
    skills: ["Policy-gated model routing", "Fail-closed authorization", "Agent orchestration", "MCP integration", "Evidence receipts"],
  },
  {
    name: "Backend & data",
    skills: ["Python", "AsyncIO", "FastAPI", "WebSockets", "SQLite", "Typed contracts"],
  },
  {
    name: "Full stack",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "Express", "Accessible UI"],
  },
  {
    name: "Platform engineering",
    skills: ["CI/CD", "Contract parity", "Security gates", "Failure recovery", "Reproducible testing"],
  },
] as const;

export const engineeringPrinciples = [
  {
    title: "Hard gates before scores",
    copy: "Eligibility, privacy, reliability, and policy are constraints—not preferences that a confident heuristic can override.",
  },
  {
    title: "Unknown is not healthy",
    copy: "Missing evidence produces a named block. It does not become an optimistic default or a marketing claim.",
  },
  {
    title: "Proof ships with the system",
    copy: "Fixtures, tests, receipts, and explicit maturity boundaries make a capability inspectable without private context.",
  },
] as const;

export const resumeVariants = [
  { slug: "general", label: "General", focus: "AI infrastructure, developer platforms, and quantitative systems" },
  { slug: "data-ai", label: "Data & AI", focus: "policy-gated AI systems, async data flows, and reproducible evidence" },
  { slug: "full-stack", label: "Full Stack", focus: "TypeScript, React, Node.js, Python services, and platform reliability" },
] as const;
