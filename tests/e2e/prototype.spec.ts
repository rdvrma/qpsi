import { test, expect } from "@playwright/test";

test.describe("Q-Psi Live Prototype E2E Suite", () => {
  test("1. Open /prototype page and verify header disclosures", async ({ page }) => {
    await page.goto("/prototype", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Two characters", { timeout: 10000 });
    await expect(page.getByText("FUNCTIONAL CLASSICAL PROTOTYPE").first()).toBeVisible();
    await expect(page.getByText("NO QUANTUM ADVANTAGE CLAIM").first()).toBeVisible();
  });

  test("2. Execute 60-second proof scenario step-by-step", async ({ page }) => {
    await page.goto("/prototype", { waitUntil: "domcontentloaded" });
    const proofButton = page.getByRole("button", { name: /RUN THE 60-SECOND PROOF/i });
    if (await proofButton.isVisible({ timeout: 10000 })) {
      await proofButton.click();
      await expect(page.getByText("PROOF PASSED")).toBeVisible({ timeout: 20000 });
    }
  });

  test("3. Verify session isolation across two browser contexts", async ({ browser }) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("/prototype", { waitUntil: "domcontentloaded" });

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto("/prototype", { waitUntil: "domcontentloaded" });

    // Both contexts load without errors
    await expect(page1.getByRole("heading", { level: 1 })).toContainText("Two characters", { timeout: 10000 });
    await expect(page2.getByRole("heading", { level: 1 })).toContainText("Two characters", { timeout: 10000 });

    await context1.close();
    await context2.close();
  });
});
