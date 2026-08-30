import { test, expect } from '@playwright/test';
import { RESTORE_BOARDS } from './utils/restore_test_db';

const TEST_TIMESTAMP = Date.now();

test.describe.configure({ mode: "serial" });

test.afterAll(async () => {
    await RESTORE_BOARDS();
})

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
    const boardCard = page.getByTestId("boardCard-15");
    await expect(
        boardCard.getByText("Test Board")
    ).toBeVisible();
    await expect(
        boardCard.getByText("17:28, Aug 28th, 2026")
    ).toBeVisible();
});

test("clicking on board card redirects to that board", async ({ page }) => {
    await page.goto("/");
    const boardCard = page.getByTestId("boardCard-15");
    await boardCard.click();
    await page.waitForURL("/board/15");

    expect(page.url()).toContain("/board/15");
});

test('creates new board using "create new board" panel', async ({ page }) => {
    await page.goto("/");

    const createNewBoardPanel = page.getByTestId("createNewBoardPanel");
    createNewBoardPanel.click();

    const form = page.getByTestId("createNewBoardForm");
    await expect(form).toBeVisible();

    const input = form.getByRole("textbox");
    await expect(input).toBeVisible();
    await input.fill(`Test Board ${TEST_TIMESTAMP}`);

    const okBtn = form.getByRole("button", { name: "OK" });
    await expect(okBtn).toBeVisible();
    okBtn.click();
    await page.waitForURL("/board/**")

    expect(page.url()).toContain("/board/");
    await expect(page.getByText(`Test Board ${TEST_TIMESTAMP}`)).toBeVisible();
});

// test that deletes board successfully
test("deletes board successfully", async ({ page }) => {
    await page.goto("/");

    // choose a board and open the menu
    // selector - boardCardWrapper, that's not wrapping boardCard-15
    const boardToDelete = page.locator('[data-testid="boardCardWrapper"]:not(:has([data-testid="boardCard-15"]))');
    await expect(boardToDelete).toBeVisible();
    const settingsIcon = boardToDelete.getByAltText("Settings icon");
    await expect(settingsIcon).toBeVisible();
    await settingsIcon.click();

    // check that everything rendered
    const menu = boardToDelete.getByTestId("dropdownMenu");
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(
        menu.getByText(/delete/i)
    ).toBeVisible();
    await expect(
        menu.getByText(/rename/i)
    ).toBeVisible();

    // press "delete" option in menu
    const deleteBtn = menu.getByText(/delete/i);
    deleteBtn.click();

    // check that loader is rendered
    const loader = boardToDelete.getByRole("status");
    await expect(loader).toBeVisible();

    // check that board is removed from ui
    await expect(
        page.getByText(`Test Board ${TEST_TIMESTAMP}`)
    ).not.toBeVisible();
});

// test that renames board successfully
test("renames board successfully", async ({ page }) => {
    await page.goto("/");

    // choose the board and open the menu
    // selector - boardCardWrapper wrapping boardCard-15 
    const boardToRename = page.locator('[data-testid="boardCardWrapper"]:has([data-testid="boardCard-15"])');
    await expect(boardToRename).toBeVisible();
    const settingsIcon = boardToRename.getByAltText("Settings icon");
    await expect(settingsIcon).toBeVisible();
    await settingsIcon.click();

    // check that everything rendered
    const menu = boardToRename.getByTestId("dropdownMenu");
    await expect(menu).toBeVisible();
    await menu.click();
    await expect(
        menu.getByText(/delete/i)
    ).toBeVisible();
    await expect(
        menu.getByText(/rename/i)
    ).toBeVisible();

    // choose the "rename" option in menu
    const renameBtn = menu.getByText(/rename/i);
    await renameBtn.click();

    // check that form was rendered
    const renameForm = boardToRename.getByRole("form");
    await expect(renameForm).toBeVisible();
   
    const formInput = renameForm.getByRole("textbox");
    await expect(formInput).toBeVisible();

    const formSubmitBtn = renameForm.getByRole("button", { name: "OK" });
    await expect(formSubmitBtn).toBeVisible();

    await expect(
        renameForm.getByRole("button", { name: "Back"})
    ).toBeVisible();

    // fill and submit the form
    await formInput.fill("Updated board name");
    await formSubmitBtn.click();

    // check that loader is rendered
    await expect(
        page.getByRole("status")
    ).toBeVisible();

    // check that board's name is updated
    await expect(
        boardToRename.getByText("Updated board name")
    ).toBeVisible();
    await expect(
        boardToRename.getByText("Test Board")
    ).not.toBeVisible();
});