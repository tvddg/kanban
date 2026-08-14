import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveTitle(/Kanban-board/);
});

test('has text content', async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(
        page.getByRole(
            'heading',
            { name: "INITIALIZE PROJECT AND CLEAN UP" }
        )
    ).toBeVisible();
});
