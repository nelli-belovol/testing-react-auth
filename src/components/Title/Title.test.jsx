import { render, screen } from "@testing-library/react"

import { Title } from "./Title"


const text = "Hello World"
describe("Title", () => {

	it("should render a title with children", () => {

		render(<Title>{text}</Title>)

		expect(screen.getByText(text)).toBeInTheDocument()
	})

	it("should render a title with the correct tag", () => {

		const { container } = render(<Title level={2}>{text}</Title>)

		expect(container.querySelector("h2")).toBeInTheDocument()
	})

	it("should render a title with the correct className", () => {

		render(<Title className="test1">{text}</Title>)


		const element = screen.getByText(text)
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass("test1") //check tag has recieved class = "test1"
		expect(element).toHaveClass("title") //check tag has base class 
	});
})