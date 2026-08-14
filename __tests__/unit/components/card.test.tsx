import { render, screen, fireEvent } from "@testing-library/react";
import { CardId, ListId } from "@/types/brands";
import Card from "@/components/Card";

import { jest } from "@jest/globals";

beforeEach(() => {
    render(<Card
            id={1 as CardId}
            index={0}
            listId={1 as ListId}
            title="Test card"
            handleDeleteCard={() => { console.log("DELETE") }}
            handleEditCard={(title: string) => { console.log(`TITLE: ${title}`) }}
        />);
});

describe("Card component", () => {
    test("renders a card with correct content", () => {
        expect(screen.getByText(/test card/i)).toBeInTheDocument();
        expect(screen.getAllByRole("img").length).toBe(2);
    })

    test("has working delete button", () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const deleteButton = screen.getByAltText(/delete icon/i);
        fireEvent.click(deleteButton);

        expect(logSpy).toHaveBeenCalledWith("DELETE");
    })

    describe("supports working renaming", () => {
        test("opens the form on edit button", () => {
            const editButton = screen.getByAltText(/edit icon/i);
            fireEvent.click(editButton);

            const inputElement: HTMLInputElement = screen.getByRole('textbox');

            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(inputElement.value).toBe("Test card");
            expect(screen.getAllByRole('button').length).toBe(2);
        })

        test("preforms proper renaming", () => {
            const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

            const editButton = screen.getByAltText(/edit icon/i);
            fireEvent.click(editButton);

            const inputElement: HTMLInputElement = screen.getByRole('textbox');
            fireEvent.change(inputElement, { target: { value: "edited"} });

            fireEvent.click(screen.getByText(/ok/i));

            expect(inputElement.value).toBe("edited");
            expect(logSpy).toHaveBeenCalledWith("TITLE: edited");
        })

        test("not allows to submit empty title", () => {
            const editButton = screen.getByAltText(/edit icon/i);
            fireEvent.click(editButton);

            const inputElement: HTMLInputElement = screen.getByRole('textbox');
            fireEvent.change(inputElement, { target: { value: "" } });

            const submitButton = screen.getByText(/ok/i);

            expect(inputElement.value).toBe("");
            expect(submitButton).toBeDisabled();
        });

        test("has working return button", () => {
            const editButton = screen.getByAltText(/edit icon/i);
            fireEvent.click(editButton);

            const returnButton = screen.getByText(/back/i);
            fireEvent.click(returnButton);

            expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
            expect(screen.queryByText(/ok/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/back/i)).not.toBeInTheDocument();

            expect(screen.getByText(/test card/i)).toBeInTheDocument();
            expect(screen.getByAltText(/edit icon/i)).toBeInTheDocument();
            expect(screen.getByAltText(/delete icon/i)).toBeInTheDocument();
        });
    })
})