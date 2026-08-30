import { BoardId, CardId, ListId } from "@/types/brands";
import { render, screen } from "@testing-library/react";
import { ListWithCards } from "@/types";
import { jest } from "@jest/globals";

const boardLists: ListWithCards[] = [
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
];

jest.unstable_mockModule("@/hooks/useOptimisticLists", () => ({
    __esModule: true,
    default: () => ({
        optimisticLists: boardLists,
        handlers: {},
        refreshLists: () => {}
    })
}));

const { default: Board } = await import("@/components/Board");

beforeEach(() => {
    render(<Board
        id={1}
        boardLists={boardLists}
    />)
});

describe("Board component", () => {
    test("renders board with proper content", () => {
        const listTitle = screen.getByRole("heading");
        expect(listTitle).toBeInTheDocument();
        expect(listTitle).toHaveTextContent("Test list");

        const cardTitle = screen.getByText("Test card");
        expect(cardTitle).toBeInTheDocument();

        const newListTitle = screen.getByText("Create new list");
        expect(newListTitle).toBeInTheDocument();
        const newListIcon = screen.getByAltText("Create new list icon");
        expect(newListIcon).toBeInTheDocument();
    })
});