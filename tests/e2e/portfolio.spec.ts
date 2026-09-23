import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const path of ["/", "/resume", "/resume/data-ai", "/resume/full-stack", "/resume/general"]) {
  test(`${path} renders without serious accessibility violations`, async ({ page }) => {
    const response = await page.goto(path); expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1")).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  });
}
test("skip link reaches main content", async ({ page }) => { await page.goto("/"); await page.keyboard.press("Tab"); await expect(page.getByText("Skip to content")).toBeFocused(); });
