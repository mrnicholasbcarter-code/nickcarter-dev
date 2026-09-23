import Link from "next/link";
import { engineeringPrinciples, projects, site, skillGroups } from "@/content/site";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> {site.availability}</p>
          <h1 id="hero-title">Engineering systems that make <em>uncertainty explicit.</em></h1>
          <p className="lede">{site.summary}</p>
          <div className="actions">
            <a className="button button-primary" href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
            <Link className="button button-secondary" href="/resume">Review resume</Link>
          </div>
        </div>
        <aside className="signal-card" aria-label="Engineering focus">
          <div className="signal-top"><span>Current focus</span><span className="mono">01 / 03</span></div>
          <p className="signal-title">Policy-gated<br />AI execution</p>
          <div className="signal-flow" aria-label="Tasks pass through policy and evidence gates before execution">
            <span>task</span><i aria-hidden="true" /><span>policy</span><i aria-hidden="true" /><span>evidence</span><i aria-hidden="true" /><strong>execute</strong>
          </div>
          <p className="signal-caption">Fail closed when capability, health, privacy, or proof is unknown.</p>
        </aside>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2 id="work-title">Built to be inspected.</h2></div><p>Public repositories with explicit proof boundaries, limitations, and reproducible paths.</p></div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card ${project.featured ? "project-featured" : ""}`} key={project.name}>
              <div className="project-index mono">0{index + 1}</div>
              <p className="project-eyebrow">{project.eyebrow}</p>
              <h3><a href={project.href} target="_blank" rel="noreferrer">{project.name}<span className="sr-only"> (opens in a new tab)</span> <Arrow /></a></h3>
              <p className="project-blurb">{project.blurb}</p>
              <p className="project-proof"><strong>Evidence boundary</strong>{project.proof}</p>
              <ul className="tags" aria-label={`${project.name} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section approach" id="approach" aria-labelledby="approach-title">
        <div className="section-heading"><div><p className="eyebrow">Engineering approach</p><h2 id="approach-title">Trust is a system property.</h2></div><p>Controls belong in the architecture. Proof belongs beside the claim.</p></div>
        <ol className="principle-list">{engineeringPrinciples.map((item, index) => <li key={item.title}><span className="mono">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></li>)}</ol>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <div className="section-heading compact"><div><p className="eyebrow">Capabilities</p><h2 id="skills-title">Across the stack.</h2></div></div>
        <div className="skill-grid">{skillGroups.map((group) => <article key={group.name}><h3>{group.name}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
      </section>

      <section className="contact-panel" aria-labelledby="contact-title">
        <p className="eyebrow">Start a conversation</p>
        <h2 id="contact-title">Building AI infrastructure, developer platforms, or reliable full-stack systems?</h2>
        <p>I am open to senior/staff roles and selected client work. The domain email will be published after independent routing verification.</p>
        <div className="actions"><a className="button button-primary" href={site.links.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow /><span className="sr-only"> (opens in a new tab)</span></a><a className="button button-secondary" href={site.links.github} target="_blank" rel="noreferrer">View GitHub <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></div>
      </section>
    </>
  );
}
