export const site = {
  name: "Nicholas Carter",
  shortName: "NC",
  title: "Senior software engineer · Full stack, data & AI",
  location: "Sarasota, Florida",
  availability: "Open to senior/staff engineering roles and selected client work",
  email: "nick@nickcarter.dev",
  url: "https://nickcarter.dev",
  summary:
    "I’m Nicholas Carter, a software engineer with 20+ years across web, mobile, and backend development. At AgileThought, I led a Deloitte Symphony team and built Bankers Surety’s platform end to end. At Mad Mobile, I owned VF Corp’s MPOS and Sysco’s inventory apps. My work now extends into data systems and AI infrastructure.",
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
  docsHref?: string;
  caseStudyHref?: string;
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Verdict",
    eyebrow: "Autonomous development control plane",
    blurb:
      "A goal goes in; a verified, independently reviewed, receipted change comes out. Verdict plans a DAG, admits models, runs parallel workers with same-node failover, verifies ownership and checks, runs an independent review, then writes a tamper-evident receipt.",
    proof:
      "Credential-free demo with injected worker faults and a reroute to another model, ending in a verified receipt. It uses fixtures, not live providers.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-core",
    docsHref: "/docs/verdict",
    caseStudyHref:
      "https://github.com/mrnicholasbcarter-code/verdict-core/blob/main/docs/portfolio/VERDICT_PROOF_CASE_STUDY.md",
    tags: ["Python", "control plane", "receipts", "failover"],
    featured: true,
  },
  {
    name: "Prediction Market SDK",
    eyebrow: "Keeping market data in sync",
    blurb:
      "Market feeds need more than an open connection. I built typed Kalshi API workflows, reusable order-book state, and WebSocket subscription and reconnect handling so applications can work with the data instead of rebuilding the plumbing.",
    proof:
      "Kalshi signing, order workflows, and market-data handling are tested. Polymarket signing and live-order safeguards are still limited.",
    href: "https://github.com/mrnicholasbcarter-code/prediction-market-sdk",
    tags: ["Python", "AsyncIO", "WebSockets", "msgspec"],
  },
  {
    name: "Verdict Risk",
    eyebrow: "Checking risk before action",
    blurb:
      "Risk rules should be testable without placing a trade. This library separates drawdown, position, exposure, and sizing checks from storage and network calls, keeping each decision deterministic.",
    proof:
      "Property-based tests exercise the risk rules. This is a library of checks, not a trading system.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-risk",
    tags: ["Python", "risk gates", "Hypothesis", "OpenTelemetry"],
  },
  {
    name: "verdict-node",
    eyebrow: "Request checks for Node.js apps",
    blurb:
      "A TypeScript adapter for applying request checks in Express and Next.js. It moves checks to the outgoing HTTP boundary, rather than asking every caller to implement them separately.",
    proof:
      "Published as an alpha. The shared Python/TypeScript request contract is still being aligned; end-to-end enforcement is not complete.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-node",
    tags: ["TypeScript", "Express", "Next.js", "Zod"],
  },
];

export const skillGroups = [
  {
    name: "AI & data engineering",
    skills: ["Python & SQL", "PostgreSQL & Redis", "Data pipelines & replay", "LightGBM & model inference", "Feature engineering", "LLM routing & governance"],
  },
  {
    name: "Backend & APIs",
    skills: ["C#", "Node.js, Express & Koa", "FastAPI & AsyncIO", "REST & GraphQL", "WebSockets", "Typed contracts & integrations"],
  },
  {
    name: "Full-stack & mobile",
    skills: ["JavaScript & TypeScript", "React & React Native", "Angular (1 through 17)", "HTML & CSS", "Responsive UI & WCAG", "CMS & e-commerce"],
  },
  {
    name: "Platform & leadership",
    skills: ["AWS, Azure & GCP", "CI/CD, Jenkins & SonarQube gates", "Solution architecture", "Client & stakeholder collaboration", "Code review & mentoring", "Agile delivery & release support"],
  },
] as const;

export const engineeringPrinciples = [
  {
    title: "Work through the requirements",
    copy: "Consulting taught me to turn business requirements into implementation plans with clients, product, UX, and QA. The work starts with understanding the workflow—not picking a framework.",
  },
  {
    title: "Stay involved through release",
    copy: "At Bankers Surety, I built the platform end to end, from C# services and Angular interfaces to integrations and build pipelines, and led the client relationship. I’m comfortable following a feature across those boundaries and into release support.",
  },
  {
    title: "Help the team carry it forward",
    copy: "At Mad Mobile, I combined hands-on development with code review, mentoring, and delivery coordination. I care about software the team can understand and maintain after the first release.",
  },
] as const;

export const resumeVariants = [
  { slug: "general", label: "General", focus: "20+ years across enterprise consulting, healthcare, retail, technical leadership, and AI infrastructure" },
  { slug: "data-ai", label: "Data & AI", focus: "Python, SQL, real-time pipelines, ML training and inference, and AI model governance" },
  { slug: "full-stack", label: "Full Stack", focus: "React, Angular, Node.js, C#, accessible web and mobile experiences, and end-to-end delivery" },
] as const;

