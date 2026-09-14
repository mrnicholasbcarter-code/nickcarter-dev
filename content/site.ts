/**
 * Edit this file to finish portfolio + resume copy.
 * Keep Verdict claims claim-safe — no invented metrics or production-adoption language.
 */

export const site = {
  name: "Nicholas Carter",
  title: "AI infrastructure · decision systems",
  location: "Sarasota, FL",
  email: "mr.nicholas.b.carter@gmail.com",
  links: {
    github: "https://github.com/mrnicholasbcarter-code",
    linkedin: "https://www.linkedin.com/in/nicholas-carter-dev",
    verdictCore: "https://github.com/mrnicholasbcarter-code/verdict-core",
  },
  /** Draft — tighten when resume/portfolio are finished */
  summary:
    "Draft: I build trustworthy decision systems under uncertainty — AI execution control planes and related infrastructure. Portfolio and resume copy still being finalized.",
  verdictOneLiner:
    "Fail-closed LLM control plane — cheapest qualified model, named drop reasons, receipt for every decision.",
};

export type Project = {
  name: string;
  blurb: string;
  href: string;
  status: "draft" | "featured";
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Verdict",
    blurb:
      "Fail-closed LLM control plane — cheapest qualified model, named drop reasons, receipt for every decision. Offline proof path available; live provider demos labeled separately.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-core",
    status: "featured",
    tags: ["Python", "routing", "receipts"],
  },
  {
    name: "verdict-node",
    blurb: "Draft: TypeScript / Express surface for Verdict contracts.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-node",
    status: "draft",
    tags: ["TypeScript"],
  },
  {
    name: "verdict-continuity",
    blurb: "Draft: harness-independent task continuity and bounded context.",
    href: "https://github.com/mrnicholasbcarter-code/verdict-continuity",
    status: "draft",
    tags: ["Python"],
  },
];

export type Role = {
  company: string;
  title: string;
  dates: string;
  bullets: string[];
  draft?: boolean;
};

/** Fill these from the finished resume — placeholders only for now */
export const experience: Role[] = [
  {
    company: "Draft role",
    title: "Title TBD",
    dates: "Dates TBD",
    bullets: [
      "Add real bullets when resume copy is ready.",
      "Keep client outcomes as delivery history, not Verdict production proof.",
    ],
    draft: true,
  },
];

export const skillsDraft = [
  "Python",
  "TypeScript",
  "LLM routing / control planes",
  "CI / evidence-backed systems",
  "Web / API delivery",
];
