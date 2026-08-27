import { screen, render, within, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";
import { BoardId } from "@/types/brands";

jest.unstable_mockModule("next/navigation", () => ({
    useRouter: () => ({
        push(url: string) {
            console.log(`MOCK REDIRECT TO ${url}`);
        }
    })
}));

const { default: BoardCard } = await import("@/components/BoardCard");

beforeEach(() => {
    render(
        <BoardCard 
            id={1 as BoardId}
            name="Test Card"
            createdAt="2026-08-17 09:54:11.803769+00"
        />
    );
});

describe("Board Card component", () => {
    test("renders correctly", () => {
        const card = screen.getByTestId("boardCard-1").parentElement;
        if (!card)
            throw new Error("Card doesn't have a wrapper");

        // name and settings icon
        expect(
            within(card).getByText(/test card/i)
        ).toBeInTheDocument();
        expect(
            within(card).getByAltText("Settings icon")
        ).toBeInTheDocument();

        // "created at" paragraph
        expect(
            within(card).getByText(/created at: 12:54, aug 17th, 2026/i)
        ).toBeInTheDocument(); 
    });

    test("redirects on click", () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        const card = screen.getByTestId("boardCard-1");
        fireEvent.click(card);

        expect(logSpy).toHaveBeenCalledWith("MOCK REDIRECT TO /board/1")
    });
});