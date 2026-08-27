import { test, expect } from '@playwright/test';

test('navigates to the home page', async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Kanban-board/);
});

test('home page shows proper content', async ({ page }) => {
    await page.goto("/");

    // Header
    const headerElement = page.getByRole("banner");
    await expect(headerElement).toBeVisible();
    await expect(
        headerElement.getByText("Kanban Tracker")
    ).toBeVisible();

    // Title
    await expect(
        page.getByRole("heading", { name: "Your boards" })
    ).toBeVisible();

    // "New board" panel at the beginning of a slider
    await expect(
        page.getByText(/create new board/i)
    ).toBeVisible();
    await expect(
        page.getByAltText("Create new board icon")
    ).toBeVisible();

    // Test board in slider
    const boardCard = page.getByTestId("boardCard-1");
    await expect(
        boardCard.getByText("Test Board")
    ).toBeVisible();
    await expect(
        boardCard.getByText("12:54, Aug 17th, 2026")
    ).toBeVisible();
});

test("clicking on board card redirects to that board", async ({ page }) => {
    await page.goto("/");
    const boardCard = page.getByTestId("boardCard-1");
    await boardCard.click();
    await page.waitForURL("/board/1");

    expect(page.url()).toContain("/board/1");
});