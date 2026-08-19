import { fireEvent, render, screen } from "@testing-library/react";
import List from "@/components/List/List";
import { CardId, ListId } from "@/types/brands";
import { ICard } from "@/types";

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
                handleAddCard={() => {}}
                handleDeleteCard={() => {}}
                handleEditCard={() => {}}
            />)
        
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();

        const titleElement= screen.getByRole('heading');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent("Test list");

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
                handleAddCard={() => {}}
                handleDeleteCard={() => {}}
                handleEditCard={() => {}}
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
        })

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