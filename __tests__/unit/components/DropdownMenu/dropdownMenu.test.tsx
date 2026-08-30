import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { screen, render, within, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";

const items = [
    {
        name: "Delete test", callback: () => {
            console.log("PRESSED DELETE BTN")
        }, imagePath: "/test/path/1",
    },
    {
        name: "Update test", callback: () => {
            console.log("PRESSED UPDATE BTN")
        }, imagePath: "/test/path/2",
    },
];

beforeEach(() => {
    render(
        <div data-testid="dropdownWrapper">
            <div data-testid="outsideArea">
                Outside area
            </div>
            <DropdownMenu
                items={items}
                closeMenu={() => console.log("CLOSE MENU")}
            />
        </div>
    );
})

describe("Dropdown Menu Component", () => {
    test("renders with proper content", () => {
        const wrapper = screen.getByTestId("dropdownWrapper");

        // check if the items rendered
        expect(
            within(wrapper).getByText(/delete test/i)
        ).toBeInTheDocument();
        expect(
            within(wrapper).getByText(/update test/i)
        ).toBeInTheDocument();
    });

    test("rendered items are interactive", () => {
        // set up log spy
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        const wrapper = screen.getByTestId("dropdownWrapper");

        // check if delete btn logs out
        const deleteBtn = within(wrapper).getByText(/delete test/i);
        fireEvent.click(deleteBtn);
        expect(logSpy).toHaveBeenCalledWith("PRESSED DELETE BTN");

        // check if update btn logs out
        const updateBtn = within(wrapper).getByText(/update test/i);
        fireEvent.click(updateBtn);
        expect(logSpy).toHaveBeenCalledWith("PRESSED UPDATE BTN");

        expect(logSpy).toHaveBeenCalledTimes(2);
    });

    // check if dropdown closes on click outside
    test("closes on click outside", () => {
        // set up a log spy
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        const wrapper = screen.getByTestId("dropdownWrapper");

        // check if everything is rendered
        expect(
            within(wrapper).getByText(/delete test/i)
        ).toBeInTheDocument();
        expect(
            within(wrapper).getByText(/update test/i)
        ).toBeInTheDocument();

        // click outside
        const outsideArea = within(wrapper).getByTestId("outsideArea");
        fireEvent.mouseDown(outsideArea);

        // check that close() function was called
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("CLOSE MENU");
    });
});