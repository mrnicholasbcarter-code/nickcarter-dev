import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { articleStatuses, docStatuses, docsPath, type DocBlock, type DocDecision, type DocDiagram, type DocProject, type DocStatus } from "@/content/docs";

const inlinePattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

export function Inline({ text }: { text: string }) {
  return <>{text.split(inlinePattern).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) return link[2].startsWith("/") ? <Link key={index} href={link[2]}>{link[1]}</Link> : <a key={index} href={link[2]}>{link[1]}</a>;
    return <Fragment key={index}>{part}</Fragment>;
  })}</>;
}

export function StatusLabel({ status }: { status: DocStatus }) {
  return <span className={`status-label status-${status}`}><span className="sr-only">Status: </span>{docStatuses[status].label}</span>;
}

export function StatusRow({ statuses }: { statuses: DocStatus[] }) {
  return <span className="status-row">{statuses.map((status) => <StatusLabel key={status} status={status} />)}</span>;
}

function Diagram({ diagram }: { diagram: DocDiagram }) {
  return <figure className="docs-figure">
    <div className="figure-label"><span>{diagram.figure}</span><span>{diagram.title}</span></div>
    {diagram.kind === "flow" ? <ol className="flow-diagram">{diagram.steps.map((step, index) =>
      <li key={step.label} className={step.status === "roadmap" ? "flow-roadmap" : undefined}>
        <span className="flow-index mono" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="flow-step"><strong>{step.label}{step.status ? <StatusLabel status={step.status} /> : null}</strong><p><Inline text={step.detail} /></p></div>
        {step.exit ? <span className="flow-exit mono"><span aria-hidden="true">→ </span><span className="sr-only">Can stop here as: </span>{step.exit}</span> : null}
      </li>)}</ol> : <ol className="layer-diagram">{diagram.layers.map((layer, index) =>
      <li key={layer.name}>
        {index > 0 ? <p className="layer-link mono"><span aria-hidden="true">↓</span>{diagram.connectors[index - 1]}</p> : null}
        <div className={layer.core ? "layer layer-core" : "layer"}>
          <div className="layer-head"><strong>{layer.name}</strong><span className="mono">{layer.role}</span>{layer.status ? <StatusLabel status={layer.status} /> : null}</div>
          <ul className="layer-items">{layer.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </li>)}</ol>}
    <figcaption>{diagram.summary}</figcaption>
  </figure>;
}

function Decision({ decision }: { decision: DocDecision }) {
  return <article className="decision-entry">
    <div className="decision-meta mono"><span>{decision.record}</span><span>Record: {decision.recordStatus}</span>{decision.status ? <StatusLabel status={decision.status} /> : null}</div>
    <h3><a href={decision.href}>{decision.title} <span aria-hidden="true">↗</span></a></h3>
    <dl><dt>Decision</dt><dd><Inline text={decision.decision} /></dd><dt>Trade-off</dt><dd><Inline text={decision.tradeoff} /></dd></dl>
  </article>;
}

export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return <>{blocks.map((block, index): ReactNode => {
    switch (block.type) {
      case "paragraph": return <p key={index}><Inline text={block.text} /></p>;
      case "subheading": return <h3 key={index} id={block.id}>{block.text}</h3>;
      case "list": {
        const List = block.ordered ? "ol" : "ul";
        return <List key={index}>{block.items.map((item) => <li key={item}><Inline text={item} /></li>)}</List>;
      }
      case "status-list": return <ul key={index} className="status-list">{block.items.map((item) => <li key={item.title}><StatusLabel status={item.status} /><div><strong>{item.title}</strong><p><Inline text={item.text} /></p></div></li>)}</ul>;
      case "code": return <figure key={index} className="docs-code"><figcaption>{block.label}</figcaption><pre tabIndex={0}><code>{block.code}</code></pre></figure>;
      case "table": return <div key={index} className="docs-table" role="region" aria-label={block.caption} tabIndex={0}><table><caption>{block.caption}</caption><thead><tr>{block.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{block.rows.map((row) => <tr key={row[0]}>{row.map((cell, cellIndex) => <td key={cellIndex}><Inline text={cell} /></td>)}</tr>)}</tbody></table></div>;
      case "callout": return <aside key={index} className="docs-callout" aria-label={block.title}><strong>{block.title}</strong><p><Inline text={block.text} /></p></aside>;
      case "diagram": return <Diagram key={index} diagram={block.diagram} />;
      case "decision": return <Decision key={index} decision={block.decision} />;
    }
  })}</>;
}

export function ProjectBrief({ project }: { project: DocProject }) {
  return <dl className="docs-brief">{project.brief.map((item) => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl>;
}

export function ArticleIndex({ project }: { project: DocProject }) {
  return <ol className="docs-index">{project.articles.map((article, index) =>
    <li key={article.slug}>
      <span className="mono">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <p className="project-eyebrow">{article.category}</p>
        <h3><Link href={docsPath(project, article)}>{article.title}</Link></h3>
        <p>{article.description}</p>
        <StatusRow statuses={articleStatuses(article)} />
      </div>
    </li>)}</ol>;
}

export function StatusLegend() {
  return <dl className="status-legend">{(Object.keys(docStatuses) as DocStatus[]).map((status) => <div key={status}><dt><StatusLabel status={status} /></dt><dd>{docStatuses[status].meaning}</dd></div>)}</dl>;
}
