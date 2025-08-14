import { expect, test } from "@playwright/test";

/**
 * Test Suite: Navigation
 * Tests navigation to band detail pages and back navigation
 */
test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Wait for the page to load and bands to be fetched
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });
  });

  test("should navigate to band detail page when clicking on band card", async ({ page }) => {
    // Click on the first band card
    const firstBandCard = page.locator('[data-testid="band-card"]').first();
    const bandName = await firstBandCard.locator("h3").textContent();

    await firstBandCard.click();

    // Should navigate to band detail page
    await page.waitForURL(/\/band\/\d+/);

    // Should show band detail content
    const detailTitle = page.locator("h1");
    await expect(detailTitle).toBeVisible();
    await expect(detailTitle).toContainText("Band #");
  });

  test("should show back button on band detail page", async ({ page }) => {
    // Navigate to band detail
    const firstBandCard = page.locator('[data-testid="band-card"]').first();
    await firstBandCard.click();

    await page.waitForURL(/\/band\/\d+/);

    // Should have back button (it's a Link, not button)
    const backButton = page.locator("a", { hasText: "Back to Bands" });
    await expect(backButton).toBeVisible();
  });

  test("should return to home page when clicking back button", async ({ page }) => {
    // Navigate to band detail
    const firstBandCard = page.locator('[data-testid="band-card"]').first();
    await firstBandCard.click();

    await page.waitForURL(/\/band\/\d+/);

    // Click back button (it's a Link, not button)
    const backButton = page.locator("a", { hasText: "Back to Bands" });
    await backButton.click();

    // Should return to home page
    await page.waitForURL("/");

    // Should show band grid again
    const bandCards = page.locator('[data-testid="band-card"]');
    await expect(bandCards).toHaveCount(12);
  });

  test("should preserve filter state when navigating back from detail page", async ({ page }) => {
    // Check if we're on mobile
    const isMobile = await page.locator('[data-testid="mobile-sidebar-trigger"]').first().isVisible();

    // Apply a genre filter
    if (isMobile) {
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);
      await page.locator('[data-testid="mobile-sidebar"] >> text=Rock').click();
      await page.waitForTimeout(300);
    } else {
      await page.locator('[data-testid="genre-pills"] >> text=Rock').click();
      await page.waitForTimeout(300);
    }

    // Verify filter is applied
    if (isMobile) {
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);
      const rockPill = page.locator('[data-testid="mobile-sidebar"] >> text=Rock');
      await expect(rockPill).toHaveClass(/bg-\[rgba\(0,114,100,1\)\]/);
      await page.keyboard.press("Escape");
    } else {
      const rockPill = page.locator('[data-testid="genre-pills"] >> text=Rock');
      await expect(rockPill).toHaveClass(/bg-\[rgba\(0,114,100,1\)\]/);
    }

    // Navigate to band detail
    const firstVisibleCard = page.locator('[data-testid="band-card"]').first();
    await firstVisibleCard.click();

    await page.waitForURL(/\/band\/\d+/);

    // Navigate back
    const backButton = page.locator("a", { hasText: "Back to Bands" });
    await backButton.click();

    await page.waitForURL("/");

    // Filter should still be active
    if (isMobile) {
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);
      const rockPillAfterBack = page.locator('[data-testid="mobile-sidebar"] >> text=Rock');
      await expect(rockPillAfterBack).toHaveClass(/bg-\[rgba\(0,114,100,1\)\]/);
      await page.keyboard.press("Escape");
    } else {
      const rockPillAfterBack = page.locator('[data-testid="genre-pills"] >> text=Rock');
      await expect(rockPillAfterBack).toHaveClass(/bg-\[rgba\(0,114,100,1\)\]/);
    }
  });

  test("should preserve search query when navigating back from detail page", async ({ page }) => {
    // Apply search query
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill("Velvet");
    await page.waitForTimeout(300);

    // Navigate to band detail
    const firstVisibleCard = page.locator('[data-testid="band-card"]').first();
    await firstVisibleCard.click();

    await page.waitForURL(/\/band\/\d+/);

    // Navigate back
    const backButton = page.locator("a", { hasText: "Back to Bands" });
    await backButton.click();

    await page.waitForURL("/");

    // Search query should still be active
    const searchInputAfterBack = page.locator('input[placeholder*="Search"]');
    await expect(searchInputAfterBack).toHaveValue("Velvet");

    // Filtered results should still be shown
    const visibleCards = page.locator('[data-testid="band-card"]');
    await expect(visibleCards).toHaveCount(1);
  });

  test("should load band detail data from JSON file", async ({ page }) => {
    // Navigate to first band (should be ID 001)
    const firstBandCard = page.locator('[data-testid="band-card"]').first();
    await firstBandCard.click();

    await page.waitForURL(/\/band\/001/);

    // Should show band detail information
    const detailContent = page.locator('[data-testid="band-detail-content"]');
    await expect(detailContent).toBeVisible();

    // Should show band image
    const bandImage = page.locator('[data-testid="band-detail-image"]');
    await expect(bandImage).toBeVisible();

    // Should show band information
    const bandInfo = page.locator('[data-testid="band-detail-info"]');
    await expect(bandInfo).toBeVisible();
  });

  test("should show fallback content when band JSON does not exist", async ({ page }) => {
    // Navigate to a band that might not have detailed JSON
    const bandCards = page.locator('[data-testid="band-card"]');
    const lastCard = bandCards.last();
    await lastCard.click();

    await page.waitForURL(/\/band\/\d+/);

    // Should still show some content (either from JSON or fallback)
    const detailTitle = page.locator("h1");
    await expect(detailTitle).toBeVisible();

    // Page should not show error state
    await expect(page.locator("text=Error")).not.toBeVisible();
  });

  test("should handle direct navigation to band detail URL", async ({ page }) => {
    // Navigate directly to band detail URL
    await page.goto("/band/001");

    // Should load band detail page
    const detailTitle = page.locator("h1");
    await expect(detailTitle).toBeVisible();
    await expect(detailTitle).toContainText("Band #001");

    // Should show back button
    const backButton = page.locator("a", { hasText: "Back to Bands" });
    await expect(backButton).toBeVisible();
  });

  test("should maintain right panel state during navigation", async ({ page }) => {
    // Check if right panel is visible (only on desktop)
    const rightPanel = page.locator('[data-testid="right-panel"]');
    const isRightPanelVisible = await rightPanel.isVisible();

    if (isRightPanelVisible) {
      // Close right panel
      const closeButton = rightPanel.locator('button[aria-label*="Close"]');
      await closeButton.click();
      await expect(rightPanel).toBeHidden();

      // Navigate to band detail
      const firstBandCard = page.locator('[data-testid="band-card"]').first();
      await firstBandCard.click();

      await page.waitForURL(/\/band\/\d+/);

      // Right panel should still be closed
      const rightPanelOnDetail = page.locator('[data-testid="right-panel"]');
      await expect(rightPanelOnDetail).toBeHidden();

      // Navigate back
      const backButton = page.locator("a", { hasText: "Back to Bands" });
      await backButton.click();

      await page.waitForURL("/");

      // Right panel should still be closed
      const rightPanelAfterBack = page.locator('[data-testid="right-panel"]');
      await expect(rightPanelAfterBack).toBeHidden();
    } else {
      // On mobile, right panel is not visible, so just test navigation
      const firstBandCard = page.locator('[data-testid="band-card"]').first();
      await firstBandCard.click();

      await page.waitForURL(/\/band\/\d+/);

      // Navigate back
      const backButton = page.locator("a", { hasText: "Back to Bands" });
      await backButton.click();

      await page.waitForURL("/");

      // Should show band grid
      const bandCards = page.locator('[data-testid="band-card"]');
      await expect(bandCards).toHaveCount(12);
    }
  });

  test("should handle browser back/forward navigation", async ({ page }) => {
    // Navigate to band detail
    const firstBandCard = page.locator('[data-testid="band-card"]').first();
    await firstBandCard.click();

    await page.waitForURL(/\/band\/\d+/);

    // Use browser back button
    await page.goBack();
    await page.waitForURL("/");

    // Should show band grid
    const bandCards = page.locator('[data-testid="band-card"]');
    await expect(bandCards).toHaveCount(12);

    // Use browser forward button
    await page.goForward();
    await page.waitForURL(/\/band\/\d+/);

    // Should show band detail again
    const detailTitle = page.locator("h1");
    await expect(detailTitle).toBeVisible();
  });
});
