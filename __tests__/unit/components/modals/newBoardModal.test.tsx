import { screen, render, within, fireEvent, act } from "@testing-library/react";
import { jest } from "@jest/globals";

jest.unstable_mockModule("@/lib/supabase/queries/board", () => ({
    getBoard: jest.fn(),
    getAllBoards: jest.fn(async () => {}),
    createBoard: jest.fn(async (name: string) => {
        console.log(`CREATED BOARD ${name}`);
        return { id: 1 };
    })
}));

jest.unstable_mockModule("next/navigation", () => ({
    useRouter: () => ({ push(url: string) {
        console.log(`MOCK REDIRECT TO ${url}`)
    }})
}));

const { default: NewBoard } = await import("@/components/modals/newModals/NewBoard");

beforeEach(() => {
    render(<NewBoard />);
});

describe("New Board Modal component", () => {
    test("renders proper content", () => {
        // panel is rendered
        const createPanel = screen.getByTestId("createNewBoardPanel");
        expect(createPanel).toBeInTheDocument();

        // there's a title and an icon on the panel
        const title = within(createPanel).getByText(/create new board/i);
        expect(title).toBeInTheDocument();
        const icon = within(createPanel).getByAltText(/create new board icon/i);
        expect(icon).toBeInTheDocument();
    });

    test("shows a form on click", () => {
        // find the panel and click on it,
        const createPanel = screen.getByTestId("createNewBoardPanel");
        fireEvent.click(createPanel);

        // now panel is hidden
        expect(screen.queryByTestId("createNewBoardPanel")).not.toBeInTheDocument();

        // - instead, the form is shown
        const newBoardForm = screen.getByRole("form");
        const input: HTMLInputElement = within(newBoardForm).getByRole("textbox");
        expect(input.value).toBe("");
        expect(within(newBoardForm).getByRole("button", { name: "OK" })).toBeInTheDocument();
        expect(within(newBoardForm).getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });

    test("submits the form successfully and redirects to new page", async () => {
        // set the spy for mocks
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        // open the form
        const createNewBoardPanel = screen.getByTestId("createNewBoardPanel");
        fireEvent.click(createNewBoardPanel);
        const form = screen.getByRole("form");

        // fill the input
        const input: HTMLInputElement = within(form).getByRole("textbox");
        fireEvent.change(input, { target: { value: "Test Board" } });
        expect(input.value).toBe("Test Board");

        // submit the form and wait for updates to finish
        const okBtn = within(form).getByRole("button", { name: "OK" });
        await act(async () => {
            fireEvent.click(okBtn);
        });
        
        // check mocks
        // createBoard() -> router.push()
        expect(logSpy).toHaveBeenCalledTimes(2);
        // createBoard("Test Board")
        expect(logSpy).toHaveBeenNthCalledWith(1, "CREATED BOARD Test Board");
        // router.push("/board/1")
        expect(logSpy).toHaveBeenNthCalledWith(2, "MOCK REDIRECT TO board/1");
    });
});