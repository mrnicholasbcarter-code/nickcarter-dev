import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import test from "node:test";
import { join } from "node:path";

const roots = ["app", "content"];
function files(path) { return readdirSync(path).flatMap((name) => { const full = join(path,name); return statSync(full).isDirectory() ? files(full) : /\.(tsx?|css)$/.test(full) ? [full] : []; }); }
const source = roots.flatMap(files).map((file) => readFileSync(file,"utf8")).join("\n");

test("public source has no shell placeholders", () => {
  for (const token of ["Title TBD", "Dates TBD", "Draft role", "Resume (draft)", "still being finalized", "Placeholder roles"]) assert.equal(source.includes(token), false, token);
});

test("required profile and project links are exact", () => {
  for (const value of ["github.com/mrnicholasbcarter-code", "linkedin.com/in/nicholas-carter-dev", "prediction-market-sdk", "verdict-core", "verdict-risk"]) assert.match(source, new RegExp(value.replaceAll("/", "\\/")));
});

test("unverified domain email is not published and resume downloads exist", () => {
  assert.equal(source.includes("mailto:nick@nickcarter.dev"), false);
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
