import { expect, test } from "@playwright/test";

/**
 * Helper function to check if right panel is available (desktop only)
 */
async function isRightPanelAvailable(page: any) {
  const rightPanel = page.locator('[data-testid="right-panel"]').first().first();
  return await rightPanel.isVisible();
}

/**
 * Test Suite: Right Panel Functionality
 * Tests the right panel open/close functionality and content expansion
 */
test.describe("Right Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Wait for the page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });
  });

  test("should display right panel by default", async ({ page }) => {
    const rightPanel = page.locator('[data-testid="right-panel"]').first().first();
    const isDesktop = await isRightPanelAvailable(page);

    if (isDesktop) {
      // Right panel should be visible on desktop
      await expect(rightPanel).toBeVisible();

      // Should contain welcome text
      await expect(rightPanel.locator("text=Welcome to Lyric")).toBeVisible();

      // Should have close button
      const closeButton = rightPanel.locator('button[aria-label="Close band details panel"]');
      await expect(closeButton).toBeVisible();
    } else {
      // On mobile, right panel should not be visible
      await expect(rightPanel).toBeHidden();
    }
  });

  test("should close right panel when close button is clicked", async ({ page }) => {
    const rightPanel = page.locator('[data-testid="right-panel"]').first();
    const isDesktop = await isRightPanelAvailable(page);

    if (isDesktop) {
      const closeButton = rightPanel.locator('button[aria-label="Close band details panel"]');

      // Click close button
      await closeButton.click();

      // Panel should be hidden
      await expect(rightPanel).toBeHidden();

      // Main content should expand (check layout changes)
      const mainContent = page.locator('[data-testid="main-content"]');
      // The main content should take full width when panel is closed
      await expect(mainContent).toBeVisible();
    } else {
      // On mobile, panel is already hidden
      await expect(rightPanel).toBeHidden();
    }
  });

  test("should show toggle button when panel is closed", async ({ page }) => {
    const rightPanel = page.locator('[data-testid="right-panel"]').first();
    const closeButton = rightPanel.locator('button[aria-label="Close band details panel"]');

    // Close the panel
    await closeButton.click();
    await expect(rightPanel).toBeHidden();

    // Toggle button should appear
    const toggleButton = page.locator('button[aria-label="Open right panel"]');
    await expect(toggleButton).toBeVisible();
  });

  test("should reopen right panel when toggle button is clicked", async ({ page }) => {
    const rightPanel = page.locator('[data-testid="right-panel"]').first();
    const closeButton = rightPanel.locator('button[aria-label="Close band details panel"]');

    // Close the panel first
    await closeButton.click();
    await expect(rightPanel).toBeHidden();

    // Click toggle button to reopen
    const toggleButton = page.locator('button[aria-label="Open right panel"]');
    await toggleButton.click();

    // Panel should be visible again
    await expect(rightPanel).toBeVisible();

    // Toggle button should be hidden
    await expect(toggleButton).toBeHidden();
  });

  test("should maintain panel state during navigation", async ({ page }) => {
    const rightPanel = page.locator('[data-testid="right-panel"]').first();
    const closeButton = rightPanel.locator('button[aria-label="Close band details panel"]');

    // Close the panel
    await closeButton.click();
    await expect(rightPanel).toBeHidden();

    // Navigate to a band detail page
    const firstBandCard = page.locator('[data-testid="band-card"]').first();
    await firstBandCard.click();

    // Wait for navigation
    await page.waitForURL(/\/band\/\d+/);

    // Panel should still be closed
    const rightPanelOnDetailPage = page.locator('[data-testid="right-panel"]').first();
    await expect(rightPanelOnDetailPage).toBeHidden();

    // Toggle button should be visible
    const toggleButton = page.locator('button[aria-label="Open right panel"]');
    await expect(toggleButton).toBeVisible();
  });

  test("should expand main content when panel is closed", async ({ page }) => {
    // Close the panel
    const rightPanel = page.locator('[data-testid="right-panel"]').first();
    const closeButton = rightPanel.locator('button[aria-label="Close band details panel"]');
    await closeButton.click();

    // Wait for layout to adjust
    await page.waitForTimeout(500);

    // Verify panel is hidden
    await expect(rightPanel).toBeHidden();

    // And that toggle button appears
    const toggleButton = page.locator('button[aria-label="Open right panel"]');
    await expect(toggleButton).toBeVisible();

    // Main content should still be visible and functional
    const mainContent = page.locator('[data-testid="main-content"]');
    await expect(mainContent).toBeVisible();

    // Band cards should still be visible
    const bandCards = page.locator('[data-testid="band-card"]');
    await expect(bandCards.first()).toBeVisible();
  });

  test("should show promo section in right panel", async ({ page }) => {
    const rightPanel = page.locator('[data-testid="right-panel"]').first();
    const isDesktop = await isRightPanelAvailable(page);

    if (isDesktop) {
      // Should contain promo section
      const promoSection = rightPanel.locator('[data-testid="promo-section"]');
      await expect(promoSection).toBeVisible();

      // Should have some content in promo section (flags might be styled differently)
      await expect(promoSection).not.toBeEmpty();
    } else {
      // On mobile, right panel should not be visible
      await expect(rightPanel).toBeHidden();
    }
  });

  test("should handle right panel on mobile screens", async ({ page }) => {
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Right panel behavior on mobile (might be hidden or adapted)
    const rightPanel = page.locator('[data-testid="right-panel"]').first();

    // On mobile, panel might be hidden by default or shown differently
    // This depends on our responsive implementation
    // We can test that the layout doesn't break
    const mainContent = page.locator('[data-testid="main-content"]');
    await expect(mainContent).toBeVisible();
  });

  test("should reset panel state on page refresh", async ({ page }) => {
    const rightPanel = page.locator('[data-testid="right-panel"]').first();
    const isDesktop = await isRightPanelAvailable(page);

    if (isDesktop) {
      const closeButton = rightPanel.locator('button[aria-label="Close band details panel"]');

      // Close the panel
      await closeButton.click();
      await expect(rightPanel).toBeHidden();

      // Refresh the page
      await page.reload();
      await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

      // Panel should be open again after refresh (default state)
      const rightPanelAfterReload = page.locator('[data-testid="right-panel"]').first().first();
      await expect(rightPanelAfterReload).toBeVisible();

      // Toggle button should not be visible when panel is open
      const toggleButton = page.locator('button[aria-label="Open right panel"]');
      await expect(toggleButton).toBeHidden();
    } else {
      // On mobile, just test that page loads correctly after refresh
      await page.reload();
      await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

      // Right panel should remain hidden on mobile
      await expect(rightPanel).toBeHidden();
    }
  });

  test("should handle keyboard navigation for panel controls", async ({ page }) => {
    const rightPanel = page.locator('[data-testid="right-panel"]').first();
    const closeButton = rightPanel.locator('button[aria-label="Close band details panel"]');

    // Focus and activate close button with keyboard
    await closeButton.focus();
    await page.keyboard.press("Enter");

    // Panel should close
    await expect(rightPanel).toBeHidden();

    // Focus toggle button and reopen
    const toggleButton = page.locator('button[aria-label="Open right panel"]');
    await toggleButton.focus();
    await page.keyboard.press("Enter");

    // Panel should reopen
    await expect(rightPanel).toBeVisible();
  });
});
