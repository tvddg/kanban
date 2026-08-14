import { render, screen } from "@testing-library/react";
import Home from "../../src/app/page";

describe("Home page testing", () => {
    test("displays paragraph correctly", async () => {
        render(<Home />);

        await screen.findByRole('heading');

        expect(screen.getByRole('heading')).toHaveTextContent('INITIALIZE PROJECT AND CLEAN UP');
    })
});