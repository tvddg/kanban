import NewList from "@/components/modals/newModals/NewList"
import { render, screen, within, fireEvent, act } from "@testing-library/react"
import { jest } from "@jest/globals";

beforeEach(() => {
    render(
        <NewList
            createList={(name: string) => console.log(`NEW LIST ${name}`)}
        />
    )
});

describe("New List component", () => {
    test("renders correctly", () => {
        const newListContainer = screen.getByTestId("newListContainer");
        expect(newListContainer).toBeInTheDocument();

        const title = within(newListContainer).getByText("Create new list");
        expect(title).toBeInTheDocument();
        const icon = within(newListContainer).getByAltText("Create new list icon");
        expect(icon).toBeInTheDocument();
    });

    test("opens the form on click", () => {
        const newListPanel = screen
            .getByText("Create new list").parentElement;
        // <div {container}> 
        //      <div {panel}>Create new list</div> 
        // </div>
        if (!newListPanel)
            throw new Error('"Create new list" panel not found.');

        fireEvent.click(newListPanel);

        const newListContainer = screen.getByTestId("newListContainer");
        if (!newListContainer)
            throw new Error('Container for "Create new list" panel not found.');

        const newListForm = within(newListContainer).getByRole('form');
        expect(newListForm).toBeInTheDocument();

        const inputField: HTMLInputElement = within(newListForm).getByRole('textbox');
        expect(inputField).toBeInTheDocument();
        expect(inputField.value).toBe("");

        const okButton = within(newListForm).getByRole('button', { name: /ok/i });
        expect(okButton).toBeInTheDocument();
        expect(okButton).not.toBeDisabled();

        const cancelButton = within(newListForm).getByRole('button', { name: /cancel/i });
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton).not.toBeDisabled();
    });

    test("closes the form on 'Cancel' button", () => {
        const newListPanel = screen
            .getByText("Create new list").parentElement;
        if (!newListPanel)
            throw new Error('"Create new list" panel not found.');

        fireEvent.click(newListPanel);

        const newListForm = within(screen.getByTestId("newListContainer")).getByRole("form");
        expect(newListForm).toBeInTheDocument();
        expect(within(newListForm).getByRole("textbox")).toBeInTheDocument();
        expect(within(newListForm).getByRole("button", { name: /ok/i })).toBeInTheDocument();

        const cancelButton = within(newListForm).getByRole("button", { name: /cancel/i });
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);

        const updatedContainer = screen.getByTestId("newListContainer");
        expect(within(updatedContainer).queryByRole("form")).not.toBeInTheDocument();
        expect(within(updatedContainer).getByText("Create new list")).toBeInTheDocument();
    });

    test("correctly sends a request on submit", async () => {  
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        
        const newListPanel = screen
            .getByText("Create new list").parentElement;
        if (!newListPanel)
            throw new Error('"Create new list" panel not found.');

        fireEvent.click(newListPanel);

        const newListContainer = screen.getByTestId("newListContainer");
        const form = within(newListContainer).getByRole("form");
        expect(form).toBeInTheDocument();

        const input: HTMLInputElement = within(form).getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input.value).toBe("");

        fireEvent.change(input, { target: { value: "TEST_LIST" } } );
        expect(input.value).toBe("TEST_LIST");

        const okButton = within(form).getByRole("button", { name: /ok/i });
        expect(okButton).toBeInTheDocument();
        expect(okButton).toBeEnabled();

        await act(async () => {
            fireEvent.click(okButton)
        });

        screen.debug(screen.getByTestId("newListContainer"));

        expect(within(screen.getByTestId("newListContainer"))
            .queryByRole("form")).not.toBeInTheDocument();
        expect(logSpy).toHaveBeenCalledWith("NEW LIST TEST_LIST");
        expect(screen.getByText("Create new list")).toBeInTheDocument();
    });
});