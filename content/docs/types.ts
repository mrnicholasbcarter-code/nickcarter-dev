export type DocStatus = "shipped" | "experimental" | "roadmap";

export type DocFlowStep = { label: string; detail: string; status?: DocStatus; exit?: string };
export type DocLayer = { name: string; role: string; items: string[]; status?: DocStatus; core?: boolean };

export type DocDiagram =
  | { kind: "flow"; figure: string; title: string; summary: string; steps: DocFlowStep[] }
  | { kind: "layers"; figure: string; title: string; summary: string; layers: DocLayer[]; connectors: string[] };

export type DocDecision = { record: string; title: string; href: string; recordStatus: string; status?: DocStatus; decision: string; tradeoff: string };

/**
 * Prose fields accept three inline forms only: `code`, **strong**, and [label](href).
 * Hrefs must be site-relative ("/docs/...") or https URLs.
 */
export type DocBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; id: string; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "status-list"; items: { status: DocStatus; title: string; text: string }[] }
  | { type: "code"; label: string; code: string }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "diagram"; diagram: DocDiagram }
  | { type: "decision"; decision: DocDecision };

export type DocSection = { id: string; title: string; status?: DocStatus; blocks: DocBlock[] };

export type DocSource = { label: string; href: string };

export type DocArticle = {
  slug: string;
  title: string;
  navTitle: string;
  category: string;
  description: string;
  lede: string;
  sections: DocSection[];
  sources: DocSource[];
};

export type DocProject = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  repository: string;
  reviewed: string;
  brief: { question: string; answer: string }[];
  articles: DocArticle[];
};
