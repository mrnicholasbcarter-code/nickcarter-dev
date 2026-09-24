import type { DocArticle, DocProject, DocStatus } from "./types";
import { verdict } from "./verdict";

export type { DocArticle, DocBlock, DocDecision, DocDiagram, DocProject, DocSection, DocStatus } from "./types";

export const docProjects: DocProject[] = [verdict];

export const docStatuses: Record<DocStatus, { label: string; meaning: string }> = {
  shipped: { label: "Shipped", meaning: "Implemented in the public repository and covered by automated tests or a reproducible, credential-free check." },
  experimental: { label: "Experimental", meaning: "Implemented, but depends on a live gateway, provider, or local runtime. Evidence is limited to dated observations or partial certification." },
  roadmap: { label: "Roadmap", meaning: "Planned or accepted in a decision record, but not implemented or not yet verified." },
};

export const docsPath = (project: DocProject, article?: DocArticle) => article ? `/docs/${project.slug}/${article.slug}` : `/docs/${project.slug}`;

export function findProject(slug: string) {
  return docProjects.find((project) => project.slug === slug);
}

export function findArticle(projectSlug: string, articleSlug: string) {
  const project = findProject(projectSlug);
  const index = project?.articles.findIndex((article) => article.slug === articleSlug) ?? -1;
  if (!project || index < 0) return undefined;
  return { project, article: project.articles[index], previous: project.articles[index - 1], next: project.articles[index + 1] };
}

export function allDocPaths() {
  return ["/docs", ...docProjects.flatMap((project) => [docsPath(project), ...project.articles.map((article) => docsPath(project, article))])];
}

export function articleStatuses(article: DocArticle) {
  const found = new Set<DocStatus>();
  for (const section of article.sections) {
    if (section.status) found.add(section.status);
    for (const block of section.blocks) {
      if (block.type === "status-list") block.items.forEach((item) => found.add(item.status));
      if (block.type === "decision" && block.decision.status) found.add(block.decision.status);
      if (block.type === "diagram" && block.diagram.kind === "flow") block.diagram.steps.forEach((step) => step.status && found.add(step.status));
      if (block.type === "diagram" && block.diagram.kind === "layers") block.diagram.layers.forEach((layer) => layer.status && found.add(layer.status));
    }
  }
  return (Object.keys(docStatuses) as DocStatus[]).filter((status) => found.has(status));
}
