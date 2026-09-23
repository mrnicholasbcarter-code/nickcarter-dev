import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, resumeVariants, site, skillGroups } from "@/content/site";

type Props = { params: Promise<{ variant: string }> };

export function generateStaticParams() { return resumeVariants.map(({ slug }) => ({ variant: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variant } = await params;
  const item = resumeVariants.find((entry) => entry.slug === variant);
  if (!item) return {};
  return { title: `${item.label} Resume`, description: `${item.label} technical profile for ${site.name}: ${item.focus}.`, alternates: { canonical: `/resume/${item.slug}` } };
}

export default async function ResumeVariant({ params }: Props) {
  const { variant } = await params;
  const item = resumeVariants.find((entry) => entry.slug === variant);
  if (!item) notFound();
  const featuredProjects = item.slug === "full-stack" ? [projects[3], projects[0], projects[1]] : item.slug === "data-ai" ? [projects[0], projects[1], projects[2]] : projects;
  const groups = item.slug === "full-stack" ? [skillGroups[2], skillGroups[1], skillGroups[3]] : item.slug === "data-ai" ? [skillGroups[0], skillGroups[1], skillGroups[3]] : skillGroups;
  return <article className="print-resume">
    <header><p className="eyebrow">{item.label} resume</p><h1>{site.name}</h1><p className="resume-title">{item.focus}</p><p>{site.location} · {site.availability}</p><p><a href={site.links.github}>github.com/mrnicholasbcarter-code</a> · <a href={site.links.linkedin}>linkedin.com/in/nicholas-carter-dev</a></p><p className="print-button no-print">Use your browser’s Print command to save as PDF.</p></header>
    <section><h2>Summary</h2><p>{site.summary}</p></section>
    <section><h2>Selected public work</h2>{featuredProjects.map((project) => <div className="resume-project" key={project.name}><h3>{project.name} <small>· {project.eyebrow}</small></h3><p>{project.blurb}</p><p className="muted"><strong>Boundary:</strong> {project.proof}</p><p>{project.tags.join(" · ")}</p></div>)}</section>
    <section><h2>Capabilities</h2><div className="skill-grid">{groups.map((group) => <article key={group.name}><h3>{group.name}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div></section>
    <p className="provenance-note"><strong>Evidence note:</strong> This resume is deliberately limited to public, repository-verifiable project work. No unverified employment timeline or performance metric is included.</p>
  </article>;
}
