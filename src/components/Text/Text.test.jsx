import { render, screen } from "@testing-library/react"

import { Text } from "./Text"


const text = "Hello World"
describe("Text", () => {

	it("should render a Text with children", () => {
		render(<Text>{text}</Text>)
		expect(screen.getByText(text)).toBeInTheDocument()
	})

	it("should render a Text with the correct className", () => {
		render(<Text className="text1">{text}</Text>)
		const element = screen.getByText(text)
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass("text1")
		expect(element).toHaveClass("text")
	});



	it("should render a Text with the prop isError", () => {

		render(<Text isError>{text}</Text>);
		const element = screen.getByText(text);
		expect(element).toBeInTheDocument();
		expect(element).toHaveClass("error");
		expect(element).toHaveClass("text")
	})
	it("should render a Text with the prop isSuccess", () => {

		render(<Text isSuccess>{text}</Text>);
		const element = screen.getByText(text);
		expect(element).toBeInTheDocument();
		expect(element).toHaveClass("success");
		expect(element).toHaveClass("text")
	})


	it('should render with the correct class name and error class name', () => {
		const text = 'Hello World';

		const { getByText } = render(
			<Text className="test" isError>
				{text}
			</Text>,
		);

		expect(getByText(text)).toBeInTheDocument();
		expect(getByText(text)).toHaveClass('text');
		expect(getByText(text)).toHaveClass('test');
		expect(getByText(text)).toHaveClass('error');
	});

})