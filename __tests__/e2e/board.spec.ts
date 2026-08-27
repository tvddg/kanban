import { test, expect } from "@playwright/test";
import RESTORE_TEST_DB from "./utils/restore_test_db";

const TEST_TIMESTAMP = Date.now();

test.describe.configure({ mode: "serial" });

test.afterAll(async () => {
    await RESTORE_TEST_DB();
})

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
    await expect(page.getByText("Test Card 1", { exact: true })).toBeVisible();
    await expect(page.getByText("Test Card 2", { exact: true })).toBeVisible();
    await expect(page.getByText("Test Card 3", { exact: true })).toBeVisible();

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
        { name: "The page you are trying to access does not exist" }
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
        "heading",
        { name: "The board is not accessible"}
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

test("creates a new card", async ({ page }) => {
    await page.goto("/board/1");

    const secondTestList = page.getByTestId('li_2');
    
    await secondTestList.getByRole('button', { name: "Add new card" }).click();

    await secondTestList.getByRole('textbox').fill(`Playwright ${TEST_TIMESTAMP}`);
    await secondTestList.getByRole('button', { name: "Add" }).click();

    await expect(secondTestList.getByRole('button', { name: "Add new card" })).toBeVisible();
    await expect(secondTestList.getByText(`Playwright ${TEST_TIMESTAMP}`)).toBeVisible();

    await page.waitForTimeout(500); // to assure that request to db will be sent
})

test("updates the card", async ({ page }) => {
    await page.goto("/board/1");
    
    const firstTestList = page.getByTestId('li_1');
    const cardToUpdate = firstTestList.locator('span', { hasText: "Test Card 1" });
    await cardToUpdate.getByAltText("Edit icon").click();

    const cardInput = firstTestList.getByRole("textbox");
    const okButton = firstTestList.getByRole("button", { name: "OK", exact: true });

    expect(cardInput).toBeVisible();
    expect(cardInput).toHaveValue("Test Card 1");
    expect(okButton).toBeVisible();
    expect(firstTestList.getByRole("button", { name: "Back", exact: true })).toBeVisible();

    await cardInput.fill("Updated Test Card 1");
    await okButton.click();

    expect(firstTestList.getByText("Updated Test Card 1")).toBeVisible();
    await page.waitForTimeout(500);
});

test("deletes a card", async ({ page }) => {
    await page.goto("/board/1");

    const secondTestList = page.getByTestId('li_2');
    await secondTestList.getByRole('button', { name: "Add new card" }).click();
    await secondTestList.getByRole('textbox').fill("foo");
    await secondTestList.getByRole('button', { name: "Add" }).click();
    await page.waitForTimeout(1000);

    const cardToDelete = secondTestList.locator('span', { hasText: "foo" });
    await cardToDelete.getByAltText("Delete icon").click();

    await expect(secondTestList.getByText("foo", { exact: true })).not.toBeVisible();
});

test("creates a new list", async ({ page }) => {
    await page.goto("/board/1");

    const newListPanel = page.getByTestId("newListContainer").locator('div');
    await expect(newListPanel).toBeVisible();

    await newListPanel.click();

    const form = page.getByTestId("newListContainer").getByRole("form");
    const inputField = form.getByRole("textbox");
    const okButton = form.getByRole("button", { name: /ok/i });

    // check if the form is present
    await expect(form).toBeVisible();
    await expect(inputField).toBeVisible();
    await expect(inputField).toHaveValue("");
    await expect(okButton).toBeVisible();
    await expect(form.getByRole("button", { name: /cancel/i })).toBeVisible();
    
    // perform an action
    await inputField.fill(`Test list ${TEST_TIMESTAMP}`);
    await okButton.click();

    await page.waitForTimeout(500);

    // final check
    await expect(page.getByText("Create new list")).toBeVisible();
    await expect(page.getByText(`Test list ${TEST_TIMESTAMP}`)).toBeVisible();
});

test("deletes existing list", async ({ page }) => {
    await page.goto("/board/1");

    const listTitle = page.getByText(`Test list ${TEST_TIMESTAMP}`);
    await expect(listTitle).toBeVisible();

    const header = page.locator("header", { has: listTitle });
    await expect(header).toBeVisible();

    const deleteButton = header.getByAltText("Delete list icon");
    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

    await expect(page.getByText(`Test list ${TEST_TIMESTAMP}`)).not.toBeVisible();
});