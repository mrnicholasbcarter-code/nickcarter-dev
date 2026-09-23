import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerExperience, education, projects, resumeVariants, site, skillGroups } from "@/content/site";

type Props = { params: Promise<{ variant: string }> };

export function generateStaticParams() { return resumeVariants.map(({ slug }) => ({ variant: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variant } = await params;
  const item = resumeVariants.find((entry) => entry.slug === variant);
  if (!item) return {};
  return { title: `${item.label} Resume`, description: `${item.label} technical profile for ${site.name}: ${item.focus}.`, alternates: { canonical: `/resume/${item.slug}` }, openGraph: { title: `${item.label} Resume · ${site.name}`, description: `${item.label} technical profile for ${site.name}: ${item.focus}.`, url: `/resume/${item.slug}`, images: ["/opengraph-image"] } };
}

export default async function ResumeVariant({ params }: Props) {
  const { variant } = await params;
  const item = resumeVariants.find((entry) => entry.slug === variant);
  if (!item) notFound();
  const featuredProjects = item.slug === "full-stack" ? [projects[3], projects[0], projects[1]] : item.slug === "data-ai" ? [projects[0], projects[1], projects[2]] : projects;
  const groups = item.slug === "full-stack" ? [skillGroups[2], skillGroups[1], skillGroups[3]] : item.slug === "data-ai" ? [skillGroups[0], skillGroups[1], skillGroups[3]] : skillGroups;
  return <article className="print-resume">
    <header><p className="eyebrow">{item.label} resume</p><h1>{site.name}</h1><p className="resume-title">{item.focus}</p><p>{site.location} · {site.availability}</p><p><a href={`mailto:${site.email}`}>{site.email}</a> · <a href={site.links.github}>GitHub</a> · <a href={site.links.linkedin}>LinkedIn</a></p><p className="no-print"><a className="button button-secondary" href={`/resumes/nicholas-carter-${item.slug}-resume.pdf`} download>Download PDF <span aria-hidden="true">↓</span></a></p></header>
    <section><h2>Summary</h2><p>{site.summary}</p></section>
    <section><h2>Professional experience</h2>{careerExperience.map((experience) => <div className="resume-project" key={`${experience.company}-${experience.period}`}><h3>{experience.company} <small>· {experience.role}</small></h3><p className="muted">{experience.period} · {experience.location}</p><p>{experience.summary}</p><ul>{experience.highlights.slice(0, 2).map((highlight) => <li key={highlight}><p>{highlight}</p></li>)}</ul></div>)}</section>
    <section><h2>Selected public work</h2>{featuredProjects.map((project) => <div className="resume-project" key={project.name}><h3><a href={project.href}>{project.name}</a> <small>· {project.eyebrow}</small></h3><p>{project.blurb}</p><p className="muted"><strong>Project status:</strong> {project.proof}</p><p>{project.tags.join(" · ")}</p></div>)}</section>
    <section><h2>Capabilities</h2><div className="skill-grid">{groups.map((group) => <article key={group.name}><h3>{group.name}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div></section>
    <section><h2>Education</h2><div className="resume-project"><h3>{education.school}</h3><p>{education.qualification} · {education.year}</p></div></section>
  </article>;
}
