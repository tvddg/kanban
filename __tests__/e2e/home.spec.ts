import { test, expect } from '@playwright/test';

test('navigates to the home page', async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Kanban-board/);
});

test('home page contains text content', async ({ page }) => {
    await page.goto("/");

    await expect(
        page.getByRole(
            'heading',
            { name: "INITIALIZE PROJECT AND CLEAN UP" }
        )
    ).toBeVisible();
});
