export const site = {
  name: "Nicholas Carter",
  shortName: "NC",
  title: "Software engineer · AI infrastructure & market systems",
  location: "Sarasota, Florida",
  availability: "Open to senior/staff engineering roles and selected client work",
  email: "mr.nicholas.b.carter@gmail.com",
  url: "https://nickcarter.dev",
  summary:
    "I build software that decides which AI model can handle a request, keeps market data in sync, and checks trading risk. I work in Python and TypeScript, with a focus on clear rules and failures I can reproduce.",
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
    eyebrow: "Choosing models within limits",
    blurb:
      "Model routing with rules that ranking cannot override. Verdict checks capability, privacy, reliability, and policy first, then ranks only the models that qualify.",
    proof:
      "Try routing and simulated failures without API keys. The demo uses fixtures, not live providers.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-core",
    tags: ["Python", "policy gates", "receipts", "failover"],
    featured: true,
  },
  {
    name: "Prediction Market SDK",
    eyebrow: "Keeping market data in sync",
    blurb:
      "A typed, async Python SDK for Kalshi market data and orders. Reusable L2 order books track snapshots and deltas, while a WebSocket layer manages connections and subscriptions.",
    proof:
      "Kalshi signing, order workflows, and market-data handling are tested. Polymarket signing and live-order safeguards are still limited.",
    href: "https://github.com/mrnicholasbcarter-code/prediction-market-sdk",
    tags: ["Python", "AsyncIO", "WebSockets", "msgspec"],
  },
  {
    name: "Verdict Risk",
    eyebrow: "Checking risk before action",
    blurb:
      "Trading-risk checks for drawdown, position size, cluster exposure, and Kelly sizing. Pure functions keep the decisions separate from storage and network calls, so the same inputs give the same answer.",
    proof:
      "Property-based tests exercise the risk rules. This is a library of checks, not a trading system.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-risk",
    tags: ["Python", "risk gates", "Hypothesis", "OpenTelemetry"],
  },
  {
    name: "verdict-node",
    eyebrow: "Request checks for Node.js apps",
    blurb:
      "Brings request checks into Express and Next.js apps. The middleware checks outgoing OpenAI-compatible requests at the HTTP boundary rather than relying on each caller to apply the rules.",
    proof:
      "Published as an alpha. The shared Python/TypeScript request contract is still being aligned; end-to-end enforcement is not complete.",
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
    title: "Rules before rankings",
    copy: "I keep eligibility and policy checks separate from ranking. A higher score should never make an ineligible model acceptable.",
  },
  {
    title: "Make uncertainty visible",
    copy: "When a required check has no answer, I stop the request and explain what is missing instead of assuming it is safe.",
  },
  {
    title: "Make failures repeatable",
    copy: "I use fixtures, tests, and decision receipts so someone else can follow the result and reproduce what went wrong.",
  },
] as const;

export const resumeVariants = [
  { slug: "general", label: "General", focus: "AI infrastructure, developer platforms, and quantitative systems" },
  { slug: "data-ai", label: "Data & AI", focus: "AI model routing, async market data, and reproducible testing" },
  { slug: "full-stack", label: "Full Stack", focus: "TypeScript, React, Node.js, Python services, and platform reliability" },
] as const;
