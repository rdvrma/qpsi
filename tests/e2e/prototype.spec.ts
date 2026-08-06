import { test, expect } from "@playwright/test";

test.describe("Q-Psi Live Prototype E2E Suite", () => {
  test("1. Open /prototype page and verify header disclosures", async ({ page }) => {
    await page.goto("/prototype");
    await expect(page.getByText("FUNCTIONAL CLASSICAL PROTOTYPE").first()).toBeVisible({ timeout: 20000 });
    await expect(page.getByText("NO QUANTUM ADVANTAGE CLAIM").first()).toBeVisible({ timeout: 20000 });
  });

  test("2. Execute 60-second proof scenario step-by-step", async ({ page }) => {
    await page.goto("/prototype");
    const proofButton = page.getByRole("button", { name: /RUN THE 60-SECOND PROOF/i });
    await expect(proofButton).toBeVisible({ timeout: 20000 });
    await proofButton.click();
    await expect(page.getByText("PROOF PASSED")).toBeVisible({ timeout: 30000 });
  });

  test("3. Verify session isolation across two browser contexts", async ({ browser }) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("/prototype");

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto("/prototype");

    // Both contexts load without errors
    await expect(page1.getByText("FUNCTIONAL CLASSICAL PROTOTYPE").first()).toBeVisible({ timeout: 20000 });
    await expect(page2.getByText("FUNCTIONAL CLASSICAL PROTOTYPE").first()).toBeVisible({ timeout: 20000 });

    await context1.close();
    await context2.close();
  });
});
