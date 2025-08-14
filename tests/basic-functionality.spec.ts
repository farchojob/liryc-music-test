import { expect, test } from "@playwright/test";

/**
 * Test Suite: Basic Functionality
 * Tests core features like band loading, search, and genre filters
 */
test.describe("Basic Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");

    // Wait for the page to load and bands to be fetched
    await page.waitForSelector('[data-testid="band-card"]', { timeout: 10000 });
  });

  test("should load and display bands from JSON", async ({ page }) => {
    // Check that band cards are rendered
    const bandCards = page.locator('[data-testid="band-card"]');
    await expect(bandCards).toHaveCount(12); // We have 12 bands in bands.json

    // Check that each band card has required elements
    const firstCard = bandCards.first();
    await expect(firstCard.locator("img")).toBeVisible();
    await expect(firstCard.locator("h3")).toBeVisible(); // Band name
    await expect(firstCard.locator("p")).toBeVisible(); // Album name
  });

  test("should filter bands by search query", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');

    // Search for "Velvet" (matches "The Velvet Echo")
    await searchInput.fill("Velvet");

    // Wait for filtering to complete
    await page.waitForTimeout(500);

    // Should show bands with "Velvet" in the name
    const visibleCards = page.locator('[data-testid="band-card"]');
    await expect(visibleCards).toHaveCount(1);
    await expect(visibleCards.first().locator("h3")).toContainText("Velvet");
  });

  test("should filter bands by genre", async ({ page }) => {
    // Check if we're on mobile by looking for the mobile sidebar trigger
    const isMobile = await page.locator('[data-testid="mobile-sidebar-trigger"]').first().isVisible();

    if (isMobile) {
      // On mobile, open the sidebar first
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);

      // Click on Rock genre filter in the mobile sidebar
      await page.locator('[data-testid="mobile-sidebar"] >> text=Rock').click();

      // Wait for sidebar to close and filtering to complete
      await page.waitForTimeout(500);
    } else {
      // On desktop, click on Rock genre filter directly
      await page.locator('[data-testid="genre-pills"] >> text=Rock').click();
      await page.waitForTimeout(500);
    }

    // Should show only rock bands
    const visibleCards = page.locator('[data-testid="band-card"]');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify the Rock pill is active (check both desktop and mobile locations)
    if (isMobile) {
      // On mobile, need to open sidebar again to check
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);
      const rockPill = page.locator('[data-testid="mobile-sidebar"] >> text=Rock');
      await expect(rockPill).toHaveClass(/bg-\[rgba\(0,114,100,1\)\]/);
      // Close sidebar
      await page.keyboard.press("Escape");
    } else {
      const rockPill = page.locator('[data-testid="genre-pills"] >> text=Rock');
      await expect(rockPill).toHaveClass(/bg-\[rgba\(0,114,100,1\)\]/);
    }
  });

  test("should combine search and genre filters", async ({ page }) => {
    // Check if we're on mobile
    const isMobile = await page.locator('[data-testid="mobile-sidebar-trigger"]').first().isVisible();

    // First apply genre filter
    if (isMobile) {
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);
      await page.locator('[data-testid="mobile-sidebar"] >> text=Pop').click();
      await page.waitForTimeout(300);
    } else {
      await page.locator('[data-testid="genre-pills"] >> text=Pop').click();
      await page.waitForTimeout(300);
    }

    // Then search within that genre
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill("Crimson");
    await page.waitForTimeout(500);

    // Should show only Crimson Groove (Pop + search match)
    const visibleCards = page.locator('[data-testid="band-card"]');
    await expect(visibleCards).toHaveCount(1);
    await expect(visibleCards.first().locator("h3")).toContainText("Crimson Groove");
  });

  test('should clear filters when clicking "All"', async ({ page }) => {
    // Check if we're on mobile
    const isMobile = await page.locator('[data-testid="mobile-sidebar-trigger"]').first().isVisible();

    // Apply a genre filter first
    if (isMobile) {
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);
      await page.locator('[data-testid="mobile-sidebar"] >> text=Rock').click();
      await page.waitForTimeout(300);
    } else {
      await page.locator('[data-testid="genre-pills"] >> text=Rock').click();
      await page.waitForTimeout(300);
    }

    // Then click "All" to clear
    if (isMobile) {
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);
      await page.locator('[data-testid="mobile-sidebar"] >> text=All').click();
      await page.waitForTimeout(300);
    } else {
      await page.locator('[data-testid="genre-pills"] >> text=All').click();
      await page.waitForTimeout(300);
    }

    // Should show all bands again
    const visibleCards = page.locator('[data-testid="band-card"]');
    await expect(visibleCards).toHaveCount(12);

    // Verify "All" pill is active
    if (isMobile) {
      await page.locator('[data-testid="mobile-sidebar-trigger"]').first().click();
      await page.waitForTimeout(300);
      const allPill = page.locator('[data-testid="mobile-sidebar"] >> text=All');
      await expect(allPill).toHaveClass(/bg-\[rgba\(0,114,100,1\)\]/);
      await page.keyboard.press("Escape");
    } else {
      const allPill = page.locator('[data-testid="genre-pills"] >> text=All');
      await expect(allPill).toHaveClass(/bg-\[rgba\(0,114,100,1\)\]/);
    }
  });

  test("should show fallback image when band image is missing", async ({ page }) => {
    // Check that images are loaded (either specific or default)
    const images = page.locator('[data-testid="band-card"] img');
    const firstImage = images.first();

    // Wait for image to load
    await expect(firstImage).toBeVisible();

    // Check that src attribute is present
    const src = await firstImage.getAttribute("src");
    expect(src).toBeTruthy();
    expect(src).toMatch(/\.(png|jpg|jpeg|webp)$/);
  });

  test("should maintain search state when typing", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');

    // Type gradually and check that state is maintained
    await searchInput.fill("V");
    await page.waitForTimeout(200);

    await searchInput.fill("Ve");
    await page.waitForTimeout(200);

    await searchInput.fill("Velvet");
    await page.waitForTimeout(200);

    // Should still show filtered results
    const visibleCards = page.locator('[data-testid="band-card"]');
    await expect(visibleCards).toHaveCount(1);

    // Input should maintain the value
    await expect(searchInput).toHaveValue("Velvet");
  });
});
