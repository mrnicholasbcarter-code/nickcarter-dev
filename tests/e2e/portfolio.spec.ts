import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const path of ["/", "/resume", "/resume/data-ai", "/resume/full-stack", "/resume/general"]) {
  test(`${path} renders without serious accessibility violations`, async ({ page }) => {
    const response = await page.goto(path); expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1")).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  });
}
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
