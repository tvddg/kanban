import { render, screen, fireEvent } from "@testing-library/react";
import { CardId, ListId } from "@/types/brands";
import Card from "@/components/Card";

describe("Card component", () => {
    test("renders a card with correct content", () => {
        const { getByText, getAllByRole } = render(<Card
            id={1 as CardId}
            index={0}
            listId={1 as ListId}
            title="Test card"
            handleDeleteCard={() => { console.log("CALLED DELETE") }}
            handleEditCard={(title: string) => { console.log(`NEW TITLE: ${title}`) }}
        />);

        expect(getByText(/test card/i)).toBeInTheDocument();
        expect(getAllByRole("img").length).toBe(2);
    })

    test("opens the form on edit button", () => {
        render(<Card
            id={1 as CardId}
            index={0}
            listId={1 as ListId}
            title="Test card"
            handleDeleteCard={() => { console.log("CALLED DELETE") }}
            handleEditCard={(title: string) => { console.log(`NEW TITLE: ${title}`) }}
        />);

        const editButton = screen.getByAltText(/edit icon/i);
        fireEvent.click(editButton);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(2);
    })
})