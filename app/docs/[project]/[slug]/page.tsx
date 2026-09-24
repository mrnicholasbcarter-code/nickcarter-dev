import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocBlocks, StatusLabel, StatusRow } from "@/components/docs";
import { articleStatuses, docProjects, docsPath, findArticle } from "@/content/docs";
import { site } from "@/content/site";

type Props = { params: Promise<{ project: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return docProjects.flatMap((project) => project.articles.map((article) => ({ project: project.slug, slug: article.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: projectSlug, slug } = await params;
  const found = findArticle(projectSlug, slug);
  if (!found) return {};
  const { project, article } = found;
  const title = `${article.title} · ${project.name} docs`;
  const url = docsPath(project, article);
  return {
    title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: `${title} · ${site.name}`, description: article.description, url, modifiedTime: project.reviewed, authors: [site.name], images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description: article.description, images: ["/opengraph-image"] },
  };
}

export default async function DocArticlePage({ params }: Props) {
  const { project: projectSlug, slug } = await params;
  const found = findArticle(projectSlug, slug);
  if (!found) notFound();
  const { project, article, previous, next } = found;
  const structuredData = {
    "@context": "https://schema.org", "@type": "TechArticle",
    headline: article.title, description: article.description, url: `${site.url}${docsPath(project, article)}`,
    dateModified: project.reviewed, author: { "@type": "Person", name: site.name, url: site.url },
    about: { "@type": "SoftwareSourceCode", name: project.name, codeRepository: project.repository },
  };

  return <div className="docs-layout">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
    <article className="docs-article" aria-labelledby="article-title">
      <nav className="docs-breadcrumb mono" aria-label="Breadcrumb"><ol><li><Link href="/docs">Docs</Link></li><li><Link href={docsPath(project)}>{project.name}</Link></li><li aria-current="page">{article.navTitle}</li></ol></nav>
      <header>
        <p className="eyebrow">{project.name} / {article.category}</p>
        <h1 id="article-title">{article.title}</h1>
        <p className="lede">{article.lede}</p>
        <div className="docs-meta mono"><span>Reviewed {project.reviewed}</span><StatusRow statuses={articleStatuses(article)} /><Link href="/docs#status-labels">About the labels</Link></div>
      </header>
      <nav className="docs-toc" aria-labelledby="toc-title">
        <p className="project-eyebrow" id="toc-title">On this page</p>
        <ol>{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
      </nav>
      {article.sections.map((section) => <section className="docs-section docs-prose" key={section.id} aria-labelledby={section.id}>
        <div className="docs-section-head"><h2 id={section.id}>{section.title}</h2>{section.status ? <StatusLabel status={section.status} /> : null}</div>
        <DocBlocks blocks={section.blocks} />
      </section>)}
      <section className="docs-sources" aria-labelledby="sources-title">
        <h2 id="sources-title">Sources</h2>
        <p>Primary material in the public <a href={project.repository}>{project.name} repository</a>.</p>
        <ul>{article.sources.map((source) => <li key={source.href}><a href={source.href}>{source.label} <span aria-hidden="true">↗</span></a></li>)}</ul>
      </section>
      <nav className="docs-pager" aria-label={`${project.name} docs pages`}>
        {previous ? <Link href={docsPath(project, previous)} rel="prev"><span className="project-eyebrow">Previous</span><strong>{previous.title}</strong></Link> : <span />}
        {next ? <Link className="docs-pager-next" href={docsPath(project, next)} rel="next"><span className="project-eyebrow">Next</span><strong>{next.title}</strong></Link> : null}
      </nav>
    </article>
    <aside className="docs-sidebar" aria-label={`${project.name} docs`}>
      <p className="project-eyebrow"><Link href={docsPath(project)}>{project.name} docs</Link></p>
      <ol>{project.articles.map((item) => <li key={item.slug}><Link href={docsPath(project, item)} aria-current={item.slug === article.slug ? "page" : undefined}>{item.navTitle}</Link></li>)}</ol>
    </aside>
  </div>;
}
