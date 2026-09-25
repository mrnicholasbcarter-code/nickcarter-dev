import type { Metadata } from "next";
import Link from "next/link";
import { ArticleIndex, ProjectBrief, StatusLegend } from "@/components/docs";
import { docProjects, docsPath } from "@/content/docs";
import { site } from "@/content/site";

const description = `Architecture notes, engineering decisions, and evidence for ${site.name}'s independent work, with shipped, experimental, and roadmap behavior labeled.`;

export const metadata: Metadata = {
  title: "Technical docs",
  description,
  alternates: { canonical: "/docs" },
  openGraph: { title: `Technical docs · ${site.name}`, description, url: "/docs", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: `Technical docs · ${site.name}`, description, images: ["/opengraph-image"] },
};

export default function DocsIndexPage() {
  return <>
    <section className="docs-hero" aria-labelledby="docs-title">
      <p className="eyebrow">Technical docs</p>
      <h1 id="docs-title">How the work is built.<br /><em>And what backs it up.</em></h1>
      <p className="lede">Architecture, design decisions, and evidence for my independent projects, written for interviewers and engineers who want more than a README. Each page says what is shipped, what is experimental, and what is still on the roadmap.</p>
      <div className="actions"><a className="text-link" href="#status-labels">What the labels mean <span aria-hidden="true">↓</span></a></div>
    </section>

    {docProjects.map((project, index) => <section className="section" key={project.slug} id={project.slug} aria-labelledby={`${project.slug}-title`}>
      <div className="section-heading">
        <div><p className="eyebrow">{String(index + 1).padStart(2, "0")} / {project.name}</p><h2 id={`${project.slug}-title`}>{project.name}.<br /><em>{project.tagline}</em></h2></div>
        <p>{project.description} <a href={project.repository}>Source on GitHub</a>.</p>
      </div>
      <p className="project-eyebrow docs-subtitle">The three-minute brief</p>
      <ProjectBrief project={project} />
      <p className="project-eyebrow docs-subtitle">Articles</p>
      <ArticleIndex project={project} />
      <div className="actions"><Link className="text-link" href={docsPath(project, project.articles[0])}>Start with the {project.name} overview <span aria-hidden="true">→</span></Link></div>
    </section>)}

    <section className="section" id="status-labels" aria-labelledby="status-title">
      <div className="section-heading"><div><p className="eyebrow">Reading these docs</p><h2 id="status-title">What the labels mean.</h2></div><p>Claims follow the evidence in each project repository. Numbers without a reproducible artifact are left out.</p></div>
      <StatusLegend />
    </section>
  </>;
}
