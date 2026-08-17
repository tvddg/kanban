import { test, expect } from "@playwright/test";

test("navigates to an existing board page", async ({ page }) => {
    await page.goto("/board/1");

    // Correct header with board title
    await expect(page.getByText("Test Board")).toBeVisible();

    // Correct lists on the board
    await expect(page.getByRole(
        "heading",
        { name: "Test List 1" }
    )).toBeVisible();
    await expect(page.getByRole(
        "heading",
        { name: "Test List 2" }
    )).toBeVisible();

    // shows cards of the list 1
    await expect(page.getByText("Test Card 1")).toBeVisible();
    await expect(page.getByText("Test Card 2")).toBeVisible();
    await expect(page.getByText("Test Card 3")).toBeVisible();

    // shows fallback UI on list 2
    await expect(page.getByText("Nothing here yet")).toBeVisible();
})

test("navigates to 404 page on invalid URL", async ({ page }) => {
    await page.goto("/board/invalid-path");

    await expect(page.getByRole(
        "heading",
        { name: "404" }
    )).toBeVisible();
    await expect(page.getByRole(
        "heading",
        { name: "The page you are trying to access doesn't exist" }
    )).toBeVisible();

    await expect(page.getByRole(
        "link",
        { name: "To the home page" }
    )).toBeVisible();
})

test("shows an error on unreachable URL", async ({ page }) => {
    await page.goto("/board/500");

    // TODO error code and message
    await expect(page.getByRole(
        "heading",
        { name: "Something went wrong"}
    )).toBeVisible();

    await expect(page.getByRole(
        "button",
        { name: "To the home page" }
    )).toBeVisible();
    await expect(page.getByRole(
        "button",
        { name: "Try again" }
    )).toBeVisible();
})