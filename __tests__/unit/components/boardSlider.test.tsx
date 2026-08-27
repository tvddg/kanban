import { jest } from "@jest/globals";

import { screen, render } from "@testing-library/react";
import { BoardId } from "@/types/brands";
import type { IBoard } from "@/types";

const boards: IBoard[] = [
    {
        created_at: new Date().toLocaleString('sv-SE'),
        id: 1 as BoardId,
        name: "Test board"
    }
];

jest.unstable_mockModule("@/lib/supabase/queries/board", () => ({
    getBoard: jest.fn(),
    getAllBoards: jest.fn(async () => boards)
}));

jest.unstable_mockModule("next/navigation", () => ({
    useRouter: () => ({ push: jest.fn() })
}));

const { getAllBoards } = await import("@/lib/supabase/queries/board");
const { default: BoardSlider } = await import("@/components/BoardSlider");

describe("Board Slider component", () => {
    test("awaits data and renders correctly", async () => {
        render(await BoardSlider());

        // shows a title "Your board"
        const title = await screen.findByRole("heading", { name: "Your boards" });
        expect(title).toBeInTheDocument();

        // shows "create new board" panel
        const createNewBoard = await screen.findByTestId("createNewBoardPanel");
        expect(createNewBoard).toBeInTheDocument();

        // renders fetched boards
        expect(getAllBoards).toHaveBeenCalled();
        expect(await screen.findByText("Test board")).toBeInTheDocument();
    });
})
