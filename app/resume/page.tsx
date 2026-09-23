import type { Metadata } from "next";
import Link from "next/link";
import { projects, resumeVariants, site, skillGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Technical profile and role-focused resume options for ${site.name}.`,
  alternates: { canonical: "/resume" },
  openGraph: { title: `Resume · ${site.name}`, description: `Technical profile and role-focused resume options for ${site.name}.`, url: "/resume" },
};

export default function ResumePage() {
  return (
    <>
      <section className="resume-hero">
        <p className="eyebrow">Technical profile</p>
        <h1>{site.name}</h1>
        <p className="resume-title">{site.title}</p>
        <p className="lede">{site.summary}</p>
        <div className="resume-meta"><span>{site.location}</span><span>{site.availability}</span></div>
        <div className="actions no-print"><a className="button button-primary" href={`mailto:${site.email}`}>Email</a><a className="button button-secondary" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a><a className="button button-secondary" href={site.links.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
      </section>

      <section className="section" aria-labelledby="resume-options">
        <div className="section-heading"><div><p className="eyebrow">Role-specific views</p><h2 id="resume-options">Choose the relevant focus.</h2></div><p>Each evidence-bound resume has a stable web view and a matching PDF download.</p></div>
        <div className="resume-grid">{resumeVariants.map((variant) => <article key={variant.slug}><h3>{variant.label}</h3><p>{variant.focus}</p><div className="resume-links"><Link href={`/resume/${variant.slug}`}>Open web view <span aria-hidden="true">→</span></Link><a href={`/resumes/nicholas-carter-${variant.slug}-resume.pdf`} download>Download PDF <span aria-hidden="true">↓</span></a></div></article>)}</div>
      </section>

      <section className="section resume-section" aria-labelledby="profile-title">
        <p className="eyebrow">Professional summary</p><h2 id="profile-title">Systems that explain their decisions.</h2>
        <p className="body-large">Nicholas builds public, inspectable software across AI routing, HTTP enforcement, prediction-market data foundations, and quantitative risk. The work emphasizes typed boundaries, deterministic gates, explicit limitations, and reproducible validation.</p>
      </section>

      <section className="section resume-section" aria-labelledby="project-experience">
        <p className="eyebrow">Selected project experience</p><h2 id="project-experience">Verified public work.</h2>
        <div className="experience-list">{projects.map((project) => <article key={project.name}><div><p className="project-eyebrow">{project.eyebrow}</p><h3><a href={project.href}>{project.name}</a></h3></div><div><p>{project.blurb}</p><p className="muted">{project.proof}</p></div></article>)}</div>
        <p className="provenance-note"><strong>Employment timeline withheld:</strong> no verified employer/title/date source is present in this repository. This page does not infer one from project ownership.</p>
      </section>

      <section className="section resume-section" aria-labelledby="resume-skills">
        <p className="eyebrow">Technical capabilities</p><h2 id="resume-skills">Grouped for fast review.</h2>
        <div className="skill-grid">{skillGroups.map((group) => <article key={group.name}><h3>{group.name}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
      </section>
    </>
  );
}
