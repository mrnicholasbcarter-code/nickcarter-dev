export const site = {
  name: "Nicholas Carter",
  shortName: "NC",
  title: "Senior software engineer · Full stack, data & AI",
  location: "Sarasota, Florida",
  availability: "Open to senior/staff engineering roles and selected client work",
  email: "mr.nicholas.b.carter@gmail.com",
  url: "https://nickcarter.dev",
  summary:
    "I’m a software engineer with 20+ years of experience building web, mobile, API, and platform software across enterprise consulting, healthcare, and retail. Today I bring that foundation to AI infrastructure and real-time data systems, with the same focus on useful products, accessible experiences, and reliable delivery.",
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
    name: "AI & data engineering",
    skills: ["Python & SQL", "PostgreSQL & Redis", "Data pipelines & replay", "LightGBM & model inference", "Feature engineering", "LLM routing & governance"],
  },
  {
    name: "Backend & APIs",
    skills: ["C#", "Node.js, Express & Koa", "FastAPI & AsyncIO", "REST & GraphQL", "WebSockets", "Typed contracts & integrations"],
  },
  {
    name: "Full-stack & mobile",
    skills: ["JavaScript & TypeScript", "React & React Native", "Angular & AngularJS", "HTML & CSS", "Responsive UI & WCAG", "CMS & e-commerce"],
  },
  {
    name: "Platform & leadership",
    skills: ["Docker, Linux & GCP", "CI/CD & security gates", "Solution architecture", "Client & stakeholder collaboration", "Code review & mentoring", "Agile delivery & release support"],
  },
] as const;

export const engineeringPrinciples = [
  {
    title: "Start with the people using it",
    copy: "I work with clients, product, UX, and QA to understand the problem before choosing the implementation. Accessibility and clear workflows matter as much as the technology behind them.",
  },
  {
    title: "Own the whole path",
    copy: "I connect the interface, services, data, and release process. Clear boundaries and reusable components make a system easier to maintain, and code review and mentoring help the team carry it forward.",
  },
  {
    title: "Make reliability part of the design",
    copy: "I build in tests, diagnostics, and explicit failure handling rather than leaving them for the release. In AI systems, that also means checking policy before ranking models and keeping decisions traceable.",
  },
] as const;

export const resumeVariants = [
  { slug: "general", label: "General", focus: "20+ years across enterprise consulting, healthcare, retail, technical leadership, and AI infrastructure" },
  { slug: "data-ai", label: "Data & AI", focus: "Python, SQL, real-time pipelines, ML training and inference, and AI model governance" },
  { slug: "full-stack", label: "Full Stack", focus: "React, Angular, Node.js, C#, accessible web and mobile experiences, and end-to-end delivery" },
] as const;

export const careerSummary =
  "I’ve spent 20+ years building software for people and organizations with very different needs. My early work covered CMS, intranet, e-commerce, and interactive applications. I went on to work on GM infotainment at Compuware, lead front-end development for healthcare member experiences at Blue Cross Blue Shield of Michigan, and lead web and mobile delivery for retail and supply-chain clients at Mad Mobile. At AgileThought, I delivered enterprise applications for Deloitte and Bankers Surety, working across interfaces, backend services, integrations, and releases. Along the way, I’ve mentored developers and worked closely with clients, product, UX, and QA teams. My independent work now brings that experience to AI infrastructure, real-time trading data, and ML systems using Python and TypeScript. I still care about the same things: understanding the problem, making the experience usable, and building software that a team can understand and maintain.";

export const careerExperience = [
  {
    company: "Verdict / Independent",
    role: "Independent Engineer — AI Infrastructure & Data Systems",
    period: "2023 – Present",
    location: "Florida",
    summary: "Build AI developer infrastructure and full-stack data systems, from routing policy and API integrations to real-time pipelines and operator interfaces.",
    highlights: [
      "Designed and shipped Verdict, a Python-first LLM control plane with TypeScript integrations, explicit eligibility checks, decision receipts, replay, and failover workflows.",
      "Built CLI and API workflows for catalog qualification, routing, simulation, benchmarking, health probing, and compatibility checks.",
      "Developed a paper-first trading and ML platform with real-time market data, PostgreSQL/Redis persistence, LightGBM training, FastAPI inference, and React and terminal dashboards.",
      "Maintain automated tests, typing, linting, security scans, build and install checks, and cross-language contract checks across repositories.",
    ],
  },
  {
    company: "AgileThought",
    role: "Senior Consultant",
    period: "Jan 2018 – Nov 2023",
    location: "Tampa / St. Petersburg, FL",
    summary: "Delivered enterprise applications for Deloitte and Bankers Surety, turning client requirements into maintainable software and reliable releases.",
    highlights: [
      "Shipped React-based features on Deloitte’s Symphony platform in collaboration with product, UX, QA, and engineering teams.",
      "Owned major portions of Bankers Surety’s next-generation platform across C# services and middleware, Angular UI, API integrations, and build pipelines.",
      "Supported architecture and implementation planning, code review, defect resolution, production troubleshooting, and release delivery.",
      "Applied responsive design, accessibility, and cross-browser practices to long-lived enterprise applications.",
    ],
  },
  {
    company: "Mad Mobile",
    role: "Senior Software Developer, Team Lead",
    period: "Jul 2016 – Jan 2018",
    location: "Tampa, FL",
    summary: "Led full-stack web and mobile engineering for enterprise retail and supply-chain applications using Node.js, Koa, GraphQL, React, React Native, and Cordova.",
    highlights: [
      "Delivered VF Corp Concierge MPOS across US and European brands including Vans, Timberland, and The North Face.",
      "Contributed to Sysco inventory-management and conversational ordering applications, connecting user experiences to backend APIs and business workflows.",
      "Mentored developers, reviewed code, and coordinated delivery across client teams; recognized as Developer of the Month three consecutive months.",
    ],
  },
  {
    company: "Blue Cross Blue Shield of Michigan",
    role: "Senior Web Developer / Senior Web Designer",
    period: "Oct 2013 – Jul 2016",
    location: "Detroit, MI",
    summary: "Led front-end development for Member Portal R2 and related member-facing healthcare experiences in a regulated enterprise environment.",
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
      "Worked with HTML5, AngularJS, Node.js, WebSockets, and SOAP service integrations.",
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
