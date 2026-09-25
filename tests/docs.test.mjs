import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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

test("docs publish architecture boundaries and a decision-only sequence", () => {
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


const articleSource = (name) => articles.find((article) => article.name === `${name}.ts`).source;
const sectionSource = (name, id) => articleSource(name).split(`id: "${id}",`)[1]?.split(/\n    \},\n    \{/)[0] ?? "";
const hasCitation = (source, target) => assert.ok(source.includes(`blob("${target}")`), target);

test("source links and the displayed review bind to the reviewed public revision", () => {
  const source = readFileSync(join(projectDir, "source.ts"), "utf8");
  assert.match(source, /export const revision = "72cb3642269684f122e590c390166cd6cebcf68e";/);
  assert.ok(source.includes("`${repository}/blob/${revision}/${path}`"));
  assert.ok(source.includes("`${repository}/tree/${revision}/${path}`"));
  const project = readFileSync(join(projectDir, "index.ts"), "utf8");
  assert.match(project, /import \{ repository, revision \} from "\.\/source"/);
  assert.ok(project.includes("reviewed: `2026-09-24 · ${revision}`"));
});

test("request paths distinguish decisions, configured HTTP execution, and packet workers", () => {
  const source = articleSource("architecture");
  const flow = sectionSource("architecture", "request-flow");
  assert.match(flow, /route_only=True/);
  assert.match(flow, /No provider call or worker launch follows from this endpoint/);
  assert.match(flow, /UpstreamProxy.*directly, without a Dispatcher hop/);
  assert.match(flow, /server-configured upstream URL, not the optimizer-selected gateway endpoint/);
  assert.match(flow, /SwarmDispatcher.*planning contract; it does not invoke a provider/);
  assert.match(flow, /checks model, provider, and gateway.*before calling an executor/);
  for (const target of ["verdict/api.py#L871-L914", "verdict/api.py#L1509-L1529", "verdict/proxy.py#L123-L136", "verdict/dispatcher.py#L135-L160", "verdict/autodev_run.py#L1293-L1320"]) hasCitation(source, target);
});

test("selection documents optimizer authority and conditional preparation rather than a universal legacy gate", () => {
  const source = articleSource("model-selection");
  const eligibility = sectionSource("model-selection", "eligibility");
  assert.match(eligibility, /execution-path optimizer is the strategy authority/);
  assert.match(eligibility, /before the legacy gate\/ranker branch/);
  assert.match(eligibility, /feed or explicit compatibility path/);
  assert.match(eligibility, /without a supplied pool receipt and with an available live snapshot/);
  assert.match(eligibility, /requires Core metadata.*task profile's spend policy/);
  assert.match(eligibility, /absent snapshot leaves the request unchanged/);
  assert.match(eligibility, /context, configuration, or environment settings can permit compatibility/);
  for (const target of ["verdict/execution_path.py#L102-L107", "verdict/intelligence.py#L377-L421", "verdict/intelligence.py#L699-L737", "verdict/serve_path.py#L54-L71"]) hasCitation(source, target);
});

test("spend policy and session authority qualify cost and free-preference claims", () => {
  const source = articleSource("model-selection");
  const policy = sectionSource("model-selection", "free-and-paid");
  assert.match(policy, /complete strategies by expected cost with `free_first=False`/);
  assert.match(policy, /`free_only` excludes paid identities/);
  assert.match(policy, /`frontier_required` admits only frontier-class paid identities/);
  assert.match(policy, /`free_preferred`.*admission receipt.*does not replace the optimizer/);
  assert.match(policy, /authoritative session decision.*still-qualified route.*defer other qualified offers/);
  assert.match(sectionSource("overview", "approach"), /Spend policy and authoritative session decisions constrain cost selection/);
  hasCitation(source, "verdict/execution_path.py#L644-L681");
  hasCitation(source, "verdict/free_tier_admit.py#L1453-L1507");
});

test("HTTP context forwarding requires an attached eligible pack, not just a route decision", () => {
  const source = articleSource("architecture");
  const flow = sectionSource("architecture", "request-flow");
  assert.match(flow, /eligible compiled pack must be attached.*`cheap_path_context_pack` flag must be present/);
  assert.match(flow, /Without that flag, injection leaves the payload unchanged/);
  assert.match(flow, /authoritative decision projection does not itself attach a compiled pack/);
  hasCitation(source, "verdict/api.py#L1025-L1051");
  hasCitation(source, "verdict/intelligence.py#L377-L421");
});

test("compiler overflow and governor mandatory handling have separate, bounded guarantees", () => {
  const source = articleSource("context-intelligence");
  const budget = sectionSource("context-intelligence", "budget");
  assert.match(budget, /ContextPackCompiler.*omit any unit.*including required policy.*input_budget_exhausted/);
  assert.match(budget, /ContextBudgetGovernor.*screens out secret-pattern units first, even mandatory ones/);
  assert.match(budget, /Only surviving mandatory units fail closed for unknown size or overflow/);
  assert.match(budget, /supplied units plus configured output, reasoning, and tool-call reserves/);
  assert.match(budget, /not an end-to-end guarantee.*full prompt fits or required policy survives/);
  for (const target of ["verdict/context_pack.py#L981-L1001", "verdict/context_budget.py#L172-L202", "verdict/context_budget.py#L414-L449", "verdict/context_budget.py#L459-L508"]) hasCitation(source, target);
});


test("the fixture example is the exact pinned source excerpt, not an invented receipt", () => {
  const source = articleSource("routing-receipts");
  const contents = sectionSource("routing-receipts", "contents");
  const literal = /code: ("(?:[^"\\]|\\.)*"),/.exec(contents)?.[1];
  assert.ok(literal);
  const excerpt = JSON.parse(literal);
  // Dedented flagship_demo.py lines 97–111 at the reviewed revision.
  assert.equal(createHash("sha256").update(excerpt).digest("hex"), "4b5bb39ea112889995ec1837559c35c940a10e5bf7b01e75e5d22cf97397fdc6");
  assert.match(contents, /Fixture decision construction \(flagship_demo.py, lines 97–111\)/);
  assert.match(contents, /decision separately from `receipt`.*`receipt_id` and `mode`/);
  assert.match(contents, /quickstart writes no state and does not create a durable ledger/);
  hasCitation(source, "verdict/flagship_demo.py#L97-L111");
  hasCitation(source, "verdict/flagship_demo.py#L112-L122");
  hasCitation(source, "verdict/flagship_demo.py#L1-L6");
});
