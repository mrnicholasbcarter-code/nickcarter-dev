import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleIndex, ProjectBrief, StatusLegend } from "@/components/docs";
import { docProjects, docsPath, findProject } from "@/content/docs";
import { site } from "@/content/site";

type Props = { params: Promise<{ project: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return docProjects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).project);
  if (!project) return {};
  const title = `${project.name} docs`;
  return {
    title,
    description: project.description,
    alternates: { canonical: docsPath(project) },
    openGraph: { title: `${title} · ${site.name}`, description: project.description, url: docsPath(project), images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description: project.description, images: ["/opengraph-image"] },
  };
}

export default async function ProjectDocsPage({ params }: Props) {
  const project = findProject((await params).project);
  if (!project) notFound();
  return <>
    <section className="docs-hero" aria-labelledby="project-title">
      <nav className="docs-breadcrumb mono" aria-label="Breadcrumb"><ol><li><Link href="/docs">Docs</Link></li><li aria-current="page">{project.name}</li></ol></nav>
      <p className="eyebrow">Technical docs</p>
      <h1 id="project-title">{project.name}.<br /><em>{project.tagline}</em></h1>
      <p className="lede">{project.description}</p>
      <div className="actions"><Link className="text-link" href={docsPath(project, project.articles[0])}>Read the overview <span aria-hidden="true">→</span></Link><a className="text-link quiet-link" href={project.repository}>Source on GitHub <span aria-hidden="true">↗</span></a></div>
    </section>
    <section className="section" aria-labelledby="brief-title">
      <div className="section-heading"><div><p className="eyebrow">Start here</p><h2 id="brief-title">The three-minute brief.</h2></div><p>Reviewed against the public repository on {project.reviewed}.</p></div>
      <ProjectBrief project={project} />
    </section>
    <section className="section" aria-labelledby="articles-title">
      <div className="section-heading"><div><p className="eyebrow">Go deeper</p><h2 id="articles-title">Articles.</h2></div><p>Architecture, trade-offs, tests, and decision records for engineers who want the detail.</p></div>
      <ArticleIndex project={project} />
    </section>
    <section className="section" aria-labelledby="labels-title">
      <div className="section-heading"><div><p className="eyebrow">Reading these docs</p><h2 id="labels-title">What the labels mean.</h2></div></div>
      <StatusLegend />
    </section>
  </>;
}
