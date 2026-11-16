import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import test from "node:test";
import { join } from "node:path";

const roots = ["app", "components", "content"];
function files(path) { return readdirSync(path).flatMap((name) => { const full = join(path,name); return statSync(full).isDirectory() ? files(full) : /\.(tsx?|css)$/.test(full) ? [full] : []; }); }
const source = roots.flatMap(files).map((file) => readFileSync(file,"utf8")).join("\n");

test("public source has no shell placeholders", () => {
  for (const token of ["Title TBD", "Dates TBD", "Draft role", "Resume (draft)", "still being finalized", "Placeholder roles"]) assert.equal(source.includes(token), false, token);
});

test("required profile and project links are exact", () => {
  for (const value of ["github.com/mrnicholasbcarter-code", "linkedin.com/in/nicholas-carter-dev", "prediction-market-sdk", "verdict-core", "verdict-risk"]) assert.match(source, new RegExp(value.replaceAll("/", "\\/")));
});

test("domain email is published and resume downloads exist", () => {
  assert.match(readFileSync("content/site.ts", "utf8"), /email:\s*"nick@nickcarter\.dev"/);
  assert.equal(source.includes("mr.nicholas.b.carter@gmail.com"), false);
  assert.match(source, /mailto:\$\{site\.email\}/);
  for (const slug of ["general", "data-ai", "full-stack"]) {
    assert.equal(existsSync(`public/resumes/nicholas-carter-${slug}-resume.pdf`), true);
  }
});


test("public copy keeps project limits without internal launch notes", () => {
  for (const phrase of ["Employment timeline withheld", "domain address will be published", "no verified employer/title/date source"]) {
    assert.equal(source.includes(phrase), false, phrase);
  }
  assert.match(readFileSync("content/site.ts", "utf8"), /alpha/);
  assert.match(readFileSync("content/site.ts", "utf8"), /fixtures/);
});


test("career copy represents the supplied resumes without private contact details", () => {
  const content = readFileSync("content/site.ts", "utf8");
  for (const name of ["20+ years", "AgileThought", "Mad Mobile", "Blue Cross Blue Shield of Michigan", "Compuware", "Wayne County", "Lakeland High School"]) assert.ok(content.includes(name), name);
  assert.equal(source.includes("941-248-4178"), false);
  assert.equal(source.includes("This project-based profile"), false);
});


const siteSource = readFileSync("content/site.ts", "utf8");
const clientCopy = siteSource.slice(siteSource.indexOf("export const site"), siteSource.indexOf("export type Project"));

test("client-facing hire-me copy, CTAs, and links are in place", () => {
  assert.match(siteSource, /upwork: "https:\/\/www\.upwork\.com\/freelancers\/~01aa0036f6c4dd8a21"/);
  assert.match(siteSource, /headline: "AI features and full-stack apps,"/);
  assert.match(siteSource, /headlineAccent: "built to hold up in production\."/);
  assert.match(siteSource, /availability: "Taking new contract work · Remote, US Eastern · Hourly or fixed-scope"/);
  assert.match(siteSource, /fullTimeNote: "Also open to senior full-time roles\."/);
  assert.equal((/export const services = \[([\s\S]*?)\] as const;/.exec(siteSource)?.[1].match(/title:/g) ?? []).length, 4);
  const page = readFileSync("app/page.tsx", "utf8");
  for (const cta of ["Hire me on Upwork", "Email me", "Review resume", "{site.contactPrompt}", "02 / Selected client work"]) assert.ok(page.includes(cta), cta);
  assert.match(readFileSync("app/layout.tsx", "utf8"), /<Link href="\/#services">Services<\/Link>/);
});

test("meta description is client-facing and at most 155 characters", () => {
  const description = /description:\s*"([^"]+)"/.exec(clientCopy)?.[1] ?? "";
  assert.ok(description.length > 0 && description.length <= 155, `${description.length} chars`);
  assert.match(description, /contract work/);
  assert.match(readFileSync("app/layout.tsx", "utf8"), /description: site\.description/);
});

test("client-facing copy follows the voice rules", () => {
  assert.equal(/\u2014/.test(clientCopy), false, "em dash");
  for (const word of ["leverage", "robust", "scalable", "seamless", "optimize", "innovative", "cutting-edge", "unlock", "empower", "streamline", "elevate", "supercharge", "turnkey", "game-changer", "delve"]) {
    assert.equal(new RegExp(`\\b${word}`, "i").test(clientCopy), false, word);
  }
});

test("homepage evidence link points at a live docs route, not the deleted case study", () => {
  assert.equal(source.includes("VERDICT_PROOF_CASE_STUDY"), false);
  assert.equal(source.includes("verdict.dev"), false);
  const href = /evidenceHref: "([^"]+)"/.exec(siteSource)?.[1];
  assert.equal(href, "/docs/verdict/evidence");
  assert.match(readFileSync("content/docs/verdict/evidence.ts", "utf8"), /slug: "evidence"/);
});

test("structured data names the job title, skills, and Upwork profile", () => {
  const page = readFileSync("app/page.tsx", "utf8");
  assert.match(page, /jobTitle: site\.jobTitle/);
  assert.match(page, /knowsAbout: site\.knowsAbout/);
  assert.match(page, /sameAs: \[site\.links\.github, site\.links\.linkedin, site\.links\.upwork\]/);
  assert.match(siteSource, /jobTitle: "Senior AI & Full-Stack Engineer"/);
});
