import Link from "next/link";
import { careerExperience, careerSummary, engineeringPrinciples, projects, site, skillGroups } from "@/content/site";

const Arrow = () => <span aria-hidden="true">↗</span>;

function SystemDrawing({ market = false }: { market?: boolean }) {
  return <svg className="system-drawing" viewBox="0 0 480 340" fill="none" aria-hidden="true">
    {market ? <>
      <path className="drawing-grid" d="M40 70H440M40 120H440M40 170H440M40 220H440M40 270H440M120 45V290M200 45V290M280 45V290M360 45V290" />
      <path className="drawing-line" d="M40 252H104V227H152V195H201V173H239V149" />
      <path className="drawing-accent" d="M239 149H281V121H324V97H385V71H440" />
      <path className="drawing-dash" d="M239 45V290" />
      <text x="40" y="30">L2 / ORDER BOOK</text><text x="40" y="318">BID</text><text x="390" y="318">ASK</text>
      <circle cx="239" cy="149" r="6" className="drawing-dot" />
    </> : <>
      <path className="drawing-grid" d="M40 65H440M40 125H440M40 185H440M40 245H440M100 35V305M170 35V305M240 35V305M310 35V305M380 35V305" />
      <path className="drawing-line" d="M45 170H135M345 170H435M240 75V115M240 225V285" />
      <path className="drawing-accent" d="M240 65L345 170L240 275L135 170Z" />
      <rect x="188" y="142" width="104" height="56" className="drawing-box" />
      <text x="240" y="175" textAnchor="middle">POLICY</text>
      <circle cx="45" cy="170" r="5" className="drawing-dot" /><circle cx="435" cy="170" r="5" className="drawing-dot" />
      <text x="40" y="145">REQUEST</text><text x="373" y="145">EXECUTE</text>
      <text x="240" y="40" textAnchor="middle">CAPABILITY / PRIVACY</text>
      <text x="240" y="316" textAnchor="middle">DECISION + RECEIPT</text>
    </>}
  </svg>;
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org", "@type": "ProfilePage",
    mainEntity: { "@type": "Person", name: site.name, url: site.url, email: site.email,
      address: { "@type": "PostalAddress", addressLocality: "Sarasota", addressRegion: "FL", addressCountry: "US" },
      sameAs: [site.links.github, site.links.linkedin] },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-kicker"><p className="eyebrow">20+ years of building software.</p><span className="mono">Sarasota, FL / Available for work</span></div>
      <div className="hero-copy">
        <h1 id="hero-title">Built for people.<br /><em>Made to last.</em></h1>
        <div className="hero-intro"><p className="lede">{site.summary}</p><div className="actions"><a className="text-link" href="#work">Explore recent work <span aria-hidden="true">↓</span></a><Link className="text-link quiet-link" href="/resume">Review resume <Arrow /></Link></div></div>
      </div>
      <aside className="hero-aside" aria-label="Engineering focus"><div className="figure-label"><span>Current work / AI</span><span>Systems engineering</span></div><SystemDrawing /><p>New problems.<br />Two decades of perspective.</p><span className="aside-note mono">Full stack · Data & AI · Technical leadership</span></aside>
      <div className="hero-bottom"><span className="status"><span className="status-dot" aria-hidden="true" />{site.availability}</span><span className="mono">Experience & recent work ↓</span></div>
    </section>

    <section className="section resume-section" id="experience" aria-labelledby="experience-title">
      <div className="section-heading"><div><p className="eyebrow">01 / A career in software</p><h2 id="experience-title">More than<br /><em>the latest stack.</em></h2></div><p>Enterprise consulting. Retail and mobile. Healthcare. Today, data and AI.</p></div>
      <p className="body-large">{careerSummary}</p>
      <div className="experience-list">{careerExperience.slice(1, 4).map((role) => <article key={role.company}><div><p className="project-eyebrow">{role.period}</p><h3>{role.company}</h3><p>{role.role}</p></div><div><p>{role.summary}</p></div></article>)}</div>
      <div className="actions"><Link className="text-link" href="/resume">Explore my full experience <Arrow /></Link></div>
    </section>

    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="section-heading"><div><p className="eyebrow">02 / Recent independent work</p><h2 id="work-title">What I’m <em>building now.</em></h2></div><p>My recent independent work explores AI infrastructure and market data. It builds on a career delivering enterprise web, mobile, and API platforms.</p></div>
      <div className="project-grid">
        {projects.map((project, index) => <article className={`project-story project-${index + 1}`} key={project.name}>
          <div className="project-content"><div className="project-meta"><span className="mono">0{index + 1}</span><p className="project-eyebrow">{project.eyebrow}</p></div>
            <h3><a href={project.href} target="_blank" rel="noreferrer">{project.name} <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></h3>
            <p className="project-blurb">{project.blurb}</p>
            <ul className="tags" aria-label={`${project.name} technologies`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </div>
          {index < 2 ? <figure className="project-figure"><SystemDrawing market={index === 1} /><figcaption><span>Fig. 0{index + 1}</span>{index === 0 ? "Constraints before confidence." : "A consistent view of a moving market."}</figcaption></figure> : <div className="small-diagram" aria-hidden="true">{index === 2 ? <><span>capital</span><i /><span className="diagram-gate">risk gate</span><i /><span>position</span></> : <><span>request</span><i /><span className="diagram-gate">middleware</span><i /><span>provider</span></>}</div>}
          <p className="project-proof"><strong>{index === 3 ? "Development status" : "Scope & status"}</strong>{project.proof}</p>
        </article>)}
      </div>
    </section>

    <section className="section approach" id="approach" aria-labelledby="approach-title">
      <div className="approach-intro"><p className="eyebrow">03 / How I work</p><h2 id="approach-title">Experience shapes<br />the <em>approach.</em></h2><p>Years working with clients, designers, and engineering teams have taught me to ask better questions before writing more code.</p></div>
      <ol className="principle-list">{engineeringPrinciples.map((item, index) => <li key={item.title}><span className="mono">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></li>)}</ol>
    </section>

    <section className="section capabilities" aria-labelledby="skills-title"><div className="section-heading"><div><p className="eyebrow">04 / Working toolkit</p><h2 id="skills-title">Depth, with range.</h2></div><p>From accessible interfaces and backend services to real-time data and AI. I choose the tools around the problem, not the other way around.</p></div><div className="skill-grid">{skillGroups.map(group => <article key={group.name}><h3>{group.name}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div></section>

    <section className="contact-panel" aria-labelledby="contact-title"><div><p className="eyebrow">Have something in mind?</p><h2 id="contact-title">Let’s build something<br /><em>worth relying on.</em></h2></div><div className="contact-details"><p>Need someone who can talk through the requirements, work across the stack, and help a team ship? I’m open to senior/staff engineering roles and selected consulting work.</p><a className="contact-link" href={`mailto:${site.email}`}>Email Nicholas <Arrow /></a><div className="contact-social"><a href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /><span className="sr-only"> (opens in a new tab)</span></a><a href={site.links.github} target="_blank" rel="noreferrer">GitHub <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></div></div></section>
  </>;
}