export const careerSummary =
  "My career started with CMS, e-commerce, and interactive web applications. Since then, I’ve worked on GM infotainment, healthcare member portals, retail point-of-sale systems, and enterprise platforms. I’ve been a hands-on developer, a team lead, and a consultant working directly with clients. The common thread is connecting the user experience to the services and delivery work behind it. My current AI and data projects build on that foundation.";

export const careerExperience = [
  {
    company: "Verdict / Independent",
    role: "Independent Engineer — AI Infrastructure & Data Systems",
    period: "2023 – Present",
    location: "Florida",
    summary: "Build AI developer infrastructure and data systems, plus Angular 17 front ends on client contracts (2024–2025).",
    highlights: [
      "Designed and shipped Verdict, a Python-first LLM control plane with TypeScript integrations, explicit eligibility checks, decision receipts, replay, and failover workflows.",
      "Built CLI and API workflows for catalog qualification, routing, simulation, benchmarking, health probing, and compatibility checks.",
      "Developed a paper-first trading and ML platform with real-time market data, PostgreSQL/Redis persistence, LightGBM training, FastAPI inference, and React and terminal dashboards.",
      "Maintain automated tests, typing, linting, security scans, build and install checks, and cross-language contract checks across repositories.",
      "Client contract work (2024–2025): built Angular 17 front ends using signals, standalone components, typed reactive forms, and Angular Material, with Jest and Cypress tests.",
    ],
  },
  {
    company: "AgileThought",
    role: "Senior Consultant · Team Lead",
    period: "Jan 2018 – Nov 2023",
    location: "Tampa / St. Petersburg, FL",
    summary: "Led one of 17 Deloitte Symphony teams and built Bankers Surety’s platform end to end, leading the client relationship as well as development.",
    highlights: [
      "Team lead on Deloitte’s Symphony platform and owner of its React component library across three major versions.",
      "Built Bankers Surety’s platform end to end: C# services, Entity Framework, Angular UI, integrations, Azure, and pipelines.",
      "Supported architecture and implementation planning, code review, defect resolution, production troubleshooting, and release delivery.",
      "Applied responsive design, accessibility, and cross-browser practices to long-lived enterprise applications.",
    ],
  },
  {
    company: "Mad Mobile",
    role: "Senior Software Developer, Team Lead",
    period: "Jul 2016 – Jan 2018",
    location: "Tampa, FL",
    summary: "Owned VF Corp’s Concierge MPOS, deployed in Stabio, Switzerland, and Sysco’s inventory and chatbot ordering apps, leading teams of up to 10.",
    highlights: [
      "Owned VF Corp Concierge MPOS for brands including Vans, Timberland, and The North Face.",
      "Owned Sysco’s inventory and chatbot ordering apps and other core-services clients on AWS with Terraform.",
      "Mentored developers, reviewed code, and coordinated delivery across client teams; recognized as Developer of the Month three consecutive months.",
    ],
  },
  {
    company: "Blue Cross Blue Shield of Michigan",
    role: "UI Lead · Senior Web Developer / Senior Web Designer",
    period: "Oct 2013 – Jul 2016",
    location: "Detroit, MI",
    summary: "UI lead for Member Portal R2: responsive, WCAG-accessible healthcare UI on Java / Spring Boot services.",
    highlights: [
      "Built responsive interfaces and reusable front-end patterns with Backbone, jQuery, Adobe CQ/CMS, HTML5, and CSS3.",
      "Partnered with UX, product, content, and engineering teams on WCAG accessibility, cross-browser support, and maintainability.",
      "Received a Team Project Award and multiple internal recognitions, including the 1% Award.",
    ],
  },
  {
    company: "Compuware",
    role: "Senior Software Developer",
    period: "Mar 2013 – Jul 2013",
    location: "Detroit, MI (Contract)",
    summary: "Developed and supported GM infotainment software in a cross-platform environment.",
    highlights: [
      "Worked with HTML5, Angular, Node.js, WebSockets, and SOAP service integrations.",
      "Supported QA and release tooling, defect triage, and cross-platform troubleshooting.",
    ],
  },
  {
    company: "Wayne County • Motor City Interactive • Enlighten • Summit Sports",
    role: "Earlier Engineering Roles",
    period: "2006 – 2012",
    location: "Michigan",
    summary: "Built the foundation of my career across CMS, intranet and portal, e-commerce, and interactive web applications.",
    highlights: [
      "Developed applications with JavaScript, PHP/MySQL, reusable UI components, and server-side integrations.",
      "Worked with enterprise content-management platforms and publishing workflows.",
    ],
  },
] as const;

export const education = {
  qualification: "High School Diploma, General Studies",
  school: "Lakeland High School, White Lake, MI",
  year: "2005",
} as const;
