import { BoardId, CardId, ListId } from "@/types/brands";
import { render, screen } from "@testing-library/react";
import Board from "@/components/Board";

beforeEach(() => {
    render(<Board 
        id={1}
        boardLists={[
            {
                board_id: 1 as BoardId,
                created_at: "2026-08-14",
                id: 1 as ListId,
                name: "Test list",
                cards: [{
                    created_at: "2026-08-14",
                    description: null,
                    title: "Test card",
                    id: 1 as CardId,
                    list_id: 1 as ListId,
                    position: 1
                }],
                position: 1
            }
        ]} 
    />)
}); 

describe("Board component", () => {
    test("renders board with proper content", () => {
        const listTitle = screen.getByRole("heading");
        expect(listTitle).toBeInTheDocument();
        expect(listTitle).toHaveTextContent("Test list");

        const cardTitle = screen.getByText("Test card");
        expect(cardTitle).toBeInTheDocument();
    })
});