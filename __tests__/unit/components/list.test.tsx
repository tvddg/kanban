import { act, fireEvent, render, screen, within } from "@testing-library/react";
import List from "@/components/List";
import { CardId, ListId } from "@/types/brands";
import { ICard } from "@/types";
import { jest } from "@jest/globals";

const cards: ICard[] = [
    {
        created_at: "2026-08-14",
        description: "test card description",
        id: 1 as CardId,
        list_id: 1 as ListId,
        position: 1,
        title: "Test card 1"
    },
    {
        created_at: "2026-08-14",
        description: null,
        id: 2 as CardId,
        list_id: 1 as ListId,
        position: 2,
        title: "Test card 2"
    }
];

describe("List component", () => {
    test("renders correctly when no cards provided", () => {
        render(<List
            id={1 as ListId}
            name="Test list"
            cards={[]}
            handleAddCard={() => { }}
            handleDeleteCard={() => { }}
            handleEditCard={() => { }}
            handleDeleteList={() => { console.log(`DELETED LIST 1`) }}
            handleRenameList={(name: string) => { console.log(`RENAMED LIST 1 TO ${name}`) }}
        />)

        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();

        const titleElement = screen.getByRole('heading');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent("Test list");

        const menuIcon = screen.getByAltText("List settings icon");
        expect(menuIcon).toBeInTheDocument();

        const fallbackElement = screen.getByText(/nothing here yet/i);
        expect(fallbackElement).toBeInTheDocument();

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(1);

        expect(buttons[0]).toHaveTextContent(/add new card/i);
    })
    describe("with cards", () => {
        beforeEach(() => {
            render(<List
                id={1 as ListId}
                name="Test list"
                cards={cards}
                handleAddCard={() => { }}
                handleDeleteCard={() => { }}
                handleEditCard={() => { }}
                handleDeleteList={() => { console.log(`DELETED LIST 1`) }}
                handleRenameList={(name: string) => { console.log(`RENAMED LIST 1 TO ${name}`) }}
            />)
        });

        test("renders with proper content", () => {
            const headerElement = screen.getByRole('banner');
            expect(headerElement).toBeInTheDocument();

            const title = screen.getByRole('heading');
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent("Test list")

            const card1 = screen.getByText(/test card 1/i);
            const card2 = screen.getByText(/test card 2/i);
            expect(card1).toBeInTheDocument();
            expect(card2).toBeInTheDocument();

            const addCardButton = screen.getByText(/add new card/i);
            expect(addCardButton).toBeInTheDocument();
        });

        describe("has working dropdown menu", () => {
            test(`menu contains "delete" button`, () => {
                const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

                const headerElement = screen.getByRole("banner");
                expect(headerElement).toBeInTheDocument();

                const menuButton = within(headerElement).getByRole("img");
                expect(menuButton).toBeInTheDocument();
                expect(menuButton).toHaveAttribute('alt', 'List settings icon');

                fireEvent.click(menuButton);

                const menu = screen.getByTestId("dropdownMenu");

                expect(
                    within(menu).getByAltText("Menu item: Delete")
                ).toBeInTheDocument();
                const deleteOption = within(menu).getByText(/delete/i);
                fireEvent.click(deleteOption);

                expect(logSpy).toHaveBeenCalledWith("DELETED LIST 1");
            });

            describe(`menu contains "rename" button`, () => {
                test(`"rename" option is present`, () => {
                    const headerElement = screen.getByRole("banner");

                    const menuButton = within(headerElement).getByRole("img");
                    expect(menuButton).toHaveAttribute('alt', 'List settings icon');

                    fireEvent.click(menuButton);

                    const menu = screen.getByTestId("dropdownMenu");
                    expect(
                        within(menu).getByAltText("Menu item: Rename")
                    ).toBeInTheDocument();
                    expect(
                        within(menu).getByText(/rename/i)
                    ).toBeInTheDocument();
                });

                test(`opens the form when "rename" option is clicked`, () => {
                    const headerElement = screen.getByRole("banner");
                    const menuButton = within(headerElement).getByRole("img");
                    fireEvent.click(menuButton);

                    const menu = screen.getByTestId("dropdownMenu");
                    const renameOption = within(menu).getByText(/rename/i);
                    fireEvent.click(renameOption);

                    // form is visible
                    const formElement = within(headerElement).getByRole("form");
                    const inputElement: HTMLInputElement = within(formElement).getByRole("textbox");
                    expect(inputElement.value).toBe("Test list");
                });

                test("form is submitted successfully", async () => {
                    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
                    fireEvent.click(
                        screen.getByAltText("List settings icon")
                    );
                    fireEvent.click(
                        within(screen.getByTestId("dropdownMenu"))
                            .getByText(/rename/i)
                    );

                    // fill the form
                    const form = screen.getByRole("form");
                    const input: HTMLInputElement = within(form)
                        .getByRole("textbox");
                    fireEvent.change(input, { target: { value: "TEST"} });

                    expect(input.value).toBe("TEST");
                    
                    // submit the form
                    await act(() => fireEvent.submit(form));

                    expect(form).not.toBeInTheDocument();
                    expect(logSpy).toHaveBeenCalledTimes(1);
                    expect(logSpy).toHaveBeenCalledWith("RENAMED LIST 1 TO TEST");
                });
                
                test("form is not submitted if input is empty", async () => {
                    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
                    fireEvent.click(
                        screen.getByAltText("List settings icon")
                    );
                    fireEvent.click(
                        within(screen.getByTestId("dropdownMenu"))
                            .getByText(/rename/i)
                    );

                    // fill the form
                    const form = screen.getByRole("form");
                    const input: HTMLInputElement = within(form)
                        .getByRole("textbox");
                    fireEvent.change(input, { target: { value: ""} });

                    expect(input.value).toBe("");
                    
                    // submit the form
                    await act(() => fireEvent.submit(form));

                    expect(form).toBeInTheDocument();
                    expect(logSpy).toHaveBeenCalledTimes(0);
                });
            });
        });

        describe("supports card adding", () => {
            test("opens a modal card-adding form", () => {
                const openFormButton = screen.getByText(/add new card/i);
                fireEvent.click(openFormButton);

                const inputElement: HTMLInputElement = screen.getByRole('textbox');

                expect(inputElement).toBeInTheDocument();
                expect(inputElement.value).toBe("");
                expect((screen.getAllByRole('button')).length).toBe(2);
            })

            test("has working return button", () => {
                fireEvent.click(screen.getByText(/add new card/i));

                const returnButton = screen.getByText(/back/i);
                fireEvent.click(returnButton);

                expect(screen.queryByText("Add")).not.toBeInTheDocument();
                expect(screen.queryByText(/back/i)).not.toBeInTheDocument();
                expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

                expect(screen.getByText(/add new card/i)).toBeInTheDocument();
            })
        })
    });
});