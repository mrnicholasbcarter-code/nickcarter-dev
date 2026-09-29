#!/usr/bin/env node
/**
 * Print the three public resume PDFs from a running Next server.
 *
 * Uses the site's own print stylesheet only. No extra CSS is injected.
 * Playwright Chromium page.pdf margins match the measured origin/main
 * resume text margins (Letter, printBackground).
 *
 * Scale is 0.90. With the site print styles and these margins, scales
 * 0.91 through 1.00 make the general resume spill to 4 pages. 0.90 is the
 * largest 0.01 step in [0.85, 1.0] that keeps general, data-ai, and
 * full-stack at 3 pages (probed 2026-09-29 against next start of this branch).
 *
 * Env:
 *   RESUME_PDF_BASE  full origin, e.g. http://127.0.0.1:3010
 *                    If unset, this script builds (if .next is missing)
 *                    and starts `next start`, then stops it.
 *   RESUME_PDF_PORT  port used when this script starts the server (default 3010)
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public", "resumes");
const slugs = ["general", "data-ai", "full-stack"];

// Largest scale in [0.85, 1.0] that keeps every resume at 3 pages.
// Probed 2026-09-29, no extra CSS: 1.00 and 0.99 are 4/4/4 pages
// (general/data-ai/full-stack); 0.98 is 4/3/4; 0.91-0.97 keep data-ai and
// full-stack at 3 but general at 4. 0.90 is 3/3/3.
const SCALE = 0.9;

const margin = {
  top: "0.4796in",
  right: "0.5388in",
  bottom: "0.4796in",
  left: "0.4479in",
};

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: root, stdio: "inherit", ...opts });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(cmd + " " + args.join(" ") + " exited " + code));
    });
  });
}

async function waitFor(url, child) {
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error("next start exited " + child.exitCode);
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error("timed out waiting for " + url);
}

async function main() {
  let server = null;
  let base = process.env.RESUME_PDF_BASE || "";
  if (!base) {
    const port = process.env.RESUME_PDF_PORT || "3010";
    if (!existsSync(join(root, ".next"))) {
      await run("npx", ["next", "build"]);
    }
    server = spawn("npx", ["next", "start", "-p", port, "-H", "127.0.0.1"], {
      cwd: root,
      stdio: "inherit",
    });
    base = "http://127.0.0.1:" + port;
    try {
      await waitFor(base + "/resume/general", server);
    } catch (err) {
      server.kill("SIGTERM");
      throw err;
    }
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await mkdir(outDir, { recursive: true });
    for (const slug of slugs) {
      const url = base.replace(/\/$/, "") + "/resume/" + slug;
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      await page.emulateMedia({ media: "print" });
      const out = join(outDir, "nicholas-carter-" + slug + "-resume.pdf");
      const bytes = await page.pdf({
        format: "Letter",
        printBackground: true,
        margin,
        scale: SCALE,
      });
      await writeFile(out, bytes);
      console.log("wrote", out, bytes.length);
    }
  } finally {
    await browser.close();
    if (server) server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
