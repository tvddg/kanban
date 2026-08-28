import { BoardId } from "@/types/brands";
import { screen, render, within, fireEvent, act } from "@testing-library/react";
import { jest } from "@jest/globals";

// mock the board queries module
jest.unstable_mockModule("@/lib/supabase/queries/board", () => ({
    renameBoard: jest.fn((id: BoardId, newName: string) => 
        console.log(`RENAME BOARD ${id} TO ${newName}`))
}));

const {default: RenameBoard} = await import("@/components/modals/RenameBoard");

beforeEach(() => {
    render(
        <RenameBoard 
            id={1 as BoardId}
            submitDisabled={false}
            setPending={(val: boolean) => 
                console.log(`PENDING ${val ? "TRUE" : "FALSE"}`)}
            refresh={() => console.log("REFRESH PAGE")}
            closeForm={() => console.log("CLOSE FORM")}
        />
    );
});

describe("Rename Board Modal Component", () => {
    test("renders with proper content", () => {
        const form = screen.getByRole("form");

        // check that input is rendered and it's empty
        const input: HTMLInputElement = within(form).getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input.value).toBe(""); 

        // check that buttons are rendered
        expect(
            within(form).getByRole("button", { name: "OK" })
        ).toBeInTheDocument();
        expect(
            within(form).getByRole("button", { name: "Back" })
        ).toBeInTheDocument();
    });

    test("form submits successfully", async () => {
        // set up console.log spy
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        // open the form and fill the input
        const form = screen.getByRole("form");
        const input: HTMLInputElement = within(form)
            .getByRole("textbox");
        fireEvent.change(input, { target: { value: "New name" } });
        
        // submit form
        const okBtn = within(form)
            .getByRole("button", { name: "OK" });
        await act(() => fireEvent.click(okBtn));

        // check that mock was called
        // setPending(true) -> renameBoard(id, newName) -> refresh() 
        // -> closeForm() -> setPending(false) (TOTAL 5)
        expect(logSpy).toHaveBeenCalledTimes(5);

        // setPending(true)
        expect(logSpy).toHaveBeenNthCalledWith(1, "PENDING TRUE");
        // renameBoard(id, newName)
        expect(logSpy).toHaveBeenNthCalledWith(2, "RENAME BOARD 1 TO New name");
        // refresh()
        expect(logSpy).toHaveBeenNthCalledWith(3, "REFRESH PAGE");
        // closeForm
        expect(logSpy).toHaveBeenNthCalledWith(4, "CLOSE FORM");
        // setPending(false)
        expect(logSpy).toHaveBeenNthCalledWith(5, "PENDING FALSE");
    });

    test("form doesn't submit if input is empty", async () => {
        // set up console.log spy
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        // open the form and submit it without filling input
        const form = screen.getByRole("form");
        // check that input is empty
        expect(
            (within(form).getByRole("textbox") as HTMLInputElement)
            .value
        ).toBe("");
        const okBtn = within(form).getByRole("button", { name: "OK" });
        // submit
        await act(() => fireEvent.click(okBtn));

        // check that no mocks were called
        expect(logSpy).toHaveBeenCalledTimes(0);
    });

    test('click on "back" button closes the form', () => {
        // set up console.log spy
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        // open the form and close it
        const form = screen.getByRole("form");
        const backBtn = within(form).getByRole("button", { name: "Back" });
        fireEvent.click(backBtn);

        // check that closeForm() mock was called
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("CLOSE FORM");
    });
});