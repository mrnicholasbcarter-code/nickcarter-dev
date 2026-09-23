import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
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

test("unverified domain email and unsupported Stella claim are not published", () => {
  assert.equal(source.includes("mailto:nick@nickcarter.dev"), false);
  assert.equal(source.includes("Stella"), false);
});
