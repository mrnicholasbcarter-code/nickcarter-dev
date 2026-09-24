import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const docsPaths = ["/docs", "/docs/verdict", ...["overview", "architecture", "model-selection", "context-intelligence", "autonomous-workflow", "routing-receipts", "evidence", "decisions"].map((slug) => `/docs/verdict/${slug}`)];
for (const path of ["/", "/resume", "/resume/data-ai", "/resume/full-stack", "/resume/general", ...docsPaths]) {
  test(`${path} renders without serious accessibility violations`, async ({ page }) => {
    const response = await page.goto(path); expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1")).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  });
}
test("docs are reachable from primary navigation and the Verdict project card", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Docs" }).click();
  await expect(page).toHaveURL(/\/docs$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("How the work is built.");
  await page.goto("/");
  await page.locator('#work a[href="/docs/verdict"]').click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Verdict.");
});

test("docs articles have one h1, labeled status, metadata, and working pager", async ({ page }) => {
  await page.goto("/docs/verdict/architecture");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("Architecture: harness, Core, and gateway");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://nickcarter.dev/docs/verdict/architecture");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Architecture/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /nickcarter\.dev\/opengraph-image/);
  await expect(page.getByText("Fig. 01")).toBeVisible();
  await expect(page.getByText("Fig. 02")).toBeVisible();
  await expect(page.locator(".docs-sidebar a[aria-current=page]")).toHaveText("Architecture");
  await page.locator('.docs-pager a[rel="next"]').click();
  await expect(page).toHaveURL(/\/docs\/verdict\/model-selection$/);
});

test("OpenCodeReview is labeled roadmap on the workflow page", async ({ page }) => {
  await page.goto("/docs/verdict/autonomous-workflow");
  const item = page.locator(".status-list li", { hasText: "OpenCodeReview" });
  await expect(item.locator(".status-label")).toContainText("Roadmap");
});

test("sitemap lists every docs route", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  for (const path of docsPaths) expect(body).toContain(`<loc>https://nickcarter.dev${path}</loc>`);
});

test("skip link reaches main content", async ({ page }) => { await page.goto("/"); await page.keyboard.press("Tab"); await expect(page.getByText("Skip to content")).toBeFocused(); });

test("resume downloads and launch metadata are available", async ({ page, request }) => {
  await page.goto("/resume");
  for (const slug of ["general", "data-ai", "full-stack"]) {
    const link = page.locator(`a[href="/resumes/nicholas-carter-${slug}-resume.pdf"]`).first();
    await expect(link).toBeVisible();
    const response = await request.get(`/resumes/nicholas-carter-${slug}-resume.pdf`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("application/pdf");
  }
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://nickcarter.dev/resume");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /nickcarter\.dev\/opengraph-image/);
});

test("profile and project links target the verified URLs", async ({ page }) => {
  await page.goto("/");
  for (const href of [
    "https://github.com/mrnicholasbcarter-code",
    "https://www.linkedin.com/in/nicholas-carter-dev",
    "https://github.com/mrnicholasbcarter-code/verdict-core",
    "https://github.com/mrnicholasbcarter-code/prediction-market-sdk",
    "https://github.com/mrnicholasbcarter-code/verdict-risk",
    "https://github.com/mrnicholasbcarter-code/verdict-node",
  ]) await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
});


test("career experience is visible on the homepage and every resume", async ({ page }) => {
  for (const path of ["/", "/resume", "/resume/general", "/resume/full-stack", "/resume/data-ai"]) {
    await page.goto(path);
    await expect(page.locator("main").getByText(/20\+ years/).first()).toBeVisible();
    for (const company of ["AgileThought", "Mad Mobile", "Blue Cross Blue Shield of Michigan"]) {
      await expect(page.getByRole("heading", { name: new RegExp(company) }).first()).toBeVisible();
    }
    if (path !== "/") {
      await expect(page.getByRole("heading", { name: /Compuware/ }).first()).toBeVisible();
      await expect(page.getByText(/Lakeland High School/).first()).toBeVisible();
    }
  }
});


test("homepage leads with engineering identity, contact, and attributed career work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Senior engineer.");
  await expect(page.getByRole("link", { name: "Discuss a role" })).toHaveAttribute("href", "mailto:mr.nicholas.b.carter@gmail.com");
  const career = page.locator("#experience");
  for (const text of ["Deloitte", "Bankers Surety", "VF Corp", "Member Portal R2"]) await expect(career).toContainText(text);
});
