import { render } from "@testing-library/react";
import Header from "@/components/UI/Header";

describe("Header component", () => {
    test("renders header with correct content", () => {
        const { getByAltText, getByText } = render(<Header name="Test header" />);
        
        expect(getByAltText(/menu/i)).toBeInTheDocument();
        expect(getByText(/test header/i)).toBeInTheDocument();
    })
});