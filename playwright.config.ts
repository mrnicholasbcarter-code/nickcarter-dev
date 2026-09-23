import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  webServer: { command: "npm run build && npm run start", url: "http://localhost:3000", reuseExistingServer: !process.env.CI },
  use: { baseURL: "http://localhost:3000", browserName: "chromium" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"], browserName: "chromium" } },
  ],
});
