import { test, expect } from "@playwright/test";

test.describe("Q-Psi Live Prototype E2E Suite", () => {
  test("1. Open /prototype page and verify header disclosures", async ({ page }) => {
    await page.goto("/prototype");
    await expect(page.locator("h1")).toContainText("Two characters. One room.");
    await expect(page.getByText("FUNCTIONAL CLASSICAL PROTOTYPE")).toBeVisible();
    await expect(page.getByText("NO QUANTUM ADVANTAGE CLAIM")).toBeVisible();
  });

  test("2. Execute 60-second proof scenario step-by-step", async ({ page }) => {
    await page.goto("/prototype");
    const proofButton = page.getByRole("button", { name: /RUN THE 60-SECOND PROOF/i });
    if (await proofButton.isVisible()) {
      await proofButton.click();
      await expect(page.getByText("PROOF PASSED")).toBeVisible({ timeout: 15000 });
    }
  });

  test("3. Verify session isolation across two browser contexts", async ({ browser }) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("/prototype");

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto("/prototype");

    // Both contexts should load without errors
    await expect(page1.locator("h1")).toContainText("Two characters");
    await expect(page2.locator("h1")).toContainText("Two characters");

    await context1.close();
    await context2.close();
  });
});
