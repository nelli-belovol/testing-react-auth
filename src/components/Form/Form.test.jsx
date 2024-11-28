import { fireEvent, render, waitFor, } from "@testing-library/react";

import { Form } from "./Form";

function renderComponent(props) {
	return render(<Form ><div data-testid='my-child' {...props}></div> </Form >);
}

describe("Form", () => {
	it("should render Form with children", () => {
		// const { container, getByTestId } = render(<Form ><div data-testid='my-child'></div></Form >);
		renderComponent();

		expect(screen.getByTestId('my-child')).toBeInTheDocument();
		expect(screen.getByRole('form')).toBeInTheDocument();
	});

	it("should invoke the onSubmit callback", () => {
		const onSubmit = jest.fn();

		renderComponent();

		const myForm = screen.getByRole('form');

		fireEvent.submit(myForm);
		expect(onSubmit).toHaveBeenCalledTimes(1);
	})

	it("should invoke the onSuccess callback", async () => {
		const onSuccess = jest.fn()

		renderComponent({ onSubmit: jest.fn(), onSuccess });
		const myForm = screen.getByRole('form');

		fireEvent.submit(myForm);

		await waitFor(() => {
			expect(onSuccess).toHaveBeenCalledTimes(1);
		})

	})

	it("invoke the onError callback", async () => {
		const onError = jest.fn();
		renderComponent({ onSubmit: () => Promise.reject(), onError });
		const myForm = screen.getByRole('form');

		fireEvent.submit(myForm);
		await waitFor(() => {
			expect(onError).toHaveBeenCalledTimes(1);
		})

	})
})