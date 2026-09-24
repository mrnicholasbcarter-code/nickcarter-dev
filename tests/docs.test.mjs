import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const projectDir = "content/docs/verdict";
const articleFiles = readdirSync(projectDir).filter((name) => name.endsWith(".ts") && !["index.ts", "source.ts"].includes(name));
const articles = articleFiles.map((name) => ({ name, source: readFileSync(join(projectDir, name), "utf8") }));
const docsSource = [...articles.map(({ source }) => source), ...["index.ts", "source.ts"].map((name) => readFileSync(join(projectDir, name), "utf8")), readFileSync("content/docs/index.ts", "utf8")].join("\n");
const slugOf = (source) => /^\s{2}slug: "([a-z0-9-]+)",$/m.exec(source)?.[1];
const slugs = articles.map(({ source }) => slugOf(source));
const knownPaths = new Set(["/docs", "/docs/verdict", ...slugs.map((slug) => `/docs/verdict/${slug}`)]);

test("primary navigation, footer, and the Verdict card link to /docs", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  const primaryNav = /<nav aria-label="Primary navigation">([\s\S]*?)<\/nav>/.exec(layout)?.[1] ?? "";
  assert.match(primaryNav, /<Link href="\/docs">Docs<\/Link>/);
  assert.match(/<div className="footer-links">([\s\S]*?)<\/div>/.exec(layout)?.[1] ?? "", /href="\/docs"/);
  assert.match(readFileSync("content/site.ts", "utf8"), /docsHref: "\/docs\/verdict"/);
  assert.match(readFileSync("app/page.tsx", "utf8"), /project\.docsHref/);
});

test("every required Verdict article exists, is registered once, and has a unique slug", () => {
  for (const slug of ["overview", "architecture", "model-selection", "context-intelligence", "autonomous-workflow", "routing-receipts", "evidence", "decisions"]) assert.ok(slugs.includes(slug), slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const { name, source } of articles) assert.equal(`${slugOf(source)}.ts`, name);
  const registry = /articles: \[([^\]]+)\]/.exec(readFileSync(join(projectDir, "index.ts"), "utf8"))?.[1].split(",").map((item) => item.trim()) ?? [];
  assert.equal(registry.length, articles.length);
  assert.equal(new Set(registry).size, registry.length);
});

test("every article carries metadata, sources, and at least one status label", () => {
  for (const { name, source } of articles) {
    for (const field of ["title", "navTitle", "category", "description", "lede"]) assert.match(source, new RegExp(`^\\s{2}${field}: "[^"]{4,}",$`, "m"), `${name} ${field}`);
    assert.match(source, /sources: \[\s*\{ label:/, name);
    assert.match(source, /status: "(shipped|experimental|roadmap)"/, name);
  }
  for (const [, status] of docsSource.matchAll(/status: "([a-z]+)"/g)) assert.ok(["shipped", "experimental", "roadmap"].includes(status), status);
});

test("docs publish an architecture diagram and an end-to-end dispatch sequence", () => {
  const architecture = articles.find(({ name }) => name === "architecture.ts").source;
  assert.match(architecture, /kind: "layers"/);
  assert.match(architecture, /kind: "flow"/);
  assert.match(architecture, /exit: "blocked"/);
});

test("internal docs links resolve and external links point at public repositories", () => {
  const linked = [...docsSource.matchAll(/\]\((\/[^)\s]*)\)/g)].map((match) => match[1]);
  assert.ok(linked.length > 0);
  for (const path of linked) assert.ok(knownPaths.has(path.split("#")[0]), path);
  for (const [url] of docsSource.matchAll(/https?:\/\/[^\s"')]+/g)) assert.match(url, /^https:\/\/github\.com\/mrnicholasbcarter-code\//, url);
});

test("OpenCodeReview is presented only as roadmap work", () => {
  const mentions = docsSource.split("\n").filter((line) => line.includes("OpenCodeReview"));
  assert.ok(mentions.length > 0);
  for (const line of mentions) assert.match(line, /status: "roadmap"/, line);
});

test("docs avoid unsupported quantitative claims", () => {
  for (const pattern of [/\d[\d,]*\+? (models|providers|free tiers)/i, /\d+(\.\d+)?\s?%/, /100,000/, /sub-?(milli|five)/i, /production-ready/i, /\d+(\.\d+)?\s?ms\b/, /\bthousands of\b/i]) {
    assert.doesNotMatch(docsSource, pattern, String(pattern));
  }
  assert.match(docsSource, /not a saving|not invoices/);
});

test("docs contain no secrets, private infrastructure, or internal tracker links", () => {
  for (const pattern of [/\/home\//, /\/Users\//, /\/tmp\//, /linear\.app/, /localhost|127\.0\.0\.1/, /:20128|:8000/, /\bsk-[A-Za-z0-9]{8,}/, /api[_-]?key\s*[:=]/i, /BOD-\d+/, /users\/mrnicholasbcarter-code\/projects/]) {
    assert.doesNotMatch(docsSource, pattern, String(pattern));
  }
});

test("sitemap covers every docs route", () => {
  const sitemap = readFileSync("app/sitemap.ts", "utf8");
  assert.match(sitemap, /allDocPaths\(\)/);
  assert.match(readFileSync("content/docs/index.ts", "utf8"), /export function allDocPaths\(\) \{\s*return \["\/docs", \.\.\.docProjects\.flatMap/);
});

test("docs routes are statically generated with canonical and OpenGraph metadata", () => {
  for (const file of ["app/docs/page.tsx", "app/docs/[project]/page.tsx", "app/docs/[project]/[slug]/page.tsx"]) {
    const source = readFileSync(file, "utf8");
    assert.match(source, /alternates: \{ canonical:/, file);
    assert.match(source, /openGraph: \{/, file);
    assert.match(source, /images: \["\/opengraph-image"\]/, file);
  }
  for (const file of ["app/docs/[project]/page.tsx", "app/docs/[project]/[slug]/page.tsx"]) {
    const source = readFileSync(file, "utf8");
    assert.match(source, /export const dynamicParams = false/, file);
    assert.match(source, /export function generateStaticParams/, file);
  }
});
