import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import test from "node:test";

const files = [
  "public/resumes/nicholas-carter-general-resume.pdf",
  "public/resumes/nicholas-carter-data-ai-resume.pdf",
  "public/resumes/nicholas-carter-full-stack-resume.pdf",
];

function pdfText(buf) {
  const parts = [buf.toString("latin1")];
  const src = buf.toString("latin1");
  const re = /stream\r?\n/g;
  let match;
  while ((match = re.exec(src))) {
    const start = match.index + match[0].length;
    const end = src.indexOf("endstream", start);
    if (end < 0) break;
    const raw = buf.subarray(start, end);
    try {
      parts.push(inflateSync(raw).toString("latin1"));
    } catch {
      // not a flate stream
    }
  }
  return parts.join("\n");
}

for (const file of files) {
  test(file + " links nick@nickcarter.dev and not gmail", () => {
    const text = pdfText(readFileSync(file));
    assert.match(text, /mailto:nick@nickcarter\.dev/);
    assert.equal(text.toLowerCase().includes("gmail"), false);
  });
}
