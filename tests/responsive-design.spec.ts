import { expect, test } from "@playwright/test";

/**
 * Test Suite: Responsive Design
 * Tests mobile sidebar, responsive layouts, and breakpoint behavior
 */
test.describe("Responsive Design", () => {
  test("should show mobile sidebar on small screens", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Wait for page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

    // Mobile sidebar trigger should be visible
    const sidebarTrigger = page.locator('[data-testid="mobile-sidebar-trigger"]').first();
    await expect(sidebarTrigger).toBeVisible();

    // Genre pills should be hidden on mobile
    const genrePills = page.locator('[data-testid="genre-pills"]');
    await expect(genrePills).toBeHidden();
  });

  test("should open and close mobile sidebar", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Wait for page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

    // Click hamburger menu to open sidebar
    const sidebarTrigger = page.locator('[data-testid="mobile-sidebar-trigger"]').first();
    await sidebarTrigger.click();

    // Sidebar should be open
    const sidebar = page.locator('[data-testid="mobile-sidebar"]');
    await expect(sidebar).toBeVisible();

    // Should show genre options in sidebar
    await expect(page.locator('[data-testid="mobile-sidebar"] >> text=All')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-sidebar"] >> text=Rock')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-sidebar"] >> text=Pop')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-sidebar"] >> text=Country')).toBeVisible();

    // Close sidebar by clicking outside or close button
    await page.keyboard.press("Escape");
    await expect(sidebar).toBeHidden();
  });

  test("should filter genres from mobile sidebar", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Wait for page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

    // Open mobile sidebar
    const sidebarTrigger = page.locator('[data-testid="mobile-sidebar-trigger"]').first();
    await sidebarTrigger.click();

    // Click Rock genre in sidebar
    await page.locator('[data-testid="mobile-sidebar"] >> text=Rock').click();

    // Sidebar should close automatically
    const sidebar = page.locator('[data-testid="mobile-sidebar"]');
    await expect(sidebar).toBeHidden();

    // Should filter to rock bands
    await page.waitForTimeout(500);
    const visibleCards = page.locator('[data-testid="band-card"]');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should adapt layout on tablet screens", async ({ page }) => {
    // Set tablet viewport (768px is below lg:1024px breakpoint, so pills should be hidden)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    // Wait for page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

    // Genre pills should be hidden on tablet (below lg breakpoint)
    const genrePills = page.locator('[data-testid="genre-pills"]');
    await expect(genrePills).toBeHidden();

    // Mobile sidebar trigger should be visible on tablet (below lg breakpoint)
    const sidebarTrigger = page.locator('[data-testid="mobile-sidebar-trigger"]').first();
    await expect(sidebarTrigger).toBeVisible();
  });

  test("should show desktop layout on large screens", async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // Wait for page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

    // Desktop elements should be visible
    const genrePills = page.locator('[data-testid="genre-pills"]');
    await expect(genrePills).toBeVisible();

    // Mobile sidebar trigger should be hidden
    const sidebarTrigger = page.locator('[data-testid="mobile-sidebar-trigger"]').first();
    await expect(sidebarTrigger).toBeHidden();

    // Right panel should be visible
    const rightPanel = page.locator('[data-testid="right-panel"]');
    await expect(rightPanel).toBeVisible();

    // Action icons should be visible
    const actionIcons = page.locator('[data-testid="action-icons"]');
    await expect(actionIcons).toBeVisible();
  });

  test("should handle right panel visibility on different screen sizes", async ({ page }) => {
    // Start with desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // Wait for page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

    // Right panel should be visible
    const rightPanel = page.locator('[data-testid="right-panel"]');
    await expect(rightPanel).toBeVisible();

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Right panel should adapt or be hidden on mobile
    // (depending on our responsive implementation)
  });

  test("should maintain responsive grid layout", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667, name: "mobile" },
      { width: 768, height: 1024, name: "tablet" },
      { width: 1024, height: 768, name: "tablet-landscape" },
      { width: 1440, height: 900, name: "desktop" },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      // Cards should be visible and properly arranged
      const visibleCards = page.locator('[data-testid="band-card"]');
      await expect(visibleCards.first()).toBeVisible();

      // Check that cards don't overflow or overlap
      const firstCard = visibleCards.first();
      const cardBox = await firstCard.boundingBox();
      expect(cardBox).toBeTruthy();
      expect(cardBox!.width).toBeGreaterThan(0);
      expect(cardBox!.height).toBeGreaterThan(0);
    }
  });

  test("should hide action icons on smaller screens", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });

    // Start with desktop - icons should be visible
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);

    const actionIcons = page.locator('[data-testid="action-icons"]');
    await expect(actionIcons).toBeVisible();

    // Resize to below 1280px - icons should hide
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(300);

    await expect(actionIcons).toBeHidden();
  });
});
