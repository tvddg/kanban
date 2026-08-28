import MenuItem from "@/components/DropdownMenu/MenuItem";
import { screen, render, within, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";

beforeEach(() => {
    render(
        <MenuItem
            name="Test item"
            callback={() => console.log("CB FIRED")}
            imagePath="/test/path" 
        />
    );
});

describe("Menu Item Component", () => {
    test("renders with proper content", () => {
        const item = screen.getByRole("button");

        // check that title and icon were rendered
        expect(
            within(item).getByText(/test item/i)
        ).toBeInTheDocument();
        expect(
            within(item).getByAltText("Menu item: Test item")
        ).toBeInTheDocument();
    });

    test("click on the item fires a cb function", () => {
        // set up console.log spy
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        
        // click the item
        const item = screen.getByRole("button");
        fireEvent.click(item);
        
        // check that callback() was called
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("CB FIRED");
    });
});